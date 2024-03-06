import { View, Text, StyleSheet, Image, Modal, ActivityIndicator, Animated } from "react-native";
import { Colors } from "../Constants/styles";
import { useState, useRef, useEffect } from "react";

function ScreenLoading({ visible }) {
  const moveAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    // Define the animation as a sequence that moves the logo up and down
    Animated.loop(
      Animated.sequence([
        // Move up
        Animated.timing(moveAnim, {
          toValue: -20,
          duration: 400,
          useNativeDriver: true, // Use native driver for better performance
        }),
        // Move down
        Animated.timing(moveAnim, {
          toValue: 20,
          duration: 400,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [moveAnim]);
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      statusBarTranslucent={true}
      onRequestClose={() => {
        // Handle modal close action if needed
      }}
    >
      <View style={styles.modalOverlayContainer}>
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
      </View>
    </Modal>
  );
}

export default ScreenLoading;

const styles = StyleSheet.create({
  modalOverlayContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0)",
  },
  modalOverlayContent: {
    padding: 20,
    borderRadius: 10,
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
    width: 50,
    height: 50,
  },
});
