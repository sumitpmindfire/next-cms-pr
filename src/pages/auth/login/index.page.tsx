import React from "react";
import useLogin from "./useLogin";

const Page = () => {
  const { register, handleFormSubmit } = useLogin();

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
