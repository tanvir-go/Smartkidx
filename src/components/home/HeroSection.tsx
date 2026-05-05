import CategorySidebar from "./CategorySidebar";
import HeroSlider from "./HeroSlider";
import TopSellers from "./TopSellers";

export default function HeroSection() {
  return (
    <section className="pt-6 pb-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Left Sidebar Placeholder (Occupied by Header Dropdown) */}
          <div className="hidden lg:block lg:col-span-1 xl:col-span-3">
            {/* Empty space for the persistent header categories menu */}
          </div>

          
          {/* Center Slider */}
          <div className="col-span-1 lg:col-span-3 xl:col-span-6 h-full order-1 lg:order-2">
            <HeroSlider />
          </div>
          
          {/* Right Top Sellers (Visible on tablet/desktop, hidden on small mobile if preferred, or stacked) */}
          <div className="col-span-1 lg:col-span-4 xl:col-span-3 h-full order-3">
            <TopSellers />
          </div>
        </div>
      </div>
    </section>
  );
}
