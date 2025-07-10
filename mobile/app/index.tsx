import { StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { Link } from "expo-router";
export default function Index() {
  return (
    <View style={styles.container}>
      <Link href="/(auth)/signup">Sign Up</Link>
      <Link href={"/(auth)"}>Sign In</Link>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
