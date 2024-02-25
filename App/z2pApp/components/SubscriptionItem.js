import { Text, View, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PrimaryButton from "./PrimaryButton";

function SubscriptionItem({ id, amount, name, description, subscriptionId, onPress }) {
  return (
    <View style={styles.topBox}>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontFamily: "OpenSans-Medium", fontWeight: "bold", marginRight: 5 }}>{name}</Text>
          <Image source={require("../assets/images/crown.png")} style={styles.crownImage} />
        </View>
        <Text style={{ fontFamily: "OpenSans-Regular" }}>{description}</Text>
      </View>
      <View style={{ alignItems: "flex-end", justifyContent: "center" }}>
        {id.toString() === subscriptionId && <Ionicons name="checkmark-circle-sharp" size={24} color="green" />}
        {subscriptionId === "0" && <PrimaryButton children={"INR " + amount} buttonPress={onPress} />}
      </View>
    </View>
  );
}

export default SubscriptionItem;

const styles = StyleSheet.create({
  topBox: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 5,
    marginTop: 15,
    marginHorizontal: 5,
    height: 100,
    paddingHorizontal: 5,
    paddingVertical: 5,
    justifyContent: "space-between",
    shadowColor: "black",
    shadowOffset: { width: 8, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2, // Only affects Android
  },
  crownImage: {
    height: 19,
    width: 19,
  },
});
