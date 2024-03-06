import { Text, View, Image, StyleSheet, ImageBackground, Pressable } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../Constants/styles";
import { useEffect, useState } from "react";
import CommentItem from "../components/CommentItem";

const commentsData = [
  { id: 1, user: "rajat2711", text: "The culture at Byjusis very very toxic, 99 out of 100 employees", replies: [] },
  {
    id: 2,
    user: "rajat2711",
    text: "Second Comment",
    replies: [
      {
        id: 3,
        user: "rajat2711",
        text: "Reply to Second Comment 1",
        replies: [
          { id: 6, user: "rajat2711", text: "Reply to Second Comment 1", replies: [] },
          { id: 7, user: "rajat2711", text: "Reply to Second Comment 2", replies: [] },
        ],
      },
      { id: 4, user: "rajat2711", text: "Reply to Second Comment 2", replies: [] },
    ],
  },
  { id: 5, user: "rajat2711", text: "Third Comment", replies: [] },
  { id: 8, user: "rajat2711", text: "4th Comment", replies: [] },
  { id: 9, user: "rajat2711", text: "5th Comment", replies: [] },
  { id: 10, user: "rajat2711", text: "6th Comment", replies: [] },
  { id: 11, user: "rajat2711", text: "7th Comment", replies: [] },
  { id: 12, user: "rajat2711", text: "8th Comment", replies: [] },
  { id: 13, user: "rajat2711", text: "9th Comment", replies: [] },
  { id: 14, user: "rajat2711", text: "10th Comment", replies: [] },
];

function PostFeed() {
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
    <View style={styles.screen}>
      <View style={styles.postDetails}>
        <View>
          <Text style={styles.postTitle}>Russia launches 100 missiles on Keiv at midnight. President Zelensky in hiding</Text>
        </View>
        <View style={styles.imageContainer}>
          <ImageBackground source={require("../assets/images/sample3.png")} resizeMode="cover" imageStyle={{ opacity: 0.3 }}>
            <Image source={require("../assets/images/sample3.png")} style={styles.image} />
          </ImageBackground>
        </View>
      </View>
      <View style={styles.postInteraction}>
        <Pressable onPress={upvoteHandler}>
          <Ionicons name="chevron-up-circle-outline" size={28} color={Colors.primary500} />
        </Pressable>
        <Text style={styles.interactionText}>2.3k</Text>
        <Pressable onPress={downvoteHandler}>
          <Ionicons name="chevron-down-circle-outline" size={28} color="#A6A6A6" />
        </Pressable>
        <Ionicons name="md-chatbubble-outline" size={28} color="#A6A6A6" style={{ marginLeft: 20 }} />
        <Text style={styles.interactionText}>654</Text>
        <Pressable onPress={shareHandler}>
          <Ionicons name="share-social-outline" size={28} color={shareColor} style={{ marginLeft: 20, overflow: "hidden" }} />
        </Pressable>
        <Text style={styles.interactionText}>25</Text>
      </View>
      <View style={styles.commentContainer}>
        <FlatList data={commentsData} keyExtractor={(item) => item.id.toString()} renderItem={({ item }) => <CommentItem comment={item} />} />
      </View>
    </View>
  );
}

export default PostFeed;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  postDetails: {
    paddingHorizontal: 5,
    paddingTop: 5,
    backgroundColor: "white",
  },
  postTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  imageContainer: {
    maxHeight: 210,
    maxWidth: 200,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginLeft: 5,
  },
  image: {
    maxHeight: 200,
    maxWidth: 200,
    resizeMode: "contain",
  },
  postInteraction: {
    maxHeight: 70,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 10,
    backgroundColor: "white",
  },
  interactionText: {
    color: "#737373",
  },
  pressed: {
    opacity: 0.5,
  },
  pressable: {},
  commentContainer: {
    flex: 1,
  },
  replyButton: {
    color: "blue",
    marginTop: 8,
  },
});
