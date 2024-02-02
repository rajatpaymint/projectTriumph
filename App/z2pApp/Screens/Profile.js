import { View, Text, StyleSheet } from "react-native";
import { useContext, useEffect, useState } from "react";
import Image from "react-native-remote-svg";
import { AuthContext } from "../Store/z2pContext";
import { getProfileDetails } from "../api/appApi";
import { Colors } from "../Constants/styles";
import ScreenLoading from "../components/ScreenLoading";

function Profile() {
  const authCtx = useContext(AuthContext);
  const [mobile, setMobile] = useState();
  const [signupDate, setSignupDate] = useState();
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    async function profileDetails() {
      const response = await getProfileDetails(authCtx.email);
      setMobile(response["mobile"]);
      setSignupDate(response["signupDate"]);
      setIsDataLoaded(true);
    }
    profileDetails();
  }, []);

  return (
    <View style={styles.background}>
      <ScreenLoading visible={isDataLoaded == false ? true : false} />
      <View style={styles.imageBox}>
        <Image style={{ width: 30, height: 30 }} source={require("../assets/images/profile.svg")} />
        <Text style={{ marginTop: 5, fontWeight: "bold", fontSize: 20 }}>Rajat Yadav</Text>
      </View>
      <View style={styles.profileDetailsBox}>
        <Text style={{ marginTop: 30, fontWeight: "bold" }}>Email</Text>
        <Text>{authCtx.email}</Text>
        <Text style={{ marginTop: 30, fontWeight: "bold" }}>Phone</Text>
        <Text>{mobile}</Text>
        <Text style={{ marginTop: 30, fontWeight: "bold" }}>City</Text>
        <Text>{authCtx.city}</Text>
        <Text style={{ marginTop: 30, fontWeight: "bold" }}>Registration Date</Text>
        <Text>{signupDate}</Text>
      </View>
    </View>
  );
}

export default Profile;

const styles = StyleSheet.create({
  background: {
    backgroundColor: "white",
    flex: 1,
  },
  imageBox: {
    alignItems: "center",
    marginTop: 50,
  },
  profileDetailsBox: {
    marginLeft: 10,
  },
});
