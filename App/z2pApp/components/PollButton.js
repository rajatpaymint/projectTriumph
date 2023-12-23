import { View, Button, Pressable, StyleSheet, Image, Text } from "react-native";
import { Colors } from "../Constants/styles";

function PollButton({ onPress }) {
  return (
    <Pressable style={({ pressed }) => [styles.button, pressed && styles.pressed]} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image source={require("../assets/images/poll.png")} style={styles.image} />
      </View>
    </Pressable>
  );
}

export default PollButton;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 5,
  },
  pressed: {
    opacity: 0.7,
  },
  imageContainer: {
    elevation: 0,
  },
  image: {
    width: 50,
    height: 50,
  },
});
