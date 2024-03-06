import { Text, View, StyleSheet, Modal } from "react-native";
import PrimaryButton from "./PrimaryButton";

function LogoutConfirmationModal({ visible, logoutButtonPress, cancelButtonPress }) {
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
          <Text>Are you sure you want to logout?</Text>
          <View style={styles.buttonContainer}>
            <PrimaryButton children={"Logout"} buttonPress={logoutButtonPress} />
            <PrimaryButton children={"Cancel"} buttonPress={cancelButtonPress} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default LogoutConfirmationModal;

const styles = StyleSheet.create({
  modalOverlayContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalOverlayContent: {
    borderRadius: 10,
    alignItems: "center",
    paddingTop: 10,
    paddingHorizontal: 10,
    width: windowWidth - 20,
    // backgroundColor: Colors.primary800,
    backgroundColor: "white", // 0.5 represents the transparency level
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 30,
  },
});
