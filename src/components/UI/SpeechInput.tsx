import { useSTT } from "@/hooks/useSTT";
import Button from "./Button";
import Image from "next/image";

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
    } else {
      start();
      console.log("녹음 시작");
    }
    
    onClick();
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-center">
        <Button 
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
            <div className="absolute w-4 h-4 bg-red-500 rounded-full -top-2 -right-2 animate-ping"></div>
          )}
        </Button>
        
      </div>
    </div>
  );
};

export default SpeechInput;
