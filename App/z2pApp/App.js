import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import SignupScreen from "./Screens/SignupScreen";
import { Colors } from "./Constants/styles";
import AuthContextProvider, { AuthContext } from "./Store/z2pContext";
import { useContext } from "react";
import LoginScreen from "./Screens/LoginScreen";
import TopicsScreen from "./Screens/TopicsScreen";
import CardStack from "./Screens/CardStack";
import InShortsClone from "./Screens/InShortClone";
import NewsMain from "./Screens/NewsMain";
import Headlines from "./Screens/Headlines";
import MyQuestionScreen from "./Screens/MyQuestionScreen";
import PostFeed from "./Screens/PostFeed";
import MyFeed from "./Screens/MyFeed";
import SvgUri from "react-native-svg-uri";
import NewsLetter from "./Screens/NewsLetter";
import Database from "./Screens/Database";
import FindJob from "./Screens/FindJob";
import PostJob from "./Screens/PostJob";
import ResourceCenter from "./Screens/ResourceCenter";
import Profile from "./Screens/Profile";
import StartupEvents from "./Screens/StartupEvents";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNewsIcon = () => <SvgUri width="30" height="30" source={require("./assets/images/newspaper.svg")} />;
const DrawerHeadlinesIcon = () => <SvgUri width="30" height="30" source={require("./assets/images/list-items.svg")} />;
const DrawerAskIcon = () => <SvgUri width="30" height="30" source={require("./assets/images/ask-me.svg")} />;
const DrawerFeedIcon = () => <SvgUri width="30" height="30" source={require("./assets/images/shuttle.svg")} />;
const DrawerNewsletterIcon = () => <SvgUri width="30" height="30" source={require("./assets/images/vip-card.svg")} />;
const DrawerDatabaserIcon = () => <SvgUri width="30" height="30" source={require("./assets/images/folders.svg")} />;
const DrawerTopicIcon = () => <SvgUri width="30" height="30" source={require("./assets/images/category.svg")} />;
const DrawerFindJobIcon = () => <SvgUri width="30" height="30" source={require("./assets/images/job.svg")} />;
const DrawerPostJobIcon = () => <SvgUri width="30" height="30" source={require("./assets/images/postJob.svg")} />;
const DrawerResourceIcon = () => <SvgUri width="30" height="30" source={require("./assets/images/resource.svg")} />;
const DrawerProfileIcon = () => <SvgUri width="30" height="30" source={require("./assets/images/profile.svg")} />;
const DrawerEventsIcon = () => <SvgUri width="30" height="30" source={require("./assets/images/events.svg")} />;

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

function AuthenticatedStack() {
  return (
    <Drawer.Navigator
      initialRouteName="MyFeed"
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
          headerTitle: "Articles",
          backgroundColor: "white",
          drawerIcon: () => <DrawerNewsletterIcon />,
        }}
      />
      <Drawer.Screen
        name="NewsMain"
        component={NewsMain}
        options={{
          title: "News",
          backgroundColor: "white",
          drawerIcon: () => <DrawerNewsIcon />,
        }}
      />
      <Drawer.Screen
        name="Headlines"
        component={Headlines}
        options={{
          title: "Headlines",
          backgroundColor: "white",
          drawerIcon: () => <DrawerHeadlinesIcon />,
        }}
      />
      <Drawer.Screen
        name="Topics"
        component={TopicsScreen}
        options={{
          title: "Topics",
          backgroundColor: "white",
          drawerIcon: () => <DrawerTopicIcon />,
        }}
      />
      <Drawer.Screen
        name="MyQuestions"
        component={MyQuestionScreen}
        options={{
          title: "Ask an Expert",
          backgroundColor: "white",
          drawerIcon: () => <DrawerAskIcon />,
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
        }}
      />
      {/* <Drawer.Screen
        name="FindJob"
        component={FindJob}
        options={{
          title: "Find a Job",
          backgroundColor: "white",
          drawerIcon: () => <DrawerFindJobIcon />,
        }}
      />
      <Drawer.Screen
        name="PostJob"
        component={PostJob}
        options={{
          title: "Post a Job",
          backgroundColor: "white",
          drawerIcon: () => <DrawerPostJobIcon />,
        }}
      /> */}
      <Drawer.Screen
        name="Database"
        component={Database}
        options={{
          title: "Startup Database",
          backgroundColor: "white",
          drawerIcon: () => <DrawerDatabaserIcon />,
        }}
      />
      <Drawer.Screen
        name="ResourceCenter"
        component={ResourceCenter}
        options={{
          title: "Resource Center",
          backgroundColor: "white",
          drawerIcon: () => <DrawerResourceIcon />,
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
      <Drawer.Screen
        name="PostFeed"
        component={PostFeed}
        options={{
          title: "Post",
          backgroundColor: "white",
        }}
      />
    </Drawer.Navigator>
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
