import { Faq } from "./faq";
import { Features } from "./features";
import Hero from "./hero";
import { Trial } from "./trial";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <Features />
      <Faq />
      <Trial />
    </>
  );
}
