import { Link } from "react-router-dom";
import { readingTime } from "../../helper";

interface IBlogCardProps {
  title: string;
  slug: string;
  description: string;
  content: string;
  publishedAt: string;
  updatedAt?: string;
  authorName: string;
}

export const BlogCard = ({
  title,
  slug,
  description,
  content,
  publishedAt,
  authorName,
}: IBlogCardProps) => {
  return (
    <div className="flex flex-col p-2">
      <div className="flex items-center gap-2">
        <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
          <span className="font-medium text-gray-600 dark:text-gray-300">
            {authorName[0]}
          </span>
        </div>
        <div className="text-sm">{authorName}</div>
      </div>
      <div className="ml-[7px]">
        <Link to={`/blog/${slug}`}>
          <h3 className="text-xl font-bold">{title}</h3>
        </Link>
        <p className="text-md text-gray-500">
          {description.length >= 105
            ? description.substring(0, 105) + "..."
            : description}
        </p>
        <div className="flex gap-2 text-gray-500 text-xs mt-2">
          <p>{publishedAt}</p>
          <span>&#x2022;</span>
          <p>{readingTime(content)} min read</p>
        </div>
      </div>
    </div>
  );
};
