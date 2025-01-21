"use client";
import Hero from "./components/Hero";
import Install from "./components/Install";
import Usage from "./components/Usage";
import { useEffect, useState } from "react";
import Footer from "./components/Footer";

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
    </>
  );
}
