import React, { useEffect } from "react";
import { View, ActivityIndicator, Image, Text, StyleSheet } from "react-native";
import { useFonts } from "expo-font";

const LoadingScreen = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    Montserrat_Regular: require("../fonts/Montserrat-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: "HomeScreen" }],
      });
    }, 3000); // Adjust the duration as needed (in milliseconds)

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require("../images/binly logo.png")} style={styles.logo} />
      <Text style={styles.loadingText}>Loading ...</Text>
      <ActivityIndicator color="#58497B" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F7F7FE", // Set your desired background color
  },
  logo: {
    width: 150,
    height: 90,
    marginBottom: 20,
  },
  loadingText: {
    // fontFamily: "Montserrat_Regular",
    fontSize: 18,
    marginBottom: 10,
  },
});

export default LoadingScreen;
