import { BLOGS_LIST_API } from "@/constants/apiUrls";
import { useRouter } from "next/navigation";
import Head from "next/head";
import Blog from "./types";

const fetchBlogs = async () => {
  const response = await fetch(BLOGS_LIST_API);
  if (!response.ok) throw new Error("Error");
  const data = (await response.json()) as Promise<Blog[]>;
  return data;
};

const Page = ({ blogs }: { blogs: Blog[] }) => {
  const router = useRouter();

  const handleBlogClick = (blogId: string) => {
    router.push(`/blogs/${blogId}`);
  };

  return (
    <>
      <Head>
        <title>Blogs</title>
      </Head>
      <h1 className="font-bold">Blogs</h1>
      <ul>
        {blogs?.map((blogDetails) => (
          <li
            key={blogDetails.id}
            className="my-2 cursor-pointer border p-4 hover:bg-gray-50"
            onClick={() => handleBlogClick(blogDetails.id)}
          >
            <div className="flex justify-between grow">
              <h2>{blogDetails?.title}</h2>
              <span>{blogDetails.createdAt}</span>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export async function getServerSideProps() {
  const blogs = await fetchBlogs();
  return {
    props: {
      blogs,
    },
  };
}

export default Page;
