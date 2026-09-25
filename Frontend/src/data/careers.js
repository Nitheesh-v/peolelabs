// =====================================================================
//  CAREERS — JOB OPENINGS
// ---------------------------------------------------------------------
//  To ADD a job:    copy one block inside JOBS below, paste it, edit text.
//  To REMOVE a job: delete its block (or comment it out with /* ... */).
//  To REORDER:      move the blocks — the page shows them top to bottom.
//
//  The "Position Applied For" dropdown in the application form updates
//  automatically from this list. Nothing else needs to change.
//
//  Fields:
//    title          (required) Job title shown on the card + dropdown
//    type           e.g. 'Full Time', 'Part Time', 'Contract'
//    location       e.g. 'Edmonton-based', 'Calgary'  (leave out to hide)
//    remote         true = shows a "Remote" tag        (leave out to hide)
//    experience     e.g. '3+ years experience'         (leave out to hide)
//    summary        Short paragraph shown when the card is expanded
//    qualifications List of bullet points
// =====================================================================

const DEFAULT_SUMMARY =
  'PeopleLabs Consulting is looking for multiple PeopleSoft Business Analyst resources for our growing and dynamic clients. Bring your PeopleSoft expertise to one of our Edmonton-based remote, full-time opportunities. We are dedicated to delivering innovative solutions to our clients and encourage qualified professionals to apply.'

const JOBS = [
  {
    title: 'Senior PeopleSoft FSCM Business Analyst',
    type: 'Full Time',
    location: 'Edmonton-based',
    remote: true,
    experience: '7+ years experience',
    summary: DEFAULT_SUMMARY,
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
    title: 'PeopleSoft FSCM Business Analyst - Entry Level',
    type: 'Full Time',
    location: 'Edmonton-based',
    remote: true,
    experience: '2+ years experience',
    summary: DEFAULT_SUMMARY,
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
    title: 'Technical Support Analyst',
    type: 'Full Time',
    experience: '3+ years experience',
    summary:
      "PeopleLabs Consulting is looking for a Technical Support Analyst specializing in PeopleSoft technical solutions to join our team on a full-time basis. The successful candidate will support the ongoing configuration and maintenance of clients' PeopleSoft Human Capital Management, Campus, and Finance systems.",
    qualifications: [
      'Must be able to work in Canada without sponsorship.',
      "A related post-secondary diploma is required; a related bachelor's degree is strongly preferred.",
      '3+ years of experience performing duties related to this position in a technical capacity.',
      'Knowledge of PSQuery, PeopleTools, PeopleCode, SQR, XML, SQL, web development tools, and productivity software including Microsoft Office, Microsoft 365, and Adobe products.',
      'Experience in a post-secondary setting is considered an asset.',
    ],
  },

  // ---- Template: copy from here to add a new job -----------------------
  // {
  //   title: 'PeopleSoft HCM Consultant',
  //   type: 'Contract',
  //   location: 'Calgary',
  //   remote: true,
  //   experience: '5+ years experience',
  //   summary: 'One or two lines describing the role.',
  //   qualifications: [
  //     'First requirement.',
  //     'Second requirement.',
  //   ],
  // },
  // ----------------------------------------------------------------------
]

// ---------------------------------------------------------------------
//  Internal: turns the simple JOBS list above into what the page needs.
//  You should not need to edit anything below this line.
// ---------------------------------------------------------------------
const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

export const careers = JOBS.map((job, index) => {
  const metadata = []
  if (job.type) metadata.push({ icon: 'briefcase', label: job.type })
  if (job.location) metadata.push({ icon: 'map-pin', label: job.location })
  if (job.remote) metadata.push({ icon: 'monitor', label: 'Remote' })
  if (job.experience) metadata.push({ icon: 'clock', label: job.experience })
  if (metadata.length === 0) metadata.push({ icon: 'briefcase', label: 'Open role' })

  return {
    id: job.id || `${slugify(job.title)}-${index + 1}`,
    title: job.title,
    summary: job.summary || DEFAULT_SUMMARY,
    metadata,
    qualifications: job.qualifications || [],
  }
})

export const applicationPositions = careers.map((career) => career.title)
