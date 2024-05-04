import createClient from "@/utils/supabase/api";
import { Session, User } from "@supabase/supabase-js";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  user: User | null;
  session: Session | null;
};

type ErrorResponse = {
  error: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorResponse>
) {
  const supabase = createClient(req, res);

  try {
    const request = req.body;

    const { data, error } = await supabase.auth.signUp({
      email: request.email,
      password: request.password,
      options: {
        data: {
          username: request.username,
          fullname: request.fullname,
          category: request.category,
          subcategory: request.subcategory,
        },
      },
    });
    if (error) {
      console.error("Error:", error);
      return res.status(400).json({ error: error.message || "Sign up failed" });
    } else {
      console.log("response: ", data);

      // Insert user data into Supabase database
      const signUpData = {
        username: request.username,
        fullname: request.fullname,
        profile_pic_url: null, // You can update this later
        bio: null, // You can update this later
        // Other user data
      };
      const { data: userData, error: userError } = await supabase
        .from("users")
        .insert([
          {
            user_id: data.user?.id, // Assuming user ID is provided by Supabase
            ...signUpData,
          },
        ]);

      if (userError) {
        console.error("Error inserting user data:", userError);
        return res
          .status(500)
          .json({ error: "Error inserting user data into the database" });
      }

      // You can optionally insert default links or headers here for the user

      return res.status(200).json({ user: data.user, session: data.session });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
