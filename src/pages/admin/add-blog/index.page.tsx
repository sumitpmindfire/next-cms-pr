import React from "react";
import useAddBlog from "./useAddBlog";

const AddBlog = () => {
  const { register, handleAddBlog } = useAddBlog();

  return (
    <form
      onSubmit={handleAddBlog}
      className="flex flex-col gap-4 items-center justify-center h-full max-w-lg m-auto mt-5"
    >
      <input
        placeholder="Title"
        type="text"
        {...register("title", { required: true })}
        className="border p-2 w-full"
      />
      <textarea
        placeholder="Content"
        {...register("content", { required: true })}
        className="border p-2 w-full"
      />
      <button type="submit" className="bg-blue-500 text-white p-2">
        Add blog
      </button>
    </form>
  );
};

export default AddBlog;
