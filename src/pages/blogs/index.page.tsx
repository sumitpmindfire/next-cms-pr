import { BLOGS_LIST_API } from "@/constants/apiUrls";
import Head from "next/head";
import Link from "next/link";
import Blog from "@/types/blogs";

const fetchBlogs = async () => {
  const response = await fetch(BLOGS_LIST_API);
  const data = (await response.json()) as Promise<Blog[]>;
  return data;
};

const Page = ({ blogs }: { blogs: Blog[] }) => {
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
          >
            <Link href={`/blogs/${blogDetails.id}`}>
              <div className="flex justify-between grow">
                <h2>{blogDetails?.title}</h2>
                <span>{blogDetails.createdAt}</span>
              </div>
            </Link>
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
