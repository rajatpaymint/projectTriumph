import { Text, View, Image, StyleSheet, Dimensions, ImageBackground, ScrollView, Pressable } from "react-native";
import Share from "react-native-share";
import RNFetchBlob from "rn-fetch-blob";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { getSingleArticle } from "../api/appApi";
import HTML from "react-native-render-html";
import ScreenLoading from "../components/ScreenLoading";
import { Colors } from "../Constants/styles";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function NewsletterSingle({ route }) {
  const id = route.params.id;
  const [htmlContent, setHtmlContent] = useState("");
  const [headline, setHeadline] = useState("");
  const [publishDate, setPublishDate] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [description, setDescription] = useState("");

  async function shareButtonHandler() {
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
          message: "*" + headline + "*" + "\n\n" + description + "\n\nCheck this amazing article at B2Z app: " + "https://www.rajatyadav.info/",
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
    console.log("Share button pressed");
  }

  useEffect(() => {
    async function fetchMarkdown() {
      const response = await getSingleArticle(id);
      data = response["content"];
      setHtmlContent(data);
      setHeadline(response["headline"]);
      console.log("Headline: ", headline);
      setPublishDate(response["publishDate"]);
      console.log("PD: ", headline);
      setCreatedBy(response["createdBy"]);
      console.log("CB: ", headline);
      setImageLink(response["imageLink"]);
      console.log("IL: ", imageLink);
      setDescription(response["description"]);
      setIsLoading(false);
    }
    console.log("Enter here");
    fetchMarkdown();
  }, []);

  return (
    <View style={styles.background}>
      <ScreenLoading visible={isLoading} />
      <ScrollView style={{ marginBottom: 20 }}>
        <View style={styles.titleBox}>
          <Text style={styles.titleText}>{headline}</Text>
          <View style={styles.articleDetailBox}>
            <View style={styles.dateBox}>
              <Text style={styles.dateText}>{publishDate}</Text>
              {!isLoading && <Text style={styles.authorText}> By {createdBy}</Text>}
            </View>
            <View style={styles.iconBox}>
              <Pressable onPress={shareButtonHandler}>
                <Ionicons name="share-social-outline" size={26} color={Colors.primary500} style={{}} />
              </Pressable>
            </View>
          </View>
        </View>
        <View style={styles.imageBox}>
          <ImageBackground source={{ uri: imageLink }} resizeMode="cover" imageStyle={{ opacity: 0.3 }}>
            <Image source={{ uri: imageLink }} style={styles.image} />
          </ImageBackground>
        </View>
        <View style={styles.storyBox}>
          <HTML source={{ html: htmlContent }} contentWidth={windowWidth} />
        </View>
      </ScrollView>
    </View>
  );
}

export default NewsletterSingle;

const styles = StyleSheet.create({
  background: {
    backgroundColor: "white",
    flex: 1,
  },
  titleBox: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  titleText: {
    fontFamily: "OpenSans-SemiBold",
    fontSize: 18,
  },
  articleDetailBox: {
    flexDirection: "row",
    width: windowWidth - 20,
    justifyContent: "space-between",
    paddingRight: 10,
    alignItems: "center",
  },
  dateBox: {
    flexDirection: "row",
  },
  dateText: {
    fontFamily: "OpenSans-Regular",
    fontSize: 12,
    color: "#545454",
    marginRight: 15,
  },
  authorText: {
    fontFamily: "OpenSans-Regular",
    fontSize: 12,
    color: "#545454",
  },
  iconBox: {
    flexDirection: "row",
  },
  imageBox: {
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  image: {
    width: windowWidth - 20,
    height: windowHeight / 4,
    resizeMode: "contain",
  },
  storyBox: {
    marginHorizontal: 10,
  },
});
