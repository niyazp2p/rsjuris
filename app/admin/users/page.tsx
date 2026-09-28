"use client";

import React, { useEffect, useState } from "react";
import { 
  Users2, 
  UserPlus, 
  Search, 
  RotateCw, 
  ShieldCheck, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Award,
  Loader2,
  AlertCircle
} from "lucide-react";
import { getUsers, updateUser } from "@/lib/api";
import { UserItem, UserRole } from "@/types/user";
import CreateUserModal from "../../components/admin/users/CreateUserModal";
import EditUserModal from "../../components/admin/users/EditUserModal";
import DeleteUserDialog from "../../components/admin/users/DeleteUserDialog";

export default function UserManagementPage() {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Search & Filter State
  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("ALL");

  // Modals
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserItem | null>(null);
  const [deletingUser, setDeletingUser] = useState<UserItem | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err: any) {
      setError(err.message || "Failed to load chamber personnel.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleActive = async (user: UserItem) => {
    try {
      const updated = await updateUser(user.id, { is_active: !user.is_active });
      setUsers((prev) => prev.map((u) => (u.id === user.id ? updated : u)));
    } catch (err: any) {
      alert(err.message || "Failed to toggle status");
    }
  };

  // Filter Pipeline
  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.full_name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      (u.bar_council_id && u.bar_council_id.toLowerCase().includes(search.toLowerCase()));

    const matchesRole = selectedRole === "ALL" || u.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case "SUPER_ADMIN":
        return "bg-[#001C41] text-[#E5BD79] border-[#96702A]/40";
      case "SENIOR_PARTNER":
        return "bg-[#FAF7F0] text-[#96702A] border-[#96702A]/30";
      case "ASSOCIATE_EDITOR":
        return "bg-slate-100 text-slate-800 border-slate-200";
      default:
        return "bg-amber-50 text-amber-800 border-amber-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Header & Actions Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#96702A]/20">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#96702A] animate-pulse" />
            <span className="text-[10.5px] font-mono tracking-[0.22em] uppercase text-[#96702A] font-semibold">
              Security & RBAC Terminal
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl text-[#001C41] font-semibold tracking-tight mt-0.5">
            Advocate & Staff Registry
          </h1>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={fetchUsers}
            disabled={loading}
            className="p-2 rounded-[2px] bg-white border border-[#96702A]/30 text-[#001C41] hover:bg-[#FAF7F0] transition-colors disabled:opacity-50"
            title="Refresh Registry"
          >
            <RotateCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-[#96702A]" : ""}`} />
          </button>

          <button
            onClick={() => setIsCreateOpen(true)}
            className="px-4 py-2 rounded-[2px] bg-[#001C41] text-white hover:bg-[#96702A] transition-colors text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-sm"
          >
            <UserPlus className="w-3.5 h-3.5 text-[#E5BD79]" />
            <span>Provision Counsel</span>
          </button>
        </div>
      </div>

      {/* 2. Filter Strip */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between bg-white border border-[#96702A]/20 p-3 rounded-[2px] shadow-sm">
        <div className="relative flex-1 max-w-sm">
          <input
            type="text"
            placeholder="Search counsel name, email, bar ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 border border-[#96702A]/25 rounded-[2px] text-xs text-[#001C41] focus:outline-none focus:border-[#96702A] bg-[#FAF7F0]/40"
          />
          <Search className="w-3.5 h-3.5 text-[#96702A] absolute left-2.5 top-2.5 pointer-events-none" />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto text-xs">
          {["ALL", "SUPER_ADMIN", "SENIOR_PARTNER", "ASSOCIATE_EDITOR", "INQUIRY_OFFICER"].map((role) => (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              className={`px-3 py-1 rounded-[2px] border text-[11px] font-mono uppercase whitespace-nowrap transition-colors ${
                selectedRole === role
                  ? "bg-[#001C41] text-white border-[#001C41]"
                  : "bg-[#FAF7F0] text-[#001C41]/80 border-[#96702A]/20 hover:border-[#96702A]"
              }`}
            >
              {role.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Error Banner */}
      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-[2px] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{error}</span>
          </div>
          <button onClick={fetchUsers} className="underline text-[11px] font-mono font-semibold">
            Retry Connection
          </button>
        </div>
      )}

      {/* 4. Counsel Ledger Grid */}
      <div className="bg-white border border-[#96702A]/20 rounded-[3px] shadow-[0_4px_20px_rgba(0,28,65,0.03)] overflow-hidden">
        {loading && users.length === 0 ? (
          <div className="py-20 flex flex-col items-center justify-center gap-2">
            <Loader2 className="w-7 h-7 animate-spin text-[#96702A]" />
            <span className="text-xs font-mono text-[#001C41]/70">Querying chamber staff...</span>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="py-16 text-center text-xs font-mono text-[#555]">
            No advocate credentials match the search parameters.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#FAF7F0] text-[#001C41] border-b border-[#96702A]/20 uppercase tracking-wider text-[10px] font-mono">
                  <th className="py-3 px-4">Advocate Identity</th>
                  <th className="py-3 px-4">Designation & Bar ID</th>
                  <th className="py-3 px-4">RBAC Clearance</th>
                  <th className="py-3 px-4">Authorization</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#001C41]/5">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-[#FAF7F0]/40 transition-colors">
                    {/* Name & Email */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#001C41] text-[#E5BD79] flex items-center justify-center font-serif text-xs font-bold shrink-0">
                          {u.full_name[0]}
                        </div>
                        <div>
                          <span className="font-semibold text-[#001C41] block">
                            {u.full_name}
                          </span>
                          <span className="text-[11px] text-[#555] font-mono">
                            {u.email}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Designation & Bar Council ID */}
                    <td className="py-3.5 px-4 text-[#001C41]">
                      <div className="font-medium">{u.designation}</div>
                      {u.bar_council_id ? (
                        <div className="flex items-center gap-1 text-[10px] font-mono text-[#96702A] mt-0.5">
                          <Award className="w-3 h-3" />
                          <span>{u.bar_council_id}</span>
                        </div>
                      ) : (
                        <span className="text-[10px] text-slate-400 font-mono">No Bar ID</span>
                      )}
                    </td>

                    {/* Role */}
                    <td className="py-3.5 px-4">
                      <span className={`inline-block px-2.5 py-1 rounded-[2px] text-[9.5px] font-mono uppercase tracking-wider border ${getRoleBadge(u.role)}`}>
                        {u.role.replace("_", " ")}
                      </span>
                    </td>

                    {/* Active Toggle */}
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => handleToggleActive(u)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-[2px] text-[10px] font-mono tracking-wider transition-colors ${
                          u.is_active
                            ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                            : "bg-rose-50 text-rose-800 border border-rose-200"
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${u.is_active ? "bg-emerald-600" : "bg-rose-600"}`} />
                        <span>{u.is_active ? "ACTIVE" : "SUSPENDED"}</span>
                      </button>
                    </td>

                    {/* Action buttons */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setEditingUser(u)}
                          className="p-1.5 rounded hover:bg-[#FAF7F0] text-[#001C41] hover:text-[#96702A] transition-colors"
                          title="Edit Advocate Profile"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeletingUser(u)}
                          className="p-1.5 rounded hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors"
                          title="Revoke Counsel"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 5. Modals Engine */}
      <CreateUserModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSuccess={(newUser) => setUsers([newUser, ...users])}
      />

      <EditUserModal
        user={editingUser}
        isOpen={!!editingUser}
        onClose={() => setEditingUser(null)}
        onSuccess={(updated) => {
          setUsers(users.map((u) => (u.id === updated.id ? updated : u)));
        }}
      />

      <DeleteUserDialog
        user={deletingUser}
        isOpen={!!deletingUser}
        onClose={() => setDeletingUser(null)}
        onSuccess={(deletedId) => {
          setUsers(users.filter((u) => u.id !== deletedId));
        }}
      />
    </div>
  );
}