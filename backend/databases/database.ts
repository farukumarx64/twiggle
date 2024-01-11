import { createClient } from "@supabase/supabase-js";

export default class Database {
  supabase: any;
  supabaseUrl: any;
  supabaseKey: any;
  constructor() {
    this.supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_DB_URL;
    this.supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
    this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
  }

  async insertData(email: string) {
    try {
      // Insert data using Supabase 'upsert' method
      const { data: insertedData, error: insertError } = await this.supabase
        .from("newsletter-email-list")
        .upsert([{ email: email }], { returning: "minimal" });

      if (insertError) {
        console.error("Error inserting data:", insertError);
      } else {
        console.log("Inserted data: Email inserted");
        return true;
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async queryAll() {
    try {
      // Query data using Supabase 'select' method
      const { data, error } = await this.supabase
        .from("newsletter-email-list")
        .select("*");

      if (error) {
        console.error("Error querying data:", error);
      } else {
        console.log("Fetched data:", data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async queryData(email: string) {
    try {
      // Query data using Supabase 'select' method with a filter for the email
      const { data, error } = await this.supabase
        .from("newsletter-email-list")
        .select("*")
        .eq("email", email);

      if (error) {
        console.error("Error querying data:", error);
      } else {
        console.log(`Fetched data for email ${email}:`, data);
        return data;
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async verifyData(email: string) {
    // Query data using Supabase 'select' method with a filter for the email
    let verifiedMail = undefined;
    const { data, error } = await this.supabase
      .from("newsletter-email-list")
      .select("*")
      .eq("email", email);
    console.log("Verified Data: Email Verified",);
    console.log("Error: ", error);
    if (data === null) return undefined;
    data.length === 0 ? null : (verifiedMail = data[0].email);
    if (verifiedMail === null || verifiedMail === undefined) return true;
    else return false;
  }

  async isEmailSent(email: string) {
    try {
      // Insert data using Supabase 'upsert' method
      const { data: insertedData, error: insertError } = await this.supabase
        .from("newsletter-email-list")
        .update([{ email_sent: true }], { returning: "minimal" })
        .eq('email', email);;

      if (insertError) {
        console.error("Error updating data:", insertError);
      } else {
        console.log("Updated data: Email has been sent");
        return true;
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
}
