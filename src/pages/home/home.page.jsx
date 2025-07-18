import Hero from "./components/Hero";
import Products from "./components/Products";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";

function HomePage() {
  const { user } = useUser();
  const isAdmin = user?.publicMetadata?.role === "admin";
  const footerRef = useRef(null);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    const footer = document.querySelector("footer");
    if (footer) {
      observer.observe(footer);
    }
    return () => {
      if (footer) observer.unobserve(footer);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <main className="flex-1">
        <Hero />
        <Products />
      </main>
      {isAdmin && !footerVisible && (
        <div className="fixed bottom-8 right-8 z-50 shadow-2xl">
          <Link to="/admin/products/create">
            <Button className="bg-primary text-white hover:bg-primary/90">
              + Create Product
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default HomePage;
