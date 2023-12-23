import { Text, View, Image, StyleSheet, ScrollView, Dimensions, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../Constants/styles";
import PrimaryButton from "./PrimaryButton";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function LearnModal({ visible, text, closeOnPress }) {
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
          <ScrollView>
            <Text style={styles.modalText}>{text}</Text>
          </ScrollView>
        </View>

        <View style={styles.modalButtonOverlay}>
          <View>
            {/* <Ionicons name="close-circle" size={52} color={Colors.primary500} onPress={closeOnPress} /> */}
            <PrimaryButton children="Close" buttonPress={closeOnPress} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default LearnModal;

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
    maxHeight: windowHeight - 200,
    // backgroundColor: Colors.primary800,
    backgroundColor: "white", // 0.5 represents the transparency level
  },
  modalText: {
    color: "#545454",
    lineHeight: 21,
    fontSize: 16,
  },
  modalButtonOverlay: {
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    alignItems: "center",
    paddingTop: 0,
    paddingHorizontal: 10,
    width: windowWidth - 20,
    // backgroundColor: Colors.primary800,
    backgroundColor: "white",
  },
});
