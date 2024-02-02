import { Text, StyleSheet, Image, View, TextInput } from "react-native";
import PrimaryButton from "./PrimaryButton";
import { useState } from "react";

function ServiceScheduleForm({ onPress }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  function nameInputHandler(text) {
    setName(text);
  }

  function emailInputHandler(text) {
    setEmail(text);
  }
  function phoneInputHandler(text) {
    setPhone(text);
  }

  function schdeduleButtonHandler() {
    onPress(name, email, phone);
    setName("");
    setEmail("");
    setPhone("");
  }

  return (
    <>
      <View style={styles.emailContainer}>
        <TextInput value={name} style={styles.emailInput} autoCapitalize="none" autoCorrect={false} placeholder="Name" placeholderTextColor="white" maxLength={50} onChangeText={nameInputHandler} />
      </View>
      <View style={styles.emailContainer}>
        <TextInput value={email} style={styles.emailInput} autoCapitalize="none" autoCorrect={false} placeholder="Email (To schedule Google Meets)" placeholderTextColor="white" maxLength={100} onChangeText={emailInputHandler} />
      </View>
      <View style={styles.emailContainer}>
        <TextInput value={phone} style={styles.emailInput} autoCapitalize="none" autoCorrect={false} placeholder="Mobile (10-digit)" placeholderTextColor="white" maxLength={10} onChangeText={phoneInputHandler} />
      </View>
      <PrimaryButton children={"Schedule Now"} buttonPress={schdeduleButtonHandler} />
    </>
  );
}

export default ServiceScheduleForm;

const styles = StyleSheet.create({
  emailContainer: {
    width: "90%",
    marginVertical: 20,
    marginHorizontal: 30,
    justifyContent: "center",
    borderBottomColor: "#545454",
    borderBottomWidth: 1,
  },
  emailInput: {
    fontFamily: "OpenSans-Regular",
    width: "80%",
    color: "white",
  },
});
