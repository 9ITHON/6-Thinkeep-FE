import React from "react";
import CardSection, { CardSectionProps } from "./CardSection";

export interface CardListProps {
    cards: CardSectionProps[];
}

export const CardList = ({ cards }: CardListProps) => {
    return (
        <div className="flex p-4 space-x-4 overflow-x-auto">
            {cards.map((card, index) => (
                <div key={index} className="flex-shrink-0">
                    <CardSection title={card.title} illustration={card.illustration} />
                </div>
            ))}
        </div>
    )
}