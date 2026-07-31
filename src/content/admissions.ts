export const admissionSteps: ReadonlyArray<{
  step: string
  title: string
  detail: string
}> = [
  {
    step: "01",
    title: "Submit an enquiry",
    detail:
      "Tell us the programme and your background. The admissions office replies in writing within one working day.",
  },
  {
    step: "02",
    title: "Apply",
    detail:
      "One application per applicant, covering academic record, evidence of prior work and a short technical statement.",
  },
  {
    step: "03",
    title: "Review and interview",
    detail:
      "Two academics read every application. Shortlisted applicants have a thirty minute interview, on campus or online.",
  },
  {
    step: "04",
    title: "Offer and enrolment",
    detail:
      "Conditional offers are issued within ten working days of interview, with fee, funding and scholarship detail included.",
  },
]

export const admissionDeadlines: ReadonlyArray<{
  intake: string
  applyBy: string
  interviews: string
  termBegins: string
}> = [
  {
    intake: "Autumn 2026",
    applyBy: "5 September 2026",
    interviews: "July to September 2026",
    termBegins: "5 October 2026",
  },
  {
    intake: "Spring 2027",
    applyBy: "10 January 2027",
    interviews: "November 2026 to January 2027",
    termBegins: "8 February 2027",
  },
  {
    intake: "Autumn 2027",
    applyBy: "4 September 2027",
    interviews: "July to September 2027",
    termBegins: "4 October 2027",
  },
]

export const scholarships: ReadonlyArray<{
  name: string
  award: string
  eligibility: string
}> = [
  {
    name: "Merit scholarship",
    award: "25% to 100% of tuition",
    eligibility:
      "Awarded on academic record and evidence of prior work. No separate application; every applicant is considered.",
  },
  {
    name: "Access bursary",
    award: "Up to 100% of tuition plus a living stipend",
    eligibility:
      "Means tested, for applicants whose household income falls below the published threshold.",
  },
  {
    name: "Research assistantship",
    award: "Fee waiver plus a monthly stipend",
    eligibility:
      "For graduate applicants joining a research centre for at least ten hours a week.",
  },
  {
    name: "Employer-sponsored study",
    award: "15% fee reduction",
    eligibility:
      "For professional programme students whose employer funds the tuition in full.",
  },
]

export const feesNotes: ReadonlyArray<string> = [
  "Tuition is quoted per academic year and is fixed for the duration of the programme.",
  "A refundable caution deposit of ₹10,000 is payable on enrolment.",
  "Fees may be paid in two instalments per year at no additional cost.",
  "Withdrawal within fourteen days of enrolment carries a full refund of tuition.",
]
