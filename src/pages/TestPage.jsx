import React, { useMemo } from "react";
import {
  useNavigate,
  useParams,
  useRouteLoaderData,
  useSearchParams,
} from "react-router-dom";
import { listTests } from "../utils/http";
import useGetData from "../hooks/useGetData";
import { FaRegBell } from "react-icons/fa";
import renderPaginationItems from "../utils/pagination";
import Pagination from "../components/shared/Pagination";

const TestPage = () => {
  const token = useRouteLoaderData("root");
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get("page") || 1;
  const size = searchParams.get("size") || 6;

  const queryParams = useMemo(
    () => ({
      token,
      page,
      size,
    }),
    [page, size, token]
  );
  const { data } = useGetData(listTests, queryParams);

  if (!data) {
    return <p>No data found</p>;
  }

  return (
    <div className="px-8 py-4">
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
      <div className="mt-6 p-4 bg-theme-gray rounded-xl">
        <h1 className="text-xl font-semibold">Kiểm tra năng lực</h1>
        <ul className="grid grid-cols-3 gap-6 mt-4">
          {data &&
            data.data.map((el) => (
              <div className="p-4 border-2 border-theme-black rounded-xl bg-theme-white">
                <div className="px-4 py-3 border-2 border-theme-black mb-2 bg-theme-pink w-fit rounded-xl">
                  {el.level}
                </div>
                <h2 className="text-lg font-semibold">{el.name}</h2>
                <p>Số câu cần đúng: {el.min_pass_scroce}</p>
                <button
                  onClick={() => {
                    navigate("/tests/" + el.id);
                  }}
                  className="mt-4 w-full border-2 py-1.5 rounded-lg border-theme-black bg-theme-beige"
                >
                  Vào thi
                </button>
              </div>
            ))}
        </ul>
        {data && (
          <div className="w-full flex justify-center mt-12">
            <Pagination
              navigatePath="/"
              pagination={renderPaginationItems(
                data.current_page,
                data.last_page
              )}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TestPage;
