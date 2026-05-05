export interface Product {
  id: number;
  name: string;
  category: string;
  subCategory: string;
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
    subCategory: "Robotics Kits",
    price: 35.00,
    oldPrice: 45.00,
    discount: 22,
    image: "/images/demo/hero2.png",
    images: ["/images/demo/hero2.png"],
    rating: 4.8,
    reviews: 124,
    stock: 15,
    isNew: true,
    isHot: true,
    brand: "SmartKids Tech",
    sku: "SK-DINO-001",
    description: "A fully functional mechanical dinosaur that kids can build themselves. Features realistic movement and sound effects.",
    features: ["DIY building experience", "Sound and light effects", "Moving joints"],
    specs: { "Material": "ABS Plastic", "Age Group": "8-12 years" }
  },
  {
    id: 2,
    name: "Solar Powered Windmill STEM Kit",
    category: "STEM Kits",
    subCategory: "Science Kits",
    price: 20.00,
    image: "/images/demo/hero3.png",
    images: ["/images/demo/hero3.png"],
    rating: 5.0,
    reviews: 32,
    stock: 25,
    brand: "STEM Masters",
    sku: "SK-SOL-002",
    description: "Learn about renewable energy with this solar-powered windmill kit. No batteries required, just sunlight!",
    features: ["High-efficiency solar panel", "Educational assembly guide"],
    specs: { "Material": "Wood & Metal", "Power Source": "Solar" }
  },
  {
    id: 3,
    name: "Crystal Growing DIY Kit",
    category: "Kids Toys",
    subCategory: "Art & Craft Kits",
    price: 25.00,
    image: "/images/demo/toys_collection.png",
    images: ["/images/demo/toys_collection.png"],
    rating: 4.5,
    reviews: 18,
    stock: 40,
    brand: "Science Fun",
    sku: "SK-DIY-003",
    description: "Grow your own stunning crystals with this safe and easy-to-use chemical kit.",
    features: ["Includes 3 colors", "Safety goggles included"],
    specs: { "Growth Time": "7-10 Days", "Age Group": "8+ years" }
  },
  {
    id: 4,
    name: "Premium Paint by Numbers Set",
    category: "Kids Toys",
    subCategory: "Art & Craft Kits",
    price: 15.00,
    image: "/images/demo/girls_stationary.png",
    images: ["/images/demo/girls_stationary.png"],
    rating: 4.9,
    reviews: 56,
    stock: 50,
    brand: "Artist Kids",
    sku: "SK-ART-004",
    description: "Create a masterpiece with ease. Our premium paint by numbers set includes everything you need.",
    features: ["High-quality canvas", "24 acrylic colors"],
    specs: { "Canvas Size": "40 x 50 cm", "Age Group": "Any" }
  },
  {
    id: 5,
    name: "Arduino Uno R3 Ultimate Starter Kit",
    category: "Robotics | IoT",
    subCategory: "Coding & Programming Kits",
    price: 45.00,
    oldPrice: 55.00,
    discount: 18,
    image: "/images/demo/hero1.png",
    images: ["/images/demo/hero1.png"],
    rating: 4.9,
    reviews: 215,
    stock: 12,
    isHot: true,
    brand: "SmartKids Tech",
    sku: "SK-ARD-101",
    description: "The complete package for learning electronics and Arduino programming.",
    features: ["Genuine R3 Board", "Detailed project manual"],
    specs: { "Platform": "Arduino", "Components": "100+" }
  },
  {
    id: 6,
    name: "3D Drawing Pen for Creative Kids",
    category: "Stationary",
    subCategory: "Creative Tools",
    price: 39.00,
    image: "/images/demo/3d_pen.png",
    images: ["/images/demo/3d_pen.png"],
    rating: 4.7,
    reviews: 89,
    stock: 20,
    isNew: true,
    brand: "Creative Kids",
    sku: "SK-3DP-006",
    description: "Turn your drawings into 3D masterpieces with this safe and easy-to-use 3D pen.",
    features: ["Adjustable speed", "OLED display", "10 rolls of filament"],
    specs: { "Material": "PLA/ABS", "Age Group": "8+ years" }
  },
  {
    id: 7,
    name: "Human Anatomy Model for Kids",
    category: "STEM Kits",
    subCategory: "Biology Kits",
    price: 29.00,
    image: "/images/demo/anatomy_model.png",
    images: ["/images/demo/anatomy_model.png"],
    rating: 4.8,
    reviews: 45,
    stock: 15,
    brand: "STEM Masters",
    sku: "SK-BIO-007",
    description: "Explore the human body with this detailed anatomy model featuring detachable organs.",
    features: ["15 detachable parts", "Educational guide book"],
    specs: { "Height": "30cm", "Age Group": "10+ years" }
  },
  {
    id: 8,
    name: "Long Range Walkie Talkies for Kids",
    category: "Electronics & Gadgets",
    subCategory: "Communication Toys",
    price: 32.00,
    image: "/images/demo/walkie_talkies.png",
    images: ["/images/demo/walkie_talkies.png"],
    rating: 4.6,
    reviews: 112,
    stock: 30,
    isNew: true,
    brand: "SmartKids Tech",
    sku: "SK-WT-008",
    description: "Stay connected during adventures with these durable, long-range walkie talkies.",
    features: ["3 mile range", "22 channels", "Built-in flashlight"],
    specs: { "Battery": "3x AAA", "Range": "3km" }
  },
  {
    id: 9,
    name: "Advanced Robotics Arm Kit",
    category: "Robotics | IoT",
    subCategory: "Mechanical Kits",
    price: 59.00,
    image: "/images/demo/featured_stem.png",
    images: ["/images/demo/featured_stem.png"],
    rating: 4.9,
    reviews: 67,
    stock: 10,
    isHot: true,
    brand: "SmartKids Tech",
    sku: "SK-ARM-009",
    description: "Build and program your own robotic arm with multiple degrees of freedom.",
    features: ["Servo controlled", "Arduino compatible", "Metal construction"],
    specs: { "DOF": "4", "Control": "Joystick/Bluetooth" }
  }
];
