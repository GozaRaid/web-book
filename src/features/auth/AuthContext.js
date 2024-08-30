import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/router";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const router = useRouter();

  const decodeToken = (token) => {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.log("Error decoding token:", error);
      return null;
    }
  };

  const checkAuthStatus = async (route) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const decodedToken = decodeToken(token);
      if (decodedToken) {
        setAccessToken(token);
        setIsLoggedIn(true);
        setUserData(decodedToken);
      } else {
        logout(route);
      }
    } else {
      logout(route);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const login = (token) => {
    const decodedToken = decodeToken(token);
    if (decodedToken) {
      setAccessToken(token);
      setIsLoggedIn(true);
      setUserData(decodedToken);
      localStorage.setItem("accessToken", token);
    }
  };

  const logout = useCallback(
    (route) => {
      setAccessToken(null);
      setIsLoggedIn(false);
      setUserData(null);
      localStorage.removeItem("accessToken");
      if (route) {
        router.push("/");
      }
    },
    [router]
  );

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        isLoggedIn,
        userData,
        login,
        logout,
        checkAuthStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
