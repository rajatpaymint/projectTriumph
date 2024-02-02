import { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
  userId: "",
  email: "",
  name: "",
  city: "",
  token: "",
  tokenExpiryTime: "",
  isAuthenticated: false,
  authenticate: () => {},
  logout: () => {},
  setEmailContext: () => {},
  setNameContext: () => {},
  setCityContext: () => {},
  setUserIdContext: () => {},
  setTokenExpiryContext: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [email, setEmail] = useState();
  const [userId, setUserId] = useState();
  const [tokenExpiryTime, setTokenExpiryTime] = useState(new Date());
  const [city, setCity] = useState();
  const [name, setName] = useState();

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
  function setCityContext(city) {
    setCity(city);
    AsyncStorage.setItem("city", city);
  }

  function setNameContext(name) {
    setName(name);
    AsyncStorage.setItem("name", name);
  }

  function setTokenExpiryContext(tokenExpiryTime) {
    setTokenExpiryTime(tokenExpiryTime);
    AsyncStorage.setItem("tokenExpiryTime", tokenExpiryTime);
  }

  const value = {
    userId: userId,
    email: email,
    name: name,
    city: city,
    token: authToken,
    tokenExpiryTime: tokenExpiryTime,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
    setEmailContext: setEmailContext,
    setNameContext: setNameContext,
    setCityContext: setCityContext,
    setUserIdContext: setUserIdContext,
    setTokenExpiryContext: setTokenExpiryContext,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
