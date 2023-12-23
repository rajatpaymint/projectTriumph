import { Text, View, StyleSheet, Image, Dimensions, Pressable } from "react-native";
import { FlatList } from "react-native-gesture-handler";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
console.log(windowHeight, windowWidth);

function HeadlineItem({ headline, date, id }) {
  function headlineItemPressHandler() {
    console.log("Headline press for id: ", id);
  }
  return (
    <Pressable onPress={headlineItemPressHandler}>
      <View style={styles.outerContainer}>
        <View style={styles.imageContainer}>
          <Image source={require("../assets/images/sample2.png")} style={styles.image} />
        </View>
        <View style={styles.newsContainer}>
          <Text style={styles.newsText}>{headline}</Text>
          <View style={styles.dateContainer}>
            <Text style={styles.dateText}>{date}</Text>
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
    elevation: 1,
    marginBottom: 10,
  },
  imageContainer: {
    height: 100,
    width: 100,
  },
  image: {
    maxHeight: 100,
    maxWidth: 100,
    resizeMode: "contain",
  },
  newsContainer: {
    maxWidth: windowWidth - 100,
    paddingLeft: 5,
    paddingRight: 5,
    justifyContent: "space-between",
  },
  newsText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#545454",
  },
  dateContainer: {
    alignItems: "flex-end",
    marginBottom: 1,
  },
  dateText: {
    fontSize: 10,
    color: "#545454",
  },
});
