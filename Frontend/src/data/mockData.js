export const fallbackAgents = [
  {
    id: "agent-1",
    name: "Elena Rostova",
    title: "Partner & Head of Executive Search",
    industry: "Tech & AI",
    specialty: "C-Suite & AI Research Leaders",
    experience: "14+ Years",
    placements: 180,
    rating: 4.95,
    bio: "Elena specializes in placing Chief Technology Officers, VPs of AI/ML, and Principal Researchers into high-growth technology unicorns and Fortune 500 enterprises.",
    skills: ["Executive Search", "AI/ML Talent", "Equity Structuring", "Board Advisory"],
    location: "San Francisco, CA",
    headshot: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600",
    featured: true,
    recentPlacement: "VP of Engineering @ AI Scaleup ($450k Base)"
  },
  {
    id: "agent-2",
    name: "Marcus Vance",
    title: "Senior Director, Fintech & Capital Markets",
    industry: "Finance",
    specialty: "Quantitative Finance & Quant Trading",
    experience: "11+ Years",
    placements: 145,
    rating: 4.92,
    bio: "Marcus commands a massive network of elite quantitative analysts, portfolio managers, and fintech executives across Wall Street and London.",
    skills: ["Quant Trading", "Risk Management", "Hedge Funds", "Fintech Scaling"],
    location: "New York, NY",
    headshot: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600",
    featured: true,
    recentPlacement: "Head of Trading Tech @ Global Hedge Fund ($600k Total Comp)"
  },
  {
    id: "agent-3",
    name: "Dr. Sophia Chen",
    title: "VP, Healthcare & BioTech Scouting",
    industry: "Healthcare",
    specialty: "Pharma R&D & Clinical Leadership",
    experience: "12+ Years",
    placements: 110,
    rating: 4.98,
    bio: "With a dual background in Molecular Biology and Executive Recruiting, Sophia connects groundbreaking BioTech ventures with top medical minds.",
    skills: ["BioTech R&D", "Clinical Regulatory", "Pharma Leadership", "Life Sciences"],
    location: "Boston, MA",
    headshot: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600",
    featured: true,
    recentPlacement: "Chief Scientific Officer @ Clinical BioTech ($520k)"
  },
  {
    id: "agent-4",
    name: "David Sterling",
    title: "Principal Agent, HR & People Architecture",
    industry: "Executive HR",
    specialty: "CHRO & People Ops Leadership",
    experience: "15+ Years",
    placements: 210,
    rating: 4.90,
    bio: "David architects world-class HR departments for scaling enterprises, placing Chief People Officers and HR Transformation Directors globally.",
    skills: ["CHRO Placement", "Org Design", "Compensation & Benefits", "Culture Advisory"],
    location: "Chicago, IL",
    headshot: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600",
    featured: false,
    recentPlacement: "Chief Human Resources Officer @ Global Logistics ($380k)"
  },
  {
    id: "agent-5",
    name: "Aisha Patel",
    title: "Lead Agent, Supply Chain & Logistics",
    industry: "Logistics",
    specialty: "Global Supply Chain & Operations",
    experience: "9+ Years",
    placements: 125,
    rating: 4.88,
    bio: "Aisha helps global enterprises optimize international logistics networks by securing resilient VP and COO leadership.",
    skills: ["Global Freight", "Inventory Optimization", "Logistics Tech", "Vendor Relations"],
    location: "London, UK",
    headshot: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=600",
    featured: false,
    recentPlacement: "VP of Global Supply Operations @ Retail Giant ($340k)"
  },
  {
    id: "agent-6",
    name: "Alexandre Dubois",
    title: "Senior Director, Retail & E-Commerce",
    industry: "Retail & Consumer",
    specialty: "Omnichannel & D2C Leadership",
    experience: "10+ Years",
    placements: 130,
    rating: 4.91,
    bio: "Alexandre bridges traditional luxury and rapid e-commerce growth, placing dynamic CMOs, E-Commerce VPs, and Brand Strategists.",
    skills: ["E-Commerce Strategy", "D2C Scaling", "Luxury Retail", "Brand Leadership"],
    location: "Paris, France",
    headshot: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600",
    featured: true,
    recentPlacement: "Chief Marketing Officer @ Luxury Brand Group ($410k)"
  },
  {
    id: "agent-7",
    name: "Rachel Thorne",
    title: "Managing Director, Industrial & Engineering",
    industry: "Engineering",
    specialty: "Robotics & Advanced Manufacturing",
    experience: "13+ Years",
    placements: 165,
    rating: 4.96,
    bio: "Rachel builds hardware and engineering organizations from the ground up, placing Chief Engineers and VP of Hardware Operations.",
    skills: ["Robotics", "Hardware Engineering", "Plant Operations", "Quality Control"],
    location: "Austin, TX",
    headshot: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600",
    featured: false,
    recentPlacement: "VP of Hardware Operations @ EV Manufacturer ($430k)"
  },
  {
    id: "agent-8",
    name: "Karan Verma",
    title: "Director, IT & Cloud Transformation",
    industry: "Tech & AI",
    specialty: "Cloud Architecture & Cyber Security",
    experience: "8+ Years",
    placements: 140,
    rating: 4.89,
    bio: "Karan sources top-tier Cloud Architects, CISOs, and Infrastructure Directors to future-proof Enterprise IT landscapes.",
    skills: ["Cybersecurity", "AWS/Azure Cloud", "DevOps Leadership", "SaaS Infrastructure"],
    location: "Singapore",
    headshot: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600",
    featured: false,
    recentPlacement: "Chief Information Security Officer @ Enterprise SaaS ($390k)"
  }
];

export const fallbackSectors = [
  {
    id: "sec-1",
    name: "IT & ITES",
    iconName: "Cpu",
    tagline: "Software, Cloud Infrastructure & Artificial Intelligence",
    description: "Architecting high-performance tech organizations by securing rare software engineers, AI researchers, and DevOps directors.",
    placementsCount: "180+",
    growthRate: "+34%",
    topRoles: ["VP of Engineering", "Chief AI Officer", "Principal Cloud Architect"]
  },
  {
    id: "sec-2",
    name: "Banking & Financial Services",
    iconName: "TrendingUp",
    tagline: "Quant Finance, Fintech & Investment Banking",
    description: "Connecting institutional funds, fintech unicorns, and commercial banks with elite quantitative traders and portfolio managers.",
    placementsCount: "140+",
    growthRate: "+28%",
    topRoles: ["Head of Quantitative Trading", "Chief Risk Officer", "Fintech VP"]
  },
  {
    id: "sec-3",
    name: "Healthcare & Pharma",
    iconName: "Activity",
    tagline: "Biotech R&D, Life Sciences & Clinical Leadership",
    description: "Empowering life-changing discovery by placing visionary scientific leaders and regulatory strategists into breakthrough biotech firms.",
    placementsCount: "95+",
    growthRate: "+42%",
    topRoles: ["Chief Scientific Officer", "VP of Clinical Trial Ops", "Medical Director"]
  },
  {
    id: "sec-4",
    name: "Engineering & Manufacturing",
    iconName: "Wrench",
    tagline: "Robotics, Hardware & Industrial Automation",
    description: "Modernizing industrial output with elite mechanical, robotics, and hardware engineering leaders who scale production.",
    placementsCount: "120+",
    growthRate: "+22%",
    topRoles: ["VP of Plant Engineering", "Director of Robotics", "Chief Operating Officer"]
  },
  {
    id: "sec-5",
    name: "Retail & Consumer",
    iconName: "ShoppingBag",
    tagline: "E-Commerce, Omnichannel & Luxury Goods",
    description: "Driving global brand growth through dynamic digital officers, D2C brand heads, and supply-chain leaders.",
    placementsCount: "110+",
    growthRate: "+19%",
    topRoles: ["Chief Marketing Officer", "VP of E-Commerce", "Head of Merchandising"]
  },
  {
    id: "sec-6",
    name: "Logistics & Supply Chain",
    iconName: "Truck",
    tagline: "Freight Tech, Global Fleet & Fulfillment",
    description: "Building bulletproof international supply chain operations through seasoned logistics executives and fulfillment directors.",
    placementsCount: "85+",
    growthRate: "+26%",
    topRoles: ["VP of Global Operations", "Director of Logistics", "Supply Chain Strategist"]
  }
];

export const fallbackServices = [
  {
    id: "srv-1",
    number: "01",
    title: "Talent Scouting & Executive Search",
    subtitle: "Precision Headhunting for C-Suite & Niche Technical Leaders",
    description: "Our proprietary 5-stage scouting methodology identifies, vets, and lands the top 1% of passive candidates in your industry before your competitors even know they are open to dynamic moves.",
    features: [
      "Rigorous 360° Candidate Audits & Vetting",
      "Executive Compensation Benchmarking",
      "Confidential & Stealth Headhunting Capabilities",
      "Guaranteed 98% 12-Month Retention Rate"
    ],
    highlight: "Average Placement Speed: 21 Days",
    iconName: "Target"
  },
  {
    id: "srv-2",
    number: "02",
    title: "Career Management & Placement",
    subtitle: "Personalized Representation for World-Class High Performers",
    description: "We act as personal talent agents for proven executives, negotiating maximum valuation, equity upside, and career elevation in market-leading enterprises.",
    features: [
      "Dedicated Senior Agent Representation",
      "Strategic Career Positioning & Portfolio Prep",
      "Exclusive Access to Unlisted Board & Executive Roles",
      "Post-Placement 90-Day Acceleration Coaching"
    ],
    highlight: "Average Salary Elevation: +38%",
    iconName: "Briefcase"
  },
  {
    id: "srv-3",
    number: "03",
    title: "Contract & Salary Negotiation",
    subtitle: "High-Stakes Offer Optimization & Equity Structuring",
    description: "Eliminate friction during executive offers. Our experienced negotiation team structures win-win compensation packages covering equity grants, golden handcuffs, and bonus metrics.",
    features: [
      "BS-Free Compensation Modeling",
      "RSU / Stock Option Evaluation",
      "Non-Compete & Relocation Advisory",
      "100% Offer Acceptance Rate to Date"
    ],
    highlight: "Negotiated Value Added: $150M+",
    iconName: "ShieldCheck"
  },
  {
    id: "srv-4",
    number: "04",
    title: "HR Consulting & Policy Framework",
    subtitle: "Building Enterprise Infrastructure & Compliance Standards",
    description: "Transform your People Operations into a strategic engine. We design robust HR frameworks, performance evaluation metrics, and bulletproof compliance policies.",
    features: [
      "Global HR Audit & Compliance Alignment",
      "Organisational Culture & DEI Frameworks",
      "Scalable Compensation Tiering",
      "Employee Lifecycle Redesign"
    ],
    highlight: "Deployed Across 50+ Enterprises",
    iconName: "Sliders"
  },
  {
    id: "srv-5",
    number: "05",
    title: "Payroll & Compensation Management",
    subtitle: "End-to-End Global Payroll & Benefit Outsourcing",
    description: "Seamless global payroll operations across multi-jurisdictional teams with automated tax withholdings, currency payouts, and executive benefit administration.",
    features: [
      "Multi-Currency Automated Disbursements",
      "Tax & Cross-Border Legal Compliance",
      "Executive Tiered Benefits Management",
      "Real-Time Analytics & Cost Reports"
    ],
    highlight: "Zero-Downtime Payroll Execution",
    iconName: "DollarSign"
  },
  {
    id: "srv-6",
    number: "06",
    title: "Leadership Training & Skill Mapping",
    subtitle: "Empowering Next-Generation Directors & VP Cohorts",
    description: "Accelerate your high-potential talent into confident executive leaders through customized leadership workshops, skill gap mapping, and executive coaching.",
    features: [
      "Targeted Leadership Skill Assessments",
      "Custom Executive Coaching Frameworks",
      "Succession Planning Strategy",
      "Measurable Manager Performance KPIs"
    ],
    highlight: "94% Leadership Readiness Score",
    iconName: "Award"
  }
];

export const fallbackJobs = [
  {
    id: "job-101",
    title: "Chief Artificial Intelligence Officer (CAIO)",
    department: "Tech & AI",
    location: "San Francisco, CA (Hybrid)",
    type: "Full-Time Executive",
    salary: "$450,000 - $600,000 + Equity",
    experience: "12+ Years",
    description: "Leading enterprise AI strategy, generative model deployments, and AI engineering org scaling for a Series-C Fintech Unicorn.",
    requirements: ["PhD or MS in CS / Machine Learning", "Proven record scaling AI teams from 10 to 80+", "Track record with LLM foundation model training"],
    postedDate: "2 days ago"
  },
  {
    id: "job-102",
    title: "Head of Quantitative Strategy",
    department: "Finance",
    location: "New York, NY (On-site)",
    type: "Full-Time Executive",
    salary: "$500,000 - $750,000 + Performance Bonus",
    experience: "10+ Years",
    description: "Spearheading high-frequency equity trading models and algorithmic risk management for a premier tier-1 global hedge fund.",
    requirements: ["Degree in Mathematics, Physics or Financial Engineering", "Expertise in C++, Python, CUDA", "Demonstrated PnL track record of $20M+"],
    postedDate: "1 day ago"
  },
  {
    id: "job-103",
    title: "VP of Global Supply Operations",
    department: "Logistics",
    location: "Chicago, IL / Remote",
    type: "Full-Time Executive",
    salary: "$320,000 - $420,000",
    experience: "15+ Years",
    description: "Overseeing end-to-end supply chain logistics, vendor procurement, and warehouse automation systems across North America & Europe.",
    requirements: ["10+ years leading multi-country supply networks", "Proven budget management $100M+", "Expertise in SAP S/4HANA & Logistics Automation"],
    postedDate: "3 days ago"
  },
  {
    id: "job-104",
    title: "Chief Scientific Officer (CSO)",
    department: "Healthcare",
    location: "Boston, MA (On-site)",
    type: "Full-Time Executive",
    salary: "$480,000 - $620,000 + Equity",
    experience: "14+ Years",
    description: "Driving clinical pipeline candidates through FDA Phase II/III trials for a public oncology biotech pioneer.",
    requirements: ["MD or PhD in Molecular Oncology / Immunology", "FDA approval track record", "Strong investor presentation skills"],
    postedDate: "Just posted"
  },
  {
    id: "job-105",
    title: "VP of HR & Organizational Development",
    department: "Executive HR",
    location: "London, UK / Remote",
    type: "Full-Time Executive",
    salary: "£180,000 - £240,000",
    experience: "10+ Years",
    description: "Architecting global HR infrastructure, talent retention frameworks, and performance reward models for a fast-growing scaleup.",
    requirements: ["CIPD Level 7 or Master's in HR Management", "Proven global expansion experience", "Strong talent analytics background"],
    postedDate: "4 days ago"
  },
  {
    id: "job-106",
    title: "VP of Hardware & Manufacturing",
    department: "Engineering",
    location: "Austin, TX (On-site)",
    type: "Full-Time Executive",
    salary: "$380,000 - $480,000 + Options",
    experience: "12+ Years",
    description: "Directing high-speed automated robotics assembly facilities and hardware engineering teams.",
    requirements: ["BS/MS in Mechanical / Electrical Engineering", "10+ years in automotive / robotics hardware", "Lean Six Sigma Black Belt"],
    postedDate: "5 days ago"
  }
];
