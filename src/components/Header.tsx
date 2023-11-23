import React from "react";
import { deleteCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";

const Header = () => {
  const router = useRouter();
  const { isLoggedIn, setIsLoggedIn } = useAuthContext();

  const handleLogout = () => {
    router.push("/auth/login");
    setIsLoggedIn(false);
    deleteCookie("user");
  };

  return (
    <nav className="p-4 bg-gray-100 flex gap-4">
      <Link href="/" className="text-blue-500">
        Home
      </Link>
      <Link href="/blogs" className="text-blue-500">
        Blogs
      </Link>
      <button onClick={handleLogout} className="ml-auto">
        Logout
      </button>
    </nav>
  );
};

export default Header;
