import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Animated,
  LogBox,
  ActivityIndicator,
  Linking,
  Alert,
} from "react-native";
import { useFonts } from "expo-font";

import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../../../firebaseConfig";
import { UserContext } from "../UserLogin/UserContext";
import { StatusBar } from "expo-status-bar";

export default GoalDetails = ({ route, navigation }) => {
  const [fontsLoaded] = useFonts({
    Montserrat_Regular: require("../../fonts/Montserrat-Regular.ttf"),
    Montserrat_Bold: require("../../fonts/Montserrat-Bold.ttf"),
    Switzer_Regular: require("../../fonts/Switzer-Regular.otf"),
    Switzer_Medium: require("../../fonts/Switzer-Medium.otf"),
    Switzer_Bold: require("../../fonts/Switzer-Bold.otf"),
  });

  // Extracting data from the route
  const { item, removeGoal } = route.params;

  const [modalVisible, setModalVisible] = useState(false);
  const [clickedImage, setClickedImage] = useState(null);
  const [tickAnimation, setTickAnimation] = useState(new Animated.Value(0));
  const [crossAnimation, setCrossAnimation] = useState(new Animated.Value(0));
  const [closeButtonVisible, setCloseButtonVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user } = useContext(UserContext);

  if (!fontsLoaded) {
    return null;
  }

  LogBox.ignoreLogs([
    "Non-serializable values were found in the navigation state",
  ]);

  const getCategoryColor = (category) => {
    switch (category) {
      case "Easy":
        return "lightgreen";
      case "Medium":
        return "orange";
      case "Hard":
        return "#ff4c4c";
      default:
        return "lightgreen";
    }
  };

  const categoryColor = getCategoryColor(item.category);

  const saveCompletedGoal = async (goal) => {
    try {
      const userDocRef = doc(FIREBASE_DB, "users", user.uid); // Assume user.uid is available from UserContext
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const completedGoals = userData.completedGoals || [];
        const totalPoints = userData.totalPoints || 0;

        // Add the new completed goal and update points
        completedGoals.push(goal);
        const newTotalPoints = totalPoints + goal.coinValue;

        await updateDoc(userDocRef, {
          completedGoals,
          totalPoints: newTotalPoints,
        });
      } else {
        // Create a new document if it doesn't exist
        await setDoc(userDocRef, {
          completedGoals: [goal],
          totalPoints: goal.coinValue,
        });
      }
      console.log("Goal saved successfully!");
    } catch (error) {
      console.error("Error saving goal: ", error);
      throw error;
    }
  };

  const handleGoalCompletion = async () => {
    if (loading) return; // Prevent multiple clicks

    setLoading(true);
    try {
      await saveCompletedGoal(item);
      // If we get here, the save was successful
      if (removeGoal) {
        removeGoal(item.id);
      }
      setModalVisible(false);
      navigation.goBack();
    } catch (error) {
      console.error("Error in handleGoalCompletion:", error);
      Alert.alert("Error", "An error occurred while completing the goal.", [
        { text: "OK" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const animateTick = () => {
    Animated.timing(tickAnimation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(async () => {
      await handleGoalCompletion();
    });
  };

  const animateCross = () => {
    Animated.timing(crossAnimation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => setCloseButtonVisible(true));
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={item.imageSource} style={styles.image} />
        </View>
        <View style={styles.row1}>
          <View
            style={[styles.categoryText, { backgroundColor: categoryColor }]}
          >
            <Text style={styles.level}>{item.category}</Text>
          </View>
          <View style={{ flexDirection: "row", marginLeft: 15 }}>
            <Image source={item.coinImageSource} style={styles.coinImage} />
            <Text style={styles.coin}>{item.coinValue}</Text>
          </View>
        </View>
        <View style={styles.content}>
          <View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>

          {/* Help section */}
          <View style={{ paddingTop: 20 }}>
            <View
              style={{ width: "100%", borderWidth: 0.5, borderColor: "#bbb" }}
            ></View>
            <Text style={[styles.title, { paddingTop: 10 }]}>Helps</Text>
            <View style={{ flexDirection: "row", gap: 20 }}>
              <View style={styles.helpImageView}>
                <Image source={item.helpImage} style={styles.helpImage}></Image>
                <Text style={styles.helpImageText}>Reducing Waste</Text>
              </View>
              <View style={styles.helpImageView}>
                <Image
                  source={item.helpImage1}
                  style={styles.helpImage}
                ></Image>
                <Text style={styles.helpImageText}>Saving energy</Text>
              </View>
              <View style={styles.helpImageView}>
                <Image
                  source={item.helpImage2}
                  style={styles.helpImage}
                ></Image>
                <Text style={styles.helpImageText}>Preventing Pollution</Text>
              </View>
            </View>
          </View>

          {/* Find out more section */}
          <View style={{ paddingTop: 20 }}>
            <View
              style={{ width: "100%", borderWidth: 0.5, borderColor: "#bbb" }}
            ></View>
            <Text style={[styles.title, { paddingTop: 10, paddingBottom: 10 }]}>
              Find out more
            </Text>
            <TouchableOpacity onPress={() => console.warn("link1 pressed")}>
              <Text style={styles.link}>{item.link1}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.warn("link2 pressed")}>
              <Text style={styles.link}>{item.link2}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.warn("link3 pressed")}>
              <Text style={styles.link}>{item.link3}</Text>
            </TouchableOpacity>
          </View>

          {/* Done Button */}
          <View style={{ paddingTop: 20, paddingBottom: 20 }}>
            {/* Button to trigger modal */}
            <View style={{ paddingTop: 20, paddingBottom: 20 }}>
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={styles.button}
              >
                <Text style={styles.buttonText}>I've done this</Text>
              </TouchableOpacity>
            </View>

            <Modal animationType="slide" transparent visible={modalVisible}>
              <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                  <Image
                    source={require("../../images/earth.png")}
                    style={styles.modalImage}
                  />
                  <Text style={styles.modalText}>
                    Confirm you've completed this goal
                  </Text>

                  <View style={styles.tickCrossContainer}>
                    {/* Tick Image with Animated Circle */}
                    {loading ? (
                      <ActivityIndicator size="large" color="#241742" />
                    ) : (
                      <>
                        <TouchableOpacity
                          onPress={async () => {
                            setClickedImage("tick");
                            animateTick();
                            setCrossAnimation(new Animated.Value(0));
                          }}
                          disabled={clickedImage === "cross"}
                          style={styles.tickCrossButton}
                        >
                          <Image
                            source={require("../../images/check.png")}
                            style={styles.tickCrossImage}
                          />
                          <Animated.View
                            style={[
                              styles.circle,
                              {
                                transform: [{ scale: tickAnimation }],
                                borderColor: "#4ca64c",
                              },
                            ]}
                          />
                        </TouchableOpacity>

                        {/* Cross Image with Animated Circle */}
                        <TouchableOpacity
                          onPress={() => {
                            setClickedImage("cross");
                            animateCross();
                            setTickAnimation(new Animated.Value(0)); // Reset tick animation
                          }}
                          disabled={clickedImage === "tick"}
                          style={styles.tickCrossButton}
                        >
                          <Image
                            source={require("../../images/cancel.png")}
                            style={styles.tickCrossImage}
                          />
                          <Animated.View
                            style={[
                              styles.circle,
                              {
                                transform: [{ scale: crossAnimation }],
                                borderColor: "#ff4c4c",
                              },
                            ]}
                          />
                        </TouchableOpacity>
                      </>
                    )}
                  </View>
                  <Text style={styles.modalTextSecondary}>
                    Click on any of the above
                  </Text>
                  {closeButtonVisible && ( // Render close button only when closeButtonVisible is true
                    <View
                      style={{
                        paddingTop: 20,
                        width: "100%",
                      }}
                    >
                      <TouchableOpacity
                        style={styles.button}
                        onPress={() => setModalVisible(false)}
                      >
                        <Text style={styles.buttonText}>Close</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
            </Modal>
          </View>
        </View>
      </View>
      <StatusBar style="auto" backgroundColor="lightblue" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7FE",
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    backgroundColor: "lightblue",
  },
  row1: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "cover",
  },
  level: {
    fontFamily: "Switzer_Regular",
    fontSize: 16,
  },
  categoryText: {
    width: 70,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  coin: {
    fontFamily: "Switzer_Regular",
    fontSize: 18,
    marginTop: 5,
    // marginLeft: 15,
  },
  coinImage: {
    width: 25,
    height: 25,
    marginTop: 3,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontFamily: "Switzer_Bold",
    fontSize: 24,
    marginBottom: 10,
  },
  description: {
    fontFamily: "Switzer_Regular",
    fontSize: 16,
    lineHeight: 22,
  },
  helpImageView: {
    flexDirection: "column",
    gap: 10,
    alignItems: "center",
  },
  helpImage: {
    width: 70,
    height: 70,
    top: 10,
  },
  helpImageText: {
    fontFamily: "Switzer_Regular",
    paddingBottom: 10,
    fontSize: 12,
  },
  link: {
    fontSize: 15,
    color: "blue",
    textDecorationLine: "underline", // Add underline
    marginBottom: 20,
    fontFamily: "Switzer_Regular",
  },
  button: {
    width: "100%",
    borderRadius: 50,
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
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: "transparent",
    borderWidth: 2.5,
    position: "absolute",
    top: -5,
    right: -5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    backgroundColor: "#F7F7FE",
    borderRadius: 10,
    padding: 20,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    alignItems: "center",
  },
  modalImage: {
    width: 230,
    height: 230,
    alignSelf: "center",
    marginBottom: 20,
  },
  modalText: {
    fontSize: 24,
    fontFamily: "Switzer_Bold",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  modalTextSecondary: {
    fontFamily: "Switzer_Regular",
    fontSize: 14,
    textAlign: "center",
    paddingTop: 20,
    color: "#bbb",
  },
  tickCrossContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginTop: 20,
  },
  tickCrossButton: {
    flexDirection: "column",
    alignItems: "center",
  },
  tickCrossImage: {
    width: 50,
    height: 50,
  },
});
