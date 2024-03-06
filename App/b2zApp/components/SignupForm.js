import { useEffect, useState } from "react";
import { Text, View, StyleSheet, TextInput, Button, Pressable, Alert } from "react-native";
import { Colors } from "../Constants/styles";
import PrimaryButton from "./PrimaryButton";
import axios from "axios";
import { URL } from "../Constants/urls";

function SignupForm({ moveToLoginHandler }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");

  function emailInputHandler(text) {
    setEmail(text);
  }
  function passwordInputHandler(text) {
    setPassword(text);
  }

  function confirmPasswordInputHandler(text) {
    setConfirmPassword(text);
  }

  function numberInputHandler(text) {
    setNumber(text);
  }

  function nameInputHandler(text) {
    setName(text);
  }

  function cityInputHandler(text) {
    setCity(text);
  }

  async function signupButton() {
    console.log("Signup button press");
    console.log("email: ", email);
    try {
      if (password == confirmPassword) {
        const response = await axios.post(URL.appApiUrl + "/app/signup", {
          name: name,
          email: email,
          number: number,
          city: city,
          password: password,
        });
        if (response.data["statusCode"] != 0) {
          Alert.alert("Oops", response.data["apiMessage"], [
            {
              text: "Ok",
              style: "cancel",
            },
          ]);
        } else if (response.data["statusCode"] == 0) {
          Alert.alert("", response.data["apiMessage"], [
            {
              text: "Ok",
              onPress: moveToLoginHandler,
              style: "cancel",
            },
          ]);
        }
        console.log("Response Received: ", response.data);
      } else {
        Alert.alert("Oops", "Passwords do not match, please try again", [
          {
            text: "Ok",
            style: "cancel",
          },
        ]);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  return (
    <>
      <View style={styles.emailContainer}>
        <TextInput style={styles.emailInput} autoCapitalize="none" autoCorrect={false} onChangeText={nameInputHandler} placeholder="Your name" placeholderTextColor="grey" maxLength={50} />
      </View>
      <View style={styles.emailContainer}>
        <TextInput style={styles.emailInput} autoCapitalize="none" autoCorrect={false} onChangeText={emailInputHandler} placeholder="Email" placeholderTextColor="grey" maxLength={50} />
      </View>
      <View style={styles.emailContainer}>
        <TextInput style={styles.emailInput} autoCapitalize="none" autoCorrect={false} onChangeText={numberInputHandler} placeholder="10-digit mobile number" placeholderTextColor="grey" maxLength={10} keyboardType="numeric" />
      </View>
      <View style={styles.emailContainer}>
        <TextInput style={styles.emailInput} autoCapitalize="none" autoCorrect={false} onChangeText={cityInputHandler} placeholder="Your current city" placeholderTextColor="grey" maxLength={50} />
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
    borderBottomColor: "#545454",
    borderBottomWidth: 1,
  },
  emailInput: {
    fontFamily: "OpenSans-Regular",
    width: "80%",
    color: "#545454",
  },
});
