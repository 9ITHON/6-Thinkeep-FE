import { userApi } from "@/utils/Api/userApi";
import BarGraph from "@/components/UI/BarGraph";
import { HeaderBackward } from "@/components/UI/HeaderBacward";
import QuestionCard from "@/components/UI/QuestionCard";
import SpeechInput from "@/components/UI/SpeechInput";
import { emotionSmallImageMap } from "@/utils/emotionSmallMap";
import Image from "next/image";
import React, { useState } from "react";
import { useSTT } from "@/hooks/useSTT";
import Button from "@/components/UI/Button";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useCounterStore } from "@/providers/counter-store-provider";

const MemoryPage = () => {
  const router = useRouter();
  const { userNo } = useCounterStore((state) => state);
  const { transcript, listening, resetTranscript, error, isSupported } = useSTT("ko-KR"); //STT 훅을 사용하여 음성 인식 결과와 상태를 가져옴

  const [recordStatus, setRecordStatus] = useState(0); //0~3 으로 나타낼 cardsection을 기록
  const handleRecordStatusChange = (newStatus: number) => {
    setRecordStatus(newStatus);
    resetTranscript();
  };

  const [userEmotion, setUserEmotion] = useState("nothing"); //감정을 기록, 초기값은 nothing
  const handleUserEmotionChange = (newEmotion: string) => {
    if (newEmotion === userEmotion) {
      setUserEmotion("nothing"); //이미 선택된 감정을 다시 클릭하면 nothing으로 변경
    } else {
      setUserEmotion(newEmotion);
    }
  };

  const cardList = [
    {
      id: 0,
      title: (
        <h2 className="w-full text-xl font-semibold leading-6 tracking-tight text-center text-white">
          오늘 <span className="text-primary">기분</span>이 어때요?
        </h2>
      ),
      emotion: userEmotion,
      icon: "/emotions/howEmotion.svg",
      iconSize: 228,
      micMessage: undefined,
    },
    {
      id: 1,
      title: (
        <h2 className="w-full text-xl font-semibold leading-6 tracking-tight text-center text-white">
          <span className="text-primary">오늘 누구</span>와
          <br />
          시간을 보냈나요?
        </h2>
      ),
      emotion: "nothing",
      icon: "flower.svg",
      iconSize: 228,
      micMessage: "마이크를 눌러 말해보세요",
    },
    {
      id: 2,
      title: (
        <h2 className="w-full text-xl font-semibold leading-6 tracking-tight text-center text-white">
          <span className="text-primary">오늘 먹은 음식 </span>중 가장 인상{" "}
          <br />
          깊었던 건 무엇인가요?
        </h2>
      ),
      emotion: "nothing",
      icon: "flower.svg",
      iconSize: 228,
      micMessage: "마이크를 눌러 말해보세요",
    },
    {
      id: 3,
      title: (
        <h2 className="w-full text-xl font-semibold leading-6 tracking-tight text-center text-white">
          <span className="text-primary">오늘 꼭 기억하고 싶은 순간</span>은{" "}
          <br />
          무엇인가요?
        </h2>
      ),
      emotion: "nothing",
      icon: "camera.svg",
      iconSize: 228,
      micMessage: "마이크를 눌러 말해보세요",
    },
    {
      id: 4,
      title: (
        <h2 className="w-full text-xl font-semibold leading-6 tracking-tight text-center text-white">
          오늘 하루가
          <br />
          추억되었어요!
        </h2>
      ),
      emotion: "nothing",
      icon: "flower.svg",
      iconSize: 228,
      micMessage: undefined,
    },
  ];

  const currentCard = cardList.find((card) => card.id === recordStatus); //recordStatus에 해당하는 card를 찾음

  const [response, setResponse] = useState<Record<number, string>>({
    1: "",
    2: "",
    3: "",
  }); //STT 결과를 저장할 상태

  const handleRecord = () => {
    if (!isSupported) {
      alert("브라우저가 음성 인식을 지원하지 않습니다. Chrome 브라우저를 사용해주세요.");
      return;
    }

    if (error) {
      alert(`음성 인식 오류: ${error}`);
      return;
    }

    if (listening) {
      setResponse((prev) => ({
        ...prev,
        [recordStatus]: transcript, //현재 상태에 해당하는 STT 결과를 저장
      }));
      console.log(`단계 ${recordStatus} 답변 저장:`, transcript);
    }
  };

  // 감정 값 매핑 함수
  const mapEmotionToKorean = (emotion: string): string => {
    const emotionMap: Record<string, string> = {
      happy: "행복",
      good: "기쁨", 
      soso: "보통",
      gloomy: "우울",
      sad: "슬픔",
      angry: "화남",
    };
    return emotionMap[emotion] || emotion;
  };

  // 일기 보내기 공통 함수
  const sendDiaryToBackend = async () => {
    if (!userNo) {
      alert("사용자 정보가 없습니다. 다시 로그인해주세요.");
      return;
    }

    if (userEmotion === "nothing") {
      alert("감정을 선택해주세요.");
      return;
    }

    // 모든 답변이 완료되었는지 확인
    const q2Answer = response[1] || "";
    const q3Answer = response[2] || "";
    const q4Answer = response[3] || "";

    if (!q2Answer.trim()) {
      alert("오늘 누구와 시간을 보냈는지 답변해주세요.");
      return;
    }

    if (!q3Answer.trim()) {
      alert("오늘 먹은 음식 중 가장 인상 깊었던 것을 답변해주세요.");
      return;
    }

    if (!q4Answer.trim()) {
      alert("오늘 꼭 기억하고 싶은 순간을 답변해주세요.");
      return;
    }

    try {
      const diaryData = {
        answers: {
          Q1: mapEmotionToKorean(userEmotion), // 첫 번째 질문(감정)에 대한 답변
          Q2: q2Answer, // 오늘 누구와 시간을 보냈나요?
          Q3: q3Answer, // 오늘 먹은 음식 중 가장 인상 깊었던 건 무엇인가요?
          Q4: q4Answer, // 오늘 꼭 기억하고 싶은 순간은 무엇인가요?
        },
        emotion: mapEmotionToKorean(userEmotion), // 별도 감정 필드
      };

      console.log("일기 데이터 전송:", diaryData);
      
      const res = await axios.post(
        `http://13.209.69.235:8080/api/records?userNo=${userNo}`,
        diaryData
      );

      try {
        const streakResponse = await userApi.increaseStreak(userNo);
        console.log("스트릭 증가 성공:", streakResponse);
      } catch (streakErr) {
        console.log("스트릭 증가 실패:", streakErr);
        // 스트릭 증가 실패는 일기 저장을 막지 않음
      }
      
      console.log("백엔드 전송 성공:", res.data);
      
      return true;
    } catch (err) {
      console.log("백엔드 전송 실패", err);
      alert("일기 저장에 실패했습니다. 다시 시도해주세요.");
      
      return false;
    }
  };

  const handleGoHomeButtonClick = async () => {
    const success = await sendDiaryToBackend();
    if (success) {
      router.push("/home");
    }
  };

  const handleGoRecallButtonClick = async () => {
    const success = await sendDiaryToBackend();
    if (success) {
      router.push("/recall");
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-background">
      <div className="flex flex-row gap-4 p-4">
        {" "}
        {/*header*/}
        <HeaderBackward visible={true} />
        <BarGraph total={4} recorded={recordStatus} />
      </div>
      <div className="flex flex-col items-center w-full h-full gap-12 pt-4">
        <div className="flex flex-row justify-around w-full px-4">
          {" "}
          {/*body*/}
          {recordStatus === 0 ? (
            <div className="w-[48px]"></div>
            ) : (
            <Image src='arrow_left.svg' alt='이전' width={48} height={48} onClick={() => handleRecordStatusChange(recordStatus - 1)} />
            )
          }
          {currentCard && (
            <QuestionCard
              title={currentCard.title}
              emotion={currentCard.emotion}
              iconSize={currentCard.iconSize}
              icon={currentCard.icon}
              micMessage={currentCard.micMessage}
              externalValue={response[recordStatus]} // 현재 상태에 해당하는 STT 결과를 전달
            />
          )}
          {recordStatus === 4 ? (
            <div className="w-[48px]"></div>
            ) : recordStatus === 0 && userEmotion !== 'nothing' ? (
              <Image src='arrow_right.svg' alt='이전' width={48} height={48} onClick={() => handleRecordStatusChange(recordStatus + 1)} />
            ) : recordStatus === 0 && userEmotion === 'nothing' ? (
              <Image src='arrow_right_gray.svg' alt='이후_안넘어가기' width={48} height={48} />
            ) : response[recordStatus] ? (
            <Image src='arrow_right.svg' alt='이후' width={48} height={48} onClick={() => handleRecordStatusChange(recordStatus + 1)} />
            ) : (
            <Image src='arrow_right_gray.svg' alt='이후_안넘어가기' width={48} height={48} />
            )
          }
        </div>
        <div className="flex flex-col items-center w-full">
          {" "}
          {/*footer*/}
          {recordStatus === 0 ? (
            <div className="grid w-full grid-cols-3">
              {Object.entries(emotionSmallImageMap)
                .filter(([key]) => key !== "disabled")
                .map(([key, value]) => (
                  <div
                    key={key}
                    className="flex flex-col items-center justify-center w-full p-2"
                  >
                    <Image
                      src={userEmotion === key ? value.image : value.monochrome}
                      alt={key}
                      width={87}
                      height={87}
                      className=""
                      onClick={() => handleUserEmotionChange(key)}
                    />
                    <p className={`text-center text-sm text-white`}>
                      {value.text}
                    </p>
                  </div>
                ))}
            </div>
          ) : recordStatus === 4 ? (
            <div className="flex flex-col w-full h-auto gap-4 px-6">
              <Button
                text="기억퀴즈 풀기"
                onClick={() => handleGoRecallButtonClick()}
                className="rounded-[1.25rem] w-full py-4 text-lg font-semibold text-center leading-[1.4375rem] tracking tight bg-primary text-black"
              ></Button>
              <Button
                text="홈으로 나가기"
                onClick={() => handleGoHomeButtonClick()}
                className="rounded-[1.25rem] w-full py-4 text-lg font-semibold text-center leading-[1.4375rem] tracking tight bg-gray3 text-gray2"
              ></Button>
            </div>
          ) : (
            <SpeechInput onClick={handleRecord} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MemoryPage;
