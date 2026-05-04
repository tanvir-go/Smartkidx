import HeroSection from "@/components/home/HeroSection";
import MostPopular from "@/components/home/MostPopular";
import CategoryIcons from "@/components/home/CategoryIcons";
import PromoBanners from "@/components/home/PromoBanners";
import FeaturedCategory from "@/components/home/FeaturedCategory";
import NewsletterBar from "@/components/home/NewsletterBar";
import MixedShowcase from "@/components/home/MixedShowcase";
import TabbedProducts from "@/components/home/TabbedProducts";
import BottomShowcase from "@/components/home/BottomShowcase";

export default function Home() {
  return (
    <>
      <HeroSection />
      <MostPopular />
      <CategoryIcons />
      <PromoBanners />
      <FeaturedCategory />
      <NewsletterBar />
      <MixedShowcase />
      <TabbedProducts />
      <BottomShowcase />
    </>
  );
}

