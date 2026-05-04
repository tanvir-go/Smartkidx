import ProductCard from "../product/ProductCard";
import Link from "next/link";

const products = [
  {
    id: 1,
    name: "Arduino Uno R3 Ultimate Starter Kit for Kids",
    category: "Robotics | IoT",
    price: 45.00,
    oldPrice: 55.00,
    discount: 18,
    image: "https://placehold.co/500x600/png?text=Arduino+Kit",
    rating: 4.9,
    reviews: 124,
    isHot: true
  },
  {
    id: 2,
    name: "Magnetic Building Blocks Set - 120 Pieces",
    category: "Kids Toys",
    price: 32.50,
    image: "https://placehold.co/500x600/png?text=Magnetic+Blocks",
    rating: 4.7,
    reviews: 86,
    isNew: true
  },
  {
    id: 3,
    name: "STEM Solar Robot Kit 12-in-1 Educational Toy",
    category: "Robotics | IoT",
    price: 24.99,
    oldPrice: 29.99,
    discount: 16,
    image: "https://placehold.co/500x600/png?text=Solar+Robot",
    rating: 4.8,
    reviews: 210
  },
  {
    id: 4,
    name: "3D Drawing Pen for Creative Kids with Refills",
    category: "Stationary",
    price: 39.00,
    oldPrice: 49.00,
    discount: 20,
    image: "https://placehold.co/500x600/png?text=3D+Pen",
    rating: 4.5,
    reviews: 54
  },
  {
    id: 5,
    name: "Human Anatomy Model for Kids - 15 Pieces",
    category: "STEM Kits",
    price: 19.50,
    image: "https://placehold.co/500x600/png?text=Anatomy+Model",
    rating: 4.9,
    reviews: 42
  },
  {
    id: 6,
    name: "Walkie Talkies for Kids - 3 Mile Range",
    category: "Electronics & Gadgets",
    price: 28.00,
    oldPrice: 35.00,
    discount: 20,
    image: "https://placehold.co/500x600/png?text=Walkie+Talkie",
    rating: 4.6,
    reviews: 112,
    isNew: true
  }
];

export default function MostPopular() {
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-4">
          <div>
            <h2 className="text-2xl md:text-4xl font-display font-black text-slate-900 mb-2">Most Popular Products</h2>
            <div className="w-20 h-1.5 bg-primary rounded-full"></div>
          </div>
          <div className="flex gap-4">
            <button className="text-sm font-bold text-slate-400 hover:text-primary transition-colors pb-1 border-b-2 border-transparent hover:border-primary">ALL</button>
            <button className="text-sm font-bold text-slate-400 hover:text-primary transition-colors pb-1 border-b-2 border-transparent hover:border-primary">ROBOTICS</button>
            <button className="text-sm font-bold text-slate-400 hover:text-primary transition-colors pb-1 border-b-2 border-transparent hover:border-primary">TOYS</button>
            <button className="text-sm font-bold text-slate-400 hover:text-primary transition-colors pb-1 border-b-2 border-transparent hover:border-primary">BOOKS</button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 items-stretch">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/shop">
            <button className="px-10 py-4 bg-slate-900 text-white rounded-full font-bold text-sm hover:bg-primary transition-all shadow-xl shadow-slate-200">
              VIEW ALL PRODUCTS
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
