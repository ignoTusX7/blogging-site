import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { getTimeDifference, readingTime } from "../helper";
import { IBlog } from "../types";

// Example usage

export const Blog = () => {
  const [blog, setBlog] = useState<IBlog>({
    id: "",
    title: "",
    slug: "",
    content: "",
    createdAt: "",
    author: {
      id: "",
      name: "",
    },
  });

  const { slug } = useParams();

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/${slug}`)
      .then((d) => setBlog(d.data))
      .catch((e) => console.log(e));
  }, [slug]);

  return (
    <div className="mt-20 w-full mx-auto px-4 sm:px-6 lg:px-16">
      <div className="w-3/4 flex mx-auto">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold mb-7">{blog && blog.title}</h1>
          <div className="flex items-center gap-4 mb-7">
            <div className="relative inline-flex items-center justify-center w-16 h-16 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
              <span className="font-medium text-3xl text-gray-600 dark:text-gray-300">
                {blog.author.name[0]}
              </span>
            </div>
            <div className="flex flex-col text-left">
              <p className="text-lg font-bold">{blog.author.name}</p>
              <div className="flex gap-2 text-gray-500">
                <p>{readingTime(blog.createdAt)} min read</p>
                <span>&#x2022;</span>
                <p>{getTimeDifference(blog.createdAt)}</p>
              </div>
            </div>
          </div>
          <div className="text-left text-xl font-serif text-gray-800 font-extralight">
            {blog.content}
          </div>
        </div>
      </div>
    </div>
  );
};
