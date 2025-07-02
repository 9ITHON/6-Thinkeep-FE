"use client";
 
import { useSession } from "next-auth/react";
 
function Error() {
  const { data, update, status } = useSession();
  console.log("에러 페이지 Session", status, data, update);

  return (
    <main>
        <h1>로그인 실패</h1>
        <p>{data?.user?.name || "이름 없음"}님 환영합니다!</p>
        <p>로그인 상태: {status}</p>
        <p>update 정보: {JSON.stringify(update, null, 2)}</p>
        <p>data 정보: {JSON.stringify(data, null, 2)}</p>
    </main>
  );
}
 
export default Error;