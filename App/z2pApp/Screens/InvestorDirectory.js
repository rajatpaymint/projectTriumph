import { Text, View, Image, StyleSheet } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import { FlatList } from "react-native-gesture-handler";
import InvestorDirectoryItem from "../components/InvestorDirectoryItem";
import { useContext, useEffect, useState } from "react";
import { getInvestorDirectory } from "../api/appApi";
import ScreenLoading from "../components/ScreenLoading";
import { AuthContext } from "../Store/z2pContext";
import SubscriptionModal from "../components/SubscriptionModal";

function InvestorDirectory({ navigation }) {
  const authCtx = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadSubscriptionModal, setLoadSubscriptionModal] = useState(false);

  async function fetchInvestorDirectory() {
    if (authCtx.subscriptionId !== "0") {
      setIsLoading(true);
      try {
        console.log("I am here");
        const response = await getInvestorDirectory(currentPage, 5);
        setData((prevData) => [...prevData, ...response["investorList"]]);
        setIsLoading(false);
      } catch (error) {
        console.log("error: ", error);
      } finally {
        setIsLoading(false);
      }
    } else if (authCtx.subscriptionId === "0" && currentPage === 1) {
      setIsLoading(true);
      try {
        console.log("I am here");
        const response = await getInvestorDirectory(currentPage, 5);
        setData((prevData) => [...prevData, ...response["investorList"]]);
        setIsLoading(false);
      } catch (error) {
        console.log("error: ", error);
      } finally {
        setIsLoading(false);
      }
    } else if (authCtx.subscriptionId === "0" && currentPage > 1) {
      setLoadSubscriptionModal(true);
    }
  }

  useEffect(() => {
    fetchInvestorDirectory();
  }, [currentPage]);

  function handleLoadMore() {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
  }

  function subscriptionModalCloseHandler() {
    setLoadSubscriptionModal(false);
  }

  return (
    <View style={styles.background}>
      <ScreenLoading visible={isLoading} />
      <SubscriptionModal visible={loadSubscriptionModal} onPress={subscriptionModalCloseHandler} text={"You need a premium membership to view the full list."} />
      <View style={styles.buttonContainer}>
        <PrimaryButton children={"Angel"}></PrimaryButton>
        <PrimaryButton children={"Early"}></PrimaryButton>
        <PrimaryButton children={"Mid/Late"}></PrimaryButton>
      </View>
      <FlatList
        data={data}
        renderItem={(itemData) => <InvestorDirectoryItem name={itemData.item.name} sectors={itemData.item.sectors} stage={itemData.item.stage} email={itemData.item.email} phone={itemData.item.phone} website={itemData.item.website} linkedIn={itemData.item.linkedIn} navigation={navigation} />}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0}
      />
    </View>
  );
}

export default InvestorDirectory;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  buttonContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingHorizontal: 10,
  },
});
