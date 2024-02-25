import { Text, Image, StyleSheet, Modal, View, TextInput, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../Constants/styles";
import PrimaryButton from "./PrimaryButton";
import { useState } from "react";
import { saveProfilePhone } from "../api/appApi";

function PhoneEditModal({ visible, phoneEditModalCloseButton, userId, updatePhone }) {
  const [phone, setPhone] = useState("");
  function phoneInputHandler(text) {
    setPhone(text);
    console.log(phone);
  }
  async function savePhoneHandler() {
    console.log("Phone: ", phone);
    const response = await saveProfilePhone(userId, phone);
    if (response["apiMessage"] === "success") {
      Alert.alert("", "Mobile Number Updated", [
        {
          text: "Ok",
          style: "cancel",
        },
      ]);
      phoneEditModalCloseButton();
      updatePhone(phone);
    } else {
      Alert.alert("Oops", "Error in updating, please try again later!", [
        {
          text: "Ok",
          style: "cancel",
        },
      ]);
      phoneEditModalCloseButton();
    }
  }
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      statusBarTranslucent={true}
      onRequestClose={() => {
        // Handle modal close action if needed
      }}
    >
      <View style={styles.modalOverlayContainer}>
        <View style={styles.modalOverlayContent}>
          <View style={styles.questionBox}>
            <View style={styles.searchIconImage}>
              <Ionicons name="arrow-forward" size={16} color="#545454" />
            </View>
            <TextInput style={styles.modalText} autoCapitalize="none" autoCorrect={false} onChangeText={phoneInputHandler} placeholder="Enter 10-digit mobile number" placeholderTextColor="#545454" maxLength={10} />
          </View>
        </View>

        <View style={styles.modalButtonOverlay}>
          <View>
            <PrimaryButton children="Save" buttonPress={savePhoneHandler} />
          </View>
          <View>
            <PrimaryButton children="Close" buttonPress={phoneEditModalCloseButton} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default PhoneEditModal;

const styles = StyleSheet.create({
  modalOverlayContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalOverlayContent: {
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    alignItems: "center",
    paddingTop: 10,
    paddingHorizontal: 10,
    width: windowWidth - 20,
    height: 60,
    // backgroundColor: Colors.primary800,
    backgroundColor: "white", // 0.5 represents the transparency level
  },
  modalText: {
    color: "#545454",
    fontSize: 12,
    width: windowWidth - 50,
  },
  modalButtonOverlay: {
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 0,
    paddingHorizontal: 10,
    width: windowWidth - 20,
    // backgroundColor: Colors.primary800,
    backgroundColor: "white",
    flexDirection: "row",
  },
  questionBox: {
    backgroundColor: "#D9D9D9",
    width: windowWidth - 40,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
    textAlign: "center",
  },
  searchIconImage: {
    marginLeft: 5,
    marginTop: 5,
    marginRight: 3,
  },
});
