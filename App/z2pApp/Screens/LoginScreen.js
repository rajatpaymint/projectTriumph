import { Text, View, StyleSheet, ImageBackground, Pressable } from "react-native";
import { Colors } from "../Constants/styles";
import LoginForm from "../components/LoginForm";

function LoginScreen({ navigation }) {
  function signupHereHandler() {
    console.log("Signup Pressed");
    navigation.navigate("Signup");
  }
  function forgotPasswordHandler() {
    console.log("forgotPasswordHandler");
  }
  return (
    <ImageBackground source={require("../assets/images/background.png")} resizeMode="cover" style={styles.rootScreen} imageStyle={styles.backgroundImage}>
      <View style={styles.rootScreen}>
        <View style={styles.mainContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Login</Text>
          </View>
          <LoginForm />
          <View style={styles.signupLineBox}>
            <Text style={{ fontFamily: "OpenSans-Regular" }}>Not a user yet?</Text>
            <Pressable onPress={signupHereHandler}>
              <Text style={{ marginLeft: 5, color: Colors.primary800, fontFamily: "OpenSans-Bold" }}>SignUp Here</Text>
            </Pressable>
          </View>
          <View style={styles.signupLineBox}>
            <Pressable onPress={forgotPasswordHandler}>
              <Text style={{ marginLeft: 5, color: Colors.primary800, fontFamily: "OpenSans-Bold" }}>Forgot Password</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

export default LoginScreen;

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
