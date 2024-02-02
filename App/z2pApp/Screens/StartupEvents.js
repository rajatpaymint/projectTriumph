import { View, Text, StyleSheet, Image, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import EventItem from "../components/EventItem";
import { FlatList } from "react-native-gesture-handler";
import { AuthContext } from "../Store/z2pContext";
import { useScrollToTop } from "@react-navigation/native";
import { getEvents } from "../api/appApi";
import { useEffect, useState, useContext } from "react";
import ScreenLoading from "../components/ScreenLoading";

function StartupEvents({ navigation, route }) {
  const authCtx = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState();
  const [message, setMessage] = useState("");

  async function fetchEventsList() {
    setLoading(true);
    const response = await getEvents(authCtx.city);
    setData(response["eventList"]);
    setLoading(false);
    setMessage(response["apiMessage"]);
    if (response["apiMessage"] && response["apiMessage"] != "found") {
      Alert.alert("", response["apiMessage"], [
        {
          text: "Ok",
          style: "cancel",
        },
      ]);
    }
  }

  useEffect(() => {
    fetchEventsList();
  }, [authCtx.city]);

  function eventWebsiteHandler(websiteLink) {
    console.log("Event Press: ", websiteLink);
    navigation.navigate("Webpage", { link: websiteLink });
  }
  return (
    <View style={styles.background}>
      <ScreenLoading visible={loading} />
      <View style={styles.eventBox}>
        <FlatList
          data={data}
          renderItem={(itemData) => (
            <EventItem title={itemData.item.eventName} date={itemData.item.eventDate} time={itemData.item.eventTime} location={itemData.item.city} about={itemData.item.info} imageLink={itemData.item.imageLink} onPress={eventWebsiteHandler.bind(this, itemData.item.websiteLink)} />
          )}
          keyExtractor={(item) => item.eventId.toString()}
        />
      </View>
    </View>
  );
}

export default StartupEvents;

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  eventBox: {
    flex: 1,
  },
});
