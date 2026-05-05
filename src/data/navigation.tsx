import { Cpu, Microscope, Gamepad2, Palette, Baby, BookOpen, Zap } from "lucide-react";

export const categories = [
  { 
    name: "Electronics & Gadgets", 
    icon: <Cpu size={18} />, 
    slug: "electronics",
    href: "/category/electronics",
    subcategories: [
      { name: "Learning Tablets", slug: "tablets" },
      { name: "Smartwatches", slug: "smartwatches" },
      { name: "Digital Cameras", slug: "cameras" },
      { name: "Gaming Consoles", slug: "gaming" }
    ]
  },
  { 
    name: "Robotics | IoT", 
    icon: <Microscope size={18} />, 
    slug: "robotics",
    href: "/category/robotics",
    subcategories: [
      { name: "Coding & Programming Kits", slug: "coding-kits" },
      { name: "DIY Robotics Kits", slug: "diy-robotics" },
      { name: "Sensors & Modules", slug: "sensors" },
      { name: "Drones & RC", slug: "drones" }
    ]
  },
  { 
    name: "Kids Toys", 
    icon: <Gamepad2 size={18} />, 
    slug: "toys",
    href: "/category/toys",
    subcategories: [
      { name: "Robotics Kits", slug: "robotics-kits" },
      { name: "Art & Craft Kits", slug: "art-craft" },
      { name: "Building Blocks", slug: "building-blocks" },
      { name: "Remote Control Cars", slug: "rc-cars" }
    ]
  },
  { 
    name: "Stationary", 
    icon: <Palette size={18} />, 
    slug: "stationary",
    href: "/category/stationary",
    subcategories: [
      { name: "School Supplies", slug: "school-supplies" },
      { name: "Art Supplies", slug: "art-supplies" },
      { name: "Notebooks & Diaries", slug: "notebooks" }
    ]
  },
  { 
    name: "Kids Lifestyle", 
    icon: <Baby size={18} />, 
    slug: "lifestyle",
    href: "/category/lifestyle",
    subcategories: [
      { name: "School Bags", slug: "school-bags" },
      { name: "Kids Clothing", slug: "clothing" },
      { name: "Kids Footwear", slug: "footwear" }
    ]
  },
  { 
    name: "Books", 
    icon: <BookOpen size={18} />, 
    slug: "books",
    href: "/category/books",
    subcategories: [
      { name: "Storybooks", slug: "storybooks" },
      { name: "Activity Books", slug: "activity-books" },
      { name: "Language Learning", slug: "language-learning" }
    ]
  },
  {
    name: "STEM Kits",
    icon: <Zap size={18} />,
    slug: "stem-kits",
    href: "/category/stem-kits",
    subcategories: [
      { name: "Science Kits", slug: "science-kits" },
      { name: "Engineering Kits", slug: "engineering-kits" },
      { name: "Physics Experiments", slug: "physics" },
      { name: "Chemistry Sets", slug: "chemistry" }
    ]
  }
];
