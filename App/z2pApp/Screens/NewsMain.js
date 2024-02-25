import { Text, Image, StyleSheet, View, Dimensions } from "react-native";

import { FlatList } from "react-native-gesture-handler";
import NewsItem from "../components/NewsItem";
import { useEffect, useState } from "react";
import { getNewsList } from "../api/appApi";
import ScreenLoading from "../components/ScreenLoading";
// import { allNews } from "../components/NewsItem";

const windowHeight = Dimensions.get("window").height;

function NewsMain({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);

  async function fetchNewsList() {
    setIsLoading(true);
    try {
      const response = await getNewsList(currentPage, 10);
      console.log("Response: ", response["newsList"]);
      setData((prevData) => [...prevData, ...response["newsList"]]);
      setIsLoading(false);
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchNewsList();
  }, [currentPage]);

  function handleLoadMore() {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
  }

  return (
    <View style={styles.outerContainer}>
      <ScreenLoading visible={isLoading} />
      <View style={styles.flatlistContainer}>
        <FlatList
          data={data}
          renderItem={(itemData) => <NewsItem id={itemData.item.id} headline={itemData.item.headline} news={itemData.item.summary} imageLink={itemData.item.imageLink} createdDate={itemData.item.createdDate} articleLink={itemData.item.articleLink} navigation={navigation} />}
          keyExtractor={(item) => item.id.toString()}
          nestedScrollEnabled={true}
          style={styles.flatlist}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0}
        />
      </View>
    </View>
  );
}

export default NewsMain;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    marginTop: 5,
  },
  flatlistContainer: {
    flex: 1,
  },
  flatlist: {},
});
