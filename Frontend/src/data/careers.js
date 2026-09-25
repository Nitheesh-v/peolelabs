export const careers = [
  {
    id: 'senior-fscm-business-analyst',
    title: 'Senior PeopleSoft FSCM Business Analyst',
    summary:
      'PeopleLabs Consulting is looking for multiple PeopleSoft Business Analyst resources for our growing and dynamic clients. Bring your PeopleSoft expertise to one of our Edmonton-based remote, full-time opportunities. We are dedicated to delivering innovative solutions to our clients and encourage qualified professionals to apply.',
    metadata: [
      { icon: 'briefcase', label: 'Full Time' },
      { icon: 'map-pin', label: 'Edmonton-based' },
      { icon: 'monitor', label: 'Remote' },
      { icon: 'clock', label: '7+ years experience' },
    ],
    qualifications: [
      'Must be able to work in Canada without sponsorship.',
      '7+ years of experience working as a PeopleSoft Business Analyst.',
      'In-depth knowledge of PeopleSoft Financials/Supply Chain Management (FSCM).',
      'Strong analytical, problem-solving, and communication skills.',
      'Experience with PeopleTools, nVision, Kibana Reporting, and other PeopleSoft development tools.',
      'Ability to work collaboratively in a team environment and lead discussions with business stakeholders.',
      'PeopleSoft certifications are considered an asset.',
    ],
  },
  {
    id: 'entry-level-fscm-business-analyst',
    title: 'PeopleSoft FSCM Business Analyst - Entry Level',
    summary:
      'PeopleLabs Consulting is looking for multiple PeopleSoft Business Analyst resources for our growing and dynamic clients. Bring your PeopleSoft expertise to one of our Edmonton-based remote, full-time opportunities. We are dedicated to delivering innovative solutions to our clients and encourage qualified professionals to apply.',
    metadata: [
      { icon: 'briefcase', label: 'Full Time' },
      { icon: 'map-pin', label: 'Edmonton-based' },
      { icon: 'monitor', label: 'Remote' },
      { icon: 'clock', label: '2+ years experience' },
    ],
    qualifications: [
      'Must be able to work in Canada without sponsorship.',
      '2+ years of experience working with PeopleSoft Financials.',
      'In-depth knowledge of PeopleSoft modules such as Accounts Payable, Accounts Receivable, and Banking.',
      'Strong analytical, problem-solving, and communication skills.',
      'Knowledge of PeopleTools and nVision.',
      'Ability to work collaboratively in a team environment and lead discussions with business stakeholders.',
      'PeopleSoft certifications are considered an asset.',
    ],
  },
  {
    id: 'technical-support-analyst',
    title: 'Technical Support Analyst',
    summary:
      "PeopleLabs Consulting is looking for a Technical Support Analyst specializing in PeopleSoft technical solutions to join our team on a full-time basis. The successful candidate will support the ongoing configuration and maintenance of clients' PeopleSoft Human Capital Management, Campus, and Finance systems.",
    metadata: [
      { icon: 'briefcase', label: 'Full Time' },
      { icon: 'clock', label: '3+ years experience' },
    ],
    qualifications: [
      'Must be able to work in Canada without sponsorship.',
      "A related post-secondary diploma is required; a related bachelor's degree is strongly preferred.",
      '3+ years of experience performing duties related to this position in a technical capacity.',
      'Knowledge of PSQuery, PeopleTools, PeopleCode, SQR, XML, SQL, web development tools, and productivity software including Microsoft Office, Microsoft 365, and Adobe products.',
      'Experience in a post-secondary setting is considered an asset.',
    ],
  },
]

export const applicationPositions = careers.map((career) => career.title)
