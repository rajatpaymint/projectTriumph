import { View, Text, StyleSheet, Image, Modal, ActivityIndicator } from "react-native";
import { Colors } from "../Constants/styles";
import { useState } from "react";

function ScreenLoading({ visible }) {
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
          <ActivityIndicator size="large" color={Colors.primary500} />
        </View>
      </View>
    </Modal>
  );
}

export default ScreenLoading;

const styles = StyleSheet.create({
  modalOverlayContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0)",
  },
  modalOverlayContent: {
    padding: 20,
    borderRadius: 10,
  },
});
