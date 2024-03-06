import { View, Text, StyleSheet } from "react-native";
import { useContext, useEffect, useState } from "react";
import Image from "react-native-remote-svg";
import { AuthContext } from "../Store/z2pContext";
import { getProfileDetails, updatePayment } from "../api/appApi";
import { Colors } from "../Constants/styles";
import ScreenLoading from "../components/ScreenLoading";
import EditButton from "../components/EditButton";
import PhoneEditModal from "../components/PhoneEditModal";
import CityEditModal from "../components/CityEditModal";

function Profile() {
  const authCtx = useContext(AuthContext);
  const [mobile, setMobile] = useState();
  const [city, setCity] = useState();
  const [signupDate, setSignupDate] = useState();
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [phoneEditModal, setPhoneEditModal] = useState(false);
  const [cityEditModal, setCityEditModal] = useState(false);

  useEffect(() => {
    async function profileDetails() {
      const response = await getProfileDetails(authCtx.email);
      setMobile(response["mobile"]);
      setSignupDate(response["signupDate"]);
      setIsDataLoaded(true);
    }
    profileDetails();
  }, [mobile, city]);

  function phoneEditHandler() {
    setPhoneEditModal(true);
  }

  function phoneEditModalCloseButton() {
    setPhoneEditModal(false);
  }

  function updatePhone(phone) {
    setMobile(phone);
    console.log("Mobile: ", mobile);
  }

  function cityEditHandler() {
    setCityEditModal(true);
  }

  function cityEditModalCloseButton() {
    setCityEditModal(false);
  }

  function updateCity(city) {
    setCity(city);
    authCtx.setCityContext(city);
    console.log("City: ", city);
  }

  return (
    <View style={styles.background}>
      <ScreenLoading visible={isDataLoaded == false ? true : false} />
      <PhoneEditModal visible={phoneEditModal} phoneEditModalCloseButton={phoneEditModalCloseButton} userId={authCtx.userId} updatePhone={updatePhone} />
      <CityEditModal visible={cityEditModal} cityEditModalCloseButton={cityEditModalCloseButton} userId={authCtx.userId} updateCity={updateCity} />
      <View style={styles.imageBox}>
        <Image style={{ width: 30, height: 30 }} source={require("../assets/images/profile.svg")} />
        <Text style={{ marginTop: 5, fontWeight: "bold", fontSize: 20 }}>Rajat Yadav</Text>
      </View>
      <View style={styles.profileDetailsBox}>
        <Text style={{ marginTop: 30, fontWeight: "bold" }}>Email</Text>
        <Text>{authCtx.email}</Text>
        <View style={{ flexDirection: "row", marginTop: 30, alignItems: "center" }}>
          <Text style={{ fontWeight: "bold", marginRight: 10 }}>Phone</Text>
          <EditButton onPress={phoneEditHandler} />
        </View>
        <Text>{mobile}</Text>
        <View style={{ flexDirection: "row", marginTop: 30, alignItems: "center" }}>
          <Text style={{ marginRight: 10, fontWeight: "bold" }}>City</Text>
          <EditButton onPress={cityEditHandler} />
        </View>
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
