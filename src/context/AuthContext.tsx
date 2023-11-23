import { getCookie } from "cookies-next";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext<any>(null);

const AuthContextProvider = ({ children }: { children: JSX.Element }) => {
  const user = getCookie("user");
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(user));
  const [userData, setUserData] = useState(user ? JSON.parse(user) : null);

  const value = {
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuthContext = () => useContext(AuthContext);

export default AuthContextProvider;
export { useAuthContext, AuthContext };
