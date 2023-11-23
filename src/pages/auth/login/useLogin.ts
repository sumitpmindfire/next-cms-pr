import React, { useEffect, FormEvent } from "react";
import { getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { LoginForm, UserData } from "@/types/auth";
import { LOGIN_API } from "@/constants/apiUrls";
import { useAuthContext } from "@/context/AuthContext";

const useLogin = () => {
  const { register, handleSubmit } = useForm<LoginForm>();
  const router = useRouter();
  const { setIsLoggedIn, setUserData } = useAuthContext();

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handleSubmit(async (formData: LoginForm) => {
      const response = await fetch(LOGIN_API);
      try {
        const data = (await response.json()) as UserData[];
        const userCredentials = data?.find(
          (loginDetails) => loginDetails.username === formData.username
        );
        if (
          userCredentials &&
          userCredentials.username === formData.username &&
          userCredentials.password === formData.password
        ) {
          const userData = {
            username: userCredentials.username,
            role: userCredentials.role,
          };
          setCookie("user", userData);
          // cookies().set("user", JSON.stringify(userData));
          setUserData(userData);
          router.push("/", {}, { shallow: false });
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
