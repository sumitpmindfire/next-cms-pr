import { BLOGS_LIST_API, GET_BLOG_DETAILS_API } from "@/constants/apiUrls";
import React from "react";
import { GetStaticProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import Blog from "@/types/blogs";

const BlogDetails = ({ blogDetails }: { blogDetails: Blog }) => {
  const router = useRouter();

  if (router.isFallback) return <div>Loading...</div>;

  return (
    <div className="flex flex-col max-w-xl m-auto mt-4">
      <div>
        <Image
          src={blogDetails.heroImage}
          alt={blogDetails?.title}
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-full"
        />
      </div>
      <h2>{blogDetails?.title}</h2>
      <span>{blogDetails?.createdAt}</span>
      <p>{blogDetails?.content}</p>
    </div>
  );
};

export async function getStaticPaths() {
  const response = await fetch(BLOGS_LIST_API);
  const data = await response.json();
  const paths = data.map((blogDetails: Blog) => ({
    params: { blogId: blogDetails.id },
  }));

  return { paths, fallback: true };
}

const getStaticProps: GetStaticProps = async function ({ params }) {
  if (params) {
    const response = await fetch(GET_BLOG_DETAILS_API(params.blogId as string));
    const data = await response.json();

    return {
      props: {
        blogDetails: data,
      },
      revalidate: 20,
    };
  }

  return { props: {} };
};

export default BlogDetails;
export { getStaticProps };
