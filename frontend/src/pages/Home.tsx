import { useEffect, useState } from "react";
import { BlogCard } from "../components/ui/BlogCard";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { IBlog } from "../types";
import { createDate } from "../helper";
import { Button } from "../components/ui/Button";

export const Home = () => {
  const [blogs, setBlogs] = useState<IBlog[]>([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog`)
      .then((data) => setBlogs(data.data))
      .catch((e) => console.log(e));
  }, []);

  return (
    <>
      <div className="pt-20 bg-yellow-500">
        <div className="px-5 md:px-20 py-6 md:py-12 grid md:grid-cols-2">
          <div>
            <h2 className="text-6xl md:text-8xl font-serif mb-7">
              Stay Curious.
            </h2>
            <p className="text-gray-800 text-2xl mb-5">
              Discover stories, thinking, and expertise from writers on any
              topic.
            </p>
            <div className="flex w-1/3 md:w-1/3">
              <Button label="Join us" />
            </div>
          </div>
          <div></div>
        </div>
      </div>
      <div className="mt-20 w-full mx-auto px-4 sm:px-6 lg:px-16">
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-[7rem]">
          <div className="flex flex-col gap-3">
            {blogs.length == 0 && "Loading ..."}
            {blogs &&
              blogs.map((blog) => {
                return (
                  <BlogCard
                    key={blog.id}
                    slug={blog.slug}
                    title={blog.title}
                    description={blog.description}
                    content={blog.content}
                    authorName={blog.author.name}
                    publishedAt={createDate(blog.createdAt)}
                  />
                );
              })}
          </div>
          <div className="w-full md:w-3/4 bg-white">
            <div className="sticky top-16 right-0">
              <p className="font-bold">Discover more of what matters to you</p>
              <div className="grid grid-cols-3 gap-2 mt-4">
                <span className="inline-flex items-center bg-yellow-50 px-3 py-2 text-sm font-medium text-yellow-800 ring-1 rounded-xl ring-inset ring-yellow-600/20 ">
                  Programming
                </span>
                <span className="inline-flex items-center bg-yellow-50 px-3 py-2 text-sm font-medium text-yellow-800 ring-1 rounded-xl ring-inset ring-yellow-600/20 ">
                  Data Science
                </span>
                <span className="inline-flex items-center bg-yellow-50 px-3 py-2 text-sm font-medium text-yellow-800 ring-1 rounded-xl ring-inset ring-yellow-600/20 ">
                  Technology
                </span>
                <span className="inline-flex items-center bg-yellow-50 px-3 py-2 text-sm font-medium text-yellow-800 ring-1 rounded-xl ring-inset ring-yellow-600/20 ">
                  Technology
                </span>
                <span className="inline-flex items-center bg-yellow-50 px-3 py-2 text-sm font-medium text-yellow-800 ring-1 rounded-xl ring-inset ring-yellow-600/20 ">
                  Technology
                </span>
                <span className="inline-flex items-center bg-yellow-50 px-3 py-2 text-sm font-medium text-yellow-800 ring-1 rounded-xl ring-inset ring-yellow-600/20 ">
                  Technology
                </span>
                <span className="inline-flex items-center bg-yellow-50 px-3 py-2 text-sm font-medium text-yellow-800 ring-1 rounded-xl ring-inset ring-yellow-600/20 ">
                  Technology
                </span>
                <span className="inline-flex items-center bg-yellow-50 px-3 py-2 text-sm font-medium text-yellow-800 ring-1 rounded-xl ring-inset ring-yellow-600/20 ">
                  Technology
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
