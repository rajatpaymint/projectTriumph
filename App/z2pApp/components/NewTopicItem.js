import { View, Text, Image, StyleSheet, Dimensions, Pressable } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
console.log("Window Width: ", windowWidth);

function NewTopicItem({ topic, iconLink, id, onPress }) {
  const name = "business";
  const ImageLink = require("../assets/images/" + name + ".png");
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [pressed && styles.pressed]}>
      <View style={styles.outerContainer}>
        {/* <Image source={require("../assets/images/" + iconLink + ".png")} style={styles.imageContainer} /> */}
        <Image source={{ uri: iconLink }} style={styles.imageContainer} />
        <Text style={styles.text}>{topic}</Text>
      </View>
    </Pressable>
  );
}

export default NewTopicItem;

const styles = StyleSheet.create({
  outerContainer: {
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 10,
    width: 90,
  },
  imageContainer: {
    height: 80,
    width: 80,
    borderRadius: 10,
    marginBottom: 1,
  },
  text: {
    fontFamily: "OpenSans-Regular",
    fontSize: 12,
  },
  pressed: {
    opacity: 0.7,
  },
});
