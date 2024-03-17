import { useEffect, useState } from "react";
import { BlogCard } from "../components/ui/BlogCard";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { IBlog } from "../types";
import { createDate } from "../helper";

export const Home = () => {
  const [blogs, setBlogs] = useState<IBlog[]>([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog`)
      .then((data) => setBlogs(data.data))
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="mt-20 w-full mx-auto px-4 sm:px-6 lg:px-16">
      <div className="hero-section bg-slate-500">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim nulla quam
        veniam velit minus assumenda natus odio sapiente culpa possimus,
        excepturi veritatis ut dolorem, consequuntur dignissimos doloribus
        harum! Aliquid, nesciunt. Id neque, magni laudantium fuga quam quia
        beatae. Soluta blanditiis quis illo fugiat natus aut ab, harum molestiae
        vero quos.
      </div>
      <div className="mt-10 grid grid-cols-2 gap-[7rem]">
        <div className="flex flex-col gap-3">
          {blogs.length == 0 && "Loading ..."}
          {blogs &&
            blogs.map((blog) => {
              return (
                <BlogCard
                  key={blog.id}
                  slug={blog.slug}
                  title={blog.title}
                  content={blog.content}
                  authorName={blog.author.name}
                  publishedAt={createDate(blog.createdAt)}
                />
              );
            })}
        </div>
        <div className="w-3/4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
          reiciendis dolor temporibus nam? Placeat impedit labore fugit dolorum!
          Illum, vitae.
        </div>
      </div>
    </div>
  );
};
