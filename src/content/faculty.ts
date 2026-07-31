export type FacultyMember = {
  slug: string
  name: string
  title: string
  school: string
  interests: ReadonlyArray<string>
  biography: string
  initials: string
}

export const faculty: ReadonlyArray<FacultyMember> = [
  {
    slug: "a-r-natarajan",
    name: "Professor A. R. Natarajan",
    title: "Dean of Computing",
    school: "School of Computing",
    interests: ["Distributed consensus", "Storage engines", "Formal methods"],
    biography:
      "Twenty-two years building storage and coordination systems in industry before joining the institute. Leads the replicated systems group and teaches the consensus module.",
    initials: "AN",
  },
  {
    slug: "meera-vaidya",
    name: "Professor Meera Vaidya",
    title: "Chair of Statistics",
    school: "School of Data Science",
    interests: ["Causal inference", "Experiment design", "Survey methodology"],
    biography:
      "Works on identification strategies for observational health data and advises two state health programmes on measurement design.",
    initials: "MV",
  },
  {
    slug: "j-okonkwo",
    name: "Dr J. Okonkwo",
    title: "Reader in Control Engineering",
    school: "School of Engineering",
    interests: ["Nonlinear control", "Robotics", "Embedded systems"],
    biography:
      "Runs the campus microgrid laboratory and supervises the fourth-year industrial projects with partner manufacturers.",
    initials: "JO",
  },
  {
    slug: "h-lindqvist",
    name: "Dr H. Lindqvist",
    title: "Senior Lecturer in Machine Intelligence",
    school: "School of Computing",
    interests: ["Representation learning", "Evaluation", "Model efficiency"],
    biography:
      "Focuses on measurement: how model claims are evidenced, reproduced and reported. Convenes the MSc dissertation panel.",
    initials: "HL",
  },
  {
    slug: "s-bhattacharya",
    name: "Professor S. Bhattacharya",
    title: "Dean of Design",
    school: "School of Design",
    interests: ["Typography", "Interaction design", "Design pedagogy"],
    biography:
      "Founded the studio programme and continues to run the fortnightly public critique. Practised as a type designer for fifteen years.",
    initials: "SB",
  },
  {
    slug: "r-castillo",
    name: "Dr R. Castillo",
    title: "Lecturer in Environmental Science",
    school: "School of Applied Sciences",
    interests: ["Air quality", "Sensor networks", "Environmental policy"],
    biography:
      "Maintains the institute's open air-quality sensor network across the city and publishes the annual data release.",
    initials: "RC",
  },
  {
    slug: "p-iyer",
    name: "Professor P. Iyer",
    title: "Director of Admissions",
    school: "School of Technology Management",
    interests: ["Access and participation", "Assessment design", "Technology policy"],
    biography:
      "Redesigned the institute's admissions process around evidenced work rather than entrance essays, and reports annually on access outcomes.",
    initials: "PI",
  },
  {
    slug: "k-adeyemi",
    name: "Dr K. Adeyemi",
    title: "Senior Lecturer in Security",
    school: "School of Computing",
    interests: ["Applied cryptography", "Threat modelling", "Secure operations"],
    biography:
      "Leads the security clinic, where student teams conduct supervised reviews for local non-profit organisations.",
    initials: "KA",
  },
]
