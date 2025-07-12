import SpeechRecoginition, { useSpeechRecognition } from "react-speech-recognition";
import { useState, useEffect } from "react";

export const useSTT = (language: string = "ko-KR") => {
  const [error, setError] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState<boolean>(true);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      setIsSupported(false);
      setError("브라우저가 음성 인식을 지원하지 않습니다. Chrome 브라우저를 사용해주세요.");
      console.error("Speech recognition not supported");
    } else {
      setIsInitialized(true);
      console.log("음성 인식 초기화 완료");
    }
  }, [browserSupportsSpeechRecognition]);

  const start = () => {
    try {
      setError(null);
      
      if (!isInitialized) {
        setError("음성 인식이 아직 초기화되지 않았습니다. 잠시 후 다시 시도해주세요.");
        return;
      }

      console.log("음성 인식 시작...");
      
      // 브라우저별 최적화된 설정
      const recognitionOptions = {
        continuous: true,
        language: language,
        interimResults: true,
        maxAlternatives: 1,
        // Chrome에서 더 안정적인 설정
        ...(navigator.userAgent.includes('Chrome') && {
          continuous: false, // Chrome에서는 false가 더 안정적
          interimResults: false,
        })
      };

      SpeechRecoginition.startListening(recognitionOptions);
      
      // 10초 후 자동 중지 (무한 대기 방지)
      setTimeout(() => {
        if (listening) {
          console.log("자동 중지 (10초 타임아웃)");
          stop();
        }
      }, 10000);
      
    } catch (err) {
      console.error("음성 인식 시작 실패:", err);
      setError("음성 인식을 시작할 수 없습니다. 마이크 권한을 확인해주세요.");
    }
  };

  const stop = () => {
    try {
      console.log("음성 인식 중지...");
      SpeechRecoginition.stopListening();
    } catch (err) {
      console.error("음성 인식 중지 실패:", err);
    }
  };

  const abort = () => {
    try {
      console.log("음성 인식 중단...");
      stop(); // abortListening 대신 stop 사용
    } catch (err) {
      console.error("음성 인식 중단 실패:", err);
    }
  };

  return {
    transcript, //말한 문장 - 실시간
    listening,      //boolean -> 마이크로 듣고있는지 여부 true-> 동작
    start,  //녹음시작
    stop,   //녹음 끝
    abort,  //녹음 중단
    resetTranscript,  //녹음된 문장 초기화
    browserSupportsSpeechRecognition,   //브라우저가 stt지원하는지 여부
    error, // 에러 메시지
    isSupported, // 지원 여부
    isInitialized, // 초기화 완료 여부
  };
};
