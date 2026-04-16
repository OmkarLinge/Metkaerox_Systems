export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  category: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "post1",
    title: "The Rise of Autonomous Drone Fleets",
    excerpt: "Exploring how swarm intelligence is transforming industrial inspections and defense surveillance.",
    content: "Full content for autonomous drone fleets...",
    author: "Metkaerox Tech Team",
    date: "April 10, 2026",
    image: "/products/flyastros.jpg",
    category: "Technology"
  },
  {
    id: "post2",
    title: "Drones in Agriculture: A New Era",
    excerpt: "How precision mapping and spraying are helping farmers maximize yield and reduce chemical waste.",
    content: "Full content for drones in agriculture...",
    author: "Dr. Arsh Singh",
    date: "April 5, 2026",
    image: "/products/flyirax.jpg",
    category: "Agriculture"
  },
  {
    id: "post3",
    title: "Navigating GPS-Denied Environments",
    excerpt: "Our latest SLAM algorithms allow drones to operate safely in tunnels, pipes, and deep canyons.",
    content: "Full content for SLAM technology...",
    author: "Engineer Sarah Chen",
    date: "March 28, 2026",
    image: "/products/flysurveilx.jpg",
    category: "R&D"
  }
];
