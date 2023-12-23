import { Text, View, StyleSheet, Image, Pressable } from "react-native";
import { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";

const imageLinks = [
  {
    startup: "https://ibb.co/CKRm34S",
  },
];

function TopicItem({ children, icon, color, onPress, iconLink }) {
  console.log("IconLink is: ", iconLink);
  const name = "business";
  const ImageLink = require("../assets/images/" + name + ".png");
  return (
    <View style={styles.outerContainer}>
      {/* <Image source={require("../assets/images/" + iconLink + ".png")} style={styles.imageContainer} /> */}
      <Image source={ImageLink} style={styles.imageContainer} />
      <View style={{ position: "absolute", top: -1, right: -4 }}>
        <Pressable onPress={onPress} style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
          <Ionicons name={icon} size={32} color={color} />
        </Pressable>
      </View>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
}

export default TopicItem;

const styles = StyleSheet.create({
  outerContainer: {
    alignItems: "center",
    margin: 10,
    width: 90,
  },
  imageContainer: {
    height: 80,
    width: 80,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 1,
  },
  text: {
    fontSize: 12,
  },
  button: {
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  pressed: {
    opacity: 0.7,
  },
});
