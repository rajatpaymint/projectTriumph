import { Text, View, StyleSheet, Image, ScrollView, Dimensions, TextInput } from "react-native";
import { Colors } from "../Constants/styles";
import ServiceScheduleForm from "../components/ServiceScheduleForm";
import PrimaryButton from "../components/PrimaryButton";

const windowWidth = Dimensions.get("window").width;
function CompanyRegistration() {
  function scheduleButtonHandler(name, email, phone) {
    console.log(name, email, phone, "Pitch Making");
  }
  return (
    <ScrollView>
      <View style={styles.background}>
        <View style={styles.topCentered}>
          <Text style={[styles.text, { fontWeight: "bold", fontSize: 12, paddingTop: 0 }]}>We make</Text>
          <Text style={[styles.text, { fontWeight: "bold", fontSize: 20, paddingTop: 0, paddingBottom: 20 }]}>
            <Text style={{ color: Colors.primary500 }}>Registering Companies</Text>, easier for you. <Text style={{ color: Colors.primary500 }}></Text>
          </Text>
          {/* <Image source={{ uri: "https://z2papppublicbucket.s3.ap-south-1.amazonaws.com/folder1/pitchMaking.jpeg" }} style={styles.image} /> */}
          {/* <Image source={require("../assets/images/pitchMakingIcon.png")} style={styles.image} /> */}
          <Text style={[styles.text, { fontWeight: "bold", fontSize: 15, paddingTop: 30, color: "black", marginBottom: 20 }]}>Services Offered</Text>
        </View>
        <View style={styles.leftAlligned}>
          <PrimaryButton children={"Sole Proprietorship"} buttonWidth={windowWidth - 50} />
          <PrimaryButton children={"Partnership"} buttonWidth={windowWidth - 50} />
          <PrimaryButton children={"Limited Liability Partnership (LLP)"} buttonWidth={windowWidth - 50} />
          <PrimaryButton children={"One Person Company (OPC)"} buttonWidth={windowWidth - 50} />
          <PrimaryButton children={"Private Limited Company"} buttonWidth={windowWidth - 50} />
        </View>
        <View style={styles.centeredBox}>
          <Text style={[styles.text, { fontWeight: "bold", fontSize: 15, paddingTop: 30, color: "black" }]}>How long will the process take?</Text>
          <Text style={[styles.text, { fontSize: 14, paddingTop: 2 }]}>
            Click on each service to read more details <Text style={[styles.text, { color: Colors.primary500, fontWeight: "bold" }]}></Text>
          </Text>
          <Text style={[styles.text, { fontWeight: "bold", fontSize: 15, paddingTop: 30, color: "grey" }]}>How much will it cost me?</Text>
          <Text style={[styles.text, { fontSize: 15, paddingTop: 2, color: Colors.primary500, fontWeight: "bold" }]}>Starts at just INR 2,999/-</Text>
          <Text style={[styles.text, { fontSize: 14, paddingTop: 2 }]}>Fully assisted process</Text>
        </View>
      </View>
      <View style={styles.formBox}>
        <Text style={[styles.text, { color: "white", fontSize: 18, textAlign: "center" }]}>Schedule a free consultation call</Text>
        <Text style={[styles.text, { color: "white", fontSize: 11, textAlign: "center" }]}>Our expert will call you to address your queries before payment</Text>
        <ServiceScheduleForm onPress={scheduleButtonHandler} />
      </View>
    </ScrollView>
  );
}

export default CompanyRegistration;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "white",
    marginTop: 10,
    marginHorizontal: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    paddingVertical: 10,
    elevation: 3,
  },
  topCentered: {
    alignItems: "center",
  },
  text: {
    fontFamily: "OpenSans-Regular",
  },
  image: {
    width: windowWidth,
    height: 200,
    resizeMode: "contain",
  },
  leftAlligned: {
    alignItems: "center",
  },
  centeredBox: {
    alignItems: "center",
  },
  formBox: {
    backgroundColor: Colors.primary800,
    marginHorizontal: 10,
    borderRadius: 5,
    elevation: 3,
    paddingHorizontal: 10,
    paddingTop: 5,
    paddingBottom: 10,
    marginBottom: 20,
  },
  emailInput: {
    fontFamily: "OpenSans-Regular",
    width: "80%",
    color: "#545454",
  },
  formLine: {
    backgroundColor: "green",
  },
});
