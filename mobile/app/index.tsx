import { StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";
export default function Index() {
  const { user, token, checkAuth } = useAuthStore();
  console.log(user);
  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={{ color: "red", fontSize: 20 }}>
        Hello, {user?.username}
      </Text>
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
