import {
  useSpeechRecognition,
  startListening,
  stopListening,
  resetTranscript,
} from "react-speech-recognition";

export const useSTT = (language: string = "ko-KR") => {
  const {
    transcript,
    interimTranscript,
    finalTranscript,
    listening,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const start = () =>
    startListening({
      continuous: true,
      language,
    });

  const stop = () => stopListening();

  const reset = () => resetTranscript();

  return {
    transcript, //말한 문장 - 실시간 , 이게 된다면 밑에 두개는 불필요
    interimTranscript,  //말하는 중인 부분, 확정되면 finalTranscript 로 넘어감
    finalTranscript,    //최종 텍스트
    listening,      //boolean -> 마이크로 듣고있는지 여부 true-> 동작
    start,
    stop,
    reset,
    browserSupportsSpeechRecognition,   //브라우저가 stt지원하는지 여부
  };
};
