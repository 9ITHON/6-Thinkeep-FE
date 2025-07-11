import BarGraph from '@/components/UI/BarGraph';
import Button from '@/components/UI/Button';
import { HeaderBackward } from '@/components/UI/HeaderBacward';
import QuestionCard from '@/components/UI/QuestionCard';
import React, { useState } from 'react';

const RecallPage = () => {
    const [recallStatus, setRecallStatus] = useState<number>(0);
    const handleRecall = (status: number) => {
        setRecallStatus(status);
    };

    const cardList = [
        {
            id: 0,
            title: <h2 className='w-full text-xl font-semibold leading-6 tracking-tight text-center text-white'>
                    오늘 기분이 어때요?
                </h2>,
            emotion: 'nothing',
            icon: 'flower.svg',
            iconSize: 228,
            micMessage: undefined,
        },
        {
            id: 1,
            title: <h2 className='w-full text-xl font-semibold leading-6 tracking-tight text-center text-white'>
                    오늘 <span className='text-primary'>누구</span>와 함께<br />시간을 보냈나요?
                </h2>,
            emotion: 'nothing',
            icon: 'flower.svg',
            iconSize: 228,
            micMessage: undefined,
        },
    ]

    const currentCard = cardList.find((card) => card.id === recallStatus)   //recordStatus에 해당하는 card를 찾음

    return (
        <div className="w-full h-screen bg-background">
            <div className='flex flex-row gap-4 p-4'>   {/*header*/}
                <HeaderBackward visible={true} />
                <BarGraph total={2} recorded={recallStatus} />
            </div>
            <div className='flex flex-col items-center w-full h-full gap-12 pt-4'>
                <div className='flex flex-row justify-around w-full px-4'>    {/*body*/}
                    <button className='py-2 text-black rounded bg-primary ' onClick={() => handleRecall(recallStatus - 1)}>-1</button>
                    {currentCard && (
                        <QuestionCard
                            title={currentCard.title}
                            emotion={currentCard.emotion}
                            iconSize={currentCard.iconSize}
                            icon={currentCard.icon}
                            micMessage={currentCard.micMessage}
                        />
                    )}
                    <button className='py-2 text-black rounded bg-primary ' onClick={() => handleRecall(recallStatus + 1)}>+1</button>
                </div>
                <div className='flex flex-row w-full h-auto gap-2 px-6'>   {/*footer*/}
                    <Button text='철수' onClick={() => {}} className='rounded-[1.25rem] w-full py-8 text-[1.375rem] font-semibold text-center leading-[1.875rem] tracking tight bg-primary text-background'></Button>
                    <Button text='영희' onClick={() => {}} className='rounded-[1.25rem] w-full py-8 text-[1.375rem] font-semibold text-center leading-[1.875rem] tracking tight bg-primary text-background'></Button>
                    <Button text='돌쇠' onClick={() => {}} className='rounded-[1.25rem] w-full py-8 text-[1.375rem] font-semibold text-center leading-[1.875rem] tracking tight bg-gray2 text-background'></Button>
                </div>
            </div>
        </div>
    );
};

export default RecallPage;