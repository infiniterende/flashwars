import React from "react";

const Flashcard = ({ question, answer }: { question: any; answer: any }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative w-96 h-72 bg-white shadow-lg rounded-lg cursor-pointer group perspective">
        <div className="absolute w-full h-full rounded-lg bg-teal-600 text-white flex items-center justify-center text-xl font-bold backface-hidden transform group-hover:rotate-y-180 transition duration-500">
          {question}
        </div>

        {/* <div className="absolute w-full h-full rounded-lg bg-blue-500 text-white flex items-center justify-center text-xl font-bold backface-hidden transform rotate-y-180 group-hover:rotate-y-0 transition duration-500">
          Back Side
        </div> */}
      </div>
    </div>
  );
};

export default Flashcard;
