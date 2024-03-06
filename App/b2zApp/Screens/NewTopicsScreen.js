import { View, Text, Image, StyleSheet, Dimensions, SafeAreaView } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import NewTopicItem from "../components/NewTopicItem";
import { useEffect, useState } from "react";
import { getTopics } from "../api/appApi";
import ScreenLoading from "../components/ScreenLoading";

const windowWidth = Dimensions.get("window").width;

function NewTopicsScreen({ navigation }) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  async function fetchTopics() {
    try {
      const response = await getTopics();
      setData(response["topicList"]);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchTopics();
  }, []);

  function topicPress(id) {
    console.log("Topic Pressed", id);
    navigation.navigate("TopicNews", {
      id: id,
    });
  }
  return (
    <SafeAreaView style={styles.background}>
      <ScreenLoading visible={isLoading} />
      <View style={styles.title}>
        <Text style={styles.titleText}>Explore Sectors</Text>
      </View>
      <View style={styles.flatlistContainer}>
        <FlatList
          contentContainerStyle={styles.flatlist}
          numColumns={Math.floor(windowWidth / 110)}
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={(itemData) => <NewTopicItem topic={itemData.item.topic} id={itemData.item.id} iconLink={itemData.item.iconLink} onPress={topicPress.bind(this, itemData.item.id)} />}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </SafeAreaView>
  );
}

export default NewTopicsScreen;

const styles = StyleSheet.create({
  background: {
    backgroundColor: "white",
    flex: 1,
  },
  title: {
    marginLeft: 15,
    marginTop: 10,
    borderBottomWidth: 0.5,
    marginRight: 15,
  },
  titleText: {
    fontFamily: "OpenSans-SemiBold",
    fontSize: 17,
    marginBottom: 5,
  },
  flatlistContainer: {
    flex: 1,
  },
  flatlist: {
    alignItems: "center",
  },
});
