import { View, Text, StyleSheet, Image, TextInput, Dimensions } from "react-native";
import { useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import PrimaryButton from "../components/PrimaryButton";
import ResourceItem from "../components/ResourceItem";

const resourceData = [
  {
    id: 1,
    headline: "Investor Termsheet for Angel Investment Stage",
    about: "The legal termsheet to be executed between the founders and the investors",
  },
  {
    id: 2,
    headline: "Investor Termsheet for Angel Investment Stage",
    about: "The legal termsheet to be executed between the founders and the investors",
  },
  {
    id: 3,
    headline: "Investor Termsheet for Angel Investment Stage",
    about: "The legal termsheet to be executed between the founders and the investors",
  },
  {
    id: 4,
    headline: "Investor Termsheet for Angel Investment Stage",
    about: "The legal termsheet to be executed between the founders and the investors",
  },
  {
    id: 5,
    headline: "Investor Termsheet for Angel Investment Stage",
    about: "The legal termsheet to be executed between the founders and the investors",
  },
  {
    id: 6,
    headline: "Investor Termsheet for Angel Investment Stage",
    about: "The legal termsheet to be executed between the founders and the investors",
  },
  {
    id: 7,
    headline: "Investor Termsheet for Angel Investment Stage",
    about: "The legal termsheet to be executed between the founders and the investors",
  },
  {
    id: 8,
    headline: "Investor Termsheet for Angel Investment Stage",
    about: "The legal termsheet to be executed between the founders and the investors",
  },
  {
    id: 9,
    headline: "Investor Termsheet for Angel Investment Stage",
    about: "The legal termsheet to be executed between the founders and the investors",
  },
  {
    id: 10,
    headline: "Investor Termsheet for Angel Investment Stage",
    about: "The legal termsheet to be executed between the founders and the investors",
  },
  {
    id: 11,
    headline: "Investor Termsheet for Angel Investment Stage",
    about: "The legal termsheet to be executed between the founders and the investors",
  },
  {
    id: 12,
    headline: "Investor Termsheet for Angel Investment Stage",
    about: "The legal termsheet to be executed between the founders and the investors",
  },
  {
    id: 13,
    headline: "Investor Termsheet for Angel Investment Stage",
    about: "The legal termsheet to be executed between the founders and the investors",
  },
  {
    id: 14,
    headline: "Investor Termsheet for Angel Investment Stage",
    about: "The legal termsheet to be executed between the founders and the investors",
  },
  {
    id: 15,
    headline: "Investor Termsheet for Angel Investment Stage",
    about: "The legal termsheet to be executed between the founders and the investors",
  },
];

windowWidth = Dimensions.get("window").width;

function ResourceCenter() {
  const [searchItem, setSearchItem] = useState("");

  function searchInputHandler(text) {
    setSearchItem(text);
  }
  function searchButtonHandler() {
    console.log("Search Button Press: ", searchItem);
  }

  return (
    <View>
      <View style={styles.searchBoxOuterContainer}>
        <View style={styles.searchBox}>
          <TextInput style={styles.searchText} onChangeText={searchInputHandler} autoCapitalize="none" autoCorrect={false} placeholder="Search startups" placeholderTextColor="#545454" maxLength={100} multiline={false} />
          <View style={styles.buttonContainer}>
            <PrimaryButton children={"Search"} buttonPress={searchButtonHandler} />
          </View>
        </View>
      </View>
      <View style={styles.flatlistContainer}>
        <FlatList data={resourceData} renderItem={({ item }) => <ResourceItem headline={item.headline} about={item.about} />} keyExtractor={(item) => item.id.toString()} />
      </View>
    </View>
  );
}

export default ResourceCenter;

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
    // flex: 1,
  },
});
