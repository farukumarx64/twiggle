import { PreviewContent } from "+/application/preview/content";
import { Head } from "@/layouts/head";
import { createClient } from "@/utils/supabase/server-props";
import { Image } from "@nextui-org/react";
import { GetServerSideProps } from "next";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";

interface UserPageProps {
  user: {
    user_id: string;
    username: string;
    fullname: string;
    profile_pic_url: string;
    bio: string;
    email: string;

  };
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
      <Head icon="logo-alt" title={`${user.username}'s Twiggle`} />
      <div className="flex-grow">
        <PreviewContent userID={user.user_id} />
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
  const parameters = context.params;
  const username = parameters?.username?.toString().toLowerCase()
  // Fetch user data based on the username
  const { data, error } = await supabase
    .from("users")
    .select("*")
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

  return {
    props: {
      user: data,
    },
  };
};

export default UserPage;
