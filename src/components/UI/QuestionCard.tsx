import { emotionImageMap } from "@/utils/emotionImageMap";
import Image from "next/image";
import React from "react";
import CustomInput from "./CustomInput";

export interface QuestionCardProps {
    title?: React.ReactNode;
    emotion?: string;
    iconSize?: number;
    icon?: string;
    micMessage?: string;
};

export const QuestionCard = ({ title, emotion = 'nothing', iconSize, icon, micMessage }: QuestionCardProps) => {
    const WrapperSize = (micMessage ? 'w-[19rem] h-[30rem]' : 'w-[19rem] h-[22rem]');

    return (

        <div className={`bg-gray1 flex flex-col justify-evenly items-center ${WrapperSize} rounded-2xl`}>
            {title}
            {
                emotion === 'nothing' ? (
                    <>
                        <div className="flex justify-center w-full items-centers">
                            <Image src={icon!} alt='기분 로딩중' width={iconSize} height={iconSize} />
                        </div>
                        {micMessage ? (
                            <>
                                <CustomInput  externalValue="" placeholder="마이크를 눌러 말해보세요"  />
                            </>
                        ) : (
                            <>
                            </>
                        )}
                    </>
                ) : (
                    <>
                        <div className="flex justify-center w-full">
                            <Image src={emotionImageMap[emotion].image} alt='기분 로딩중' width={iconSize} height={iconSize} />
                        </div>
                        <p className={`w-full text-xl text-center ${emotionImageMap[emotion].color}`}>{emotionImageMap[emotion].text}</p>
                    </>
                )
            }
            
        </div>
    );
};

export default QuestionCard;