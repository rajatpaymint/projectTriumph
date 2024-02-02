import { Text, Image, View, StyleSheet, ImageBackground } from "react-native";

function SplashScreen() {
  return (
    <ImageBackground source={require("../assets/images/background.png")} resizeMode="cover" style={styles.background} imageStyle={styles.backgroundImage}>
      <View style={styles.outerContainer}>
        <Image source={require("../assets/images/z2pLogo.png")} style={styles.imageStyle} />
      </View>
    </ImageBackground>
  );
}

export default SplashScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  outerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    opacity: 1,
  },
  imageStyle: {
    width: 200,
    height: 200,
  },
});
