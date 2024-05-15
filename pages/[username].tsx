import { PreviewContent } from "+/application/preview/content";
import { createClient } from "@/utils/supabase/server-props";
import { Image } from "@nextui-org/react";
import { GetServerSideProps } from "next";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";

interface UserPageProps {
  user: string;
  error?: string;
}

const UserPage: React.FC<UserPageProps> = ({ user, error }) => {
  const { theme } = useTheme();
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <section className="flex flex-col p-5 h-screen">
      <div className="flex-grow">
        <PreviewContent userID={user} />
      </div>
      <footer className="flex justify-center items-center">
        <span>Powered by</span>
        <Image
          alt="twiggle logo in footer"
          width={200}
          height={50}
          src={`/images/twiggle-logo-purple${theme === "dark" ? "-w" : ""}.png`}
        />
      </footer>
    </section>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const supabase = createClient(context);
  const { username } = context.params;
  console.log(username);

  // Fetch user data based on the username
  const { data, error } = await supabase
    .from("users")
    .select("user_id")
    .eq("username", username)
    .single();

  if (error) {
    return {
      props: {
        user: null,
        error: error.message,
      },
    };
  }
  console.log(data);

  return {
    props: {
      user: data.user_id,
    },
  };
};

export default UserPage;
