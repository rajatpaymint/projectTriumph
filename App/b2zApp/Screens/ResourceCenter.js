import { View, Text, StyleSheet, Image, TextInput, Dimensions } from "react-native";
import { useEffect, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import PrimaryButton from "../components/PrimaryButton";
import ResourceItem from "../components/ResourceItem";
import { getFolderList } from "../api/appApi";

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
  const [folderData, setFolderData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchFolderList() {
      try {
        setIsLoading(true);
        const response = await getFolderList();
        setFolderData(response["folderList"]);
        setIsLoading(false);
      } catch (error) {
        console.log("Error: ", error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    }
    fetchFolderList();
  }, []);

  function searchInputHandler(text) {
    setSearchItem(text);
  }
  function searchButtonHandler() {
    console.log("Search Button Press: ", searchItem);
  }

  return (
    <View style={styles.background}>
      <View style={styles.flatlistContainer}>
        <FlatList data={folderData} renderItem={({ item }) => <ResourceItem folder={item.folder} id={item.id} />} keyExtractor={(item) => item.id.toString()} />
      </View>
    </View>
  );
}

export default ResourceCenter;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 20,
  },
  flatlistContainer: {
    // flex: 1,
  },
});
