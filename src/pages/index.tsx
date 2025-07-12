"use client";
import { useEffect } from "react";
import { useRouter } from "next/router";
import AppBackground from "@/components/APP/AppBackground";
import Image from "next/image";

const Main = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/login");
    }, 1000); // 1초 후 이동

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="h-screen">
      <AppBackground backgroundImage="/images/home_background_img.png">
        <div className="flex flex-col items-center justify-center h-full">
          <Image
            src="/thinkeep_symbol.svg"
            alt="symbol"
            width={160}
            height={120}
            className="mb-4"
          />
          <Image src="/thinkeep_logo.svg" alt="logo" width={160} height={50} />
        </div>
      </AppBackground>
    </div>
  );
};

export default Main;
