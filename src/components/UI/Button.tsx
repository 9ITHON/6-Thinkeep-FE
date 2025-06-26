import React from "react";

export interface ButtonProps {
    text: string;
    onClick?: () => void;
    /*size: "small" | "medium" | "large";*/
}

export const Button = ({ text, onClick/*, size*/ }: ButtonProps) => {
    /*
    const sizeClasses = {
        small: "text-xs px-2 py-1",
        medium: "text-sm px-3 py-2",
        large: "text-lg px-4 py-3",
    }; 디자이너 님이랑 이야기하고 size 규격 정해서 사용해볼게여
    */
    return (
        <button onClick={onClick} className="p-2 text-white bg-blue-500 rounded">
            {text}
        </button>
    );
};

export default Button;