import { Text, View, Image, StyleSheet, Dimensions, Alert } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import StartupServiceItem from "../components/StartupServiceItem";
import { useState } from "react";

const windowWidth = Dimensions.get("window").width;

const data = [
  {
    id: 3,
    name: "Pitch-Deck Making",
    iconLink: "https://z2papppublicbucket.s3.ap-south-1.amazonaws.com/folder1/pitchMaking.png",
  },
  {
    id: 4,
    name: "Financial Modelling",
    iconLink: "https://z2papppublicbucket.s3.ap-south-1.amazonaws.com/folder1/financialModel.png",
  },
  {
    id: 6,
    name: "Company Registration",
    iconLink: "https://z2papppublicbucket.s3.ap-south-1.amazonaws.com/folder1/companyRegistration.png",
  },
  {
    id: 7,
    name: "Tax Filing and Compliance",
    iconLink: "https://z2papppublicbucket.s3.ap-south-1.amazonaws.com/folder1/taxFiling.png",
  },
  {
    id: 5,
    name: "Investor Termsheet",
    iconLink: "https://z2papppublicbucket.s3.ap-south-1.amazonaws.com/folder1/legal.png",
  },
  {
    id: 1,
    name: "App Development",
    iconLink: "https://z2papppublicbucket.s3.ap-south-1.amazonaws.com/folder1/appDev.png",
  },
  {
    id: 2,
    name: "Website Development",
    iconLink: "https://z2papppublicbucket.s3.ap-south-1.amazonaws.com/folder1/webDev.png",
  },
];

function StartupServices({ navigation }) {
  const [order, setOrder] = useState();

  function servicePressHandler(id) {
    if (id === 3) {
      navigation.navigate("PitchMaking");
    } else if (id === 4) {
      navigation.navigate("FinancialModelling");
    } else if (id === 5) {
      navigation.navigate("InvestorTermsheet");
    } else if (id == 6) {
      navigation.navigate("CompanyRegistration");
    } else {
      Alert.alert("Thanks for showing interest", "We are still setting up this service and will notify you as soon as we go live.", [
        {
          text: "Ok",
          style: "cancel",
        },
      ]);
    }
  }
  return (
    <View style={styles.background}>
      <View style={styles.flatlistContainer}>
        <FlatList data={data} renderItem={(itemData) => <StartupServiceItem name={itemData.item.name} iconLink={itemData.item.iconLink} onPress={servicePressHandler.bind(this, itemData.item.id)} />} keyExtractor={(item) => item.id.toString()} />
      </View>
    </View>
  );
}

export default StartupServices;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "white",
  },
  flatlistContainer: {
    flex: 1,
  },
});
