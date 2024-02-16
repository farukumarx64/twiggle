import { LinksSection } from "+/application/links/links-section";
import { Navbar } from "+/application/navbar";
import { Preview } from "+/application/preview";
import { Head } from "@/layouts/head";

export default function AppearanceSection() {
  return(
    <>
    <Head icon="logo-alt" title="Twiggle Admin"/>
    <Navbar option="Appearance"/>
    <div className="flex">
      <LinksSection />
      <div className="hidden md:inline">
      <Preview />
      </div>
    </div>
    </>
  )
}