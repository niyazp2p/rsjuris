// app/data/practiceAreasData.ts

export interface PracticeAreaDetail {
  slug: string;
  num: string;
  roman: string;
  title: string;
  tagline: string;
  focus: string; // Verbatim focus from PRD §6.3
  overview: string;
  forums: string[];
  audienceType: "both" | "business" | "individual";
  services: {
    title: string; // Verbatim item from PRD §6.3.1../..
    description: string;
  }[];
  strategicApproachNote?: string; // Specific approach note from PRD where provided../..
}

export const practiceAreasData: Record<string, PracticeAreaDetail> = {
  "corporate-commercial": {
    slug: "corporate-commercial",
    num: "01",
    roman: "I",
    title: "Corporate & Commercial Law",
    tagline: "Institutional Advisory & Business Structuring",
    focus: "Comprehensive legal support for businesses, companies, entrepreneurs, and commercial organizations.", // PRD §6.3../..
    overview:
      "Our chambers act as strategic legal fiduciaries to enterprise boards, multinational corporations, founders, and domestic conglomerates. We navigate complex statutory regimes, cross-border regulatory compliance, shareholder dynamics, and transactional risk mitigation.",
    forums: ["National Company Law Tribunal (NCLT)", "NCLAT", "High Courts (Commercial Divisions)", "Reserve Bank of India (FEMA)", "Registrar of Companies (ROC)"],
    audienceType: "business",
    services: [ // Verbatim PRD §6.3.1../..
      { title: "Corporate advisory", description: "Strategic counsel on governance, fiduciary accountability, board compliance, and Indian statutory frameworks." },
      { title: "Business structuring", description: "Advising on corporate entity formation, joint ventures, subsidiary creation, and capital reorganization." },
      { title: "Commercial agreements", description: "Structuring, drafting, and negotiating master service pacts, franchise arrangements, and licensing contracts." },
      { title: "Contracts and documentation", description: "Bespoke legal documentation designed to protect enterprise value and minimize litigation exposure." },
      { title: "Shareholder and partnership matters", description: "Drafting shareholder agreements (SHA), voting trusts, founder pacts, and resolving internal deadlock." },
      { title: "Corporate governance", description: "Ensuring board procedures, statutory disclosures, and secretarial compliance conform to the Companies Act." },
      { title: "Due diligence", description: "Comprehensive corporate, financial, and regulatory legal audits for acquisitions and investments." },
      { title: "Legal risk assessment", description: "Evaluating operational and regulatory liabilities before business inflection points and mergers." },
      { title: "Business transactions", description: "End-to-end legal support for asset transfers, slump sales, corporate buyouts, and private equity investments." },
    ]
  },

  "civil-litigation": {
    slug: "civil-litigation",
    num: "02",
    roman: "II",
    title: "Civil Litigation & Dispute Resolution",
    tagline: "Appellate Advocacy & Trial Court Representation",
    focus: "We provide representation and legal assistance in civil disputes before appropriate courts and forums.", // PRD §6.3../..
    overview:
      "RS Juris & Co. delivers formidable advocacy across all levels of the civil judicial hierarchy. From securing interim ex-parte injunctions in original suits to presenting complex civil appeals before High Courts and the Supreme Court of India.",
    forums: ["Supreme Court of India", "High Courts", "District & Sessions Courts", "Commercial Courts", "Civil Appellate Tribunals"],
    audienceType: "both",
    strategicApproachNote: "Approach focuses on understanding the underlying commercial or personal interests involved and developing an appropriate litigation or settlement strategy.", // PRD §6.3.1../..
    services: [ // Verbatim PRD §6.3.1../..
      { title: "Property disputes", description: "Title adjudication, boundary declarations, ancestral partition suits, and possession enforcement." },
      { title: "Contractual disputes", description: "Suits for breach of contract, liquidated damages claims, and rescission of commercial instruments." },
      { title: "Recovery proceedings", description: "Filing and defending summary suits (Order XXXVII CPC), execution petitions, and statutory recovery claims." },
      { title: "Injunction matters", description: "Securing urgent temporary, mandatory, and perpetual injunctions to safeguard assets and personal rights." },
      { title: "Partnership and business disputes", description: "Dissolution of partnerships, accounts rendering, and partner asset restitution." },
      { title: "Commercial disputes", description: "High-value commercial trials before dedicated Commercial Courts under the Commercial Courts Act." },
      { title: "Declaration and specific performance matters", description: "Enforcing specific performance of agreements to sell, developer pacts, and declarative decrees." },
      { title: "Civil appeals and related proceedings", description: "Drafting First Appeals (RFA), Second Appeals (RSA), and Special Leave Petitions (SLP) before Apex Courts." },
      { title: "Negotiation and settlement", description: "Structured out-of-court settlements and mediation to achieve legally binding dispute resolution." }
    ]
  },

  "criminal-law": {
    slug: "criminal-law",
    num: "03",
    roman: "III",
    title: "Criminal Law & Trial Defense",
    tagline: "Liberty Defense, Economic Offenses & Trial Advocacy",
    focus: "Legal representation and assistance in criminal proceedings at various stages.", // PRD §6.3../..
    overview:
      "We defend personal liberty and sovereign corporate interests in complex trial proceedings, specialized agency inquiries (ED, CBI, SFIO), and appellate courts with strict adherence to constitutional due process.",
    forums: ["Supreme Court of India", "High Courts", "Special CBI & PMLA Courts", "Sessions Courts", "Magistrate Courts"],
    audienceType: "both",
    strategicApproachNote: "Timely legal assistance while maintaining strict confidentiality and professional standards.", // PRD §6.3.1../..
    services: [ // Verbatim PRD §6.3.1../..
      { title: "Criminal defence", description: "Rigorous trial defense, witness cross-examination, and evidentiary scrutiny across all stages of trial." },
      { title: "Bail and anticipatory bail matters", description: "Urgent anticipatory bail (Sec 438 CrPC / Sec 482 BNSS) and regular bail applications before High Courts and Apex Courts." },
      { title: "Criminal complaints", description: "Drafting and filing private complaints under Section 200 CrPC / Section 223 BNSS and Section 138 NI Act." },
      { title: "FIR-related proceedings", description: "Advising upon FIR registration, police station appearances, and defending rights during investigation." },
      { title: "Criminal trials", description: "Formidable courtroom representation from framing of charges through defense evidence and final arguments." },
      { title: "Appeals and revisions", description: "Appellate advocacy against conviction decrees and criminal revisions against interlocutory orders." },
      { title: "Quashing proceedings", description: "Petitioning High Courts under Section 482 CrPC / Section 528 BNSS for quashing frivolous FIRs and chargesheets." },
      { title: "Representation before investigating authorities", description: "Advising corporate directors and individuals during inquiries by Enforcement Directorate, CBI, and Police." },
      { title: "Legal consultation in criminal matters", description: "Pre-litigation legal risk assessment and forensic analysis of criminal statutory liabilities." }
    ]
  },

  "property-real-estate": {
    slug: "property-real-estate",
    num: "04",
    roman: "IV",
    title: "Property & Real Estate Law",
    tagline: "Title Forensics, RERA Adjudication & Conveyancing",
    focus: "Assistance navigating the legal aspects of property transactions and disputes.", // PRD §6.3../..
    overview:
      "Providing institutional real estate advisory, title verification forensics, builder-buyer disputes, and high-stakes real estate transactions across residential, commercial, and industrial segments.",
    forums: ["Real Estate Regulatory Authority (RERA)", "RERA Appellate Tribunal (REAT)", "Civil Courts", "High Courts", "Revenue Courts"],
    audienceType: "both",
    services: [ // Verbatim PRD §6.3.1../..
      { title: "Property due diligence", description: "30-year revenue search, encumbrance verification, and municipal sanction audit to eliminate acquisition risks." },
      { title: "Sale and purchase documentation", description: "Drafting agreements to sell, conveyance instruments, and indemnity bonds protecting transaction funds." },
      { title: "Sale deeds and agreements", description: "Precision execution of deeds of sale, conveyance, and absolute transfer documentation." },
      { title: "Lease and licence agreements", description: "Commercial leasing contracts, leave & license deeds, lock-in covenants, and eviction mechanisms." },
      { title: "Property disputes", description: "Title suits, adverse possession defenses, co-ownership partition claims, and easement disputes." },
      { title: "Title verification", description: "Legal search reports on ownership pedigree, mutation entries, and clearance from state development authorities." },
      { title: "Registration-related matters", description: "Compliance before Sub-Registrar offices, stamp duty calculations, and defect rectification." },
      { title: "Real estate documentation", description: "Power of attorney documents, builder-allottee agreements, and development rights transfers." },
      { title: "Joint development and related agreements", description: "Structuring joint development agreements (JDA), revenue-sharing ratios, and developer covenants." }
    ]
  },

  "family-matrimonial": {
    slug: "family-matrimonial",
    num: "05",
    roman: "V",
    title: "Family & Matrimonial Law",
    tagline: "Private Wealth Succession, Custody & Matrimonial Disputes",
    focus: "Sensitive and confidential legal assistance in family and matrimonial matters.", // PRD §6.3../..
    overview:
      "Our chambers manage high-net-worth matrimonial disputes, multi-generational estate partitioning, child guardianship, and trust structures with utmost discretion and empathetic fiduciary care.",
    forums: ["Family Courts", "High Courts", "Supreme Court of India", "Mediation & Conciliation Centres"],
    audienceType: "individual",
    strategicApproachNote: "Clear legal guidance while handling sensitive family matters with professionalism and discretion.", // PRD §6.3.1../..
    services: [ // Verbatim PRD §6.3.1../..
      { title: "Divorce proceedings", description: "Contested divorce petitions on statutory grounds across applicable personal laws and Special Marriage Act." },
      { title: "Mutual consent divorce", description: "Expedited mutual divorce proceedings (Sec 13B Hindu Marriage Act) with complete asset settlement pacts." },
      { title: "Matrimonial disputes", description: "Comprehensive defense and representation in matrimonial litigation, restitution of conjugal rights, and annulments." },
      { title: "Maintenance proceedings", description: "Petitions for interim maintenance, permanent alimony, and financial support under Section 125 CrPC and personal laws." },
      { title: "Child custody matters", description: "Securing custody rights, visitation schedules, and cross-border parenting arrangements protecting child welfare." },
      { title: "Domestic violence matters", description: "Representation under Protection of Women from Domestic Violence Act (DV Act), residence orders, and protections." },
      { title: "Guardianship", description: "Legal guardianship appointments under the Guardians and Wards Act for minors and incapacitated individuals." },
      { title: "Family settlements", description: "Drafting comprehensive family settlement deeds (FSD) and partition deeds to resolve multi-generational claims." },
      { title: "Property and inheritance issues", description: "Probate of Wills, Letters of Administration, succession certificates, and ancestral property partition." },
      { title: "Mediation and negotiated settlements", description: "Amicable mediation to achieve confidential, legally binding dispute resolution without protracted trial." }
    ]
  },

  "employment-labour": {
    slug: "employment-labour",
    num: "06",
    roman: "VI",
    title: "Employment & Labour Law",
    tagline: "Workforce Governance, Industrial Relations & Executive Disputes",
    focus: "Advice to employers, employees, and organizations on employment-related legal matters.", // PRD §6.3../..
    overview:
      "Counselling multinational corporations, startups, senior leadership, and workmen across employment compliance, executive covenants, POSH implementation, and industrial tribunal litigation.",
    forums: ["Industrial Tribunals", "Labour Courts", "High Courts", "Authority under Payment of Gratuity Act", "Provident Fund Appellate Tribunal (CGIT)"],
    audienceType: "both",
    services: [ // Verbatim PRD §6.3.1../..
      { title: "Employment agreements", description: "Executive employment contracts, non-disclosure agreements (NDA), non-compete, and non-solicit covenants." },
      { title: "HR policies", description: "Drafting employee handbooks, disciplinary protocols, code of conduct, and leave policies." },
      { title: "Workplace disputes", description: "Resolving managerial friction, whistleblower complaints, and executive contract enforcement." },
      { title: "Termination-related matters", description: "Advising on lawful termination, performance-improvement separations, and severance settlement structuring." },
      { title: "Employee claims", description: "Representation in disputes concerning unpaid bonuses, ESOP vesting, wrongful termination, and dues." },
      { title: "Labour disputes", description: "Handling collective bargaining negotiations, strikes, retrenchment, and union dispute advocacy." },
      { title: "Disciplinary proceedings", description: "Conducting and advising on domestic inquiries, chargesheets, and internal workplace probes." },
      { title: "Employment compliance", description: "Statutory adherence to the Four Labour Codes, EPF, ESI, Payment of Wages, and Maternity Benefit Act." },
      { title: "Workplace documentation", description: "POSH policy documentation, internal complaints committee (ICC) constitution, and inquiry protocols." },
      { title: "Legal notices and representation", description: "Drafting and responding to employment breach notices and representing clients before Labour Commissioners." }
    ]
  },

  "banking-financial": {
    slug: "banking-financial",
    num: "07",
    roman: "VII",
    title: "Banking & Financial Disputes",
    tagline: "Debt Recovery, Insolvency (IBC) & Financial Litigation",
    focus: "Assistance to individuals, businesses, and financial institutions in banking and financial disputes.", // PRD §6.3../..
    overview:
      "Specialized advocacy across corporate insolvency resolution (IBC), SARFAESI asset enforcement, Debt Recovery Tribunals (DRT), and consortium loan restructuring.",
    forums: ["National Company Law Tribunal (NCLT)", "NCLAT", "Debt Recovery Tribunal (DRT)", "Debt Recovery Appellate Tribunal (DRAT)", "High Courts"],
    audienceType: "both",
    services: [ // Verbatim PRD §6.3.1../..
      { title: "Loan and recovery disputes", description: "Representing lenders, borrowers, and guarantors in high-value loan default and enforcement claims." },
      { title: "Banking documentation", description: "Reviewing loan facility agreements, mortgage deeds, debenture trust pacts, and hypothecation contracts." },
      { title: "Financial claims", description: "Filing and defending statutory financial claims before judicial and quasi-judicial tribunals." },
      { title: "Recovery proceedings", description: "Instituting original applications before Debt Recovery Tribunals (DRT) and executing recovery certificates." },
      { title: "Security and guarantee matters", description: "Enforcing personal and corporate guarantees, collateral security pledges, and equitable mortgages." },
      { title: "Negotiation and settlement", description: "Structuring One-Time Settlements (OTS) and corporate loan restructuring plans with institutional lenders." },
      { title: "Related litigation and advisory", description: "Challenging SARFAESI Securitisation notices (Sec 13/14) and IBC Section 7/9 insolvency proceedings." }
    ]
  },

  "intellectual-property": {
    slug: "intellectual-property",
    num: "08",
    roman: "VIII",
    title: "Intellectual Property Rights",
    tagline: "Brand Defense, Trademark Prosecution & IP Litigation",
    focus: "Assistance protecting and enforcing intellectual property rights.", // PRD §6.3../..
    overview:
      "Guarding enterprise intangible assets through trademark prosecution, copyright enforcement, design registration, and urgent passing-off and infringement injunctions.",
    forums: ["Trade Marks Registry", "Commercial Divisions of High Courts", "IPD (Intellectual Property Division, Delhi High Court)", "Copyright Office"],
    audienceType: "both",
    services: [ // Verbatim PRD §6.3.1../..
      { title: "Trademark advisory", description: "Brand clearance searches, registrability opinions, and classification analysis under the Trade Marks Act." },
      { title: "Trademark registration assistance", description: "Filing and prosecuting national and international trademark applications through to registration." },
      { title: "Copyright matters", description: "Registering literary, artistic, and software copyrights, and managing digital copyright enforcement." },
      { title: "Brand protection", description: "Monitoring domain squatting, anti-counterfeiting strategies, and protecting trade dress." },
      { title: "IP licensing", description: "Drafting trademark licensing agreements, technology transfer pacts, and brand franchising covenants." },
      { title: "Intellectual property disputes", description: "Initiating and defending opposition proceedings and cancellation petitions before the Registry." },
      { title: "Infringement matters", description: "Securing urgent ex-parte Anton Piller and John Doe injunctions against trademark and patent infringers." },
      { title: "Legal notices", description: "Serving Cease & Desist statutory notices and drafting contestations to trade secret violations." },
      { title: "IP-related agreements", description: "IP assignment deeds, co-existence agreements, work-for-hire pacts, and software development NDAs." }
    ]
  },

  "arbitration-adr": {
    slug: "arbitration-adr",
    num: "09",
    roman: "IX",
    title: "Arbitration & Alternative Dispute Resolution",
    tagline: "Domestic & International Commercial ADR Tribunals",
    focus: "Advisory and representation in alternative dispute-resolution mechanisms.", // PRD §6.3../..
    overview:
      "Providing seasoned representation before domestic and international arbitral tribunals (DIAC, SIAC, LCIA, MCIA), securing Section 9 interim relief, and post-award enforcement.",
    forums: ["Institutional Arbitral Tribunals", "Ad-Hoc Tribunals", "High Courts (Sec 9, 11, 34, 37)", "Supreme Court of India"],
    audienceType: "both",
    strategicApproachNote: "Objective is to help clients identify legally sound and commercially practical avenues for resolving disputes.", // PRD §6.3.1../..
    services: [ // Verbatim PRD §6.3.1../..
      { title: "Arbitration", description: "Representation across high-value ad-hoc commercial arbitrations from claim statements to final award." },
      { title: "Mediation", description: "Facilitating structured commercial mediation to resolve contentious disputes confidentially." },
      { title: "Conciliation", description: "Statutory conciliation proceedings under the Arbitration and Conciliation Act, 1996." },
      { title: "Commercial settlements", description: "Negotiating binding consent awards and settlement agreements protecting commercial equity." },
      { title: "Arbitration agreements", description: "Drafting bulletproof arbitration clauses covering seat, venue, governing law, and tribunal composition." },
      { title: "Arbitration proceedings", description: "Appearing before institutional arbitral forums (DIAC, SIAC, ICC) in domestic and cross-border disputes." },
      { title: "Enforcement-related matters", description: "Executing domestic and foreign arbitral awards under Part I and Part II of the Act." },
      { title: "Negotiated dispute resolution", description: "Litigation risk modeling to guide pre-dispute settlement before initiating formal arbitration." }
    ]
  }
};