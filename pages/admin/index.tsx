import { LinksSection } from "+/application/links/links-section";
import { Navbar } from "+/application/navbar";
import { Preview } from "+/application/preview";
import { Head } from "@/layouts/head";

export default function AdminPage() {
  return(
    <div>
    <Head icon="logo-alt" title="Twiggle Admin"/>
    <Navbar option="Links"/>
    <div className="flex">
      <LinksSection />
      <div className="hidden md:inline">
      <Preview />
      </div>
    </div>
    </div>
  )
}