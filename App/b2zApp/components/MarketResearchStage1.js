import { Text, View, StyleSheet, Image, Dimensions, TextInput, TouchableOpacity } from "react-native";
import { Colors } from "../Constants/styles";
import PrimaryButton from "../components/PrimaryButton";
import { useState } from "react";

const windowWidth = Dimensions.get("window").width;

function MarketResearchStage1({ onPress }) {
  const [marketType, setMarketType] = useState(null);
  const [inputText, setInputText] = useState("");

  function inputTextHandler(text) {
    setInputText(text);
    console.log(text);
  }

  function selectMarketType(type) {
    setMarketType(type);
    console.log(type);
  }
  return (
    <View style={styles.bottomContainer}>
      <Text style={[styles.text, { textAlign: "center", fontWeight: "bold", marginBottom: 20 }]}>Step-1</Text>
      <View style={styles.inputContainer}>
        <Text style={[styles.text, { marginLeft: 5, fontWeight: "bold" }]}>Write the industry you want a report on</Text>
        <View style={styles.ideaInputContainer}>
          <TextInput style={styles.ideaInput} autoCapitalize="none" autoCorrect={false} onChangeText={inputTextHandler} placeholder="Example: Edtech, P2P Lending, K-12 Education, B2B Payments, etc" placeholderTextColor="#545454" maxLength={500} multiline={true} />
        </View>
      </View>

      <View style={styles.questionContainer}>
        <Text style={[styles.text, { fontWeight: "bold", marginBottom: 10 }]}>Do you want a global or India market study?</Text>
        <TouchableOpacity style={styles.optionContainer} onPress={() => selectMarketType("India")}>
          <View style={[styles.checkbox, marketType === "India" && styles.checked]}></View>
          <Text style={styles.text}>India</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionContainer} onPress={() => selectMarketType("Global")}>
          <View style={[styles.checkbox, marketType === "Global" && styles.checked]}></View>
          <Text style={styles.text}>Global</Text>
        </TouchableOpacity>
      </View>

      <PrimaryButton children={"Proceed"} buttonPress={onPress.bind(this, inputText, marketType)} />
    </View>
  );
}

export default MarketResearchStage1;

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
  inputContainer: {},
  ideaInputContainer: {
    width: windowWidth - 20,
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
    height: 150,
    alignItems: "flex-start",
    paddingTop: 5,
    paddingLeft: 5,
  },
  ideaInput: {
    fontFamily: "OpenSans-Regular",
    width: "100%",
    color: "black",
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
