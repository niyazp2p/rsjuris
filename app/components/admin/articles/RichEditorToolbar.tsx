"use client";

import React, { useRef } from "react";
import { 
  Bold, 
  Italic, 
  Heading2, 
  Heading3, 
  Quote, 
  List, 
  ListOrdered, 
  Scale, 
  BookOpen, 
  Link as LinkIcon 
} from "lucide-react";

interface Props {
  value: string;
  onChange: (val: string) => void;
}

export default function RichEditorToolbar({ value, onChange }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const applyFormat = (prefix: string, suffix: string, defaultPlaceholder = "text") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end) || defaultPlaceholder;

    const replacement = `${prefix}${selectedText}${suffix}`;
    const nextValue = value.substring(0, start) + replacement + value.substring(end);

    onChange(nextValue);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + selectedText.length);
    }, 0);
  };

  return (
    <div className="border border-[#96702A]/30 rounded-[3px] overflow-hidden bg-white shadow-xs">
      {/* 1. Visual Action Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 bg-[#FAF7F0] border-b border-[#96702A]/20">
        {/* Headings */}
        <button
          type="button"
          onClick={() => applyFormat("<h2>", "</h2>", "Section Heading")}
          className="p-1.5 rounded-[2px] hover:bg-white text-[#001C41] border border-transparent hover:border-[#96702A]/20 text-xs flex items-center gap-1 font-mono transition-colors"
          title="Section Heading (H2)"
        >
          <Heading2 className="w-3.5 h-3.5 text-[#96702A]" />
          <span>H2</span>
        </button>

        <button
          type="button"
          onClick={() => applyFormat("<h3>", "</h3>", "Sub-Section Title")}
          className="p-1.5 rounded-[2px] hover:bg-white text-[#001C41] border border-transparent hover:border-[#96702A]/20 text-xs flex items-center gap-1 font-mono transition-colors"
          title="Sub-Section Title (H3)"
        >
          <Heading3 className="w-3.5 h-3.5 text-[#96702A]" />
          <span>H3</span>
        </button>

        <div className="w-[1px] h-4 bg-[#96702A]/20 mx-1" />

        {/* Basic Styling */}
        <button
          type="button"
          onClick={() => applyFormat("<strong>", "</strong>", "bold text")}
          className="p-1.5 rounded-[2px] hover:bg-white text-[#001C41] transition-colors"
          title="Bold"
        >
          <Bold className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={() => applyFormat("<em>", "</em>", "italic text")}
          className="p-1.5 rounded-[2px] hover:bg-white text-[#001C41] transition-colors"
          title="Italic"
        >
          <Italic className="w-3.5 h-3.5" />
        </button>

        <div className="w-[1px] h-4 bg-[#96702A]/20 mx-1" />

        {/* Legal Callouts & Citations */}
        <button
          type="button"
          onClick={() => applyFormat("<blockquote>", "</blockquote>", "Judicial precedent or Supreme Court observation...")}
          className="p-1.5 rounded-[2px] hover:bg-white text-[#001C41] border border-transparent hover:border-[#96702A]/20 text-[11px] flex items-center gap-1 font-mono transition-colors"
          title="Court Precedent Quote"
        >
          <Quote className="w-3.5 h-3.5 text-[#96702A]" />
          <span>Court Citation</span>
        </button>

        <button
          type="button"
          onClick={() => applyFormat('<p class="statutory-note"><strong>Statutory Reference:</strong> ', "</p>", "Section 9, Arbitration & Conciliation Act, 1996")}
          className="p-1.5 rounded-[2px] hover:bg-white text-[#001C41] border border-transparent hover:border-[#96702A]/20 text-[11px] flex items-center gap-1 font-mono transition-colors"
          title="Statutory Section Callout"
        >
          <Scale className="w-3.5 h-3.5 text-[#96702A]" />
          <span>Statute Note</span>
        </button>

        <div className="w-[1px] h-4 bg-[#96702A]/20 mx-1" />

        {/* Lists */}
        <button
          type="button"
          onClick={() => applyFormat("<ul>\n  <li>", "</li>\n  <li>Second key point</li>\n</ul>", "First key point")}
          className="p-1.5 rounded-[2px] hover:bg-white text-[#001C41] transition-colors"
          title="Bullet Points"
        >
          <List className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={() => applyFormat("<ol>\n  <li>", "</li>\n  <li>Procedural step 2</li>\n</ol>", "Procedural step 1")}
          className="p-1.5 rounded-[2px] hover:bg-white text-[#001C41] transition-colors"
          title="Numbered Steps"
        >
          <ListOrdered className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 2. Text Input Area */}
      <textarea
        ref={textareaRef}
        rows={15}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Draft your analysis here. Use the buttons above to format headings, citations, and bullet points with 1-click..."
        className="w-full p-4 text-xs font-sans leading-relaxed text-[#001C41] bg-white focus:outline-none focus:ring-0 resize-y"
      />

      {/* 3. Live Preview Drawer Toggle Strip */}
      <div className="px-4 py-2 bg-[#FAF7F0] border-t border-[#96702A]/15 flex items-center justify-between text-[11px] font-mono text-[#555]">
        <span>Standard clean formatting active</span>
        <span>{value ? `${value.trim().split(/\s+/).length} words` : "0 words"}</span>
      </div>
    </div>
  );
}