const fs = require('fs');
const path = require('path');

const allPillarsList = [
  { num: '01', slug: 'academy.html', name: 'AI Academy', short: 'ACADEMY' },
  { num: '02', slug: 'creative-studio.html', name: 'AI Creative Studio', short: 'STUDIO' },
  { num: '03', slug: 'workforce-talent.html', name: 'AI Workforce & Talent', short: 'WORKFORCE' },
  { num: '04', slug: 'business-solutions.html', name: 'AI Business Solutions', short: 'SOLUTIONS' },
  { num: '05', slug: 'enterprise-government.html', name: 'AI Enterprise & Govt', short: 'ENTERPRISE' },
  { num: '06', slug: 'entrepreneurship-opc.html', name: 'AI Entrepreneurship & OPC', short: 'STARTUPS' },
  { num: '07', slug: 'research-innovation.html', name: 'AI Research & Innovation', short: 'RESEARCH' },
  { num: '08', slug: 'future-technology.html', name: 'AI Future Technology', short: 'FUTURE TECH' }
];

const pillarsData = [
  {
    num: '01',
    slug: 'academy.html',
    title: 'AI ACADEMY',
    shortName: 'ACADEMY',
    tag: 'SYS//NODE.01 ACADEMY',
    heroTag: 'MOD.01',
    theme: 'cyan',
    statusBadge: 'ADMISSIONS OPEN // ACTIVE COHORTS',
    image: 'assets/pillar_01_academy.png',
    prev: { num: '08', name: '08. FUTURE TECH', file: 'future-technology.html' },
    next: { num: '02', name: '02. STUDIO', file: 'creative-studio.html' },
    searchTags: ['Prompt Engineering', 'Strategic Roadmap', 'Corporate AI', 'Train the Trainer', 'National Certification'],
    modules: [
      {
        tag: 'MOD.01 // EXECUTIVE & GENERAL',
        title: 'AI FOUNDATIONS & LITERACY',
        glitch: 'AI FOUNDATIONS',
        desc: 'Demystifying modern machine learning, generative LLMs, and prompt engineering protocols for leaders, professionals, and students.',
        category: 'FOUNDATIONS',
        iconSvg: `<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-10 10c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>`,
        gradient: 'radial-gradient(circle at 30% 20%, #00F0FF, #0044FF, transparent 75%)',
        metrics: { DURATION: '4 Weeks', LEVEL: 'Beginner to Intermediate', FORMAT: 'Hybrid (Online + Lab)' },
        syllabus: [
          'Core Paradigms of Generative Artificial Intelligence & Deep Learning',
          'Advanced Prompt Engineering & Cognitive Reasoning Frameworks',
          'AI Ethics, Data Privacy (PDPA) & Sovereign Implementation',
          'Practical Business Automation with Leading Multimodal Models',
          'Capstone: Building a Functional Autonomous AI Department Agent'
        ]
      },
      {
        tag: 'MOD.02 // DEEP TECH ENGINEERING',
        title: 'TECHNICAL AI ENGINEERING',
        glitch: 'AI ENGINEERING',
        desc: 'Comprehensive engineering bootcamps covering model fine-tuning, retrieval-augmented generation (RAG), vector databases, and scalable MLOps.',
        category: 'ENGINEERING',
        iconSvg: `<svg viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`,
        gradient: 'radial-gradient(circle at 70% 30%, #00FFA3, #0066FF, transparent 75%)',
        metrics: { DURATION: '12 Weeks', LEVEL: 'Advanced Engineers', FORMAT: 'Intensive Lab Hands-On' },
        syllabus: [
          'PyTorch & Modern Neural Architecture Foundations',
          'Custom LLM Fine-Tuning, LoRA & Model Distillation Techniques',
          'Vector Databases (Milvus, Pinecone) & Enterprise RAG Pipelines',
          'Multi-Agent System Orchestration (LangChain, AutoGen, AGY SDK)',
          'High-Throughput Inference Deployment on Cloud & Edge GPUs'
        ]
      },
      {
        tag: 'MOD.03 // APPLIED VERTICALS',
        title: 'INDUSTRY-SPECIFIC BOOTCAMPS',
        glitch: 'INDUSTRY SUITE',
        desc: 'Tailored practical applications in high-impact national industries: FinTech, Media Production, Advanced Manufacturing, and Smart Health.',
        category: 'INDUSTRY',
        iconSvg: `<svg viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>`,
        gradient: 'radial-gradient(circle at 40% 60%, #FF0055, #7700FF, transparent 75%)',
        metrics: { DURATION: '6 Weeks', LEVEL: 'Domain Specialists', FORMAT: 'Case Study & Production' },
        syllabus: [
          'AI-Driven Cinematic Video, Synthetic Audio & Creative Asset Pipelines',
          'Predictive Financial Modelling, Fraud Detection & Risk Scoring',
          'Industrial Computer Vision for Defect Detection in Manufacturing',
          'Healthcare Data Processing & Diagnostics Decision Support',
          'Public Sector Workflow Modernisation & Citizen Service Bots'
        ]
      },
      {
        tag: 'MOD.04 // ENTERPRISE STRATEGY',
        title: 'CORPORATE WORKFORCE RESKILLING',
        glitch: 'CORP RESKILLING',
        desc: 'Customised in-house enterprise transformation contracts helping corporations transition legacy departments into high-velocity AI teams.',
        category: 'ENTERPRISE',
        iconSvg: `<svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
        gradient: 'radial-gradient(circle at 50% 20%, #FFB800, #FF3300, transparent 75%)',
        metrics: { DURATION: 'Custom / Bespoke', LEVEL: 'Corporate Cohorts', FORMAT: 'On-Site Workshops' },
        syllabus: [
          'Enterprise AI Readiness & Operational Maturity Assessment',
          'Cross-Departmental AI Workflow Discovery & Bottleneck Elimination',
          'Departmental Prompt Playbooks & Custom Secure Internal Tools',
          'Change Management, Culture Shift & Human-in-the-Loop Safeguards',
          'Executive ROI Measurement & Long-Term Scaling Framework'
        ]
      },
      {
        tag: 'MOD.05 // NATIONAL STANDARDS',
        title: 'NATIONAL MICRO-CREDENTIALS',
        glitch: 'CERTIFICATION',
        desc: 'Standardised competency assessments accredited under the National AI Framework, certifying job-ready capabilities for industry employers.',
        category: 'ACCREDITATION',
        iconSvg: `<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>`,
        gradient: 'radial-gradient(circle at 30% 70%, #00F0FF, #00FF88, transparent 75%)',
        metrics: { DURATION: 'Self-Paced / Exam', LEVEL: 'All Tiers', FORMAT: 'Proctored Assessment' },
        syllabus: [
          'Standardised National Practical Competency Evaluation',
          'Real-World Coding & Prompt Verification Under Sandbox Benchmarks',
          'Digital Blockchain-Verified Credentials & Credly Badges',
          'Direct Ingestion into NAIGC Industry Talent Placement Portal',
          'Annual Recertification & Frontier Model Upgrade Standards'
        ]
      },
      {
        tag: 'MOD.06 // ACADEMIC EXPANSION',
        title: 'TRAIN-THE-TRAINER (TTT)',
        glitch: 'TRAIN THE TRAINER',
        desc: 'Accreditation framework developing a certified nationwide cohort of university lecturers, polytechnic educators, and corporate trainers.',
        category: 'ACADEMIC',
        iconSvg: `<svg viewBox="0 0 24 24"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>`,
        gradient: 'radial-gradient(circle at 70% 70%, #9D00FF, #00F0FF, transparent 75%)',
        metrics: { DURATION: '8 Weeks', LEVEL: 'Educators & Trainers', FORMAT: 'Masterclass + Practicum' },
        syllabus: [
          'Pedagogical Strategies for Teaching Generative & Technical AI',
          'Lab Environment Setup, Compute Allocation & Student Sandboxing',
          'Designing Effective Applied Curriculum for Tertiary Institutions',
          'Continuous Assessment Design & Detecting Generative Hallucinations',
          'Certified Master Trainer License & NAIGC Ecosystem Accreditation'
        ]
      }
    ]
  },
  {
    num: '02',
    slug: 'creative-studio.html',
    title: 'AI CREATIVE STUDIO',
    shortName: 'STUDIO',
    tag: 'SYS//NODE.02 CREATIVE STUDIO',
    heroTag: 'MOD.02',
    theme: 'gold',
    statusBadge: 'PRODUCTION READY // 4K PIPELINES',
    image: 'assets/pillar_02_creative_studio.png',
    prev: { num: '01', name: '01. ACADEMY', file: 'academy.html' },
    next: { num: '03', name: '03. WORKFORCE', file: 'workforce-talent.html' },
    searchTags: ['AI Video Production', 'Virtual Studio', 'Voice Synthesis', 'Synthetic Media', 'Creative Direction'],
    modules: [
      {
        tag: 'STUDIO.01 // SYNTHETIC MEDIA',
        title: 'AI VIDEO PRODUCTION PIPELINE',
        glitch: 'AI VIDEO PIPELINE',
        desc: 'Next-generation video synthesis leveraging diffusion engines, camera motion trajectory control, and automated B-roll generation.',
        category: 'VIDEO',
        iconSvg: `<svg viewBox="0 0 24 24"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>`,
        gradient: 'radial-gradient(circle at 30% 20%, #FFB800, #FF0055, transparent 75%)',
        metrics: { RESOLUTION: '4K Cinematic', VELOCITY: '10x Faster', PIPELINE: 'End-to-End Generative' },
        syllabus: [
          'Generative Text-to-Video & Image-to-Video Production Workflows',
          'First-Frame & Last-Frame Camera Trajectory Stabilization',
          'Automated AI Scripting, Storyboarding & Shot List Compilation',
          'Color Grading & Film Emulation via Neural Post-Processing',
          'High-Throughput Commercial Batch Rendering Architecture'
        ]
      },
      {
        tag: 'STUDIO.02 // DIGITAL HUMANS',
        title: 'VIRTUAL AVATARS & DUBBING',
        glitch: 'VIRTUAL AVATARS',
        desc: 'Photorealistic AI synthetic presenters, neural voice cloning, and multilingual lip-sync dubbing for broadcast and international markets.',
        category: 'AVATARS',
        iconSvg: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>`,
        gradient: 'radial-gradient(circle at 70% 30%, #00F0FF, #7700FF, transparent 75%)',
        metrics: { VOICES: '30+ Languages', LATENCY: 'Sub-Second', ACCURACY: 'Frame-Accurate Lips' },
        syllabus: [
          'High-Fidelity Neural Voice Cloning & Acoustic Pitch Modulation',
          'Multilingual Automatic Dubbing & Cross-Cultural Localisation',
          'Autonomous Digital Corporate Spokespersons & Virtual News Anchors',
          'Interactive WebRTC Real-Time Conversational Video Agents',
          'Ethics Protocols & Watermarking for Synthetic Media Trust'
        ]
      },
      {
        tag: 'STUDIO.03 // VIRTUAL PRODUCTION',
        title: 'REAL-TIME 3D VIRTUAL STAGES',
        glitch: 'VIRTUAL STAGES',
        desc: 'Unreal Engine 5 virtual production stages with LED volume tracking, real-time depth keying, and interactive generative backdrops.',
        category: 'VIRTUAL STAGE',
        iconSvg: `<svg viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>`,
        gradient: 'radial-gradient(circle at 40% 60%, #FF0055, #00F0FF, transparent 75%)',
        metrics: { ENGINE: 'Unreal Engine 5', TRACKING: 'Sub-Millimeter', LATENCY: 'Zero Perceptible' },
        syllabus: [
          'Real-Time In-Camera VFX (ICVFX) with LED Volume Backdrops',
          'Markerless Motion Capture & Neural Skeleton Tracking',
          'Photogrammetry & NeRF 3D Environment Reconstruction',
          'Dynamic Lighting Synchronisation between Real & Synthetic Sets',
          'Hybrid Production Workflows for Broadcast & Commercials'
        ]
      },
      {
        tag: 'STUDIO.04 // AUDIO ARCHITECTURE',
        title: 'SYNTHETIC AUDIO & SOUNDSCAPES',
        glitch: 'SYNTHETIC AUDIO',
        desc: 'Generative original music scoring, adaptive Foley sound effects, and spatial audio mastering designed for cinematic productions.',
        category: 'AUDIO',
        iconSvg: `<svg viewBox="0 0 24 24"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>`,
        gradient: 'radial-gradient(circle at 50% 20%, #FFB800, #00FFA3, transparent 75%)',
        metrics: { FORMAT: 'Dolby Atmos Spatial', SAMPLING: '96kHz / 24-bit', SCORING: 'Adaptive AI BPM' },
        syllabus: [
          'Algorithmic Soundtrack Generation Aligned to Scene Emotion & Pacing',
          'Automated Foley & Environmental Ambient Soundscape Synthesis',
          'Neural Voice Enhancement, Spectral Denoising & Audio Isolation',
          'Interactive Spatial Audio for VR / AR Experiences',
          'Royalty-Free AI Music Licensing & Commercial Copyright Safety'
        ]
      },
      {
        tag: 'STUDIO.05 // BRAND ARCHIVES',
        title: 'CULTURAL ARCHIVING & LOCALISATION',
        glitch: 'CULTURAL ARCHIVE',
        desc: 'Restoring historical national archives, Malaysian cultural heritage preservation, and multi-format asset upscaling to 8K.',
        category: 'ARCHIVING',
        iconSvg: `<svg viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>`,
        gradient: 'radial-gradient(circle at 30% 70%, #9D00FF, #FFB800, transparent 75%)',
        metrics: { RESTORATION: 'Up to 8K HDR', ACCENT: 'Local Dialects', REPOSITORY: 'National Asset Bank' },
        syllabus: [
          'Deep Neural Video Super-Resolution & Film De-scratching',
          'Preserving Traditional Arts & Crafts through Volumetric 3D Captures',
          'Dialect Preservation: Kelantanese, Sarawakian & Regional Intonations',
          'Digital Asset Management (DAM) with AI Tagging & Vector Search',
          'High-Definition Streaming Distribution for National Archives'
        ]
      },
      {
        tag: 'STUDIO.06 // BROADCAST OPS',
        title: 'HYBRID LIVE STREAMING SUITE',
        glitch: 'LIVE BROADCAST',
        desc: 'Broadcast-grade live virtual conferencing, interactive AI overlays, real-time closed captions, and multi-platform distribution.',
        category: 'BROADCAST',
        iconSvg: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="2"></circle><path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"></path></svg>`,
        gradient: 'radial-gradient(circle at 70% 70%, #00F0FF, #00FF88, transparent 75%)',
        metrics: { CONCURRENCY: '100k+ Viewers', UPTIME: '99.99%', LATENCY: 'Ultra-Low 1.5s' },
        syllabus: [
          'Multi-Camera Virtual Switching & Real-Time Keying Protocols',
          'Instant Multilingual Subtitling & Live AI Translation Overlays',
          'Interactive Audience Polling & Generative Visual Reaction Streams',
          'Redundant Cloud RTMP/SRT Routing & Worldwide Edge Distribution',
          'Sponsorship Integration & Dynamic Brand Placement Engine'
        ]
      }
    ]
  },
  {
    num: '03',
    slug: 'workforce-talent.html',
    title: 'AI WORKFORCE & TALENT',
    shortName: 'WORKFORCE',
    tag: 'SYS//NODE.03 WORKFORCE & TALENT',
    heroTag: 'MOD.03',
    theme: 'cyan',
    statusBadge: 'PLACEMENT ACTIVE // REGISTRY ONLINE',
    image: 'assets/pillar_03_workforce_talent.png',
    prev: { num: '02', name: '02. STUDIO', file: 'creative-studio.html' },
    next: { num: '04', name: '04. SOLUTIONS', file: 'business-solutions.html' },
    searchTags: ['Talent Placement', 'AI Reskilling', 'Apprenticeships', 'Competency Assessment', 'Headhunting'],
    modules: [
      {
        tag: 'TALENT.01 // INDUSTRY MATCHING',
        title: 'ENTERPRISE TALENT MATCHMAKING',
        glitch: 'TALENT PLACEMENT',
        desc: 'Direct algorithmic talent matchmaking connecting vetted AI engineers, data scientists, and prompt architects to hiring corporations.',
        category: 'PLACEMENT',
        iconSvg: `<svg viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>`,
        gradient: 'radial-gradient(circle at 30% 20%, #00F0FF, #0044FF, transparent 75%)',
        metrics: { PLACEMENT: 'Direct Hire', VETTING: '100% Benchmarked', GUARANTEE: '90-Day Fit' },
        syllabus: [
          'AI-Powered Capability Matrix & Candidate Coding Verification',
          'Direct Interview Scheduling with Leading Tech & GLC Employers',
          'Salary Benchmarking & Fair Compensation Standards',
          'Cross-Disciplinary Placement for Non-IT Graduates',
          'Post-Placement Mentorship & Career Progression Tracking'
        ]
      },
      {
        tag: 'TALENT.02 // CORPORATE SHIFT',
        title: 'WORKFORCE TRANSFORMATION PROGRAMME',
        glitch: 'CORP RESKILLING',
        desc: 'Turnkey restructuring framework transitioning traditional operational personnel into high-efficiency AI copilot operators.',
        category: 'TRANSFORMATION',
        iconSvg: `<svg viewBox="0 0 24 24"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>`,
        gradient: 'radial-gradient(circle at 70% 30%, #FFB800, #FF0055, transparent 75%)',
        metrics: { EFFICIENCY: '+40% Productivity', RETENTION: '94%', DURATION: '8-12 Weeks' },
        syllabus: [
          'Organisational AI Maturity Audit & Redundancy Risk Analysis',
          'Departmental Playbooks: Marketing, HR, Finance & Operations Copilots',
          'Internal Hackathons & Proof-of-Value Automation Projects',
          'Overcoming Employee AI Apprehension & Fostering Innovation Culture',
          'Executive Dashboard for Measurable Productivity ROI'
        ]
      },
      {
        tag: 'TALENT.03 // APPRENTICESHIP',
        title: 'HIGH-IMPACT INDUSTRY APPRENTICESHIPS',
        glitch: 'APPRENTICESHIPS',
        desc: '6-month immersive apprenticeships embedding promising young talent directly into frontier AI projects with industry mentors.',
        category: 'APPRENTICESHIP',
        iconSvg: `<svg viewBox="0 0 24 24"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>`,
        gradient: 'radial-gradient(circle at 40% 60%, #00FFA3, #0055FF, transparent 75%)',
        metrics: { STIPEND: 'Subsidised', DURATION: '6 Months', HIRING: '85% Full-Time Offer' },
        syllabus: [
          'Live Production Codebase Exposure & Git Workflow Standards',
          'One-on-One Pairing with Principal Engineers & AI Architects',
          'Real-World Enterprise Client Deployments & Problem-Solving',
          'Soft Skills: Technical Presentation & Stakeholder Communication',
          'Graduation Showcase to Venture Funds & Tier-1 Employers'
        ]
      },
      {
        tag: 'TALENT.04 // BENCHMARKING',
        title: 'NATIONAL AI COMPETENCY REGISTRY',
        glitch: 'COMPETENCY REGISTRY',
        desc: 'Centralised verified ledger of Malaysian AI practitioners, mapped to the National AI Framework with transparent skill scoring.',
        category: 'REGISTRY',
        iconSvg: `<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`,
        gradient: 'radial-gradient(circle at 50% 20%, #9D00FF, #00F0FF, transparent 75%)',
        metrics: { ACCREDITATION: 'National Framework', VERIFICATION: 'Tamper-Proof', PORTABILITY: 'ASEAN Wide' },
        syllabus: [
          'Standardised Rubric Across Machine Learning, Data & Prompts',
          'Automated Code Evaluation & Algorithmic Benchmarks',
          'Decentralised Credential Issuance with Cryptographic Integrity',
          'Integration with SOCSO & Government Employment Portals',
          'Periodic Recertification Based on Frontier Model Releases'
        ]
      },
      {
        tag: 'TALENT.05 // GIG & FREELANCE',
        title: 'GLOBAL AI FREELANCER GUILD',
        glitch: 'FREELANCE GUILD',
        desc: 'Empowering independent Malaysian developers, annotators, and prompt creators to secure high-value remote international contracts.',
        category: 'GIG ECONOMY',
        iconSvg: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`,
        gradient: 'radial-gradient(circle at 30% 70%, #FFB800, #FF3300, transparent 75%)',
        metrics: { CURRENCY: 'USD / Global Remittance', ACCESS: 'Cross-Border', LEGAL: 'Automated Contracts' },
        syllabus: [
          'Mastering Global Platforms: Upwork, Toptal & Specialized AI Hubs',
          'Contract Pricing, Proposal Pitching & High-Ticket Positioning',
          'International Cross-Border Invoicing, Escrow & Tax Compliance',
          'Collective Guild Bidding for Enterprise Offshore Contracts',
          'Collaborative Shared Tooling & Model API Discounts for Members'
        ]
      },
      {
        tag: 'TALENT.06 // LEADERSHIP FORUM',
        title: 'EXECUTIVE AI MASTERCLASS',
        glitch: 'EXECUTIVE FORUM',
        desc: 'High-level strategic briefing sessions for C-Suite executives, board directors, and policymakers navigating the AI economy.',
        category: 'EXECUTIVE',
        iconSvg: `<svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,
        gradient: 'radial-gradient(circle at 70% 70%, #00F0FF, #7700FF, transparent 75%)',
        metrics: { AUDIENCE: 'Board & C-Level', COHORTS: 'Quarterly', FORMAT: 'Roundtable Retreat' },
        syllabus: [
          'Strategic Capital Allocation & AI Investment Prioritisation',
          'Navigating Board Governance, Risk & AI Compliance Legislation',
          'Defensible Competitive Moats in the Era of Frontier Models',
          'M&A and Tech Buyout Evaluation for AI Startups',
          'Exclusive Peer Networking with Industry Leaders & Regulators'
        ]
      }
    ]
  },
  {
    num: '04',
    slug: 'business-solutions.html',
    title: 'AI BUSINESS SOLUTIONS',
    shortName: 'SOLUTIONS',
    tag: 'SYS//NODE.04 BUSINESS SOLUTIONS',
    heroTag: 'MOD.04',
    theme: 'gold',
    statusBadge: 'ENTERPRISE READY // HIGH EFFICIENCY',
    image: 'assets/pillar_04_business_solutions.png',
    prev: { num: '03', name: '03. WORKFORCE', file: 'workforce-talent.html' },
    next: { num: '05', name: '05. ENTERPRISE', file: 'enterprise-government.html' },
    searchTags: ['Process Automation', 'ERP Integration', 'Customer Bots', 'Document AI', 'SME Automation'],
    modules: [
      {
        tag: 'SOLUTIONS.01 // INTELLIGENT BOTS',
        title: 'ENTERPRISE CONVERSATIONAL AGENTS',
        glitch: 'CONVERSATIONAL AGENTS',
        desc: 'Custom multilingual customer support agents with live database querying, sentiment routing, and human-in-the-loop handoff.',
        category: 'CUSTOMER CARE',
        iconSvg: `<svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`,
        gradient: 'radial-gradient(circle at 30% 20%, #FFB800, #FF0055, transparent 75%)',
        metrics: { DEFLECTION: '75% Automation', LANGUAGES: 'BM, Eng, Mandarin, Tamil', CHANNELS: 'WhatsApp, Web, App' },
        syllabus: [
          'Custom Knowledge Base Indexing with Vector Embeddings',
          'Omnichannel Deployment across WhatsApp Business API & Webhooks',
          'Sentiment Analysis & Intelligent VIP Lead Escalation Rules',
          'Live CRM Data Integration (Salesforce, HubSpot, Zoho)',
          'Strict Guardrails against Hallucinations & Inappropriate Responses'
        ]
      },
      {
        tag: 'SOLUTIONS.02 // DOCUMENT AI',
        title: 'AUTOMATED DOCUMENT INTELLIGENCE',
        glitch: 'DOCUMENT AI',
        desc: 'High-speed parsing and extraction of invoices, contracts, receipts, and government forms into structured JSON and accounting ledgers.',
        category: 'DOCUMENT OPS',
        iconSvg: `<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>`,
        gradient: 'radial-gradient(circle at 70% 30%, #00F0FF, #0044FF, transparent 75%)',
        metrics: { ACCURACY: '99.4%', SPEED: '< 1.5s per doc', INTEGRATION: 'SQL, ERP & Cloud' },
        syllabus: [
          'Multilingual OCR with Handwritten Text & Low-Quality Scan Handling',
          'Automated 3-Way Matching for Invoices, Purchase Orders & Delivery Receipts',
          'Contract Legal Clause Extraction & Compliance Risk Highlighting',
          'Direct Ingestion into SAP, Oracle, Xero & Local Accounting Software',
          'Encrypted PII Redaction & PDPA Data Protection Compliance'
        ]
      },
      {
        tag: 'SOLUTIONS.03 // PREDICTIVE BI',
        title: 'PREDICTIVE BUSINESS ANALYTICS',
        glitch: 'PREDICTIVE ANALYTICS',
        desc: 'Machine learning forecasting models predicting inventory demand, customer churn, financial cashflow, and market price movements.',
        category: 'FORECASTING',
        iconSvg: `<svg viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>`,
        gradient: 'radial-gradient(circle at 40% 60%, #00FFA3, #FFB800, transparent 75%)',
        metrics: { PRECISION: '+35% Forecast Accuracy', HORIZON: '30-180 Days', ROI: 'Immediate Waste Reduction' },
        syllabus: [
          'Historical Time-Series Demand Forecasting for Retail & Logistics',
          'Customer Lifetime Value (LTV) & Proactive Churn Prevention Algorithms',
          'Dynamic Pricing Optimization Based on Market Fluctuations',
          'Interactive Executive Dashboards with Natural Language Queries',
          'Anomaly Detection in Transactional Streams for Fraud Prevention'
        ]
      },
      {
        tag: 'SOLUTIONS.04 // RPA & WORKFLOWS',
        title: 'COGNITIVE RPA & WORKFLOW BOTS',
        glitch: 'PROCESS AUTOMATION',
        desc: 'Eliminating repetitive human administrative tasks by connecting legacy desktop software, cloud APIs, and AI decision logic.',
        category: 'RPA BOTS',
        iconSvg: `<svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`,
        gradient: 'radial-gradient(circle at 50% 20%, #FF0055, #9D00FF, transparent 75%)',
        metrics: { 'TIME SAVINGS': '80% Human Hours', 'ERROR RATE': '0.01%', DEPLOYMENT: 'Turnkey 2 Weeks' },
        syllabus: [
          'Desktop GUI Automation for Legacy Windows & Web Applications',
          'Cross-System Data Reconciliation & Automated Daily Reporting',
          'Employee Onboarding & HR Leave/Payroll Workflow Bots',
          'Automated Vendor Communication & Quotation Generation',
          'Continuous Health Monitoring & Failover Recovery Protocols'
        ]
      },
      {
        tag: 'SOLUTIONS.05 // SME ACCELERATION',
        title: 'SME TURNKEY AI PACKAGES',
        glitch: 'SME PACKAGES',
        desc: 'Pre-packaged, affordable AI toolkits designed specifically for small businesses to modernize marketing, sales, and inventory immediately.',
        category: 'SME SOLUTIONS',
        iconSvg: `<svg viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>`,
        gradient: 'radial-gradient(circle at 30% 70%, #FFB800, #00FFA3, transparent 75%)',
        metrics: { COST: 'Modular / Low-CapEx', SETUP: 'Ready in 48 Hours', GRANT: 'Supports MDEC Grants' },
        syllabus: [
          'Social Media Content Creation & Automated Post Scheduling Suite',
          'Point-of-Sale (POS) Integration with Smart Stock Alerts',
          'Automated Customer Review Answering & Reputation Management',
          'Zero-Code In-House Assistant for Daily Business Queries',
          'Assistance with SME Digitalisation Grant Applications'
        ]
      },
      {
        tag: 'SOLUTIONS.06 // CUSTOM MLOPS',
        title: 'MANAGED ENTERPRISE MLOPS',
        glitch: 'MANAGED MLOPS',
        desc: 'End-to-end management of custom models: hosting, data drift monitoring, automated re-training, and enterprise SLA guarantees.',
        category: 'MANAGED SLA',
        iconSvg: `<svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`,
        gradient: 'radial-gradient(circle at 70% 70%, #00F0FF, #FF0055, transparent 75%)',
        metrics: { UPTIME: '99.95% SLA', SECURITY: 'Encrypted In-Transit & Rest', MONITORING: '24/7/365 NOC' },
        syllabus: [
          'High-Throughput Dockerized GPU Container Orchestration',
          'Model Performance Degradation & Data Drift Automated Retraining',
          'Latency Minimization & Intelligent Prompt Caching Architectures',
          'Comprehensive Penetration Testing & Vulnerability Patching',
          'Dedicated Technical Account Manager & 1-Hour Escalation SLA'
        ]
      }
    ]
  },
  {
    num: '05',
    slug: 'enterprise-government.html',
    title: 'AI ENTERPRISE & GOVT SOLUTIONS',
    shortName: 'ENTERPRISE',
    tag: 'SYS//NODE.05 ENTERPRISE & GOVT',
    heroTag: 'MOD.05',
    theme: 'cyan',
    statusBadge: 'SOVEREIGN CLOUD // AIR-GAPPED READY',
    image: 'assets/pillar_05_enterprise_government.png',
    prev: { num: '04', name: '04. SOLUTIONS', file: 'business-solutions.html' },
    next: { num: '06', name: '06. STARTUPS', file: 'entrepreneurship-opc.html' },
    searchTags: ['Sovereign AI', 'Smart City', 'Data Residency', 'Citizen Services', 'National Security'],
    modules: [
      {
        tag: 'GOVT.01 // SOVEREIGN LLM',
        title: 'SOVEREIGN NATIONAL LANGUAGE MODEL',
        glitch: 'SOVEREIGN LLM',
        desc: 'On-premise sovereign foundation models trained on Malaysian legal, linguistic, and cultural corpuses with strict air-gapped security.',
        category: 'SOVEREIGN AI',
        iconSvg: `<svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`,
        gradient: 'radial-gradient(circle at 30% 20%, #00F0FF, #0044FF, transparent 75%)',
        metrics: { RESIDENCY: '100% On-Premise', COMPLIANCE: 'PDPA & Cyber Act 2024', SECURITY: 'Air-Gapped' },
        syllabus: [
          'Pre-Training & Alignment on Bahasa Melayu & Malaysian Common Law',
          'Air-Gapped Deployment within High-Security Government Data Centers',
          'Role-Based Granular Access Control & Multi-Tenancy Segregation',
          'Tamper-Proof Audit Logging & Prompt Traceability Mechanisms',
          'Custom Sovereign API Gateways for Multi-Ministry Consumption'
        ]
      },
      {
        tag: 'GOVT.02 // CITIZEN PORTALS',
        title: 'SMART CITIZEN SERVICE PLATFORMS',
        glitch: 'CITIZEN SERVICES',
        desc: 'Next-generation automated public service delivery portals resolving citizen inquiries, license renewals, and welfare applications 24/7.',
        category: 'PUBLIC SERVICE',
        iconSvg: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>`,
        gradient: 'radial-gradient(circle at 70% 30%, #FFB800, #00FFA3, transparent 75%)',
        metrics: { ACCESSIBILITY: 'Web, Mobile, Kiosk', TIME: 'Instant Processing', SATISFACTION: '92% Approval' },
        syllabus: [
          'Natural Language Form Filling & Voice-Guided Application Assistance',
          'Automated Eligibility Verification across Inter-Agency Datasets',
          'Inclusive UI Design Supporting Elderly & Differently-Abled Citizens',
          'Real-Time Status Tracking & Multi-Channel SMS/WhatsApp Alerts',
          'Transparent Anti-Corruption Workflow Logging on Audited Databases'
        ]
      },
      {
        tag: 'GOVT.03 // SMART CITIES',
        title: 'SMART URBAN & TRAFFIC SIMULATION',
        glitch: 'SMART CITY',
        desc: 'Computer vision and digital twin systems optimizing traffic light timings, municipal waste management, and flood detection networks.',
        category: 'SMART CITIES',
        iconSvg: `<svg viewBox="0 0 24 24"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="9" y1="22" x2="9" y2="22.01"></line><line x1="15" y1="22" x2="15.01" y2="22"></line><line x1="12" y1="18" x2="12" y2="18.01"></line></svg>`,
        gradient: 'radial-gradient(circle at 40% 60%, #00F0FF, #9D00FF, transparent 75%)',
        metrics: { CONGESTION: '-28% Wait Times', COVERAGE: 'Metropolitan Grid', TELEMETRY: 'Real-Time IoT' },
        syllabus: [
          'Adaptive AI Traffic Signal Control Connected to CCTV Networks',
          'Early Flood Warning Prediction Models Incorporating Rainfall Sensors',
          'Municipal Waste Route Optimisation & Illegal Dumping Detection',
          'Public Transit Fleet Dispatch & Passenger Demand Forecasting',
          'Unified City Operations Command Center (IOC) Dashboard'
        ]
      },
      {
        tag: 'GOVT.04 // POLICY IMPACT',
        title: 'POLICY SIMULATION & MACRO-ECONOMIC MODELLING',
        glitch: 'POLICY MODELLING',
        desc: 'Large-scale synthetic population simulations testing tax policies, subsidy distributions, and infrastructure investments before rollout.',
        category: 'POLICY AI',
        iconSvg: `<svg viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>`,
        gradient: 'radial-gradient(circle at 50% 20%, #FF0055, #FFB800, transparent 75%)',
        metrics: { MODEL: 'Agent-Based Simulation', POPULATION: '30M Agent Grid', ACCURACY: 'Validated Macro' },
        syllabus: [
          'Agent-Based Socio-Economic Simulations for Subsidy Targeting',
          'Healthcare Resource Allocation & Pandemic Preparedness Modelling',
          'Infrastructure ROI & Traffic Impact Multi-Year Forecasting',
          'Sovereign Debt & Foreign Exchange Stress-Testing Algorithms',
          'Evidence-Based Policy Recommendation Synthesis for Cabinets'
        ]
      },
      {
        tag: 'GOVT.05 // REGULATORY AUDIT',
        title: 'NATIONAL AI COMPLIANCE & GOVERNANCE',
        glitch: 'AI AUDIT & SAFETY',
        desc: 'Auditing third-party and public sector AI models for algorithmic bias, data leakage, adversarial robustness, and statutory compliance.',
        category: 'GOVERNANCE',
        iconSvg: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 14 14"></polyline></svg>`,
        gradient: 'radial-gradient(circle at 30% 70%, #00FFA3, #0044FF, transparent 75%)',
        metrics: { FRAMEWORK: 'National AI Ethics Code', 'RED-TEAMING': 'Automated + Human', CERTIFICATE: 'Statutory Seal' },
        syllabus: [
          'Algorithmic Bias, Fairness & Demographic Parity Auditing',
          'Adversarial Jailbreak & Prompt Injection Penetration Testing',
          'Automated Training Data Lineage & PII Contamination Scans',
          'Model Explainability & Transparency Reporting for Regulators',
          'Accredited Government AI Certification Mark Verification'
        ]
      },
      {
        tag: 'GOVT.06 // LARGE ENTERPRISE',
        title: 'GLC & CONGLOMERATE TRANSFORMATION',
        glitch: 'ENTERPRISE SUITE',
        desc: 'Bespoke high-volume enterprise transformation contracts for banking institutions, telcos, and national utilities with stringent SLAs.',
        category: 'GLC TRANSFORMATION',
        iconSvg: `<svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`,
        gradient: 'radial-gradient(circle at 70% 70%, #FFB800, #7700FF, transparent 75%)',
        metrics: { SECTORS: 'Banking, Energy, Telco', INFRA: 'Hybrid Sovereign Cloud', DURATION: 'Multi-Year Advisory' },
        syllabus: [
          'Consolidated Data Lakehouse Migration & Vector Database Setup',
          'Core Banking AI Workflows: Loan Underwriting & AML Fraud Detection',
          'Smart Grid Predictive Asset Maintenance for Power Utilities',
          'Automated Telco Network Optimization & Self-Healing Routing',
          'Executive Steering Committee Advisory & Board Representation'
        ]
      }
    ]
  },
  {
    num: '06',
    slug: 'entrepreneurship-opc.html',
    title: 'AI ENTREPRENEURSHIP & OPC',
    shortName: 'STARTUPS',
    tag: 'SYS//NODE.06 ENTREPRENEURSHIP & OPC',
    heroTag: 'MOD.06',
    theme: 'gold',
    statusBadge: 'STARTUP INCUBATION // COHORT OPEN',
    image: 'assets/pillar_06_entrepreneurship_opc.png',
    prev: { num: '05', name: '05. ENTERPRISE', file: 'enterprise-government.html' },
    next: { num: '07', name: '07. RESEARCH', file: 'research-innovation.html' },
    searchTags: ['OPC Incorporation', 'Startup Incubation', 'GPU Grants', 'Seed Capital', 'Solo Founder'],
    modules: [
      {
        tag: 'OPC.01 // TURNKEY LAUNCH',
        title: 'ONE-PERSON COMPANY (OPC) SUITE',
        glitch: 'OPC INFRASTRUCTURE',
        desc: 'Turnkey legal incorporation, digital company secretarial, automated bookkeeping, and AI copilot back-office for solo founders.',
        category: 'OPC SUITE',
        iconSvg: `<svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`,
        gradient: 'radial-gradient(circle at 30% 20%, #FFB800, #FF0055, transparent 75%)',
        metrics: { TIMELINE: 'Ready in 3 Days', SETUP: '100% Digital', COST: 'Subsidy Eligible' },
        syllabus: [
          'Fast-Track SSM OPC Registration & Tax Identity Filing',
          'Automated AI Bookkeeping, Invoicing & Bank Reconciliation',
          'Virtual Corporate Address & Compliance Mail Handling',
          'Digital Signature Integration & Standard Contract Templates',
          'Solo-Founder AI Operations Suite for Maximum Automation'
        ]
      },
      {
        tag: 'OPC.02 // INCUBATION',
        title: '12-WEEK AI STARTUP ACCELERATOR',
        glitch: 'STARTUP ACCELERATOR',
        desc: 'Intensive cohort programme providing rapid prototyping mentorship, market validation, go-to-market playbooks, and investor readiness.',
        category: 'ACCELERATOR',
        iconSvg: `<svg viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`,
        gradient: 'radial-gradient(circle at 70% 30%, #00F0FF, #7700FF, transparent 75%)',
        metrics: { DURATION: '12 Weeks', COHORTS: '2 per Year', SUCCESS: '78% Funded' },
        syllabus: [
          'Product-Market Fit Validation Using Rapid Generative Mockups',
          'Unit Economics, SaaS Pricing Strategy & Margin Structuring',
          'B2B Enterprise Sales Playbooks & Contract Procurement',
          'Pitch Deck Architecture & Investor Term Sheet Negotiation',
          'Demo Day Showcase to Top Regional Venture Capital Funds'
        ]
      },
      {
        tag: 'OPC.03 // SHARED COMPUTE',
        title: 'SHARED GPU CLUSTERS & API CREDITS',
        glitch: 'GPU POOL & CREDITS',
        desc: 'Subsidised high-performance GPU clusters (H100/A100) and foundation model API credit pools lowering deep-tech barrier to entry.',
        category: 'COMPUTE SUBSIDY',
        iconSvg: `<svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>`,
        gradient: 'radial-gradient(circle at 40% 60%, #00FFA3, #0055FF, transparent 75%)',
        metrics: { COMPUTE: 'NVIDIA H100/A100', CREDITS: 'Up to $10,000 USD', ACCESS: 'Instant Sandbox' },
        syllabus: [
          'High-Performance Inference Clusters with Low-Latency APIs',
          'Subsidised LLM Token Quotas across Leading Foundation Models',
          'Dedicated Model Fine-Tuning Sandboxes with PyTorch/JAX',
          'Shared Vector Database Instances & Object Storage Buckets',
          'DevOps Architecture Advisory for Minimizing Cloud Compute Burn'
        ]
      },
      {
        tag: 'OPC.04 // SEED CAPITAL',
        title: 'SEED CAPITAL & GRANT SYNDICATION',
        glitch: 'SEED CAPITAL',
        desc: 'Connecting early-stage founders with angel syndicates, TEKUN Nasional loans, Cradle Fund grants, and regional VC networks.',
        category: 'FUNDING',
        iconSvg: `<svg viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>`,
        gradient: 'radial-gradient(circle at 50% 20%, #FFB800, #00FFA3, transparent 75%)',
        metrics: { GRANTS: 'RM50k - RM500k', NETWORK: '40+ Angels & VCs', DILUTION: 'Non-Dilutive Matching' },
        syllabus: [
          'Assistance with Cradle CIP Spark & CIP Sprint Grant Writing',
          'Angel Syndicate Pitch Sessions with Accredited Tech Investors',
          'Convertible Note (SAFE) & Standard Equity Term Sheet Templates',
          'Valuation Modelling & Dilution Cap Table Planning',
          'Institutional Due Diligence Preparation & Data Room Audits'
        ]
      },
      {
        tag: 'OPC.05 // MARKET ACCESS',
        title: 'CORPORATE PROCUREMENT LINKAGES',
        glitch: 'MARKET LINKAGES',
        desc: 'Direct reverse-pitching forums matching startup AI prototypes with procurement budgets of Malaysia’s top corporations and government agencies.',
        category: 'COMMERCIALISATION',
        iconSvg: `<svg viewBox="0 0 24 24"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>`,
        gradient: 'radial-gradient(circle at 30% 70%, #9D00FF, #FF0055, transparent 75%)',
        metrics: { CONTRACTS: 'Paid POCs', TIMELINE: '30-Day Decision', CLIENTS: 'Tier-1 Enterprises' },
        syllabus: [
          'Corporate Problem-Statement Reverse Pitching Sessions',
          'Fast-Track Procurement Framework for Seed-Stage Startups',
          'Paid Proof-of-Concept (POC) Milestone Structuring',
          'Enterprise Vendor Registration & Compliance Facilitation',
          'Case Study Publication & Regional ASEAN Market Expansion'
        ]
      },
      {
        tag: 'OPC.06 // CO-WORKING',
        title: 'AI HARDWARE & VIRTUAL OFFICE HUBS',
        glitch: 'INNOVATION HUBS',
        desc: 'Physical collaborative innovation hubs featuring high-speed networking, podcast recording suites, private meeting pods, and demo theaters.',
        category: 'FACILITIES',
        iconSvg: `<svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>`,
        gradient: 'radial-gradient(circle at 70% 70%, #00F0FF, #00FF88, transparent 75%)',
        metrics: { LOCATION: 'Prime Cyberjaya & KL', ACCESS: '24/7/365', PERKS: 'F&B, Podcast Suite, High-Bandwidth' },
        syllabus: [
          'High-Speed Symmetrical 1Gbps Dedicated Fiber Connectivity',
          'Acoustically Treated Media Production & Podcast Studios',
          'Hardware Prototyping Benches with 3D Printers & IoT Tooling',
          'Weekly Founder Community Masterminds & Peer Feedback Circles',
          'Global Reciprocal Desk Passes across ASEAN Innovation Hubs'
        ]
      }
    ]
  },
  {
    num: '07',
    slug: 'research-innovation.html',
    title: 'AI RESEARCH & INNOVATION',
    shortName: 'RESEARCH',
    tag: 'SYS//NODE.07 RESEARCH & INNOVATION',
    heroTag: 'MOD.07',
    theme: 'cyan',
    statusBadge: 'R&D ACCREDITED // HIGH-PERFORMANCE LAB',
    image: 'assets/pillar_07_research_innovation.png',
    prev: { num: '06', name: '06. STARTUPS', file: 'entrepreneurship-opc.html' },
    next: { num: '08', name: '08. FUTURE TECH', file: 'future-technology.html' },
    searchTags: ['Applied R&D', 'Patent Licensing', 'Malay NLP', 'Supercomputing Lab', 'Academia Synergy'],
    modules: [
      {
        tag: 'R&D.01 // APPLIED LAB',
        title: 'FRONTIER APPLIED RESEARCH LAB',
        glitch: 'APPLIED R&D',
        desc: 'Dedicated R&D lab pursuing goal-oriented discoveries in multi-agent reasoning, neuromorphic algorithms, and energy-efficient neural networks.',
        category: 'APPLIED LAB',
        iconSvg: `<svg viewBox="0 0 24 24"><path d="M10 2v7.31L4.36 18.5A2 2 0 0 0 6 21h12a2 2 0 0 0 1.64-2.5L14 9.31V2"></path></svg>`,
        gradient: 'radial-gradient(circle at 30% 20%, #00F0FF, #0044FF, transparent 75%)',
        metrics: { FOCUS: 'Next-Gen Architectures', BENCHMARK: 'Global Peer-Reviewed', COMPUTE: 'National Supercomputing' },
        syllabus: [
          'Multi-Agent Autonomous Reasoning & Self-Correction Systems',
          'Quantization, Pruning & Sub-1-Bit Model Compression Techniques',
          'Graph Neural Networks for Drug Discovery & Material Science',
          'Reinforcement Learning from Human & AI Feedback (RLHF/RLAIF)',
          'Peer-Reviewed Publication in Premier Conferences (NeurIPS, ICML)'
        ]
      },
      {
        tag: 'R&D.02 // LOCALISATION',
        title: 'INDIGENOUS LANGUAGE & HERITAGE NLP',
        glitch: 'HERITAGE NLP',
        desc: 'Deep linguistic models specialized in Bahasa Melayu, regional dialects, Jawi transliteration, and indigenous cultural oral histories.',
        category: 'HERITAGE NLP',
        iconSvg: `<svg viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>`,
        gradient: 'radial-gradient(circle at 70% 30%, #FFB800, #FF0055, transparent 75%)',
        metrics: { DIALECTS: 'All Malaysian Dialects', CORPUS: '50B+ Token Dataset', HERITAGE: 'Jawi, Sabah, Sarawak' },
        syllabus: [
          'Constructing Verified Multimodal High-Quality Malay Corpuses',
          'High-Fidelity Jawi-Rumi Neural Transliteration & Historical Manuscripts',
          'Dialect Normalisation: Terengganu, Kelantan, Kedah & Borneo Accents',
          'Cultural Contextual Guardrails & Sovereign Values Embedding',
          'Open-Weights Academic Release for National Educational Use'
        ]
      },
      {
        tag: 'R&D.03 // IP LICENSING',
        title: 'INTELLECTUAL PROPERTY & PATENTS',
        glitch: 'IP & PATENTS',
        desc: 'Accelerating patent filing, international WIPO protections, and commercial tech transfer of homegrown algorithmic innovations.',
        category: 'IP ASSETS',
        iconSvg: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><path d="M14.83 14.83a4 4 0 1 1 0-5.66"></path></svg>`,
        gradient: 'radial-gradient(circle at 40% 60%, #00FFA3, #0055FF, transparent 75%)',
        metrics: { PATENTS: 'International WIPO', ROYALTY: 'Commercial Licensing', DEFENSE: 'National IP Portfolio' },
        syllabus: [
          'Novel Neural Algorithm Invention Disclosure & Patent Drafting',
          'Prior-Art Automated Vector Searches across Global Patent Databases',
          'Technology Transfer Office (TTO) Commercial Licensing Terms',
          'University Spin-Off Equity Structuring & Royalty Agreements',
          'Defensive Patent Pools Protecting Malaysian Deep-Tech Startups'
        ]
      },
      {
        tag: 'R&D.04 // SUPERCOMPUTING',
        title: 'NATIONAL AI RESEARCH INFRASTRUCTURE',
        glitch: 'SUPERCOMPUTING',
        desc: 'High-throughput cluster interconnects, InfiniBand networking, and petabyte-scale storage allocated exclusively for academic researchers.',
        category: 'SUPERCOMPUTING',
        iconSvg: `<svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect></svg>`,
        gradient: 'radial-gradient(circle at 50% 20%, #9D00FF, #00F0FF, transparent 75%)',
        metrics: { BANDWIDTH: '800Gbps InfiniBand', STORAGE: '10PB NVMe Parallel', SCHEDULING: 'SLURM Fair-Share' },
        syllabus: [
          'SLURM Workload Scheduling & High-Efficiency Job Orchestration',
          'Distributed Training across Thousands of Multi-Node GPUs',
          'High-Throughput Parallel Data Pipelines for Big Data Ingestion',
          'Secure Multi-Institutional Research Enclaves & Data Sharing',
          'Green Supercomputing Metrics & Thermal Efficiency Benchmarks'
        ]
      },
      {
        tag: 'R&D.05 // PROTOTYPING',
        title: 'RAPID POC & TECHNOLOGY PILOTS',
        glitch: 'POC SANDBOX',
        desc: 'Taking theoretical academic algorithmic models and validating them inside enterprise sandbox environments within 60 days.',
        category: 'PROTOTYPING',
        iconSvg: `<svg viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`,
        gradient: 'radial-gradient(circle at 30% 70%, #FF0055, #FFB800, transparent 75%)',
        metrics: { CYCLE: '60-Day Pilot', VALIDATION: 'Real-World Benchmarks', RISK: 'Zero Production Impact' },
        syllabus: [
          'Translating Scientific Papers into Modular Python/C++ Packages',
          'Synthetic Test Data Generation for Rigorous Stress Testing',
          'Hardware-in-the-Loop Simulation for Edge & Mobile Environments',
          'Independent Verification & Validation (IV&V) Benchmarking Reports',
          'Transition Roadmaps for Commercial Scale Production Handover'
        ]
      },
      {
        tag: 'R&D.06 // GLOBAL FELLOWSHIPS',
        title: 'VISITING SCHOLAR & FELLOWSHIP GUILD',
        glitch: 'RESEARCH FELLOWS',
        desc: 'Attracting top international researchers, diaspora returnees, and doctoral candidates to collaborate on Malaysian national AI priorities.',
        category: 'FELLOWSHIPS',
        iconSvg: `<svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>`,
        gradient: 'radial-gradient(circle at 70% 70%, #00F0FF, #00FFA3, transparent 75%)',
        metrics: { RESIDENCY: '3-12 Months', STIPEND: 'Globally Competitive', 'CO-AUTHORS': 'Top Universities' },
        syllabus: [
          'Joint Research Chairs with Premier Malaysian Universities (UM, UTM, USM)',
          'High-Impact International Grant Syndication (Horizon Europe, NSF)',
          'Sabbatical Fellowships for Prominent Malaysian Diaspora Returnees',
          'Annual Frontier AI Symposium & National Research Excellence Awards',
          'Doctoral Student Mentorship & Co-Supervision Programmes'
        ]
      }
    ]
  },
  {
    num: '08',
    slug: 'future-technology.html',
    title: 'AI FUTURE TECHNOLOGY',
    shortName: 'FUTURE TECH',
    tag: 'SYS//NODE.08 FUTURE TECHNOLOGY',
    heroTag: 'MOD.08',
    theme: 'gold',
    statusBadge: 'FRONTIER PILOT // EMERGING HORIZON',
    image: 'assets/pillar_08_future_technology.png',
    prev: { num: '07', name: '07. RESEARCH', file: 'research-innovation.html' },
    next: { num: '01', name: '01. ACADEMY', file: 'academy.html' },
    searchTags: ['Robotics', 'Digital Twins', 'XR Spatial Computing', 'Green AI', 'Autonomous Swarms'],
    modules: [
      {
        tag: 'FUTURE.01 // EMBODIED AI',
        title: 'ROBOTICS & AUTONOMOUS SYSTEMS',
        glitch: 'EMBODIED ROBOTICS',
        desc: 'Embodied artificial intelligence for industrial robotics, autonomous mobile robots (AMRs), warehouse logistics, and drone swarms.',
        category: 'ROBOTICS',
        iconSvg: `<svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><circle cx="12" cy="5" r="2"></circle><path d="M12 7v4"></path><line x1="8" y1="16" x2="8.01" y2="16"></line><line x1="16" y1="16" x2="16.01" y2="16"></line></svg>`,
        gradient: 'radial-gradient(circle at 30% 20%, #FFB800, #FF0055, transparent 75%)',
        metrics: { PRECISION: 'Sub-Millimeter', HARDWARE: 'ROS 2 & NVIDIA Isaac', NAVIGATION: 'Simultaneous SLAM' },
        syllabus: [
          'ROS 2 (Robot Operating System) Real-Time Control & Kinematics',
          'Vision-Language-Action (VLA) Frontier Foundation Models for Robots',
          'Autonomous Fleet Coordination & Multi-Robot Swarm Routing',
          'Real-World Sim-to-Real Transfer using NVIDIA Isaac Sim & MuJoCo',
          'Human-Robot Collaboration Safety Standards & Emergency Interlocks'
        ]
      },
      {
        tag: 'FUTURE.02 // DIGITAL TWINS',
        title: 'INDUSTRIAL DIGITAL TWINS & SIMULATION',
        glitch: 'DIGITAL TWINS',
        desc: 'Physics-accurate virtual replicas of factories, ports, power stations, and urban centers driven by real-time IoT telemetry.',
        category: 'SIMULATION',
        iconSvg: `<svg viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>`,
        gradient: 'radial-gradient(circle at 70% 30%, #00F0FF, #0044FF, transparent 75%)',
        metrics: { FIDELITY: 'Millimeter Exact', REFRESH: 'Real-Time Sub-Second', COMPLIANCE: 'ISO 23247' },
        syllabus: [
          '3D Spatial Telemetry Mapping using USD (Universal Scene Description)',
          'Real-Time Sensor Ingestion via MQTT, Kafka & Edge Gateways',
          'Predictive Failure Simulation & Structural Stress Analysis',
          'What-If Scenario Modeling for Factory Floor Bottleneck Elimination',
          'Cloud-Synchronized Interactive WebGL Digital Twin Explorers'
        ]
      },
      {
        tag: 'FUTURE.03 // SPATIAL COMPUTING',
        title: 'EXTENDED REALITY (XR) & TELEPRESENCE',
        glitch: 'XR & METAVERSE',
        desc: 'Immersive industrial training, remote surgeon assistance, and holographic telepresence using spatial headsets and mixed reality.',
        category: 'XR & SPATIAL',
        iconSvg: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><path d="M8 12h8"></path><path d="M12 8v8"></path></svg>`,
        gradient: 'radial-gradient(circle at 40% 60%, #9D00FF, #00F0FF, transparent 75%)',
        metrics: { HARDWARE: 'Vision Pro, Quest 3, HoloLens', LATENCY: 'Zero Motion-Sickness', IMMERSION: '6DoF Full Tracking' },
        syllabus: [
          'Spatial UI/UX Design for VisionOS & OpenXR Frameworks',
          'Holographic Remote Engineering Assistance & CAD Overlays',
          'High-Risk Industrial Hazard Simulation Training in Safe Virtual VR',
          'Photorealistic Neural Radiance Field (NeRF) Space Streaming',
          'Collaborative Multi-User Spatial Telepresence Workrooms'
        ]
      },
      {
        tag: 'FUTURE.04 // GREEN AI',
        title: 'SUSTAINABLE & GREEN COMPUTING',
        glitch: 'GREEN AI & ESG',
        desc: 'Developing energy-efficient algorithms, carbon-aware model training schedulers, and liquid cooling solutions for tropical datacenters.',
        category: 'GREEN COMPUTING',
        iconSvg: `<svg viewBox="0 0 24 24"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path></svg>`,
        gradient: 'radial-gradient(circle at 50% 20%, #00FFA3, #FFB800, transparent 75%)',
        metrics: { ENERGY: '-45% Power Consumption', PUE: 'Target 1.15 in Tropics', AUDIT: 'ESG Carbon Certified' },
        syllabus: [
          'Carbon-Aware AI Workload Scheduling Aligned to Renewable Energy Peaks',
          'Spiking Neural Networks (SNN) & Neuromorphic Low-Power Silicon',
          'Advanced Immersion Liquid Cooling Architecture for Malaysian Climate',
          'Scope 3 AI Carbon Footprint Accounting & ESG Compliance Auditing',
          'Algorithm Optimization Strategies Slashing Redundant Floating-Point Ops'
        ]
      },
      {
        tag: 'FUTURE.05 // AGENT SWARMS',
        title: 'AUTONOMOUS MULTI-AGENT SWARMS',
        glitch: 'AGENT SWARMS',
        desc: 'Hierarchical autonomous AI agent collectives collaborating to solve multi-step engineering, research, and financial decision pipelines.',
        category: 'SWARM TECH',
        iconSvg: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"></circle><circle cx="19" cy="6" r="2"></circle><circle cx="5" cy="6" r="2"></circle><circle cx="19" cy="18" r="2"></circle><circle cx="5" cy="18" r="2"></circle><line x1="12" y1="9" x2="19" y2="6"></line><line x1="12" y1="9" x2="5" y2="6"></line><line x1="12" y1="15" x2="19" y2="18"></line><line x1="12" y1="15" x2="5" y2="18"></line></svg>`,
        gradient: 'radial-gradient(circle at 30% 70%, #FF0055, #00F0FF, transparent 75%)',
        metrics: { SCALING: '100+ Concurrent Agents', PROTOCOL: 'Agent-to-Agent Mesh', FAULT: 'Self-Healing' },
        syllabus: [
          'Swarm Consensus Mechanisms & Hierarchical Task Decomposition',
          'Inter-Agent Communication Protocols (JSON-RPC, Agent Message Bus)',
          'Autonomous Code Generation, Execution & Sandboxed Self-Correction',
          'Decentralised Knowledge Graphs for Multi-Agent State Synchronization',
          'Real-World Security Safeguards against Cascading Agent Loops'
        ]
      },
      {
        tag: 'FUTURE.06 // QUANTUM AI',
        title: 'QUANTUM-INSPIRED NEURAL COMPUTING',
        glitch: 'QUANTUM READY',
        desc: 'Exploring quantum annealing, tensor networks, and hybrid classical-quantum algorithms preparing Malaysia for the post-silicon future.',
        category: 'QUANTUM TECH',
        iconSvg: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path></svg>`,
        gradient: 'radial-gradient(circle at 70% 70%, #FFB800, #9D00FF, transparent 75%)',
        metrics: { SIMULATION: 'Qubit State Emulation', HYBRID: 'Classical-Quantum Bridge', HORIZON: 'Future-Proof' },
        syllabus: [
          'Quantum Circuit Simulation using Classical High-Memory GPUs',
          'Hybrid Quantum-Classical Optimization for Complex Logistics Routing',
          'Post-Quantum Cryptographic Migration for Sovereign AI Models',
          'Tensor Network Decompositions Accelerating Large Neural Networks',
          'National Quantum AI Strategic Roadmap & Workforce Readiness'
        ]
      }
    ]
  }
];

function buildActiveTheoryHTML(p) {
  const allModules = [
    ...p.modules,
    {
      tag: 'BLUEPRINT // ARCHITECTURE',
      title: 'OFFICIAL STRATEGIC ROADMAP',
      glitch: 'STRATEGIC ROADMAP',
      desc: `Authorised architectural framework & multi-phase national rollout plan for NAIGC Pillar ${p.num} (${p.title}).`,
      category: 'ROADMAP',
      isRoadmap: true,
      image: p.image,
      gradient: 'radial-gradient(circle at 50% 50%, #FFB800, #00F0FF, transparent 75%)',
      metrics: { SCOPE: 'National Blueprint', STATUS: 'Active Rollout', ACCESS: 'Open Architecture' },
      syllabus: [
        `Phase 1: National Baseline Architecture for ${p.title}`,
        'Phase 2: Enterprise & Ecosystem Partner Pilot Integration',
        'Phase 3: High-End Operational Capability & Infrastructure Scaling',
        'Phase 4: Accredited Sovereign Standards & Verified Registry',
        'Phase 5: Regional ASEAN Expansion & International Benchmark'
      ]
    }
  ];

  const modulesJson = JSON.stringify(allModules, null, 2);
  const searchTagsJson = JSON.stringify(p.searchTags);
  const pillarNum = parseInt(p.num, 10);
  const isLeftWing = pillarNum <= 4;
  const wingTag = isLeftWing ? 'ALPHA-WEST // WING LEFT [01-04]' : 'BETA-EAST // WING RIGHT [05-08]';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
  <title>Active Theory · NAIGC ${p.title}</title>
  <meta name="description" content="NAIGC ${p.title} — ${p.tag}. Sovereign AI Infrastructure & Strategic Development.">
  <link rel="icon" href="../favicon.ico">

  <!-- Fonts matching Active Theory (Syne / Monument Grotesk style + Monospace) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;600;700;800;900&family=Space+Grotesk:wght@400;600;700;800&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">

  <style>
    :root {
      --at-bg: #030508;
      --at-cyan: #00F0FF;
      --at-cyan-dim: rgba(0, 240, 255, 0.45);
      --at-cyan-glow: rgba(0, 240, 255, 0.25);
      --at-gold: #FFB800;
      --at-gold-glow: rgba(255, 184, 0, 0.28);
      --at-white: #FFFFFF;
      --at-gray: #8A99AD;
      --at-glass: rgba(10, 20, 36, 0.65);
      --at-glass-border: rgba(0, 240, 255, 0.28);
      --at-glass-card: rgba(8, 16, 32, 0.72);
      --at-font-sans: 'Space Grotesk', -apple-system, sans-serif;
      --at-font-display: 'Plus Jakarta Sans', sans-serif;
      --at-font-mono: 'Space Mono', monospace;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      user-select: none;
      -webkit-user-select: none;
    }

    html, body {
      width: 100vw;
      height: 100vh;
      overflow: hidden;
      background-color: var(--at-bg);
      color: var(--at-white);
      font-family: var(--at-font-sans);
      cursor: crosshair;
    }

    /* 3D WebGL Canvas Layer */
    #at-canvas {
      position: fixed;
      inset: 0;
      width: 100vw;
      height: 100vh;
      z-index: 1;
      display: block;
    }

    /* Active Theory Signature Chromatic Noise & Vignette */
    .at-vignette {
      position: fixed;
      inset: 0;
      z-index: 2;
      pointer-events: none;
      background: radial-gradient(circle at 50% 50%, transparent 40%, rgba(1, 3, 7, 0.85) 100%);
      box-shadow: inset 0 0 140px rgba(0, 0, 0, 0.95);
    }

    /* ==========================================================================
       1. ACTIVE THEORY PORTAL APERTURE LOADER
       ========================================================================== */
    #at-loader {
      position: fixed;
      inset: 0;
      z-index: 1000;
      background-color: #010306;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      transition: opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.85s;
    }

    #at-loader.is-loaded {
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
    }

    .at-portal-wrapper {
      position: relative;
      width: 320px;
      height: 320px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .at-portal-ring {
      position: absolute;
      inset: 20px;
      border-radius: 50%;
      border: 1px solid rgba(0, 240, 255, 0.35);
      box-shadow: 0 0 35px rgba(0, 240, 255, 0.25), inset 0 0 20px rgba(0, 240, 255, 0.15);
      animation: at-ring-pulse 3s ease-in-out infinite alternate;
    }

    @keyframes at-ring-pulse {
      0% { transform: scale(0.96); border-color: rgba(0, 240, 255, 0.25); }
      100% { transform: scale(1.04); border-color: rgba(0, 240, 255, 0.75); }
    }

    .at-portal-core {
      position: relative;
      width: 140px;
      height: 140px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(0, 240, 255, 0.15) 0%, rgba(2, 8, 22, 0.9) 70%);
      border: 1.5px solid rgba(0, 240, 255, 0.7);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 30px rgba(0, 240, 255, 0.5);
    }

    .at-loader-pct {
      font-family: var(--at-font-mono);
      font-size: 1.15rem;
      letter-spacing: 0.18em;
      color: #FFFFFF;
      text-shadow: 0 0 10px #00F0FF;
    }

    .at-loader-sub {
      font-family: var(--at-font-mono);
      font-size: 0.55rem;
      letter-spacing: 0.2em;
      color: var(--at-cyan);
      margin-top: 4px;
      text-transform: uppercase;
    }

    .at-filaments {
      position: absolute;
      inset: -50px;
      width: calc(100% + 100px);
      height: calc(100% + 100px);
      pointer-events: none;
      animation: at-spin-slow 28s linear infinite;
    }

    @keyframes at-spin-slow {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .at-enter-prompt {
      margin-top: 2.5rem;
      font-family: var(--at-font-mono);
      font-size: 0.7rem;
      letter-spacing: 0.32em;
      color: rgba(255, 255, 255, 0.6);
      text-transform: uppercase;
      animation: at-blink 1.4s infinite ease-in-out;
    }

    @keyframes at-blink {
      0%, 100% { opacity: 0.4; }
      50% { opacity: 1; text-shadow: 0 0 10px #00F0FF; }
    }

    /* ==========================================================================
       2. ACTIVE THEORY UI CHROME & HUD LAYER
       ========================================================================== */
    .at-hud-layer {
      position: fixed;
      inset: 0;
      z-index: 10;
      pointer-events: none;
      padding: clamp(1.2rem, 3vh, 2.5rem);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .at-hud-layer * {
      pointer-events: auto;
    }

    .at-top-bar {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      width: 100%;
    }

    .at-logo-group {
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
      text-decoration: none;
    }

    .at-logo-brand {
      display: flex;
      align-items: center;
      gap: 0.85rem;
    }

    .at-logo-img {
      width: 32px;
      height: auto;
      filter: drop-shadow(0 0 8px #00F0FF);
    }

    .at-logo-title {
      font-family: var(--at-font-display);
      font-size: 1.15rem;
      font-weight: 900;
      letter-spacing: 0.16em;
      color: #FFFFFF;
      text-shadow: 0 0 12px rgba(0, 240, 255, 0.6);
    }

    .at-logo-sub {
      font-family: var(--at-font-mono);
      font-size: 0.62rem;
      letter-spacing: 0.22em;
      color: rgba(0, 240, 255, 0.7);
      text-transform: uppercase;
    }

    .at-menu-capsule {
      display: flex;
      align-items: center;
      gap: 1.4rem;
      background: var(--at-glass);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid var(--at-glass-border);
      padding: 0.55rem 1.6rem;
      border-radius: 40px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6), 0 0 18px rgba(0, 240, 255, 0.15);
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .at-menu-capsule:hover {
      border-color: var(--at-cyan);
      box-shadow: 0 8px 36px rgba(0, 0, 0, 0.7), 0 0 28px rgba(0, 240, 255, 0.4);
    }

    .at-menu-item {
      font-family: var(--at-font-mono);
      font-size: 0.72rem;
      letter-spacing: 0.18em;
      color: rgba(255, 255, 255, 0.8);
      text-decoration: none;
      text-transform: uppercase;
      font-weight: 700;
      transition: color 0.2s ease, text-shadow 0.2s ease;
    }

    .at-menu-item:hover, .at-menu-item.is-active {
      color: var(--at-cyan);
      text-shadow: 0 0 10px var(--at-cyan);
    }

    .at-sine-glyph {
      width: 28px;
      height: 10px;
      stroke: var(--at-cyan);
      stroke-width: 1.6;
      fill: none;
      opacity: 0.85;
      animation: at-wave-drift 2.2s infinite ease-in-out alternate;
    }

    @keyframes at-wave-drift {
      0% { opacity: 0.5; transform: scaleY(0.85); }
      100% { opacity: 1; transform: scaleY(1.2); }
    }

    .at-sub-pill-nav {
      margin-top: 0.65rem;
      display: flex;
      justify-content: flex-end;
      gap: 0.6rem;
    }

    .at-sub-pill {
      font-family: var(--at-font-mono);
      font-size: 0.6rem;
      letter-spacing: 0.16em;
      color: var(--at-gray);
      background: rgba(3, 9, 22, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 0.3rem 0.75rem;
      border-radius: 20px;
      text-decoration: none;
      transition: all 0.2s ease;
    }

    .at-sub-pill:hover {
      color: var(--at-cyan);
      border-color: var(--at-cyan);
      box-shadow: 0 0 10px rgba(0, 240, 255, 0.3);
    }

    /* ==========================================================================
       3. LEFT FLOATING TERMINAL CONSOLE
       ========================================================================== */
    .at-left-console {
      position: absolute;
      left: clamp(1.2rem, 3vh, 2.5rem);
      bottom: clamp(1.5rem, 4vh, 3.5rem);
      max-width: 290px;
      z-index: 15;
    }

    .at-console-header {
      font-family: var(--at-font-mono);
      font-size: 0.68rem;
      letter-spacing: 0.22em;
      color: #FFFFFF;
      margin-bottom: 0.9rem;
      text-transform: uppercase;
      font-weight: 700;
    }

    .at-console-menu {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 0.45rem;
      margin-bottom: 1.25rem;
    }

    .at-console-btn {
      font-family: var(--at-font-mono);
      font-size: 0.7rem;
      letter-spacing: 0.14em;
      color: rgba(180, 195, 220, 0.7);
      background: transparent;
      border: none;
      text-align: left;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.2s ease;
      padding: 0.2rem 0;
    }

    .at-console-btn::before {
      content: "->";
      color: var(--at-cyan);
      opacity: 0.5;
      transition: all 0.2s ease;
    }

    .at-console-btn:hover, .at-console-btn.is-active {
      color: var(--at-cyan);
      text-shadow: 0 0 10px var(--at-cyan);
      transform: translateX(4px);
    }

    .at-console-btn:hover::before, .at-console-btn.is-active::before {
      opacity: 1;
      transform: translateX(2px);
    }

    .at-console-btn.at-btn-roadmap {
      color: var(--at-gold);
      font-weight: 700;
    }

    .at-console-btn.at-btn-roadmap::before {
      color: var(--at-gold);
    }

    .at-console-btn.at-btn-roadmap:hover, .at-console-btn.at-btn-roadmap.is-active {
      color: #FFE600;
      text-shadow: 0 0 12px rgba(255, 184, 0, 0.8);
    }

    .at-ask-capsule {
      display: inline-flex;
      align-items: center;
      gap: 0.6rem;
      background: rgba(8, 20, 42, 0.7);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(0, 240, 255, 0.35);
      padding: 0.55rem 1.25rem;
      border-radius: 30px;
      font-family: var(--at-font-mono);
      font-size: 0.68rem;
      letter-spacing: 0.18em;
      color: rgba(255, 255, 255, 0.85);
      cursor: pointer;
      transition: all 0.25s ease;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
    }

    .at-ask-capsule:hover {
      background: rgba(0, 240, 255, 0.15);
      border-color: var(--at-cyan);
      box-shadow: 0 0 20px rgba(0, 240, 255, 0.4);
      color: #FFFFFF;
    }

    /* ==========================================================================
       4. BOTTOM CENTER CONTROLS: DIAL PAGINATION & PILLAR MINI-DOCK
       ========================================================================== */
    .at-bottom-center-group {
      position: absolute;
      bottom: clamp(1rem, 2.5vh, 2rem);
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.75rem;
      pointer-events: none;
      z-index: 20;
    }

    /* Dial Progress & Step Dots */
    .at-carousel-dial-bar {
      display: flex;
      align-items: center;
      gap: 1rem;
      background: rgba(5, 14, 30, 0.75);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(0, 240, 255, 0.25);
      padding: 0.4rem 1.1rem;
      border-radius: 30px;
      pointer-events: auto;
      box-shadow: 0 4px 25px rgba(0, 0, 0, 0.6);
    }

    .at-dial-indicator {
      font-family: var(--at-font-mono);
      font-size: 0.68rem;
      letter-spacing: 0.22em;
      color: var(--at-cyan);
      font-weight: 700;
      text-shadow: 0 0 10px rgba(0, 240, 255, 0.6);
    }

    .at-dial-dots {
      display: flex;
      align-items: center;
      gap: 0.45rem;
    }

    .at-dial-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.2);
      border: 1px solid transparent;
      cursor: pointer;
      transition: all 0.25s ease;
    }

    .at-dial-dot:hover {
      background: var(--at-cyan);
      transform: scale(1.3);
    }

    .at-dial-dot.is-active {
      width: 22px;
      border-radius: 10px;
      background: var(--at-cyan);
      box-shadow: 0 0 10px #00F0FF;
    }

    /* Floating Pillar Mini-Dock (01 to 08) */
    .at-pillar-dock {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      background: rgba(4, 11, 25, 0.85);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(0, 240, 255, 0.3);
      padding: 0.35rem 0.65rem;
      border-radius: 35px;
      pointer-events: auto;
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.7), 0 0 15px rgba(0, 240, 255, 0.15);
    }

    .at-dock-node {
      position: relative;
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background: rgba(8, 20, 42, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: rgba(255, 255, 255, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: var(--at-font-mono);
      font-size: 0.65rem;
      font-weight: 700;
      text-decoration: none;
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .at-dock-node:hover {
      color: #010408;
      background: var(--at-cyan);
      border-color: var(--at-cyan);
      box-shadow: 0 0 15px #00F0FF;
      transform: translateY(-4px) scale(1.15);
    }

    .at-dock-node.is-current {
      background: var(--at-cyan);
      color: #020612;
      border-color: #00F0FF;
      box-shadow: 0 0 18px rgba(0, 240, 255, 0.8);
      font-weight: 800;
    }

    /* Tooltip on Hover */
    .at-dock-node::after {
      content: attr(data-tooltip);
      position: absolute;
      bottom: 44px;
      left: 50%;
      transform: translateX(-50%) translateY(6px);
      background: rgba(3, 10, 24, 0.95);
      border: 1px solid var(--at-cyan);
      color: #FFFFFF;
      padding: 0.3rem 0.65rem;
      border-radius: 8px;
      font-size: 0.62rem;
      letter-spacing: 0.12em;
      white-space: nowrap;
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
      transition: all 0.2s ease;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.8);
    }

    .at-dock-node:hover::after {
      opacity: 1;
      visibility: visible;
      transform: translateX(-50%) translateY(0);
    }

    /* Bottom Right: Audio Equalizer & System Telemetry */
    .at-bottom-right {
      position: absolute;
      right: clamp(1.2rem, 3vh, 2.5rem);
      bottom: clamp(1.2rem, 3vh, 2.5rem);
      display: flex;
      align-items: center;
      gap: 1.25rem;
      font-family: var(--at-font-mono);
      font-size: 0.65rem;
      letter-spacing: 0.18em;
      color: var(--at-gray);
    }

    .at-audio-btn {
      background: rgba(4, 12, 28, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: rgba(255, 255, 255, 0.75);
      padding: 0.45rem 0.9rem;
      border-radius: 20px;
      font-family: var(--at-font-mono);
      font-size: 0.62rem;
      letter-spacing: 0.15em;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.65rem;
      transition: all 0.2s ease;
    }

    .at-audio-btn:hover {
      border-color: var(--at-cyan);
      color: var(--at-cyan);
      box-shadow: 0 0 12px rgba(0, 240, 255, 0.3);
    }

    /* Animated Audio Equalizer Bars */
    .at-equalizer {
      display: flex;
      align-items: flex-end;
      gap: 2.5px;
      height: 12px;
    }

    .at-eq-bar {
      width: 2.5px;
      background: var(--at-cyan);
      border-radius: 1px;
      animation: at-equalizer-bounce 1s ease-in-out infinite alternate;
    }

    .at-eq-bar:nth-child(1) { height: 4px; animation-delay: 0.1s; }
    .at-eq-bar:nth-child(2) { height: 10px; animation-delay: 0.3s; }
    .at-eq-bar:nth-child(3) { height: 7px; animation-delay: 0.2s; }
    .at-eq-bar:nth-child(4) { height: 12px; animation-delay: 0.4s; }

    @keyframes at-equalizer-bounce {
      0% { height: 2px; }
      100% { height: 12px; }
    }

    .at-audio-btn.is-muted .at-eq-bar {
      animation-play-state: paused;
      height: 2px !important;
      background: rgba(255, 255, 255, 0.3);
    }

    /* ==========================================================================
       5. 3D FLOATING CARDS CAROUSEL WITH GYRO TILT & SHEEN & DIRECTIONAL TRANSITIONS
       ========================================================================== */
    #at-carousel-stage {
      position: fixed;
      inset: 0;
      width: 100vw;
      height: 100vh;
      z-index: 5;
      pointer-events: none;
      perspective: 1500px;
      display: flex;
      align-items: center;
      justify-content: center;
      transform-style: preserve-3d;
      opacity: 0;
      transition: opacity 0.35s ease;
    }

    #at-carousel-stage.at-stage-ready {
      opacity: 1;
    }

    /* Entrance from Left (Pillars 1-4) */
    .at-stage-enter-left {
      animation: atStageSlideInFromLeft 0.85s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    /* Entrance from Right (Pillars 5-8) */
    .at-stage-enter-right {
      animation: atStageSlideInFromRight 0.85s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    /* Exit to Left (Pillars 1-4 returning to Core or moving left) */
    .at-stage-exit-left {
      animation: atStageSlideOutToLeft 0.45s cubic-bezier(0.7, 0, 0.84, 0) forwards !important;
    }

    /* Exit to Right (Pillars 5-8 returning to Core or moving right) */
    .at-stage-exit-right {
      animation: atStageSlideOutToRight 0.45s cubic-bezier(0.7, 0, 0.84, 0) forwards !important;
    }

    @keyframes atStageSlideInFromLeft {
      0% {
        transform: translateX(-55vw) rotateY(-26deg) scale(0.82);
        opacity: 0;
        filter: blur(16px);
      }
      100% {
        transform: translateX(0) rotateY(0deg) scale(1);
        opacity: 1;
        filter: blur(0px);
      }
    }

    @keyframes atStageSlideInFromRight {
      0% {
        transform: translateX(55vw) rotateY(26deg) scale(0.82);
        opacity: 0;
        filter: blur(16px);
      }
      100% {
        transform: translateX(0) rotateY(0deg) scale(1);
        opacity: 1;
        filter: blur(0px);
      }
    }

    @keyframes atStageSlideOutToLeft {
      0% {
        transform: translateX(0) rotateY(0deg) scale(1);
        opacity: 1;
        filter: blur(0px);
      }
      100% {
        transform: translateX(-55vw) rotateY(-26deg) scale(0.82);
        opacity: 0;
        filter: blur(16px);
      }
    }

    @keyframes atStageSlideOutToRight {
      0% {
        transform: translateX(0) rotateY(0deg) scale(1);
        opacity: 1;
        filter: blur(0px);
      }
      100% {
        transform: translateX(55vw) rotateY(26deg) scale(0.82);
        opacity: 0;
        filter: blur(16px);
      }
    }

    /* Directional Spatial Transition Curtain */
    #at-transition-curtain {
      position: fixed;
      inset: 0;
      width: 100vw;
      height: 100vh;
      z-index: 9999;
      background: #010308;
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;
      opacity: 0;
      visibility: hidden;
    }

    #at-transition-curtain.at-curtain-active {
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
    }

    /* Reveal animations upon landing */
    #at-transition-curtain.enter-reveal-left {
      animation: atCurtainRevealLeft 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      border-right: 3px solid #00F0FF;
      box-shadow: 25px 0 80px rgba(0, 240, 255, 0.8);
    }

    #at-transition-curtain.enter-reveal-right {
      animation: atCurtainRevealRight 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      border-left: 3px solid #FFB800;
      box-shadow: -25px 0 80px rgba(255, 184, 0, 0.8);
    }

    @keyframes atCurtainRevealLeft {
      0% { transform: translateX(0%); opacity: 1; }
      100% { transform: translateX(100%); opacity: 0; visibility: hidden; }
    }

    @keyframes atCurtainRevealRight {
      0% { transform: translateX(0%); opacity: 1; }
      100% { transform: translateX(-100%); opacity: 0; visibility: hidden; }
    }

    /* Exit animations upon returning or moving */
    #at-transition-curtain.exit-to-left {
      animation: atCurtainExitLeft 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      border-right: 3px solid #00F0FF;
      box-shadow: 25px 0 80px rgba(0, 240, 255, 0.8);
    }

    #at-transition-curtain.exit-to-right {
      animation: atCurtainExitRight 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      border-left: 3px solid #FFB800;
      box-shadow: -25px 0 80px rgba(255, 184, 0, 0.8);
    }

    @keyframes atCurtainExitLeft {
      0% { transform: translateX(100%); }
      100% { transform: translateX(0%); }
    }

    @keyframes atCurtainExitRight {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(0%); }
    }

    .at-curtain-hud {
      font-family: var(--at-font-mono);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      text-align: center;
    }

    .at-curtain-hud-tag {
      font-size: 0.65rem;
      letter-spacing: 0.22em;
      color: var(--at-cyan);
      text-shadow: 0 0 10px rgba(0, 240, 255, 0.8);
    }

    .at-curtain-hud-title {
      font-family: var(--at-font-display);
      font-size: clamp(1.2rem, 3vw, 2.2rem);
      font-weight: 900;
      letter-spacing: 0.12em;
      color: #FFFFFF;
    }

    .at-curtain-hud-wing {
      font-size: 0.58rem;
      letter-spacing: 0.2em;
      color: rgba(255, 255, 255, 0.55);
    }

    .at-card-track {
      position: relative;
      width: 100%;
      height: 100%;
      transform-style: preserve-3d;
      pointer-events: none;
    }

    .at-card {
      position: absolute;
      top: 50%;
      left: 50%;
      width: clamp(340px, 38vw, 520px);
      height: clamp(520px, 68vh, 720px);
      margin-left: calc(clamp(340px, 38vw, 520px) / -2);
      margin-top: calc(clamp(520px, 68vh, 720px) / -2);
      background: linear-gradient(145deg, rgba(10, 24, 48, 0.88) 0%, rgba(3, 9, 22, 0.94) 100%);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(0, 240, 255, 0.28);
      border-radius: 20px;
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.8), 0 0 35px rgba(0, 240, 255, 0.08);
      padding: clamp(1.4rem, 2.5vw, 2rem);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      pointer-events: auto;
      cursor: pointer;
      transition: border-color 0.35s ease, box-shadow 0.35s ease, filter 0.35s ease;
      transform-style: preserve-3d;
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
      overflow: hidden;
      position: absolute;
    }

    .at-card.is-center {
      border-color: #00F0FF;
      box-shadow: 0 35px 95px rgba(0, 0, 0, 0.95), 0 0 60px rgba(0, 240, 255, 0.42);
      filter: brightness(1.08) drop-shadow(0 0 25px rgba(0, 240, 255, 0.2));
    }

    .at-card:not(.is-center) {
      filter: brightness(0.65) blur(0.6px);
    }

    .at-card:hover {
      border-color: #00F0FF;
      filter: brightness(1.1) blur(0px);
      box-shadow: 0 35px 85px rgba(0, 0, 0, 0.9), 0 0 50px rgba(0, 240, 255, 0.4);
    }

    /* Specular Reflective Light Sheen */
    .at-card-sheen {
      position: absolute;
      inset: 0;
      border-radius: 20px;
      pointer-events: none;
      background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0, 240, 255, 0.16) 0%, transparent 60%);
      opacity: 0;
      transition: opacity 0.3s ease;
      mix-blend-mode: screen;
      z-index: 5;
    }

    .at-card:hover .at-card-sheen {
      opacity: 1;
    }

    /* Dynamic Visual Header on Cards with Radar Sweep */
    .at-card-visual-header {
      position: relative;
      width: 100%;
      height: clamp(85px, 13vh, 120px);
      border-radius: 12px;
      overflow: hidden;
      margin-bottom: 0.95rem;
      border: 1px solid rgba(0, 240, 255, 0.25);
      background: #020712;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .at-card-visual-mesh {
      position: absolute;
      inset: 0;
      background-size: 20px 20px;
      background-image: 
        linear-gradient(to right, rgba(0, 240, 255, 0.08) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(0, 240, 255, 0.08) 1px, transparent 1px);
      opacity: 0.9;
    }

    .at-card-radar-sweep {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background: linear-gradient(90deg, transparent, #00F0FF, transparent);
      box-shadow: 0 0 10px #00F0FF;
      animation: at-radar-scan 3.5s ease-in-out infinite alternate;
    }

    @keyframes at-radar-scan {
      0% { top: 0%; opacity: 0.3; }
      50% { opacity: 0.8; }
      100% { top: 100%; opacity: 0.3; }
    }

    .at-card-visual-gradient {
      position: absolute;
      inset: 0;
      opacity: 0.45;
      mix-blend-mode: screen;
      transition: opacity 0.3s ease;
    }

    .at-card:hover .at-card-visual-gradient {
      opacity: 0.75;
    }

    .at-card-visual-icon {
      position: relative;
      z-index: 2;
      width: 52px;
      height: 52px;
      border-radius: 14px;
      background: rgba(3, 10, 26, 0.85);
      border: 1px solid rgba(0, 240, 255, 0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 25px rgba(0, 240, 255, 0.4);
      transition: transform 0.3s ease, border-color 0.3s ease;
    }

    .at-card:hover .at-card-visual-icon {
      transform: scale(1.1);
      border-color: #00F0FF;
      box-shadow: 0 0 35px rgba(0, 240, 255, 0.8);
    }

    .at-card-visual-icon svg {
      width: 26px;
      height: 26px;
      stroke: #00F0FF;
      fill: none;
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    .at-card-roadmap-thumb {
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0.85;
      transition: transform 0.4s ease, opacity 0.3s ease;
    }

    .at-card:hover .at-card-roadmap-thumb {
      transform: scale(1.05);
      opacity: 1;
    }

    .at-roadmap-badge {
      position: absolute;
      top: 8px;
      right: 8px;
      background: rgba(255, 184, 0, 0.25);
      border: 1px solid #FFB800;
      color: #FFB800;
      padding: 0.2rem 0.55rem;
      border-radius: 12px;
      font-family: var(--at-font-mono);
      font-size: 0.55rem;
      letter-spacing: 0.15em;
      font-weight: 700;
      text-shadow: 0 0 8px rgba(255, 184, 0, 0.8);
      z-index: 3;
    }

    .at-glitch-title {
      font-family: var(--at-font-display);
      font-size: clamp(1.4rem, 2.5vw, 2.1rem);
      font-weight: 900;
      line-height: 1.15;
      letter-spacing: -0.02em;
      color: #FFFFFF;
      position: relative;
      margin-bottom: 0.65rem;
      text-transform: uppercase;
    }

    .at-glitch-title::before,
    .at-glitch-title::after {
      content: attr(data-text);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      opacity: 0.8;
    }

    .at-glitch-title::before {
      color: #00F0FF;
      transform: translate(-1.5px, 0);
      mix-blend-mode: screen;
      clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
    }

    .at-glitch-title::after {
      color: #FF0055;
      transform: translate(1.5px, 0);
      mix-blend-mode: screen;
      clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%);
    }

    .at-card-tag {
      font-family: var(--at-font-mono);
      font-size: 0.65rem;
      letter-spacing: 0.22em;
      color: var(--at-cyan);
      margin-bottom: 0.35rem;
      text-transform: uppercase;
      font-weight: 700;
    }

    .at-card-desc {
      color: #A3B8CC;
      font-size: clamp(0.8rem, 1.05vw, 0.92rem);
      line-height: 1.5;
      margin-bottom: 0.75rem;
    }

    .at-card-meta-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
      margin-bottom: 0.95rem;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      padding-top: 0.65rem;
    }

    .at-card-meta-item {
      display: flex;
      justify-content: space-between;
      font-family: var(--at-font-mono);
      font-size: 0.68rem;
      letter-spacing: 0.1em;
    }

    .at-meta-k {
      color: var(--at-gray);
      text-transform: uppercase;
    }

    .at-meta-v {
      color: #FFFFFF;
      font-weight: 700;
    }

    .at-btn-select {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      background: rgba(0, 240, 255, 0.1);
      border: 1px solid var(--at-cyan);
      color: #FFFFFF;
      padding: 0.75rem 1.5rem;
      border-radius: 40px;
      font-family: var(--at-font-mono);
      font-size: 0.72rem;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      font-weight: 700;
      transition: all 0.25s ease;
      width: 100%;
    }

    .at-card:hover .at-btn-select {
      background: var(--at-cyan);
      color: #010408;
      box-shadow: 0 0 25px rgba(0, 240, 255, 0.8);
    }

    /* ==========================================================================
       6. SLIDE-OVER DETAIL DRAWER MODAL (ENHANCED CINEMATIC)
       ========================================================================== */
    #at-drawer {
      position: fixed;
      top: 0;
      right: 0;
      width: clamp(380px, 45vw, 680px);
      height: 100vh;
      background: rgba(4, 10, 24, 0.96);
      backdrop-filter: blur(28px);
      -webkit-backdrop-filter: blur(28px);
      border-left: 1px solid rgba(0, 240, 255, 0.35);
      box-shadow: -20px 0 60px rgba(0, 0, 0, 0.85);
      z-index: 100;
      transform: translateX(105%);
      transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
      overflow-y: auto;
      padding: clamp(2rem, 4vw, 3.5rem);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    #at-drawer.is-open {
      transform: translateX(0%);
    }

    .at-drawer-close {
      position: absolute;
      top: 2rem;
      right: 2rem;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: #FFFFFF;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      font-family: var(--at-font-mono);
      font-size: 1rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.25s ease;
    }

    .at-drawer-close:hover {
      background: var(--at-cyan);
      color: #030814;
      border-color: var(--at-cyan);
      box-shadow: 0 0 15px #00F0FF;
    }

    /* Live Operational Status Pulse */
    .at-drawer-status-pill {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: rgba(0, 240, 255, 0.12);
      border: 1px solid rgba(0, 240, 255, 0.4);
      color: var(--at-cyan);
      font-family: var(--at-font-mono);
      font-size: 0.62rem;
      letter-spacing: 0.16em;
      padding: 0.3rem 0.8rem;
      border-radius: 20px;
      margin-bottom: 1rem;
      font-weight: 700;
    }

    .at-status-pulse {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #00F0FF;
      box-shadow: 0 0 8px #00F0FF;
      animation: at-ring-pulse 1.8s infinite;
    }

    .at-drawer-tag {
      font-family: var(--at-font-mono);
      font-size: 0.72rem;
      letter-spacing: 0.22em;
      color: var(--at-cyan);
      margin-bottom: 0.75rem;
    }

    .at-drawer-title {
      font-family: var(--at-font-display);
      font-size: 2.2rem;
      font-weight: 900;
      line-height: 1.15;
      margin-bottom: 1.25rem;
      color: #FFFFFF;
    }

    .at-drawer-body {
      color: #C3D5E8;
      font-size: 1rem;
      line-height: 1.7;
      margin-bottom: 1.75rem;
    }

    /* Key Metrics Strip */
    .at-drawer-metrics-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 0.75rem;
      margin-bottom: 2rem;
    }

    .at-metric-tile {
      background: rgba(8, 20, 42, 0.6);
      border: 1px solid rgba(0, 240, 255, 0.2);
      border-radius: 10px;
      padding: 0.75rem;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .at-metric-label {
      font-family: var(--at-font-mono);
      font-size: 0.58rem;
      color: var(--at-gray);
      letter-spacing: 0.14em;
      text-transform: uppercase;
    }

    .at-metric-value {
      font-family: var(--at-font-mono);
      font-size: 0.78rem;
      color: #FFFFFF;
      font-weight: 700;
    }

    .at-drawer-syllabus {
      margin-bottom: 2.25rem;
    }

    .at-drawer-syllabus h4 {
      font-family: var(--at-font-mono);
      font-size: 0.8rem;
      letter-spacing: 0.16em;
      color: var(--at-cyan);
      margin-bottom: 1rem;
      text-transform: uppercase;
    }

    .at-syllabus-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 0.85rem;
    }

    .at-syllabus-item {
      display: flex;
      align-items: flex-start;
      gap: 0.85rem;
      font-size: 0.92rem;
      color: #E2EDF8;
    }

    .at-syllabus-item::before {
      content: "✦";
      color: var(--at-cyan);
      flex-shrink: 0;
    }

    .at-drawer-cta-group {
      display: flex;
      flex-direction: column;
      gap: 0.85rem;
      padding-top: 1.5rem;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }

    .at-btn-cta {
      background: var(--at-cyan);
      color: #020712;
      border: none;
      padding: 1rem 2rem;
      border-radius: 40px;
      font-family: var(--at-font-mono);
      font-size: 0.82rem;
      letter-spacing: 0.16em;
      font-weight: 800;
      text-transform: uppercase;
      cursor: pointer;
      transition: all 0.25s ease;
      box-shadow: 0 0 25px rgba(0, 240, 255, 0.5);
      text-align: center;
      text-decoration: none;
      display: block;
    }

    .at-btn-cta:hover {
      background: #FFFFFF;
      box-shadow: 0 0 35px #00F0FF;
      transform: translateY(-2px);
    }

    .at-btn-whatsapp {
      background: rgba(37, 211, 102, 0.18);
      border: 1px solid #25D366;
      color: #25D366;
      padding: 0.85rem 1.75rem;
      border-radius: 40px;
      font-family: var(--at-font-mono);
      font-size: 0.75rem;
      letter-spacing: 0.14em;
      font-weight: 700;
      text-transform: uppercase;
      cursor: pointer;
      text-decoration: none;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      transition: all 0.25s ease;
    }

    .at-btn-whatsapp:hover {
      background: #25D366;
      color: #010408;
      box-shadow: 0 0 25px rgba(37, 211, 102, 0.6);
      transform: translateY(-2px);
    }

    #at-drawer-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(8px);
      z-index: 90;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.4s ease;
    }

    #at-drawer-backdrop.is-active {
      opacity: 1;
      pointer-events: auto;
    }

    /* ==========================================================================
       7. FULL-SCREEN LIGHTBOX MODAL
       ========================================================================== */
    #at-lightbox {
      position: fixed;
      inset: 0;
      z-index: 250;
      background: rgba(1, 4, 10, 0.94);
      backdrop-filter: blur(22px);
      -webkit-backdrop-filter: blur(22px);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
      transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.4s;
      padding: clamp(1rem, 3vw, 2.5rem);
    }

    #at-lightbox.is-open {
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
    }

    .at-lightbox-close {
      position: absolute;
      top: clamp(1rem, 3vh, 2rem);
      right: clamp(1rem, 3vh, 2rem);
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(0, 240, 255, 0.4);
      color: #FFFFFF;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      font-family: var(--at-font-mono);
      font-size: 1.3rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.25s ease;
      z-index: 260;
    }

    .at-lightbox-close:hover {
      background: var(--at-cyan);
      color: #010408;
      box-shadow: 0 0 20px #00F0FF;
    }

    .at-lightbox-content {
      position: relative;
      max-width: 1400px;
      width: 100%;
      max-height: 90vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .at-lightbox-header {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      border-bottom: 1px solid rgba(0, 240, 255, 0.25);
      padding-bottom: 0.75rem;
    }

    .at-lightbox-tag {
      font-family: var(--at-font-mono);
      font-size: 0.75rem;
      letter-spacing: 0.2em;
      color: var(--at-cyan);
      text-transform: uppercase;
    }

    .at-lightbox-title {
      font-family: var(--at-font-display);
      font-size: 1.1rem;
      font-weight: 800;
      color: #FFFFFF;
      letter-spacing: 0.05em;
    }

    .at-lightbox-img-wrapper {
      position: relative;
      max-height: 70vh;
      overflow: hidden;
      border-radius: 12px;
      border: 1px solid rgba(0, 240, 255, 0.4);
      box-shadow: 0 0 50px rgba(0, 240, 255, 0.2), 0 20px 60px rgba(0, 0, 0, 0.9);
      background: #000;
    }

    .at-lightbox-img {
      max-width: 100%;
      max-height: 70vh;
      object-fit: contain;
      display: block;
      cursor: zoom-in;
      transition: transform 0.3s ease;
    }

    .at-lightbox-footer {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 1rem;
      font-family: var(--at-font-mono);
      font-size: 0.7rem;
      letter-spacing: 0.15em;
      color: var(--at-gray);
    }

    .at-btn-download {
      background: rgba(255, 184, 0, 0.2);
      border: 1px solid #FFB800;
      color: #FFB800;
      padding: 0.5rem 1.25rem;
      border-radius: 30px;
      text-decoration: none;
      font-weight: 700;
      transition: all 0.25s ease;
    }

    .at-btn-download:hover {
      background: #FFB800;
      color: #010408;
      box-shadow: 0 0 20px rgba(255, 184, 0, 0.8);
    }

    /* Modal / Popup for Search or Dialog */
    #at-search-dialog {
      position: fixed;
      inset: 0;
      z-index: 200;
      background: rgba(1, 4, 10, 0.85);
      backdrop-filter: blur(20px);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      pointer-events: none;
      transition: all 0.3s ease;
    }

    #at-search-dialog.is-active {
      opacity: 1;
      pointer-events: auto;
    }

    .at-search-box {
      width: clamp(340px, 60vw, 720px);
      background: rgba(6, 16, 36, 0.95);
      border: 1px solid var(--at-cyan);
      border-radius: 16px;
      padding: 2.5rem;
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(0, 240, 255, 0.3);
      position: relative;
    }

    .at-search-input {
      width: 100%;
      background: transparent;
      border: none;
      border-bottom: 2px solid var(--at-cyan);
      color: #FFFFFF;
      font-family: var(--at-font-display);
      font-size: 1.4rem;
      padding: 0.75rem 0;
      outline: none;
      margin-bottom: 1.5rem;
    }

    .at-search-hints {
      font-family: var(--at-font-mono);
      font-size: 0.75rem;
      color: var(--at-gray);
      line-height: 1.8;
    }

    .at-search-hints span {
      color: var(--at-cyan);
      cursor: pointer;
    }
  </style>
</head>
<body>

  <!-- Directional Spatial Transition Curtain (Left for 1-4, Right for 5-8) -->
  <div id="at-transition-curtain" class="at-curtain-active ${isLeftWing ? 'enter-reveal-left' : 'enter-reveal-right'}">
    <div class="at-curtain-hud">
      <div class="at-curtain-hud-tag">// SPATIAL TELEMETRY MATRIX //</div>
      <div class="at-curtain-hud-title">${p.title}</div>
      <div class="at-curtain-hud-wing">${wingTag}</div>
    </div>
  </div>

  <!-- WebGL Background Canvas -->
  <canvas id="at-canvas"></canvas>
  <div class="at-vignette"></div>

  <!-- 1. Active Theory Circular Aperture Portal Loader -->
  <div id="at-loader">
    <div class="at-portal-wrapper">
      <div class="at-portal-ring"></div>
      
      <svg class="at-filaments" viewBox="0 0 400 400" fill="none">
        <path d="M200 40 C 230 110, 260 130, 200 200 C 140 270, 170 290, 200 360" stroke="rgba(0, 240, 255, 0.45)" stroke-width="1.5" />
        <path d="M40 200 C 110 230, 130 260, 200 200 C 270 140, 290 170, 360 200" stroke="rgba(255, 184, 0, 0.45)" stroke-width="1.5" />
        <path d="M87 87 C 150 140, 160 170, 200 200 C 240 230, 250 260, 313 313" stroke="rgba(0, 240, 255, 0.35)" stroke-width="1.2" />
        <path d="M313 87 C 260 150, 230 160, 200 200 C 170 240, 140 250, 87 313" stroke="rgba(255, 184, 0, 0.35)" stroke-width="1.2" />
      </svg>

      <div class="at-portal-core">
        <div class="at-loader-pct" id="at-counter">// 00 //</div>
        <div class="at-loader-sub">INITIALISING</div>
      </div>
    </div>
    <div class="at-enter-prompt">CLICK OR WAIT TO ENTER 3D SPACE</div>
  </div>

  <!-- 2. UI Chrome (Active Theory HUD Layer) -->
  <div class="at-hud-layer">

    <!-- Top Bar Navigation -->
    <header class="at-top-bar">
      <a href="../index.html" class="at-logo-group" title="Return to NAIGC Core Hub">
        <div class="at-logo-brand">
          <img src="../build/assets/logo-XvVq9OjC.png" alt="NAIGC Logo" class="at-logo-img">
          <span class="at-logo-title">NAIGC</span>
        </div>
        <span class="at-logo-sub">3°09'N 101°42'E &bull; ${p.tag}</span>
      </a>

      <div>
        <nav class="at-menu-capsule">
          <a href="#${p.shortName.toLowerCase()}" class="at-menu-item is-active">${p.shortName}</a>
          <svg class="at-sine-glyph" viewBox="0 0 30 10">
            <path d="M1 5 Q 8 -2, 15 5 T 29 5" />
          </svg>
          <a href="../index.html" class="at-menu-item">CORE HUB</a>
        </nav>

        <div class="at-sub-pill-nav">
          <a href="${p.prev.file}" class="at-sub-pill">&laquo; ${p.prev.name}</a>
          <a href="${p.next.file}" class="at-sub-pill">${p.next.name} &raquo;</a>
        </div>
      </div>
    </header>

    <!-- 3. Left Floating Interactive Console -->
    <div class="at-left-console">
      <div class="at-console-header">WHAT ARE YOU LOOKING FOR?</div>
      <ul class="at-console-menu">
        ${p.modules.map((m, idx) => `
        <li><button class="at-console-btn ${idx === 0 ? 'is-active' : ''}" data-index="${idx}">${m.glitch}</button></li>
        `).join('')}
        <li><button class="at-console-btn at-btn-roadmap" data-index="6">&#9733; STRATEGIC ROADMAP</button></li>
      </ul>

      <button class="at-ask-capsule" id="at-btn-ask">
        <span>ASK ME ANYTHING...</span>
      </button>
    </div>

    <!-- 4. Center Bottom Controls: Dial Pagination & Pillar Mini-Dock -->
    <div class="at-bottom-center-group">
      <!-- Dial Pagination -->
      <div class="at-carousel-dial-bar">
        <span class="at-dial-indicator" id="at-dial-counter">// 01 / 07 //</span>
        <div class="at-dial-dots" id="at-dial-dots">
          ${allModules.map((_, dIdx) => `
          <span class="at-dial-dot ${dIdx === 0 ? 'is-active' : ''}" data-index="${dIdx}" title="Jump to Module ${dIdx + 1}"></span>
          `).join('')}
        </div>
      </div>

      <!-- Floating Pillar Mini-Dock (01 to 08) -->
      <nav class="at-pillar-dock" aria-label="Ecosystem Pillar Dock">
        ${allPillarsList.map(item => `
        <a href="${item.slug}" class="at-dock-node ${item.num === p.num ? 'is-current' : ''}" data-tooltip="${item.num}. ${item.name}">
          ${item.num}
        </a>
        `).join('')}
      </nav>
    </div>

    <!-- 5. Bottom Right Status & Audio Equalizer -->
    <div class="at-bottom-right">
      <span>SYS//ONLINE &bull; 60FPS</span>
      <button class="at-audio-btn" id="at-audio-toggle">
        <div class="at-equalizer">
          <span class="at-eq-bar"></span>
          <span class="at-eq-bar"></span>
          <span class="at-eq-bar"></span>
          <span class="at-eq-bar"></span>
        </div>
        <span id="at-audio-text">SOUND ON</span>
      </button>
    </div>

  </div>

  <!-- 6. 3D Floating Cards Carousel Stage with Directional Entrance (Left for 1-4, Right for 5-8) -->
  <div id="at-carousel-stage" class="${isLeftWing ? 'at-stage-enter-left' : 'at-stage-enter-right'} at-stage-ready">
    <div class="at-card-track" id="at-track">
      <!-- Generated by JavaScript with 3D Matrix Coordinates -->
    </div>
  </div>

  <!-- 7. Slide-Over Detail Drawer Modal (Enhanced Cinematic) -->
  <div id="at-drawer-backdrop"></div>
  <aside id="at-drawer" aria-hidden="true">
    <button class="at-drawer-close" id="at-drawer-close">&times;</button>
    <div>
      <div class="at-drawer-status-pill">
        <span class="at-status-pulse"></span>
        <span id="drawer-status-text">${p.statusBadge}</span>
      </div>
      <div class="at-drawer-tag" id="drawer-tag">${p.tag} &bull; MODULE SPECIFICATION</div>
      <h2 class="at-drawer-title" id="drawer-title">MODULE TITLE</h2>
      <p class="at-drawer-body" id="drawer-desc">Module description text goes here.</p>

      <!-- Key Metrics Stat Strip -->
      <div class="at-drawer-metrics-grid" id="drawer-metrics-grid">
        <!-- Populated dynamically -->
      </div>

      <div class="at-drawer-syllabus">
        <h4>CURRICULUM BREAKDOWN & CORE CAPABILITIES</h4>
        <ul class="at-syllabus-list" id="drawer-syllabus">
          <!-- Populated dynamically -->
        </ul>
      </div>
    </div>

    <div class="at-drawer-cta-group">
      <button class="at-btn-cta" id="drawer-enroll-btn">COMMENCE &bull; REGISTER ENQUIRY</button>
      <a href="https://wa.me/60123456789?text=Hello%20NAIGC,%20I%20would%20like%20to%20enquire%20about%20Pillar%20${p.num}%20(${encodeURIComponent(p.title)})" target="_blank" class="at-btn-whatsapp" id="drawer-whatsapp-btn">
        <span>&#128172; DIRECT WHATSAPP CONSULTATION</span>
      </a>
      <button class="at-btn-select" id="drawer-lightbox-btn" style="text-align: center; display: none;">&#128065; VIEW HIGH-RES STRATEGIC BLUEPRINT</button>
      <a href="../index.html" class="at-btn-select" style="text-align: center; text-decoration: none;">&larr; RETURN TO CORE STAGE</a>
    </div>
  </aside>

  <!-- 8. Full-Screen Lightbox Modal for Roadmap -->
  <div id="at-lightbox" aria-hidden="true">
    <button class="at-lightbox-close" id="at-lightbox-close">&times;</button>
    <div class="at-lightbox-content">
      <div class="at-lightbox-header">
        <span class="at-lightbox-tag">NAIGC STRATEGIC ROADMAP // PILLAR ${p.num}: ${p.title}</span>
        <span class="at-lightbox-title">OFFICIAL NATIONAL ARCHITECTURE BLUEPRINT</span>
      </div>
      <div class="at-lightbox-img-wrapper">
        <img src="${p.image}" alt="NAIGC Pillar ${p.num} ${p.title} Strategic Roadmap" class="at-lightbox-img" id="at-lightbox-image">
      </div>
      <div class="at-lightbox-footer">
        <span>CLICK OUTSIDE OR PRESS ESC TO RETURN TO 3D SPACE</span>
        <a href="${p.image}" download="NAIGC_Pillar_${p.num}_Strategic_Roadmap.png" class="at-btn-download">DOWNLOAD FULL-RES PNG &darr;</a>
      </div>
    </div>
  </div>

  <!-- Interactive Search Dialog -->
  <div id="at-search-dialog">
    <div class="at-search-box">
      <input type="text" class="at-search-input" id="at-search-field" placeholder="Search capability, module, or technology (e.g. ${p.searchTags[0]})..." autofocus>
      <div class="at-search-hints">
        Suggested queries: 
        ${p.searchTags.map(tag => `<span data-search="${tag}">#${tag}</span>`).join(', ')}
      </div>
    </div>
  </div>

  <!-- Three.js Library -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>

  <script>
    /**
     * ACTIVE THEORY EXPERIENTIAL CORE ENGINE
     * Pillar: ${p.title}
     */

    // --- 1. Sound Synthesis Engine (Web Audio API) ---
    class ATSoundEngine {
      constructor() {
        this.ctx = null;
        this.enabled = true;
      }
      init() {
        if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
          this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
      }
      playHover() {
        if (!this.enabled || !this.ctx) return;
        try {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(880, this.ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(1320, this.ctx.currentTime + 0.05);
          gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start();
          osc.stop(this.ctx.currentTime + 0.05);
        } catch(e) {}
      }
      playSlide() {
        if (!this.enabled || !this.ctx) return;
        try {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(240, this.ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.12);
          gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start();
          osc.stop(this.ctx.currentTime + 0.12);
        } catch(e) {}
      }
      playChime() {
        if (!this.enabled || !this.ctx) return;
        try {
          [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime + i * 0.06);
            gain.gain.setValueAtTime(0.06, this.ctx.currentTime + i * 0.06);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + i * 0.06 + 0.4);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(this.ctx.currentTime + i * 0.06);
            osc.stop(this.ctx.currentTime + i * 0.06 + 0.45);
          });
        } catch(e) {}
      }
    }
    const sound = new ATSoundEngine();

    const audioBtn = document.getElementById('at-audio-toggle');
    const audioText = document.getElementById('at-audio-text');
    audioBtn.addEventListener('click', () => {
      sound.init();
      sound.enabled = !sound.enabled;
      audioText.innerText = sound.enabled ? 'SOUND ON' : 'MUTED';
      audioBtn.classList.toggle('is-muted', !sound.enabled);
    });

    // --- 2. Loader Sequencing ---
    let progress = 0;
    const counterEl = document.getElementById('at-counter');
    const loaderEl = document.getElementById('at-loader');
    const isEmbedded = window.self !== window.top || window.location.search.includes('seamless=1');

    if (isEmbedded) {
      if (loaderEl) {
        loaderEl.style.display = 'none';
        loaderEl.classList.add('is-loaded');
      }
      const initialCurtain = document.getElementById('at-transition-curtain');
      if (initialCurtain) {
        initialCurtain.style.display = 'none';
      }
      const stage = document.getElementById('at-carousel-stage');
      if (stage) {
        stage.classList.add('at-stage-ready');
      }
    } else {
      const loaderInterval = setInterval(() => {
        progress += Math.floor(Math.random() * 8) + 4;
        if (progress > 100) progress = 100;
        counterEl.innerText = \`// \${progress < 10 ? '0' + progress : progress} //\`;

        if (progress >= 100) {
          clearInterval(loaderInterval);
          setTimeout(dismissLoader, 350);
        }
      }, 45);

      loaderEl.addEventListener('click', () => {
        sound.init();
        dismissLoader();
      });
    }

    function dismissLoader() {
      sound.init();
      sound.playChime();
      loaderEl.classList.add('is-loaded');
      const stage = document.getElementById('at-carousel-stage');
      if (stage && !stage.classList.contains('at-stage-ready')) {
        stage.classList.add('at-stage-ready');
        stage.classList.add(isCurrentLeft ? 'at-stage-enter-left' : 'at-stage-enter-right');
      }
    }

    // --- 3. Modules Data Set ---
    const modulesData = ${modulesJson};

    // --- 4. 3D Carousel Matrix Positioning Engine with Gyro Tilt ---
    const track = document.getElementById('at-track');
    let currentAngle = 0;
    let targetAngle = 0;
    let isDragging = false;
    let startX = 0;
    let lastDragTime = 0;
    let dragVelocity = 0;

    const RADIUS = 760;
    const N = modulesData.length;
    const angleStep = (Math.PI * 2) / N;

    // Render Cards
    modulesData.forEach((mod, i) => {
      const card = document.createElement('div');
      card.className = 'at-card';
      card.dataset.index = i;

      let visualHeaderHtml = '';
      if (mod.isRoadmap) {
        visualHeaderHtml = \`
          <div class="at-card-visual-header">
            <span class="at-roadmap-badge">&#9733; OFFICIAL ROADMAP</span>
            <div class="at-card-radar-sweep"></div>
            <img src="\${mod.image}" alt="Strategic Roadmap Blueprint" class="at-card-roadmap-thumb">
          </div>
        \`;
      } else {
        visualHeaderHtml = \`
          <div class="at-card-visual-header">
            <div class="at-card-visual-mesh"></div>
            <div class="at-card-radar-sweep"></div>
            <div class="at-card-visual-gradient" style="background: \${mod.gradient};"></div>
            <div class="at-card-visual-icon">
              \${mod.iconSvg}
            </div>
          </div>
        \`;
      }

      const buttonLabel = mod.isRoadmap ? 'VIEW OFFICIAL BLUEPRINT &rarr;' : 'EXPLORE DETAILS &rarr;';

      card.innerHTML = \`
        <div class="at-card-sheen"></div>
        <div>
          \${visualHeaderHtml}
          <div class="at-card-tag">\${mod.tag}</div>
          <div class="at-glitch-title" data-text="\${mod.glitch}">\${mod.title}</div>
          <p class="at-card-desc">\${mod.desc}</p>
        </div>

        <div>
          <ul class="at-card-meta-list">
            \${Object.entries(mod.metrics).map(([k, v]) => \`
              <li class="at-card-meta-item">
                <span class="at-meta-k">\${k}</span>
                <span class="at-meta-v">\${v}</span>
              </li>
            \`).join('')}
          </ul>

          <button class="at-btn-select" data-open="\${i}">
            <span>\${buttonLabel}</span>
          </button>
        </div>
      \`;

      // 3D Gyro Tilt & Specular Sheen Listener
      card.addEventListener('pointermove', (e) => {
        const rect = card.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', \`\${(mouseX / rect.width) * 100}%\`);
        card.style.setProperty('--mouse-y', \`\${(mouseY / rect.height) * 100}%\`);

        const tiltX = -((mouseY - rect.height / 2) / (rect.height / 2)) * 6;
        const tiltY = ((mouseX - rect.width / 2) / (rect.width / 2)) * 6;
        card.dataset.tiltX = tiltX.toFixed(2);
        card.dataset.tiltY = tiltY.toFixed(2);
      });

      card.addEventListener('pointerleave', () => {
        card.dataset.tiltX = '0';
        card.dataset.tiltY = '0';
      });

      card.addEventListener('mouseenter', () => sound.playHover());
      card.addEventListener('click', () => {
        if (mod.isRoadmap) {
          openLightbox();
        } else {
          openDrawer(i);
        }
      });

      track.appendChild(card);
    });

    const cards = Array.from(document.querySelectorAll('.at-card'));
    const dialCounter = document.getElementById('at-dial-counter');
    const dialDots = Array.from(document.querySelectorAll('.at-dial-dot'));

    function updateCarousel() {
      currentAngle += (targetAngle - currentAngle) * 0.12;

      let centerIdx = 0;
      let maxCos = -2;

      cards.forEach((card, i) => {
        const phi = currentAngle + i * angleStep;
        const cosPhi = Math.cos(phi);

        // Backface occlusion
        if (cosPhi < -0.05) {
          card.style.opacity = '0';
          card.style.pointerEvents = 'none';
          card.style.visibility = 'hidden';
          return;
        }

        card.style.visibility = 'visible';
        card.style.pointerEvents = 'auto';

        const x = Math.sin(phi) * RADIUS;
        const z = cosPhi * RADIUS - RADIUS;
        const rotY = phi * (180 / Math.PI);

        const tiltX = parseFloat(card.dataset.tiltX || '0');
        const tiltY = parseFloat(card.dataset.tiltY || '0');

        const depthNorm = (z + RADIUS * 2) / (RADIUS * 2);
        const opacity = Math.max(0.2, Math.min(1, cosPhi * 0.8 + 0.3));
        const scale = Math.max(0.78, Math.min(1.06, cosPhi * 0.28 + 0.78));

        card.style.transform = \`translate3d(\${x.toFixed(2)}px, 0px, \${z.toFixed(2)}px) rotateY(\${(rotY + tiltY).toFixed(2)}deg) rotateX(\${tiltX.toFixed(2)}deg) scale(\${scale.toFixed(3)})\`;
        card.style.opacity = opacity.toFixed(2);
        card.style.zIndex = Math.round(depthNorm * 100);

        if (cosPhi > maxCos) {
          maxCos = cosPhi;
          centerIdx = i;
        }

        if (cosPhi > 0.88) {
          card.classList.add('is-center');
          document.querySelectorAll('.at-console-btn').forEach((btn, bIdx) => {
            btn.classList.toggle('is-active', bIdx === i);
          });
        } else {
          card.classList.remove('is-center');
        }
      });

      // Update Dial Counter and Pagination Dots
      dialCounter.innerText = \`// 0\${centerIdx + 1} / 0\${N} //\`;
      dialDots.forEach((dot, dIdx) => {
        dot.classList.toggle('is-active', dIdx === centerIdx);
      });
    }

    // Dial Dots Navigation Click
    dialDots.forEach(dot => {
      dot.addEventListener('click', () => {
        const idx = parseInt(dot.dataset.index, 10);
        targetAngle = -idx * angleStep;
        sound.playSlide();
      });
    });

    // Touch & Drag Physics
    window.addEventListener('pointerdown', (e) => {
      if (e.target.closest('#at-drawer') || e.target.closest('#at-lightbox') || e.target.closest('.at-top-bar') || e.target.closest('.at-left-console') || e.target.closest('.at-bottom-center-group')) return;
      isDragging = true;
      startX = e.clientX;
      lastDragTime = performance.now();
      dragVelocity = 0;
    });

    window.addEventListener('pointermove', (e) => {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      startX = e.clientX;
      const deltaRad = (dx / window.innerWidth) * Math.PI * 1.5;
      targetAngle += deltaRad;
      dragVelocity = deltaRad;
    });

    window.addEventListener('pointerup', () => {
      if (!isDragging) return;
      isDragging = false;
      targetAngle += dragVelocity * 6;
      sound.playSlide();
    });

    window.addEventListener('wheel', (e) => {
      if (document.getElementById('at-drawer').classList.contains('is-open')) return;
      if (document.getElementById('at-lightbox').classList.contains('is-open')) return;
      const delta = Math.sign(e.deltaY || e.deltaX);
      targetAngle -= delta * angleStep;
      sound.playSlide();
    }, { passive: true });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        targetAngle -= angleStep;
        sound.playSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        targetAngle += angleStep;
        sound.playSlide();
      } else if (e.key === 'Escape') {
        closeDrawer();
        closeLightbox();
        closeSearch();
      }
    });

    // Left Console Buttons
    document.querySelectorAll('.at-console-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        sound.init();
        sound.playSlide();
        const idx = parseInt(btn.dataset.index, 10);
        targetAngle = -idx * angleStep;
        if (modulesData[idx].isRoadmap) {
          setTimeout(openLightbox, 400);
        }
      });
    });

    // --- 5. Slide-Over Detail Drawer ---
    const drawer = document.getElementById('at-drawer');
    const drawerBackdrop = document.getElementById('at-drawer-backdrop');
    const drawerClose = document.getElementById('at-drawer-close');
    const drawerTag = document.getElementById('drawer-tag');
    const drawerTitle = document.getElementById('drawer-title');
    const drawerDesc = document.getElementById('drawer-desc');
    const drawerMetricsGrid = document.getElementById('drawer-metrics-grid');
    const drawerSyllabus = document.getElementById('drawer-syllabus');
    const drawerLightboxBtn = document.getElementById('drawer-lightbox-btn');
    const drawerWhatsappBtn = document.getElementById('drawer-whatsapp-btn');

    function openDrawer(index) {
      sound.init();
      sound.playChime();
      const mod = modulesData[index];
      drawerTag.innerHTML = \`\${mod.tag} &bull; NATIONAL STANDARD\`;
      drawerTitle.innerText = mod.title;
      drawerDesc.innerText = mod.desc;

      // Populate Metrics Grid
      drawerMetricsGrid.innerHTML = Object.entries(mod.metrics).map(([k, v]) => \`
        <div class="at-metric-tile">
          <span class="at-metric-label">\${k}</span>
          <span class="at-metric-value">\${v}</span>
        </div>
      \`).join('');

      drawerSyllabus.innerHTML = mod.syllabus.map(item => \`
        <li class="at-syllabus-item">\${item}</li>
      \`).join('');

      // WhatsApp Button dynamic text
      const waMsg = encodeURIComponent(\`Hello NAIGC, I would like to enquire about Pillar ${p.num} (${p.title}) - Module: \${mod.title}\`);
      drawerWhatsappBtn.href = \`https://wa.me/60123456789?text=\${waMsg}\`;

      if (mod.isRoadmap) {
        drawerLightboxBtn.style.display = 'block';
        drawerLightboxBtn.onclick = () => {
          closeDrawer();
          openLightbox();
        };
      } else {
        drawerLightboxBtn.style.display = 'none';
      }

      drawer.classList.add('is-open');
      drawerBackdrop.classList.add('is-active');
    }

    function closeDrawer() {
      drawer.classList.remove('is-open');
      drawerBackdrop.classList.remove('is-active');
    }

    drawerClose.addEventListener('click', closeDrawer);
    drawerBackdrop.addEventListener('click', closeDrawer);

    document.getElementById('drawer-enroll-btn').addEventListener('click', () => {
      alert('Your enquiry has been successfully registered with NAIGC Operations. An advisor will contact you within 24 hours.');
      closeDrawer();
    });

    // --- 6. Full-Screen Lightbox ---
    const lightbox = document.getElementById('at-lightbox');
    const lightboxClose = document.getElementById('at-lightbox-close');

    function openLightbox() {
      sound.init();
      sound.playChime();
      lightbox.classList.add('is-open');
    }

    function closeLightbox() {
      lightbox.classList.remove('is-open');
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    // Search Dialog
    const searchBtn = document.getElementById('at-btn-ask');
    const searchDialog = document.getElementById('at-search-dialog');
    const searchInput = document.getElementById('at-search-field');

    searchBtn.addEventListener('click', () => {
      searchDialog.classList.add('is-active');
      searchInput.value = '';
      searchInput.focus();
    });

    searchDialog.addEventListener('click', (e) => {
      if (e.target === searchDialog) closeSearch();
    });

    function closeSearch() {
      searchDialog.classList.remove('is-active');
    }

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const q = searchInput.value.toLowerCase().trim();
        const found = modulesData.findIndex(m => m.title.toLowerCase().includes(q) || m.desc.toLowerCase().includes(q));
        if (found !== -1) {
          targetAngle = -found * angleStep;
          closeSearch();
          if (modulesData[found].isRoadmap) {
            setTimeout(openLightbox, 400);
          } else {
            setTimeout(() => openDrawer(found), 400);
          }
        } else {
          closeSearch();
        }
      }
    });

    document.querySelectorAll('.at-search-hints span').forEach(tag => {
      tag.addEventListener('click', () => {
        searchInput.value = tag.dataset.search;
        searchInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      });
    });

    // --- 6. Spatial Directional Transition Orchestration (Left for 1-4, Right for 5-8) ---
    const currentPillarNum = ${pillarNum};
    const isCurrentLeft = ${isLeftWing ? 'true' : 'false'};
    const curtain = document.getElementById('at-transition-curtain');
    const stage = document.getElementById('at-carousel-stage');

    // Dismiss curtain reveal animation after page entrance
    setTimeout(() => {
      if (curtain) {
        curtain.classList.remove('at-curtain-active');
      }
    }, 550);

    function navigateWithDirection(targetUrl, direction, label) {
      sound.init();
      sound.playSlide();

      if (curtain) {
        const hudTag = curtain.querySelector('.at-curtain-hud-tag');
        const hudTitle = curtain.querySelector('.at-curtain-hud-title');
        const hudWing = curtain.querySelector('.at-curtain-hud-wing');
        if (hudTag) hudTag.innerText = '// WARPING SPATIAL FIELD //';
        if (hudTitle) hudTitle.innerText = label || 'CENTRAL ECOSYSTEM HUB';
        if (hudWing) hudWing.innerText = direction === 'left' ? 'EXITING VIA ALPHA-WEST CORRIDOR' : 'EXITING VIA BETA-EAST CORRIDOR';

        curtain.className = direction === 'left' ? 'at-curtain-active exit-to-left' : 'at-curtain-active exit-to-right';
      }

      if (stage) {
        stage.classList.remove('at-stage-enter-left', 'at-stage-enter-right');
        stage.classList.add(direction === 'left' ? 'at-stage-exit-left' : 'at-stage-exit-right');
      }

      setTimeout(() => {
        window.location.href = targetUrl;
      }, 420);
    }

    // Intercept Return to Homepage (Core Hub)
    document.querySelectorAll('a[href*="index.html"]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        if (isEmbedded) {
          window.parent.postMessage({
            type: 'NAIGC_CLOSE_PILLAR',
            direction: isCurrentLeft ? 'left' : 'right'
          }, '*');
        } else {
          const dir = isCurrentLeft ? 'left' : 'right';
          navigateWithDirection('../index.html?return=' + dir, dir, 'CENTRAL CORE HUB');
        }
      });
    });

    // Intercept Pillar Mini-Dock & Sub-Pill Navigation
    document.querySelectorAll('.at-dock-node, .at-sub-pill').forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (!href || href.startsWith('#') || href.includes('index.html')) return;

        let targetNum = null;
        if (link.dataset.tooltip) {
          const m = link.dataset.tooltip.match(/^(\d+)/);
          if (m) targetNum = parseInt(m[1], 10);
        } else if (link.innerText) {
          const m = link.innerText.match(/(\d+)/);
          if (m) targetNum = parseInt(m[1], 10);
        }

        if (targetNum && targetNum !== currentPillarNum) {
          e.preventDefault();
          const dir = targetNum < currentPillarNum ? 'left' : 'right';
          if (isEmbedded) {
            window.parent.postMessage({
              type: 'NAIGC_SWITCH_PILLAR',
              num: targetNum,
              url: href,
              direction: dir
            }, '*');
          } else {
            const label = link.dataset.tooltip || ('PILLAR 0' + targetNum);
            navigateWithDirection(href, dir, label);
          }
        }
      });
    });

    // --- 7. Three.js Ambient Particle Space & Interactive Liquid Mesh Wave ---
    let scene, camera, renderer, particles, meshPlane;
    const canvas = document.getElementById('at-canvas');

    function initThree() {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000);
      camera.position.z = 400;

      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

      // Cosmic Particles
      const particleCount = 700;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);

      const colorCyan = new THREE.Color(0x00F0FF);
      const colorGold = new THREE.Color(0xFFB800);
      const colorWhite = new THREE.Color(0xFFFFFF);

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 1600;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 1200;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 1400;

        const pickColor = Math.random() < 0.6 ? colorCyan : (Math.random() < 0.85 ? colorGold : colorWhite);
        colors[i * 3] = pickColor.r;
        colors[i * 3 + 1] = pickColor.g;
        colors[i * 3 + 2] = pickColor.b;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const particleMaterial = new THREE.PointsMaterial({
        size: 3.5,
        vertexColors: true,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending
      });

      particles = new THREE.Points(geometry, particleMaterial);
      scene.add(particles);

      // Active Theory Signature Interactive Liquid Mesh Wave Plane
      const planeGeo = new THREE.PlaneGeometry(1600, 1100, 48, 36);
      const planeMat = new THREE.MeshBasicMaterial({
        color: 0x00F0FF,
        wireframe: true,
        transparent: true,
        opacity: 0.045,
        blending: THREE.AdditiveBlending
      });
      meshPlane = new THREE.Mesh(planeGeo, planeMat);
      meshPlane.position.z = -350;
      scene.add(meshPlane);

      window.addEventListener('resize', onWindowResize, { passive: true });
    }

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    let mouseX = 0, mouseY = 0;
    window.addEventListener('pointermove', (e) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.05;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.05;
    }, { passive: true });

    let clock = 0;
    function animate() {
      requestAnimationFrame(animate);
      clock += 0.015;

      if (particles) {
        particles.rotation.y += 0.0006;
        particles.rotation.x += 0.0003;
      }

      // Deform Liquid Mesh Wave
      if (meshPlane && meshPlane.geometry && meshPlane.geometry.attributes && meshPlane.geometry.attributes.position) {
        const posAttr = meshPlane.geometry.attributes.position;
        const arr = posAttr.array;
        for (let i = 0; i < arr.length; i += 3) {
          const u = arr[i];
          const v = arr[i + 1];
          arr[i + 2] = Math.sin(u * 0.006 + clock) * Math.cos(v * 0.006 + clock * 0.8) * 38;
        }
        posAttr.needsUpdate = true;
      }

      camera.position.x += (mouseX - camera.position.x) * 0.05;
      camera.position.y += (-mouseY - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      updateCarousel();
    }

    window.addEventListener('DOMContentLoaded', () => {
      initThree();
      animate();
    });
  </script>

</body>
</html>`;
}

// Generate all 8 pages into /Applications/XAMPP/xamppfiles/htdocs/naigc/pillars
const targetDir = path.join(__dirname, '../pillars');
pillarsData.forEach(p => {
  const filePath = path.join(targetDir, p.slug);
  const html = buildActiveTheoryHTML(p);
  fs.writeFileSync(filePath, html, 'utf-8');
  console.log(`Successfully generated Enhanced Active Theory page: ${p.slug} (${p.title})`);
});

console.log('All 8 Enhanced Active Theory pillar pages generated successfully in English!');
