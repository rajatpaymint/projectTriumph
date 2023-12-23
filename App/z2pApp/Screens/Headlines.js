import { Text, View, Image, StyleSheet, Dimensions, TextInput, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import HeadlineItem from "../components/HeadlineItem";

const headlineData = [
  {
    id: 1,
    headline: "Byjus set to file for bankruptcy in January: Reports",
    date: "26th Sept 2023",
  },
  {
    id: 2,
    headline: "Byjus set to file for bankruptcy in January: Reports",
    date: "26th Sept 2023",
  },
  {
    id: 3,
    headline: "Byjus set to file for bankruptcy in January: Reports",
    date: "26th Sept 2023",
  },
  {
    id: 4,
    headline: "Byjus set to file for bankruptcy in January: Reports",
    date: "26th Sept 2023",
  },
  {
    id: 5,
    headline: "Byjus set to file for bankruptcy in January: Reports",
    date: "26th Sept 2023",
  },
  {
    id: 6,
    headline: "Byjus set to file for bankruptcy in January: Reports",
    date: "26th Sept 2023",
  },
  {
    id: 7,
    headline: "Byjus set to file for bankruptcy in January: Reports",
    date: "26th Sept 2023",
  },
];

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function Headlines() {
  const [headlineSearchInput, setHeadlineSearchInput] = useState();
  function headlineSearchInputHandler() {}
  return (
    <View style={styles.screenBackground}>
      <View style={styles.questionBox}>
        <View style={styles.searchIconImage}>
          <Ionicons name="search" size={16} color="#545454" />
        </View>
        <TextInput style={styles.modalText} autoCapitalize="none" autoCorrect={false} onChangeText={headlineSearchInputHandler} placeholder="Search news" placeholderTextColor="#545454" maxLength={50} />
      </View>
      <FlatList data={headlineData} renderItem={(itemData) => <HeadlineItem headline={itemData.item.headline} date={itemData.item.date} id={itemData.item.id} />} keyExtractor={(item) => item.id.toString()} />
    </View>
  );
}

export default Headlines;

const styles = StyleSheet.create({
  screenBackground: {
    flex: 1,
    backgroundColor: "white",
  },
  questionBox: {
    backgroundColor: "#D9D9D9",
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 20,
    flexDirection: "row",
    textAlign: "center",
  },
  searchIconImage: {
    marginLeft: 5,
    marginTop: 5,
    marginRight: 3,
  },
});
