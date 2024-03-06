import { Text, View, StyleSheet, Pressable, Image, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;

function ResourceItem({ folder, id }) {
  const navigation = useNavigation();
  function folderPressHandler() {
    console.log("id: ", id);
    navigation.navigate("ResourceItemScreen", {
      id: id,
    });
  }
  return (
    <Pressable onPress={folderPressHandler} style={({ pressed }) => (pressed ? [styles.pressed] : [])}>
      <View style={styles.outerContainer}>
        <Image source={require("../assets/images/folderIcon.png")} style={styles.folderIcon} />
        <Text style={[styles.text]}>{folder}</Text>
      </View>
    </Pressable>
  );
}

export default ResourceItem;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    marginBottom: 20,
    marginHorizontal: 10,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
    shadowColor: "black",
    shadowOffset: { width: 8, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3, // Only affects Android
    alignItems: "center",
    justifyContent: "center",
  },
  folderIcon: {
    height: 40,
    width: 40,
  },
  text: {
    fontFamily: "OpenSans-Regular",
  },
  pressed: {
    opacity: 0.9,
  },
});
