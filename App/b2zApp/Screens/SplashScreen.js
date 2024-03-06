import { Text, Image, View, StyleSheet, ImageBackground, Animated } from "react-native";
import React, { useEffect, useRef } from "react";

function SplashScreen() {
  const moveAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Define the animation as a sequence that moves the logo up and down
    Animated.loop(
      Animated.sequence([
        // Move up
        Animated.timing(moveAnim, {
          toValue: -20,
          duration: 1000,
          useNativeDriver: true, // Use native driver for better performance
        }),
        // Move down
        Animated.timing(moveAnim, {
          toValue: 20,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [moveAnim]);
  return (
    <ImageBackground source={require("../assets/images/background.png")} resizeMode="cover" style={styles.background} imageStyle={styles.backgroundImage}>
      <View style={styles.outerContainer}>
        {/* <Image source={require("../assets/images/z2pLogo.png")} style={styles.imageStyle} /> */}
        <Animated.Image
          source={require("../assets/images/z2pLogo.png")}
          style={[
            styles.imageStyle,
            {
              transform: [
                { translateY: moveAnim }, // Apply the animated value to the translateY transform
              ],
            },
          ]}
        />
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
