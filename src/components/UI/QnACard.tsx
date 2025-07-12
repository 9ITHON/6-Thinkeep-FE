import React from "react";

interface QnACardProps {
  number: number;
  question: React.ReactNode;
  answer: React.ReactNode;
}

const QnACard = ({ number, question, answer }: QnACardProps) => {
  return (
    <div className="mb-4 bg-gray1 mx-5 rounded-xl p-4">
      <div className="text-yellow text-[16px] font-medium mb-3 flex gap-2">
        <div className="w-8 h-8 border-[3px] border-gray2 bg-background rounded-full flex items-center justify-center shrink-0 mt-[2px] ">
          <span className="text-[20px] leading-[27px] font-semibold text-white">
            {number}
          </span>
        </div>
        <span className="text-[16px] leading-snug py-1.5">{question}</span>
      </div>

      <div className="bg-background text-white text-[20px] text-normal rounded-xl p-4">
        {answer}
      </div>
    </div>
  );
};

export default QnACard;
