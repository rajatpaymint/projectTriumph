import { Text, View, StyleSheet, Pressable } from "react-native";
import { useContext, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../Store/z2pContext";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import LogoutConfirmationModal from "./LogoutConfirmationModal";

function LogoutButton() {
  const authCtx = useContext(AuthContext);
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);

  function logoutButtonHandler() {
    console.log("Logout pressed");
    setIsModalVisible(true);
  }

  function logoutButtonPress() {
    authCtx.logout();
  }

  function cancelButtonPress() {
    setIsModalVisible(false);
  }

  return (
    <Pressable onPress={logoutButtonHandler}>
      <LogoutConfirmationModal visible={isModalVisible} logoutButtonPress={logoutButtonPress} cancelButtonPress={cancelButtonPress} />
      <View style={styles.locationBox}>
        <Text style={[styles.text, { marginRight: 5 }]}>Logout</Text>
        <AntDesign name="poweroff" size={24} color="#FD3644" />
      </View>
    </Pressable>
  );
}

export default LogoutButton;

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
