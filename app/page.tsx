"use client";

import { useCallback, useState } from "react";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import CollectionGrid from "@/components/CollectionGrid";
import ScrollyTelling from "@/components/ScrollyTelling";
import Craft from "@/components/Craft";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import { marqueeWords } from "@/lib/data";

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const handleComplete = useCallback(() => setLoaded(true), []);

  return (
    <>
      <CustomCursor />
      <Preloader onComplete={handleComplete} />
      <Navbar />

      <main>
        <Hero loaded={loaded} />
        <Marquee words={marqueeWords} />
        <CollectionGrid />
        <ScrollyTelling />
        <Craft />
        <Testimonials />
        <Newsletter />
      </main>

      <Footer />
    </>
  );
}