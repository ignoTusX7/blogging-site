import { Link } from "react-router-dom";

interface IBlogCardProps {
  title: string;
  slug: string;
  content: string;
  publishedAt: string;
  authorName: string;
}

export const BlogCard = ({
  title,
  slug,
  content,
  publishedAt,
  authorName,
}: IBlogCardProps) => {
  const readingTime = (text: string) => {
    const wpm = 225;
    const words = text.trim().split(/\s+/).length;
    const time = Math.ceil(words / wpm);
    return time;
  };

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
          {content.length >= 20 ? content.substring(0, 20) : content}
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
