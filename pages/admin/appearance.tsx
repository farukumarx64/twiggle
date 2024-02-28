import { AppearanceSection } from "+/application/appearance/appearance-section";
import { Navbar } from "+/application/navbar";
import { Preview } from "+/application/preview";
import { Head } from "@/layouts/head";
import { useState, useEffect } from "react";

export default function Appearance() {
  const [isWideScreen, setIsWideScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth > 768);
    };
    // Set initial value on component mount
    handleResize();
    // Add event listener to update state when window is resized
    window.addEventListener("resize", handleResize);
    // Clean up event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      <Head icon="logo-alt" title="Twiggle Admin" />
      <Navbar option="Appearance" />
      <div className="flex">
        <AppearanceSection />
        {isWideScreen && <Preview />}
      </div>
    </>
  );
}
