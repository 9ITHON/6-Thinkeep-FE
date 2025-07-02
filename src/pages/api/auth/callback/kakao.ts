import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // 세션 가져오기
    const session = await getServerSession(req, res, authOptions);

    if (session) {
      // 로그인 성공
      res.status(200).json({ message: '로그인 성공', session });
    } else {
      // 로그인 실패 시 처리
      console.log("로그인 실패다 이놈아.",session)
      res.redirect('/error');
    }
  } catch (error) {
    console.error('Error during Kakao callback:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
