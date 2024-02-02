import { Text, View, StyleSheet } from "react-native";
import SourceButton from "./SourceButton";
import LinkedinButton from "./LinkedinButton";

function IncubatorItem() {
  return (
    <View style={styles.background}>
      <View style={{ flexDirection: "row" }}>
        <Text style={{ fontWeight: "bold" }}>1) </Text>
        <Text style={{ fontWeight: "bold" }}>Tiger Global</Text>
      </View>
      <View style={styles.detailsContainer}>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold" }}>Focus Sectors: </Text>
          <Text>Foodtech, Technology, Spacetech</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold" }}>Stage: </Text>
          <Text>Mid, Late</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold" }}>Email: </Text>
          <Text>yadavrajat800@gmail.com</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold" }}>Phone: </Text>
          <Text>0755-2553508</Text>
        </View>
        <View style={styles.buttonContainer}>
          <SourceButton />
          <LinkedinButton />
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
