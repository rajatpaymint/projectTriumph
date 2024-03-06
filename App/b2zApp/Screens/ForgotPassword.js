import { Text, View, StyleSheet, ImageBackground, Pressable } from "react-native";
import { Colors } from "../Constants/styles";
import LoginForm from "../components/LoginForm";
import { GoogleSignin, GoogleSigninButton } from "@react-native-google-signin/google-signin";
import { GoogleSigninFunction } from "../api/appApi";
import { useContext, useState } from "react";
import { AuthContext } from "../Store/z2pContext";
import ScreenLoading from "../components/ScreenLoading";
import ForgotPasswordForm from "../components/ForgotPasswordForm";

function ForgotPassword({ navigation }) {
  function loginHandler() {
    navigation.navigate("Login");
  }

  function signupHereHandler() {
    navigation.navigate("Signup");
  }

  return (
    <ImageBackground source={require("../assets/images/background.png")} resizeMode="cover" style={styles.rootScreen} imageStyle={styles.backgroundImage}>
      <View style={styles.rootScreen}>
        <View style={styles.mainContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Forgot Password</Text>
          </View>
          <ForgotPasswordForm />
          <View style={styles.signupLineBox}>
            <Text style={{ fontFamily: "OpenSans-Regular" }}>Not a user yet?</Text>
            <Pressable onPress={signupHereHandler}>
              <Text style={{ marginLeft: 5, color: Colors.primary800, fontFamily: "OpenSans-Bold" }}>SignUp Here</Text>
            </Pressable>
          </View>
          <View style={styles.signupLineBox}>
            <Pressable onPress={loginHandler}>
              <Text style={{ marginLeft: 5, color: Colors.primary800, fontFamily: "OpenSans-Bold" }}>Login Instead</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

export default ForgotPassword;

const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: 30,
    marginTop: 100,
    backgroundColor: "white",
    opacity: 0.9,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  backgroundImage: {
    opacity: 1,
  },
  rootScreen: {
    flex: 1,
  },
  titleContainer: {
    marginTop: 5,
    marginBottom: 20,
  },
  title: {
    fontFamily: "OpenSans-Medium",
    fontSize: 24,
    color: "#545454",
  },
  signupLineBox: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 5,
  },
});
