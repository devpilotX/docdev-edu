export type ProgrammeLevel = "Undergraduate" | "Graduate" | "Professional"

export type School = {
  slug: string
  name: string
  summary: string
  focus: ReadonlyArray<string>
}

export type Programme = {
  slug: string
  title: string
  award: string
  level: ProgrammeLevel
  school: string
  durationMonths: number
  credits: number
  mode: "Full time" | "Part time" | "Full time or part time"
  annualFeeINR: number
  summary: string
  overview: ReadonlyArray<string>
  structure: ReadonlyArray<{ title: string; detail: string }>
  entryRequirements: ReadonlyArray<string>
  careers: ReadonlyArray<string>
}

export const schools: ReadonlyArray<School> = [
  {
    slug: "computing",
    name: "School of Computing",
    summary:
      "Systems, distributed infrastructure, machine intelligence and human–computer interaction, taught with an emphasis on what runs in production.",
    focus: ["Systems and networks", "Machine intelligence", "Security", "HCI"],
  },
  {
    slug: "engineering",
    name: "School of Engineering",
    summary:
      "Electrical, mechatronic and materials engineering, supported by a shared prototyping workshop and an industrial placement year.",
    focus: ["Mechatronics", "Power systems", "Materials", "Control"],
  },
  {
    slug: "data-science",
    name: "School of Data Science",
    summary:
      "Statistics, causal inference and applied analytics for research groups and practising professionals.",
    focus: ["Statistics", "Causal inference", "Operations research", "Visualisation"],
  },
  {
    slug: "design",
    name: "School of Design",
    summary:
      "Interaction, product and communication design, studio taught and assessed through public critique.",
    focus: ["Interaction design", "Product design", "Typography", "Research"],
  },
  {
    slug: "sciences",
    name: "School of Applied Sciences",
    summary:
      "Applied mathematics, physics and environmental science, with laboratory work from the first term.",
    focus: ["Applied mathematics", "Physics", "Environmental science"],
  },
  {
    slug: "management",
    name: "School of Technology Management",
    summary:
      "Product, operations and venture management for technical graduates moving into leadership.",
    focus: ["Product management", "Operations", "Finance", "Policy"],
  },
]

export const intakes: ReadonlyArray<{ label: string; applyBy: string }> = [
  { label: "Autumn 2026", applyBy: "2026-09-05" },
  { label: "Spring 2027", applyBy: "2027-01-10" },
  { label: "Autumn 2027", applyBy: "2027-09-04" },
  { label: "Not decided yet", applyBy: "" },
]

export const programmes: ReadonlyArray<Programme> = [
  {
    slug: "bsc-computer-science",
    title: "BSc Computer Science",
    award: "BSc (Hons)",
    level: "Undergraduate",
    school: "School of Computing",
    durationMonths: 36,
    credits: 360,
    mode: "Full time",
    annualFeeINR: 285000,
    summary:
      "A rigorous grounding in algorithms, systems and software engineering, with a year-long capstone built for a real user.",
    overview: [
      "The degree begins with discrete mathematics, programming and computer architecture, then moves through operating systems, databases, networks and distributed systems.",
      "Every module is assessed by coursework that runs: written examinations account for less than half of the final mark.",
      "Students complete an industrial placement or a research assistantship between the second and third year.",
    ],
    structure: [
      {
        title: "Year one — foundations",
        detail:
          "Programming in C and Python, discrete mathematics, computer architecture, and an introduction to professional practice.",
      },
      {
        title: "Year two — systems",
        detail:
          "Operating systems, databases, computer networks, algorithms and complexity, and a team software project.",
      },
      {
        title: "Year three — depth and capstone",
        detail:
          "Two specialist streams from distributed systems, security, machine learning or compilers, plus the individual capstone.",
      },
    ],
    entryRequirements: [
      "Higher secondary certificate with 75% or above, including mathematics",
      "Evidence of programming work: repository, project write-up or portfolio",
      "English language at CEFR B2 or equivalent",
    ],
    careers: [
      "Software engineer",
      "Site reliability engineer",
      "Research assistant",
      "Data engineer",
    ],
  },
  {
    slug: "beng-mechatronic-engineering",
    title: "BEng Mechatronic Engineering",
    award: "BEng (Hons)",
    level: "Undergraduate",
    school: "School of Engineering",
    durationMonths: 48,
    credits: 480,
    mode: "Full time",
    annualFeeINR: 310000,
    summary:
      "Mechanical design, embedded electronics and control theory taught together, with workshop access from week one.",
    overview: [
      "Mechatronics at DarkDev EDU is deliberately hands-on: students specify, machine, wire and program their own assemblies.",
      "The fourth year is a supervised industrial project delivered with a partner manufacturer.",
    ],
    structure: [
      {
        title: "Years one and two",
        detail:
          "Engineering mathematics, statics and dynamics, circuits, embedded C, and computer-aided design.",
      },
      {
        title: "Year three",
        detail:
          "Control systems, robotics, power electronics, and the shared prototyping studio module.",
      },
      {
        title: "Year four",
        detail: "Industrial project, systems engineering, and an engineering ethics seminar.",
      },
    ],
    entryRequirements: [
      "Higher secondary certificate with 75% or above in mathematics and physics",
      "Portfolio or written account of a build project",
      "English language at CEFR B2 or equivalent",
    ],
    careers: [
      "Automation engineer",
      "Embedded systems engineer",
      "Robotics engineer",
      "Design engineer",
    ],
  },
  {
    slug: "bsc-applied-mathematics",
    title: "BSc Applied Mathematics",
    award: "BSc (Hons)",
    level: "Undergraduate",
    school: "School of Applied Sciences",
    durationMonths: 36,
    credits: 360,
    mode: "Full time",
    annualFeeINR: 240000,
    summary:
      "Analysis, linear algebra and numerical methods applied to physical, biological and economic systems.",
    overview: [
      "The programme pairs classical analysis with computational practice; every theory module has a matching laboratory.",
      "Third-year students join a research group for a supervised dissertation.",
    ],
    structure: [
      { title: "Year one", detail: "Analysis, linear algebra, probability and scientific computing." },
      { title: "Year two", detail: "Differential equations, statistics, optimisation and numerical analysis." },
      { title: "Year three", detail: "Two specialist streams and a supervised dissertation." },
    ],
    entryRequirements: [
      "Higher secondary certificate with 80% or above in mathematics",
      "Short written statement on a mathematical topic of interest",
    ],
    careers: ["Quantitative analyst", "Research scientist", "Actuarial analyst", "Modeller"],
  },
  {
    slug: "ba-interaction-design",
    title: "BA Interaction Design",
    award: "BA (Hons)",
    level: "Undergraduate",
    school: "School of Design",
    durationMonths: 36,
    credits: 360,
    mode: "Full time",
    annualFeeINR: 265000,
    summary:
      "Studio-taught design practice grounded in typography, prototyping and user research, assessed by public critique.",
    overview: [
      "Students work in an open studio and present at fortnightly critiques attended by practitioners.",
      "The final year is a self-directed body of work exhibited at the annual degree show.",
    ],
    structure: [
      { title: "Year one", detail: "Drawing, typography, colour, and interface fundamentals." },
      { title: "Year two", detail: "User research methods, prototyping, motion, and design systems." },
      { title: "Year three", detail: "Self-directed project, professional practice, and the degree show." },
    ],
    entryRequirements: [
      "Higher secondary certificate with 65% or above",
      "Portfolio of fifteen to twenty pieces",
      "Interview with the studio faculty",
    ],
    careers: ["Product designer", "Design researcher", "Design systems lead", "Art director"],
  },
  {
    slug: "msc-machine-intelligence",
    title: "MSc Machine Intelligence",
    award: "MSc",
    level: "Graduate",
    school: "School of Computing",
    durationMonths: 18,
    credits: 180,
    mode: "Full time or part time",
    annualFeeINR: 420000,
    summary:
      "Statistical learning, representation learning and systems for training and serving models at scale.",
    overview: [
      "The programme assumes fluency in linear algebra, probability and programming, and moves quickly to primary literature.",
      "Students complete a six-month dissertation with a research group or an industrial partner.",
    ],
    structure: [
      { title: "Term one", detail: "Statistical learning, optimisation, and machine learning systems." },
      { title: "Term two", detail: "Representation learning, evaluation and measurement, and two electives." },
      { title: "Term three", detail: "Dissertation, supervised by a research group or industrial partner." },
    ],
    entryRequirements: [
      "Second class honours degree or above in a quantitative discipline",
      "Demonstrated programming ability",
      "Research statement of up to 800 words",
    ],
    careers: ["Research engineer", "Applied scientist", "ML platform engineer", "Doctoral study"],
  },
  {
    slug: "msc-distributed-systems",
    title: "MSc Distributed Systems",
    award: "MSc",
    level: "Graduate",
    school: "School of Computing",
    durationMonths: 12,
    credits: 120,
    mode: "Full time",
    annualFeeINR: 395000,
    summary:
      "Consensus, storage, observability and operational practice for systems that must not lose data.",
    overview: [
      "Coursework is built around implementing and breaking real systems: a replicated log, a storage engine and a scheduler.",
      "An operations module covers incident response, capacity planning and postmortem practice.",
    ],
    structure: [
      { title: "Term one", detail: "Concurrency, consensus protocols, and storage engines." },
      { title: "Term two", detail: "Scheduling, observability, reliability engineering, and security." },
      { title: "Term three", detail: "Individual systems project with a written technical report." },
    ],
    entryRequirements: [
      "Undergraduate degree in computing or equivalent professional experience",
      "Fluency in a systems language such as C, C++, Go or Rust",
    ],
    careers: ["Infrastructure engineer", "Site reliability engineer", "Platform architect"],
  },
  {
    slug: "msc-data-science",
    title: "MSc Data Science",
    award: "MSc",
    level: "Graduate",
    school: "School of Data Science",
    durationMonths: 12,
    credits: 120,
    mode: "Full time or part time",
    annualFeeINR: 380000,
    summary:
      "Study design, causal inference and analytical engineering for teams that make decisions from data.",
    overview: [
      "Half of the assessment is written communication: an analysis that cannot be explained is not finished.",
      "Students work with anonymised partner datasets under a data-use agreement.",
    ],
    structure: [
      { title: "Term one", detail: "Statistical inference, experiment design, and data engineering." },
      { title: "Term two", detail: "Causal inference, forecasting, visualisation, and decision analysis." },
      { title: "Term three", detail: "Applied dissertation with a partner organisation." },
    ],
    entryRequirements: [
      "Undergraduate degree with a quantitative component",
      "Working knowledge of Python or R",
    ],
    careers: ["Data scientist", "Analytics engineer", "Research analyst", "Product analyst"],
  },
  {
    slug: "meng-power-systems",
    title: "MEng Power Systems",
    award: "MEng",
    level: "Graduate",
    school: "School of Engineering",
    durationMonths: 18,
    credits: 180,
    mode: "Full time",
    annualFeeINR: 405000,
    summary:
      "Grid modelling, storage integration and protection engineering for a decarbonising network.",
    overview: [
      "The programme combines simulation coursework with a live laboratory microgrid on campus.",
      "A policy module covers tariff design, regulation and grid codes.",
    ],
    structure: [
      { title: "Term one", detail: "Power system analysis, protection, and power electronics." },
      { title: "Term two", detail: "Renewable integration, storage systems, and grid economics." },
      { title: "Term three", detail: "Microgrid project and dissertation." },
    ],
    entryRequirements: [
      "Undergraduate degree in electrical or energy engineering",
      "Two academic or professional references",
    ],
    careers: ["Grid engineer", "Energy systems analyst", "Protection engineer"],
  },
  {
    slug: "ma-design-research",
    title: "MA Design Research",
    award: "MA",
    level: "Graduate",
    school: "School of Design",
    durationMonths: 12,
    credits: 120,
    mode: "Full time",
    annualFeeINR: 340000,
    summary:
      "Methods-led design research for practitioners who need evidence behind their design decisions.",
    overview: [
      "Students run field studies, synthesise findings and publish a written thesis alongside a designed artefact.",
    ],
    structure: [
      { title: "Term one", detail: "Qualitative and quantitative methods, ethics, and synthesis." },
      { title: "Term two", detail: "Studio practice, evaluation, and writing for publication." },
      { title: "Term three", detail: "Thesis and exhibited artefact." },
    ],
    entryRequirements: [
      "Undergraduate degree in design, social science or a related discipline",
      "Portfolio and a research proposal of up to 1000 words",
    ],
    careers: ["Design researcher", "Service designer", "Strategy consultant", "Doctoral study"],
  },
  {
    slug: "pgcert-software-architecture",
    title: "PGCert Software Architecture",
    award: "PGCert",
    level: "Professional",
    school: "School of Computing",
    durationMonths: 9,
    credits: 60,
    mode: "Part time",
    annualFeeINR: 195000,
    summary:
      "Evening and weekend study for working engineers moving into architecture and technical leadership.",
    overview: [
      "Taught in two evening sessions each week with one Saturday workshop each month.",
      "Assessment is a portfolio of architecture decision records drawn from the student's own workplace.",
    ],
    structure: [
      { title: "Module one", detail: "Architectural styles, trade-off analysis, and documentation." },
      { title: "Module two", detail: "Data architecture, integration patterns, and migration strategy." },
      { title: "Module three", detail: "Reliability, cost modelling, and technical leadership." },
    ],
    entryRequirements: [
      "Three years of professional software engineering experience",
      "Employer support letter for study time",
    ],
    careers: ["Software architect", "Principal engineer", "Engineering manager"],
  },
  {
    slug: "pgcert-applied-analytics",
    title: "PGCert Applied Analytics",
    award: "PGCert",
    level: "Professional",
    school: "School of Data Science",
    durationMonths: 9,
    credits: 60,
    mode: "Part time",
    annualFeeINR: 175000,
    summary:
      "A practical analytics qualification for managers and analysts who own reporting and measurement.",
    overview: [
      "Every assignment uses the student's own organisational data or a supplied equivalent.",
    ],
    structure: [
      { title: "Module one", detail: "Measurement design, metric definition, and data quality." },
      { title: "Module two", detail: "Statistical reasoning and experimentation." },
      { title: "Module three", detail: "Communicating analysis to decision makers." },
    ],
    entryRequirements: [
      "Two years of professional experience in an analytical role",
      "Working knowledge of SQL",
    ],
    careers: ["Analytics manager", "Business analyst", "Operations lead"],
  },
  {
    slug: "pgdip-technology-management",
    title: "PGDip Technology Management",
    award: "PGDip",
    level: "Professional",
    school: "School of Technology Management",
    durationMonths: 15,
    credits: 120,
    mode: "Part time",
    annualFeeINR: 260000,
    summary:
      "Product, finance and operations for technical specialists taking responsibility for outcomes and budgets.",
    overview: [
      "Case-based teaching with a live consultancy project in the final term.",
    ],
    structure: [
      { title: "Term one", detail: "Product strategy, market analysis, and pricing." },
      { title: "Term two", detail: "Finance for technologists, operations, and procurement." },
      { title: "Term three", detail: "Consultancy project and leadership practice." },
    ],
    entryRequirements: [
      "Five years of professional experience, including two in a technical discipline",
      "Interview with the programme director",
    ],
    careers: ["Product manager", "Head of engineering", "Founder", "Programme director"],
  },
]

export const programmeLevels: ReadonlyArray<ProgrammeLevel> = [
  "Undergraduate",
  "Graduate",
  "Professional",
]

export function getProgramme(slug: string): Programme | undefined {
  return programmes.find((programme) => programme.slug === slug)
}

export function programmesByLevel(level: ProgrammeLevel): ReadonlyArray<Programme> {
  return programmes.filter((programme) => programme.level === level)
}
