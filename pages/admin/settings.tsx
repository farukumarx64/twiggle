import { Navbar } from "+/application/navbar";
import { SettingSection } from "+/application/settings/settings-section";
import { Preview } from "+/application/preview";
import { Head } from "@/layouts/head";

export default function Settings() {
  return(
    <>
    <Head icon="logo-alt" title="Twiggle Admin"/>
    <Navbar option="Settings"/>
    <div className="flex">
      <SettingSection />
      <Preview />
    </div>
    </>
  )
}