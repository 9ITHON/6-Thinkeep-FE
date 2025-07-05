import { useRef } from "react";

export const useTTS = () => {
  const synth = useRef(window.speechSynthesis);

  const speak = (text: string) => {     //문장 발화, 기존에 말하던 문장 있으면 멈추게 하고 그 문장 읽기
    if (synth.current?.speaking) {
      synth.current.cancel(); // 기존 음성 중단
    }

    if (text.trim().length > 0) {
      const utterance = new SpeechSynthesisUtterance(text); //발화 객체 생성
      utterance.lang = "ko-KR"; // 원하는 언어 설정 (예: "en-US", "ja-JP")
      synth.current.speak(utterance);
    }
  };

  const pause = () => {
    if (synth.current?.speaking) {
      synth.current.pause();
    }
  };

  const speaking = synth.current.speaking

  const resume = () => {
    if (synth.current?.paused) {
        synth.current.resume();
    }
  }

  const cancel = () => {
    if (synth.current.speaking) {
        synth.current.cancel();
    }
  }

  return { speak, pause, speaking, resume, cancel };
};
