import React, { useMemo, useState } from "react";
import { useNavigate, useParams, useRouteLoaderData } from "react-router-dom";
import useGetData from "../hooks/useGetData";
import { getTestDetail, submitTest } from "../utils/http";
import { FaRegBell } from "react-icons/fa6";
import CountdownTimer from "../components/CountdownTimer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TestDetailPage = () => {
  const params = useParams();
  const token = useRouteLoaderData("root");
  const navigate = useNavigate();

  const queryParams = useMemo(
    () => ({
      id: params.id,
      token,
    }),
    [token]
  );

  const { data } = useGetData(getTestDetail, queryParams);

  const [selectedQuestions, setSelectedQuestion] = useState([]);

  const [timeRemaining, setTimeRemaining] = useState(null);

  const handleTimeChange = (timeLeft) => {
    setTimeRemaining(timeLeft); // Update the parent's state with the remaining time
  };

  const handleSelectQuestion = (event, questionId) => {
    const value = Number(event.target.value);

    setSelectedQuestion((prev) => {
      // Check if question_id already exists in the array
      const existingIndex = prev.findIndex(
        (item) => item.question_id === questionId
      );

      if (existingIndex !== -1) {
        // If the question_id exists, replace the answer
        const updatedArray = [...prev];
        updatedArray[existingIndex].answer = value;
        return updatedArray;
      } else {
        // If the question_id does not exist, add a new object
        return [...prev, { question_id: questionId, answer: value }];
      }
    });
  };

  const checkSelected = (questionId) => {
    return selectedQuestions.some((item) => item.question_id === questionId);
  };

  const handleSubmitTest = async () => {
    const passedTime = data.duration - timeRemaining;
    const testId = data.id;
    let numberOfCorrect = 0;

    const { questions } = data;

    questions.forEach((element) => {
      selectedQuestions.forEach((el) => {
        const answer = element.question_answer.find(
          (item) => item.id === el.answer
        );
        if (el.question_id == element.id && answer.is_correct == 1) {
          numberOfCorrect += 1;
        }
      });
    });

    const submitObject = {
      test_id: testId,
      score_achieved: numberOfCorrect,
      completed_time: passedTime,
    };
    console.log(submitObject);
    try {
      const data = await submitTest(submitObject, token);
      console.log(data);
      toast.success(data.message, {
        position: "bottom-right",
      });
      navigate("/test-attempts/");
    } catch (error) {
      console.error(error);
      const errorData = error.response?.data;
      toast.error(errorData?.message || "An error occurred", {
        position: "bottom-right",
      });
    }
  };

  if (!data) {
    return <p>No data found</p>;
  }

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
      <div className="p-4 rounded-xl bg-theme-gray">
        <h2 className="text-lg font-semibold mb-2">{data.name}</h2>
        <div className="flex justify-between items-center">
          <CountdownTimer
            initialSeconds={data.duration}
            onTimeChange={handleTimeChange}
          />
          <button
            onClick={handleSubmitTest}
            className="px-4 py-1.5 border-2 border-theme-black rounded-xl bg-theme-red text-theme-white uppercase font-semibold"
          >
            Nộp bài
          </button>
        </div>
        <ul className="flex flex-wrap gap-x-2 gap-y-3 mt-4">
          {data.questions.map((question, index) => (
            <div
              key={question.id}
              className={`px-4 py-2 rounded-lg h-fit w-fit border-2 border-theme-black ${
                checkSelected(question.id) ? "bg-theme-pink" : " bg-theme-white"
              }`}
            >
              {index + 1}
            </div>
          ))}
        </ul>
      </div>
      <div className="p-4 rounded-xl bg-theme-gray mt-6">
        <div className="h-8 bg-theme-white rounded-lg border-2 border-theme-black mb-4"></div>
        {data.questions.map((question, index) => {
          return (
            <div className=" p-4 bg-theme-white rounded-lg border-2 border-theme-black mb-4">
              <div className="flex items-center">
                <div className="px-3 py-1 bg-theme-yellow rounded-lg border-2 border-theme-black mr-4">
                  {index + 1}
                </div>
                <h2 className="font-medium text-lg">{question.title}</h2>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6">
                {question.question_answer.map((el) => (
                  <div className="border-2 py-2 rounded-lg border-theme-black px-4">
                    <label className="flex items-center">
                      <input
                        name={question.id}
                        id={el.id}
                        type="radio"
                        className="mr-4"
                        value={el.id}
                        onChange={(event) =>
                          handleSelectQuestion(event, question.id)
                        }
                      />
                      <span>{el.answer}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TestDetailPage;
