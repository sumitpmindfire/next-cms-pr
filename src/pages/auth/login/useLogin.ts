import React, { useEffect, FormEvent } from "react";
import { getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import LoginForm from "./types";
import { LOGIN_API } from "@/constants/apiUrls";
import { useAuthContext } from "@/context/AuthContext";

const useLogin = () => {
  const { register, handleSubmit } = useForm<LoginForm>();
  const router = useRouter();
  const { isLoggedIn, setIsLoggedIn } = useAuthContext();

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handleSubmit(async (formData: LoginForm) => {
      const response = await fetch(LOGIN_API);
      try {
        const data = (await response.json()) as LoginForm[];
        const userCredentials = data?.find(
          (loginDetails) => loginDetails.username === formData.username
        );
        if (
          userCredentials &&
          userCredentials.username === formData.username &&
          userCredentials.password === formData.password
        ) {
          setCookie("user", userCredentials.username);
          router.push("/");
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  };

  useEffect(() => {
    if (getCookie("user")) {
      router.push("/");
    }
  }, []);

  return {
    register,
    handleFormSubmit,
  };
};

export default useLogin;
