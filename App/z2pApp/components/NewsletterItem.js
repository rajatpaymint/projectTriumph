import { View, StyleSheet, Text, Image, Dimensions, ImageBackground, Pressable } from "react-native";
import { Colors } from "../Constants/styles";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import FastImage from "react-native-fast-image";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
console.log("Window Width: ", windowWidth);

function NewsletterItem({ headline, date, imageLink, isPremium, onPress }) {
  return (
    <>
      <Pressable onPress={onPress}>
        <View style={styles.background}>
          <View style={styles.rowBox}>
            <View style={styles.imageBox}>
              <ImageBackground source={{ uri: imageLink }} resizeMode="cover" imageStyle={{ opacity: 0.2, height: 160, borderRadius: 8 }}>
                <Image source={{ uri: imageLink }} style={styles.image} />
              </ImageBackground>
            </View>
            <View style={styles.titleTextBox}>
              <Text style={styles.titleText}>{headline}</Text>
              <Text style={styles.dateText}>{date}</Text>
            </View>
          </View>
        </View>
        {isPremium === "yes" && (
          <View style={{ position: "absolute", top: 0, right: 12 }}>
            <MaterialCommunityIcons name="crown" size={25} color={"#FFE455"} />
          </View>
        )}
      </Pressable>
    </>
  );
}

export default NewsletterItem;

const styles = StyleSheet.create({
  background: {
    backgroundColor: Colors.primary800,
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 8,
    justifyContent: "center",
    elevation: 3,
  },
  rowBox: {
    flexDirection: "row",
    // backgroundColor: "orange",
    alignItems: "center", // Center vertically
  },
  imageBox: {
    height: 160,
    marginVertical: 5,
    marginLeft: 5,
  },
  image: {
    height: 160,
    width: windowWidth / 2.7,
    resizeMode: "contain",
  },
  titleTextBox: {
    // backgroundColor: "green",
    flex: 1,
    marginLeft: 10,
    marginRight: 8,
    // width: windowWidth - windowWidth / 2.7 - 50,
    marginVertical: 10,
    justifyContent: "center",
  },
  titleText: {
    fontFamily: "OpenSans-SemiBold",
    color: "white",
    fontSize: 15,
  },
  dateText: {
    fontFamily: "OpenSans-Regular",
    fontSize: 12,
    color: "#F4F4F4",
  },
});
