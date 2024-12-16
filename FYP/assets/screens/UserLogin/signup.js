import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";

import { FIREBASE_AUTH, FIREBASE_DB } from "../../../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { UserContext } from "./UserContext";

export default function Signup({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { setUser } = useContext(UserContext);

  const signUpUser = async (userType) => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (email === "" || password === "" || name === "") {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      );
      const user = userCredential.user;

      await sendEmailVerification(user);

      // Create a user document in Firestore
      const userDocRef = doc(FIREBASE_DB, "users", user.uid);
      await setDoc(userDocRef, {
        name: name,
        email: email,
        userType: "Normal",
        createdAt: new Date(),
      });

      // Fetch the created user's data from Firestore
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        setUser({ uid: user.uid, ...userDoc.data() });
      }

      setLoading(false);
      alert(
        "A verificaiton email has been sent to your email. Please verify to proceed."
      );

      navigation.navigate("Login"); // Navigate to login screen
    } catch (error) {
      console.error("Error signing up:", error.message);
      alert(error.message);
      setLoading(false);
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
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F7F7FE" }}>
      <LinearGradient style={{ height: 200 }} colors={["#58497B", "#241742"]}>
        <View style={styles.subContainer}>
          <Text style={styles.subHeading}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.subHeading1}>SignIn</Text>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: "center", top: 30 }}>
          <Image
            source={require("../../images/binly-grey 1.png")}
            style={{ width: 170, height: 100 }}
          ></Image>
        </View>
      </LinearGradient>
      <View style={styles.container}>
        <Text style={styles.heading}>Create Account</Text>
        <View style={styles.inputs}>
          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={20} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="grey"
              value={name}
              onChangeText={(text) => setName(text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="grey"
              onChangeText={(text) => setEmail(text)}
              value={email}
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
          <View style={styles.inputContainer}>
            <Ionicons
              name="lock-closed-outline"
              size={20}
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor="grey"
              secureTextEntry={true}
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
            />
          </View>
        </View>
        <View style={styles.container2}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={signUpUser} disabled={loading}>
              <LinearGradient
                style={[
                  styles.button,
                  loading && { opacity: 0.7 }, // Slightly darker color when loading
                ]}
                colors={loading ? ["#ccc", "#ccc"] : ["#58497B", "#241742"]}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#fffafa" />
                ) : (
                  <>
                    <Text style={styles.buttonText}>SignUp</Text>
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
          <View style={styles.rule}>
            <Text style={{ fontFamily: "Montserrat_Regular", color: "#bbb" }}>
              _______________
            </Text>
            <Text style={styles.orText}>Or sign up with</Text>
            <Text style={{ fontFamily: "Montserrat_Regular", color: "#bbb" }}>
              ______________
            </Text>
          </View>
          <View style={styles.googleButtonContainer}>
            <TouchableOpacity style={styles.googleButton}>
              <Image
                source={require("../../images/google1.png")}
                style={{ width: 35, height: 35 }}
              ></Image>
              <Text style={styles.googleButtonText}>Signup with Google</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F7F7FE",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    bottom: 30,
  },
  inputs: {
    alignItems: "center",
    margin: 10,
    top: 10,
  },
  heading: {
    top: 20,
    left: 20,
    fontSize: 30,
    marginBottom: 20,
    color: "#58497B",
    fontFamily: "Montserrat_Bold",
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
  container2: {
    height: 300,
    flexDirection: "column",
    justifyContent: "space-around",
  },
  buttonContainer: {
    width: "100%",
    bottom: 20,
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
  rule: {
    flexDirection: "row",
    left: 20,
    bottom: 50,
  },
  orText: {
    paddingTop: 5,
    marginLeft: 10,
    marginRight: 10,
    fontFamily: "Switzer_Medium",
    fontSize: 14,
    color: "#bbb",
  },
  googleButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    bottom: 80,
  },
  googleButton: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "92%",
    padding: 2,
    borderRadius: 6,
    borderColor: "#bbb",
    borderWidth: 1,
  },
  googleButtonText: {
    marginLeft: 15,
    fontFamily: "Montserrat_Bold",
    fontSize: 16,
    color: "#58497B",
  },
  subContainer: {
    flexDirection: "row",
    alignSelf: "flex-end",
    paddingRight: 20,
    top: 30,
  },
  subHeading: {
    fontFamily: "Switzer_Regular",
    color: "#fff",
    fontSize: 14,
  },
  subHeading1: {
    fontFamily: "Switzer_Bold",
    color: "#58497B",
    fontSize: 14,
    marginLeft: 5,
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 5,
    bottom: 5,
  },
});
