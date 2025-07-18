import "./Hero.css";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { Vortex } from "@/components/ui/vortex";

function Hero() {
  return (
    <section className="relative w-full h-screen overflow-hidden p-0 m-0 flex flex-col md:flex-row">
      {/* Full-page background image */}
      <div
        className="absolute inset-0 w-full h-full z-0"
        style={{
          backgroundImage: "url('/assets/products/Fashion1.jpeg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {/* Overlay for readability (restored) */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent z-20" />
      {/* Content - left side */}
      <div className="relative z-30 flex-1 flex flex-col justify-center items-start h-[60vh] md:h-full max-w-3xl px-8 md:px-16">
        <span className="discount-badge bg-yellow-400 text-gray-900 font-bold px-3 py-1 mb-2 inline-block rounded-full tracking-wide shadow-lg">WEEKLY DISCOUNT</span>
        <h1 className="hero-title text-5xl font-extrabold leading-tight mb-4 text-white drop-shadow-lg">
          <span className="text-white">Premium </span>
          <span className="text-yellow-400">Products</span>
          <span className="text-white"> Online Shop</span>
        </h1>
        <p className="text-lg text-gray-100 mb-6 font-medium drop-shadow">
          Discover the latest trends and shop your favorite products with exclusive discounts every week.
        </p>
        <Button className="w-fit px-8 py-3 rounded-full bg-yellow-400 text-gray-900 font-bold text-lg shadow-lg hover:bg-yellow-300 transition" asChild>
          <Link to="/shop">Shop Now</Link>
        </Button>
      </div>
      {/* Vortex - right side */}
      <div className="flex-1 h-[40vh] md:h-full relative z-10">
        <Vortex backgroundColor="transparent" className="absolute inset-0 w-full h-full" />
      </div>
    </section>
  );
}

export default Hero;
