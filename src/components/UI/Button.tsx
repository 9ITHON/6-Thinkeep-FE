import React from "react";

export interface ButtonProps {
    text?: string;
    className?: string;
    onClick?: () => void;
    children?: React.ReactNode; // 추가: 버튼 내부에 다른 요소를 넣을 수 있도록
}

export const Button = ({ text = "버튼", className = "", onClick, children }: ButtonProps) => {

    return (
        <button onClick={onClick} className={className}>
            <p>{text}</p>
            {children}
        </button>
    );
};

export default Button;