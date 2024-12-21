import React, { useMemo } from "react";
import { useRouteLoaderData } from "react-router-dom";
import useGetData from "../hooks/useGetData";
import { deleteNote, listNotes } from "../utils/http";
import { FaRegBell } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
import { BsTrashFill } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NotePage = () => {
  const token = useRouteLoaderData("root");

  const { data, refetch } = useGetData(listNotes, token);

  if (!data) {
    return <p>No data found</p>;
  }

  const handleRemoveNote = async (id) => {
    try {
      const data = await deleteNote(token, id);
      toast.success(data.message, {
        position: "bottom-right",
      });
      window.location.reload();
    } catch (error) {
      console.error(error);
      const errorData = error.response?.data;
      toast.error(errorData?.message || "An error occurred", {
        position: "bottom-right",
      });
    }
  };

  return (
    <div className="px-8 py-4">
      <ToastContainer />
      <div className="p-4 bg-theme-gray rounded-xl mb-6 flex items-center justify-between">
        <p>
          Trang chủ /{" "}
          <span className="text-theme-red font-semibold">Thi thử</span>
        </p>
        <div className="p-2 rounded-xl border-2 bg-theme-white border-theme-black cursor-pointer">
          <div className="w-2 h-2 rounded-full bg-theme-red absolute"></div>
          <FaRegBell className="w-6 h-6" />
        </div>
      </div>
      <div className="bg-theme-gray p-4 rounded-xl">
        <h2 className="text-xl font-semibold">Ghi chú</h2>{" "}
        <div className="flex items-center relative w-1/4 mt-4">
          <input
            className="border-2 rounded-xl  border-theme-black pl-4 pr-8 py-2 w-full"
            placeholder="Tìm kiếm ghi chú"
          />
          <IoSearchOutline className="w-6 h-6 absolute right-4" />
        </div>
        <div className="grid grid-cols-5 gap-6 mt-6">
          {data.map((el) => (
            <div
              className="p-4 min-h-48 border-2 border-theme-black rounded-xl flex flex-col justify-between"
              style={{ backgroundColor: el.color_code }}
            >
              <p>{el.content}</p>
              <div className="flex justify-between items-center">
                <p>{el.noted_time}</p>
                <button
                  onClick={() => handleRemoveNote(el.id)}
                  className="p-3 bg-theme-white border-2 border-theme-black rounded-full"
                >
                  <BsTrashFill className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotePage;
