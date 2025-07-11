"use client";
import React, { useMemo, useState } from "react";
import Image from "next/image";
import { tabs, pathToTabIdMap } from "@/utils/navbar";
import { useRouter, usePathname } from "next/navigation";

export const AppFooter = () => {
  const router = useRouter();
  const pathname = usePathname();

  const initialTab = useMemo(
    () => pathToTabIdMap[pathname] || "today",
    [pathname]
  );
  const [activeTab, setActiveTab] = useState(initialTab);

  const handleTabClick = (tabId: string, path: string) => {
    setActiveTab(tabId);
    router.push(path);
  };

  return (
    <footer
      className="fixed w-[361px] h-[78px]  bottom-8 left-1/2 -translate-x-1/2  max-w-md rounded-full 
             bg-background p-0 flex 
             shadow-[inset_0_0_100px_0_#FAFAF84A] backdrop-blur-[40px]"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id, tab.path)}
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
                  isActive ? "text-background" : "text-primary"
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
