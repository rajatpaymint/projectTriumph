import { Text, View, StyleSheet, Image, Dimensions, ImageBackground, Linking } from "react-native";
import { WebView } from "react-native-webview";

function Webpage({ route }) {
  link = route.params.link;
  return (
    <View style={styles.outerContainer}>
      <WebView source={{ uri: link }}></WebView>
    </View>
  );
}

export default Webpage;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
});
