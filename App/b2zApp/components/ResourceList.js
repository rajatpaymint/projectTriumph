import { Text, View, StyleSheet, Image, Dimensions, Pressable, Linking } from "react-native";
import { getSingleFile } from "../api/appApi";
import { useState } from "react";

const windowWidth = Dimensions.get("window").width;

function ResourceList({ id, name, description, fileLink }) {
  const [isLoading, setIsLoading] = useState(false);
  async function filePressHandler() {
    try {
      setIsLoading(true);
      const response = await getSingleFile(id);
      console.log("URL: ", response);
      setIsLoading(false);
      Linking.openURL(response["url"]);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Pressable onPress={filePressHandler} style={({ pressed }) => (pressed ? [styles.pressed] : [])}>
      <View style={styles.masterContainer}>
        <Image source={require("../assets/images/documentDownload.png")} style={styles.image} />
        <View style={styles.outerContainer}>
          <Text style={[styles.text, { fontWeight: "bold", marginBottom: 10 }]}>{name}</Text>
          <Text style={[styles.text, {}]}>{description}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default ResourceList;

const styles = StyleSheet.create({
  masterContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 5,
    marginBottom: 10,
  },
  outerContainer: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    width: windowWidth - 40,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 8, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3, // Only affects Android
    minHeight: 50,
  },
  text: {
    fontFamily: "OpenSans-Regular",
  },
  image: {
    height: 30,
    width: 30,
  },
  pressed: {
    opacity: 0.8,
  },
});
