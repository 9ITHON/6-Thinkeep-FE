import axios from "axios";
import BarGraph from "@/components/UI/BarGraph";
import Button from "@/components/UI/Button";
import { HeaderBackward } from "@/components/UI/HeaderBacward";
import QuestionCard from "@/components/UI/QuestionCard";
import React, { useState, useEffect } from "react";
import { useCounterStore } from "@/providers/counter-store-provider";
import Image from "next/image";
import { useRouter } from "next/navigation";

const RecallPage = () => {
  const router = useRouter();
  const [recallStatus, setRecallStatus] = useState<number>(0);
  const [records, setRecords] = useState<any[]>([]);
  const { userNo } = useCounterStore((state) => state);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const res = await axios.get(
          `http://13.209.69.235:8080/api/records/user/${userNo}/all`
        );
        setRecords(res.data);
      } catch (e) {
        setRecords([]);
      }
    };
    if (userNo) fetchRecords();
  }, [userNo]);

  const handleRecall = (status: number) => {
    setRecallStatus(status);
  };

  const handleDelete = async (recordId: number) => {
    try {
      await axios.delete(
        `http://13.209.69.235:8080/api/records/${recordId}?userNo=${userNo}`
      );
      setRecords((prev) => prev.filter((rec) => rec.recordId !== recordId));
    } catch (e) {
      alert("삭제 실패");
    }
  };
  const handleEdit = (recordId: number) => {
    // TODO: 수정 모달/페이지로 이동 또는 구현
    alert(`수정 기능은 추후 구현 예정. recordId: ${recordId}`);
  };

  const cardList = [
    {
      id: 0,
      title: (
        <h2 className="w-full text-xl font-semibold leading-6 tracking-tight text-center text-white">
          오늘 기분이 어때요?
        </h2>
      ),
      emotion: "nothing",
      icon: "flower.svg",
      iconSize: 228,
      micMessage: undefined,
    },
    {
      id: 1,
      title: (
        <h2 className="w-full text-xl font-semibold leading-6 tracking-tight text-center text-white">
          오늘 <span className="text-primary">누구</span>와 함께
          <br />
          시간을 보냈나요?
        </h2>
      ),
      emotion: "nothing",
      icon: "flower.svg",
      iconSize: 228,
      micMessage: undefined,
    },
  ];

  const currentCard = cardList.find((card) => card.id === recallStatus); //recordStatus에 해당하는 card를 찾음

  const [response, setResponse] = useState<Record<number, string>>({
    0: "",
    1: "",
  });

  const handleRecallAnswer = (answer: string) => {
    setResponse((prev) => ({
      ...prev,
      [recallStatus]: answer,
    }));
  };

  return (
    <div className="w-full h-screen overflow-hidden bg-background">
      <div className="flex flex-row gap-4 p-4">
        {" "}
        {/*header*/}
        <HeaderBackward visible={true} />
        <BarGraph total={2} recorded={recallStatus} />
      </div>
      <div className="flex flex-col items-center w-full h-full gap-5 pt-4">
        <div className="flex flex-row justify-around w-full px-4">
          {recallStatus === 0 ? (
            <div className="w-[48px]"></div>
          ) : (
            <Image
              src="arrow_left.svg"
              alt="이전"
              width={48}
              height={48}
              onClick={() => handleRecall(recallStatus - 1)}
            />
          )}
          {currentCard && (
            <QuestionCard
              title={currentCard.title}
              emotion={currentCard.emotion}
              iconSize={currentCard.iconSize}
              icon={currentCard.icon}
              micMessage={currentCard.micMessage}
            />
          )}

          {recallStatus === 1 ? (
            <div className="w-[48px]"></div>
          ) : (
            <Image
              src="arrow_right.svg"
              alt="이후"
              width={48}
              height={48}
              onClick={() => handleRecall(recallStatus + 1)}
            />
          )}
        </div>
        <div className="flex flex-col items-center w-full h-auto gap-6 px-6">
          <p
            onClick={() => {
              const updatedResponse = {
                ...response,
                [recallStatus]: "",
              };

              setResponse(updatedResponse);

              if (recallStatus < cardList.length - 1) {
                setRecallStatus(recallStatus + 1);
              } else {
                // 마지막에서 '모르겠어요' 클릭 시 finish2로
                router.push("/finish2");
              }
            }}
            className="cursor-pointer pb-20 font-semibold text-white text-[1.125rem] leading-[1.4375rem] tracking-tight underline decoration-solid decoration-auto underline-offset-auto"
          >
            모르겠어요. 넘어갈게요!
          </p>

          <div className="flex flex-row w-full h-auto gap-2">
            {["철수", "영희", "돌쇠"].map((name) => (
              <Button
                key={name}
                text={name}
                onClick={() => handleRecallAnswer(name)}
                className={`rounded-[1.25rem] w-full py-8 text-[1.375rem] font-semibold text-center leading-[1.875rem] tracking-tight 
        ${
          response[recallStatus] === name
            ? "bg-primary text-background"
            : "bg-gray2 text-background"
        }`}
              />
            ))}
          </div>

          <Button
            text="제출하기"
            onClick={() => {
              if (recallStatus === 0) {
                // 그냥 다음 질문으로 이동
                setRecallStatus(1);
                return;
              }

              // recallStatus === 1일 때만 전체 응답 검사
              const hasEmpty = Object.values(response).some((v) => v === "");
              if (hasEmpty) {
                router.push("/finish2");
              } else {
                router.push(
                  `/finish?answer0=${encodeURIComponent(
                    response[0]
                  )}&answer1=${encodeURIComponent(response[1])}`
                );
              }
            }}
            className={`rounded-[1.25rem] w-full py-5 text-[1.125rem] font-semibold text-center leading-[1.435rem] tracking-tight 
    ${
      response[recallStatus]
        ? "bg-primary text-background"
        : "bg-gray3 text-gray2"
    }`}
          />
        </div>
      </div>
    </div>
  );
};

export default RecallPage;
