import React, { useEffect, useMemo, useState } from "react";
import { useRouteLoaderData } from "react-router-dom";
import useGetData from "../hooks/useGetData";
import { testResults } from "../utils/http";
import { FaRegBell } from "react-icons/fa6";
import { PiBookOpenTextBold } from "react-icons/pi";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { TiPlus } from "react-icons/ti";
import { LuAlarmClockCheck } from "react-icons/lu";
import { LuPencilRuler } from "react-icons/lu";

import { formatDuration, formatTimestampToDate } from "../utils/helper";

const TestAttempsPage = () => {
  const token = useRouteLoaderData("root");
  const queryParams = useMemo(
    () => ({
      token,
    }),
    [token]
  );
  const { data } = useGetData(testResults, queryParams);

  const [testsOpen, setTestsOpen] = useState([]);

  useEffect(() => {
    console.log(data);
    if (data && testsOpen.length === 0) {
      setTestsOpen(
        data.map((test) => ({
          id: test.id,
          isOpen: false,
        }))
      );
    }
  }, [data, testsOpen]);

  const toggleTestOpen = (testId) => {
    setTestsOpen((prev) =>
      prev.map((test) =>
        test.id === testId ? { ...test, isOpen: !test.isOpen } : test
      )
    );
  };

  console.log(testsOpen);
  if (!data) {
    return <p>No data found</p>;
  }

  return (
    <div className="px-8 py-4">
      <div className="p-4 bg-theme-gray rounded-xl mb-6 flex items-center justify-between">
        <p>
          Trang chủ /{" "}
          <span className="text-theme-red font-semibold">Lịch sử làm bài</span>
        </p>
        <div className="p-2 rounded-xl border-2 bg-theme-white border-theme-black cursor-pointer">
          <div className="w-2 h-2 rounded-full bg-theme-red absolute"></div>
          <FaRegBell className="w-6 h-6" />
        </div>
      </div>
      <div className="bg-theme-gray p-4 rounded-xl">
        <h2 className="text-xl font-semibold">Thống kê lịch sử làm bài</h2>
        <div className="bg-theme-pink flex mt-4 p-8 rounded-lg">
          <div className="bg-theme-white h-fit border-2 border-theme-black w-fit p-3 rounded-full">
            <PiBookOpenTextBold className="w-6 h-6" />
          </div>
          <div className="ml-4">
            <h4 className="text-lg">Kiểm tra năng lực</h4>
            <h2 className="text-2xl font-semibold">{data.length} bài</h2>
          </div>
        </div>
      </div>
      <div className="bg-theme-gray p-4 rounded-xl mt-6">
        <table className="w-full border-b-1 border-custom-neutral-2">
          <thead className="border-b-1 border-custom-neutral-2 border-b-2 border-theme-black">
            <tr>
              <th className="p-3 font-bold tracking-wide text-left">#</th>
              <th className="p-3 font-bold tracking-wide text-left uppercase text-sm">
                Tên bài kiểm tra
              </th>
              <th className="p-3 font-bold tracking-wide text-left uppercase text-sm">
                Số câu cần để đỗ
              </th>
              <th className="p-3 font-bold tracking-wide text-left uppercase text-sm">
                Cấp độ
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((test) => {
              const isOpen = testsOpen.find((m) => m.id === test.id)?.isOpen;

              return (
                <React.Fragment key={test.id}>
                  <tr
                    onClick={() => toggleTestOpen(test.id)}
                    className="border-2 border-theme-black overflow-hidden"
                  >
                    <td className="px-3 py-4 tracking-wider max-w-48 font-semibold">
                      {test.id}
                    </td>
                    <td className="px-3 py-4 tracking-wider max-w-48 font-semibold">
                      <h2 className="text-lg font-semibold">{test.name}</h2>
                    </td>
                    <td className="px-3 py-4 tracking-wider max-w-48 font-semibold">
                      <h2 className="text-lg font-semibold">
                        {test.min_pass_scroce}
                      </h2>
                    </td>
                    <td className="px-3 py-4 tracking-wider max-w-48">
                      <span className="font-bold px-2.5 py-1.5 rounded-lg bg-theme-black text-white">
                        {test.level}
                      </span>
                    </td>
                    <td className="">
                      <MdOutlineArrowDropDown className="w-6 h-6" />
                    </td>
                  </tr>

                  {/* Expanded Row */}
                  {isOpen && (
                    <tr>
                      <td colSpan={5} className="p-4 bg-theme-light-gray">
                        <ul className="grid grid-cols-3 gap-6">
                          {test.student_test_attemps.map((result) => (
                            <li
                              key={result.id}
                              className="mb-2 flex items-center"
                            >
                              <TiPlus className="w-6 h-6 mr-4" />
                              <div className="p-4 bg-theme-white rounded-xl w-full">
                                <h2 className="text-xl font-semibold">
                                  Số câu làm đúng:{" "}
                                  <span className="text-theme-red">
                                    {result.score_achieved}
                                  </span>
                                </h2>
                                <div className="flex items-center justify-between">
                                  <div>
                                    <p className="flex items-center mt-2">
                                      <LuAlarmClockCheck className="w-6 h-6 mr-2" />{" "}
                                      {formatDuration(result.completed_time)}
                                    </p>
                                    <p className="flex items-center mt-2">
                                      <LuPencilRuler className="w-6 h-6 mr-2" />{" "}
                                      {formatTimestampToDate(result.created_at)}
                                    </p>
                                  </div>
                                  <div
                                    className={`p-3 rounded-full font-semibold border-2 border-theme-black ${
                                      result.score_achieved >=
                                      test.min_pass_scroce
                                        ? "bg-theme-red text-theme-white"
                                        : "bg-theme-gray"
                                    }`}
                                  >
                                    {result.score_achieved >=
                                    test.min_pass_scroce
                                      ? "ĐỖ"
                                      : "TRƯỢT"}
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TestAttempsPage;
