export type ResearchCentre = {
  slug: string
  name: string
  lead: string
  summary: string
  outputs: ReadonlyArray<string>
}

export const researchCentres: ReadonlyArray<ResearchCentre> = [
  {
    slug: "replicated-systems",
    name: "Centre for Replicated Systems",
    lead: "Professor A. R. Natarajan",
    summary:
      "Correctness and performance of coordination protocols, with an emphasis on systems that must survive partial failure.",
    outputs: [
      "Open source verification harness for replicated logs",
      "Annual reliability engineering symposium",
    ],
  },
  {
    slug: "measurement-lab",
    name: "Measurement Laboratory",
    lead: "Professor Meera Vaidya",
    summary:
      "Study design and causal identification for public health, education and civic programmes.",
    outputs: ["Open study protocols", "Methodology clinics for partner agencies"],
  },
  {
    slug: "microgrid-lab",
    name: "Microgrid Laboratory",
    lead: "Dr J. Okonkwo",
    summary:
      "A live campus microgrid used to test storage integration, protection schemes and demand response.",
    outputs: ["Grid-code test reports", "Storage integration reference designs"],
  },
  {
    slug: "air-quality-network",
    name: "Urban Air Quality Network",
    lead: "Dr R. Castillo",
    summary:
      "A city-wide low-cost sensor network with a published calibration methodology and an annual open data release.",
    outputs: ["Annual open dataset", "Calibration methodology paper"],
  },
  {
    slug: "security-clinic",
    name: "Security Clinic",
    lead: "Dr K. Adeyemi",
    summary:
      "Supervised student teams performing security reviews for non-profit and civic organisations at no cost.",
    outputs: ["Public remediation guides", "Threat modelling workshops"],
  },
  {
    slug: "studio-research",
    name: "Studio Research Group",
    lead: "Professor S. Bhattacharya",
    summary:
      "Design research on reading, notation and interfaces for low-bandwidth and multilingual contexts.",
    outputs: ["Open type specimens", "Field study reports"],
  },
]
