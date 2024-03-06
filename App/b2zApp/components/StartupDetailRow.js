import { Text, View, StyleSheet, Image, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;

function StartupDetailRow({ head, value }) {
  return (
    <View style={styles.detailRowBox}>
      <View style={styles.detailRowBox1}>
        <Text style={styles.detailHead}>{head}</Text>
      </View>
      <View style={styles.detailRowBox2}>
        <Text style={styles.detailValue}>{value}</Text>
      </View>
    </View>
  );
}

export default StartupDetailRow;

const styles = StyleSheet.create({
  detailRowBox: {
    flexDirection: "row",
    marginLeft: 20,
    marginBottom: 5,
  },
  detailRowBox1: {
    width: windowWidth / 3,
  },
  detailRowBox2: {
    width: (windowWidth * 2) / 3,
  },

  detailHead: {
    fontWeight: "bold",
  },
  detailValue: {},
});
