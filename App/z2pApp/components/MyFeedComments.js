import { Text, View, StyleSheet, Image } from "react-native";
import { FlatList } from "react-native-gesture-handler";

const comments = [
  {
    id: 1,
    comment: "This is the comment i was talking about. This is how it should look and feel like. All the best.",
  },

  {
    id: 2,
    comment: "This is the comment i was talking about. This is how it should look and feel like. All the best.",
  },

  {
    id: 3,
    comment: "This is the comment i was talking about. This is how it should look and feel like. All the best.",
  },
  {
    id: 4,
    comment: "This is the comment i was talking about. This is how it should look and feel like. All the best.",
  },
  {
    id: 5,
    comment: "This is the comment i was talking about. This is how it should look and feel like. All the best.",
  },
];

function MyFeedComments() {
  function MyFeedCommentItem({ comment }) {
    return (
      <View style={styles.background}>
        <View style={styles.commentUser}>
          <Text style={styles.userText}>rajat2711</Text>
          <Text style={styles.timeText}>2h</Text>
        </View>
        <View style={styles.commentContainer}>
          <Text style={styles.commentText}>{comment}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <FlatList data={comments} renderItem={(itemData) => <MyFeedCommentItem comment={itemData.item.comment} />} keyExtractor={(item) => item.id.toString()} />
    </View>
  );
}

export default MyFeedComments;

const styles = StyleSheet.create({
  screen: {
    marginTop: 10,
    backgroundColor: "#E5E2E3",
    paddingVertical: 5,
    maxHeight: 120,
  },
  background: {},
  commentUser: {
    flexDirection: "row",
    paddingLeft: 5,
  },
  userText: {
    fontSize: 11,
    color: "#A6A6A6",
    marginRight: 10,
  },
  timeText: {
    fontSize: 11,
    color: "#A6A6A6",
  },
  commentContainer: {
    marginTop: 1,
    paddingRight: 5,
    paddingLeft: 5,
  },
  commentText: {
    color: "#2E2D2D",
    fontSize: 13,
  },
});
