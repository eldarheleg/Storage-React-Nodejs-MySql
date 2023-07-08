import { createContext, useContext, useEffect, useState, useMemo } from "react";

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("accessToken"));
  const [isLogged, setIsLogged] = useState(token ? true : false);

  const setTokenFun = (newToken) => {
    setToken(newToken);
  };

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      token,
      setTokenFun,
      isLogged,
      setIsLogged,
    }),
    [token]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
