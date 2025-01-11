import React, { useMemo } from "react";
import { FaRegBell } from "react-icons/fa";
import { useNavigate, useRouteLoaderData } from "react-router-dom";

import favoritedCover from "../assets/images/favorited_cover.jpg";
import { IoSearchOutline } from "react-icons/io5";
import useGetData from "../hooks/useGetData";
import { listFavoritedLessons } from "../utils/http";

const FavoritedLessonPage = () => {
  const token = useRouteLoaderData("root");
  const navigate = useNavigate();

  const queryParams = useMemo(
    () => ({
      token,
    }),
    [token]
  );

  const { data } = useGetData(listFavoritedLessons, queryParams);

  if (!data) {
    return <p>No data found</p>;
  }

  return (
    <div className="px-8 py-4">
      <div className="p-4 bg-theme-gray rounded-xl mb-6 flex items-center justify-between">
        <p>
          Trang chủ /{" "}
          <span className="text-theme-red font-semibold">Video yêu thích</span>
        </p>
        <div className="p-2 rounded-xl border-2 bg-theme-white border-theme-black cursor-pointer">
          <div className="w-2 h-2 rounded-full bg-theme-red absolute"></div>
          <FaRegBell className="w-6 h-6" />
        </div>
      </div>
      <div className="p-4 bg-theme-gray rounded-xl">
        <div className="relative">
          <img
            src={favoritedCover}
            alt="cover"
            className="h-52 rounded-2xl w-full object-cover"
          />
          <div className="w-full absolute top-2 left-12 mt-10">
            <h2 className="text-3xl font-bold text-theme-black">
              Video yêu thích
            </h2>
            <h3 className="text-xl font-medium text-theme-black">
              Danh sách video được bạn đánh dấu vào yêu thích
            </h3>
            <div className="flex items-center relative w-2/5 mt-4">
              <input
                className="border-2 rounded-xl  border-theme-black pl-4 pr-8 py-2 w-full"
                placeholder="Tìm kiếm với tên video"
              />
              <IoSearchOutline className="w-6 h-6 absolute right-4" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-theme-black mt-6">
            Video yêu thích của bạn
          </h3>
          {data.length == 0 && (
            <p className="text-center">Hiện chưa có video yêu thích nào</p>
          )}
          <ul className="grid grid-cols-4 gap-4 mt-6">
            {data.map((el) => (
              <div className="px-6 py-4 border-2 flex flex-col justify-between border-theme-black bg-white rounded-lg">
                <div>
                  <h2 className="text-xl font-semibold">
                    {el.module.course.title} /
                  </h2>
                  <h3 className="text-lg font-semibold">{el.module.name} /</h3>
                  <h4 className="hover:underline cursor-pointer">{el.name}</h4>
                </div>
                <button
                  onClick={() => navigate("/courses/" + el.module.course_id)}
                  className="border-2 mt-4 w-full rounded-md border-theme-black font-medium py-1.5 bg-theme-beige"
                >
                  Di chuyển tới bài học
                </button>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FavoritedLessonPage;
