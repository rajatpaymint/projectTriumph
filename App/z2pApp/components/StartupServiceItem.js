import { Text, View, Image, StyleSheet, Dimensions, Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";

windowWidth = Dimensions.get("window").width;
windowHeight = Dimensions.get("window").height;

function StartupServiceItem({ name, iconLink, onPress }) {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.background}>
        <Image source={{ uri: iconLink }} style={styles.image} />
        <Text style={styles.text}>{name}</Text>
      </View>
    </Pressable>
  );
}

export default StartupServiceItem;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    marginVertical: 10,
    marginHorizontal: 10,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 8, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3, // Only affects Android
  },
  text: {
    fontFamily: "OpenSans-Regular",
  },
  image: {
    height: 60,
    width: 60,
    resizeMode: "contain",
  },
});
