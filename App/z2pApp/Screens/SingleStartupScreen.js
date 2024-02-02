import { Text, View, StyleSheet, Image, Dimensions, ScrollView } from "react-native";
import StartupDetailRow from "../components/StartupDetailRow";

const windowWidth = Dimensions.get("window").width;

function SingleStartupScreen({ route }) {
  const startupId = route.params.startupId;
  console.log("StartupId: ", startupId);
  return (
    <ScrollView style={styles.background}>
      <View style={styles.topSection}>
        <Image source={require("../assets/images/zomatoLogo.png")} style={styles.image} />
        <View style={styles.nameBox}>
          <Text style={styles.nameText}>Zomato</Text>
          <Text style={styles.companyText}>ABC Limited Pvt Ltd</Text>
        </View>
      </View>
      <View style={styles.bottomSection}>
        <StartupDetailRow head={"Founded Year"} value={"2019"} />
        <StartupDetailRow head={"Foudners"} value={"Deepinder Goyal, Rajat Yadav, Shubham Tiwari"} />
        <StartupDetailRow head={"City"} value={"Mumbai"} />
        <StartupDetailRow head={"Valuation"} value={"$5b as on 31 March 2023"} />
        <StartupDetailRow head={"Last Funding"} value={"$200m on 24 May 2023"} />
        <StartupDetailRow head={"Total Funding"} value={"$2b"} />
        <StartupDetailRow head={"Employee Count"} value={"1899 as on 31 March 2023"} />
        <StartupDetailRow head={"Annual Revenue"} value={"$200m as on 31 March 2023"} />
        <StartupDetailRow head={"Annual Profit"} value={"-$20m as on 31 March 2023"} />
        <View style={styles.aboutSection}>
          <Text style={{ fontWeight: "bold", color: "grey" }}>About</Text>
          <Text>
            Online platform offering a discovery platform for food ordering and delivery from restaurants. It allows users to order food from nearby restaurants. It also enables users to discover restaurants and browse their menus. Its mobile application is available on Android and iOS platforms.
          </Text>
          <Text style={{ fontWeight: "bold", color: "grey", marginTop: 20 }}>Business Keywords</Text>
          <Text>Technology | Food Delivery | FoodTech | Food Aggregator | Restaurant Delivery</Text>
          <Text style={{ fontWeight: "bold", color: "grey", marginTop: 20 }}>Website</Text>
          <Text>https://zomato.in</Text>
        </View>
      </View>
    </ScrollView>
  );
}

export default SingleStartupScreen;

const styles = StyleSheet.create({
  background: {
    backgroundColor: "white",
    flex: 1,
  },
  topSection: {
    flexDirection: "row",
    marginTop: 20,
    marginLeft: 20,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 10,
  },
  nameBox: {
    marginLeft: 10,
  },
  nameText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  companyText: {},
  bottomSection: {
    marginTop: 20,
  },
  aboutSection: {
    marginLeft: 20,
    marginTop: 20,
  },
});
