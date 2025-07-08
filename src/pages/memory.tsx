import CardSection from '@/components/UI/CardSection';
import { emotionImageMap } from '@/utils/emotionImageMap';
import Image from 'next/image';
import React from 'react';

const MemoryPage = () => {
    // const [emotion, setEmotion] = useState('mad');
    // const handleEmotionChange = (newEmotion: string) => {
    //     setEmotion(newEmotion);
    // };

    return (
        <div className='h-screen'>
            <CardSection 
            title={
                <h2 className='w-full text-xl text-center text-white'>
                    오늘 <span className='text-primary'>기분</span>이 어때요?
                </h2>
            }
            illustration={<Image src={emotionImageMap['angry'].image} alt='기억력 게임' width={185} height={185} />} 
            emotion={emotionImageMap['angry'].text}
            emotionColor={emotionImageMap['angry'].color}
             />
        </div>
    )
};

export default MemoryPage;