import { Text, View, Pressable, StyleSheet } from "react-native";
import { Colors } from "../Constants/styles";

function PrimaryButton({ children, buttonPress }) {
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable style={({ pressed }) => (pressed ? [styles.buttonInnerContainer, styles.pressed] : styles.buttonInnerContainer)} onPress={buttonPress} android_ripple={{ color: "white" }}>
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
}

export default PrimaryButton;

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 28,
    margin: 4,
    overflow: "hidden",
  },
  buttonInnerContainer: {
    backgroundColor: Colors.primary500,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2,
  },
  buttonText: {
    fontFamily: "OpenSans-SemiBold",
    color: "white",
    textAlign: "center",
  },
  pressed: {
    opacity: 0.75,
  },
});
