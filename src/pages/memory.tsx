import CardSection from '@/components/UI/CardSection';
import Image from 'next/image';
import React from 'react';

const MemoryPage = () => {
    

    return (
        <div className='h-screen'>
            <CardSection 
            title={
                <h2 className='w-full text-xl text-center text-white'>
                    오늘 <span className='text-primary'>기분</span>이 어때요?
                </h2>
            }
            illustration={<Image src='emotions/happy.svg' alt='기억력 게임' width={185} height={185} />} 
            emotion='행복해요'
            emotionColor='text-primary'
             />
        </div>
    )
};

export default MemoryPage;