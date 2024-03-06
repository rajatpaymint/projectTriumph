import { Text, View, StyleSheet, Image, Dimensions } from "react-native";
import { Colors } from "../Constants/styles";
import PrimaryButton from "../components/PrimaryButton";

function MarketResearchStage0({ onPress }) {
  return (
    <View style={styles.bottomContainer}>
      <Text style={[styles.text, { textAlign: "center", marginBottom: 80 }]}>"Unlock Instant Market Insights: Our AI crafts personalized market research reports for your startup idea in a flash! 🚀 Discover trends, competitors, and opportunities with just a few clicks."</Text>
      <PrimaryButton children={"Launch"} buttonPress={onPress} />
    </View>
  );
}

export default MarketResearchStage0;

const styles = StyleSheet.create({
  text: {
    fontFamily: "OpenSans-Regular",
  },
  bottomContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginHorizontal: 20,
  },
});
