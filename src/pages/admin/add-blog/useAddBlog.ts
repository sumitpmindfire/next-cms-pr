import React, { FormEvent } from "react";

import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { ADD_BLOG_API } from "@/constants/apiUrls";

const useAddBlog = () => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const handleAddBlog = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handleSubmit(async (formData) => {
      try {
        const response = await fetch(ADD_BLOG_API, {
          method: "POST",
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        router.push("/blogs");
      } catch (error) {
        console.error(error);
      }
    })();
  };

  return {
    register,
    handleAddBlog,
  };
};

export default useAddBlog;
