import { Text, View, StyleSheet, Pressable, Image, Dimensions } from "react-native";

windowWidth = Dimensions.get("window").width;

function ResourceItem({ headline, about }) {
  return (
    <Pressable>
      <View style={styles.mainContainer}>
        <View style={styles.imageBox}>
          <Image source={require("../assets/images/termsheet.png")} style={styles.image} />
        </View>
        <View style={styles.dataWrapper}>
          <View>
            <Text style={styles.titleText}>{headline}</Text>
          </View>
          <View>
            <Text style={styles.aboutText}>{about}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

export default ResourceItem;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    elevation: 1,
  },
  imageBox: {
    marginLeft: 5,
    height: 45,
    width: 45,
  },
  image: {
    height: 45,
    width: 45,
    resizeMode: "cover",
    borderRadius: 10,
  },
  dataWrapper: {
    marginLeft: 5,
    paddingLeft: 5,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 2,
    width: windowWidth - 45 - 15,
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
