import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { getTimeDifference, readingTime } from "../helper";
import { IBlog } from "../types";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "../Markdown.css";
// Example usage

export const Blog = () => {
  const [blog, setBlog] = useState<IBlog>({
    id: "",
    title: "",
    description: "",
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
      .then((d) => {setBlog(d.data) 
        document.title = `Blog - ${d.data.title}`
      } )
      .catch((e) => console.log(e));
      
  }, [slug]);
  

  return (
    <div className="mt-10 md:mt-20 mx-auto px-4 sm:px-6 lg:px-16">
      <div className="md:w-3/4 mx-auto">
        <div className="flex items-start ">
          <div className="flex-shrink-0 relative inline-flex items-center justify-center w-16 h-16 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 mb-4 md:mb-0">
            <span className="font-medium text-3xl text-gray-600 dark:text-gray-300">
              {blog && blog.author.name[0]}
            </span>
          </div>
          <div className="flex flex-col ml-4 text-left">
            <p className="text-lg font-bold">{blog.author.name}</p>
            <div className="flex gap-2 text-gray-500">
              <p>{readingTime(blog.createdAt)} min read</p>
              <span>&#x2022;</span>
              <p>{getTimeDifference(blog.createdAt)}</p>
            </div>
          </div>
        </div>
        <h1 className="text-3xl font-bold my-4">{blog && blog.title}</h1>
        <p className="text-lg text-gray-700">{blog && blog.description}</p>
        <article
          className="text-left text-xl font-serif markdown text-gray-800 font-extralight mt-4 w-full min-w-0 max-w-full md:max-w-6xl "
          style={{ minHeight: "calc(100vh - 103px)" }}
        >
          <div className="prose max-w-none">
            <Markdown children={blog.content} remarkPlugins={[remarkGfm]} />
          </div>
        </article>
      </div>
    </div>
  );
};
