const SITE = {
  name: "Project Sovereign",
  shortName: "Sovereign",
  origin: "https://www.projectsovereign.eu",
  updated: "2026-06-03",
  description:
    "Project Sovereign is a self-hostable European document suite for institutions that need DOCX editing, EEA residency, audit logs, key custody, and regulatory control.",
  emailFallback: "deployment@projectsovereign.eu",
};

const nav = [
  ["Editor", "/editor"],
  ["Deploy", "/deploy"],
  ["Security", "/security"],
  ["Resources", "/resources"],
  ["Contact", "/contact"],
];

const footer = [
  {
    title: "Product",
    links: [
      ["Editor", "/editor"],
      ["Deploy", "/deploy"],
      ["Security", "/security"],
      ["DOCX compatibility", "/resources/docx-compatibility-methodology"],
    ],
  },
  {
    title: "Compliance",
    links: [
      ["Data residency", "/security/data-residency"],
      ["Sub-processors", "/security/subprocessors"],
      ["NIS2 Article 21", "/compliance/nis2-article-21"],
      ["DORA", "/compliance/dora"],
    ],
  },
  {
    title: "Deployment",
    links: [
      ["On-prem", "/deployment/on-prem"],
      ["Private cloud", "/deployment/private-cloud"],
      ["Air-gapped", "/deployment/air-gapped"],
      ["Request a review", "/contact"],
    ],
  },
  {
    title: "Project",
    links: [
      ["What it is", "/what-is-project-sovereign"],
      ["Governance", "/governance"],
      ["Resources", "/resources"],
      ["Contact", "/contact"],
    ],
  },
];

const faqs = [
  {
    q: "What is Project Sovereign?",
    a: "Project Sovereign is a self-hostable European document suite for institutions that need document workflows under their own operational, legal, and security control.",
  },
  {
    q: "Is this a self-service public deployment?",
    a: "No. The public site describes a prepared deployment path for qualified institutions. Deployment details, evidence packs, and target environments are confirmed during review.",
  },
  {
    q: "Does customer data have to leave the EEA?",
    a: "The intended deployment posture is EEA-resident by design. Each production deployment confirms regions, sub-processors, key custody, and data flow before handover.",
  },
  {
    q: "Are AI features on by default?",
    a: "No. AI is presented as optional and provider-controlled by the deploying institution. There is no default cloud AI provider in the public positioning.",
  },
  {
    q: "Can it run on-prem or air-gapped?",
    a: "The deployment model supports on-prem and private-cloud planning, with air-gapped deployments handled through prepared offline bundles and operations review.",
  },
];

const resources = [
  {
    slug: "why-we-picked-onlyoffice",
    tag: "Architecture",
    date: "2026-04-12",
    minutes: 7,
    title: "Why we picked OnlyOffice as the engine",
    excerpt:
      "An honest comparison of the open document engines considered for Sovereign, and why DOCX fidelity, inspectability, and deployment control mattered most.",
    sections: [
      {
        title: "The short version",
        body:
          "Project Sovereign is editor-first, so the document engine decision starts with DOCX round-tripping, collaborative editing, and a deployment model an institution can review. The public site currently positions OnlyOffice as the engine with the strongest fit for those constraints.",
      },
      {
        title: "The trade-off",
        body:
          "The choice is not framed as a claim that one open document project wins every category. It is a product fit decision: institutional document work needs strong Microsoft Office compatibility, predictable operations, and an engine that can sit inside a governed deployment boundary.",
      },
    ],
  },
  {
    slug: "nis2-article-21-mapped-to-sovereign",
    tag: "Compliance",
    date: "2026-04-02",
    minutes: 5,
    title: "NIS2 Article 21, mapped to Sovereign in one page",
    excerpt:
      "A short control-mapping brief for how document workflows can support risk analysis, incident handling, continuity, supply chain review, and cryptography obligations.",
    sections: [
      {
        title: "Why this exists",
        body:
          "NIS2 does not ask for poetic security language. It asks essential and important entities to manage concrete security measures. A document platform in that environment needs controls that map directly to Article 21 review questions.",
      },
      {
        title: "Current public status",
        body:
          "This is a public brief, not a certification artifact. Production evidence, customer-specific architecture, and release-specific material should be requested through the deployment review process.",
      },
    ],
  },
  {
    slug: "docx-compatibility-methodology",
    tag: "Engineering",
    date: "2026-03-25",
    minutes: 9,
    title: "DOCX compatibility methodology for sovereign document workflows",
    excerpt:
      "How Project Sovereign thinks about DOCX compatibility, regression testing, macro boundaries, visual fidelity, and safe document handling.",
    sections: [
      {
        title: "What compatibility means",
        body:
          "For regulated institutions, compatibility is not just opening a file. It means preserving structure, review state, signatures, comments, pagination, and the practical ability to leave the platform with documents intact.",
      },
      {
        title: "What the public site does not claim",
        body:
          "The public site should not publish exact corpus pass rates or weekly report claims unless a real methodology report and release archive exist. Until then, the responsible claim is that compatibility is a primary engineering constraint.",
      },
    ],
  },
  {
    slug: "migration-brief-for-regulated-organisations",
    tag: "Field notes",
    date: "2026-03-18",
    minutes: 12,
    title: "Migration brief for regulated organisations",
    excerpt:
      "A practical migration outline for teams moving sensitive document workflows into a sovereign deployment boundary.",
    sections: [
      {
        title: "Migration starts before files move",
        body:
          "The important work is mapping identity, roles, document classes, retention rules, backup windows, and stakeholder review. Tooling follows that map; it should not define it.",
      },
      {
        title: "Evidence to prepare",
        body:
          "A credible migration plan should include a document inventory, export strategy, SSO mapping, backup and restore plan, user support path, and security sign-off checklist.",
      },
    ],
  },
  {
    slug: "what-we-chose-not-to-build",
    tag: "Product",
    date: "2026-03-04",
    minutes: 6,
    title: "What we chose not to build, and why",
    excerpt:
      "Why Sovereign prioritizes document fidelity, auditability, deployment control, and quiet daily workflows over novelty features.",
    sections: [
      {
        title: "Restraint is a feature",
        body:
          "A sovereign document suite should first be dependable infrastructure. That means familiar editing, reliable exports, clean audit trails, and clear data boundaries before speculative collaboration features.",
      },
    ],
  },
  {
    slug: "backup-restore-friday-test",
    tag: "Operations",
    date: "2026-02-21",
    minutes: 4,
    title: "Backups, restores, and the Friday afternoon test",
    excerpt:
      "A short operations brief for proving that document backups can be restored when a real institution needs them.",
    sections: [
      {
        title: "The restore is the product",
        body:
          "Backups are not evidence until they are restored. A sovereign deployment should define backup scope, restore time, restore point, responsible owners, and how the test is recorded for review.",
      },
    ],
  },
  {
    slug: "schrems-ii-office-software",
    tag: "Compliance",
    date: "2026-02-08",
    minutes: 8,
    title: "Schrems II and office software risk",
    excerpt:
      "Why transfer risk still matters when the software holding contracts, case files, and confidential memoranda is treated as ordinary cloud productivity tooling.",
    sections: [
      {
        title: "Why office software matters",
        body:
          "Document tools hold high-value institutional knowledge. Transfer risk analysis therefore has to include documents, metadata, logs, support access, backups, analytics, and AI data flows.",
      },
    ],
  },
  {
    slug: "sovereign-release-0-4-brief",
    tag: "Release",
    date: "2026-01-30",
    minutes: 5,
    title: "Sovereign 0.4 release brief",
    excerpt:
      "A public release-style brief for comments, mentions, audit-log search, and compatibility guardrails.",
    sections: [
      {
        title: "Public release note posture",
        body:
          "Release pages should be factual, dated, and conservative. They should describe visible product capability and upgrade impact without inventing customer names, certifications, or unpublished artifacts.",
      },
    ],
  },
];

const complianceCards = [
  {
    title: "GDPR",
    meta: "Reg. (EU) 2016/679",
    body:
      "Sovereign is positioned around data minimisation, portability, erasure planning, and deployment boundaries that make processor review easier.",
  },
  {
    title: "NIS2",
    meta: "Dir. (EU) 2022/2555",
    body:
      "Document workflows need risk analysis, incident handling, continuity, supply-chain review, and cryptography evidence mapped to Article 21 controls.",
  },
  {
    title: "DORA",
    meta: "Reg. (EU) 2022/2554",
    body:
      "Financial entities need ICT vendor review, exit strategy, audit rights, resilience evidence, and clear sub-processor boundaries.",
  },
  {
    title: "EU AI Act",
    meta: "Reg. (EU) 2024/1689",
    body:
      "AI is described as optional, provider-controlled, auditable, and off by default rather than embedded as an unavoidable cloud feature.",
  },
];

const pages = [
  {
    path: "/",
    key: "home",
    title: "Project Sovereign | Self-Hosted European Document Suite",
    description: SITE.description,
    hero: {
      eyebrow: "PROJECT SOVEREIGN · A EUROPEAN MISSION",
      title: "Best-in-class software, built for a sovereign Europe",
      lead:
        "Project Sovereign is a self-hostable European document suite for institutions that need DOCX-compatible editing, EEA-resident deployments, auditability, and control over the infrastructure that holds their documents.",
      ctas: [
        ["Plan a deployment", "/contact", true],
        ["Read the security posture", "/security", false],
      ],
      home: true,
    },
    sections: [
      {
        eyebrow: "THE MISSION",
        title: "Document software is infrastructure",
        body:
          "Contracts, case files, ministerial briefings, hospital records, legal memos, and scientific papers should not be treated as disposable SaaS data. Project Sovereign exists so European institutions can run daily document work inside boundaries they understand and control.",
        cards: [
          ["Ambition", "A serious office/document suite, not a second-best compliance compromise."],
          ["Ownership", "Deployment paths designed for institutional control, review, and portability."],
          ["Residency", "EEA-resident data-flow planning, customer-managed key custody, and short sub-processor review."],
        ],
      },
      {
        eyebrow: "WHAT EUROPE GETS",
        title: "A modern document suite for regulated work",
        body:
          "Sovereign combines familiar document editing with deployment patterns that security, legal, and operations teams can inspect before handover.",
        cards: [
          ["DOCX-compatible editor", "Keyboard-first document editing, comments, review workflows, and real-time collaboration."],
          ["Self-hostable deployment", "On-prem, private-cloud, and European-cloud planning for institutions that need control."],
          ["Audit-ready posture", "Access logs, deployment evidence, sub-processor review, and compliance mapping by design."],
          ["AI as opt-in", "Model provider and data flow remain controlled by the deploying institution."],
        ],
      },
      {
        eyebrow: "WHO IT IS FOR",
        title: "Where sovereignty meets daily work",
        body:
          "Project Sovereign is aimed at institutions where document workflows cannot be treated as ordinary SaaS.",
        cards: [
          ["Government", "Federal and regional teams replacing external productivity tooling with reviewed deployments."],
          ["Banks and insurers", "DORA-scope teams that need exit strategy, audit rights, and operational resilience."],
          ["Healthcare and research", "Sensitive drafting workflows that require controlled regions, roles, and records."],
          ["Defence and dual-use", "Document collaboration for environments with strong supply-chain and deployment constraints."],
          ["Universities", "Federated identity, research consortia, and portable document formats."],
          ["Law firms", "Client-sensitive document work with custody, auditability, and export discipline."],
        ],
      },
      { eyebrow: "QUESTIONS", title: "What buyers ask before review", faqs },
    ],
  },
  {
    path: "/editor",
    key: "editor",
    title: "DOCX-Compatible Document Editor for Sovereign Work | Project Sovereign",
    description:
      "A DOCX-compatible, keyboard-first document editor with comments, review workflows, and real-time collaboration for sovereign European deployments.",
    hero: {
      eyebrow: "THE EDITOR",
      title: "A DOCX-compatible editor for sovereign work",
      lead:
        "The editor surface is built for the daily documents institutions already exchange: DOCX files, comments, revisions, legal memos, policy drafts, board papers, and compliance briefs.",
      ctas: [
        ["Review deployment options", "/deploy", true],
        ["Read compatibility methodology", "/resources/docx-compatibility-methodology", false],
      ],
    },
    sections: [
      {
        eyebrow: "WORKFLOW",
        title: "Familiar editing without giving up deployment control",
        body:
          "Sovereign is editor-first: the product experience starts with writing, reviewing, commenting, exporting, and collaborating on documents people already know how to work with.",
        cards: [
          ["Keyboard-first", "Familiar shortcuts, command access, and a restrained editing surface."],
          ["Review workflows", "Comments, suggestions, change review, and document state that can be audited."],
          ["Real-time collaboration", "Collaborative editing planned around institutional identity and access boundaries."],
        ],
      },
      {
        eyebrow: "COMPATIBILITY",
        title: "DOCX is the exit strategy",
        body:
          "For European institutions, document portability matters as much as interface polish. Sovereign treats DOCX compatibility as a core engineering constraint and avoids macro execution by default.",
      },
    ],
  },
  {
    path: "/deploy",
    key: "deploy",
    title: "Self-Host a European Office Suite On-Prem or Private Cloud",
    description:
      "Deployment preparation for a self-hosted European document suite across on-prem, private-cloud, and European-cloud environments.",
    hero: {
      eyebrow: "SELF-HOST",
      title: "Run document workflows where your institution can govern them",
      lead:
        "Project Sovereign deployments are prepared with each institution so residency, keys, identity, network requirements, backups, and audit evidence are captured before handover.",
      ctas: [
        ["Request deployment review", "/contact", true],
        ["Read on-prem path", "/deployment/on-prem", false],
      ],
    },
    sections: [
      {
        eyebrow: "PREPARATION",
        title: "Three checks before deployment",
        body:
          "A serious deployment starts with the operating boundary. Sovereign planning confirms the target environment, identity model, key custody, backup topology, network requirements, and evidence pack before production use.",
        steps: [
          "Confirm on-prem, private-cloud, or European-cloud target.",
          "Map SAML/OIDC, roles, administrative boundaries, and audit owners.",
          "Document key custody, backup/restore plan, TLS, domains, and sub-processors.",
        ],
      },
      {
        eyebrow: "TARGETS",
        title: "Deployment paths",
        cards: [
          ["On-prem", "Institution-controlled infrastructure with handover and operations review."],
          ["Private cloud", "Dedicated European cloud environments with customer-managed controls."],
          ["Air-gapped", "Offline-bundle planning for environments that cannot rely on internet access."],
        ],
      },
    ],
  },
  {
    path: "/security",
    key: "security",
    title: "GDPR, NIS2, DORA and EU AI Act Controls for Document Workflows",
    description:
      "Security and compliance posture for Project Sovereign, including GDPR, NIS2, DORA, EU AI Act, EEA residency, audit logging, and sub-processor controls.",
    hero: {
      eyebrow: "SECURITY & COMPLIANCE",
      title: "Built around the rules European institutions live by",
      lead:
        "Project Sovereign is positioned around European regulatory review: data minimisation, continuity, auditability, exit strategy, AI governance, and clear deployment boundaries.",
      ctas: [
        ["Request the security brief", "/contact", true],
        ["Review sub-processors", "/security/subprocessors", false],
      ],
    },
    sections: [
      {
        eyebrow: "CONTROL AREAS",
        title: "Compliance mapped to document workflows",
        body:
          "These are public positioning areas, not certifications. Deployment-specific evidence should be requested during review.",
        cards: complianceCards.map((c) => [c.title, `${c.meta}. ${c.body}`]),
      },
      {
        eyebrow: "DATA PATH",
        title: "Residency, logs, and AI boundaries",
        cards: [
          ["EEA residency", "Production deployments should confirm regions, sub-processors, backups, logs, and support access before handover."],
          ["Audit logs", "The intended posture records actors, actions, timestamps, sessions, and document state without exposing document bodies in logs."],
          ["AI opt-in", "AI features are not described as default cloud behavior. Provider choice and data flow belong to the deploying institution."],
        ],
      },
    ],
  },
  {
    path: "/resources",
    key: "resources",
    title: "European Document Sovereignty Resources | Project Sovereign",
    description:
      "Engineering notes, compliance briefs, deployment context, and field guidance for European document sovereignty.",
    hero: {
      eyebrow: "RESOURCES",
      title: "Notes from the project",
      lead:
        "Short public briefs on document sovereignty, deployment, compliance, DOCX compatibility, migration, backup testing, and European regulatory context.",
    },
    sections: [
      {
        eyebrow: "ALL POSTS",
        title: "Public briefs",
        articles: resources,
      },
    ],
  },
  {
    path: "/contact",
    key: "contact",
    title: "Request a Project Sovereign Deployment Review",
    description:
      "Contact Project Sovereign to discuss on-prem, private-cloud, or European-cloud deployment review for regulated document workflows.",
    schemaType: "ContactPage",
    hero: {
      eyebrow: "CONTACT",
      title: "Request a deployment review",
      lead:
        "Tell us about the environment, institution, and document workflow you want to bring under sovereign control. The request is forwarded through a server-side NatorOS webhook integration.",
    },
    contact: true,
  },
  {
    path: "/compliance",
    key: "compliance",
    title: "European Compliance for Sovereign Document Workflows",
    description:
      "Compliance context for Project Sovereign across GDPR, NIS2, DORA, EU AI Act, data residency, auditability, and vendor review.",
    hero: {
      eyebrow: "COMPLIANCE",
      title: "Compliance pages for document workflow review",
      lead:
        "These pages map Project Sovereign's public posture to the regulatory questions European institutions ask when document collaboration becomes part of ICT, security, and procurement review.",
    },
    sections: [
      {
        eyebrow: "READ NEXT",
        title: "Control areas",
        cards: [
          ["NIS2 Article 21", "Risk analysis, incidents, continuity, supply chain, and cryptography for document workflows.", "/compliance/nis2-article-21"],
          ["DORA", "ICT vendor risk, exit strategy, audit rights, resilience, and concentration-risk review.", "/compliance/dora"],
          ["Data residency", "Documents, metadata, logs, backups, support paths, and AI data flows.", "/security/data-residency"],
        ],
      },
    ],
  },
  {
    path: "/deployment",
    key: "deployment",
    title: "Project Sovereign Deployment Paths",
    description:
      "Deployment paths for Project Sovereign, including on-prem, private-cloud, European-cloud, and air-gapped planning.",
    hero: {
      eyebrow: "DEPLOYMENT",
      title: "Deployment paths for sovereign document work",
      lead:
        "Project Sovereign deployment starts with the operating boundary: infrastructure target, identity, keys, regions, backups, logs, support access, and handover responsibilities.",
      ctas: [["Request deployment review", "/contact", true]],
    },
    sections: [
      {
        eyebrow: "TARGETS",
        title: "Choose the operating envelope",
        cards: [
          ["On-prem", "Institution-controlled infrastructure with explicit operations handover.", "/deployment/on-prem"],
          ["Private cloud", "Dedicated European cloud environments with customer-managed review points.", "/deployment/private-cloud"],
          ["Air-gapped", "Offline-bundle planning for constrained or disconnected networks.", "/deployment/air-gapped"],
        ],
      },
    ],
  },
  {
    path: "/use-cases",
    key: "use-cases",
    title: "Project Sovereign Use Cases",
    description:
      "Use cases for sovereign document workflows across public sector, financial services, healthcare, research, defence, and legal work.",
    hero: {
      eyebrow: "USE CASES",
      title: "Where document sovereignty matters",
      lead:
        "Project Sovereign is aimed at institutions where document workflows are sensitive enough to require region, identity, audit, support, and exit-strategy review.",
    },
    sections: [
      {
        eyebrow: "SECTORS",
        title: "Initial public use cases",
        cards: [
          ["Public sector", "Policy, procurement, citizen records, and inter-agency drafting.", "/use-cases/public-sector-document-suite"],
          ["Financial services", "DORA-scope document workflows and ICT vendor review.", "/use-cases/dora-financial-services"],
          ["Healthcare", "Sensitive health-adjacent drafting, research, and operational documentation.", "/use-cases/healthcare-document-sovereignty"],
        ],
      },
    ],
  },
  {
    path: "/compare",
    key: "compare",
    title: "Project Sovereign Comparisons",
    description:
      "Factual comparison pages for Project Sovereign against Microsoft 365, Nextcloud Office, and OnlyOffice.",
    hero: {
      eyebrow: "COMPARE",
      title: "Comparison pages for institutional review",
      lead:
        "These pages are not attack pages. They clarify where Project Sovereign is meant to fit when teams compare global SaaS, self-hosted file platforms, document engines, and sovereign deployment requirements.",
    },
    sections: [
      {
        eyebrow: "COMPARISONS",
        title: "Read the fit notes",
        cards: [
          ["Microsoft 365", "Global SaaS maturity versus self-hosted deployment control and exit strategy.", "/compare/project-sovereign-vs-microsoft-365"],
          ["Nextcloud Office", "File-platform-first collaboration versus editor-first institutional document work.", "/compare/project-sovereign-vs-nextcloud-office"],
          ["OnlyOffice", "Document engine capabilities versus the broader Sovereign deployment shell.", "/compare/project-sovereign-vs-onlyoffice"],
        ],
      },
    ],
  },
  {
    path: "/security/subprocessors",
    key: "subprocessors",
    title: "Sub-processor Review for Sovereign Document Deployments",
    description:
      "How Project Sovereign approaches sub-processor review, EEA residency, notification, and deployment-specific vendor evidence.",
    hero: {
      eyebrow: "SUB-PROCESSORS",
      title: "Short lists, clear regions, deployment-specific review",
      lead:
        "A sovereign document deployment should not hide its processing chain. Project Sovereign's public posture is to keep sub-processor lists short, EEA-resident where required, and confirmed before production handover.",
      ctas: [["Request current list", "/contact", true]],
    },
    sections: [
      {
        eyebrow: "POLICY",
        title: "What the public posture commits to",
        steps: [
          "Document every vendor that can process customer data, metadata, logs, backups, support data, or billing data.",
          "Confirm region, purpose, retention, support access, and notification process before deployment.",
          "Keep production sub-processor evidence available by request rather than publishing unsupported universal claims.",
        ],
      },
    ],
  },
  {
    path: "/security/data-residency",
    key: "data-residency",
    title: "EEA Data Residency for Document Collaboration",
    description:
      "Project Sovereign's data residency posture for documents, metadata, audit logs, backups, regions, and support access.",
    hero: {
      eyebrow: "DATA RESIDENCY",
      title: "Where documents, logs, and backups are allowed to live",
      lead:
        "EEA residency is not only a region setting. For document software it includes documents, comments, metadata, search indexes, audit logs, backups, support tooling, and AI data flows.",
    },
    sections: [
      {
        eyebrow: "BOUNDARY",
        title: "Residency must cover the full document path",
        cards: [
          ["Documents and comments", "Primary content and collaboration state should remain inside the agreed deployment boundary."],
          ["Metadata and indexes", "Search, permissions, previews, and document metadata need the same residency review as the file itself."],
          ["Logs and backups", "Audit logs, operational logs, snapshots, and disaster recovery copies must be included in review."],
        ],
      },
    ],
  },
  {
    path: "/compliance/nis2-article-21",
    key: "nis2",
    title: "NIS2 Article 21 Controls for Document Workflows",
    description:
      "A public mapping of NIS2 Article 21 security measures to sovereign document workflow controls and evidence expectations.",
    schemaType: "TechArticle",
    hero: {
      eyebrow: "NIS2",
      title: "Article 21, mapped to document workflows",
      lead:
        "NIS2 Article 21 asks covered entities to manage risk, incidents, continuity, supply chain, cryptography, access, and training. A document platform in that environment needs to support evidence in each area.",
    },
    sections: [
      {
        eyebrow: "MAPPING",
        title: "Public control map",
        table: {
          headers: ["NIS2 area", "Sovereign evidence expectation"],
          rows: [
            ["Risk analysis", "Deployment review, data-flow map, roles, regions, and processor inventory."],
            ["Incident handling", "Audit logs, owner contacts, notification workflow, and exportable event records."],
            ["Continuity", "Backup/restore plan, restore testing, and documented recovery ownership."],
            ["Supply chain", "Pinned components, deployment evidence, and sub-processor review."],
            ["Cryptography", "TLS, encryption-at-rest posture, and customer-managed key custody planning."],
          ],
        },
      },
    ],
  },
  {
    path: "/compliance/dora",
    key: "dora",
    title: "DORA-Ready Document Workflow Review",
    description:
      "How DORA-scope financial entities can evaluate document workflow vendors for ICT risk, exit strategy, auditability, and resilience.",
    schemaType: "TechArticle",
    hero: {
      eyebrow: "DORA",
      title: "Document workflows are ICT risk too",
      lead:
        "DORA review should include the software where contracts, board papers, incident reports, policies, and regulator communications are drafted. Sovereign is positioned for institutions that need exit strategy, audit rights, and operational resilience evidence.",
    },
    sections: [
      {
        eyebrow: "REVIEW AREAS",
        title: "What financial entities should ask",
        cards: [
          ["Exit strategy", "Can documents leave in usable formats without vendor negotiation?"],
          ["Auditability", "Can the institution inspect access, sharing, edits, exports, and administrative changes?"],
          ["Concentration risk", "Which regions, providers, support paths, and dependencies are in the critical workflow?"],
          ["Resilience", "How are backup, restore, continuity, and incident processes tested and evidenced?"],
        ],
      },
    ],
  },
  {
    path: "/deployment/on-prem",
    key: "on-prem",
    title: "On-Prem Document Suite Deployment",
    description:
      "Plan an on-prem Project Sovereign deployment with identity, keys, backups, network requirements, audit evidence, and handover.",
    hero: {
      eyebrow: "ON-PREM",
      title: "A deployment path your institution can hold",
      lead:
        "On-prem deployment is for institutions that need operational custody of document infrastructure. Sovereign planning starts with identity, keys, network boundaries, backups, logging, and handover responsibilities.",
      ctas: [["Request on-prem review", "/contact", true]],
    },
    sections: [
      {
        eyebrow: "CHECKLIST",
        title: "On-prem planning checklist",
        steps: [
          "Confirm host environment, network segmentation, TLS/domain ownership, and administrative access.",
          "Map SAML/OIDC, roles, tenant boundaries, and break-glass access.",
          "Define backup and restore objectives, log retention, support access, and upgrade process.",
        ],
      },
    ],
  },
  {
    path: "/governance",
    key: "governance",
    title: "Project Sovereign Governance and Public Commitments",
    description:
      "Project Sovereign's public governance posture, claim discipline, evidence policy, and institutional deployment commitments.",
    hero: {
      eyebrow: "GOVERNANCE",
      title: "Public claims should be as disciplined as the product",
      lead:
        "Project Sovereign is presented as institutional infrastructure. That means public pages should distinguish current public evidence, deployment-specific evidence, planned governance, and claims that require review before publication.",
      ctas: [["Ask about governance", "/contact", true]],
    },
    sections: [
      {
        eyebrow: "COMMITMENTS",
        title: "How the project should communicate",
        cards: [
          ["Evidence-first", "Do not publish certifications, customer names, or release artifacts unless they exist and can be shared."],
          ["Deployment-specific", "Security and compliance evidence should be tied to the target environment under review."],
          ["Portable by design", "Document formats, exports, and exit planning should remain central to product decisions."],
        ],
      },
    ],
  },
  {
    path: "/what-is-project-sovereign",
    key: "what-is",
    title: "What Is Project Sovereign?",
    description:
      "Project Sovereign is a self-hostable European document suite for institutions that need EEA residency, auditability, and deployment control.",
    hero: {
      eyebrow: "EXPLAINER",
      title: "What is Project Sovereign?",
      lead:
        "Project Sovereign is a self-hostable European document suite for institutions that need document work under European rules, controlled infrastructure, EEA residency planning, audit logs, key custody, and practical exit paths.",
    },
    sections: [
      {
        eyebrow: "POSITION",
        title: "Not file sync. Not generic SaaS.",
        body:
          "The project is focused on document drafting, review, collaboration, and deployment control for public sector and regulated institutions. It is not positioned as a generic storage, chat, or consumer productivity product.",
      },
    ],
  },
  {
    path: "/use-cases/public-sector-document-suite",
    key: "public-sector",
    title: "Self-Hosted Document Suite for European Public Sector",
    description:
      "A sovereign document suite use case for ministries, agencies, municipalities, and regional government teams.",
    hero: {
      eyebrow: "PUBLIC SECTOR",
      title: "Document infrastructure for public institutions",
      lead:
        "Public-sector teams handle policy drafts, procurement files, citizen records, ministerial briefings, and inter-agency documents. Sovereign is intended for deployments where those workflows must remain reviewable and governed.",
      ctas: [["Discuss public-sector deployment", "/contact", true]],
    },
    sections: [
      {
        eyebrow: "NEEDS",
        title: "What public teams usually need",
        cards: [
          ["Residency", "Clear data-flow and region review for documents, metadata, logs, and backups."],
          ["Identity", "SAML/OIDC, administrative boundaries, and documented access control."],
          ["Procurement evidence", "Security, continuity, sub-processor, and exit strategy material for review."],
        ],
      },
    ],
  },
  {
    path: "/use-cases/dora-financial-services",
    key: "financial-services",
    title: "DORA-Scope Document Workflows for Financial Services",
    description:
      "Document collaboration planning for banks, insurers, and financial entities that need DORA-aligned ICT review.",
    hero: {
      eyebrow: "FINANCIAL SERVICES",
      title: "Document workflows inside DORA review",
      lead:
        "Banks and insurers produce regulated documents every day. A sovereign document platform should help teams evaluate ICT vendor risk, exit strategy, auditability, resilience, and concentration risk.",
      ctas: [["Review DORA posture", "/compliance/dora", true]],
    },
    sections: [
      {
        eyebrow: "BUYER QUESTIONS",
        title: "Questions before vendor approval",
        steps: [
          "Where are documents, metadata, logs, indexes, and backups processed?",
          "How can the institution exit without losing document fidelity?",
          "What evidence supports continuity, audit, access, and sub-processor review?",
        ],
      },
    ],
  },
  {
    path: "/use-cases/healthcare-document-sovereignty",
    key: "healthcare",
    title: "Healthcare and Clinical Research Document Sovereignty",
    description:
      "Sovereign document collaboration planning for hospitals, clinical research, and health-adjacent workflows.",
    hero: {
      eyebrow: "HEALTHCARE",
      title: "Sensitive drafting without ordinary SaaS assumptions",
      lead:
        "Hospitals and clinical research teams draft sensitive documents near patient, trial, procurement, and operational data. Sovereign is positioned for deployments where identity, residency, access logs, and support paths need careful review.",
      ctas: [["Discuss healthcare review", "/contact", true]],
    },
    sections: [
      {
        eyebrow: "REVIEW",
        title: "What to map first",
        cards: [
          ["Document classes", "Identify clinical, administrative, research, and procurement document categories."],
          ["Access paths", "Map staff roles, support access, audit owners, and emergency access procedures."],
          ["Retention", "Connect export, backup, restore, and erasure planning to institutional policy."],
        ],
      },
    ],
  },
  {
    path: "/deployment/private-cloud",
    key: "private-cloud",
    title: "Private Cloud Document Suite Deployment in Europe",
    description:
      "Private-cloud deployment planning for a European document suite with identity, key custody, regions, backup, and audit review.",
    hero: {
      eyebrow: "PRIVATE CLOUD",
      title: "A dedicated European cloud boundary",
      lead:
        "Private-cloud deployment is for teams that want managed infrastructure patterns while keeping region, key, access, support, and processor review inside an explicit European operating boundary.",
      ctas: [["Request private-cloud review", "/contact", true]],
    },
    sections: [
      {
        eyebrow: "DESIGN",
        title: "Private cloud review areas",
        cards: [
          ["Region and provider", "Confirm where each service, backup, log, and support path lives."],
          ["Keys", "Define customer-managed key custody, rotation, and access review."],
          ["Operations", "Clarify monitoring, incident response, upgrades, restore testing, and handover."],
        ],
      },
    ],
  },
  {
    path: "/deployment/air-gapped",
    key: "air-gapped",
    title: "Air-Gapped Document Collaboration Deployment Planning",
    description:
      "Air-gapped deployment planning for document collaboration in environments with offline, classified, or strongly constrained networks.",
    hero: {
      eyebrow: "AIR-GAPPED",
      title: "Offline document collaboration needs prepared operations",
      lead:
        "Air-gapped deployment is not a checkbox. It requires offline bundles, mirrored dependencies, update windows, support rules, restore testing, and a clear process for moving evidence and patches across the boundary.",
      ctas: [["Request air-gapped review", "/contact", true]],
    },
    sections: [
      {
        eyebrow: "REQUIREMENTS",
        title: "What the deployment plan must cover",
        steps: [
          "Offline image and package delivery.",
          "Registry mirroring and dependency pinning.",
          "Patch, backup, restore, and support process across the boundary.",
        ],
      },
    ],
  },
  {
    path: "/compare/project-sovereign-vs-microsoft-365",
    key: "compare-m365",
    title: "Project Sovereign vs Microsoft 365 for European Institutions",
    description:
      "A factual comparison of Project Sovereign and Microsoft 365 for institutions evaluating deployment control, EEA residency, and exit strategy.",
    hero: {
      eyebrow: "COMPARISON",
      title: "Project Sovereign vs Microsoft 365",
      lead:
        "Microsoft 365 is a mature global productivity platform. Project Sovereign is different: it is positioned for institutions that prioritise self-hosted deployment, document custody, EEA-resident review, and exit strategy over global SaaS convenience.",
      ctas: [["Discuss replacement scope", "/contact", true]],
    },
    sections: [
      {
        eyebrow: "DIFFERENCE",
        title: "Where Sovereign is meant to fit",
        table: {
          headers: ["Question", "Project Sovereign posture"],
          rows: [
            ["Can it be self-hosted?", "Yes, by design for institutional deployment review."],
            ["Who controls the deployment boundary?", "The deploying institution defines the environment and handover requirements."],
            ["What is the exit path?", "Portable document formats and deployment-specific export planning."],
          ],
        },
      },
    ],
  },
  {
    path: "/compare/project-sovereign-vs-nextcloud-office",
    key: "compare-nextcloud",
    title: "Project Sovereign vs Nextcloud Office",
    description:
      "A factual comparison of Project Sovereign and Nextcloud Office for teams evaluating editor-first document work and sovereign deployment control.",
    hero: {
      eyebrow: "COMPARISON",
      title: "Project Sovereign vs Nextcloud Office",
      lead:
        "Nextcloud Office is commonly evaluated by teams that want self-hosted collaboration. Project Sovereign is positioned more narrowly as an editor-first document suite for regulated institutional workflows, auditability, and deployment evidence.",
    },
    sections: [
      {
        eyebrow: "FIT",
        title: "Different starting point",
        body:
          "If the main job is file sync plus editing, Nextcloud may be the natural frame. If the main job is governed document drafting, review, audit, and evidence-heavy deployment, Sovereign is designed around that narrower workflow.",
      },
    ],
  },
  {
    path: "/compare/project-sovereign-vs-onlyoffice",
    key: "compare-onlyoffice",
    title: "Project Sovereign vs OnlyOffice",
    description:
      "A factual comparison of Project Sovereign and OnlyOffice for institutions evaluating document engine, deployment shell, governance, and compliance evidence.",
    hero: {
      eyebrow: "COMPARISON",
      title: "Project Sovereign vs OnlyOffice",
      lead:
        "OnlyOffice is a document engine and office suite. Project Sovereign publicly positions OnlyOffice as part of a broader sovereign deployment story: institutional shell, compliance posture, evidence, identity, auditability, and handover process.",
    },
    sections: [
      {
        eyebrow: "RELATIONSHIP",
        title: "Engine versus institutional deployment",
        body:
          "Sovereign should not claim to replace the engine it builds around. The value proposition is the packaging, governance, deployment boundary, buyer evidence, and workflow posture around document infrastructure.",
      },
    ],
  },
];

for (const post of resources) {
  pages.push({
    path: `/resources/${post.slug}`,
    key: `resource-${post.slug}`,
    title: `${post.title} | Project Sovereign`,
    description: post.excerpt,
    schemaType: "BlogPosting",
    datePublished: post.date,
    hero: {
      eyebrow: `${post.tag.toUpperCase()} · ${post.date} · ${post.minutes} MIN READ`,
      title: post.title,
      lead: post.excerpt,
    },
    sections: post.sections.map((section) => ({
      eyebrow: "BRIEF",
      title: section.title,
      body: section.body,
    })),
  });
}

module.exports = { SITE, nav, footer, faqs, resources, pages };
