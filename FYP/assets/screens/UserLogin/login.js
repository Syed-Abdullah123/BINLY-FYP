import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";

import { FIREBASE_AUTH, FIREBASE_DB } from "../../../firebaseConfig";
import {
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { UserContext } from "./UserContext";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { setUser } = useContext(UserContext);

  const signInUser = async () => {
    if (email === "" || password === "") {
      alert("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);

      // Sign in the user with Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      );
      const user = userCredential.user;

      // Check if the user has verified their email
      if (!user.emailVerified) {
        alert("Please verify your email before logging in.");
        await sendEmailVerification(user); // Optionally re-send verification email
        setLoading(false);
        return; // Stop further processing if email is not verified
      }

      // Fetch the user's document from Firestore
      const userDocRef = doc(FIREBASE_DB, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      // Check if user document exists in Firestore
      if (!userDoc.exists()) {
        alert("User document doesn't exist. Please sign up first.");
        setLoading(false);
        return; // Stop further processing if Firestore document is missing
      }

      // If the user exists and has verified their email, proceed with login
      setUser({ uid: user.uid, ...userDoc.data() });
      navigation.navigate("Loading");

      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert("Error logging in: " + error.message);
    }
  };

  const [fontsLoaded] = useFonts({
    Montserrat_Regular: require("../../fonts/Montserrat-Regular.ttf"),
    Montserrat_Bold: require("../../fonts/Montserrat-Bold.ttf"),
    Switzer_Regular: require("../../fonts/Switzer-Regular.otf"),
    Switzer_Medium: require("../../fonts/Switzer-Medium.otf"),
    Switzer_Bold: require("../../fonts/Switzer-Bold.otf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.container}> */}
      <LinearGradient style={{ height: 200 }} colors={["#58497B", "#241742"]}>
        <View style={{ alignItems: "center", top: 50 }}>
          <Image
            source={require("../../images/binly-grey 1.png")}
            style={{ width: 170, height: 100 }}
          ></Image>
        </View>
      </LinearGradient>
      <View style={styles.content}>
        <Text style={styles.heading}>Login</Text>
        <Text style={styles.subHeading2}>Please sign in to continue.</Text>
        <View style={styles.inputs}>
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="grey"
              value={email}
              onChangeText={(text) => setEmail(text)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons
              name="lock-closed-outline"
              size={20}
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="grey"
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={signInUser} disabled={loading}>
            <LinearGradient
              style={[
                styles.button,
                loading && { opacity: 0.7 }, // Changes opacity when loading
              ]}
              colors={loading ? ["#ccc", "#ccc"] : ["#58497B", "#241742"]} // Change colors when loading
            >
              {loading ? (
                <ActivityIndicator color="#fffafa" />
              ) : (
                <>
                  <Text style={styles.buttonText}>Login</Text>
                  <Ionicons
                    name="arrow-forward-outline"
                    size={20}
                    color={"#fffafa"}
                    style={{ marginTop: 3 }}
                  />
                </>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View style={styles.subContainer}>
          <Text style={styles.subHeading}>Forgot your password?</Text>
        </View>
        <View style={styles.commCont}>
          <Text style={styles.commContHeading}>Want to join as community?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("CommunitySignup")}
          >
            <Text style={styles.commContHeading1}>Click Here</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // justifyContent: "center",
    // alignItems: "center",
    flex: 1,
    backgroundColor: "#F7F7FE",
  },
  logo: {
    marginTop: 40,
    marginBottom: 20,
    alignItems: "center",
  },
  content: {
    backgroundColor: "#F7F7FE",
    width: "100%",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    bottom: 30,
  },
  inputs: {
    alignItems: "center",
    margin: 10,
    top: 40,
  },
  heading: {
    top: 20,
    left: 20,
    fontSize: 30,
    color: "#58497B",
    fontFamily: "Montserrat_Bold",
  },
  subHeading2: {
    left: 20,
    top: 30,
    color: "#58497B",
    fontFamily: "Switzer_Regular",
    fontSize: 14,
    letterSpacing: 0.3,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: "#bbb",
    padding: 10,
    width: "92%",
  },
  input: {
    flex: 1,
    fontFamily: "Switzer_Regular",
    fontSize: 14,
    color: "#101415",
    letterSpacing: 0.3,
  },
  icon: {
    marginRight: 15,
    color: "grey",
  },
  buttonContainer: {
    width: "100%",
    top: 50,
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
  subContainer: {
    flexDirection: "row",
    alignSelf: "center",
    top: "20%",
  },
  subHeading: {
    fontFamily: "Switzer_Regular",
    color: "#58497B",
    fontSize: 14,
  },
  commCont: {
    flexDirection: "row",
    alignSelf: "center",
    top: "25%",
  },
  commContHeading: {
    fontFamily: "Switzer_Regular",
    color: "#58497B",
    fontSize: 14,
  },
  commContHeading1: {
    fontFamily: "Switzer_Bold",
    color: "#fff",
    fontSize: 14,
    marginLeft: 5,
    backgroundColor: "#58497B",
    padding: 5,
    borderRadius: 5,
    bottom: 5,
  },
});
