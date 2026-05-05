export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  image: string;
  images: string[];
  rating: number;
  reviews: number;
  isNew?: boolean;
  isHot?: boolean;
  stock: number;
  brand: string;
  sku: string;
  description: string;
  features: string[];
  specs: Record<string, string>;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Mechanical Dinosaur Robot Kit",
    category: "Kids Toys",
    price: 35.00,
    oldPrice: 45.00,
    discount: 22,
    image: "https://placehold.co/600x600/png?text=Dino+1",
    images: [
      "https://placehold.co/600x600/png?text=Dino+1",
      "https://placehold.co/600x600/png?text=Dino+2",
      "https://placehold.co/600x600/png?text=Dino+3",
      "https://placehold.co/600x600/png?text=Dino+4"
    ],
    rating: 4.8,
    reviews: 124,
    stock: 15,
    isNew: true,
    isHot: true,
    brand: "SmartKids Tech",
    sku: "SK-DINO-001",
    description: "A fully functional mechanical dinosaur that kids can build themselves. Features realistic movement and sound effects.",
    features: [
      "DIY building experience",
      "Sound and light effects",
      "Moving joints",
      "Durable non-toxic plastic"
    ],
    specs: {
      "Material": "ABS Plastic",
      "Battery": "3x AA (Not included)",
      "Age Group": "8-12 years",
      "Dimensions": "25 x 15 x 10 cm"
    }
  },
  {
    id: 2,
    name: "Solar Powered Windmill STEM Kit",
    category: "STEM Projects",
    price: 20.00,
    image: "https://placehold.co/600x600/png?text=Windmill+1",
    images: [
      "https://placehold.co/600x600/png?text=Windmill+1",
      "https://placehold.co/600x600/png?text=Windmill+2",
      "https://placehold.co/600x600/png?text=Windmill+3"
    ],
    rating: 5.0,
    reviews: 32,
    stock: 25,
    brand: "STEM Masters",
    sku: "SK-SOL-002",
    description: "Learn about renewable energy with this solar-powered windmill kit. No batteries required, just sunlight!",
    features: [
      "High-efficiency solar panel",
      "Educational assembly guide",
      "Safe and eco-friendly",
      "Real-world application of STEM"
    ],
    specs: {
      "Material": "Wood & Metal",
      "Power Source": "Solar",
      "Age Group": "10+ years",
      "Difficulty": "Intermediate"
    }
  },
  {
    id: 3,
    name: "Crystal Growing DIY Kit",
    category: "DIY Kits",
    price: 25.00,
    image: "https://placehold.co/600x600/png?text=Crystal+1",
    images: [
      "https://placehold.co/600x600/png?text=Crystal+1",
      "https://placehold.co/600x600/png?text=Crystal+2"
    ],
    rating: 4.5,
    reviews: 18,
    stock: 40,
    brand: "Science Fun",
    sku: "SK-DIY-003",
    description: "Grow your own stunning crystals with this safe and easy-to-use chemical kit. Watch them transform over 7 days.",
    features: [
      "Includes 3 different colors",
      "Safety goggles included",
      "Fast-growing formula",
      "Magnifying glass included"
    ],
    specs: {
      "Growth Time": "7-10 Days",
      "Safety": "Non-toxic (under supervision)",
      "Age Group": "8+ years"
    }
  },
  {
    id: 4,
    name: "Premium Paint by Numbers Set",
    category: "Art & Craft",
    price: 15.00,
    image: "https://placehold.co/600x600/png?text=Paint+1",
    images: [
      "https://placehold.co/600x600/png?text=Paint+1",
      "https://placehold.co/600x600/png?text=Paint+2"
    ],
    rating: 4.9,
    reviews: 56,
    stock: 50,
    brand: "Artist Kids",
    sku: "SK-ART-004",
    description: "Create a masterpiece with ease. Our premium paint by numbers set includes everything you need to start painting today.",
    features: [
      "High-quality canvas",
      "24 vibrant acrylic colors",
      "3 professional brushes",
      "Wooden frame included"
    ],
    specs: {
      "Canvas Size": "40 x 50 cm",
      "Paint Type": "Acrylic",
      "Age Group": "Any"
    }
  },
  {
    id: 101, // From MainHeader or Featured
    name: "Arduino Uno R3 Ultimate Starter Kit",
    category: "Robotics | IoT",
    price: 45.00,
    oldPrice: 55.00,
    discount: 18,
    image: "https://placehold.co/600x600/png?text=Arduino+1",
    images: [
      "https://placehold.co/600x600/png?text=Arduino+1",
      "https://placehold.co/600x600/png?text=Arduino+2",
      "https://placehold.co/600x600/png?text=Arduino+3"
    ],
    rating: 4.9,
    reviews: 215,
    stock: 12,
    isHot: true,
    brand: "SmartKids Tech",
    sku: "SK-ARD-101",
    description: "The complete package for learning electronics and Arduino programming. Over 100 parts and 30+ tutorials.",
    features: [
      "Genuine R3 Board",
      "Detailed project manual",
      "LCD Display included",
      "Servo and Stepper motors"
    ],
    specs: {
      "Platform": "Arduino",
      "Voltage": "5V-12V",
      "Components": "100+",
      "Difficulty": "Beginner to Advanced"
    }
  }
];
