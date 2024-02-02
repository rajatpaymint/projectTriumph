import { Text, Image, View, StyleSheet, Dimensions, Pressable } from "react-native";

const windowWidth = Dimensions.get("window").width;

function DatabaseItem({ name, keywords, about, onPress }) {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.mainContainer}>
        <View style={styles.imageBox}>
          <Image source={require("../assets/images/zomatoLogo.png")} style={styles.image} />
        </View>
        <View style={styles.dataWrapper}>
          <View>
            <Text style={styles.titleText}>{name}</Text>
            <Text style={styles.keywordsText}>{keywords}</Text>
          </View>
          <View>
            <Text style={styles.aboutText}>{about}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

export default DatabaseItem;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    elevation: 1,
  },
  imageBox: {
    marginLeft: 5,
    height: 35,
    width: 35,
  },
  image: {
    height: 35,
    width: 35,
    resizeMode: "cover",
    borderRadius: 10,
  },
  dataWrapper: {
    marginLeft: 5,
    paddingLeft: 5,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 2,
    width: windowWidth - 35 - 15,
    justifyContent: "space-between",
    paddingBottom: 3,
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 15,
  },
  keywordsText: {
    fontSize: 12,
    fontStyle: "italic",
  },
  aboutText: {
    fontSize: 12,
    marginTop: 10,
  },
});
