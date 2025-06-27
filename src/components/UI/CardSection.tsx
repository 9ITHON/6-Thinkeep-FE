import React from "react";

export interface CardSectionProps {
    title: string;
    illustration: React.ReactNode; /*아마도 image아니면 svg icon 주입*/
};

export const CardSection = ({ title, illustration }: CardSectionProps) => {
    return (
        <div>
            <h2>{title}</h2>
            <div>{illustration}</div>
        </div>
    );
};

export default CardSection;