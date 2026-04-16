export interface JobOpening {
  id: string;
  title: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  requirements: string[];
  idealFor: string;
}

export const jobOpenings: JobOpening[] = [
  {
    id: "embedded-engineer",
    title: "Software Embedded Engineer",
    location: "Pune, India",
    type: "Full-time",
    experience: "0–3 years",
    description: "Metkaerox Systems is looking for passionate Software Embedded Engineers to join our growing UAV & robotics team in Pune. You will be building, testing, and deploying software on actual hardware used in drones & robotics.",
    requirements: [
      "Strong embedded software knowledge",
      "Programming skills in Python, C++, or C",
      "Hands-on experience with Raspberry Pi, Jetson Nano, ESP32/ESP8266",
      "Hardware interfacing & system integration experience",
      "Exposure to UAV, robotics, or industrial automation projects",
      "Ability to work on real-world drone systems (not just simulations)"
    ],
    idealFor: "Candidates who love building, testing, and deploying software on actual hardware used in drones & robotics."
  }
];

export const benefits = [
  { title: "Cutting-edge Tech", description: "Work with the latest in UAV, AI, and robotics hardware." },
  { title: "Mission-driven", description: "Build solutions that save lives, improve security, and protect the environment." },
  { title: "Growth & Ownership", description: "Rapidly scale your career in a fast-paced deep-tech startup environment." },
  { title: "Make in India", description: "Be part of a team designing and building world-class drones right here in India." }
];
