import React, { useMemo, useRef } from "react";
import { useNavigate, useRouteLoaderData } from "react-router-dom";
import useGetData from "../hooks/useGetData";
import {
  getLoggedInUser,
  listRegistedCourses,
  listUnregisterdCourses,
} from "../utils/http";
import { IoSearchOutline } from "react-icons/io5";
import { TbFileDescription } from "react-icons/tb";

import { FaRegBell } from "react-icons/fa";
const CoursesPage = () => {
  const navigate = useNavigate();
  const token = useRouteLoaderData("root");
  const queryParams = useMemo(
    () => ({
      token,
    }),
    [token]
  );
  const { data } = useGetData(getLoggedInUser, queryParams);
  const { data: registedCourses } = useGetData(
    listRegistedCourses,
    queryParams
  );
  const { data: unRegistedCourses } = useGetData(
    listUnregisterdCourses,
    queryParams
  );

  if (!data || !registedCourses || !unRegistedCourses) {
    return <p>No data found</p>;
  }

  return (
    <div className="mx-8 my-4">
      <div className=" bg-theme-gray rounded-lg">
        <div className="p-4 flex justify-between">
          <div>
            <h2 className="uppercase font-semibold">Xin chào {data.name}</h2>
            <p className="text-gray-500">
              Hãy cùng nhau học tiếng nhật nào !!!
            </p>
          </div>
          <div className="flex items-center mr-8">
            <div className="flex items-center relative mr-6">
              <input
                className="border-2 rounded-xl  border-theme-black pl-4 pr-8 py-2 min-w-80"
                placeholder="Tìm kiếm khóa học"
              />
              <IoSearchOutline className="w-6 h-6 absolute right-4" />
            </div>
            <div className="p-2 rounded-xl border-2 bg-theme-white border-theme-black cursor-pointer">
              <div className="w-2 h-2 rounded-full bg-theme-red absolute"></div>
              <FaRegBell className="w-6 h-6" />
            </div>
          </div>
        </div>
        <div className="border-t-2 p-4">
          <p>
            Trang chủ /{" "}
            <span className="text-theme-red font-semibold">Khóa học</span>
          </p>
        </div>
      </div>
      <div className="p-4 bg-theme-gray rounded-lg mt-6">
        <h2 className="text-xl font-semibold">Khóa học của tôi</h2>
        <div className="mt-6 flex gap-4">
          {registedCourses.map((el) => (
            <div className="px-6 py-4 bg-theme-white border-2 border-theme-black rounded-xl w-72">
              <div className="flex items-center">
                <div className="p-4 rounded-full bg-theme-pink font-semibold">
                  {el.level}
                </div>
                <h2 className="ml-4 text-lg font-semibold">{el.title}</h2>
              </div>
              <div className="bg-theme-beige p-4 mt-4 rounded-lg">
                <p className="flex items-center mb-2">
                  <TbFileDescription className="w-6 h-6 mr-2" />
                  Mô tả
                </p>
                <p>{el.description}</p>
              </div>
              <button
                onClick={() => {
                  navigate("/courses/" + el.id);
                }}
                className="bg-theme-gray border-2 border-theme-black w-full rounded-lg mt-8 py-2 font-semibold"
              >
                Vào học
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 bg-theme-gray rounded-lg mt-6">
        <h2 className="text-xl font-semibold">Khám phá khóa học</h2>
        <div className="mt-6 flex gap-4">
          {unRegistedCourses.map((el) => (
            <div className="px-6 py-4 bg-theme-white border-2 border-theme-black rounded-xl w-72">
              <div className="flex items-center">
                <div className="p-4 rounded-full bg-theme-pink font-semibold">
                  {el.level}
                </div>
                <h2 className="ml-4 text-lg font-semibold">{el.title}</h2>
              </div>
              <div className="bg-theme-beige p-4 mt-4 rounded-lg">
                <p className="flex items-center mb-2">
                  <TbFileDescription className="w-6 h-6 mr-2" />
                  Mô tả
                </p>
                <p>{el.description}</p>
              </div>
              <button className="bg-theme-red text-theme-white border-2 border-theme-black w-full rounded-lg mt-8 py-2 font-semibold">
                Đăng kí học
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
