import Image from "next/image";
import { useRouter } from "next/router";

interface HeadBackwardProps extends React.HTMLAttributes<HTMLDivElement> {
    visible: boolean;
}

export const HeaderBackward = ({ visible }: HeadBackwardProps) => {
    const visiblity = (visible ? 'block' : 'hidden');

    const router = useRouter();

    return (
        <div className={`${visiblity}`}>
            <Image
                src="/arrow_back.svg"
                alt="Back"
                width={23}
                height={23}
                onClick={router.back}
            />
        </div>
    );
}