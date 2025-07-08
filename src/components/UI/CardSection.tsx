import React from "react";

export interface CardSectionProps {
    title?: React.ReactNode;
    illustration: React.ReactNode; /*아마도 image아니면 svg icon 주입*/
    emotion?: string; /*추가적인 감정 표현을 위한 prop*/
    emotionColor?: string; /*감정 표현에 따른 색상 지정 prop*/
};

export const CardSection = ({ title, illustration, emotion, emotionColor }: CardSectionProps) => {
    return (
        <div className="bg-gray1 flex flex-col justify-evenly w-[19rem] h-[22rem] rounded-2xl">
            {title}
            <div className="flex justify-center w-full">{illustration}</div>
            <p className={`w-full text-xl text-center ${emotionColor}`}>{emotion}</p>
        </div>
    );
};

export default CardSection;