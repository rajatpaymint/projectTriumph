import { View, Text, Image, StyleSheet, Modal, Pressable, Dimensions } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { getCityList } from "../api/appApi";
import { useContext, useEffect, useState } from "react";
import ScreenLoading from "./ScreenLoading";
import PrimaryButton from "./PrimaryButton";
import { AuthContext } from "../Store/z2pContext";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

function CityModal({ visible, closeButtonPress, cityPressHandler }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const authCtx = useContext(AuthContext);
  async function fetchCityList() {
    try {
      setIsLoading(true);
      const response = await getCityList();
      setData(response["cityList"]);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  function CityModalItem({ city }) {
    return (
      <Pressable style={({ pressed }) => (pressed ? [styles.pressed] : [])} onPress={cityPressHandler.bind(this, city)}>
        <View style={styles.cityContainer}>
          <Text style={styles.cityText}>{city}</Text>
        </View>
      </Pressable>
    );
  }
  useEffect(() => {
    fetchCityList();
  }, []);
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      statusBarTranslucent={true}
      onRequestClose={() => {
        // Handle modal close action if needed
      }}
    >
      <ScreenLoading visible={isLoading} />
      <View style={styles.outerContainer}>
        <View style={styles.flatlistContainer}>
          <FlatList data={data} renderItem={(itemData) => <CityModalItem city={itemData.item.city} />} keyExtractor={(item) => item.id.toString()} />
          <View>
            <PrimaryButton children={"Close"} buttonPress={closeButtonPress} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default CityModal;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  cityText: {
    color: "black",
    fontSize: 20,
  },
  flatlistContainer: {
    borderRadius: 15,
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
    width: windowWidth - 20,
    height: windowHeight / 2,
    // backgroundColor: Colors.primary800,
    backgroundColor: "white", // 0.5 represents the transparency level
  },
  cityContainer: {
    flex: 1,
    marginVertical: 5,
    width: windowWidth - 30,
    alignItems: "center",
  },
  pressed: {
    opacity: 0.1,
  },
});
