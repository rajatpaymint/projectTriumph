import { Text, View, StyleSheet, FlatList, ScrollView, Modal, ActivityIndicator } from "react-native";
import { useEffect, useState, useContext } from "react";
import { Colors } from "../Constants/styles";
import TopicItem from "../components/TopicItem";
import { addTopic, getAllTopics, getMyTopics, removeTopic } from "../api/appApi";
import { AuthContext } from "../Store/z2pContext";
import listFilter from "../utils/listFilter";
import LoadingOverlay from "../components/LoadingOverlay";

function TopicsScreen() {
  const [allTopicList, setAllTopicList] = useState([]);
  const [myTopicList, setMyTopicList] = useState([]);
  const [updatedAllTopicList, setUpdatedAllTopicList] = useState([]);
  const [topicsLoaded, setTopicsLoaded] = useState(false);
  const [isTopicChange, setIsTopicChange] = useState("1");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchAllTopics() {
      const myTopicData = await getMyTopics(authCtx.email);
      setMyTopicList(myTopicData);
      const allTopicData = await getAllTopics();
      setAllTopicList(allTopicData);
      const updatedAllTopicList = await listFilter(myTopicData, allTopicData);
      setUpdatedAllTopicList(updatedAllTopicList);
      setTopicsLoaded(true);
      console.log(myTopicList);
    }
    fetchAllTopics();
  }, [authCtx.email]);

  async function removeTopicHandler(id) {
    setIsModalVisible(true);
    const removeTopicResponse = await removeTopic(authCtx.email, id);

    const updatedMyTopicData = myTopicList.filter((item) => item.id !== id);
    setMyTopicList(updatedMyTopicData);

    const updatedAllTopicData = await listFilter(updatedMyTopicData, allTopicList);
    setUpdatedAllTopicList(updatedAllTopicData);
    setIsModalVisible(false);
  }

  async function addTopicHandler(id, topic, iconLink) {
    setIsModalVisible(true);
    console.log("Add button press: ", id);

    const addTopicResponse = await addTopic(authCtx.email, id, authCtx.userId, topic, iconLink);

    const itemToAdd = allTopicList.find((item) => item.id === id);
    console.log("ItemtoAdd: ", itemToAdd);
    if (!myTopicList.includes(itemToAdd)) {
      const updatedMyTopicData = [...myTopicList, itemToAdd];
      setMyTopicList(updatedMyTopicData);
      const updatedAllTopicData = await listFilter(updatedMyTopicData, allTopicList);
      setUpdatedAllTopicList(updatedAllTopicData);
    } else {
      const updatedAllTopicData = updatedAllTopicList.filter((item) => item.id !== id);
      setUpdatedAllTopicList(updatedAllTopicData);
    }
    setIsModalVisible(false);
    console.log(myTopicList);
  }

  function RenderTopicItem({ topic, icon, color, topicId, iconLink }) {
    return (
      <TopicItem icon={icon} color={color} iconLink={iconLink} onPress={icon == "remove-circle" ? removeTopicHandler.bind(this, topicId) : addTopicHandler.bind(this, topicId, topic, iconLink)}>
        {topic}
      </TopicItem>
    );
  }

  function RenderRow({ data, icon, color }) {
    return (
      <>
        <ScrollView horizontal showsHorizontalScrollIndicator={true} directionalLockEnabled={true} alwaysBounceVertical={false}>
          <View>
            <FlatList
              contentContainerStyle={styles.flatList}
              numColumns={Math.ceil(data.length / 2)}
              showsVerticalScrollIndicator={false}
              data={data}
              renderItem={(itemData) => <RenderTopicItem topic={itemData.item.topic} icon={icon} color={color} topicId={itemData.item.id} iconLink={itemData.item.iconLink} />}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        </ScrollView>
      </>
    );
  }

  return (
    <>
      <View style={styles.screenBackground}>
        <Modal
          transparent
          animationType="fade"
          visible={true && isModalVisible}
          statusBarTranslucent={true}
          onRequestClose={() => {
            // Handle modal close action if needed
          }}
        >
          <View style={styles.modalOverlayContainer}>
            <View style={styles.modalOverlayContent}>
              <ActivityIndicator size="large" color={Colors.primary500} />
            </View>
          </View>
        </Modal>
        <View>
          <View style={styles.sectionTitleLine}>
            <View style={styles.sectionTitleStyle}>
              <Text style={styles.sectionTitle}>Subscribed</Text>
            </View>
          </View>
          <View style={styles.flatListConatiner}>
            {!topicsLoaded && <LoadingOverlay message="" />}
            {topicsLoaded && <RenderRow data={myTopicList} icon="remove-circle" color="#FF3131" />}
          </View>
        </View>
        <View>
          <View style={styles.sectionTitleLine}>
            <View style={styles.sectionTitleStyle}>
              <Text style={styles.sectionTitle}>Explore</Text>
            </View>
          </View>
          <View style={styles.flatListConatiner}>
            {!topicsLoaded && <LoadingOverlay message="" />}
            {topicsLoaded && <RenderRow data={updatedAllTopicList} icon="add-circle" color="#00BF63" />}
          </View>
        </View>
      </View>
    </>
  );
}

export default TopicsScreen;

const styles = StyleSheet.create({
  screenBackground: {
    flex: 1,
    backgroundColor: "white",
  },
  sectionTitle: {
    color: "black",
    fontSize: 18,
  },
  sectionTitleStyle: {
    marginTop: 15,
  },
  sectionTitleLine: {
    marginHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey100,
  },
  flatList: {},
  flatListConatiner: {},
  modalOverlayContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)", // 0.5 represents the transparency level
  },
  modalOverlayContent: {
    padding: 20,
    borderRadius: 10,
  },
});
