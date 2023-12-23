import { View, Text, StyleSheet, Image, Dimensions, TextInput } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import PrimaryButton from "../components/PrimaryButton";
import QuestionItem from "../components/QuestionItem";

const questionData = [
  {
    id: 1,
    question: "What is the meaning of pre and post money valuation?",
    date: "23rd Sept 2023",
    answer: "eaning of pre and post fundingeaning of pre and post fundingeaning of pre and post fundingeaning of pre and post fundingeaning of pre and post fundingeaning of pre and post funding",
  },
  {
    id: 2,
    question: "What is the meaning of pre and post money valuation?",
    date: "23rd Sept 2023",
    answer: "eaning of pre and post fundingeaning of pre and post fundingeaning of pre and post fundingeaning of pre and post fundingeaning of pre and post fundingeaning of pre and post funding",
  },
  {
    id: 3,
    question: "What is the meaning of pre and post money valuation?",
    date: "23rd Sept 2023",
    answer: "eaning of pre and post fundingeaning of pre and post fundingeaning of pre and post fundingeaning of pre and post fundingeaning of pre and post fundingeaning of pre and post funding",
  },
  {
    id: 4,
    question: "What is the meaning of pre and post money valuation?",
    date: "23rd Sept 2023",
    answer: "eaning of pre and post fundingeaning of pre and post fundingeaning of pre and post fundingeaning of pre and post fundingeaning of pre and post fundingeaning of pre and post funding",
  },
  {
    id: 5,
    question: "What is the meaning of pre and post money valuation?",
    date: "23rd Sept 2023",
    answer: "eaning of pre and post fundingeaning of pre and post fundingeaning of pre and post fundingeaning of pre and post fundingeaning of pre and post fundingeaning of pre and post funding",
  },
  {
    id: 6,
    question: "What is the meaning of pre and post money valuation?",
    date: "23rd Sept 2023",
    answer: "eaning of pre and post fundingeaning of pre and post fundingeaning of pre and post fundingeaning of pre and post fundingeaning of pre and post fundingeaning of pre and post funding",
  },
  {
    id: 7,
    question: "What is the meaning of pre and post money valuation?",
    date: "23rd Sept 2023",
    answer: "eaning of pre and post fundingeaning of pre and post fundingeaning of pre and post fundingeaning of pre and post fundingeaning of pre and post fundingeaning of pre and post funding",
  },
];

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function MyQuestionScreen() {
  function askQuestionInputHandler() {
    console.log("Ask question pressed");
  }
  return (
    <View style={styles.screen}>
      <View style={styles.questionBoxOuterContainer}>
        <View style={styles.questionBox}>
          <TextInput style={styles.modalText} autoCapitalize="none" autoCorrect={false} onChangeText={askQuestionInputHandler} placeholder="Ask a question. Our experts will reply soon." placeholderTextColor="#545454" maxLength={500} multiline={true} />
          <View style={styles.buttonContainer}>
            <PrimaryButton children={"Ask"} buttonPress={askQuestionInputHandler} />
          </View>
        </View>
      </View>
      <View style={styles.recentQuestionsOuterContainer}>
        <Text style={{ paddingLeft: 10, fontSize: 18, borderBottomWidth: 1, borderBottomColor: "#D9D9D9" }}>Recent Question</Text>
      </View>
      <View>
        <FlatList data={questionData} renderItem={(itemData) => <QuestionItem question={itemData.item.question} date={itemData.item.date} answer={itemData.item.answer} />} keyExtractor={(item) => item.id.toString()} />
      </View>
    </View>
  );
}

export default MyQuestionScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    flex: 1,
  },

  questionBoxOuterContainer: {
    alignItems: "center",
    backgroundColor: "white",
    marginBottom: 20,
  },
  questionBox: {
    backgroundColor: "#D9D9D9",
    width: windowWidth - 10,
    height: 100,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    paddingLeft: 10,
    paddingVertical: 5,
  },
  modalText: {
    color: "#545454",
    fontSize: 12,
    maxWidth: windowWidth - 100,
  },
  recentQuestionsOuterContainer: {
    backgroundColor: "white",
    marginBottom: 10,
  },
});
