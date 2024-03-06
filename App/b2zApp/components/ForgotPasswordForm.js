import { useEffect, useState, useContext } from "react";
import { Text, View, StyleSheet, TextInput, Button, Pressable, Alert } from "react-native";
import { Colors } from "../Constants/styles";
import PrimaryButton from "./PrimaryButton";
import axios from "axios";
import { URL } from "../Constants/urls";
import { AuthContext } from "../Store/z2pContext";
import ScreenLoading from "./ScreenLoading";
import { forgotPassword } from "../api/appApi";

function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function emailInputHandler(text) {
    setEmail(text);
  }

  async function resetPasswordHandler() {
    setIsLoading(true);
    console.log("Reset press");
    const response = await forgotPassword(email);
    Alert.alert("", response["apiMessage"], [
      {
        text: "Ok",
        style: "cancel",
      },
    ]);
    console.log("Response: ", response);
    setIsLoading(false);
  }

  return (
    <>
      <ScreenLoading visible={isLoading} />
      <View style={styles.emailContainer}>
        <TextInput style={styles.emailInput} autoCapitalize="none" autoCorrect={false} onChangeText={emailInputHandler} placeholder="Registered email" placeholderTextColor="grey" maxLength={50} />
      </View>
      <PrimaryButton children={"Reset Password"} buttonPress={resetPasswordHandler} />
    </>
  );
}

export default ForgotPasswordForm;

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
