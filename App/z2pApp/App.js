import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import SignupScreen from "./Screens/SignupScreen";
import { Colors } from "./Constants/styles";
import AuthContextProvider, { AuthContext } from "./Store/z2pContext";
import { useContext, useState, useEffect } from "react";
import LoginScreen from "./Screens/LoginScreen";
import NewsMain from "./Screens/NewsMain";
import Headlines from "./Screens/Headlines";
import MyQuestionScreen from "./Screens/MyQuestionScreen";
import MyFeed from "./Screens/MyFeed";
import NewsLetter from "./Screens/NewsLetter";
import Database from "./Screens/Database";
import ResourceCenter from "./Screens/ResourceCenter";
import Profile from "./Screens/Profile";
import StartupEvents from "./Screens/StartupEvents";
import NewTopicsScreen from "./Screens/NewTopicsScreen";
import NewsletterSingle from "./Screens/NewsletterSingle";
import LocationPin from "./components/LocationPin";
import SingleStartupScreen from "./Screens/SingleStartupScreen";
import Image from "react-native-remote-svg";
import Webpage from "./Screens/Webpage";
import SingleNewsScreen from "./Screens/SingleNewsScreen";
import TopicNews from "./Screens/TopicNews";
import { useFonts } from "expo-font";
import SplashScreen from "./Screens/SplashScreen";
import InvestorDirectory from "./Screens/InvestorDirectory";
import StartupServices from "./Screens/StartupServices";
import IncubatorScreen from "./Screens/IncubatorScreen";
import PitchMaking from "./Screens/PitchMaking";
import FinancialModelling from "./Screens/FinancialModelling";
import InvestorTermsheet from "./Screens/InvestorTermsheet";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNewsIcon = () => <Image style={{ width: 30, height: 30 }} source={require("./assets/images/newspaper.svg")} />;
const DrawerHeadlinesIcon = () => <Image style={{ width: 30, height: 30 }} source={require("./assets/images/list-items.svg")} />;
const DrawerAskIcon = () => <Image style={{ width: 30, height: 30 }} source={require("./assets/images/ask-me.svg")} />;
const DrawerFeedIcon = () => <Image style={{ width: 30, height: 30 }} source={require("./assets/images/shuttle.svg")} />;
const DrawerNewsletterIcon = () => <Image style={{ width: 30, height: 30 }} source={require("./assets/images/vip-card.svg")} />;
const DrawerDatabaserIcon = () => <Image style={{ width: 30, height: 30 }} source={require("./assets/images/folders.svg")} />;
const DrawerTopicIcon = () => <Image style={{ width: 30, height: 30 }} source={require("./assets/images/category.svg")} />;
const DrawerFindJobIcon = () => <Image style={{ width: 30, height: 30 }} source={require("./assets/images/job.svg")} />;
const DrawerPostJobIcon = () => <Image style={{ width: 30, height: 30 }} source={require("./assets/images/postJob.svg")} />;
const DrawerResourceIcon = () => <Image style={{ width: 30, height: 30 }} source={require("./assets/images/resource.svg")} />;
const DrawerProfileIcon = () => <Image style={{ width: 30, height: 30 }} source={require("./assets/images/profile.svg")} />;
const DrawerEventsIcon = () => <Image style={{ width: 30, height: 30 }} source={require("./assets/images/events.svg")} />;
const DrawerInvestorIcon = () => <Image style={{ width: 30, height: 30 }} source={require("./assets/images/investor.svg")} />;
const DrawerServicesIcon = () => <Image style={{ width: 30, height: 30 }} source={require("./assets/images/consultancy.svg")} />;
const DrawerOfficeIcon = () => <Image style={{ width: 30, height: 30 }} source={require("./assets/images/office.svg")} />;

function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedDrawerStack() {
  return (
    <Drawer.Navigator
      initialRouteName="NewsLetter"
      screenOptions={{
        drawerActiveBackgroundColor: Colors.primary500,
        drawerActiveTintColor: "white",
        drawerInactiveTintColor: "black",
        drawerStyle: {
          backgroundColor: "white",
        },
        headerTitleAlign: "center",
        headerStyle: {
          borderBottomColor: Colors.grey100,
          borderBottomWidth: 2,
        },
      }}
    >
      <Drawer.Screen
        name="NewsLetter"
        component={NewsLetter}
        options={{
          title: "Premium Articles",
          headerTitle: "Z2P Premium",
          backgroundColor: "white",
          drawerIcon: () => <DrawerNewsletterIcon />,
          unmountOnBlur: true,
        }}
      />
      <Drawer.Screen
        name="StartupServices"
        component={StartupServices}
        options={{
          title: "Startup Services",
          headerTitle: "Startup Services",
          backgroundColor: "white",
          drawerIcon: () => <DrawerServicesIcon />,
          unmountOnBlur: true,
        }}
      />
      <Drawer.Screen
        name="NewsMain"
        component={NewsMain}
        options={{
          title: "News",
          backgroundColor: "white",
          drawerIcon: () => <DrawerNewsIcon />,
          unmountOnBlur: true,
        }}
      />
      <Drawer.Screen
        name="Headlines"
        component={Headlines}
        options={{
          title: "Headlines",
          backgroundColor: "white",
          drawerIcon: () => <DrawerHeadlinesIcon />,
          unmountOnBlur: true,
        }}
      />
      <Drawer.Screen
        name="Topics"
        component={NewTopicsScreen}
        options={{
          title: "Startup Sectors",
          backgroundColor: "white",
          drawerIcon: () => <DrawerTopicIcon />,
          unmountOnBlur: true,
        }}
      />
      <Drawer.Screen
        name="MyQuestions"
        component={MyQuestionScreen}
        options={{
          title: "Ask an Expert",
          backgroundColor: "white",
          drawerIcon: () => <DrawerAskIcon />,
          unmountOnBlur: true,
        }}
      />
      <Drawer.Screen
        name="StartupEvents"
        component={StartupEvents}
        options={{
          title: "Startup Events",
          headerTitle: "Events",
          backgroundColor: "white",
          drawerIcon: () => <DrawerEventsIcon />,
          headerRight: () => <LocationPin />,
          unmountOnBlur: true,
        }}
      />
      <Drawer.Screen
        name="InvestorDirectory"
        component={InvestorDirectory}
        options={{
          title: "Investor Directory",
          backgroundColor: "white",
          drawerIcon: () => <DrawerInvestorIcon />,
          unmountOnBlur: true,
        }}
      />
      <Drawer.Screen
        name="Incubator"
        component={IncubatorScreen}
        options={{
          title: "Incubator & Accelerators",
          backgroundColor: "white",
          drawerIcon: () => <DrawerOfficeIcon />,
          unmountOnBlur: true,
        }}
      />
      <Drawer.Screen
        name="ResourceCenter"
        component={ResourceCenter}
        options={{
          title: "Resource Center",
          backgroundColor: "white",
          drawerIcon: () => <DrawerResourceIcon />,
          unmountOnBlur: true,
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "Profile",
          backgroundColor: "white",
          drawerIcon: () => <DrawerProfileIcon />,
        }}
      />
    </Drawer.Navigator>
  );
}

function AuthenticatedStack() {
  return (
    <Stack.Navigator initialRouteName="AuthenticatedDrawerStack">
      <Stack.Screen name="AuthenticatedDrawerStack" component={AuthenticatedDrawerStack} options={{ headerShown: false }} />
      <Stack.Screen
        name="NewsletterSingle"
        component={NewsletterSingle}
        options={{
          title: "",
        }}
      />
      <Stack.Screen
        name="Webpage"
        component={Webpage}
        options={{
          title: "",
        }}
      />
      <Stack.Screen
        name="SingleNewsScreen"
        component={SingleNewsScreen}
        options={{
          title: "",
        }}
      />
      <Stack.Screen
        name="TopicNews"
        component={TopicNews}
        options={{
          title: "",
        }}
      />
      <Stack.Screen
        name="PitchMaking"
        component={PitchMaking}
        options={{
          title: "Pitch Making",
        }}
      />
      <Stack.Screen
        name="FinancialModelling"
        component={FinancialModelling}
        options={{
          title: "Financial Modelling",
        }}
      />
      <Stack.Screen
        name="InvestorTermsheet"
        component={InvestorTermsheet}
        options={{
          title: "Investor Termsheet",
        }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    "OpenSans-Light": require("./assets/fonts/OpenSans-Light.ttf"),
    "OpenSans-Regular": require("./assets/fonts/OpenSans-Regular.ttf"),
    "OpenSans-Medium": require("./assets/fonts/OpenSans-Medium.ttf"),
    "OpenSans-SemiBold": require("./assets/fonts/OpenSans-SemiBold.ttf"),
    "OpenSans-Bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
  const [splashLoading, setSplashLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setSplashLoading(false);
    }, 200); // Adjust the time as needed

    return () => clearTimeout(timer);
  }, []);

  if (!fontsLoaded || splashLoading) {
    return <SplashScreen />;
  }
  return (
    <>
      <StatusBar style="dark" />
      <AuthContextProvider>
        <Navigation />
      </AuthContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

// navigation.navigate("MealDetail", { mealId: id });
// const mealId = route.params.mealId;
