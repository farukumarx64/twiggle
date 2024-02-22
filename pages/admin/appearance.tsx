import { AppearanceSection } from "+/application/appearance/appearance-section";
import { Navbar } from "+/application/navbar";
import { Preview } from "+/application/preview";
import { Head } from "@/layouts/head";

export default function Appearance() {
  return(
    <>
    <Head icon="logo-alt" title="Twiggle Admin"/>
    <Navbar option="Appearance"/>
    <div className="flex">
      <AppearanceSection />
      <div className="hidden md:inline">
      <Preview />
      </div>
    </div>
    </>
  )
}