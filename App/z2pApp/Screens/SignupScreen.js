import { Text, View, StyleSheet, ImageBackground, Pressable } from "react-native";
import SignupForm from "../components/SignupForm";
import { Colors } from "../Constants/styles";

function SignupScreen({ navigation }) {
  function loginButtonHandler() {
    console.log("LoginButton");
    navigation.navigate("Login");
  }
  return (
    <ImageBackground source={require("../assets/images/background.png")} resizeMode="cover" style={styles.rootScreen} imageStyle={styles.backgroundImage}>
      <View style={styles.rootScreen}>
        <View style={styles.mainContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Signup</Text>
          </View>
          <SignupForm moveToLoginHandler={loginButtonHandler} />
          <View style={styles.loginLine}>
            <Text style={{ fontFamily: "OpenSans-Regular" }}>Already a user?</Text>
            <Pressable onPress={loginButtonHandler}>
              <Text style={{ marginLeft: 5, color: Colors.primary800, fontFamily: "OpenSans-Bold" }}>Login Here</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

export default SignupScreen;

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
  loginLine: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 5,
  },
});
