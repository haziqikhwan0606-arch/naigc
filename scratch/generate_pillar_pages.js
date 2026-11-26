const fs = require('fs');
const path = require('path');

const pillars = [
  {
    num: '01',
    slug: 'academy.html',
    title: 'AI ACADEMY',
    theme: 'cyan',
    tag: 'SYS//NODE.01',
    subtitle: 'The AI learning and talent development hub to build knowledge, skills and professional expertise for individuals, businesses and industries.',
    purpose: 'To develop AI knowledge, skills and practical capabilities among individuals, professionals, businesses and organisations across Malaysia.',
    targetMarket: [
      'Students and fresh graduates preparing for AI careers',
      'Working professionals seeking AI upskilling and reskilling',
      'SMEs and corporations adopting AI tools and workflows',
      'Government and public sector officers and leaders',
      'Trainers, educators and academic faculty members'
    ],
    keyActivities: [
      { title: 'AI Training & Learning', desc: 'Comprehensive structured curriculum from foundations to advanced AI models and deployment.' },
      { title: 'Professional Certification', desc: 'Accredited micro-credentials verifying competency in machine learning and generative AI.' },
      { title: 'Corporate Training Contracts', desc: 'Custom enterprise workshops tailored to specific industry operational needs.' },
      { title: 'Train-the-Trainer (TTT)', desc: 'Developing a certified nationwide cohort of qualified AI instructors and mentors.' },
      { title: 'Industry-Specific AI Courses', desc: 'Applied training in education, media, fintech, manufacturing and healthcare.' }
    ],
    services: [
      'AI Literacy & Foundation Courses for Non-Technical Leaders',
      'Professional & Technical AI Engineering Bootcamps',
      'Industry-Specific AI Application Training (Media, Logistics, Retail)',
      'Accredited Micro-Credentials & Competency Assessments',
      'Customised Enterprise In-House AI Workshops',
      'Certified Trainer Development & Accreditation Framework'
    ],
    revenue: [
      { icon: '🎓', title: 'Training & Course Fees' },
      { icon: '🏢', title: 'Corporate Training Contracts' },
      { icon: '📜', title: 'Certification & Licensing' },
      { icon: '🏛️', title: 'Institutional & Govt Grants' }
    ],
    image: 'assets/pillar_01_academy.png',
    prev: { num: '08', name: 'AI Future Technology', file: 'future-technology.html' },
    next: { num: '02', name: 'AI Creative Studio', file: 'creative-studio.html' }
  },
  {
    num: '02',
    slug: 'creative-studio.html',
    title: 'AI CREATIVE STUDIO',
    theme: 'gold',
    tag: 'SYS//NODE.02',
    subtitle: 'A next-generation media and content production hub that combines AI technology and creative expertise to produce high-quality, cost-effective and scalable digital content.',
    purpose: 'To create professional, impactful and AI-driven media content for education, business, branding, marketing, cultural archiving and global communication.',
    targetMarket: [
      'Businesses, brands and SMEs requiring cost-effective media',
      'Educational institutions and digital course creators',
      'Government agencies and public communications units',
      'Event organisers, broadcasters and virtual media productions',
      'Independent digital creators, artists and marketing agencies'
    ],
    keyActivities: [
      { title: 'AI Video Production', desc: 'High-speed generative video rendering, AI synthetic avatars, and cinematic corporate showcases.' },
      { title: 'Generative Media Assets', desc: 'Voice synthesis, script generation, photorealistic image creation, and multi-lingual dubbing.' },
      { title: 'Virtual Production Studio', desc: 'Green screen, real-time virtual backdrops, and interactive 3D digital sets.' },
      { title: 'Live Streaming & Virtual Events', desc: 'Broadcast-grade AI live streams, virtual conferences, and interactive webinars.' },
      { title: 'Repackaging & Localisation', desc: 'Translating and cultural adaptation of digital media for regional and global distribution.' }
    ],
    services: [
      'End-to-End AI Video Production (Corporate, Promotional, Educational)',
      'AI-Generated Multimodal Content (Audio Dubbing, Visuals, Subtitles)',
      'Virtual Studio, Green Screen & Real-time Backdrop Rental',
      'Hybrid & Virtual Event Production with AI Broadcast Tech',
      'Brand Identity Post-Production & Digital Asset Refinement',
      'Specialised Training on Generative AI Creative Toolchains'
    ],
    revenue: [
      { icon: '🎬', title: 'Video & Media Production' },
      { icon: '📡', title: 'Live Streaming & Event Services' },
      { icon: '💡', title: 'Branding & Commercial Content' },
      { icon: '🎥', title: 'Studio Rental & Tech Packages' }
    ],
    image: 'assets/pillar_02_creative_studio.png',
    prev: { num: '01', name: 'AI Academy', file: 'academy.html' },
    next: { num: '03', name: 'AI Workforce & Talent', file: 'workforce-talent.html' }
  },
  {
    num: '03',
    slug: 'workforce-talent.html',
    title: 'AI WORKFORCE & TALENT',
    theme: 'cyan',
    tag: 'SYS//NODE.03',
    subtitle: 'A talent development and placement ecosystem to build, upskill and connect AI talent for industry, business and future jobs.',
    purpose: 'To develop an AI-ready Malaysian workforce, enhance professional capabilities, and connect qualified talent to high-value industry opportunities.',
    targetMarket: [
      'Students and fresh graduates entering modern tech sectors',
      'Mid-career professionals transitioning into AI engineering & data',
      'SMEs and corporations expanding their digital headcount',
      'Public sector agencies building internal technical capabilities',
      'Recruitment firms, industry talent seekers and multinational employers'
    ],
    keyActivities: [
      { title: 'Skills Training & Upskilling', desc: 'Hands-on practical training aligned with actual technical stacks used in industry.' },
      { title: 'Talent Matching & Placement', desc: 'Direct matchmaking between vetted AI practitioners and hiring enterprises.' },
      { title: 'Workforce Transformation', desc: 'Helping companies restructure legacy departments into AI-enabled operational teams.' },
      { title: 'Competency Assessments', desc: 'Standardised testing benchmarks to validate technical skills and operational readiness.' },
      { title: 'Industry Apprenticeships', desc: 'Structured internship placements and mentorship within leading technology partners.' }
    ],
    services: [
      'Role-Based AI Certification Pathways (Data Analyst, Prompt Engineer, AI Architect)',
      'Enterprise Talent Placement & Direct Headhunting Services',
      'Corporate Workforce Reskilling & Organisational Change Management',
      'High-Impact Industry Apprenticeship & Internship Programmes',
      'Standardised National AI Competency Benchmarking Framework',
      'Continuous Professional Development & Industry Mentorship Networks'
    ],
    revenue: [
      { icon: '👥', title: 'Talent Placement Services' },
      { icon: '📑', title: 'Certification & Assessment Fees' },
      { icon: '🔄', title: 'Corporate Reskilling Programmes' },
      { icon: '🤝', title: 'Employer Partnership Subscriptions' }
    ],
    image: 'assets/pillar_03_workforce_talent.png',
    prev: { num: '02', name: 'AI Creative Studio', file: 'creative-studio.html' },
    next: { num: '04', name: 'AI Business Solutions', file: 'business-solutions.html' }
  },
  {
    num: '04',
    slug: 'business-solutions.html',
    title: 'AI BUSINESS SOLUTIONS',
    theme: 'gold',
    tag: 'SYS//NODE.04',
    subtitle: 'Practical and industry-focused AI solutions to help businesses improve productivity, automate operations and create new value.',
    purpose: 'To enable businesses, especially SMEs, to adopt and apply pragmatic AI solutions that increase operational efficiency, reduce overheads and unlock growth.',
    targetMarket: [
      'SMEs and high-growth micro-enterprises across Malaysia',
      'Mid-tier corporations and commercial retail/manufacturing players',
      'Chambers of commerce, business associations and cooperatives',
      'Government-linked commercial companies (GLCs)',
      'Traditional enterprises undergoing rapid digital modernisation'
    ],
    keyActivities: [
      { title: 'Process Automation', desc: 'Implementing intelligent robotic process automation (RPA) and AI workflow bots.' },
      { title: 'Custom AI Integration', desc: 'Embedding generative AI and machine learning models directly into existing ERP/CRM systems.' },
      { title: 'Productivity Optimisation', desc: 'Eliminating repetitive administrative back-office bottlenecks and manual data handling.' },
      { title: 'Advisory & Implementation', desc: 'End-to-end technical consulting from requirements analysis to live production deployment.' },
      { title: 'Ongoing Maintenance & Upgrades', desc: 'Managed cloud operations, security patching, and continuous model performance tuning.' }
    ],
    services: [
      'Turnkey & Customised Business Automation Workflows',
      'Intelligent Customer Service & Multilingual AI Voice/Chat Agents',
      'Predictive Business Intelligence & Executive Analytics Dashboards',
      'AI Document Processing & Automated Financial Extraction',
      'Comprehensive Solution Implementation & Legacy System Integration',
      'Post-Deployment Managed SLA Services & Continuous Model Training'
    ],
    revenue: [
      { icon: '💼', title: 'Solution Licensing & SaaS' },
      { icon: '⚙️', title: 'Implementation & Consulting Fees' },
      { icon: '🔄', title: 'Managed Services (Subscription)' },
      { icon: '🛠️', title: 'Maintenance & Upgrades (AMC)' }
    ],
    image: 'assets/pillar_04_business_solutions.png',
    prev: { num: '03', name: 'AI Workforce & Talent', file: 'workforce-talent.html' },
    next: { num: '05', name: 'AI Enterprise & Government Solutions', file: 'enterprise-government.html' }
  },
  {
    num: '05',
    slug: 'enterprise-government.html',
    title: 'AI ENTERPRISE & GOVT SOLUTIONS',
    theme: 'cyan',
    tag: 'SYS//NODE.05',
    subtitle: 'Large-scale, secure and high-impact AI solutions for government agencies, public sector organisations and enterprises to drive efficiency, service delivery and policy impact.',
    purpose: 'To deliver mission-critical, secure and high-value AI platforms that accelerate government transformation, elevate public service delivery and fortify sovereign data capabilities.',
    targetMarket: [
      'Federal ministries, statutory bodies and state government agencies',
      'Government-Linked Investment Companies (GLIC) & GLCs',
      'National public utilities, transport authorities and municipal councils',
      'Large multinational enterprise conglomerates and financial institutions',
      'Smart city developers and critical national infrastructure operators'
    ],
    keyActivities: [
      { title: 'Public Sector AI Deployment', desc: 'Transforming citizen-facing services through automated, accessible and transparent platforms.' },
      { title: 'Data Governance & Sovereign AI', desc: 'Strict compliance with national security, PDPA, and MyDIGITAL data residency standards.' },
      { title: 'Smart City & Urban Solutions', desc: 'Sensor-driven traffic management, automated urban planning, and environmental monitoring.' },
      { title: 'Policy & Impact Modeling', desc: 'Simulation engines supporting evidence-based policymaking and socio-economic planning.' },
      { title: 'Enterprise Scaling & Security', desc: 'Hardened on-premise and hybrid-cloud LLM infrastructure with strict role-based access control.' }
    ],
    services: [
      'Sovereign Large Language Models & Localised Language Translation',
      'Smart Government E-Services & Automated Citizen Inquiry Resolution',
      'Centralised Public Sector AI Data Platforms & Strategic Dashboards',
      'National Security & Compliance Audits (PDPA, CyberSecurity Act 2024)',
      'Enterprise Scaled Deployments & Multi-Agency Interoperability',
      'Long-Term Strategic Advisory & Digital Transformation Program Management'
    ],
    revenue: [
      { icon: '🏛️', title: 'Government Transformation Contracts' },
      { icon: '🏢', title: 'Large Enterprise Implementation' },
      { icon: '☁️', title: 'Sovereign Cloud & Managed SaaS' },
      { icon: '🛡️', title: 'Security & Compliance Auditing' }
    ],
    image: 'assets/pillar_05_enterprise_government.png',
    prev: { num: '04', name: 'AI Business Solutions', file: 'business-solutions.html' },
    next: { num: '06', name: 'AI Entrepreneurship & OPC', file: 'entrepreneurship-opc.html' }
  },
  {
    num: '06',
    slug: 'entrepreneurship-opc.html',
    title: 'AI ENTREPRENEURSHIP & OPC',
    theme: 'gold',
    tag: 'SYS//NODE.06',
    subtitle: 'An entrepreneurship ecosystem that empowers individuals, startups and one-person companies (OPC) to build, operate and grow AI-driven businesses.',
    purpose: 'To foster an inclusive, high-velocity entrepreneurship ecosystem enabling solo founders, OPCs, and early-stage startups to launch and scale AI-native businesses.',
    targetMarket: [
      'Aspiring solo entrepreneurs, solopreneurs and indie hackers',
      'Registered One-Person Companies (OPC) seeking automation',
      'Early-stage tech startups requiring compute and market access',
      'Traditional small traders converting to digital/e-commerce models',
      'Young innovators, tertiary students and university spin-offs'
    ],
    keyActivities: [
      { title: 'Startup Incubation & Acceleration', desc: 'Intensive cohort-based mentoring, product validation, and go-to-market scaling.' },
      { title: 'OPC Turnkey Infrastructure', desc: 'Providing full incorporation, company secretary, legal templates and automated bookkeeping.' },
      { title: 'Seed Funding Facilitation', desc: 'Connecting founders with venture funds, angel investors, TEKUN, and government grants.' },
      { title: 'Shared AI Compute & APIs', desc: 'Subsidised access to enterprise GPU clusters, LLM tokens, and developer sandboxes.' },
      { title: 'Commercial Market Linkages', desc: 'Pitch showcases bridging startup prototypes with corporate buyer procurement contracts.' }
    ],
    services: [
      'Complete One-Person Company (OPC) Setup, Secretarial & Accounting Packs',
      'AI-Powered Virtual Office & Flexible Co-Working Space Access',
      'Structured 12-Week AI Startup Incubation & Growth Programmes',
      'Commercialisation Advisory, Mentorship & Investor Pitch Preparation',
      'Assistance with Grant Applications (Cradle, MDEC, TEKUN Nasional)',
      'Shared Enterprise AI Tooling, APIs & Cloud Compute Subsidies'
    ],
    revenue: [
      { icon: '🚀', title: 'OPC Setup & Corporate Services' },
      { icon: '🏢', title: 'Co-Working & Office Facilities' },
      { icon: '📈', title: 'Incubation & Accelerator Fees' },
      { icon: '🤝', title: 'Venture Partnerships & Equity Grants' }
    ],
    image: 'assets/pillar_06_entrepreneurship_opc.png',
    prev: { num: '05', name: 'AI Enterprise & Government Solutions', file: 'enterprise-government.html' },
    next: { num: '07', name: 'AI Research & Innovation', file: 'research-innovation.html' }
  },
  {
    num: '07',
    slug: 'research-innovation.html',
    title: 'AI RESEARCH & INNOVATION',
    theme: 'cyan',
    tag: 'SYS//NODE.07',
    subtitle: 'A research and innovation ecosystem to develop next-generation AI solutions, localise technologies and drive high-impact applications for Malaysia’s priorities.',
    purpose: 'To advance frontier AI research, foster indigenous intellectual property, and translate groundbreaking academic discoveries into practical, high-value commercial solutions.',
    targetMarket: [
      'Public and private research universities and academic institutions',
      'Corporate R&D centers, industrial research labs and tech consortia',
      'National science, technology and innovation government bodies',
      'Deep-tech startups developing proprietary algorithms and patents',
      'Postgraduate researchers, computer scientists and applied AI PhDs'
    ],
    keyActivities: [
      { title: 'Applied R&D Projects', desc: 'Conducting goal-oriented research addressing national strategic challenges.' },
      { title: 'Proof-of-Concept (POC) Pilots', desc: 'Rapid prototyping and bench testing of experimental AI models under real-world constraints.' },
      { title: 'Technology Localisation', desc: 'Adapting global foundation models for Bahasa Melayu, regional dialects and ASEAN cultural nuances.' },
      { title: 'IP & Patent Management', desc: 'Filing, protecting and commercialising high-value intellectual property and patents.' },
      { title: 'Academia-Industry Synergy', desc: 'Bridging university research faculties with commercial corporate funding.' }
    ],
    services: [
      'Collaborative Contract Research & Applied AI Development',
      'Rapid Solution Prototyping, Proof-of-Concept & Sandbox Validation',
      'Intellectual Property (IP) Strategy, Patent Filing & Commercial Licensing',
      'High-Performance AI Research Lab & Shared Supercomputing Facilities',
      'Language Model Fine-Tuning for Malaysian Linguistic Heritage',
      'Strategic Advisory for Research Commercialisation & Technology Transfer'
    ],
    revenue: [
      { icon: '🔬', title: 'Contract R&D & Joint Ventures' },
      { icon: '💡', title: 'IP Licensing & Technology Royalties' },
      { icon: '🧪', title: 'Prototype & POC Development Fees' },
      { icon: '🌐', title: 'National & Global Research Grants' }
    ],
    image: 'assets/pillar_07_research_innovation.png',
    prev: { num: '06', name: 'AI Entrepreneurship & OPC', file: 'entrepreneurship-opc.html' },
    next: { num: '08', name: 'AI Future Technology', file: 'future-technology.html' }
  },
  {
    num: '08',
    slug: 'future-technology.html',
    title: 'AI FUTURE TECHNOLOGY',
    theme: 'gold',
    tag: 'SYS//NODE.08',
    subtitle: 'To explore, develop and commercialise next-generation AI technologies and emerging solutions that shape a smarter, more sustainable and competitive Malaysia.',
    purpose: 'To pioneer the exploration and commercialisation of emerging frontier technologies—including robotics, digital twins, XR, and green AI—propelling Malaysia into global technological leadership.',
    targetMarket: [
      'Forward-looking enterprises adopting Industry 4.0 automation',
      'Government agencies leading national smart infrastructure and ESG agendas',
      'Robotics, IoT and autonomous hardware manufacturers',
      'Pioneering tech investors and deep-tech venture syndicates',
      'Smart city developers and clean energy/sustainability consortia'
    ],
    keyActivities: [
      { title: 'Robotics & Automation', desc: 'Developing autonomous mobile robots, robotic process arms, and drone logistics.' },
      { title: 'Digital Twin & Simulation', desc: 'Real-time 3D virtualization of urban spaces, manufacturing plants and logistics hubs.' },
      { title: 'XR / AR / Metaverse Solutions', desc: 'Spatial computing, mixed-reality industrial training, and immersive telepresence.' },
      { title: 'Green AI & ESG Tech', desc: 'Developing energy-efficient AI architectures, smart grid balancing and carbon tracking.' },
      { title: 'Frontier Pilot Deployments', desc: 'Testing next-generation multimodal agent swarms in actual production environments.' }
    ],
    services: [
      'Strategic Frontier Technology Consulting & Horizon Scanning',
      'Robotics Integration & Autonomous Systems Deployment',
      'Industrial Digital Twin Architecture & Real-Time Telemetry Modelling',
      'Extended Reality (XR) & Immersive Simulation Development',
      'IoT Sensor Networks, Smart Facilities & Edge AI Processing',
      'Green AI Optimization & ESG Environmental Impact Reporting'
    ],
    revenue: [
      { icon: '🤖', title: 'Robotics & Hardware Integration' },
      { icon: '🌐', title: 'Digital Twin Platform Licensing' },
      { icon: '🌱', title: 'Green AI & ESG Implementation' },
      { icon: '🚀', title: 'Strategic Frontier Venture Grants' }
    ],
    image: 'assets/pillar_08_future_technology.png',
    prev: { num: '07', name: 'AI Research & Innovation', file: 'research-innovation.html' },
    next: { num: '01', name: 'AI Academy', file: 'academy.html' }
  }
];

function generateHTML(p) {
  const isGold = p.theme === 'gold';
  const themeClass = isGold ? 'theme-gold' : 'theme-cyan';

  return `<!DOCTYPE html>
<html lang="ms">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>${p.title} | NAIGC Malaysia</title>
  <meta name="description" content="${p.subtitle}">
  <link rel="icon" href="../favicon.ico">
  <link rel="stylesheet" href="style.css">
</head>
<body class="${themeClass}">

  <!-- Background Ambience -->
  <div class="naigc-bg-canvas" aria-hidden="true"></div>
  <div class="naigc-bg-grid" aria-hidden="true"></div>

  <div class="naigc-wrapper">

    <!-- Header Navigation -->
    <header class="naigc-header">
      <a href="../index.html" class="naigc-brand">
        <img src="../build/assets/logo-XvVq9OjC.png" alt="NAIGC Logo" class="naigc-brand-logo">
        <div class="naigc-brand-text">
          <span class="naigc-brand-title">NAIGC</span>
          <span class="naigc-brand-desc">Malaysia AI Generation Centre</span>
        </div>
      </a>

      <div class="naigc-nav-actions">
        <div class="naigc-telemetry-badge">
          <span class="naigc-status-dot"></span>
          <span>${p.tag} // ONLINE</span>
        </div>
        <a href="../index.html" class="naigc-btn-back">
          <span>&larr;</span>
          <span>HUB UTAMA</span>
        </a>
      </div>
    </header>

    <!-- Main Hero Banner -->
    <section class="naigc-hero">
      <div class="naigc-hero-tagline">${p.tag} &bull; STRATEGIC PILLAR ${p.num}</div>
      <h1 class="naigc-hero-title">${p.title}</h1>
      <p class="naigc-hero-subtitle">${p.subtitle}</p>

      <div class="naigc-hero-meta">
        <div class="naigc-meta-item">
          <span class="naigc-meta-label">STATUS</span>
          <span class="naigc-meta-val" style="color: ${isGold ? '#FFB800' : '#00F0FF'};">ACTIVE &bull; OPERATIONAL</span>
        </div>
        <div class="naigc-meta-item">
          <span class="naigc-meta-label">LATENCY</span>
          <span class="naigc-meta-val">0.8ms (Neural Link)</span>
        </div>
        <div class="naigc-meta-item">
          <span class="naigc-meta-label">ECOSYSTEM</span>
          <span class="naigc-meta-val">National AI Framework</span>
        </div>
        <div class="naigc-meta-item">
          <span class="naigc-meta-label">COVERAGE</span>
          <span class="naigc-meta-val">Nationwide (Malaysia)</span>
        </div>
      </div>
    </section>

    <!-- Bento Grid Section -->
    <div class="naigc-grid">
      <!-- Purpose Card -->
      <div class="naigc-card col-6">
        <div class="naigc-card-header">
          <div class="naigc-card-icon">🎯</div>
          <h2 class="naigc-card-title">PURPOSE & OBJECTIVES</h2>
        </div>
        <p class="naigc-card-p">${p.purpose}</p>
      </div>

      <!-- Target Market Card -->
      <div class="naigc-card col-6">
        <div class="naigc-card-header">
          <div class="naigc-card-icon">👥</div>
          <h2 class="naigc-card-title">TARGET MARKET</h2>
        </div>
        <ul class="naigc-list">
          ${p.targetMarket.map(item => `
          <li class="naigc-list-item">
            <span class="naigc-bullet"></span>
            <span>${item}</span>
          </li>`).join('')}
        </ul>
      </div>

      <!-- Key Activities Card -->
      <div class="naigc-card col-12">
        <div class="naigc-card-header">
          <div class="naigc-card-icon">⚡</div>
          <h2 class="naigc-card-title">KEY ACTIVITIES & OPERATIONS</h2>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.25rem;">
          ${p.keyActivities.map(act => `
          <div style="background: rgba(3, 10, 26, 0.65); padding: 1.25rem; border-radius: 8px; border: 1px solid rgba(255,255,255,0.08);">
            <div style="font-weight: 800; color: ${isGold ? '#FFB800' : '#00F0FF'}; margin-bottom: 0.45rem; font-size: 0.95rem;">${act.title}</div>
            <div style="font-size: 0.88rem; color: var(--naigc-text-sub); line-height: 1.5;">${act.desc}</div>
          </div>`).join('')}
        </div>
      </div>

      <!-- Services & Offerings -->
      <div class="naigc-card col-7">
        <div class="naigc-card-header">
          <div class="naigc-card-icon">🛠️</div>
          <h2 class="naigc-card-title">SERVICES & OFFERINGS</h2>
        </div>
        <ul class="naigc-check-list">
          ${p.services.map(svc => `
          <li class="naigc-check-item">
            <span class="naigc-check-icon">&check;</span>
            <span>${svc}</span>
          </li>`).join('')}
        </ul>
      </div>

      <!-- Revenue Opportunities -->
      <div class="naigc-card col-5">
        <div class="naigc-card-header">
          <div class="naigc-card-icon">💎</div>
          <h2 class="naigc-card-title">REVENUE & VALUE OPPORTUNITIES</h2>
        </div>
        <div class="naigc-revenue-grid">
          ${p.revenue.map(rev => `
          <div class="naigc-revenue-block">
            <span class="naigc-rev-icon">${rev.icon}</span>
            <div class="naigc-rev-title">${rev.title}</div>
          </div>`).join('')}
        </div>
      </div>
    </div>

    <!-- Official Presentation Infographic Showcase -->
    <section class="naigc-infographic-card">
      <div class="naigc-infographic-header">
        <div class="naigc-infographic-title">OFFICIAL NAIGC STRATEGIC ROADMAP &bull; PILLAR ${p.num}</div>
        <div class="naigc-telemetry-badge">NATIONAL ARCHIVE &bull; AUTHORISED DOCUMENT</div>
      </div>
      <img src="${p.image}" alt="${p.title} Official Infographic" class="naigc-infographic-img" loading="lazy">
    </section>

    <!-- Footer Navigation (Pillar Switcher) -->
    <nav class="naigc-footer-nav" aria-label="Pillar Navigation">
      <a href="${p.prev.file}" class="naigc-nav-link-card">
        <span style="font-size: 1.4rem;">&larr;</span>
        <div>
          <div class="naigc-nav-node-num">SYS//NODE.${p.prev.num}</div>
          <div class="naigc-nav-node-name">${p.prev.name}</div>
        </div>
      </a>

      <a href="../index.html" class="naigc-btn-back">
        <span>KEMBALI KE HUB UTAMA (CORE STAGE)</span>
      </a>

      <a href="${p.next.file}" class="naigc-nav-link-card naigc-nav-link-right">
        <div>
          <div class="naigc-nav-node-num">SYS//NODE.${p.next.num}</div>
          <div class="naigc-nav-node-name">${p.next.name}</div>
        </div>
        <span style="font-size: 1.4rem;">&rarr;</span>
      </a>
    </nav>

    <!-- Bottom Telemetry HUD -->
    <div class="naigc-bottom-hud">
      SYS//CORE ONLINE &bull; 8 ECOSYSTEM NODES OPERATIONAL &bull; MALAYSIA AI GENERATION CENTRE
    </div>

  </div>

</body>
</html>`;
}

// Generate all 8 pages
const outDir = path.join(__dirname, '../pillars');
fs.mkdirSync(outDir, { recursive: true });

pillars.forEach(p => {
  const filePath = path.join(outDir, p.slug);
  fs.writeFileSync(filePath, generateHTML(p), 'utf-8');
  console.log(`Generated: ${filePath}`);
});

console.log('All 8 pillar pages generated successfully!');

