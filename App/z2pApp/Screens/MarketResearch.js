import { Text, View, StyleSheet, Image, Dimensions } from "react-native";
import { Colors } from "../Constants/styles";
import PrimaryButton from "../components/PrimaryButton";
import { useState, useContext } from "react";
import MarketResearchStage0 from "../components/MarketResearchStage0";
import MarketResearchStage1 from "../components/MarketResearchStage1";
import MarketResearchStage2 from "../components/MarketResearchStage2";
import MarketResearchStage3 from "../components/MarketResearchStage3";
import { generateMarketReport } from "../api/appApi";
import ScreenLoading from "../components/ScreenLoading";
import { AuthContext } from "../Store/z2pContext";
import SubscriptionModal from "../components/SubscriptionModal";
import analytics from "@react-native-firebase/analytics";

analytics().logEvent("MarketResearch", {
  contentType: "text",
  itemId: "Expo rocks!",
  method: "facebook",
});

const windowWidth = Dimensions.get("window").width;

function MarketResearch() {
  const [stage, setStage] = useState(0);
  const [marketReport, setMarketReport] = useState("Loading...");
  const [industry, setIndustry] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const authCtx = useContext(AuthContext);

  function stage0PressHandler() {
    setStage(1);
  }

  function stage1PressHandler(inputText, marketType) {
    setIsLoading(true);
    setIndustry(inputText);
    console.log(inputText, marketType);
    async function fetchMarketReport() {
      const response = await generateMarketReport(inputText, marketType, String(authCtx.subscriptionId), authCtx.userId);
      setMarketReport(response["data"]);
      setIsLoading(false);
      console.log("gere1");
      if (response["apiMessage"] === "success") {
        setStage(3);
      } else if (response["apiMessage"] === "limitFree") {
        console.log("LimitFree");
        setStage(101);
        setShowSubscriptionModal(true);
      } else if (response["apiMessage"] === "limitGeneral") {
        setStage(102);
        setShowSubscriptionModal(true);
      }
    }
    fetchMarketReport();
  }
  function subscriptionCloseHandler() {
    setShowSubscriptionModal(false);
  }
  return (
    <View style={styles.background}>
      <ScreenLoading visible={isLoading} />
      <SubscriptionModal
        visible={showSubscriptionModal}
        onPress={subscriptionCloseHandler}
        text={stage === 101 ? "Only two market reports are allowed in 24 hours. Subscribe to a plan to have unlimited reports." : stage === 102 ? "Only 3 market reports are allowed every hour to maintain server load" : undefined}
      />
      {stage !== 3 && (
        <View style={styles.topConstant}>
          <View style={styles.topTextBox}>
            <Text style={[styles.text, { fontSize: 20, textAlign: "right" }]}>Market Research</Text>
            <Text style={[styles.text, { fontSize: 20, textAlign: "right" }]}>Engine</Text>
            <Text style={[styles.text, { fontSize: 10, color: Colors.primary500, textAlign: "right", marginTop: 10 }]}>Powered by Z2P</Text>
          </View>
          <Image source={require("../assets/images/globeIcon.png")} style={styles.imageStyle} />
        </View>
      )}
      {stage === 0 && <MarketResearchStage0 onPress={stage0PressHandler} />}
      {stage === 1 && <MarketResearchStage1 onPress={stage1PressHandler} />}
      {stage === 2 && <MarketResearchStage2 />}
      {stage === 3 && <MarketResearchStage3 marketReport={marketReport} industry={industry} />}
    </View>
  );
}

export default MarketResearch;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "white",
  },
  topConstant: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    marginHorizontal: 20,
    alignItems: "center",
  },
  topTextBox: {},
  imageStyle: {
    height: windowWidth / 3,
    width: windowWidth / 3,
    marginLeft: 10,
  },
  text: {
    fontFamily: "OpenSans-Regular",
  },
});
