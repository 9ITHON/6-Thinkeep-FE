import QuestionCard from '@/components/UI/QuestionCard';
import React from 'react';

const MemoryPage = () => {
    // const [emotion, setEmotion] = useState('mad');
    // const handleEmotionChange = (newEmotion: string) => {
    //     setEmotion(newEmotion);
    // };

    return (
        <div className='h-screen'>
            <QuestionCard 
            title={
                <h2 className='w-full text-xl text-center text-white'>
                    오늘 <span className='text-primary'>기분</span>이 어때요?
                </h2>
            }
            emotion='angry'
            iconSize={185}
             />
            <QuestionCard
            title={
                <h2 className='w-full text-xl text-center text-white'>
                    오늘 <span className='text-primary'>누구</span>와 함께<br /> 시간을 보냈나요?
                </h2>
            }
            iconSize={228}
            icon='flower.svg'
             />
            <QuestionCard
            title={
                <h2 className='w-full text-xl text-center text-white'>
                    오늘 먹은 식사 중 <span className='text-primary'>가장 기억에<br /> 남는 음식</span>은 무엇인가요?
                </h2>
            }
            iconSize={228}
            icon='flower.svg'
            micMessage='마이크를 눌러 말해보세요'
             />
        </div>
    )
};

export default MemoryPage;