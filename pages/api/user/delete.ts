import createClient from "@/utils/supabase/api";
import type { NextApiRequest, NextApiResponse } from "next";

type ErrorResponse = {
  error: any;
};

type SuccessResponse = {
  success: boolean;
  message?: string;
};

type Response = ErrorResponse | SuccessResponse;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const supabase = createClient(req, res);

  try {
    const request = req.body;

    const { error } = await supabase.auth.admin.deleteUser(request.id);
    if (error) {
      console.error("Error deleting user:", error);
      return res
        .status(400)
        .json({ error: error.message || "User not deleted" });
    } else {
      
      return res
        .status(200)
        .json({ success: true, message: "User deleted successfully" });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
/*const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error signing out user:", error);
        return res
          .status(400)
          .json({ error: error.message || "User not signed out" });
      } else {
        const { data, error } = await supabase.storage.deleteBucket(
          `avatars/${request.id}`
        );
        if (error) {
          console.error("Error deleting user avatar:", error);
          return res
            .status(400)
            .json({ error: error.message || "User avatar not deleted" });
        } else {
          const { error } = await supabase
            .from("users")
            .delete()
            .eq("user_id", request.id);

          if (error) {
            console.error("Error deleting user in DB:", error);
            return res
              .status(400)
              .json({ error: error.message || "User in DB not deleted" });
          } else {
            const { error } = await supabase
              .from("headers")
              .delete()
              .eq("user_id", request.id);

            if (error) {
              console.error("Error deleting user data in DB:", error);
              return res
                .status(400)
                .json({
                  error: error.message || "User data in DB not deleted",
                });
            }
          }
        }
      } */