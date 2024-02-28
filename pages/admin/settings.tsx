import { Navbar } from "+/application/navbar";
import { SettingSection } from "+/application/settings/settings-section";
import { Preview } from "+/application/preview";
import { Head } from "@/layouts/head";
import { useState, useEffect } from "react";

export default function Settings() {
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
      <Navbar option="Settings" />
      <div className="flex">
        <SettingSection />
        {isWideScreen && <Preview />}
      </div>
    </>
  );
}
