import { EyeFilledIcon, EyeSlashFilledIcon } from "+/icons";
import { AppIcon } from "+/icons/Icon";
import { updateLoginInfo } from "@/utils/state/actions/loginActions";
import { RootState } from "@/utils/state/reducers/reducers";
import { createClient } from "@/utils/supabase/components";
import { Button, Input, Tooltip } from "@nextui-org/react";
import axios from "axios";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export interface LoginState {
  email: boolean;
  password: string;
  username: string;
  legal: string;
  isVisible: boolean;
}
export type SetLoginState = React.Dispatch<React.SetStateAction<LoginState>>;

export const LoginComponent: React.FC<{
  state: LoginState;
  setState: SetLoginState;
  handleComponentChange: (comp: string) => void;
}> = ({ state, setState, handleComponentChange }) => {
  const dispatch = useDispatch();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [loginSuccess, setLoginSuccess] = useState<any>(undefined);
  const user = useSelector((state: RootState) => state.login);
  const router = useRouter();
  const isButtonDisabled = !state.email || !state.password;

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prevInputs: any) => ({
      ...prevInputs,
      username: e.target.value,
      email: e.target.value !== "",
    }));
    dispatch(
      updateLoginInfo({
        username: e.target.value,
        email: isEmail(),
      })
    );
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prevInputs) => ({ ...prevInputs, password: e.target.value }));
    dispatch(
      updateLoginInfo({
        password: e.target.value,
      })
    );
  };
  const isEmail = () => {
    if (state.username !== "") {
      return state.username.includes("@");
    }
  };

  useEffect(() => {
    // Check if user is already logged in
    const checkLoggedIn = async () => {
      try {
        const response = await axios.get("/api/login/check");
        if (response.data.session) {
          router.push("/admin");
        }
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };

    checkLoggedIn();
  }, [router]); // Run once when component mounts

  const handleLogin = async () => {
    setLoading(true);
    if (user.email === false) {
      const { data, error } = await supabase
        .from("users")
        .select()
        .eq("username", user.username); // Correct
      if (error) {
        console.error(error);
      } else {
        try {
          const response = await axios.post("/api/login", {
            email: data[0].email, // Add email parameter
            password: user.password, // Add password parameter
          });
    
          // Handle success response
          router.push("/admin");
        } catch (error: any) {
          // Handle error response
          console.error("Error:", error);
          setLoginSuccess(error.response.data.error);
        } finally {
          setLoading(false);
        }
      }
    } else {
      try {
        const response = await axios.post("/api/login", {
          email: user.username, // Add email parameter
          password: user.password, // Add password parameter
        });
  
        // Handle success response
        router.push("/admin");
      } catch (error: any) {
        // Handle error response
        console.error("Error:", error);
        setLoginSuccess(error.response.data.error);
      } finally {
        setLoading(false);
      }
    };
    }
    
  const handleOAuth = async (provider: string) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/login/oauth", {
        provider: provider,
        url: window.location.origin,
      });

      // Handle success response
      const { url } = response.data;
      router.push(url);
    } catch (error) {
      // Handle error response
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleVisibility = () =>
    setState((prevInputs) => ({ ...prevInputs, isVisible: !state.isVisible }));
  return (
    <div className="pt-10">
      <div className="flex flex-col justify-center items-center mb-12 gap-4">
        <h1 className=" text-3xl font-bold md:text-5xl">Welcome back</h1>
        <span className=" text-default-500">Reconnect to your Twiggle</span>
      </div>
      <div className="flex flex-col justify-center items-center gap-3">
        <Input
          label="Email or username"
          value={state.username}
          size="sm"
          onChange={handleEmailChange}
          radius="md"
          className=" max-w-3xl md:max-w-xl"
        />
        <Input
          placeholder="Password"
          size="lg"
          id="email-input"
          onChange={handlePasswordChange}
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {state.isVisible ? (
                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          radius="md"
          type={state.isVisible ? "text" : "password"}
          className="max-w-3xl md:max-w-xl"
          classNames={{
            input: "text-sm",
          }}
        />
        <Button
          radius="full"
          size="lg"
          isDisabled={isButtonDisabled || loading}
          color={isButtonDisabled || loading ? "default" : "secondary"}
          fullWidth
          className=" box-content px-0 max-w-3xl md:max-w-xl"
          onPress={() => {
            dispatch(
              updateLoginInfo({
                username: state.username,
                password: state.password,
                email: isEmail(),
              })
            );
            handleLogin();
          }}
        >
          {loading ? "Loading..." : "Log in"}
        </Button>
        {loginSuccess && (
          <span className="text-danger-600 mt-5">{loginSuccess}</span>
        )}
      </div>
      <div className="flex justify-center my-3 text-default-500">OR</div>
      <div className="flex gap-3 items-center justify-center">
        <Button
          radius="lg"
          size="lg"
          variant="ghost"
          fullWidth
          className=" box-content px-0 max-w-3xl bg-white md:max-w-xl"
          onPress={() => {
            handleOAuth("google");
          }}
          isIconOnly
        >
          <AppIcon icon="Google" />
        </Button>
        <Tooltip content="I'm not working yet :)">
          <Button
            radius="lg"
            size="lg"
            variant="ghost"
            fullWidth
            className=" box-content px-0 max-w-3xl bg-white md:max-w-xl"
            isIconOnly
          >
            <AppIcon icon="Facebook" />
          </Button>
        </Tooltip>
      </div>
      <div className="flex justify-center mt-8">
        <p className="text-default-500">Don&apos;t have an account?&nbsp;</p>
        <NextLink href="/register" className=" text-purple-700">
          Sign up
        </NextLink>
      </div>
    </div>
  );
};
