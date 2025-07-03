import { signOut } from "next-auth/react";

const KakaoLogoutButton = () => {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="px-4 py-2 text-white bg-red-500 rounded"
    >
      로그아웃
    </button>
  );
}

export default KakaoLogoutButton;