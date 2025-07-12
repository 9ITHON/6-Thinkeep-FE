import { useSTT } from "@/hooks/useSTT";
import Button from "./Button";
import Image from "next/image";
import { useState, useEffect } from "react";

const SpeechInput = ({ onClick }: { onClick: () => void }) => {
  const {
    listening,
    start,
    stop,
    transcript,
    error,
    isSupported,
    isInitialized,
  } = useSTT("ko-KR");

  const [showDebug, setShowDebug] = useState(false);
  const [statusMessage, setStatusMessage] = useState("마이크를 클릭하세요");

  useEffect(() => {
    if (!isSupported) {
      setStatusMessage("브라우저 미지원");
    } else if (!isInitialized) {
      setStatusMessage("초기화 중...");
    } else if (listening) {
      setStatusMessage("말씀해주세요...");
    } else {
      setStatusMessage("마이크를 클릭하세요");
    }
  }, [isSupported, isInitialized, listening]);

  const handleRecord = () => {
    if (!isSupported) {
      alert("브라우저가 음성 인식을 지원하지 않습니다. Chrome 브라우저를 사용해주세요.");
      return;
    }

    if (!isInitialized) {
      alert("음성 인식이 아직 초기화되지 않았습니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    if (error) {
      alert(`음성 인식 오류: ${error}`);
      return;
    }

    if (listening) {
      stop();
      console.log("녹음 중지, 최종 텍스트:", transcript);
      setStatusMessage("녹음 완료");
    } else {
      start();
      console.log("녹음 시작");
      setStatusMessage("말씀해주세요...");
    }
    
    onClick();
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-center">
        <Button 
          text={statusMessage}
          onClick={handleRecord}
          className="relative"
        >
          <Image 
            src={listening ? "/mic_gray.svg" : "/mic_primary.svg"} 
            alt="마이크 아이콘" 
            width={88} 
            height={88} 
            className={listening ? "animate-pulse" : ""}
          />
          {listening && (
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
          )}
        </Button>
        
        {/* 실시간 텍스트 표시 */}
        {transcript && (
          <div className="mt-2 p-2 bg-white bg-opacity-10 rounded text-white text-sm max-w-xs">
            <div className="font-semibold">인식된 텍스트:</div>
            <div>{transcript}</div>
          </div>
        )}
      </div>
      
      {/* 디버그 정보 */}
      {showDebug && (
        <div className="text-white text-xs bg-black bg-opacity-50 p-2 rounded">
          <div>상태: {listening ? "녹음 중" : "대기 중"}</div>
          <div>지원: {isSupported ? "예" : "아니오"}</div>
          <div>초기화: {isInitialized ? "완료" : "대기 중"}</div>
          {error && <div>에러: {error}</div>}
          <div>브라우저: {navigator.userAgent.includes('Chrome') ? 'Chrome' : '기타'}</div>
        </div>
      )}
      
      {/* 디버그 토글 버튼 */}
      <button 
        onClick={() => setShowDebug(!showDebug)}
        className="text-white text-xs underline"
      >
        {showDebug ? "디버그 숨기기" : "디버그 보기"}
      </button>
    </div>
  );
};

export default SpeechInput;
