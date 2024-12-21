import React from "react";
import dummyLogo from "../assets/images/dummy-logo.png";
import toriImage from "../assets/images/tori.png";
import { NavLink, useLocation } from "react-router-dom";
import { TiHeartOutline } from "react-icons/ti";

import { SiGoogleclassroom } from "react-icons/si";
import { PiCertificateBold } from "react-icons/pi";

import { FaHourglassEnd } from "react-icons/fa6";
import { LuNotebookPen } from "react-icons/lu";

import { logOut } from "../services/authenicationService";

const NavHeader = () => {
  const { pathname } = useLocation();
  return (
    <div className="absolute left-0 top-0 bottom-0 w-56 h-screen flex flex-col bg-theme-gray">
      <div className="flex items-center mt-4 ml-2 mb-10">
        <img src={dummyLogo} alt="logo" className="h-12" />
        <h2 className="uppercase text-2xl font-black">Dummy</h2>
      </div>
      <ul>
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            `flex items-center text-lg font-semibold mt-4 py-3 px-8 ${
              isActive ? "text-theme-yellow bg-theme-white" : "text-theme-black"
            }`
          }
        >
          <SiGoogleclassroom
            className="w-7 h-7 mr-4 mb-0.5"
            isActive={pathname === "/" || pathname.includes("courses")}
          />
          Khóa học
        </NavLink>
        <NavLink
          to={"/favorites"}
          className={({ isActive }) =>
            `flex items-center text-lg font-semibold mt-4 py-3 px-8 ${
              isActive ? "text-theme-yellow bg-theme-white" : "text-theme-black"
            }`
          }
        >
          <TiHeartOutline
            className="w-7 h-7 mr-4 mb-0.5"
            isActive={pathname.includes("/favorites")}
          />
          Bài học thích
        </NavLink>
        <NavLink
          to={"/notes"}
          className={({ isActive }) =>
            `flex items-center text-lg font-semibold mt-4 py-3 px-8 ${
              isActive ? "text-theme-yellow bg-theme-white" : "text-theme-black"
            }`
          }
        >
          <LuNotebookPen
            className="w-7 h-7 mr-4 mb-0.5"
            isActive={pathname.includes("/tests")}
          />
          Ghi chú
        </NavLink>
        <NavLink
          to={"/tests"}
          className={({ isActive }) =>
            `flex items-center text-lg font-semibold mt-4 py-3 px-8 ${
              isActive ? "text-theme-yellow bg-theme-white" : "text-theme-black"
            }`
          }
        >
          <PiCertificateBold
            className="w-7 h-7 mr-4 mb-0.5"
            isActive={pathname.includes("/tests")}
          />
          Thi thử
        </NavLink>
        <NavLink
          to={"/test-attempts"}
          className={({ isActive }) =>
            `flex items-center text-lg font-semibold mt-4 py-3 px-8 ${
              isActive ? "text-theme-yellow bg-theme-white" : "text-theme-black"
            }`
          }
        >
          <FaHourglassEnd
            className="w-7 h-7 mr-4 mb-0.5"
            isActive={pathname.includes("/test-attempts")}
          />
          Kết quả thi
        </NavLink>
      </ul>
      <img src={toriImage} alt="logo" className="mt-4" />

      <div className="flex items-end mb-10 justify-center flex-1">
        <button
          onClick={logOut}
          className="px-8 bg-theme-red py-2 rounded-xl text-theme-white font-semibold text-lg"
        >
          Đăng xuất
        </button>
      </div>
    </div>
  );
};

export default NavHeader;
