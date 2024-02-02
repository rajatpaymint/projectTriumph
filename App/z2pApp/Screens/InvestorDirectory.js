import { Text, View, Image, StyleSheet } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import { FlatList } from "react-native-gesture-handler";
import InvestorDirectoryItem from "../components/InvestorDirectoryItem";

investorData = [
  {
    id: 1,
    name: "Tiger Global",
    sectors: "Fintech, Technology, SpaceTech",
    stage: "Mid, Late",
    email: "contact@tigerglobal.com",
    phone: "9952067687",
    website: "https://www.tigerglobal.com/",
    linkedin: "https://www.rajatyadav.info",
  },
  {
    id: 2,
    name: "Tiger Global2",
    sectors: "Fintech, Technology, SpaceTech",
    stage: "Mid, Late",
    email: "contact@tigerglobal.com",
    phone: "9952067687",
    website: "https://www.tigerglobal.com/",
    linkedin: "https://www.rajatyadav.info",
  },
  {
    id: 3,
    name: "Tiger Global3",
    sectors: "Fintech, Technology, SpaceTech",
    stage: "Mid, Late",
    email: "contact@tigerglobal.com",
    phone: "9952067687",
    website: "https://www.tigerglobal.com/",
    linkedin: "https://www.rajatyadav.info",
  },
  {
    id: 4,
    name: "Tiger Global4",
    sectors: "Fintech, Technology, SpaceTech",
    stage: "Mid, Late",
    email: "contact@tigerglobal.com",
    phone: "9952067687",
    website: "https://www.tigerglobal.com/",
    linkedin: "https://www.rajatyadav.info",
  },
  {
    id: 5,
    name: "Tiger Global",
    sectors: "Fintech, Technology, SpaceTech",
    stage: "Mid, Late",
    email: "contact@tigerglobal.com",
    phone: "9952067687",
    website: "https://www.tigerglobal.com/",
    linkedin: "https://www.rajatyadav.info",
  },
  {
    id: 6,
    name: "Tiger Global",
    sectors: "Fintech, Technology, SpaceTech",
    stage: "Mid, Late",
    email: "contact@tigerglobal.com",
    phone: "9952067687",
    website: "https://www.tigerglobal.com/",
    linkedin: "https://www.rajatyadav.info",
  },
  {
    id: 7,
    name: "Tiger Global",
    sectors: "Fintech, Technology, SpaceTech",
    stage: "Mid, Late",
    email: "contact@tigerglobal.com",
    phone: "9952067687",
    website: "https://www.tigerglobal.com/",
    linkedin: "https://www.rajatyadav.info",
  },
  {
    id: 8,
    name: "Tiger Global8",
    sectors: "Fintech, Technology, SpaceTech",
    stage: "Mid, Late",
    email: "contact@tigerglobal.com",
    phone: "9952067687",
    website: "https://www.tigerglobal.com/",
    linkedin: "https://www.rajatyadav.info",
  },
];

function InvestorDirectory() {
  return (
    <View style={styles.background}>
      <View style={styles.buttonContainer}>
        <PrimaryButton children={"Angel"}></PrimaryButton>
        <PrimaryButton children={"Early"}></PrimaryButton>
        <PrimaryButton children={"Mid/Late"}></PrimaryButton>
      </View>
      <FlatList data={investorData} renderItem={(itemData) => <InvestorDirectoryItem name={itemData.item.name} sectors={itemData.item.sectors} stage={itemData.item.stage} email={itemData.item.email} phone={itemData.item.phone} />} keyExtractor={(item) => item.id.toString()} />
    </View>
  );
}

export default InvestorDirectory;

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
