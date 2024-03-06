import { Text, StyleSheet, Image, View, ScrollView, Alert } from "react-native";
import { useContext, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";
import SubscriptionItem from "../components/SubscriptionItem";
import { useEffect } from "react";
import { getUserSubscription, updatePayment, getSubscriptionList } from "../api/appApi";
import { AuthContext } from "../Store/z2pContext";
import { createOrder } from "../api/appApi";
import RazorpayCheckout from "react-native-razorpay";
import ScreenLoading from "../components/ScreenLoading";

function SubscriptionScreen() {
  const [subscriptionList, setSubscriptionList] = useState([]);
  const [subscriptionId, setSubscriptionId] = useState();
  const authCtx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState();
  useEffect(() => {
    async function fetchUserSubscription() {
      console.log("authCtx.userid: ", authCtx.userId);
      const response = await getUserSubscription(authCtx.userId);
      authCtx.setSubscriptionIdContext(response.userSubscriptionDetails[0].subscriptionId);
      setSubscriptionId(response.userSubscriptionDetails[0].subscriptionId);
      console.log("Subscription Id: ", response.userSubscriptionDetails[0].subscriptionId);
      console.log("Subscription Id: ", authCtx.subscriptionId);
      setIsLoading(false);
    }
    async function fetchSubscriptionList() {
      setIsLoading(true);
      const response = await getSubscriptionList();
      setSubscriptionList(response["subscriptionList"]);
    }
    fetchSubscriptionList();
    fetchUserSubscription();
  }, [authCtx.subscriptionId]);

  function subscriptionPressHandler(id, amount) {
    function makePayment(order) {
      console.log("Order:", order);
      var options = {
        description: "Credits towards consultation",
        image: "https://i.imgur.com/3g7nmJC.jpg",
        currency: "INR",
        key: "rzp_test_yvntbzHNeYGl6O",
        amount: order.amount,
        name: "Acme Corp",
        order_id: order.id, //Replace this with an order_id created using Orders API.
        prefill: {
          email: authCtx.email,
          name: authCtx.name,
        },
        theme: { color: "#53a20e" },
      };
      RazorpayCheckout.open(options)
        .then((data) => {
          // handle success
          async function pushPayment() {
            const response = await updatePayment(data);
            console.log("User messagE: ", response["userMessage"]);
            setSubscriptionId(response["subscriptionId"]);
            authCtx.setSubscriptionIdContext(response["subscriptionId"]);
            Alert.alert("Success", response["userMessage"], [
              {
                text: "Ok",
                style: "cancel",
              },
            ]);
          }
          pushPayment();
          console.log("Checkout Data: ", data);
        })
        .catch((error) => {
          // handle failure
          alert(`Error: ${error} | ${error}`);
        });
    }
    async function initiatePaymentProcess() {
      try {
        const order = await createOrder(amount, id, authCtx.userId);
        if (order) {
          makePayment(order);
        } else {
          console.error("Order object is undefined.");
        }
      } catch (error) {
        console.error("Error creating order:", error);
      }
    }
    initiatePaymentProcess();
  }
  return (
    <View>
      <ScreenLoading visible={isLoading} />
      <View style={styles.topBox}>
        <View style={styles.freePlan}>
          <Text style={{ fontFamily: "OpenSans-Medium", fontWeight: "bold" }}>Free Plan</Text>
          <Text style={{ fontFamily: "OpenSans-Regular" }}>Limited access</Text>
        </View>
        <View>{subscriptionId === "0" && <Ionicons name="checkmark-circle-sharp" size={24} color="green" />}</View>
      </View>
      <FlatList
        data={subscriptionList}
        renderItem={(itemData) => (
          <SubscriptionItem id={itemData.item.subscriptionId} amount={itemData.item.amount} name={itemData.item.name} description={itemData.item.description} subscriptionId={subscriptionId} onPress={subscriptionPressHandler.bind(this, itemData.item.subscriptionId, itemData.item.amount)} />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

export default SubscriptionScreen;

const styles = StyleSheet.create({
  topBox: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 5,
    marginTop: 5,
    marginHorizontal: 5,
    height: 100,
    paddingHorizontal: 5,
    paddingVertical: 5,
    justifyContent: "space-between",
    elevation: 2,
  },
  topIconStyle: {
    height: 20,
    width: 20,
  },
  freePlan: {},
});
