export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description?: string;
}

export interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
  videoUrl: string;
  description: string;
}

export const imageGallery: GalleryItem[] = [
  {
    id: "img1",
    title: "FlySurveilX in Action",
    category: "Surveillance",
    image: "/products/flysurveilx.jpg",
    description: "High-altitude surveillance operations over rugged terrain."
  },
  {
    id: "img2",
    title: "FlyAstros Deployment",
    category: "Logistics",
    image: "/products/flyastros.jpg",
    description: "Precision medical supply delivery in remote regions."
  },
  {
    id: "img3",
    title: "FlyCleon Facade Cleaning",
    category: "Industrial",
    image: "/products/flycleon.jpg",
    description: "Automated high-rise cleaning with FlyCleon system."
  },
  {
    id: "img4",
    title: "FlyGripper Heavy Lift",
    category: "Construction",
    image: "/products/flygripper.jpg",
    description: "Transporting critical components at a construction site."
  },
  {
    id: "img5",
    title: "FlyIrax Agricultural Mapping",
    category: "Agriculture",
    image: "/products/flyirax.jpg",
    description: "Precision mapping and spraying for optimized crop yield."
  },
  {
    id: "img6",
    title: "FlySpyder Surveillance",
    category: "Defense",
    image: "/products/flyspyder.jpg",
    description: "Persistent tethered surveillance for perimeter security."
  }
];

export const videoGallery: VideoItem[] = [
  {
    id: "vid1",
    title: "Next-Gen Tactical Drones",
    thumbnail: "/products/flysurveilx.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
    description: "A showcase of our latest tactical platforms in operation."
  },
  {
    id: "vid2",
    title: "Autonomous Swarm Intelligence",
    thumbnail: "/products/flyastros.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
    description: "Deep dive into our swarm coordination algorithms."
  },
  {
    id: "vid3",
    title: "The Future of Logistics",
    thumbnail: "/products/flygripper.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
    description: "How our heavy-lift drones are revolutionizing supply chains."
  }
];
