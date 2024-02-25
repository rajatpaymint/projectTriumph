import { Text, View, StyleSheet, Pressable } from "react-native";
import { useContext, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

function EditButton({ onPress }) {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.locationBox}>
        <Ionicons name="pencil-sharp" size={20} color="black" />
      </View>
    </Pressable>
  );
}

export default EditButton;

const styles = StyleSheet.create({
  locationBox: {
    marginRight: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  text: {
    fontFamily: "OpenSans-Regular",
  },
});
