import { Text, View, Image, StyleSheet } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import { FlatList } from "react-native-gesture-handler";
import InvestorDirectoryItem from "../components/InvestorDirectoryItem";

incubatorData = [
  {
    id: 1,
    name: "THub-Hyderabad",
    about: "Fintech, Technology, SpaceTech",
    email: "contact@tigerglobal.com",
    city: "Hyderabad",
    phone: "9952067687",
    website: "https://www.tigerglobal.com/",
    linkedin: "https://www.rajatyadav.info",
  },
  {
    id: 2,
    name: "THub-Hyderabad2",
    about: "Fintech, Technology, SpaceTech",
    email: "contact@tigerglobal.com",
    city: "Hyderabad",
    phone: "9952067687",
    website: "https://www.tigerglobal.com/",
    linkedin: "https://www.rajatyadav.info",
  },
  {
    id: 3,
    name: "THub-Hyderabad3",
    about: "Fintech, Technology, SpaceTech",
    email: "contact@tigerglobal.com",
    city: "Hyderabad",
    phone: "9952067687",
    website: "https://www.tigerglobal.com/",
    linkedin: "https://www.rajatyadav.info",
  },
  {
    id: 4,
    name: "THub-Hyderabad4",
    about: "Fintech, Technology, SpaceTech",
    email: "contact@tigerglobal.com",
    city: "Hyderabad",
    phone: "9952067687",
    website: "https://www.tigerglobal.com/",
    linkedin: "https://www.rajatyadav.info",
  },
  {
    id: 5,
    name: "THub-Hyderabad5",
    about: "Fintech, Technology, SpaceTech",
    email: "contact@tigerglobal.com",
    city: "Hyderabad",
    phone: "9952067687",
    website: "https://www.tigerglobal.com/",
    linkedin: "https://www.rajatyadav.info",
  },
  {
    id: 6,
    name: "THub-Hyderabad6",
    about: "Fintech, Technology, SpaceTech",
    email: "contact@tigerglobal.com",
    city: "Hyderabad",
    phone: "9952067687",
    website: "https://www.tigerglobal.com/",
    linkedin: "https://www.rajatyadav.info",
  },
];

function IncubatorScreen() {
  return (
    <View style={styles.background}>
      <FlatList data={incubatorData} renderItem={(itemData) => <InvestorDirectoryItem name={itemData.item.name} about={itemData.item.about} city={itemData.item.city} email={itemData.item.email} phone={itemData.item.phone} />} keyExtractor={(item) => item.id.toString()} />
    </View>
  );
}

export default IncubatorScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  buttonContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingHorizontal: 10,
  },
});
