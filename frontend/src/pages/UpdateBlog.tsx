import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { IBlog } from "../types";
import { Button } from "../components/ui/Button";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { loginAtom } from "../store/user";
import { ToastContainer, toast } from "react-toastify";
import MDEditor from "@uiw/react-md-editor";
import { MdDeleteOutline } from "react-icons/md";

interface IFormInput {
  title: string;
  description: string;
  slug: string;
  published: boolean;
}

export const UpdateBlog = () => {
  const loginState = useRecoilValue(loginAtom);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loginState) {
      return navigate("/signin");
    }
  document.title = 'Update Blog';
  }, []);
  const { slug } = useParams();

  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState<IBlog>({});
  const [content, setContent] = useState<string>(""); // Initialize content with an empty string

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/user/blog/${slug}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setBlog(response.data);
        setContent(response.data.content); // Set content from fetched blog data
      })
      .catch((error) => console.error(error));
  }, [slug]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>({
    values: blog, // Use defaultValues instead of values
  });

  const onSubmit = async (data: IFormInput) => {
    setLoading(true);
    try {
      const res = await axios.put(
        `${BACKEND_URL}/api/v1/blog`,
        {
          id: blog.id,
          title: data.title,
          slug: data.slug,
          description: data.description,
          content: content,
          published: data.published,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setLoading(false);
      toast.success("Blog is Updated");
      reset();
      console.log(res);
    } catch (error) {
      if (error.response.data.status === false) {
        toast.error(error.response.data.message);
      }
      toast.error("Failed to update blog");
      console.error(error);
    }
    setLoading(false);
  };

  const deleteBlog = async () => {
    const ans = confirm("Are you sure to delete Blog?");
    if (!ans) {
      return;
    }
    try {
      axios.delete(`${BACKEND_URL}/api/v1/blog/${blog.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success("Blog deleted");
      return navigate("/profile");
    } catch (error) {
      toast.error("Failed to delete Blog");
    }
  };

  return (
    <div className="mt-20">
      <div className="max-w-3xl mx-auto flex items-center justify-between">
        <h1 className="text-center font-bold text-3xl">Update Blog</h1>
        <div className="cursor-pointer" >
          <MdDeleteOutline onClick={deleteBlog} size={24} />
        </div>
      </div>
      <div className="px-16">
        <ToastContainer />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-3xl mx-auto mt-8"
        >
          <div className="mb-4">
            <label htmlFor="title" className="block mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              {...register("title", { required: true })}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.title && (
              <span className="text-red-500">Title is required</span>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="slug" className="block mb-2">
              Slug
            </label>
            <input
              type="text"
              id="slug"
              {...register("slug", { required: true })}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.slug && (
              <span className="text-red-500">Slug is required</span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="desc" className="block mb-2">
              Description
            </label>
            <textarea
              id="desc"
              {...register("description", { required: true })}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.description && (
              <span className="text-red-500">Description is required</span>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="content" className="block mb-2">
              Content
            </label>
            <MDEditor
              height={200}
              id="content"
              value={content}
              onChange={setContent}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="isPublished" className="block mb-2">
              <input
                type="checkbox"
                id="isPublished"
                {...register("published")}
                className="mr-2"
              />
              Publish
            </label>
          </div>
          <Button
            type="submit"
            label={`${loading ? "Updating..." : "Update Blog"}`}
          />
        </form>
      </div>
    </div>
  );
};
