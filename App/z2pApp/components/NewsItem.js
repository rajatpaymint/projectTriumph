import { Text, View, StyleSheet, Image, Dimensions, ImageBackground } from "react-native";
import { Colors } from "../Constants/styles";
import { Ionicons } from "@expo/vector-icons";
import SourceButton from "./SourceButton";
import LearnButton from "./LearnButton";
import { LinearGradient } from "expo-linear-gradient";

import { FlatList } from "react-native-gesture-handler";
import AskButton from "./AskButton";
import { useState } from "react";
import LearnModal from "./LearnModal";
import AskModal from "./AskModal";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const imageHeight = Math.round(windowHeight / 4);
console.log("Image Height: ", imageHeight);
const imageWidth = Math.round(windowWidth);
console.log("Image Width: ", imageWidth);
const commentBoxHeight = Math.round(windowHeight / 9);

function NewsItem({ headline, news, createdDate, imageLink, articleLink, navigation }) {
  const [learnModalOpen, setLearnModalOpen] = useState(false);
  const [askModalOpen, setAskModalOpen] = useState(false);

  function sourceButtonHandler() {
    console.log("Source button pressed");
    // Linking.openURL(articleLink).catch((err) => console.error("Couldn't load page", err));
    navigation.navigate("Webpage", { link: articleLink });
  }
  function learnButtonHandler() {
    console.log("Learn button pressed");
    setLearnModalOpen(true);
  }
  function askButtonHandler() {
    console.log("Ask button pressed");
    setAskModalOpen(true);
  }
  function modalCloseHandler() {
    setLearnModalOpen(false);
    setAskModalOpen(false);
  }

  return (
    <>
      <AskModal visible={true && askModalOpen} closeOnPress={modalCloseHandler} />
      <LearnModal visible={true && learnModalOpen} text={"newsLearn"} closeOnPress={modalCloseHandler} />
      <View style={styles.outerContainer}>
        <View>
          <View style={styles.imageView}>
            {/* <ImageBackground source={require("../assets/images/byjusSample.png")} resizeMode="cover" imageStyle={{ opacity: 0.3 }}> */}
            <ImageBackground source={{ uri: imageLink }} resizeMode="cover" imageStyle={{ opacity: 0.3 }}>
              {/* <Image source={require("../assets/images/byjusSample.png")} style={styles.image}></Image> */}
              <Image source={{ uri: imageLink }} style={styles.image}></Image>
            </ImageBackground>
          </View>
          <View style={styles.headlineContainer}>
            <Text style={styles.headlineText}>{headline}</Text>
          </View>
          <View style={styles.newsContainer}>
            <Text style={styles.newsText}>{news}</Text>
          </View>
        </View>

        {/* <View style={styles.commentOuterContainer}>
          <View style={styles.commentImage}>
            <Ionicons name="chatbubble-ellipses" size={18} color="black" />
            <Ionicons name="arrow-down-circle-outline" size={18} color="black" />
          </View>
          <FlatList data={commentsData} renderItem={(itemData) => <Text style={styles.commentText}>{itemData.item.comment}</Text>} keyExtractor={(item) => item.id.toString()} contentContainerStyle={styles.flatlistCC} style={styles.flatlist} nestedScrollEnabled={true} />
        </View> */}

        <View style={styles.footer}>
          <View>
            <Text style={styles.dateText}>{createdDate}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <SourceButton onPress={sourceButtonHandler} />
            <LearnButton onPress={learnButtonHandler} />
            <AskButton onPress={askButtonHandler} />
          </View>
        </View>
      </View>
    </>
  );
}

export default NewsItem;

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: "white",
    marginBottom: 20,
    elevation: 2,
    borderTopWidth: 1,
    borderTopColor: "#E5E2E3",
  },
  image: {
    height: imageHeight,
    width: imageWidth,
    resizeMode: "center",
  },
  imageView: {
    width: imageWidth,
    alignItems: "center",
    justifyContent: "center",
  },
  headlineContainer: {
    marginTop: 10,
    marginLeft: 15,
    marginRight: 5,
  },
  headlineText: {
    fontFamily: "OpenSans-SemiBold",
    fontSize: 20,
  },
  newsContainer: {
    marginTop: 10,
    marginLeft: 15,
    marginRight: 5,
  },
  newsText: {
    fontFamily: "OpenSans-Regular",
    fontSize: 14,
    lineHeight: 18,
  },
  commentOuterContainer: {
    backgroundColor: "#D9D9D9",
    marginTop: 15,
    paddingRight: 0,
    elevation: 1,
    flexDirection: "row",
  },
  commentImage: {
    marginLeft: 3,
    marginTop: 3,
    justifyContent: "space-between",
  },
  flatlistCC: {},
  flatlist: {
    maxHeight: 100,
  },
  commentText: {
    color: "#545454",
    marginHorizontal: 5,
    borderBottomWidth: 0,
    borderBottomColor: "grey",
    marginBottom: 6,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 15,
    marginBottom: 10,
    marginRight: 10,
  },
  dateText: {
    fontFamily: "OpenSans-Regular",
    fontSize: 10,
    color: "#545454",
  },
});
