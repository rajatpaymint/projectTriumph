import { Text, View, StyleSheet, Pressable, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

function HeadlinePin() {
  const navigation = useNavigation();
  function headlineButtonHandler() {
    console.log("Event Location pressed");
    navigation.navigate("Headlines");
  }
  return (
    <Pressable onPress={headlineButtonHandler}>
      <View style={styles.locationBox}>
        <Image source={require("../assets/images/headlineIcon.png")} style={styles.imageStyle} />
      </View>
    </Pressable>
  );
}

export default HeadlinePin;

const styles = StyleSheet.create({
  locationBox: {
    marginRight: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  imageStyle: {
    height: 25,
    width: 25,
  },
});
