import { Text, View, StyleSheet, Image, Dimensions, Pressable, ImageBackground } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { getSingleNews } from "../api/appApi";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
console.log(windowHeight, windowWidth);

function HeadlineItem({ headline, createdDate, id, imageLink, navigation }) {
  function headlineItemPressHandler() {
    console.log("Headline press for id: ", id);
    async function fetchSingleNews() {
      const response = await getSingleNews(id);
      navigation.navigate("SingleNewsScreen", {
        id: id,
        createdDate: createdDate,
        imageLink: imageLink,
        headline: headline,
        summary: response["newsItems"]["summary"],
        articleLink: response["newsItems"]["articleLink"],
      });
    }
    fetchSingleNews();
  }
  console.log("Created DAtE: ", createdDate);
  return (
    <Pressable onPress={headlineItemPressHandler} style={({ pressed }) => pressed && [styles.pressed]} android_ripple={{ color: "white" }}>
      <View style={styles.masterBox}>
        <View style={styles.imageContainer}>
          <ImageBackground source={{ uri: imageLink }} resizeMode="cover" imageStyle={{ opacity: 0.3 }}>
            <Image source={{ uri: imageLink }} style={styles.image} />
          </ImageBackground>
        </View>
        <View style={styles.outerContainer}>
          <Text style={styles.newsText}>{headline}</Text>
          <View style={styles.dateContainer}>
            <Text style={styles.dateText}>{createdDate}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

export default HeadlineItem;

const styles = StyleSheet.create({
  masterBox: {
    flexDirection: "row",
    marginBottom: 15,
    minHeight: 80,
  },
  imageContainer: {
    marginLeft: 5,
    marginRight: 5,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: 60,
    width: 60,
    resizeMode: "contain",
  },
  outerContainer: {
    backgroundColor: "white",
    width: windowWidth - 70,
    paddingLeft: 5,
    paddingRight: 10,
    justifyContent: "space-between",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 8, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2, // Only affects Android
  },
  newsText: {
    fontFamily: "OpenSans-Regular",
    fontSize: 14,
    color: "#545454",
  },
  dateContainer: {
    alignItems: "flex-end",
  },
  dateText: {
    fontFamily: "OpenSans-Regular",
    fontSize: 10,
    color: "#ADAAAB",
  },
  pressed: {
    opacity: 0.6,
  },
});
