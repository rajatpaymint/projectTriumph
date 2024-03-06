import { Text, View, Image, StyleSheet, Dimensions, TextInput, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import HeadlineItem from "../components/HeadlineItem";
import { getHeadlines } from "../api/appApi";
import ScreenLoading from "../components/ScreenLoading";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function Headlines({ navigation }) {
  const [headlineSearchInput, setHeadlineSearchInput] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);

  async function fetchHeadlines() {
    setIsLoading(true);
    try {
      console.log("here");
      const response = await getHeadlines(currentPage, 10);
      setData((prevData) => [...prevData, ...response["headlineList"]]);
      setIsLoading(false);
    } catch (error) {
      console.log("error: ", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchHeadlines();
  }, [currentPage]);

  function handleLoadMore() {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
  }

  function headlineSearchInputHandler() {}
  return (
    <View style={styles.screenBackground}>
      <ScreenLoading visible={isLoading} />
      {/* <View style={styles.questionBox}>
        <View style={styles.searchIconImage}>
          <Ionicons name="search" size={16} color="#545454" />
        </View>
        <TextInput style={styles.modalText} autoCapitalize="none" autoCorrect={false} onChangeText={headlineSearchInputHandler} placeholder="Search news" placeholderTextColor="#545454" maxLength={50} />
      </View> */}
      <FlatList
        data={data}
        renderItem={(itemData) => <HeadlineItem headline={itemData.item.headline} createdDate={itemData.item.createdDate} id={itemData.item.id} imageLink={itemData.item.imageLink} navigation={navigation} />}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0}
      />
    </View>
  );
}

export default Headlines;

const styles = StyleSheet.create({
  screenBackground: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    paddingTop: 5,
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
