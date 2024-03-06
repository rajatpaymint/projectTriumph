import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { Colors } from "../Constants/styles";

const windowHeight = Dimensions.get("window").height;

const Sidebar = ({ letters, onLetterPress }) => (
  <View style={[{ position: "absolute", right: 0, top: 0 }, styles.sidebar]}>
    {letters.map((letter) => (
      <TouchableOpacity key={letter} onPress={() => onLetterPress(letter)}>
        <View style={styles.textBox}>
          <Text style={styles.text}>{letter}</Text>
        </View>
      </TouchableOpacity>
    ))}
  </View>
);

export default Sidebar;

const styles = StyleSheet.create({
  sidebar: {
    height: windowHeight - 200,
    justifyContent: "space-evenly",
    alignContent: "center",
    alignItems: "center",
    marginRight: 1,
  },
  textBox: {
    width: 20,
    height: 20,
    backgroundColor: "grey",
    // backgroundColor: "grey",
    alignItems: "center",
    opacity: 0.6,
  },
  text: {
    color: "black",
    fontSize: 13,
  },
});
