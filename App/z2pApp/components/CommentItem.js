import React, { useState } from "react";
import { View, Text, Pressable, FlatList, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CommentItem = ({ comment }) => {
  const [isReplied, setReplied] = useState(false);

  const handleReply = () => {
    setReplied(!isReplied);
  };

  return (
    <View style={styles.commentContainer}>
      <View style={styles.commentSubContainer}>
        <View style={styles.userContainer}>
          <Ionicons name="person-circle" size={24} color="orange" />
          <Text style={styles.userNameText}>{comment.user}</Text>
          <Text style={styles.timeText}>2h</Text>
        </View>
        <Text style={styles.commentText}>{comment.text}</Text>
        <Pressable onPress={handleReply}>
          <Text style={styles.replyButton}>{isReplied ? "Hide Reply" : "Reply"}</Text>
        </Pressable>
        {isReplied && comment.replies && <FlatList data={comment.replies} keyExtractor={(item) => item.id.toString()} renderItem={({ item }) => <CommentItem comment={item} />} />}
      </View>
    </View>
  );
};

export default CommentItem;

const styles = StyleSheet.create({
  commentContainer: {
    marginVertical: 8,
    paddingLeft: 5,
    borderLeftWidth: 1,
    borderLeftColor: "#d9d9d9",
    backgroundColor: "white",
  },
  commentSubContainer: {
    marginLeft: 3,
  },
  replyButton: {
    color: "blue",
    marginTop: 8,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  userNameText: {
    color: "#737373",
    marginLeft: 3,
  },
  timeText: {
    color: "#737373",
    marginLeft: 5,
    fontSize: 10,
  },
  commentText: {
    color: "#2E2D2D",
    marginLeft: 3,
  },
});
