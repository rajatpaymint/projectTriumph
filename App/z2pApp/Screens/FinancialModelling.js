import { Text, View, StyleSheet, Image, ScrollView, Dimensions, TextInput } from "react-native";
import { Colors } from "../Constants/styles";
import ServiceScheduleForm from "../components/ServiceScheduleForm";

const windowWidth = Dimensions.get("window").width;
function FinancialModelling() {
  function scheduleButtonHandler(name, email, phone) {
    console.log(name, email, phone, "Financial Modelling");
  }
  return (
    <ScrollView>
      <View style={styles.background}>
        <View style={styles.topCentered}>
          <Text style={[styles.text, { fontWeight: "bold", fontSize: 12, paddingTop: 0 }]}>We create</Text>
          <Text style={[styles.text, { fontWeight: "bold", fontSize: 20, paddingTop: 0, paddingBottom: 20 }]}>
            <Text style={{ color: Colors.primary500 }}>FINANCIAL MODELS</Text>, to give investors a better insight into your business model
          </Text>
          <Image source={require("../assets/images/financialModellingIcon.png")} style={styles.image} />
          <Text style={[styles.text, { fontWeight: "bold", fontSize: 15, paddingTop: 30, color: "black" }]}>Our Process</Text>
        </View>
        <View style={styles.leftAlligned}>
          <Text style={[styles.text, { fontWeight: "bold", fontSize: 15, paddingTop: 20 }]}>Step-1</Text>
          <Text style={[styles.text, { fontSize: 14, paddingTop: 2 }]}>Our team of financial experts will schedule a consultation call to understand your business model.</Text>
          <Text style={[styles.text, { fontWeight: "bold", fontSize: 15, paddingTop: 20 }]}>Step-2</Text>
          <Text style={[styles.text, { fontSize: 14, paddingTop: 2 }]}>We collaborate with our experienced team to craft the initial draft of your model, ensuring it captures the right financial metrics for your business.</Text>
          <Text style={[styles.text, { fontWeight: "bold", fontSize: 15, paddingTop: 20 }]}>Step-3</Text>
          <Text style={[styles.text, { fontSize: 14, paddingTop: 2 }]}>Presentation of the first draft of your model for your review, inviting your feedback to ensure every metric is alligned.</Text>
          <Text style={[styles.text, { fontWeight: "bold", fontSize: 15, paddingTop: 20 }]}>Step-4</Text>
          <Text style={[styles.text, { fontSize: 14, paddingTop: 2 }]}>We meticulously incorporate your feedback and apply the final touches, ensuring the model is polished to perfection.</Text>
          <Text style={[styles.text, { fontWeight: "bold", fontSize: 15, paddingTop: 20 }]}>Step-5</Text>
          <Text style={[styles.text, { fontSize: 14, paddingTop: 2 }]}>Delivery of the finalized model to you in excel format, accompanied by a comprehensive walkthrough to guide you on effectively presenting it to investors.</Text>
        </View>
        <View style={styles.centeredBox}>
          <Text style={[styles.text, { fontWeight: "bold", fontSize: 15, paddingTop: 30, color: "black" }]}>How long will the process take?</Text>
          <Text style={[styles.text, { fontSize: 14, paddingTop: 2 }]}>
            The process typically spans <Text style={[styles.text, { color: Colors.primary500, fontWeight: "bold" }]}>7 to 14 days</Text>, subject to the complexity of your business model.
          </Text>
          <Text style={[styles.text, { fontWeight: "bold", fontSize: 15, paddingTop: 30, color: "grey" }]}>How much will it cost me?</Text>
          <Text style={[styles.text, { fontSize: 15, paddingTop: 2, color: Colors.primary500, fontWeight: "bold" }]}>INR 9,999/-</Text>
          <Text style={[styles.text, { fontSize: 14, paddingTop: 2 }]}>A price that guarantees the value of impressing your investors!</Text>
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

export default FinancialModelling;

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
    alignItems: "baseline",
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
