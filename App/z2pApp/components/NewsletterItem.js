import { View, StyleSheet, Text, Image, Dimensions, ImageBackground, Pressable } from "react-native";
import { Colors } from "../Constants/styles";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import FastImage from "react-native-fast-image";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
console.log("Window Width: ", windowWidth);

function NewsletterItem({ headline, date, imageLink, isPremium, description, onPress }) {
  return (
    <>
      <Pressable onPress={onPress}>
        <View style={styles.background}>
          <View style={styles.titleTextBox}>
            <Text style={styles.titleText}>{headline}</Text>
            <Text style={styles.dateText}>{date}</Text>
          </View>
          <View style={styles.imageBox}>
            <ImageBackground source={{ uri: imageLink }} resizeMode="cover" imageStyle={{ opacity: 0.2, height: (windowWidth - 30) * (9 / 16), width: windowWidth - 30, borderRadius: 8 }}>
              <Image source={{ uri: imageLink }} style={styles.image} />
            </ImageBackground>
          </View>
          <View style={styles.descriptionBox}>
            <Text style={[styles.text]}>{description}</Text>
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
    // backgroundColor: "#f4f4f4",
    backgroundColor: "white",
    marginHorizontal: 10,
    marginBottom: 20,
    borderRadius: 8,
    shadowColor: "black",
    shadowOffset: { width: 8, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2, // Only affects Android
  },
  imageBox: {
    height: (windowWidth - 30) * (9 / 16),
    width: windowWidth - 30,
    marginVertical: 5,
    marginLeft: 5,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: (windowWidth - 30) * (9 / 16),
    width: windowWidth - 30,
    // width: windowWidth / 2.7,
    resizeMode: "contain",
    borderRadius: 8,
  },
  titleTextBox: {
    // backgroundColor: "green",
    flex: 1,
    marginLeft: 15,
    marginRight: 8,
    // width: windowWidth - windowWidth / 2.7 - 50,
    marginTop: 10,
    justifyContent: "center",
  },
  titleText: {
    fontFamily: "OpenSans-SemiBold",
    color: "black",
    fontSize: 17,
    marginBottom: 5,
  },
  dateText: {
    fontFamily: "OpenSans-Regular",
    fontSize: 10,
    color: "grey",
  },
  descriptionBox: {
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  text: {
    fontFamily: "OpenSans-Regular",
  },
});
