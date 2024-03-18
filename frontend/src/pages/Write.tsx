import { useRecoilValue } from "recoil";
import { loginAtom } from "../store/user";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "../components/ui/Button";
import MDEditor from "@uiw/react-md-editor";
// No import is required in the WebPack.
import "@uiw/react-md-editor/markdown-editor.css";
// No import is required in the WebPack.
import "@uiw/react-markdown-preview/markdown.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IFormInput {
  title: string;
  description: string;
  slug: string;
  published: boolean;
}

export const Write = () => {
  const mkdStr = `**Write blog content here!!!**`;
  const navigate = useNavigate();

  const loginState = useRecoilValue(loginAtom);

  const [value, setValue] = useState(mkdStr);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>();

  useEffect(() => {
    if (!loginState) {
      return navigate("/signin");
    }
  }, []);

  const onSubmit = async (data: IFormInput) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/blog`,
        {
          title: data.title,
          slug: data.slug,
          description: data.description,
          content: value,
          published: data.published,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setLoading(false);
      toast.success("Blog is Created");
      setValue("");
      reset();
      console.log(res);
    } catch (error) {
      //@ts-expect-error unknown_type
      if (error.response.data.status === false) {
        //@ts-expect-error not_know_type
        return toast.error(error.response.data.message);
      }
      toast.error("Failed to post blog");
      setLoading(false);
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="mt-20 px-16">
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
          <input
            type="text"
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
            value={value}
            onChange={setValue}
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
          label={`${loading ? "Loading..." : "Post Blog"}`}
        />
      </form>
    </div>
  );
};
