import React from "react";
import { useSTT } from "@/utils/useSTT";
import Button from "./Button";

const SpeechInput = () => {
  const {
    transcript,
    listening,
    start,
    stop,
    reset,
    browserSupportsSpeechRecognition
  } = useSTT("ko-KR");

  return (
    <div>
        <p>🎤 브라우저 음성 인식 지원: {browserSupportsSpeechRecognition ? "예" : "아니오"}</p>
        <p>🎤 인식 중: {listening ? "예" : "아니오"}</p>
        <p>🎤 현재 인식된 내용: {transcript}</p>
        {<Button text="시작" onClick={start} className="bg-green-500" />}
        <Button text="중지" onClick={stop} className="bg-red-500" />
        <Button text="초기화" onClick={reset} className="bg-blue-500" />
    </div>
  );
};

export default SpeechInput;
