import { useEffect, useState, useContext } from "react";
import { Text, View, StyleSheet, TextInput, Button, Pressable, Alert } from "react-native";
import { Colors } from "../Constants/styles";
import PrimaryButton from "./PrimaryButton";
import axios from "axios";
import { URL } from "../Constants/urls";
import { AuthContext } from "../Store/z2pContext";
import ScreenLoading from "./ScreenLoading";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const authCtx = useContext(AuthContext);

  function emailInputHandler(text) {
    setEmail(text);
  }
  function passwordInputHandler(text) {
    setPassword(text);
  }

  async function loginButton() {
    setIsLoading(true);
    console.log("Login button press");
    console.log("email: ", email);
    try {
      const response = await axios.post(URL.appApiUrl + "/app/login", {
        email: email,
        password: password,
      });
      if (response.data["statusCode"] != 0) {
        setIsLoading(false);
        Alert.alert("Oops", response.data["apiMessage"], [
          {
            text: "Ok",
            style: "cancel",
          },
        ]);
      } else {
        authCtx.authenticate(response.data["token"]);
        authCtx.setTokenExpiryContext(response.data["tokenExpiryTime"]);
        authCtx.setUserIdContext(response.data["userId"]);
        authCtx.setEmailContext(email);
        authCtx.setCityContext(response.data["city"]);
        authCtx.setNameContext(response.data["name"]);
        authCtx.setSubscriptionIdContext(response.data["subscriptionId"]);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  return (
    <>
      <ScreenLoading visible={isLoading} />
      <View style={styles.emailContainer}>
        <TextInput style={styles.emailInput} autoCapitalize="none" autoCorrect={false} onChangeText={emailInputHandler} placeholder="Email" placeholderTextColor="grey" maxLength={50} />
      </View>
      <View style={styles.emailContainer}>
        <TextInput style={styles.emailInput} autoCapitalize="none" autoCorrect={false} onChangeText={passwordInputHandler} placeholder="Password" placeholderTextColor="grey" maxLength={50} />
      </View>
      <PrimaryButton children={"Login"} buttonPress={loginButton} />
    </>
  );
}

export default LoginForm;

const styles = StyleSheet.create({
  emailContainer: {
    width: "80%",
    margin: 15,
    justifyContent: "center",
    borderBottomColor: "#545454",
    borderBottomWidth: 1,
  },
  emailInput: {
    fontFamily: "OpenSans-Regular",
    width: "80%",
    color: "#545454",
  },
});
