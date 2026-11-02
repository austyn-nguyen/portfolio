interface Project {
  title: string;
  bullets: string[];
}

interface Role {
  title: string;
  date: string;
  highlight: string;
  description: string[];
  projects?: Project[];
}

export interface Experience {
  company: string;
  location: string;
  logo: string;
  roles: Role[];
}

export const experiences: Experience[] = [
  {
    company: "Capital One",
    location: "McLean, VA",
    logo: "/images/organizations/capital-one-logo.jpeg",
    roles: [
      {
        title: "Product Management Intern",
        date: "June 2026 – Aug 2026",
        highlight: "Led a Help Center page from design to launch, and coordinated 20 associate testers across 125+ UAT cases for account verification.",
        description: [
          "Authored PRDs and technical specifications for Bank Statement modernization, translating system constraints into sprint-ready requirements and OKRs targeting $10M in projected savings and $475K annual OpEx reduction.",
          "Spearheaded competitive analysis across 6 peer banks (e.g., Wells Fargo, JPMC, Stripe) to design a customer-facing help page for VOD — surfacing UX patterns that shaped go-to-market strategy and feature roadmap prioritization.",
        ],
        projects: [
          {
            title: "Product Strategy & Execution",
            bullets: [
              "Defined UI, data-availability, and API requirements with 2 engineering leads across 2 sprint teams — leading sprint planning and backlog grooming across the SDLC — launching 2 self-service products serving 20M+ customers.",
              "Conducted 7-method customer research (call listening, 28 customer/associate interviews, competitive analysis across 26 services) — mapping 3 customer journeys and 4 behavioral modes to drive data-driven product decisions.",
              "Authored a 125+ case test plan and coordinated 20 associate testers for final-stage UAT of the account verification document feature, covering navigation, PDF generation, and edge-case account rules. Managed launch sequencing across 3 legacy teams previously handling approximately 1,000 manual calls per six months.",
              "Presented product strategy and research findings to VP-level leadership at the monthly Banking \"Brewing Concepts\" forum, and partnered cross-functionally with Legal, Risk, Compliance, and Audit (LRCA) teams to ensure regulatory alignment and mitigate operational risks.",
            ],
          },
        ],
      },
    ],
  },
  {
    company: "CHEPS",
    location: "Ann Arbor, MI",
    logo: "/images/organizations/cheps-logo.png",
    roles: [
      {
        title: "Research Assistant, Emergency Department Operations",
        date: "Jan 2026 – Apr 2026",
        highlight: "Mapped radiology workflows and analyzed patient data to understand where emergency care gets held up.",
        description: [
          "Spearheading data-driven interventions for the Reducing Emergency Department Crowding (REDC) team to mitigate systemic patient boarding.",
          "Investigating imaging delays for post-spinal surgery patients, addressing baseline wait times of 4+ months that drive acute ED surges.",
          "Conducting ethnographic observations of radiology workflows to map communication gaps between physicians and technicians.",
        ],
        projects: [
          {
            title: "Healthcare Operations & Clinical Strategy",
            bullets: [
              "Synthesized ED MRI and patient admission datasets using Python to model \"day-of\" behaviors and identify 2x throughput bottlenecks.",
              "Analyzed the fiscal and operational impact of 'ED-as-Primary-Access' trends for post-operative surgical complications.",
              "Uncovered a fundamental lack of consensus on the operational definition of 'STAT' orders across multidisciplinary teams.",
              "Architected a proposed communication framework to standardize urgency protocols between Neurosurgery and Radiology.",
            ],
          },
        ],
      },
      {
        title: "Research Assistant, Cancer Center Operations",
        date: "Aug 2025 – Dec 2025",
        highlight: "Traced patient journeys and referral workflows to find friction in cancer care.",
        description: [
          "Spearheading cross-functional operational improvements for the Enhancing Cancer Center Operations (ECCO) team to improve patient throughput.",
        ],
        projects: [
          {
            title: "Product Strategy & Systems Design",
            bullets: [
              "Developed complex flowcharts to map clinical patient journeys, identifying critical friction points in the referral lifecycle.",
              "Engineered an interactive restructured org-chart proposal using code-based visualization to improve communication velocity.",
              "Leveraged Excel PivotTables and advanced data modeling to synthesize breast cancer referral datasets.",
              "Designed a phone tag intervention strategy, utilizing data-driven spreadsheets to quantify and reduce patient outreach delays.",
            ],
          },
        ],
      },
    ],
  },
  {
    company: "Kite & Key Partners",
    location: "Ann Arbor, MI",
    logo: "/images/organizations/kite-and-key-partners-logo.jpeg",
    roles: [
      {
        title: "Student Consultant, AI & Economic Research Analyst",
        date: "Jan 2026 – Apr 2026",
        highlight: "Built an AI proof of concept that brought healthcare policy analysis from weeks to hours.",
        description: [
          "Designed and implemented an agentic AI system to automate economic impact analysis for state healthcare legislation, transforming a manual research process into a scalable, high-speed pipeline.",
          "Managed client relations and synthesized qualitative insights from legislative and academic experts to shape product requirements and validate the system's economic models.",
        ],
        projects: [
          {
            title: "Agentic AI Workflow for Economic Impact Analysis",
            bullets: [
              "Architected an end-to-end agentic AI system that autonomously researches and drafts economic impact analyses for 16 concurrent state healthcare bills, entirely replacing a time-intensive, manual process.",
              "Delivered a proof-of-concept compressing analysis timelines from weeks to hours; co-authored a research paper on LLM-driven economic analysis validating technical feasibility with IHPI faculty and opening policy access at scale.",
              "Facilitated weekly client check-ins and conducted primary research by interviewing 4 key stakeholder groups—including Representative Rheingans, Michigan4SinglePayer advocates, medical experts, and pioneer healthcare economist Gerald Friedman.",
            ],
          },
        ],
      },
    ],
  },
  {
    company: "ElectricFish",
    location: "Detroit, MI",
    logo: "/images/organizations/electricfish-logo.jpeg",
    roles: [
      {
        title: "Product Management Intern",
        date: "Aug 2025 – Dec 2025",
        highlight: "Turned five years of energy market data into insights for battery deployment and procurement.",
        description: [
          "Informing strategic procurement and reducing energy risk exposure through large-scale market analysis.",
          "Modelled temporal and locational energy loss patterns to optimize battery deployment strategies.",
        ],
        projects: [
          {
            title: "Market Intelligence & Agile Ops",
            bullets: [
              "Analyzed 5 years of ERCOT/CAISO market data to isolate 7+ key cost drivers.",
              "Orchestrated 1-week team sprints and managed Jira dashboards to ensure 100% adherence to project timelines.",
              "Directed task delegation and facilitated sprint planning and retrospectives to optimize team velocity.",
              "Collaborated with mentors to align technical project milestones with company-wide energy market objectives.",
            ],
          },
        ],
      },
    ],
  },
  {
    company: "The Chemours Company",
    location: "Wilmington, DE",
    logo: "/images/organizations/chemours-logo.jpg",
    roles: [
      {
        title: "Business Intelligence Intern",
        date: "May 2025 – Aug 2025",
        highlight: "Reduced dashboard size by 25% and connected business intelligence workflows with version control.",
        description: [
          "Modernizing data infrastructure through SQL-based transformations and Power Query migration.",
          "Establishing robust version control and standardized methodologies for cross-functional analyst teams.",
        ],
        projects: [
          {
            title: "BI Product Development",
            bullets: [
              "Reduced dashboard size by 25% (400GB to <300GB) via optimized data modeling.",
              "Developed SQL-backed Power BI dashboards for real-time visibility into S&P global trade data.",
              "Automated equipment MTBF estimation using custom DAX formulas to enable proactive reliability engineering.",
              "Established Power BI–Git DevOps integration for a team of 10+ analysts.",
            ],
          },
        ],
      },
    ],
  },
  {
    company: "Michigan Medicine: Watson Lab",
    location: "Ann Arbor, MI",
    logo: "/images/organizations/michigan-medicine-logo.jpeg",
    roles: [
      {
        title: "Data Engineer",
        date: "Jan 2025 – May 2025",
        highlight: "Built tools to organize 4 TB of neurological recordings and make research data easier to work with.",
        description: [
          "Architecting high-performance data pipelines for large-scale neurological research datasets.",
          "Correlating physiological metrics with clinical events through advanced API integration.",
        ],
        projects: [
          {
            title: "Neuro-Data Engineering",
            bullets: [
              "Engineered automated shell scripts to categorize and index 4TB of neuro recordings.",
              "Developed MatLab scripts via Spike2 API to parse 2TB of spike data.",
              "Increased data retrieval speed and accessibility for primary research investigators through automated indexing.",
            ],
          },
        ],
      },
    ],
  },
  {
    company: "NIST",
    location: "Gaithersburg, MD",
    logo: "/images/organizations/nist-logo.png",
    roles: [
      {
        title: "Software Engineer Intern",
        date: "May 2024 – Aug 2024",
        highlight: "Worked on automation for 500+ GB of simulation data and more portable research metadata.",
        description: [
          "Building scalable automation solutions for national-level simulation data processing.",
          "Bridging technical development with stakeholder roadmaps to ensure research community adoption.",
        ],
        projects: [
          {
            title: "Workflow Automation & Open Source",
            bullets: [
              "Architected a solution to process 500+ GB of simulation data.",
              "Translated complex technical workflows into actionable product roadmaps for interdisciplinary researchers.",
              "Partnered with open-source developers to establish standardized methodologies and improved documentation.",
            ],
          },
        ],
      },
    ],
  },
  {
    company: "UMBC",
    location: "Baltimore, MD",
    logo: "/images/organizations/umbc-logo.png",
    roles: [
      {
        title: "HCI Researcher",
        date: "June 2023 – Aug 2024",
        highlight: "Brought together insights from 1,300+ research papers on patient-facing AI and haptic therapy.",
        description: [
          "Evaluating product-market fit for patient-facing AI tools through comprehensive clinical literature synthesis.",
          "Contributing to medical-tech product development guidelines via systematic reviews.",
        ],
        projects: [
          {
            title: "AI Healthcare Research",
            bullets: [
              "Synthesized insights from 1,300+ research papers to identify AI tool opportunities.",
              "Co-authored a PRISMA-standard systematic review on AI and haptic therapy.",
              "Mapped user experience requirements for next-generation medical device interfaces.",
            ],
          },
        ],
      },
    ],
  },
];

