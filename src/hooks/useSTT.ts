import SpeechRecoginition, { useSpeechRecognition } from "react-speech-recognition";

export const useSTT = (language: string = "ko-KR") => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const start = () =>
    SpeechRecoginition.startListening({
      continuous: true,
      language,
    });

  const stop = () => SpeechRecoginition.stopListening();

  return {
    transcript, //말한 문장 - 실시간 , 이게 된다면 밑에 두개는 불필요
    listening,      //boolean -> 마이크로 듣고있는지 여부 true-> 동작
    start,  //녹음시작
    stop,   //녹음 끝
    resetTranscript,  //녹음된 문장 초기화
    browserSupportsSpeechRecognition,   //브라우저가 stt지원하는지 여부
  };
};
