import { View, Text, Image, Animated, Easing } from "react-native";
import React, { useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

export default function Splash({ navigation }) {
  const logoScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Create a looped animation for the logo
    const animateLogo = () => {
      Animated.sequence([
        Animated.timing(logoScale, {
          toValue: 1.2,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(logoScale, {
          toValue: 1,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]).start(() => animateLogo());
    };

    animateLogo(); // Start the animation

    // Navigate to "Welcome" screen after 3000 milliseconds (3 seconds)
    const navigateToWelcome = setTimeout(() => {
      navigation.navigate("Welcome"); // Replace "Signup" with your actual screen name
    }, 6000);

    return () => {
      clearTimeout(navigateToWelcome); // Clear the timeout when the component unmounts
    };
  }, [navigation, logoScale]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#58497B",
      }}
    >
      <LinearGradient
        colors={["#58497B", "#241742"]}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Animated.Image
          source={require("../images/binly-grey 1.png")}
          style={{
            width: 170,
            height: 120,
            transform: [{ scale: logoScale }],
          }}
        />
      </LinearGradient>
    </SafeAreaView>
  );
}
