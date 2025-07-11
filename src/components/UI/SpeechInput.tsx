import { useSTT } from "@/utils/useSTT";
import Button from "./Button";
import Image from "next/image";

const SpeechInput = () => {
  const {
    listening,
    start,
    stop,
  } = useSTT("ko-KR");

  const handleRecord = () => {
    if (listening) {
        stop();
    } else {
        start();
    }
  }

  return (
    <div>
        <Button text="나는야 마이크" onClick={handleRecord}>
            <Image src={listening ? "/mic_gray.svg" : "/mic_primary.svg"} alt="마이크 아이콘" width={88} height={88} />
        </Button>
    </div>
  );
};

export default SpeechInput;
