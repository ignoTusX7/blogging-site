import { useEffect, useState } from "react";
import { IBlog } from "../types";
import axios from "axios";
import { BACKEND_URL } from "../config";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";

const columns = [
  {
    name: "Title",
    selector: (row) => row.title,
    sortable: true,
  },
  {
    name: "Slug",
    selector: (row) => row.slug,
    sortable: true,
  },
  {
    name: "Created At",
    selector: (row) => row.createdAt,
    sortable: true,
  },
  {
    name: "Published",
    selector: (row) => row.published.toString(),
  },
];

export const UserBlog = () => {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/user/blogs`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((d) => setBlogs(d.data))
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {blogs.length > 0 ? (
        <DataTable
          columns={columns}
          data={blogs}
          pagination
          onRowClicked={(row) => navigate(`/profile/update/${row.slug}`)}
        />
      ) : "Loading ..."}
    </div>
  );
};
