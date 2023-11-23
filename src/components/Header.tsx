import React, { useContext, useEffect, useState } from "react";
import { deleteCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthContext, useAuthContext } from "@/context/AuthContext";

const Header = () => {
  const router = useRouter();
  const [mounted, setIsMounted] = useState(false);
  const { userData, setUserData, setIsLoggedIn } = useContext(AuthContext);

  const navigation = [
    {
      label: "Home",
      href: "/",
      isVisible: true,
    },
    {
      label: "Blogs",
      href: "/blogs",
      isVisible: true,
    },
    {
      label: "Add Blog",
      href: "/admin/add-blog",
      isVisible: userData?.role === "ADMIN",
    },
  ];

  const handleLogout = () => {
    router.push("/auth/login");
    setIsLoggedIn(false);
    setUserData(null);
    deleteCookie("user");
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    mounted && (
      <nav className="p-4 bg-gray-100 flex gap-4">
        {navigation
          .filter((navData) => navData.isVisible)
          .map((navData) => (
            <Link
              key={navData.href}
              href={navData.href}
              className="text-blue-500"
            >
              {navData.label}
            </Link>
          ))}

        <button onClick={handleLogout} className="ml-auto">
          Logout
        </button>
      </nav>
    )
  );
};

export default Header;
