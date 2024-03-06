import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { FlatList } from "react-native-gesture-handler";
import FeedItem from "../components/FeedItem";

const postData = [
  {
    id: 1,
    headline: "Russia launches 100 missiles on Kyiv. President Zelensky in hiding: Reports",
  },
  {
    id: 2,
    headline: "Russia launches 100 missiles on Kyiv. President Zelensky in hiding: Reports",
  },
  {
    id: 3,
    headline: "Russia launches 100 missiles on Kyiv. President Zelensky in hiding: Reports",
  },
  {
    id: 4,
    headline: "Russia launches 100 missiles on Kyiv. President Zelensky in hiding: Reports",
  },
  {
    id: 5,
    headline: "Russia launches 100 missiles on Kyiv. President Zelensky in hiding: Reports",
  },
  {
    id: 6,
    headline: "Russia launches 100 missiles on Kyiv. President Zelensky in hiding: Reports",
  },
];

function MyFeed() {
  return (
    <View style={styles.screen}>
      <FlatList data={postData} renderItem={(itemData) => <FeedItem headline={itemData.item.headline} />} keyExtractor={(item) => item.id.toString()} />
    </View>
  );
}

export default MyFeed;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#E5E2E3",
  },
});
