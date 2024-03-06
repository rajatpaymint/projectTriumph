import { Text, View, StyleSheet, Image, Dimensions, TextInput, TouchableOpacity } from "react-native";
import { Colors } from "../Constants/styles";
import PrimaryButton from "../components/PrimaryButton";
import { useState } from "react";

const windowWidth = Dimensions.get("window").width;

function MarketResearchStage2() {
  const [marketType, setMarketType] = useState(null);

  function selectMarketType(type) {
    setMarketType(type);
    console.log(type);
  }
  return (
    <View style={styles.bottomContainer}>
      <Text style={[styles.text, { textAlign: "center", fontWeight: "bold", marginBottom: 20 }]}>Step-2</Text>
      <View style={styles.questionContainer}>
        <Text style={[styles.text, { fontWeight: "bold", marginBottom: 10 }]}>Do you want a global or India market study?</Text>
        <TouchableOpacity style={styles.optionContainer} onPress={() => selectMarketType("Market1")}>
          <View style={[styles.checkbox, marketType === "Market1" && styles.checked]}></View>
          <Text style={styles.text}>Market1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionContainer} onPress={() => selectMarketType("Market2")}>
          <View style={[styles.checkbox, marketType === "Market2" && styles.checked]}></View>
          <Text style={styles.text}>Market2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionContainer} onPress={() => selectMarketType("Market3")}>
          <View style={[styles.checkbox, marketType === "Market3" && styles.checked]}></View>
          <Text style={styles.text}>Market3</Text>
        </TouchableOpacity>
      </View>

      <PrimaryButton children={"Proceed"} />
    </View>
  );
}

export default MarketResearchStage2;

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
  questionContainer: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: "flex-start",
    width: "100%",
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkbox: {
    height: 20,
    width: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#000",
    marginRight: 10,
    overflow: "hidden",
  },
  checked: {
    backgroundColor: Colors.primary500,
  },
});
