import { View, Text, StyleSheet, Image, Dimensions, TextInput, Alert } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import PrimaryButton from "../components/PrimaryButton";
import QuestionItem from "../components/QuestionItem";
import { useEffect, useState, useContext } from "react";
import { askQuestion, getQuestions } from "../api/appApi";
import { AuthContext } from "../Store/z2pContext";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function MyQuestionScreen() {
  const authCtx = useContext(AuthContext);
  const [data, setData] = useState();
  const [question, setQuestion] = useState("");
  const [message, setMessage] = useState("");

  async function fetchQuestions() {
    const response = await getQuestions(authCtx.userId);
    setData(response["questionList"]);
  }

  useEffect(() => {
    fetchQuestions();
  }, []);

  function askQuestionInputHandler(text) {
    setQuestion(text);
  }

  function askQuestionButton() {
    async function askAQuestion() {
      const response = await askQuestion(authCtx.userId, question);
      setMessage(response["apiMessage"]);
      Alert.alert("", response["apiMessage"], [
        {
          text: "Ok",
          style: "cancel",
        },
      ]);
      fetchQuestions();
    }
    askAQuestion();
  }

  return (
    <View style={styles.screen}>
      <View style={styles.questionBoxOuterContainer}>
        <View style={styles.questionBox}>
          <TextInput style={styles.modalText} autoCapitalize="none" autoCorrect={false} onChangeText={askQuestionInputHandler} placeholder="Ask a question. Our experts will reply soon." placeholderTextColor="#545454" maxLength={500} multiline={true} />
          <View style={styles.buttonContainer}>
            <PrimaryButton children={"Ask"} buttonPress={askQuestionButton} />
          </View>
        </View>
      </View>
      <View style={styles.recentQuestionsOuterContainer}>
        <Text style={{ paddingLeft: 10, fontSize: 18, borderBottomWidth: 1, borderBottomColor: "#D9D9D9" }}>Recent Question</Text>
      </View>
      <View style={styles.flatlistContainer}>
        <FlatList data={data} renderItem={(itemData) => <QuestionItem question={itemData.item.question} date={itemData.item.createdTime} answer={itemData.item.answer} />} keyExtractor={(item) => item.questionId.toString()} />
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
  flatlistContainer: {
    flex: 1,
  },
});
