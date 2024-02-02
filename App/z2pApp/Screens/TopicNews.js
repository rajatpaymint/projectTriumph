import { useEffect, useState } from "react";
import { Text, Image, View, StyleSheet } from "react-native";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import { getTopicNews } from "../api/appApi";
import ScreenLoading from "../components/ScreenLoading";
import NewsItem from "../components/NewsItem";

function TopicNews({ navigation, route }) {
  const id = route.params.id;
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  async function fetchTopicNews() {
    setIsLoading(true);
    try {
      const response = await getTopicNews(id, currentPage, 20);
      setData((prevData) => [...prevData, ...response["newsList"]]);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchTopicNews();
  }, [currentPage]);

  function handleLoadMore() {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
  }

  return (
    <GestureHandlerRootView style={styles.outerContainer}>
      <ScreenLoading visible={isLoading} />
      {data.length > 0 ? (
        <View style={styles.flatlistContainer}>
          <FlatList
            data={data}
            renderItem={(itemData) => <NewsItem headline={itemData.item.headline} news={itemData.item.summary} imageLink={itemData.item.imageLink} createdDate={itemData.item.createdDate} articleLink={itemData.item.articleLink} navigation={navigation} />}
            keyExtractor={(item) => item.id.toString()}
            nestedScrollEnabled={true}
            style={styles.flatlist}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0}
          />
        </View>
      ) : (
        <Text>No news in this topic!</Text>
      )}
    </GestureHandlerRootView>
  );
}

export default TopicNews;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  flatlistContainer: {
    flex: 1,
  },
  flatlist: {},
});
