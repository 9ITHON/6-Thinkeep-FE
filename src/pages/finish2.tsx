import AppBackground from "@/components/APP/AppBackground";
import Button from "@/components/UI/Button";
import { HeaderBackward } from "@/components/UI/HeaderBacward";

import LottieContainer from "@/components/UI/Lottie";
import Router from "next/router";

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
          <LottieContainer path="/lottie/finish2.json" />
        </div>
        <p className="text-2xl font-semibold tracking-[-0.04rem] text-white">
          지금 기억나지 않아도 괜찮아요
        </p>
        <p className="pb-30 text-white font-normal text-[1.25rem]/[1.6875rem] tracking-tight">
          조금씩 꺼내며 함께 걸어봐요
        </p>
        <Button
          text="기억 다시 떠올리기"
          onClick={() => {
            router.push("/recall");
          }}
          className="rounded-[1.25rem] w-full py-5 text-[1.125rem] font-semibold text-center leading-[1.435rem] tracking-tight bg-primary text-background"
        />
        <Button
          text="추억보관함 가기"
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
