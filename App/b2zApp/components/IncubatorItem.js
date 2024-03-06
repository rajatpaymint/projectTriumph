import { Text, View, StyleSheet } from "react-native";
import SourceButton from "./SourceButton";
import LinkedinButton from "./LinkedinButton";

function IncubatorItem({ name, about, city, email, phone, website, linkedIn, navigation }) {
  function websitePressHandler() {
    navigation.navigate("Webpage", { link: website });
  }
  function linkedInPressHandler() {
    navigation.navigate("Webpage", { link: linkedIn });
  }
  return (
    <View style={styles.background}>
      <View style={{ flexDirection: "row" }}>
        <Text style={{ fontWeight: "bold" }}>{name}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold" }}>About: </Text>
          <Text>{about}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold" }}>City: </Text>
          <Text>{city}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold" }}>Email: </Text>
          <Text>{email}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold" }}>Phone: </Text>
          <Text>{phone}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <SourceButton onPress={websitePressHandler} />
          <LinkedinButton onPress={linkedInPressHandler} />
        </View>
      </View>
    </View>
  );
}

export default IncubatorItem;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "white",
    marginVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    paddingVertical: 5,
  },
  buttonContainer: {
    flexDirection: "row",

    justifyContent: "flex-end",
  },
});
