"use client";
import Hero from "./components/Hero";
import Install from "./components/Install";
import Usage from "./components/Usage";
import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import GridPattern from "@/components/ui/grid-pattern";
import { cn } from "@/lib/utils";

export default function Home() {
  const [position, setPosition] = useState("style1");

  // Initialize state from localStorage
  useEffect(() => {
    const storedPosition = localStorage.getItem("position");
    
    if (storedPosition) setPosition(storedPosition);
  }, []);

  // Update localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem("position", position);
    console.log(position);
  }, [position]);

  return (
    <>
      <section className="grid grid-cols-3 justify-items-center">
        <div></div>
        <div>
          <Hero />
          <Install />
          <Usage position={position} setPosition={setPosition} />
        </div>
      </section>
      <br />
      <Footer />
      <GridPattern
        squares={[
          [4, 4],
          [5, 1],
          [8, 2],
          [5, 3],
          [5, 5],
          [10, 10],
          [12, 15],
          [15, 10],
          [10, 15],
          [15, 10],
          [10, 15],
          [15, 10],
        ]}
        className={cn(
          "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
        )}
      />
    </>
  );
}
