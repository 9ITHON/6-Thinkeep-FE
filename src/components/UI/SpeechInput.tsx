import { useSTT } from "@/utils/useSTT";
import Button from "./Button";

const SpeechInput = () => {
  const {
    transcript,
    listening,
    start,
    stop,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSTT("ko-KR");

  const buttonColor = listening ? "bg-red-500" : "bg-green-500";

  const handleRecord = () => {
    if (listening) {
        stop();
    } else {
        start();
    }
  }

  return (
    <div>
        {!browserSupportsSpeechRecognition ? (
          <p>이 브라우저는 음성 인식을 지원하지 않습니다.</p>
        ): (
            <Button text="음성 인식 시작" onClick={handleRecord} className={buttonColor} />
        )}
        <p>🎤 브라우저 음성 인식 지원: {browserSupportsSpeechRecognition ? "예" : "아니오"}</p>
        <p>🎤 인식 중: {listening ? "예" : "아니오"}</p>
        <p>🎤 현재 인식된 내용: {transcript}</p>
        <Button text="초기화" onClick={resetTranscript} className="bg-gray-300" />
    </div>
  );
};

export default SpeechInput;
