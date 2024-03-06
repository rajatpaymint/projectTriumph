import { useContext } from "react";
import { Image, Text, StyleSheet, View, Modal, Dimensions, Pressable } from "react-native";
import { AuthContext } from "../Store/z2pContext";
import PrimaryButton from "./PrimaryButton";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function SubscriptionModal({ visible, onPress, text }) {
  const authCtx = useContext(AuthContext);
  const navigation = useNavigation();
  function buttonPressHandler() {
    navigation.navigate("SubscriptionScreen");
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
        <View style={styles.outerContainer}>
          <Image source={require("../assets/images/crown.png")} style={styles.crownImage} />
          <Text style={[styles.text, { textAlign: "center" }]}>
            Hi, {authCtx.name}. {text}
          </Text>
          <Text style={[styles.text, { paddingTop: 20, fontWeight: "bold", color: "grey", paddingBottom: 20, textAlign: "center" }]}>Starts at only INR 99/month</Text>
          <PrimaryButton children={"Subscribe Now"} buttonPress={buttonPressHandler} />
          <Pressable style={styles.closeIcon} onPress={onPress}>
            <Ionicons name="close-circle-sharp" size={40} color="#FF605C" />
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

export default SubscriptionModal;

const styles = StyleSheet.create({
  modalOverlayContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  modalOverlayContent: {
    padding: 20,
    borderRadius: 10,
  },
  outerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    maxHeight: windowHeight - 400,
    width: windowWidth - 50,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  crownImage: {
    height: 100,
    width: 100,
  },
  text: {
    fontFamily: "OpenSans-Regular",
  },
  closeIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});
