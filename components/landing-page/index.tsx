import { useEffect } from "react";
import { Faq } from "./faq";
import { Features } from "./features";
import Hero from "./hero";
import { Trial } from "./trial";
import { createClient } from "@/utils/supabase/components";

export default function LandingPage() {
  const supabase = createClient();
  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event == "PASSWORD_RECOVERY") {
        const newPassword = prompt("What would you like your new password to be?");
        const { data, error } = await supabase.auth
          .updateUser({ password: newPassword })
 
        if (data) alert("Password updated successfully!")
        if (error) alert("There was an error updating your password.")
      }
    })
  }, [supabase.auth])
  return (
    <>
      <Hero />
      <Features />
      <Faq />
      <Trial />
    </>
  );
}
