import { Text, View, StyleSheet, Dimensions, Image, ImageBackground } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PrimaryButton from "./PrimaryButton";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function EventItem({ title, date, time, location, about, imageLink, onPress }) {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.imageView}>
        <ImageBackground source={{ uri: imageLink }} resizeMode="cover" imageStyle={styles.backgroundImage}>
          <Image source={{ uri: imageLink }} style={styles.image} />
        </ImageBackground>
      </View>
      <View style={styles.dataWrapper}>
        <Text style={styles.titleText}>{title}</Text>
        <View style={styles.timeBox}>
          <Ionicons name="calendar" size={20} color="#fd3644" />
          <Text style={styles.dateText}>{date}</Text>
          <Text style={styles.dateText}> || {time}</Text>
        </View>
        <View style={styles.locationBox}>
          <Ionicons name="md-pin" size={20} color="#fd3644" />
          <View style={styles.textWrapper}>
            <Text style={styles.dateText}>{location}</Text>
          </View>
        </View>
        <View style={styles.aboutBox}>
          <Ionicons name="information-circle" size={20} color="#fd3644" />
          <View style={styles.textWrapper}>
            <Text style={styles.dateText}>{about}</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <PrimaryButton children={"Website"} buttonPress={onPress} />
        </View>
      </View>
    </View>
  );
}

export default EventItem;

const styles = StyleSheet.create({
  mainContainer: {
    width: windowWidth - 30,
    marginHorizontal: 15,
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "black",
    shadowOffset: { width: 8, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2, // Only affects Android
  },
  imageView: {
    paddingTop: 0,
  },
  backgroundImage: {
    opacity: 0.3,
  },
  image: {
    height: windowHeight / 4,
    width: windowWidth,
    resizeMode: "center",
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 18,
    paddingLeft: 5,
  },
  timeBox: {
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0.2,
    borderBottomColor: "grey",
    paddingLeft: 5,
  },
  dateText: {
    fontSize: 12,
    color: "black",
    paddingLeft: 5,
  },
  locationBox: {
    flexDirection: "row",
    marginTop: 5,
    borderBottomWidth: 0.2,
    borderBottomColor: "grey",
    paddingLeft: 5,
  },
  aboutBox: {
    flexDirection: "row",
    marginTop: 5,
    paddingLeft: 5,
  },
  textWrapper: {
    width: windowWidth - 60,
  },
  buttonContainer: {
    width: 100,
    alignSelf: "center",
  },
  dataWrapper: {
    backgroundColor: "white",
    paddingBottom: 5,
  },
});
