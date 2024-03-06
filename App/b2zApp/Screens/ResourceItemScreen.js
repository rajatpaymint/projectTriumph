import { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { getResourceItems } from "../api/appApi";
import ScreenLoading from "../components/ScreenLoading";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import ResourceList from "../components/ResourceList";

function ResourceItemScreen({ route }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function fetchResourceItems() {
      try {
        setIsLoading(true);
        const response = await getResourceItems(route.params.id);
        setData(response["fileList"]);
        setIsLoading(false);
      } catch (error) {
        console.log("Error: ", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchResourceItems();
  }, []);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.outerBox}>
        <ScreenLoading visible={isLoading} />
        <View>
          <FlatList data={data} renderItem={({ item }) => <ResourceList id={item.id} name={item.name} description={item.description} fileLink={item.fileLink} />} keyExtractor={(item) => item.id.toString()} />
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

export default ResourceItemScreen;

const styles = StyleSheet.create({
  outerBox: {
    flex: 1,
    marginTop: 5,
  },
});
