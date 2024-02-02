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
      <View style={styles.outerContainer}>
        <View style={styles.imageContainer}>
          <ImageBackground source={{ uri: imageLink }} resizeMode="cover" imageStyle={{ opacity: 0.3 }}>
            <Image source={{ uri: imageLink }} style={styles.image} />
          </ImageBackground>
        </View>
        <View style={styles.newsContainer}>
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
  outerContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    elevation: 2,
    marginBottom: 10,
  },
  imageContainer: {
    height: 100,
    width: 100,
  },
  image: {
    height: 100,
    width: 100,
    resizeMode: "contain",
  },
  newsContainer: {
    width: windowWidth - 100,
    paddingLeft: 5,
    paddingRight: 10,
    justifyContent: "space-between",
  },
  newsText: {
    fontFamily: "OpenSans-SemiBold",
    fontSize: 16,
    color: "#545454",
  },
  dateContainer: {
    alignItems: "flex-end",
    marginBottom: 1,
  },
  dateText: {
    fontFamily: "OpenSans-Regular",
    fontSize: 10,
    color: "#545454",
  },
  pressed: {
    opacity: 0.6,
  },
});
