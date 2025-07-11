import BarGraph from '@/components/UI/BarGraph';
import { HeaderBackward } from '@/components/UI/HeaderBacward';
import QuestionCard from '@/components/UI/QuestionCard';
import SpeechInput from '@/components/UI/SpeechInput';
import { emotionSmallImageMap } from '@/utils/emotionSmallMap';
import Image from 'next/image';
import React, { useState } from 'react';

const MemoryPage = () => {
    const [recordStatus, setRecordStatus] = useState(0);    //0~3 으로 나타낼 cardsection을 기록
    const handleRecordStatusChange = (newStatus: number) => {
        setRecordStatus(newStatus);
    };

    const [userEmotion, setUserEmotion] = useState('nothing');  //감정을 기록, 초기값은 nothing
    const handleUserEmotionChange = (newEmotion: string) => {
        if (newEmotion === userEmotion) {
            setUserEmotion('nothing');  //이미 선택된 감정을 다시 클릭하면 nothing으로 변경
        } else {
            setUserEmotion(newEmotion);
        }
    };

    const cardList = [
        {   
            id: 0,
            title: <h2 className='w-full text-xl font-semibold leading-6 tracking-tight text-center text-white'>
                    오늘 <span className='text-primary'>기분</span>이 어때요?
                </h2>,
            emotion: userEmotion,
            icon: '/emotions/howEmotion.svg',
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
            micMessage: '마이크를 눌러 말해보세요',
        },
        {
            id: 2,
            title: <h2 className='w-full text-xl font-semibold leading-6 tracking-tight text-center text-white'>
                    오늘 먹은 식사 중에서 <span className='text-primary'>가장 기억에<br />남는 음식</span>은 무엇인가요?
                </h2>,
            emotion: 'nothing',
            icon: 'flower.svg',
            iconSize: 228,
            micMessage: '마이크를 눌러 말해보세요',
        }, {
            id: 3,
            title: <h2 className='w-full text-xl font-semibold leading-6 tracking-tight text-center text-white'>
                    오늘 하루 중<span className='text-primary'>가장 기억에 남는<br />경험</span>은 무엇인가요?
                </h2>,
            emotion: 'nothing',
            icon: 'camera.svg',
            iconSize: 228,
            micMessage: '마이크를 눌러 말해보세요',
        }
    ]

    const currentCard = cardList.find((card) => card.id === recordStatus)   //recordStatus에 해당하는 card를 찾음

    return (
        <div className='h-screen bg-background'>

            <div className='flex flex-row gap-4 p-4'>   {/*header*/}
                <HeaderBackward visible={true} />
                <BarGraph total={4} recorded={recordStatus} />
            </div>
            <div className='flex flex-col items-center w-full h-full gap-12 pt-4'>
                <div className='flex flex-row justify-around w-full px-4'>    {/*body*/}
                    <button className='py-2 text-black rounded bg-primary ' onClick={() => handleRecordStatusChange(recordStatus - 1)}>-1</button>
                    {currentCard && (
                        <QuestionCard
                            title={currentCard.title}
                            emotion={currentCard.emotion}
                            iconSize={currentCard.iconSize}
                            icon={currentCard.icon}
                            micMessage={currentCard.micMessage}
                        />
                    )}
                    <button className='py-2 text-black rounded bg-primary ' onClick={() => handleRecordStatusChange(recordStatus + 1)}>+1</button>
                </div>
                <div className='flex flex-col items-center w-full'>   {/*footer*/}
                    {recordStatus === 0 ? (
                        <div className='grid w-full grid-cols-3'>
                            {Object.entries(emotionSmallImageMap)
                                .filter(([key]) => key !== "disabled")
                                .map(([key, value]) => (
                                    <div key={key} className='flex flex-col items-center justify-center w-full p-2'>
                                        <Image
                                            src={userEmotion === key ? value.image : value.monochrome}
                                        alt={key}
                                        width={87}
                                        height={87}
                                        className=''
                                        onClick={() => handleUserEmotionChange(key)}
                                    />
                                    <p className={`text-center text-sm text-white`}>{value.text}</p>
                                    </div>
                                ))}
                        </div>
                    ) : (
                            <SpeechInput />
                    )}
                </div>
            </div>
        </div>
    )
};

export default MemoryPage;