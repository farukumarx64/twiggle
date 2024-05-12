import { Head } from "@/layouts/head";
import React, { useEffect, useState } from "react";
import axios from "axios";
import router from "next/router";
import { createClient } from "@/utils/supabase/components";

export default function LoginPage() {
  const supabase = createClient();
  /* useEffect(() => {
    // Check if user is already logged in
    const checkLoggedIn = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");
        console.log(code)
        const response = await axios.post("/api/login/token", {code: code});
        if (response.data.session === null) {
        } else {
          console.log(response.data.session)
          try {
            const response = await axios.get("/api/login/check");
            if (response.data.session === null) {
              router.push("/login");
            } else {
              console.log(response.data,response.data.session.id, typeof response.data.session.id)
              //setUserID(response.data.session.id)
              const { data, error } = await supabase
              .from("users")
              .select()
              .eq("user_id", response.data.session.id);
              console.log(data?.[0])
    
              if (error) {
                console.error("Error fetching user data in links navbar", error)
              }
            }
          } catch (error) {
            console.error("Error checking login status:", error);
          }
          //router.push("/admin");
        }
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };

    checkLoggedIn();
  }, [supabase]); // Run once when component mounts */

  useEffect(()=>{
    const checkLoggedIn = async () => {
      const {data: { user }} = await supabase.auth.getUser();
      console.log("the response: ", user)

      if (user !== null) {
        const { data, error } = await supabase
        .from("users")
        .select()
        .eq("user_id", user.id);
        if (error) {
          console.error("Error fetching user data in users", error);
        } else {
          console.log(data)
          if (data.length === 0) {
            router.push('/register/oauth')
          } else {
            router.push('/admin')
          }
        }
      }
    }
    checkLoggedIn()
  }, [supabase, supabase.auth])
  return (
    <div className="relative flex flex-col h-screen">
      <Head icon="logo-alt" title="Log in or Sign Up | Twiggle" />
      
    </div>
  );
}
