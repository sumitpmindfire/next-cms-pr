import React, { FormEvent, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { LOGIN_API } from "@/constants/apiUrls";
import { getCookie, setCookie } from "cookies-next";
import LoginForm from "./types";

const Page = () => {
  const { register, handleSubmit } = useForm<LoginForm>();
  const router = useRouter();

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
          // router.refresh();
        }
      } catch (error) {
        console.error(error);
      }
    })();
  };

  useEffect(() => {
    if (getCookie("user")) {
      router.push("/");
      // router.refresh();
    }
  }, []);

  return (
    <form
      onSubmit={handleFormSubmit}
      className="flex flex-col gap-4 items-center justify-center h-full"
    >
      <input
        placeholder="Username"
        type="text"
        {...register("username")}
        className="border p-2"
      />
      <input
        placeholder="Password"
        type="password"
        {...register("password")}
        className="border p-2"
      />
      <button type="submit" className="bg-blue-500 text-white p-2">
        Login
      </button>
    </form>
  );
};

Page.getLayout = function getLayout() {
  return null;
};

export default Page;
