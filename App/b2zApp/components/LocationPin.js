import { Text, View, StyleSheet, Pressable } from "react-native";
import { useContext, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../Store/z2pContext";
import { useNavigation } from "@react-navigation/native";
import CityModal from "./CityModal";

function LocationPin() {
  const authCtx = useContext(AuthContext);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  // function eventLocationHandler() {
  //   console.log("Rajat");
  //   authCtx.setCityContext(authCtx.city == "Bhopal" ? "Bangalore" : "Bhopal");
  //   navigation.navigate("StartupEvents", {
  //     city: authCtx.city == "Bhopal" ? "Bangalore" : "Bhopal",
  //   });
  // }
  function eventLocationHandler() {
    console.log("Event Location pressed");
    setModalVisible(true);
  }
  function closeButtonPress() {
    setModalVisible(false);
  }
  function cityPressHandler(city) {
    console.log("City Pressed: ", city);
    authCtx.setCityContext(city);
    setModalVisible(false);
  }
  return (
    <Pressable onPress={eventLocationHandler}>
      <CityModal visible={modalVisible} closeButtonPress={closeButtonPress} cityPressHandler={cityPressHandler} />
      <View style={styles.locationBox}>
        <Text>{authCtx.city}</Text>
        <Ionicons name="location-sharp" size={30} color="#FD3644" />
      </View>
    </Pressable>
  );
}

export default LocationPin;

const styles = StyleSheet.create({
  locationBox: {
    marginTop: 10,
    marginRight: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
});
