import type { PartDefinition } from "./types"

/** Page numbers match pdf.js 1-based indices from VFW V1.0 (709 pages). */
export const parts: PartDefinition[] = [
  {
    number: "INTRO",
    title: "Why Venezuela",
    chapters: [
      { number: 0, title: "The $6 Trillion Opportunity", page: 9 },
      { number: 0, title: "Why Now", page: 14 },
    ],
  },
  {
    number: "I",
    title: "Venezuela's Case for Transformation",
    chapters: [
      { number: 1, title: "Venezuela at the Inflection Point", page: 17 },
      { number: 2, title: "Venezuela's Structural Endowments — A Platform Without Parallel", page: 23 },
      { number: 3, title: "The Global Window — Capital, Demand, and Strategy in Alignment", page: 31 },
    ],
  },
  {
    number: "II",
    title: "Historical Precedents & the Scale Imperative",
    chapters: [
      { number: 4, title: "How Nations Are Rebuilt — Lessons That Apply to Venezuela", page: 39 },
      { number: 5, title: "Capital Intensity Today — What First-Class Development Actually Costs", page: 45 },
      { number: 6, title: "Why Venezuela Can Compress Several Decades into One", page: 49 },
    ],
  },
  {
    number: "III",
    title: "The 10-Year National Blueprint",
    chapters: [
      { number: 7, title: "Vision 2036 — A First-Class Global Economy", page: 57 },
      { number: 8, title: "National Spatial Strategy — Corridors, Cities, and Platforms", page: 63 },
      { number: 9, title: "Phasing the Transformation — A Decade of Execution", page: 67 },
      { number: 10, title: "From Blueprint to Bankable Reality", page: 70 },
    ],
  },
  {
    number: "IV",
    title: "The National Investment Program",
    chapters: [
      { number: 11, title: "Overview of the National Investment Program", page: 73 },
      { number: 12, title: "Energy Superpower Build-Out — Oil, Gas, LNG & Green Hydrogen", page: 90 },
      { number: 13, title: "Power, Water & National Resilience", page: 114 },
      { number: 14, title: "Transport & Logistics — Continental Connectivity", page: 138 },
      { number: 15, title: "Ports & Maritime Power", page: 162 },
      { number: 16, title: "Cities, Housing & Urban Transformation", page: 187 },
      { number: 17, title: "Health, Education & Human Capital", page: 211 },
      { number: 18, title: "Digital, AI & Technological Sovereignty", page: 243 },
      { number: 19, title: "Industry, SEZs & Value-Added Manufacturing", page: 271 },
      { number: 20, title: "Agriculture & Agro-Industrial Power", page: 296 },
      { number: 21, title: "Tourism & Global Destination Strategy", page: 325 },
      { number: 22, title: "Justice & State Capacity", page: 355 },
      { number: 23, title: "National Security and Defense", page: 380 },
      { number: 24, title: "Financial System & Capital Markets", page: 405 },
      { number: 25, title: "Environmental Remediation", page: 430 },
      { number: 26, title: "Consolidated Investment Summary", page: 461 },
      { number: 27, title: "The Infrastructure Paradox & The Southern Sovereign Matrix", page: 478 },
    ],
  },
  {
    number: "V",
    title: "Financing, Governance & Execution",
    chapters: [
      {
        number: 28,
        title:
          "The VFW Fiscal Constitution: Low Taxes, Citizen Ownership, and Reconstruction",
        page: 496,
      },
      { number: 29, title: "The First Three Years: Institutional Reset Phase", page: 503 },
      { number: 30, title: "The National Reconstruction Council (NRC)", page: 521 },
      {
        number: 31,
        title: "The Constitutional Statute for the Reconstruction of the Republic (CSRR)",
        page: 529,
      },
      { number: 0, title: "Annex — Emergency Fiscal Program (Year 1)", page: 544 },
    ],
  },
  {
    number: "VI",
    title: "Capital, Partners & Allocation",
    chapters: [
      { number: 32, title: "The Partnership Strategy", page: 553 },
      { number: 33, title: "Sovereign & Institutional Capital", page: 565 },
      { number: 34, title: "Private Capital Allocation by Sector", page: 581 },
      { number: 35, title: "Investment Structures & Entry Pathways", page: 590 },
    ],
  },
  {
    number: "VII",
    title: "Technology Leapfrog",
    chapters: [
      { number: 36, title: "The Technology Leapfrog Doctrine", page: 605 },
      { number: 37, title: "AI, Quantum & Digital Sovereignty", page: 619 },
      { number: 38, title: "Green Hydrogen & The Energy Technology Frontier", page: 629 },
      { number: 39, title: "Biotech, Genomics & Synthetic Biology", page: 638 },
      { number: 40, title: "Space, Orbital Economy & The Long Frontier", page: 648 },
    ],
  },
  {
    number: "VIII",
    title: "Venezuela's Global Role",
    chapters: [
      { number: 41, title: "Venezuela's New Geopolitical Role", page: 658 },
      { number: 42, title: "Why This Model Matters — A Manifesto for Reconstruction", page: 674 },
    ],
  },
  {
    number: "APPENDIX",
    title: "The Constitutional Statute for the Reconstruction of the Republic",
    chapters: [
      {
        number: 0,
        title: "Constitutional Statute for the Reconstruction of the Republic",
        page: 686,
      },
      { number: 0, title: "Title I — Fundamental Principles", page: 688 },
      { number: 0, title: "Title II — Rights, Freedoms and Duties", page: 688 },
      { number: 0, title: "Title III — The Economic Order", page: 692 },
      { number: 0, title: "Title IV — The Organization of Public Power", page: 696 },
      { number: 0, title: "Title V — The State Control Bodies", page: 702 },
      { number: 0, title: "Title VI — Foreign Policy and Alliances", page: 704 },
      { number: 0, title: "Title VII — Supremacy and Reform", page: 705 },
    ],
  },
]
