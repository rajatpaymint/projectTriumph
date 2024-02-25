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
    borderRadius: 20,
    margin: 4,
    overflow: "hidden",
    // Shadow Styles
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1, // for Android shadow
  },
  buttonInnerContainer: {
    backgroundColor: Colors.primary500,
    paddingVertical: 8,
    paddingHorizontal: 16,
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
