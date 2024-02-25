import { View, Text, StyleSheet, Dimensions, TextInput, ActivityIndicator } from "react-native";
import { useState, useEffect, useContext } from "react";
import { FlatList } from "react-native-gesture-handler";
import PrimaryButton from "../components/PrimaryButton";
import NewsletterItem from "../components/NewsletterItem";
import ScreenLoading from "../components/ScreenLoading";
import { getNewsletterList } from "../api/appApi";
import { AuthContext } from "../Store/z2pContext";
import SubscriptionModal from "../components/SubscriptionModal";

const windowWidth = Dimensions.get("window").width;

function NewsLetter({ navigation }) {
  const [searchItem, setSearchItem] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const authCtx = useContext(AuthContext);
  const [loadSubscriptionModal, setLoadSubscriptionModal] = useState(false);

  function searchInputHandler(text) {
    setSearchItem(text);
  }
  function searchButtonHandler() {
    console.log("Search Button Press: ", searchItem);
  }
  function newletterPressHandler(id, isPremium) {
    console.log("Newsletter Press: ", id, isPremium, authCtx.subscriptionId);
    if (isPremium === "yes" && authCtx.subscriptionId === "0") {
      setLoadSubscriptionModal(true);
      console.log("Load Subscription modal: ", loadSubscriptionModal);
      console.log("I am here");
    } else {
      navigation.navigate("NewsletterSingle", { id: id });
    }
  }

  function modalCloseHandler() {
    console.log("Close modal press");
    setLoadSubscriptionModal(false);
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
      <SubscriptionModal visible={loadSubscriptionModal} onPress={modalCloseHandler} text={"This is a premium Z2P article and requires a membership."} />
      {/* <View style={styles.questionBoxOuterContainer}>
        <View style={styles.questionBox}>
          <TextInput style={styles.searchText} onChangeText={searchInputHandler} autoCapitalize="none" autoCorrect={false} placeholder="Search articles by keywords" placeholderTextColor="#545454" maxLength={100} multiline={false} />
          <View style={styles.buttonContainer}>
            <PrimaryButton children={"Search"} buttonPress={searchButtonHandler} />
          </View>
        </View>
      </View> */}
      <View style={styles.flatlistContainer}>
        <FlatList
          data={data}
          renderItem={(itemData) => (
            <NewsletterItem headline={itemData.item.headline} date={itemData.item.publishDate} imageLink={itemData.item.imageLink} isPremium={itemData.item.isPremium} description={itemData.item.description} onPress={newletterPressHandler.bind(this, itemData.item.id, itemData.item.isPremium)} />
          )}
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
    backgroundColor: "#f4f4f4",
    flex: 1,
    marginTop: 5,
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
