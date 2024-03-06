import { Text, View, StyleSheet, Image, Dimensions, ImageBackground } from "react-native";
import Share from "react-native-share";
import RNFetchBlob from "rn-fetch-blob";
import SourceButton from "./SourceButton";
import LearnButton from "./LearnButton";

import { useState } from "react";
import LearnModal from "./LearnModal";

import { fetchNewsLearn } from "../api/appApi";
import ShareButton from "./ShareButton";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const imageHeight = Math.round(windowHeight / 4);
console.log("Image Height: ", imageHeight);

const commentBoxHeight = Math.round(windowHeight / 9);

function NewsItem({ headline, news, createdDate, imageLink, articleLink, navigation, id }) {
  const [learnModalOpen, setLearnModalOpen] = useState(false);
  const [askModalOpen, setAskModalOpen] = useState(false);
  const [learnContent, setLearnContent] = useState("Loading...");

  function sourceButtonHandler() {
    console.log("Source button pressed");
    // Linking.openURL(articleLink).catch((err) => console.error("Couldn't load page", err));
    navigation.navigate("Webpage", { link: articleLink });
  }

  async function learnButtonHandler() {
    console.log("Learn button pressed");
    setLearnModalOpen(true);
    const response = await fetchNewsLearn(id);
    setLearnContent(response["newsLearnContent"]);
  }

  function shareButtonHandler() {
    async function shareImage() {
      try {
        // Download the image to the cache directory
        const res = await RNFetchBlob.config({
          fileCache: true,
          appendExt: "png",
          path: RNFetchBlob.fs.dirs.CacheDir + "/someImage.png",
        }).fetch("GET", imageLink);

        // Share the image using a content URI
        await Share.open({
          message: "*" + headline + "*" + "\n\n" + news + "\n\nDownload the B2Z app: " + "https://www.rajatyadav.info/",
          url: "file://" + res.path(),
          type: "image/png",
        });

        // Optionally, clean up the cached file after sharing
        RNFetchBlob.fs.unlink(res.path());
      } catch (error) {
        console.error("Sharing error:", error);
      }
    }
    shareImage();
    console.log("Ask button pressed");
  }
  function modalCloseHandler() {
    setLearnModalOpen(false);
    setAskModalOpen(false);
  }

  return (
    <>
      <LearnModal visible={true && learnModalOpen} text={learnContent} closeOnPress={modalCloseHandler} />
      <View style={styles.outerContainer}>
        <View>
          <View style={styles.imageView}>
            {/* <ImageBackground source={require("../assets/images/byjusSample.png")} resizeMode="cover" imageStyle={{ opacity: 0.3 }}> */}
            <ImageBackground source={{ uri: imageLink }} resizeMode="cover" imageStyle={{ opacity: 0.3, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
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
            <ShareButton onPress={shareButtonHandler} />
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
    marginBottom: 30,
    marginHorizontal: 10,
    minHeight: windowHeight - 70,
    justifyContent: "space-between",
    shadowColor: "black",
    shadowOffset: { width: 8, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2, // Only affects Android
    borderRadius: 10,
  },
  image: {
    height: imageHeight,
    width: windowWidth - 20,
    resizeMode: "center",
  },
  imageView: {
    width: windowWidth - 20,
    alignItems: "center",
    justifyContent: "center",
  },
  headlineContainer: {
    marginTop: 10,
    paddingHorizontal: 15,
  },
  headlineText: {
    fontFamily: "OpenSans-SemiBold",
    fontSize: 20,
  },
  newsContainer: {
    marginTop: 10,
    paddingHorizontal: 15,
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
