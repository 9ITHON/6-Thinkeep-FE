import Image from "next/image";

interface HeadBackwardProps extends React.HTMLAttributes<HTMLDivElement> {
    visible: boolean;
}

export const HeaderBackward = ({ visible }: HeadBackwardProps) => {
    const visiblity = (visible ? 'block' : 'hidden');

    return (
        <div className={`${visiblity}`}>
            <Image
                src="/arrow_back.svg"
                alt="Back"
                width={23}
                height={23}
            />
        </div>
    );
}