import AppBackground from "@/components/APP/AppBackground";
import Button from "@/components/UI/Button";
import { HeaderBackward } from "@/components/UI/HeaderBacward";
import Router from "next/router";
import LottieContainer from "@/components/UI/Lottie";

const FinishPage = () => {
  const router = Router;
  return (
    <AppBackground>
      <div className="flex flex-col items-start w-full h-auto p-4">
        {" "}
        {/* top */}
        <HeaderBackward visible={true} />
      </div>
      <div className="flex flex-col items-center w-full h-full gap-2 px-6 pt-20">
        <div className="w-[228px] h-[300px]">
          <LottieContainer path="/lottie/finish.json" />
        </div>
        <p className="text-[2rem]/[2.5rem] font-semibold tracking-[-0.04rem] text-white">
          6월 30일을
          <br />
          추억했어요!
        </p>
        <p className="pb-25 text-white font-normal text-[1.25rem]/[1.6875rem] tracking-tight">
          오늘도 하루를 떠올려주셔서 감사해요
        </p>
        <Button
          text="연속기록 확인하기"
          onClick={() => {
            router.push("/badge");
          }}
          className="rounded-[1.25rem] w-full py-5 text-[1.125rem] font-semibold text-center leading-[1.435rem] tracking-tight bg-primary text-background"
        />
        <Button
          text="추억보관함으로 가기"
          onClick={() => {
            router.push("/calendar");
          }}
          className="rounded-[1.25rem] w-full py-5 text-[1.125rem] font-semibold text-center leading-[1.435rem] tracking-tight bg-gray3 text-gray2"
        />
      </div>
    </AppBackground>
  );
};

export default FinishPage;
