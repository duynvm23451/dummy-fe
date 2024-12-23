import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login, signup } from "../utils/http";
import { setToken } from "../services/localStorageService";

const AuthPage = () => {
  const [isLoginPage, setIsLoginPage] = useState(true);
  const onHandleSubmit = async (event) => {
    event.preventDefault();
    const fd = new FormData(event.target);
    const formData = Object.fromEntries(fd.entries());
    if (isLoginPage) {
      try {
        const data = await login(formData);

        setToken(data.data.access_token);
        toast.success(data.message);
        window.location.href = "/";
      } catch (error) {
        const errorData = error.response.data;
        toast.error(errorData.message, {
          position: "bottom-right",
        });
      }
    } else {
      try {
        const data = await signup(formData);
        toast.success(data.message);
        setIsLoginPage(true);
      } catch (error) {
        const errorData = error.response.data;
        toast.error(errorData.message, {
          position: "bottom-right",
        });
      }
    }
  };
  return (
    <div className="h-screen bg-theme-gray flex justify-center items-center">
      <ToastContainer />
      <div className="w-1/2 bg-theme-white flex">
        <div className="w-full px-12 pt-8 pb-10">
          <h1 className="text-3xl font-medium text-gray-600">
            {isLoginPage ? "Đăng nhập" : "Đăng ký"}
          </h1>
          <form className="mt-8" onSubmit={onHandleSubmit}>
            <label className="block mb-2 uppercase text-sm font-semibold">
              email
            </label>
            <input
              className="block w-full px-4 py-1.5 rounded-2xl bg-gray-100"
              type="email"
              name="email"
            />
            {!isLoginPage && (
              <label className="block mt-4 mb-2 uppercase font-semibold text-sm">
                tên người dùng
              </label>
            )}
            {!isLoginPage && (
              <input
                className="block w-full px-4 py-1.5 rounded-2xl bg-gray-100"
                type="text"
                name="name"
              />
            )}
            <label className="block mt-4 mb-2 uppercase font-semibold text-sm">
              mật khẩu
            </label>
            <input
              className="block w-full px-4 py-1.5 rounded-2xl bg-gray-100"
              type="password"
              name="password"
            />
            <button
              type="submit"
              className="uppercase hover:opacity-80 text-sm font-semibold w-full py-2.5 bg-theme-red mt-8 rounded-2xl text-white"
            >
              {isLoginPage ? "đăng nhập" : "đăng kí"}
            </button>
            {isLoginPage && (
              <div className={"flex justify-between mt-4"}>
                <div className="flex justify-center">
                  <input type="checkbox" className="mr-1.5" />
                  <label className="text-sm font-medium text-theme-red">
                    Lưu tài khoản
                  </label>
                </div>

                <label className="text-sm font-medium text-gray-600">
                  Quên mật khẩu ?
                </label>
              </div>
            )}
          </form>
        </div>
        <div className="w-full bg-theme-red">
          <div className="px-32 h-full flex flex-col justify-center items-center">
            <h1 className="uppercase text-2xl font-semibold text-theme-white text-center">
              chào mừng đến với dummy
            </h1>
            <button
              onClick={() => setIsLoginPage((preValue) => !preValue)}
              className="mt-4 border-2 border-theme-white rounded-2xl px-4 py-2 text-theme-white"
            >
              {isLoginPage ? "Đăng ký" : "Đăng nhập"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
