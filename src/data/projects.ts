export interface Project {
  title: string;
  affiliation: string;
  date: string;
  description: string;
  longDescription: string;
  tags: string[];
  link: string;
  driveLink?: string;
  githubLink?: string;
  devpostLink?: string;
  image: string;
  liveLink?: string;
  featured?: boolean;
  role?: string;
  outcome?: string;
}

export const projects: Project[] = [
  {
    title: "Making account verification easier",
    affiliation: "Capital One",
    date: "Shipped",
    description: "A clearer path to proof of funds, from a customer-facing Help Center page to release-ready account verification.",
    longDescription: "Led the end-to-end design and launch of a centralized Help Center page explaining how customers can generate account verification documents. The page brings together document uses, step-by-step instructions, eligibility details, and answers to common questions. Alongside the help page, led final-stage User Acceptance Testing for the underlying account verification document feature: authored a comprehensive 125+ case test plan and coordinated 20 associate testers to support product quality and release readiness.",
    tags: ["Product Management", "Customer Experience", "UAT"],
    link: "https://www.linkedin.com/in/austyn-an-nguyen/",
    liveLink: "https://www.capitalone.com/help-center/checking-savings/account-verification-document/",
    image: "/images/projects/capital-one-account-verification.png",
    featured: true,
    role: "Help Center page lead · Feature UAT lead",
    outcome: "Launched Help Center page · 125+ test cases · 20 associate testers",
  },
  {
    title: "To Drink or Not to Drink",
    affiliation: "Policy & Economic Analysis",
    date: "Feb 2026",
    description:
      "A structured policy and economic analysis assessing the impact of Maryland's alcohol retail restrictions on state revenue and consumer behavior",
    longDescription:
      "Conducted a structured policy and economic analysis evaluating Maryland's Alcoholic Beverages Section 4-205 through cross-state benchmarking, per-capita tax revenue analysis, licensing data, and public testimony. Identified over $1.6M in unrealized annual revenue driven by cross-border purchasing and constrained retail access. Synthesized findings into an executive-ready narrative linking policy outcomes to key state budget priorities — including healthcare, education, transportation, and public safety — and delivered a data-backed recommendation to modernize alcohol retail policy while balancing regulatory and public health considerations.",
    tags: ["Policy Analysis", "Economic Research", "Data Analysis", "Public Health"],
    link: "https://www.linkedin.com/in/austyn-an-nguyen/",
    driveLink: "https://docs.google.com/presentation/d/1gM40ZbfNSMu-udQki7lpNhiOmLe5R0KdEg9f332_0GI/edit?usp=sharing",
    image: "/images/projects/maryland-alcohol-policy.png",
  },
  {
    title: "Personal Portfolio",
    affiliation: "~Me, Myself, and I!~",
    date: "Dec 2025 – Present",
    description:
      "A high-performance, theme-aware professional portfolio featuring custom interactive galleries and musical journey timelines",
    longDescription:
      "A bespoke digital portfolio built to showcase technical and creative milestones. This project features a custom-engineered 'Musical Journey' timeline, a hybrid lightbox gallery system for projects and photos, and a sophisticated theme engine that swaps between 'Space' and 'Light' modes using CSS variables and LocalStorage. The site is optimized for performance with Next.js App Router and utilizes Framer Motion for hardware-accelerated animations.",
    tags: [
      "Next.js",
      "TypeScript",
      "React",
      "Tailwind CSS",
      "Framer Motion",
      "Vercel",
    ],
    link: "https://www.linkedin.com/in/austyn-an-nguyen/",
    githubLink: "https://github.com/austyn-nguyen/portfolio",
    image: "/images/projects/personal-portfolio.png",
  },
  {
    title: "Electricity Price Hybrid Forecaster",
    featured: true,
    role: "Machine learning & energy market analysis",
    outcome: "A three-tier forecasting model for nine load centers",
    affiliation: "ElectricFish",
    date: "Aug 2025 – Dec 2025",
    description:
      "A three-tier hybrid model using XGBoost, LGBM, and NGBoost to predict CAISO market pricing with high accuracy",
    longDescription:
      "Developed a robust Day-Ahead Price Forecasting Model focusing on Locational Marginal Price (LMP) in the CAISO region. The system incorporates a three-tier hybrid architecture: LightGBM for spike classification, NGBoost for uncertainty estimation, and XGBoost for baselines. We pivoted to city-level data for nine major load centers to capture localized pricing required for operational needs.",
    tags: ["Python", "Machine Learning", "XGBoost", "Data Science"],
    link: "https://www.linkedin.com/in/austyn-an-nguyen/",
    image: "/images/projects/electricity-price-forecaster.png",
  },
  {
    title: "Infusion Workflow Optimization",
    featured: true,
    role: "Workflow research & process mapping",
    outcome: "Identified bottlenecks in medication order checking",
    affiliation: "CHEPS / Brighton Center for Specialty Care",
    date: "Aug 2025 – Oct 2025",
    description:
      "Process mapping and data collection to identify bottlenecks in medication order checking for infusion nurses",
    longDescription:
      "The nurses at Brighton Center for Specialty Care (BCSC) Infusion Clinic flagged delays caused by unactionable medication orders. Using process mapping, shadowing, and intensive data collection, I documented the infusion order checking workflow. This documentation identified critical bottlenecks and provided data-driven opportunities to streamline patient care.",
    tags: ["Healthcare Engineering", "Process Mapping", "Data Collection"],
    link: "https://www.linkedin.com/in/austyn-an-nguyen/",
    image: "/images/projects/infusion-workflow-poster.png",
  },
  {
    title: "The WiLi Watch",
    affiliation: "MHacks (University of Michigan)",
    date: "Sep 2024",
    description:
      "A smart home wristband utilizing cloud-based LLMs for wireless environment control and voice-automated tasks",
    longDescription:
      "Collaborated with a team of 3 to develop a wearable device enabling wireless interaction with smart home environments. The system uses a cloud-based LLM to predict user needs based on verbal cues. Integrated a Free WiLi device with an Orange Pi 5 and Arduino Nano, using Groq, Whisper, and Cartesia for speech-to-text interfacing.",
    tags: ["Python", "LLM", "Arduino", "Hardware"],
    link: "https://www.linkedin.com/in/austyn-an-nguyen/",
    devpostLink: "https://devpost.com/software/wili-watch",
    image: "/images/projects/wili-watch.png",
  },
  {
    title: "Beverage Delivery Robot",
    affiliation: "University of Michigan",
    date: "Aug 2024 – Dec 2024",
    description:
      "An autonomous omnidirectional robot and Java simulation designed to serve students in the Duderstadt Library",
    longDescription:
      "Developed a beverage delivery bot for the Duderstadt Library. Modified a VANLINNY omnidirectional robot for autonomous patrolling and developed a Java-based computer simulation to model robot navigation across various floors of the library. Conducted user interviews and surveys to gain insights into study habits and ethical opinions.",
    tags: ["Java", "C++", "CAD", "Robotics"],
    link: "https://www.linkedin.com/in/austyn-an-nguyen/",
    image: "/images/projects/beverage-delivery-robot.png",
  },
  {
    title: "FAIR-Compliant Metadata Standard",
    affiliation: "National Institute of Standards and Technology (NIST)",
    date: "May 2024 – Aug 2024",
    description:
      "Developing machine-ready RO-Crate standards for phase field simulations to enhance research data portability",
    longDescription:
      "Discusses the adoption of the RO-Crate standard to describe phase field simulations in computational materials science. Used software libraries to demonstrate how simulations can be packaged with metadata including computational environments, numerical schemes, and problem specifications, addressing deficiencies in machine-ready semantic web standards.",
    tags: [
      "Python",
      "Shell Scripting",
      "Unix/Linux",
      "Pandas",
      "Matplotlib",
      "Git",
      "GitHub",
    ],
    link: "https://www.linkedin.com/in/austyn-an-nguyen/",
    githubLink: "https://github.com/austyn-nguyen/RO-Crate",
    image: "/images/projects/fair-metadata-standard.png",
  },
  {
    title: "Manduca sexta Feeding Inductions",
    affiliation: "Howard Community College",
    date: "Aug 2023 – Dec 2023",
    description:
      "An investigation into the dietary flexibility and adaptability of tobacco hornworm larvae across different plant families",
    longDescription:
      "Investigated feeding inductions by rearing larvae on non-solanaceous plants from the Fabaceae and Cruciferae families. The study explores the dietary versatility of Manduca sexta to better understand extent of their adaptability when raised on different plant families outside their typical host range.",
    tags: ["LaTeX", "Biology Research"],
    link: "https://www.linkedin.com/in/austyn-an-nguyen/",
    image: "/images/projects/manduca-sexta-research.png",
  },
];

