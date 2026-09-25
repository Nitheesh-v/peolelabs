// Central content source for the site. Grounded in PeopleLabs Consulting's
// real offerings (Oracle / PeopleSoft). No invented statistics, testimonials,
// client logos, or certifications.

export const company = {
  name: 'PeopleLabs Consulting',
  founded: 2016,
  address: ['3269 Cherry Crescent SW', 'Edmonton, Alberta T6X 1Y5', 'Canada'],
  phone: '+1 587 400 3360',
  phoneHref: 'tel:+15874003360',
  email: 'kiran.rajan@peoplelabsconsulting.com',
  emailHref: 'mailto:kiran.rajan@peoplelabsconsulting.com',
  hours: '9:00 a.m. – 5:00 p.m.',
}

export const sectors = [
  {
    icon: 'bank',
    title: 'Banking',
    image: 'banking',
    text: 'Financials, treasury and supply-chain processes that stand up to regulatory and audit demands.',
  },
  {
    icon: 'shield-check',
    title: 'Insurance',
    image: 'insurance',
    text: 'Policy, billing and claims workflows supported with stable, well-governed PeopleSoft environments.',
  },
  {
    icon: 'graduation-cap',
    title: 'Higher Education',
    image: 'education',
    text: 'Campus Solutions across student financials, financial aid and academic advisement.',
  },
  {
    icon: 'shopping-bag',
    title: 'Retail',
    image: 'retail',
    text: 'Order-to-cash and inventory operations tuned for high-volume, seasonal demand.',
  },
  {
    icon: 'car',
    title: 'Automobile',
    image: 'automobile',
    text: 'Manufacturing and supply-chain integrations that keep production data accurate and timely.',
  },
]

export const expertiseGroups = [
  {
    id: 'fscm',
    icon: 'dollar-sign',
    title: 'PeopleSoft FSCM',
    description: 'Financials and supply chain capabilities that support essential business operations.',
    items: [
      'Accounts Payable',
      'Accounts Receivable',
      'Billing',
      'Expenses',
      'General Ledger',
      'Treasury / Cash Management',
      'Asset Management',
      'Supply Chain Management',
      'Grants Management',
    ],
  },
  {
    id: 'hcm',
    icon: 'users',
    title: 'PeopleSoft HCM',
    description: 'Human capital management across the employee lifecycle and global payroll.',
    items: [
      'Core HR / Workforce Development',
      'Benefits & Compensation Management',
      'Absence Management',
      'Time & Labor',
      'Global Payroll',
    ],
  },
  {
    id: 'campus',
    icon: 'graduation-cap',
    title: 'PeopleSoft Campus Solutions',
    description: 'Student-focused administration and financial capabilities for higher education.',
    items: [
      'Academic Advisement',
      'Student Administration',
      'Student Financials',
      'Financial Aid',
    ],
  },
  {
    id: 'reporting',
    icon: 'bar-chart',
    title: 'PeopleSoft Reporting',
    description: 'Reporting tools that help teams work with information across PeopleSoft.',
    items: ['Kibana', 'nVision'],
  },
]

export const services = [
  {
    id: 'fscm',
    icon: 'dollar-sign',
    title: 'PeopleSoft FSCM',
    summary:
      'Financials and Supply Chain Management — from payables to grants — configured to fit how your organization actually works.',
    items: [
      'Accounts Payable',
      'Accounts Receivable',
      'Billing',
      'Expenses',
      'General Ledger',
      'Treasury & Cash Management',
      'Asset Management',
      'Supply Chain Management',
      'Grants Management',
    ],
  },
  {
    id: 'hcm',
    icon: 'users',
    title: 'PeopleSoft HCM',
    summary:
      'A complete Human Capital Management foundation, from core HR through global payroll.',
    items: [
      'Core HR & Workforce Development',
      'Benefits & Compensation',
      'Absence Management',
      'Time & Labor',
      'Global Payroll',
    ],
  },
  {
    id: 'campus',
    icon: 'graduation-cap',
    title: 'PeopleSoft Campus Solutions',
    summary:
      'Purpose-built for institutions — supporting students end to end, from admission through alumni.',
    items: [
      'Academic Advisement',
      'Student Administration',
      'Student Financials',
      'Financial Aid',
    ],
  },
  {
    id: 'reporting',
    icon: 'bar-chart',
    title: 'PeopleSoft Reporting',
    summary:
      'Operational and analytical reporting that turns PeopleSoft data into decisions your teams can act on.',
    items: ['Kibana', 'nVision', 'PS Query & ad-hoc reporting'],
  },
  {
    id: 'oracle-cloud',
    icon: 'cloud',
    title: 'Oracle Cloud',
    summary:
      'Guidance and delivery across Oracle Fusion Cloud applications to modernize finance, HR and supply chain.',
    items: [
      'Fusion Cloud ERP & Financials',
      'Fusion Cloud HCM',
      'Cloud readiness & migration planning',
    ],
  },
  {
    id: 'managed-services',
    icon: 'settings',
    title: 'Managed Services',
    summary:
      'A single SLA-based agreement covering both technical and functional support for your PeopleSoft estate.',
    items: [
      'Technical & functional support',
      'SLA-based service levels',
      'Proactive monitoring & maintenance',
    ],
  },
  {
    id: 'training',
    icon: 'book-open',
    title: 'Training',
    summary:
      'Practical PeopleSoft training that builds real capability inside your team — not just a handover document.',
    items: [
      'Group training sessions',
      'One-on-one coaching',
      'Ongoing support & enablement',
    ],
  },
]

// Secondary "how we deliver" offerings (from PeopleLabs' PeopleSoft services).
export const delivery = [
  {
    icon: 'server',
    title: 'Managed Application Services',
    text: 'End-to-end technical and functional support under one SLA, so your PeopleSoft environment keeps running effectively.',
  },
  {
    icon: 'briefcase',
    title: 'Project Management',
    text: 'PeopleSoft projects managed start to finish — timelines and budgets held, with clear updates throughout.',
  },
  {
    icon: 'refresh',
    title: 'PeopleSoft Upgrades',
    text: 'Move to the latest PeopleSoft release to gain new functionality and features without disrupting the business.',
  },
  {
    icon: 'cloud',
    title: 'Cloud Migration',
    text: 'Assess, plan and execute a smooth transition of your PeopleSoft landscape to the cloud.',
  },
  {
    icon: 'monitor',
    title: 'Virtualization',
    text: 'Scalable virtual infrastructure design, implementation and management to maximize your IT investment.',
  },
  {
    icon: 'life-buoy',
    title: 'Training & Support',
    text: 'Group sessions, one-on-one coaching and ongoing support so your people get the most from PeopleSoft.',
  },
]

export const values = [
  {
    icon: 'database',
    title: 'Deep Oracle expertise',
    text: 'Since 2016 our team has specialized in Oracle technologies — PeopleSoft FSCM, HCM, Campus Solutions and Oracle Cloud.',
  },
  {
    icon: 'target',
    title: 'Fit to your business',
    text: 'Every organization is different. We work closely with you to shape solutions around your specific requirements.',
  },
  {
    icon: 'settings',
    title: 'SLA-based managed services',
    text: 'One agreement covering technical and functional support, with service levels you can rely on.',
  },
  {
    icon: 'layers',
    title: 'Sector experience',
    text: 'Proven delivery across banking, insurance, higher education, retail and automobile.',
  },
  {
    icon: 'book-open',
    title: 'Knowledge that stays',
    text: 'Training and enablement built in, so your team is confident and self-sufficient after go-live.',
  },
  {
    icon: 'map-pin',
    title: 'Canadian & client-focused',
    text: 'Edmonton-based and invested in long-term partnerships, real ROI and consistent, superior service.',
  },
]

export const jobs = [
  {
    title: 'Senior PeopleSoft FSCM Business Analyst',
    meta: ['Full-time', 'Edmonton (Remote)', '7+ years'],
    quals: [
      'Must be able to work in Canada without sponsorship.',
      '7+ years experience working as a PeopleSoft Business Analyst.',
      'In-depth knowledge of PeopleSoft Financials & Supply Chain (FSCM).',
      'Strong analytical, problem-solving and communication skills.',
      'Experience with PeopleTools, nVision, Kibana reporting and other PeopleSoft tools.',
      'Ability to collaborate in a team and lead discussions with business stakeholders.',
      'PeopleSoft certifications are a plus.',
    ],
  },
  {
    title: 'PeopleSoft FSCM Business Analyst — Entry Level',
    meta: ['Full-time', 'Edmonton (Remote)', '2+ years'],
    quals: [
      'Must be able to work in Canada without sponsorship.',
      '2+ years experience working with PeopleSoft Financials.',
      'In-depth knowledge of modules such as Accounts Payable, Accounts Receivable and Banking.',
      'Strong analytical, problem-solving and communication skills.',
      'Knowledge of PeopleTools and nVision.',
      'Ability to collaborate in a team and lead discussions with business stakeholders.',
      'PeopleSoft certifications are a plus.',
    ],
  },
  {
    title: 'Technical Support Analyst',
    meta: ['Full-time', 'Edmonton (Remote)', '3+ years'],
    quals: [
      'Must be able to work in Canada without sponsorship.',
      'A related post-secondary diploma; a related Bachelor’s degree is strongly preferred.',
      '3+ years of experience performing related duties in a technical capacity.',
      'Knowledge of PS Query, PeopleTools PeopleCode, SQR, XML, SQL and web development tools.',
      'Experience in a post-secondary setting is an asset.',
    ],
  },
]
