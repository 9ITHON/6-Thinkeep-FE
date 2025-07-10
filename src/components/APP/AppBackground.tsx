"use client";
import React, { ReactNode } from "react";
import Image from "next/image";

interface AppBackgroundProps {
  backgroundImage?: string;
  children: ReactNode;
}

const AppBackground = ({
  backgroundImage = "/images/home_background_img.png",
  children,
}: AppBackgroundProps) => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Image
        src={backgroundImage}
        alt="배경"
        fill
        className="object-cover z-0"
        priority
      />
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
};

export default AppBackground;
