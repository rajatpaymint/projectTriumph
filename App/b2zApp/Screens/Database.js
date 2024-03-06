import { View, Text, StyleSheet, Dimensions, TextInput } from "react-native";
import { useState, useRef, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";
import PrimaryButton from "../components/PrimaryButton";
import DatabaseItem from "../components/DatabaseItem";
import Sidebar from "../components/LetterSidebar";

const startupData = [
  {
    id: 1,
    name: "A",
    keywords: "Technology, Food Delivery, Food Aggregator",
    about: "India's first food delivery app",
  },
  {
    id: 2,
    name: "Big Basket",
    keywords: "Technology, Food Delivery, Food Aggregator",
    about: "India's first food delivery app",
  },
  {
    id: 3,
    name: "Crofers",
    keywords: "Technology, Food Delivery, Food Aggregator",
    about: "India's first food delivery app",
  },
  {
    id: 4,
    name: "Dla",
    keywords: "Technology, Food Delivery, Food Aggregator",
    about: "India's first food delivery app",
  },
  {
    id: 5,
    name: "E2P",
    keywords: "Technology, Food Delivery, Food Aggregator",
    about: "India's first food delivery app",
  },
  {
    id: 6,
    name: "Fgnikul",
    keywords: "Technology, Food Delivery, Food Aggregator",
    about: "India's first food delivery app",
  },
  {
    id: 7,
    name: "G Basket",
    keywords: "Technology, Food Delivery, Food Aggregator",
    about: "India's first food delivery app",
  },
  {
    id: 8,
    name: "H",
    keywords: "Technology, Food Delivery, Food Aggregator",
    about: "India's first food delivery app",
  },
  {
    id: 9,
    name: "I",
    keywords: "Technology, Food Delivery, Food Aggregator",
    about: "India's first food delivery app",
  },
  {
    id: 10,
    name: "J",
    keywords: "Technology, Food Delivery, Food Aggregator",
    about: "India's first food delivery app",
  },
  {
    id: 11,
    name: "K",
    keywords: "Technology, Food Delivery, Food Aggregator",
    about: "India's first food delivery app",
  },
  {
    id: 12,
    name: "L Basket",
    keywords: "Technology, Food Delivery, Food Aggregator",
    about: "India's first food delivery app",
  },
  {
    id: 13,
    name: "M",
    keywords: "Technology, Food Delivery, Food Aggregator",
    about: "India's first food delivery app",
  },
  {
    id: 14,
    name: "N",
    keywords: "Technology, Food Delivery, Food Aggregator",
    about: "India's first food delivery app",
  },
  {
    id: 15,
    name: "O",
    keywords: "Technology, Food Delivery, Food Aggregator",
    about: "India's first food delivery app",
  },
  {
    id: 16,
    name: "P",
    keywords: "Technology, Food Delivery, Food Aggregator",
    about: "India's first food delivery app",
  },
  {
    id: 17,
    name: "Q Basket",
    keywords: "Technology, Food Delivery, Food Aggregator",
    about: "India's first food delivery app",
  },
  {
    id: 18,
    name: "R",
    keywords: "Technology, Food Delivery, Food Aggregator",
    about: "India's first food delivery app",
  },
  {
    id: 19,
    name: "S",
    keywords: "Technology, Food Delivery, Food Aggregator",
    about: "India's first food delivery app",
  },
  {
    id: 20,
    name: "Z2P",
    keywords: "Technology, Food Delivery, Food Aggregator",
    about: "India's first food delivery app",
  },
];

const windowWidth = Dimensions.get("window").width;

function Database({ navigation }) {
  const [searchItem, setSearchItem] = useState("");
  const [selectedLetter, setSelectedLetter] = useState(null);
  const flatListRef = useRef(null);
  const timeoutRef = useRef(null);
  const uniqueLetters = [...new Set(startupData.map((item) => item.name[0].toUpperCase()))].sort();
  const [showScroller, setShowScroller] = useState(false);

  function scrollHandler() {
    clearTimeout(timeoutRef.current);
    setShowScroller(true);
    const delayedFunction = () => {
      setShowScroller(false);
    };
    timeoutRef.current = setTimeout(delayedFunction, 2500);
  }

  useEffect(() => {
    setShowScroller(true);
    const delayedFunction = () => {
      setShowScroller(false);
    };
    const timeoutId = setTimeout(delayedFunction, 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  function searchInputHandler(text) {
    setSearchItem(text);
  }
  function searchButtonHandler() {
    console.log("Search Button Press: ", searchItem);
  }
  const onLetterPress = (letter) => {
    // Find the index of the first item in the FlatList that starts with the selected letter
    const index = startupData.findIndex((item) => item.name[0].toUpperCase() === letter);

    if (index !== -1 && flatListRef.current) {
      flatListRef.current.scrollToIndex({ index });
      setSelectedLetter(letter);
    }
  };

  const hideScrollerWithAnimation = () => {
    Animated.timing(animatedOpacity, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      setShowScroller(false);
    });
  };

  function startupPressHandler(id) {
    navigation.navigate("SingleStartupScreen", { startupId: id });
  }

  return (
    <View style={styles.background}>
      <View style={styles.searchBoxOuterContainer}>
        <View style={styles.searchBox}>
          <TextInput style={styles.searchText} onChangeText={searchInputHandler} autoCapitalize="none" autoCorrect={false} placeholder="Search startups" placeholderTextColor="#545454" maxLength={100} multiline={false} />
          <View style={styles.buttonContainer}>
            <PrimaryButton children={"Search"} buttonPress={searchButtonHandler} />
          </View>
        </View>
      </View>
      <View style={styles.flatlistContainer}>
        <FlatList ref={flatListRef} onScroll={scrollHandler} data={startupData} renderItem={({ item }) => <DatabaseItem name={item.name} keywords={item.keywords} about={item.about} onPress={startupPressHandler.bind(this, item.id)} />} keyExtractor={(item) => item.id.toString()} />
        {showScroller && <Sidebar letters={uniqueLetters} onLetterPress={onLetterPress} />}
      </View>
    </View>
  );
}

export default Database;

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  searchBoxOuterContainer: {
    alignItems: "center",
    backgroundColor: "white",
    marginBottom: 5,
    paddingBottom: 10,
  },
  searchBox: {
    backgroundColor: "#D9D9D9",
    width: windowWidth - 10,
    height: 45,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    paddingLeft: 5,
    paddingVertical: 0,
  },
  searchText: {
    color: "#545454",
    fontSize: 12,
    maxWidth: windowWidth - 100,
  },
  flatlistContainer: {
    flex: 1,
  },
});
