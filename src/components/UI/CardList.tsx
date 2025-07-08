import React from "react";
import QuestionCard, {QuestionCardProps} from "./QuestionCard";

export interface CardListProps {
    cards: QuestionCardProps[];
}

export const CardList = ({ cards }: CardListProps) => {
    return (
        <div className="flex p-4 space-x-4 overflow-x-auto">
            {cards.map((card, index) => (
                <div key={index} className="flex-shrink-0">
                    <QuestionCard title={card.title} emotion={card.emotion} iconSize={card.iconSize} icon={card.icon} micMessage={card.micMessage} />
                </div>
            ))}
        </div>
    )
}