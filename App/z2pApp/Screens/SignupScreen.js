import { Text, View, StyleSheet, ImageBackground } from "react-native";
import SignupForm from "../components/SignupForm";
import { Colors } from "../Constants/styles";

function SignupScreen() {
  return (
    <ImageBackground source={require("../assets/images/background.png")} resizeMode="cover" style={styles.rootScreen} imageStyle={styles.backgroundImage}>
      <View style={styles.rootScreen}>
        <View style={styles.mainContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Signup</Text>
          </View>
          <SignupForm />
          <View>
            <Text>Button</Text>
          </View>
          <View>
            <Text>Sign In Instead Button</Text>
          </View>
          <View>
            <Text>Line</Text>
          </View>
          <View>
            <Text>SSO Sign in</Text>
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
    backgroundColor: Colors.primary800,
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
    fontSize: 24,
    color: "white",
  },
});
