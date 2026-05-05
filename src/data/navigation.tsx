import { Cpu, Microscope, Gamepad2, Palette, Baby, BookOpen, Zap } from "lucide-react";

export const categories = [
  { 
    name: "Electronics & Gadgets", 
    icon: <Cpu size={18} />, 
    slug: "electronics",
    href: "/category/electronics",
    subcategories: [
      { name: "Cameras & Digital Gadgets", slug: "cameras-gadgets" },
      { name: "Educational Video & Audio Devices", slug: "video-audio" },
      { name: "Gaming Consoles & Accessories", slug: "gaming" },
      { name: "Headphones & Earbuds", slug: "headphones" },
      { name: "Learning Tablets & Kids Laptops", slug: "tablets-laptops" },
      { name: "Smartwatches & Wearables", slug: "smartwatches" }
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
      { name: "Sensors & Controllers", slug: "sensors" },
      { name: "Drones (Mini / Beginner Friendly)", slug: "drones" },
      { name: "IoT Smart Home Toys", slug: "iot-toys" },
      { name: "STEM Robotics Projects", slug: "stem-robotics" }
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
      { name: "Math Kits", slug: "math-kits" },
      { name: "Chemistry Sets", slug: "chemistry-sets" }
    ]
  },
  { 
    name: "Kids Toys", 
    icon: <Gamepad2 size={18} />, 
    slug: "toys",
    href: "/category/toys",
    subcategories: [
      { name: "Action Figures & Dolls", slug: "action-figures" },
      { name: "Art & Craft Kits", slug: "art-craft" },
      { name: "Building Blocks & Construction Sets", slug: "building-blocks" },
      { name: "Remote Control Cars & Vehicles", slug: "rc-vehicles" },
      { name: "Soft Toys & Plushies", slug: "plushies" },
      { name: "Puzzles & Board Games", slug: "puzzles-games" },
      { name: "Outdoor Toys", slug: "outdoor-toys" }
    ]
  },
  { 
    name: "Stationary", 
    icon: <Palette size={18} />, 
    slug: "stationary",
    href: "/category/stationary",
    subcategories: [
      { name: "Art Supplies", slug: "art-supplies" },
      { name: "Bags & Pencil Cases", slug: "bags-cases" },
      { name: "Coloring Books & Crayons", slug: "coloring" },
      { name: "Geometry Sets & Math Tools", slug: "math-tools" },
      { name: "Notebooks & Diaries", slug: "notebooks" },
      { name: "School Supplies", slug: "school-supplies" }
    ]
  },
  { 
    name: "Kids Lifestyle", 
    icon: <Baby size={18} />, 
    slug: "lifestyle",
    href: "/category/lifestyle",
    subcategories: [
      { name: "Accessories", slug: "lifestyle-accessories" },
      { name: "School Bags & Backpacks", slug: "backpacks" },
      { name: "Clothing", slug: "clothing" },
      { name: "Footwear", slug: "footwear" },
      { name: "Lunch Boxes & Water Bottles", slug: "dining" },
      { name: "Room Décor & Furniture", slug: "room-decor" }
    ]
  },
  { 
    name: "Books", 
    icon: <BookOpen size={18} />, 
    slug: "books",
    href: "/category/books",
    subcategories: [
      { name: "Activity Books", slug: "activity-books" },
      { name: "Bilingual & Language Learning Books", slug: "language-books" },
      { name: "Comics & Graphic Novels", slug: "comics" },
      { name: "Educational & Reference Books", slug: "educational-books" },
      { name: "Storybooks & Novels", slug: "storybooks" }
    ]
  }
];
