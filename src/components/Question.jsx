import React from "react";

function Question({ question, options, selectedOption, onOptionChange }) {
  return (
    <div className="bg-gray-800 p-4 rounded-md">
      <p className="text-white text-lg font-semibold">{question}</p>

      <div className="mt-4">
        {options.map((option, index) => (
          <div key={index} className="mb-2">
            <label className="flex items-center">
              <input
                type="radio"
                value={index}
                checked={selectedOption === index}
                onChange={() => onOptionChange(index)}
                className="mr-2"
              />
              <span className="text-white">{option}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Question;
