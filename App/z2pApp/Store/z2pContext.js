import { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
  userId: "",
  email: "",
  name: "",
  city: "",
  token: "",
  tokenExpiryTime: "",
  subscriptionId: "",
  isAuthenticated: false,
  authenticate: () => {},
  logout: () => {},
  setEmailContext: () => {},
  setNameContext: () => {},
  setCityContext: () => {},
  setUserIdContext: () => {},
  setTokenExpiryContext: () => {},
  setSubscriptionIdContext: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [email, setEmail] = useState();
  const [userId, setUserId] = useState();
  const [tokenExpiryTime, setTokenExpiryTime] = useState(new Date());
  const [city, setCity] = useState();
  const [name, setName] = useState();
  const [subscriptionId, setSubscriptionId] = useState();

  async function authenticate(token) {
    console.log("In authticatr context");
    setAuthToken(token);
    try {
      await AsyncStorage.setItem("token", token);
    } catch (error) {
      console.error("AsyncStorage error: ", error);
    }
  }
  async function logout() {
    setAuthToken(null);
    setUserId(null);
    setSubscriptionId(null);
    try {
      await Promise.all([
        AsyncStorage.removeItem("token"),
        AsyncStorage.removeItem("userId"),
        AsyncStorage.removeItem("subscriptionId"),
        // Add more keys as needed
      ]);
      console.log("Logout successful and AsyncStorage cleared.");
    } catch (error) {
      // Handle potential errors, for example, logging them
      console.error("Error clearing AsyncStorage during logout:", error);
    }
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

  function setSubscriptionIdContext(subscriptionId) {
    setSubscriptionId(subscriptionId);
    AsyncStorage.setItem("subscriptionId", subscriptionId);
  }

  const value = {
    userId: userId,
    email: email,
    name: name,
    city: city,
    token: authToken,
    tokenExpiryTime: tokenExpiryTime,
    subscriptionId: subscriptionId,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
    setEmailContext: setEmailContext,
    setNameContext: setNameContext,
    setCityContext: setCityContext,
    setUserIdContext: setUserIdContext,
    setTokenExpiryContext: setTokenExpiryContext,
    setSubscriptionIdContext: setSubscriptionIdContext,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
