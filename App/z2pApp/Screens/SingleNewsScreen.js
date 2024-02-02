import { Text, View, Image, StyleSheet } from "react-native";
import NewsItem from "../components/NewsItem";

function SingleNewsScreen({ navigation, route }) {
  id = route.params.id;
  createdDate = route.params.createdDate;
  imageLink = route.params.imageLink;
  headline = route.params.headline;
  summary = route.params.summary;
  articleLink = route.params.articleLink;

  return (
    <View style={styles.outerContainer}>
      <NewsItem id={id} headline={headline} createdDate={createdDate} news={summary} imageLink={imageLink} navigation={navigation} articleLink={articleLink} />
    </View>
  );
}

export default SingleNewsScreen;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "white",
  },
});
