import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useFonts } from "expo-font";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

export default function Welcome({ navigation }) {
  const [fontsLoaded] = useFonts({
    Montserrat_Bold: require("../fonts/Montserrat-Bold.ttf"),
    Switzer_Regular: require("../fonts/Switzer-Regular.otf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          alignItems: "center",
          // justifyContent: "center",
          height: "50%",
        }}
      >
        <Image
          source={require("../images/welcome illustration.png")}
          style={{ width: "100%", height: "100%" }}
        ></Image>
      </View>
      <View style={styles.welcomeFooter}>
        <Image
          source={require("../images/binly logo.png")}
          style={{ width: 120, height: 60, alignSelf: "center" }}
        ></Image>
        <Text style={styles.heading}>Welcome onboard !</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.commBtn}
            onPress={() => navigation.navigate("CommunitySignup")}
          >
            <Text style={styles.commBtnText}>Join in as community</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <LinearGradient
              style={styles.button}
              colors={["#58497B", "#241742"]}
            >
              <Text style={styles.buttonText}>Get Started</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View style={{ alignSelf: "center" }}>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ color: "#999", fontFamily: "Switzer_Regular" }}>
              By continuing, you agree to the Binly's{" "}
            </Text>
            <Text
              style={{
                textDecorationLine: "underline",
                color: "purple",
                fontFamily: "Switzer_Regular",
              }}
            >
              Terms of Use
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignSelf: "center" }}>
            <Text style={{ color: "#999", fontFamily: "Switzer_Regular" }}>
              Read our{" "}
            </Text>
            <Text
              style={{
                textDecorationLine: "underline",
                color: "purple",
                fontFamily: "Switzer_Regular",
              }}
            >
              Privacy Policy
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7FE",
  },
  welcomeFooter: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 300,
    gap: 10,
  },
  heading: {
    fontFamily: "Montserrat_Bold",
    fontSize: 20,
    textAlign: "center",
  },
  heading1: {
    fontFamily: "Switzer_Regular",
    fontSize: 14,
    textAlign: "center",
    color: "#999",
  },
  buttonContainer: {
    width: "100%",
    gap: 10,
  },
  button: {
    width: "92%",
    borderRadius: 6,
    backgroundColor: "#241742",
    padding: 13,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    flexDirection: "row",
  },
  buttonText: {
    color: "#fffafa",
    fontFamily: "Montserrat_Bold",
    fontSize: 16,
    marginRight: 10,
  },
  commBtn: {
    width: "92%",
    borderRadius: 6,
    backgroundColor: "rgba(88,73,123,0.2)",
    padding: 13,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  commBtnText: {
    color: "#58497B",
    fontFamily: "Montserrat_Bold",
    fontSize: 16,
    marginRight: 10,
  },
});
