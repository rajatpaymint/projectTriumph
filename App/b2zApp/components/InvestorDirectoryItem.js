import { Text, View, StyleSheet } from "react-native";
import SourceButton from "./SourceButton";
import LinkedinButton from "./LinkedinButton";

function InvestorDirectoryItem({ name, sectors, stage, email, phone, website, linkedIn, navigation }) {
  function websitePressHandler() {
    navigation.navigate("Webpage", { link: website });
  }
  function linkedInButtonHandler() {
    navigation.navigate("Webpage", { link: linkedIn });
  }
  return (
    <View style={styles.background}>
      <View style={{ flexDirection: "row" }}>
        <Text style={{ fontWeight: "bold" }}>{name}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold" }}>Focus Sectors: </Text>
          <Text>{sectors}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold" }}>Stage: </Text>
          <Text>{stage}</Text>
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
          <LinkedinButton onPress={linkedInButtonHandler} />
        </View>
      </View>
    </View>
  );
}

export default InvestorDirectoryItem;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "white",
    marginVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    paddingVertical: 5,
    shadowColor: "black",
    shadowOffset: { width: 8, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2, // Only affects Android
  },
  buttonContainer: {
    flexDirection: "row",

    justifyContent: "flex-end",
  },
});
