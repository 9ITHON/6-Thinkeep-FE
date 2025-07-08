import React, { useState } from "react";
import Image from "next/image";
import {
  assignment,
  assignment_light,
  mail,
  mail_light,
  favorite,
  favorite_light,
  settings,
  settings_light,
} from "@/assets";

const tabs = [
  {
    id: "today",
    label: "오늘추억",
    icon: assignment,
    activeIcon: assignment_light,
  },
  { id: "memory", label: "추억보관함", icon: mail, activeIcon: mail_light },
  { id: "record", label: "기록", icon: favorite, activeIcon: favorite_light },
  { id: "setting", label: "설정", icon: settings, activeIcon: settings_light },
];

export const AppFooter = () => {
  const [activeTab, setActiveTab] = useState("today");

  return (
    <footer
      className="fixed w-[361px] h-[78px]  bottom-8 left-1/2 -translate-x-1/2  max-w-md rounded-full 
             bg-[#1B1B17] p-0 flex 
             shadow-[inset_0_0_100px_0_#FAFAF84A] backdrop-blur-[40px]"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="relative flex flex-col items-center justify-center flex-1 gap-2 py-2 rounded-full"
          >
            {isActive && (
              <div className="absolute inset-0 pointer-events-none z-1">
                <div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                  w-[90%] h-[90%] blur-[8px]
                  bg-[radial-gradient(ellipse_at_center,_#FFF782_0%,_#FFF782_20%,_#FFF782_40%,_#FFF782_55%,_#1B1B17_75%,_#1B1B17_100%)]"
                />
              </div>
            )}

            <div className="relative z-10 flex flex-col items-center justify-center gap-2">
              <div className="relative w-6 h-6">
                <Image
                  src={isActive ? tab.activeIcon : tab.icon}
                  alt={tab.label}
                  fill
                  className="object-contain"
                />
              </div>
              <span
                className={`text-sm font-medium leading-none ${
                  isActive ? "text-[#1B1B17]" : "text-[#FFF782]"
                }`}
              >
                {tab.label}
              </span>
            </div>
          </button>
        );
      })}
    </footer>
  );
};

export default AppFooter;