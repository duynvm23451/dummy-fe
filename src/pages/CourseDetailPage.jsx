import React, { useState, useEffect, useMemo, useRef } from "react";
import { useParams, useRouteLoaderData } from "react-router-dom";
import {
  addFavoriteLesson,
  createNote,
  getCourseDetail,
  getLessonDetail,
} from "../utils/http";
import useGetData from "../hooks/useGetData";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { TiPlus } from "react-icons/ti";
import { FaHeart, FaRegBell } from "react-icons/fa";
import { FaStickyNote } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { formatDuration, formatSecondsToTime } from "../utils/helper";

const CourseDetailPage = () => {
  const params = useParams();
  const token = useRouteLoaderData("root");

  const queryParams = useMemo(
    () => ({
      token,
      id: params.id,
    }),
    [token, params]
  );
  const { data } = useGetData(getCourseDetail, queryParams);

  // State for module open status
  const [modulesOpen, setModulesOpen] = useState([]);

  const [selectedLesson, setSelectedLesson] = useState(null);

  // Update modulesOpen when data is fetched
  useEffect(() => {
    if (data?.modules && modulesOpen.length === 0) {
      setModulesOpen(
        data.modules.map((module) => ({
          id: module.id,
          isOpen: false,
        }))
      );
      setSelectedLesson(modules[0].lessons[0].id);
    }
  }, [data, modulesOpen]);

  const queryParamsLessons = useMemo(
    () => ({
      token,
      id: selectedLesson,
    }),
    [token, selectedLesson]
  );
  const { data: lesson } = useGetData(getLessonDetail, queryParamsLessons);

  const videoRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime); // Update the current time in seconds
    }
  };

  const colorsCode = [
    "#FD8A8A",
    "#FFCBCB",
    "#9EA1D4",
    "#F1F7B5",
    "#A8D1D1",
    "#DFEBEB",
  ];

  const [selectedColor, setSelectedColor] = useState(colorsCode[0]);

  const [isOpenNote, setIsOpenNote] = useState(false);
  const [noteContent, setNoteContent] = useState("");

  if (!data) {
    return <p>No data found</p>;
  }

  const { modules } = data;

  const toggleModuleOpen = (moduleId) => {
    setModulesOpen((prev) =>
      prev.map((module) =>
        module.id === moduleId ? { ...module, isOpen: !module.isOpen } : module
      )
    );
  };

  const handleAddFavorite = async (id) => {
    try {
      const data = await addFavoriteLesson(token, id);
      toast.success(data.message, {
        position: "bottom-right",
      });
    } catch (error) {
      console.error(error);
      const errorData = error.response?.data;
      toast.error(errorData?.message || "An error occurred", {
        position: "bottom-right",
      });
    }
  };

  const handleSaveNote = async (lessonId, notedTime) => {
    console.log(selectedColor);
    console.log(noteContent);
    console.log(lessonId);
    console.log(notedTime);

    const params = {
      lesson_id: lessonId,
      token,
      content: noteContent,
      color_code: selectedColor,
      noted_time: notedTime,
    };

    try {
      const data = await createNote(params);
      toast.success(data.message, {
        position: "bottom-right",
      });
    } catch (error) {
      console.error(error);
      const errorData = error.response?.data;
      toast.error(errorData?.message || "An error occurred", {
        position: "bottom-right",
      });
    }

    setIsOpenNote(false);
  };

  return (
    <div className="px-8 py-4">
      <ToastContainer />
      <div className="p-4 bg-theme-gray rounded-xl mb-6 flex items-center justify-between">
        <p>
          Trang chủ /{" "}
          <span className="text-theme-red font-semibold">Khóa học</span>
        </p>
        <div className="p-2 rounded-xl border-2 bg-theme-white border-theme-black cursor-pointer">
          <div className="w-2 h-2 rounded-full bg-theme-red absolute"></div>
          <FaRegBell className="w-6 h-6" />
        </div>
      </div>

      <div className="flex">
        <div className="w-full mr-8">
          {lesson && lesson.video_url && (
            <div className="bg-theme-gray rounded-lg pb-4">
              <video
                ref={videoRef}
                class="h-full w-full rounded-lg"
                controls
                onTimeUpdate={handleTimeUpdate}
              >
                <source src={lesson.video_url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="p-4 flex justify-between items-center">
                <h2 className="text-lg font-semibold">{lesson.name}</h2>
                <div className="flex items-center">
                  <button
                    onClick={() => handleAddFavorite(lesson.id)}
                    className="border-2 bg-theme-pink border-theme-red text-theme-red px-4 py-1.5 rounded-2xl flex items-center mr-4"
                  >
                    <FaHeart className="w-5 h-5 mr-2" />
                    Yêu thích
                  </button>
                  <button
                    onClick={() => setIsOpenNote((pre) => !pre)}
                    className="border-2  border-theme-yellow text-theme-yellow bg-theme-beige px-4 py-1.5 rounded-2xl flex items-center mr-4"
                  >
                    <FaStickyNote className="w-5 h-5 mr-2" />
                    Ghi chú
                  </button>
                </div>
              </div>
              {isOpenNote && (
                <div className="flex justify-end">
                  <div className="mx-8 bg-theme-white rounded-xl border-2 px-4 py-2 border-theme-black right-0">
                    <div className="flex justify-evenly mt-2 mb-4">
                      {colorsCode.map((el) => (
                        <div
                          onClick={() => setSelectedColor(el)}
                          style={{ backgroundColor: el }}
                          className={`w-10 h-10 border-2 mx-1 cursor-pointer border-theme-black rounded-full flex items-center justify-center`}
                        >
                          {selectedColor == el && <p>X</p>}
                        </div>
                      ))}
                    </div>
                    <textarea
                      onChange={(event) => setNoteContent(event.target.value)}
                      value={noteContent}
                      className="w-full border-2 border-theme-black rounded-lg bg-theme-beige p-4"
                    />
                    <div className="flex justify-between items-center my-2">
                      <p>{formatSecondsToTime(currentTime)}</p>
                      <button
                        onClick={() =>
                          handleSaveNote(
                            lesson.id,
                            formatSecondsToTime(currentTime)
                          )
                        }
                        className="px-4 py-1.5 bg-theme-red border-2 border-theme-black text-theme-white font-semibold rounded-xl"
                      >
                        Lưu
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="w-2/5">
          {modules.map((module) => {
            const isOpen = modulesOpen.find((m) => m.id === module.id)?.isOpen;

            return (
              <div
                key={module.id}
                className="mb-4 border rounded-lg border-theme-black overflow-hidden"
              >
                <div
                  className="px-4 py-2 bg-gray-200 cursor-pointer flex justify-between border-2 rounded-tr-lg rounded-tl-lg border-theme-black"
                  onClick={() => toggleModuleOpen(module.id)}
                >
                  <h2 className="text-lg font-semibold">{module.name}</h2>
                  <MdOutlineArrowDropDown className="w-6 h-6" />
                </div>

                {/* Lessons */}
                {isOpen && (
                  <ul className="p-4">
                    {module.lessons.length == 0 && (
                      <p>Chương này không có bài học nào</p>
                    )}
                    {module.lessons.map((lesson) => (
                      <li
                        onClick={() => setSelectedLesson(lesson.id)}
                        key={lesson.id}
                        className="mb-2 flex items-center"
                      >
                        <TiPlus />

                        <a href="#" className=" ml-2 hover:underline">
                          {lesson.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
