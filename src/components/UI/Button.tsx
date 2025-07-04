import React from "react";

export interface ButtonProps {
    text: string;
    className: string | "";
    onClick?: () => void;
}

export const Button = ({ text, className, onClick }: ButtonProps) => {

    return (
        <button onClick={onClick} className={className}>
            {text}
        </button>
    );
};

export default Button;