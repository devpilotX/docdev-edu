export type NavItem = {
  label: string
  href: string
  description?: string
  children?: ReadonlyArray<{ label: string; href: string; description: string }>
}

export const site = {
  name: "DarkDev EDU",
  shortName: "DarkDev",
  legalName: "DarkDev EDU Institute of Technology and Applied Sciences",
  tagline: "An institute built for rigorous, useful work.",
  description:
    "DarkDev EDU is an institute of technology and applied sciences offering undergraduate, graduate and professional programmes in computing, engineering, data science and design.",
  founded: 2011,
  address: {
    line1: "Bailey Road, Sheikhpura",
    line2: "Patna, Bihar 800014",
    country: "India",
  },
  contact: {
    admissionsEmail: "admissions@docdev.edu",
    generalEmail: "hello@docdev.edu",
    phone: "+91 612 400 1100",
    whatsapp: "+91 98765 43210",
    officeHours: "Monday to Saturday, 09:00–21:00 IST",
  },
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "GitHub", href: "https://github.com/devpilotX" },
    { label: "YouTube", href: "https://www.youtube.com/" },
  ],
} as const

export const primaryNav: ReadonlyArray<NavItem> = [
  {
    label: "Academics",
    href: "/academics",
    description: "Schools, programmes and the academic calendar.",
  },
  {
    label: "Admissions",
    href: "/admissions",
    description: "Entry routes, deadlines, fees and scholarships.",
  },
  {
    label: "Research",
    href: "/research",
    description: "Centres, laboratories and published work.",
  },
  {
    label: "Campus",
    href: "/campus",
    description: "Facilities, housing, societies and student support.",
  },
  { label: "Faculty", href: "/faculty", description: "The people who teach here." },
  { label: "News", href: "/news", description: "Announcements and events." },
  { label: "Contact", href: "/contact", description: "Find and reach the campus." },
]

export const footerNav: ReadonlyArray<{
  title: string
  links: ReadonlyArray<{ label: string; href: string }>
}> = [
  {
    title: "Study",
    links: [
      { label: "Undergraduate", href: "/academics?level=Undergraduate" },
      { label: "Graduate", href: "/academics?level=Graduate" },
      { label: "Professional", href: "/academics?level=Professional" },
      { label: "Fees and funding", href: "/admissions/fees" },
    ],
  },
  {
    title: "Institute",
    links: [
      { label: "About", href: "/about" },
      { label: "Research", href: "/research" },
      { label: "Faculty", href: "/faculty" },
      { label: "Events", href: "/events" },
    ],
  },
  {
    title: "Apply",
    links: [
      { label: "How to apply", href: "/admissions" },
      { label: "Enquiry form", href: "/admissions/enquiry" },
      { label: "Open days", href: "/events" },
      { label: "Contact admissions", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy notice", href: "/privacy" },
      { label: "Accessibility", href: "/accessibility" },
      { label: "Terms of use", href: "/terms" },
    ],
  },
]

export const instituteStats: ReadonlyArray<{ value: string; label: string }> = [
  { value: "1:8", label: "Faculty to student ratio" },
  { value: "42", label: "Degree programmes" },
  { value: "96%", label: "Graduate outcomes at six months" },
  { value: "18", label: "Research centres and laboratories" },
]
