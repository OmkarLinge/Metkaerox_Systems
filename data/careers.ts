export interface JobOpening {
  department: string;
  id: string;
  mode: string;
  title: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  idealFor: string;
}

export const jobOpenings: JobOpening[] = [
  {
    department: "Engineering",
    id: "embedded-engineer",
    mode: "On-site",
    title: "Software Embedded Engineer",
    location: "Pune, India",
    type: "Full-time",
    experience: "0–3 years",
    description: "Metkaerox Systems is looking for passionate Software Embedded Engineers to join our growing UAV & robotics team in Pune. You will be building, testing, and deploying software on actual hardware used in drones & robotics.",
    responsibilities: [
      "Build and test embedded software for flight controllers and companion computers",
      "Integrate sensors, telemetry, and payload control modules",
      "Support field validation, debugging, and reliability improvements",
      "Document firmware behavior, test cases, and deployment notes"
    ],
    requirements: [
      "Strong embedded software knowledge",
      "Programming skills in Python, C++, or C",
      "Hands-on experience with Raspberry Pi, Jetson Nano, ESP32/ESP8266",
      "Hardware interfacing & system integration experience",
      "Exposure to UAV, robotics, or industrial automation projects",
      "Ability to work on real-world drone systems (not just simulations)"
    ],
    idealFor: "Candidates who love building, testing, and deploying software on actual hardware used in drones & robotics."
  },
  {
    department: "Autonomy",
    id: "uav-autonomy-engineer",
    mode: "On-site",
    title: "UAV Autonomy Engineer",
    location: "Pune, India",
    type: "Full-time",
    experience: "2–5 years",
    description: "Design autonomy workflows for navigation, mission execution, mapping, and operator assistance across Metkaerox UAV platforms.",
    responsibilities: [
      "Develop mission planning, waypoint, and fail-safe autonomy features",
      "Prototype perception and navigation workflows with field data",
      "Work with embedded and mechanical teams to validate system behavior",
      "Create repeatable test procedures for flight-readiness reviews"
    ],
    requirements: [
      "Experience with robotics, UAVs, ROS, PX4, ArduPilot, or similar stacks",
      "Strong Python/C++ fundamentals",
      "Understanding of sensors, mapping, localization, or path planning",
      "Comfortable testing software with real hardware constraints"
    ],
    idealFor: "Engineers who can bridge algorithms, field constraints, and production UAV behavior."
  },
  {
    department: "Operations",
    id: "flight-operations-specialist",
    mode: "Field",
    title: "Flight Operations Specialist",
    location: "Pune, India",
    type: "Full-time",
    experience: "1–4 years",
    description: "Own pre-flight readiness, field coordination, operational documentation, and demonstration support for customer missions.",
    responsibilities: [
      "Plan and execute field trials, demos, and customer flight operations",
      "Maintain mission checklists, logs, and safety documentation",
      "Coordinate with engineering teams on field feedback and fixes",
      "Support training and operational handover for customers"
    ],
    requirements: [
      "Experience in UAV operations, aviation, robotics, or field engineering",
      "Strong safety discipline and documentation habits",
      "Ability to travel for demonstrations and deployments",
      "Clear communication with customers and internal teams"
    ],
    idealFor: "Operators who enjoy structured field work, technical coordination, and mission ownership."
  },
  {
    department: "Business",
    id: "enterprise-sales-associate",
    mode: "Hybrid",
    title: "Enterprise Sales Associate",
    location: "Pune, India",
    type: "Full-time",
    experience: "1–3 years",
    description: "Support enterprise, government, and industrial conversations from initial inquiry through demo coordination and proposal follow-up.",
    responsibilities: [
      "Qualify inbound leads and map mission requirements",
      "Coordinate demos, proposals, and technical discovery calls",
      "Maintain CRM notes and follow-up discipline",
      "Work with product teams to prepare customer-ready material"
    ],
    requirements: [
      "Experience in B2B sales, technical sales, or customer success",
      "Strong writing, presentation, and follow-up skills",
      "Interest in UAVs, robotics, defense, agriculture, or industrial technology",
      "Ability to understand technical products and customer workflows"
    ],
    idealFor: "Commercial teammates who can turn complex drone requirements into clear next steps."
  }
];

export const benefits = [
  { title: "Cutting-edge Tech", description: "Work with the latest in UAV, AI, and robotics hardware." },
  { title: "Mission-driven", description: "Build solutions that save lives, improve security, and protect the environment." },
  { title: "Growth & Ownership", description: "Rapidly scale your career in a fast-paced deep-tech startup environment." },
  { title: "Make in India", description: "Be part of a team designing and building world-class drones right here in India." }
];
