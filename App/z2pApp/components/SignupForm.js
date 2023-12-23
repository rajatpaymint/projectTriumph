import { useEffect, useState } from "react";
import { Text, View, StyleSheet, TextInput, Button, Pressable } from "react-native";
import { Colors } from "../Constants/styles";
import PrimaryButton from "./PrimaryButton";
import axios from "axios";
import { URL } from "../Constants/urls";

function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function emailInputHandler(text) {
    setEmail(text);
  }
  function passwordInputHandler(text) {
    setPassword(text);
  }

  function confirmPasswordInputHandler(text) {
    setConfirmPassword(text);
  }

  async function signupButton() {
    console.log("Signup button press");
    console.log("email: ", email);
    try {
      const response = await axios.post(URL.appApiUrl + "/app/signup", {
        email: email,
        password: password,
      });
      console.log("Response Received: ", response.data);
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  return (
    <>
      <View style={styles.emailContainer}>
        <TextInput style={styles.emailInput} autoCapitalize="none" autoCorrect={false} onChangeText={emailInputHandler} placeholder="Email" placeholderTextColor="grey" maxLength={50} />
      </View>
      <View style={styles.emailContainer}>
        <TextInput style={styles.emailInput} autoCapitalize="none" autoCorrect={false} onChangeText={passwordInputHandler} placeholder="Password" placeholderTextColor="grey" maxLength={50} />
      </View>
      <View style={styles.emailContainer}>
        <TextInput style={styles.emailInput} autoCapitalize="none" autoCorrect={false} onChangeText={setConfirmPassword} placeholder="Confirm Password" placeholderTextColor="grey" maxLength={50} />
      </View>
      <PrimaryButton children={"Signup"} buttonPress={signupButton} />
    </>
  );
}

export default SignupForm;

const styles = StyleSheet.create({
  emailContainer: {
    width: "80%",
    margin: 15,
    justifyContent: "center",
    borderBottomColor: "white",
    borderBottomWidth: 2,
  },
  emailInput: {
    width: "80%",
    color: "white",
  },
});
