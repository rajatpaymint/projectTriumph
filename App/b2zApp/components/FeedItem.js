import { Text, View, StyleSheet, Image, Dimensions, Pressable } from "react-native";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../Constants/styles";
import MyFeedComments from "./MyFeedComments";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function FeedItem({ headline }) {
  const [shareIsPressed, setShareIsPressed] = useState(false);
  const [shareColor, setShareColor] = useState("");

  useEffect(() => {
    setShareColor("orange");
    setTimeout(() => {
      setShareColor("#A6A6A6");
    }, 200);
  }, [shareIsPressed]);

  function upvoteHandler() {
    console.log("Upvote");
  }

  function downvoteHandler() {
    console.log("Downvote");
  }

  function shareHandler() {
    setShareIsPressed(!shareIsPressed);
    console.log("Share");
  }

  return (
    <View style={styles.background}>
      <View style={styles.headlineImage}>
        <Text style={styles.headline}>{headline}</Text>
        <Image source={require("../assets/images/sample3.png")} style={styles.image} />
      </View>
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>2h ago</Text>
      </View>
      <View style={styles.postInteraction}>
        <View style={styles.individualInteraction}>
          <Pressable onPress={upvoteHandler}>
            <Ionicons name="chevron-up-circle-outline" size={28} color={Colors.primary500} />
          </Pressable>
          <Text style={styles.interactionText}>2.3k</Text>
          <Pressable onPress={downvoteHandler}>
            <Ionicons name="chevron-down-circle-outline" size={28} color="#A6A6A6" />
          </Pressable>
        </View>
        <View style={styles.individualInteraction}>
          <Ionicons name="md-chatbubble-outline" size={28} color="#A6A6A6" style={{ marginLeft: 20 }} />
          <Text style={styles.interactionText}>654</Text>
        </View>
        <View style={styles.individualInteraction}>
          <Pressable onPress={shareHandler}>
            <Ionicons name="share-social-outline" size={28} color={shareColor} style={{ marginLeft: 20, overflow: "hidden" }} />
          </Pressable>
          <Text style={styles.interactionText}>25</Text>
        </View>
      </View>
      <MyFeedComments />
    </View>
  );
}

export default FeedItem;

const styles = StyleSheet.create({
  background: {
    backgroundColor: "white",
    paddingBottom: 20,
    elevation: 2,
    marginBottom: 15,
  },
  headlineImage: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  headline: {
    fontWeight: "bold",
    maxWidth: windowWidth - 120,
  },
  timeContainer: {
    paddingRight: 5,
  },
  timeText: {
    fontSize: 11,
    color: "#A6A6A6",
    textAlign: "right",
  },
  image: {
    maxHeight: 100,
    maxWidth: 100,
    resizeMode: "contain",
  },
  postInteraction: {
    alignItems: "flex-start",
    paddingHorizontal: 5,
    maxHeight: 70,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
  },
  individualInteraction: {
    flexDirection: "row",
    alignItems: "center",
  },
});
