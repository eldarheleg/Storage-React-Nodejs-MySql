import { createContext, useContext, useState, useMemo } from "react";
import Cookies from "js-cookie"

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(Cookies.get("jwt"));
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
