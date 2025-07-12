import { useRef, useEffect } from "react";
import Lottie from "lottie-web";

export type LottieContainerProps = {
  path: string;
};

export const LottieContainer = ({ path }: LottieContainerProps) => {
  const lottieContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const animation = Lottie.loadAnimation({
      container: lottieContainer.current!,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path,
    });

    return () => animation.destroy();
  }, [path]);

  return (
    <div ref={lottieContainer} style={{ width: "100%", height: "100%" }} />
  );
};

export default LottieContainer;
