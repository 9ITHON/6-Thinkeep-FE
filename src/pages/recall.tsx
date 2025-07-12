import axios from "axios";
import BarGraph from '@/components/UI/BarGraph';
import Button from '@/components/UI/Button';
import { HeaderBackward } from '@/components/UI/HeaderBacward';
import QuestionCard from '@/components/UI/QuestionCard';
import React, { useState, useEffect } from 'react';
import { useCounterStore } from "@/providers/counter-store-provider";

const RecallPage = () => {
    const [recallStatus, setRecallStatus] = useState<number>(0);
    const [records, setRecords] = useState<any[]>([]);
    const { userNo } = useCounterStore((state) => state);

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const res = await axios.get(`http://13.209.69.235:8080/api/records/user/${userNo}/all`);
                setRecords(res.data);
            } catch (e) {
                setRecords([]);
            }
        };
        if (userNo) fetchRecords();
    }, [userNo]);

    const handleRecall = (status: number) => {
        setRecallStatus(status);
    };

    const handleDelete = async (recordId: number) => {
        try {
            await axios.delete(`http://13.209.69.235:8080/api/records/${recordId}?userNo=${userNo}`);
            setRecords((prev) => prev.filter((rec) => rec.recordId !== recordId));
        } catch (e) {
            alert("삭제 실패");
        }
    };
    const handleEdit = (recordId: number) => {
        // TODO: 수정 모달/페이지로 이동 또는 구현
        alert(`수정 기능은 추후 구현 예정. recordId: ${recordId}`);
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
            <div className='flex flex-col items-center w-full h-full gap-5 pt-4'>
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
                <div className='flex flex-col items-center w-full h-auto gap-6 px-6'>
                    <p className='pb-20 font-semibold text-white text-[1.125rem] leading-[1.4375rem] tracking-tight underline decoration-solid decoration-auto underline-offset-auto'>모르겠어요. 다음에 할게여!</p>
                    <div className='flex flex-row w-full h-auto gap-2'>
                        <Button text='철수' onClick={() => {}} className='rounded-[1.25rem] w-full py-8 text-[1.375rem] font-semibold text-center leading-[1.875rem] tracking-tight bg-primary text-background'></Button>
                        <Button text='영희' onClick={() => {}} className='rounded-[1.25rem] w-full py-8 text-[1.375rem] font-semibold text-center leading-[1.875rem] tracking-tight bg-primary text-background'></Button>
                        <Button text='돌쇠' onClick={() => {}} className='rounded-[1.25rem] w-full py-8 text-[1.375rem] font-semibold text-center leading-[1.875rem] tracking-tight bg-gray2 text-background'></Button>
                    </div>
                    <Button text='제출하기' onClick={() => {}} className='rounded-[1.25rem] w-full py-5 text-[1.125rem] font-semibold text-center leading-[1.435rem] tracking-tight bg-primary text-background'></Button>
                </div>
            </div>
            <div className="p-4">
                <h3 className="text-white text-lg font-bold mb-2">내 전체 일기 목록</h3>
                <ul className="text-white text-left max-h-40 overflow-y-auto">
                  {records.map((rec, idx) => (
                    <li key={rec.recordId || idx} className="mb-1 flex items-center gap-2">
                      {rec.date} - {rec.emotion} - {rec.answer?.additionalProp1}
                      <button className="ml-2 px-2 py-1 bg-red-500 rounded text-xs" onClick={() => handleDelete(rec.recordId)}>삭제</button>
                      <button className="ml-1 px-2 py-1 bg-blue-500 rounded text-xs" onClick={() => handleEdit(rec.recordId)}>수정</button>
                    </li>
                  ))}
                </ul>
            </div>
        </div>
    );
};

export default RecallPage;