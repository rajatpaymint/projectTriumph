import { Text, View, StyleSheet, ImageBackground, Pressable } from "react-native";
import { Colors } from "../Constants/styles";
import LoginForm from "../components/LoginForm";
import { GoogleSignin, GoogleSigninButton } from "@react-native-google-signin/google-signin";
import { GoogleSigninFunction } from "../api/appApi";
import { useContext, useState } from "react";
import { AuthContext } from "../Store/z2pContext";
import ScreenLoading from "../components/ScreenLoading";

GoogleSignin.configure({
  webClientId: "725161304196-4jc5uta61mo5ah1b7aehqum0qeltb2ek.apps.googleusercontent.com",
  // You might need offlineAccess to get a refresh token
  offlineAccess: false,
});

function LoginScreen({ navigation }) {
  const authCtx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  function signupHereHandler() {
    console.log("Signup Pressed");
    navigation.navigate("Signup");
  }
  function forgotPasswordHandler() {
    console.log("forgotPasswordHandler");
    navigation.navigate("ForgotPassword");
  }

  async function googleSignInHandler() {
    try {
      setIsLoading(true);
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut();
      const userInfo = await GoogleSignin.signIn();
      console.log("User info: ", userInfo["user"]);
      async function fetchGoogleSingin() {
        const response = await GoogleSigninFunction(userInfo["user"]["email"], userInfo["user"]["name"], userInfo["user"]["photo"]);
        if (response["statusCode"] != 0) {
          setIsLoading(false);
          Alert.alert("Oops", response["apiMessage"], [
            {
              text: "Ok",
              style: "cancel",
            },
          ]);
        } else {
          authCtx.authenticate(response["token"]);
          authCtx.setTokenExpiryContext(response["tokenExpiryTime"]);
          authCtx.setUserIdContext(response["userId"]);
          authCtx.setEmailContext(userInfo["user"]["email"]);
          authCtx.setCityContext(response["city"]);
          authCtx.setNameContext(response["name"]);
          authCtx.setSubscriptionIdContext(response["subscriptionId"]);
          setIsLoading(false);
        }
      }
      fetchGoogleSingin();
    } catch (error) {
      console.error("Error: ", error);
      Alert.alert("Login Failed", error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ImageBackground source={require("../assets/images/background.png")} resizeMode="cover" style={styles.rootScreen} imageStyle={styles.backgroundImage}>
      <View style={styles.rootScreen}>
        <ScreenLoading visible={isLoading} />
        <View style={styles.mainContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Login</Text>
          </View>
          <LoginForm />
          <GoogleSigninButton style={{ width: 192, height: 48 }} size={GoogleSigninButton.Size.Wide} color={GoogleSigninButton.Color.Dark} onPress={googleSignInHandler} />
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
