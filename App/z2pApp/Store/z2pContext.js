import { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
  userId: "",
  email: "",
  token: "",
  tokenExpiryTime: "",
  isAuthenticated: false,
  authenticate: () => {},
  logout: () => {},
  setEmailContext: () => {},
  setUserIdContext: () => {},
  setTokenExpiryContext: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [email, setEmail] = useState();
  const [userId, setUserId] = useState();
  const [tokenExpiryTime, setTokenExpiryTime] = useState(new Date());

  function authenticate(token) {
    setAuthToken(token);
    AsyncStorage.setItem("token", token);
  }
  function logout() {
    setAuthToken(null);
    AsyncStorage.removeItem("token", "email");
  }

  function setUserIdContext(userId) {
    setUserId(userId);
    AsyncStorage.setItem("userId", userId);
  }

  function setEmailContext(email) {
    setEmail(email);
    AsyncStorage.setItem("email", email);
  }

  function setTokenExpiryContext(tokenExpiryTime) {
    setTokenExpiryTime(tokenExpiryTime);
    AsyncStorage.setItem("tokenExpiryTime", tokenExpiryTime);
  }

  const value = {
    userId: userId,
    email: email,
    token: authToken,
    tokenExpiryTime: tokenExpiryTime,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
    setEmailContext: setEmailContext,
    setUserIdContext: setUserIdContext,
    setTokenExpiryContext: setTokenExpiryContext,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
