import { View, Text, StyleSheet, Dimensions, TextInput, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import { FlatList } from "react-native-gesture-handler";
import PrimaryButton from "../components/PrimaryButton";
import NewsletterItem from "../components/NewsletterItem";
import ScreenLoading from "../components/ScreenLoading";
import { getNewsletterList } from "../api/appApi";

const newsletterData = [
  {
    id: 1,
    headline: "The whole story behind the collapse of Byju's",
    date: "26 Sept 2023",
  },
  {
    id: 2,
    headline: "The whole story behind the collapse of Byju's",
    date: "26 Sept 2023",
  },
  {
    id: 3,
    headline: "The whole story behind the collapse of Byju's",
    date: "26 Sept 2023",
  },
  {
    id: 4,
    headline: "The whole story behind the collapse of Byju's",
    date: "26 Sept 2023",
  },
  {
    id: 5,
    headline: "The whole story behind the collapse of Byju's",
    date: "26 Sept 2023",
  },
  {
    id: 6,
    headline: "The whole story behind the collapse of Byju's",
    date: "26 Sept 2023",
  },
  {
    id: 7,
    headline: "The whole story behind the collapse of Byju's",
    date: "26 Sept 2023",
  },
  {
    id: 8,
    headline: "The whole story behind the collapse of Byju's",
    date: "26 Sept 2023",
  },
];

const windowWidth = Dimensions.get("window").width;

function NewsLetter({ navigation }) {
  const [searchItem, setSearchItem] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  function searchInputHandler(text) {
    setSearchItem(text);
  }
  function searchButtonHandler() {
    console.log("Search Button Press: ", searchItem);
  }
  function newletterPressHandler(id) {
    console.log("Newsletter Press: ", id);
    navigation.navigate("NewsletterSingle", { id: id });
  }

  async function fetchNewsLetters() {
    console.log("Current Page: ", currentPage);
    setIsLoading(true);
    try {
      const response = await getNewsletterList(currentPage, 20);
      console.log("Newsletter Response: ", response["newsletterList"]);
      setData((prevData) => [...prevData, ...response["newsletterList"]]);
      console.log("Data: ", data);
      setIsLoading(false);
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchNewsLetters(currentPage);
  }, [currentPage]);

  function handleLoadMore() {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
  }

  // function renderFooter() {
  //   return isLoading ? (
  //     <View style={styles.footer}>
  //       <ActivityIndicator size="large" color="#0000ff" />
  //     </View>
  //   ) : null;
  // }

  return (
    <View style={styles.background}>
      <ScreenLoading visible={isLoading} />
      <View style={styles.questionBoxOuterContainer}>
        <View style={styles.questionBox}>
          <TextInput style={styles.searchText} onChangeText={searchInputHandler} autoCapitalize="none" autoCorrect={false} placeholder="Search articles by keywords" placeholderTextColor="#545454" maxLength={100} multiline={false} />
          <View style={styles.buttonContainer}>
            <PrimaryButton children={"Search"} buttonPress={searchButtonHandler} />
          </View>
        </View>
      </View>
      <View style={styles.flatlistContainer}>
        <FlatList
          data={data}
          renderItem={(itemData) => <NewsletterItem headline={itemData.item.headline} date={itemData.item.publishDate} imageLink={itemData.item.imageLink} isPremium={itemData.item.isPremium} onPress={newletterPressHandler.bind(this, itemData.item.id)} />}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0}
          // ListFooterComponent={isLoading ? renderFooter : null}
        />
      </View>
    </View>
  );
}

export default NewsLetter;

const styles = StyleSheet.create({
  background: {
    backgroundColor: "white",
    flex: 1,
  },
  questionBoxOuterContainer: {
    alignItems: "center",
    backgroundColor: "white",
    marginBottom: 10,
    paddingBottom: 10,
  },
  questionBox: {
    backgroundColor: "#D9D9D9",
    width: windowWidth - 10,
    height: 45,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    paddingLeft: 5,
    paddingVertical: 0,
  },
  searchText: {
    fontFamily: "OpenSans-Regular",
    color: "#545454",
    fontSize: 12,
    maxWidth: windowWidth - 100,
  },
  flatlistContainer: {
    flex: 1,
  },
});
