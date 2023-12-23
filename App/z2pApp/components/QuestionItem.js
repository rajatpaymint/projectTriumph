import { Text, Image, View, StyleSheet } from "react-native";

function QuestionItem({ question, date, answer }) {
  return (
    <View>
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{question}</Text>
        <Text style={styles.dateText}>{date}</Text>
      </View>
      <View style={styles.answerBox}>
        <Text>{answer}</Text>
      </View>
    </View>
  );
}

export default QuestionItem;

const styles = StyleSheet.create({
  questionContainer: {
    marginLeft: 10,
    marginRight: 10,
  },
  questionText: {
    fontSize: 17,
    fontWeight: "bold",
  },
  dateText: {
    fontSize: 10,
    marginTop: 0,
  },
  answerBox: {
    marginTop: 10,
    backgroundColor: "#DAF6E2",
    marginHorizontal: 7,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginBottom: 30,
  },
});
