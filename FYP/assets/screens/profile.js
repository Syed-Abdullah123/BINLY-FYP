import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  LogBox,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { CommonActions } from "@react-navigation/native";

import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import {
  FIREBASE_DB,
  FIREBASE_AUTH,
  FIREBASE_STORAGE,
} from "../../firebaseConfig";
import { signOut } from "firebase/auth";
import { UserContext } from "./UserLogin/UserContext";

const ProfileScreen = ({ navigation }) => {
  const [completedGoals, setCompletedGoals] = useState([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [profileImage, setProfileImage] = useState(null);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (!user || !user.uid) return;

    const userDocRef = doc(FIREBASE_DB, "users", user.uid);

    const unsubscribe = onSnapshot(
      userDocRef,
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();
          const completedGoalsData = userData.completedGoals || [];

          // Set profile image from Firestore
          setProfileImage(userData.profileImage || null);

          // Calculate the total points from completed goals
          const pointsSum = completedGoalsData.reduce(
            (sum, goal) => sum + Number(goal.coinValue || 0), // Make sure the coinValue is cast to a number
            0
          );

          setCompletedGoals(completedGoalsData);
          setTotalPoints(pointsSum); // Set the total points as the sum
        }
      },
      (error) => {
        console.error("Error fetching user data: ", error);
      }
    );

    return () => unsubscribe();
  }, [user]);

  LogBox.ignoreAllLogs();

  const uploadImage = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const storageRef = ref(FIREBASE_STORAGE, `profileImages/${user.uid}`);

      // Upload image to Firebase Storage
      const uploadTask = uploadBytesResumable(storageRef, blob);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.error("Error uploading image: ", error);
          console.error("Error code:", error.code);
          console.error("Error message:", error.message);
          console.error("Error details:", error.serverResponse);
          // Handle the error appropriately, maybe show a user-friendly message
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log("File available at", downloadURL);

            // Store download URL in Firestore
            await updateDoc(doc(FIREBASE_DB, "users", user.uid), {
              profileImage: downloadURL,
            });

            setProfileImage(downloadURL); // Update the profile image state
          } catch (error) {
            console.error(
              "Error getting download URL or updating Firestore:",
              error
            );
          }
        }
      );
    } catch (error) {
      console.error("Error in uploadImage function: ", error);
      // Handle the error appropriately, maybe show a user-friendly message
    }
  };

  const pickProfileImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImage = result.assets[0].uri;
      await uploadImage(selectedImage);
    }
  };

  const renderGoalItem = ({ item }) => {
    let imageSource;
    if (typeof item.imageSource === "number") {
      // If imageSource is a number, it's a local resource
      imageSource = item.imageSource;
    } else if (
      typeof item.imageSource === "string" &&
      item.imageSource.startsWith("http")
    ) {
      // If imageSource is a string starting with 'http', it's a network resource
      imageSource = { uri: item.imageSource };
    } else {
      // Fallback to a placeholder image
      imageSource = require("../images/cypher.png");
    }

    return (
      <View style={styles.completedGoal}>
        <Image source={imageSource} style={styles.goalImage} />
        <View style={styles.goalInfo}>
          <Text style={styles.goalTitle}>{item.title}</Text>
          <Text style={styles.goalCategory}>{item.category}</Text>
        </View>
        <Image
          source={require("../images/check.png")}
          style={styles.checkIcon}
        />
      </View>
    );
  };

  const handleLogout = async () => {
    try {
      await signOut(FIREBASE_AUTH);
      setUser(null); // Clear user data in UserContext
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Login" }],
        })
      );
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <View style={styles.container}>
        <View style={styles.profileImageContainer}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <View style={styles.placeholderImage} />
          )}
          <Pressable onPress={pickProfileImage}>
            <Text style={styles.uploadPhotoText}>Upload photo</Text>
          </Pressable>
          <View style={styles.userNameContainer}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>
          </View>
        </View>
        <View style={styles.totalPointsContainer}>
          <Text style={styles.totalPoints}>Total Points: </Text>
          <Text style={styles.totalPointsValue}>{totalPoints}</Text>
        </View>

        {/* <Pressable onPress={handleLogout} style={{ marginTop: 20 }}>
          <Text>Logout</Text>
        </Pressable> */}

        <Text style={styles.completedGoalsText}>Completed Goals</Text>
        {/* <View style={{ height: 150 }}> */}
        <FlatList
          data={completedGoals}
          renderItem={renderGoalItem}
          keyExtractor={(item, index) => (item.id || index).toString()}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No completed goals yet.</Text>
          }
          scrollEnabled={false}
        />
        {/* </View> */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 50,
    // flex: 1,
    backgroundColor: "#F7F7FE",
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F7F7FE",
  },
  profileImageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  placeholderImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#ccc",
  },
  uploadPhotoText: {
    fontSize: 16,
    fontFamily: "Switzer_Regular",
    marginTop: 10,
    color: "#58497B",
  },
  userNameContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  userEmail: {
    fontSize: 14,
    color: "gray",
  },
  completedGoal: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    elevation: 2,
  },
  goalImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  goalInfo: {
    flex: 1,
  },
  checkIcon: {
    width: 20,
    height: 20,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  goalCategory: {
    fontSize: 14,
    color: "gray",
  },
  totalPointsContainer: {
    padding: 20,
    // alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    marginBottom: 20,
    // flexDirection: "row",
    // justifyContent: "space-between",
  },
  totalPoints: {
    fontSize: 18,
    fontWeight: "500",
  },
  totalPointsValue: {
    fontSize: 62,
    fontWeight: "500",
  },
  completedGoalsText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  emptyText: {
    // textAlign: "center",
    // marginTop: 20,
    fontSize: 14,
    color: "gray",
  },
});

export default ProfileScreen;
