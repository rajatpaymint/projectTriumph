import { Text, Image, StyleSheet, View } from "react-native";

import { FlatList } from "react-native-gesture-handler";
import NewsItem from "../components/NewsItem";
// import { allNews } from "../components/NewsItem";

const allNews = [
  {
    id: 1,
    news: "The error you're encountering suggests an issue with the way react-native-reanimated is being used in your project. It's possible that there might be version mismatches or incorrect import statements.The error you're encountering suggests an issue with the way react-native-reanimated is The error you're encountering suggests an issue with the way react-native-reanimated is being used in your project. It's possible that there might be version mismatches or incorrect import statements.The error you're encountering suggests an issue with the way react-native-reanimated isThe error you're encountering suggests an issue with the way react-native-reanimated is being used in your project. It's possible that there might be version mismatches or incorrect import statements. ",
    headline: "Byjus to file for bankruptcy soon: Reports",
    learn:
      "This is for learning purposr and you have to take this seriuosly, becuase if ou do, harm may come, which could very well be fatal. So please man, just chill the f out.This is for learning purposr and you have to take this seriuosly, becuase if ou do, harm may come, which could very well be fatal. So please man, just chill the f out.This is for learning purposr and you have to take this seriuosly, This is for learning purposr and you have to take this seriuosly, becuase if ou do, harm may come, which could very well be fatal. So please man, just chill the f out.This is for learning purposr and you have to take this seriuosly, becuase if ou do, harm may come, which could very well be fatal. So please man, just chill the f out.This is for learning purposr and you have to take this seriuosly, becuase if ou do, harm may come, which could very well be fatal. So please man, just chill the f out.This is for learning purposr and you have to take this seriuosly, becuase if ou do, harm may come, which could very well be fatal. So please man, just chill the f out.This is for learning purposr and you have to take this seriuosly, becuase if ou do, harm may come, which could very well be fatal. So please man, just cis seriuosly, becuase if ou do, harm may come, which could very well be fatal. So please man, just chill the f out.This is for learning purposr and you have to take this seriuosly, becuase if ou do, harm may come, which could very well be fatal. So please man, just chill the f out.This is for learning purposr and you have to take this seriuosly, This is for learning purposr and you have to take this seriuosly, becuase if ou do, hais seriuosly, becuase if ou do, harm may come, which could very well be fatal. So please man, just chill the f out.This is for learning purposr and you have to take this seriuosly, becuase if ou do, harm may come, which could very well be fatal. So please man, just chill the f out.This is for learning purposr and you have to take this seriuosly, This is for learning purposr and you have to take this seriuosly, becuase if ou do, hais seriuosly, becuase if ou do, harm may come, which could very well be fatal. So please man, just chill the f out.This is for learning purposr and you have to take this seriuosly, becuase if ou do, harm may come, which could very well be fatal. So please man, just chill the f out.This is for learning purposr and you have to take this seriuosly, This is for learning purposr and you have to take this seriuosly, becuase if ou do, ha",
  },
  {
    id: 2,
    news: "The error you're encountering suggests an issue with the way react-native-reanimated is being used in your project. It's possible that there might be version mismatches or incorrect import statements.The error you're encountering suggests an issue with the way react-native-reanimated is The error you're encountering suggests an issue with the way react-native-reanimated is being used in your project. It's possible that there might be version mismatches or incorrect import statements.The error you're encountering suggests an issue with the way react-native-reanimated isThe error you're encountering suggests an issue with the way react-native-reanimated is being used in your project.  ",
    headline: "Byjus to file for bankruptcy soon: Reports",
    learn: "This is for learning purposr and you have to take this seriuosly, becuase if ou do, harm may come, which could very well be fatal. So please man, just chill the f out.",
  },
  {
    id: 3,
    news: "The error you're encountering suggests an issue with the way react-native-reanimated is being used in your project. It's possible that there might be version mismatches or incorrect import statements.The error you're encountering suggests an issue with the way react-native-reanimated is The error you're encountering suggests an issue with the way react-native-reanimated is being used in your project. It's possible that there might be version mismatches or incorrect import statements.The error you're encounter ",
    headline: "Byjus to file for bankruptcy soon: Reports",
    learn: "This is for learning purposr and you have to take this seriuosly, becuase if ou do, harm may come, which could very well be fatal. So please man, just chill the f out.",
  },
  {
    id: 4,
    news: "The error you're encountering suggests an issue with the way react-native-reanimated is being used in your project. It's possible that there might be version mismatches or incorrect import statements.The error you're encountering suggests an issue with the way react-native-reanimated is The error you're encountering suggests an issue with the way react-native-reanimated is being used in your project. It's possible that there might be version mismatches or incorrect import statements.The error you're encount ",
    headline: "Byjus to file for bankruptcy soon: Reports",
    learn: "This is for learning purposr and you have to take this seriuosly, becuase if ou do, harm may come, which could very well be fatal. So please man, just chill the f out.",
  },
];

const commentsData = [
  {
    id: 1,
    comment: "Byjus to file for bankruptcy soon: Reports. Byjus to file for bankruptcy soon: Reports",
  },
  {
    id: 2,
    comment: "Byjus to file for bankruptcy soon: Reports",
  },
  {
    id: 3,
    comment: "Byjus to file for bankruptcy soon: Reports",
  },
  {
    id: 4,
    comment: "Byjus to file for bankruptcy soon: Reports",
  },
  {
    id: 5,
    comment: "Byjus to file for bankruptcy soon: Reports.......ruptcy soon: Reports",
  },
  {
    id: 6,
    comment: "Z2P to file for bankruptcy soon: Reports.......ruptcy soon: Reports",
  },
];

function NewsMain() {
  return (
    <View style={styles.outerContainer}>
      <FlatList data={allNews} renderItem={(itemData) => <NewsItem headline={itemData.item.headline} news={itemData.item.news} commentsData={commentsData} newsLearn={itemData.item.learn} />} keyExtractor={(item) => item.id.toString()} nestedScrollEnabled={true} style={styles.flatlist} />
    </View>
  );
}

export default NewsMain;

const styles = StyleSheet.create({
  flatlist: {},
  outerContainer: {
    flex: 1,
  },
});
