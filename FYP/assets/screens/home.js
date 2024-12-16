import {
  View,
  Text,
  StyleSheet,
  Animated,
  ScrollView,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Pressable,
  Modal,
  Image,
  Dimensions,
  BackHandler,
  Alert,
} from "react-native";
import { AntDesign, Ionicons, FontAwesome } from "@expo/vector-icons";
import React, { useState, useEffect, useRef, useContext } from "react";
import { useFonts } from "expo-font";
import { articles, adviceArticles } from "./articles";
import Notifications from "./notifications";

import { UserContext } from "./UserLogin/UserContext";

export default function Home({ navigation }) {
  const { user } = useContext(UserContext);

  const [modalVisible, setModalVisibility] = useState(false);
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  const [currentPage, setCurrentPage] = useState(0);

  const [randomFeaturedArticles, setRandomFeaturedArticles] = useState([]);
  const [randomAdviceArticles, setRandomAdviceArticles] = useState([]);

  const handleNotificationPress = () => {
    setModalVisibility(true);
  };
  const handlePageChange = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    setCurrentPage(Math.round(offsetX / screenWidth));
  };

  useEffect(() => {
    // Shuffle and set random articles only once when the component mounts
    setRandomFeaturedArticles(getRandomArticles(articles, 3));
    setRandomAdviceArticles(getRandomArticles(adviceArticles, 4));
  }, []);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 4000,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        speed: 1,
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacity, translateY]);

  useEffect(() => {
    // Disable hardware back button on Android
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to exit?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => BackHandler.exitApp() },
      ]);
      return true; // Prevent default behavior
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove(); // Clean up the listener when component unmounts
  }, []);

  const [fontsLoaded] = useFonts({
    Montserrat_Regular: require("../fonts/Montserrat-Regular.ttf"),
    Montserrat_Bold: require("../fonts/Montserrat-Bold.ttf"),
    Switzer_Regular: require("../fonts/Switzer-Regular.otf"),
    Switzer_Medium: require("../fonts/Switzer-Medium.otf"),
    Switzer_Bold: require("../fonts/Switzer-Bold.otf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: {
        fontFamily: "Montserrat_Bold",
        fontSize: 24,
      },
      headerTitleAlign: "center",
      headerRight: () => (
        <View style={styles.headerNotification}>
          <Ionicons
            name="notifications-outline"
            size={22}
            color="#fff"
            onPress={handleNotificationPress}
          />
        </View>
      ),
      headerShown: true,
    });
  }, [navigation]);

  // Utility function to shuffle an array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Function to get random articles
  const getRandomArticles = (articles, count) => {
    const shuffledArticles = shuffleArray([...articles]); // Shuffle the array
    return shuffledArticles.slice(0, count); // Return the first 'count' articles
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Animated.View
          style={{
            opacity,
            transform: [{ translateY }],
          }}
        >
          {/* Body */}
          <View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisibility(!modalVisible);
              }}
            >
              <View style={styles.modalView}>
                <Notifications />
                <Pressable
                  style={{ position: "absolute", top: 20, right: 20 }}
                  onPress={() => setModalVisibility(!modalVisible)}
                >
                  <FontAwesome name="close" size={24} color="black" />
                </Pressable>
              </View>
            </Modal>
            {/* Header Section */}
            <View style={styles.header}>
              <Text style={styles.headerText}>Welcome {user.name}</Text>
              <TouchableOpacity
                style={styles.welcomeImg}
                onPress={() => navigation.navigate("Profile")}
              >
                {user.profileImage ? (
                  <Image
                    source={{ uri: user.profileImage }}
                    style={styles.image}
                  />
                ) : (
                  <View style={styles.placeholderImage} />
                )}
              </TouchableOpacity>
            </View>

            {/* Search Bar Section */}
            <View style={styles.searchBar}>
              <AntDesign
                name="search1"
                size={24}
                color="#666666"
                style={styles.searchButton}
              />
              <TextInput
                style={styles.searchInput}
                placeholder="Search"
                placeholderTextColor="#666666"
              />
            </View>

            {/* Carousel Section */}
            <View style={styles.carouselContainer}>
              <Text style={styles.sectionHeading}>Featured Articles</Text>
              <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={handlePageChange}
                snapToAlignment="center"
                // contentContainerStyle={{ alignItems: "center" }} // Ensure items are centered
              >
                {randomFeaturedArticles.map((item, index) => (
                  <Pressable
                    key={item.id}
                    style={styles.carouselItem}
                    onPress={() =>
                      navigation.navigate("ArticleDetails", {
                        articleId: item.id,
                        type: "featured",
                      })
                    }
                  >
                    <ImageBackground
                      source={item.backgroundImage}
                      style={styles.backgroundImage}
                      imageStyle={{ borderRadius: 10 }}
                    >
                      <Animated.View
                        style={[
                          styles.overlay,
                          { opacity, transform: [{ translateY }] },
                        ]}
                      >
                        <Text style={styles.carouselItemTitle}>
                          {item.title}
                        </Text>
                        <Text style={styles.carouselItemDescription}>
                          {item.description}
                        </Text>
                      </Animated.View>
                    </ImageBackground>
                  </Pressable>
                ))}
              </ScrollView>
            </View>

            {/* Advice Section */}
            <Text style={styles.sectionHeading}>Advices</Text>
            <View style={styles.adviceContainer}>
              {randomAdviceArticles.map((item) => (
                <Pressable
                  key={item.id}
                  style={styles.adviceItem}
                  onPress={() =>
                    navigation.navigate("ArticleDetails", {
                      articleId: item.id,
                      type: "advice",
                    })
                  }
                >
                  <Image source={item.image} style={styles.adviceImage} />
                  <View style={styles.adviceContent}>
                    <Text style={styles.adviceTitle}>{item.title}</Text>
                    <Text style={styles.adviceDescription}>
                      {item.description}
                    </Text>
                  </View>
                </Pressable>
              ))}
            </View>
          </View>

          <View style={{ height: 100, width: "100%" }}></View>
        </Animated.View>
      </ScrollView>

      {/* Floating Chat Button */}
      <TouchableOpacity
        style={styles.floatingChatButton}
        onPress={() => navigation.navigate("ChatUsers")}
      >
        <Ionicons name="chatbubble-ellipses-outline" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7FE",
    paddingHorizontal: 15,
  },
  headerNotification: {
    justifyContent: "center",
    alignItems: "center",
    height: 37,
    width: 37,
    borderRadius: 40,
    backgroundColor: "#58497B",
    marginRight: 20,
  },
  modalView: {
    flex: 1,
    alignItems: "center",
    marginTop: "20%",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: "#F7F7FE",
  },
  header: {
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  headerText: {
    fontFamily: "Switzer_Medium",
    fontSize: 20,
  },
  welcomeImg: {
    height: 40,
    width: 40,
    borderRadius: 100,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 35,
    height: 35,
    borderRadius: 25,
  },
  placeholderImage: {
    width: 35,
    height: 35,
    borderRadius: 25,
    backgroundColor: "#ccc",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    // borderWidth: 1,
    borderRadius: 20,
    backgroundColor: "#e5e5e5",
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontFamily: "Switzer_Regular",
  },
  searchButton: {
    paddingRight: 15,
    borderRadius: 20,
  },
  searchIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  carouselContainer: {
    flex: 1,
    width: "100%",
  },
  carouselItem: {
    width: screenWidth * 0.8,
    height: 200,
    marginHorizontal: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "flex-end",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
  },
  carouselItemTitle: {
    fontFamily: "Switzer_Bold",
    fontSize: 18,
    color: "#fff",
  },
  carouselItemDescription: {
    fontFamily: "Switzer_Regular",
    fontSize: 12,
    paddingTop: 2,
    color: "#fff",
  },
  sectionHeading: {
    fontSize: 22,
    fontFamily: "Switzer_Bold",
    marginBottom: 10,
    marginTop: 10,
  },
  adviceContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  sectionHeading1: {
    fontSize: 22,
    fontFamily: "Switzer_Bold",
    paddingTop: 20,
  },
  adviceItem: {
    width: "49%",
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
    elevation: 2,
  },
  adviceImage: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  adviceContent: {
    padding: 10,
  },
  adviceTitle: {
    fontFamily: "Switzer_Bold",
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
    left: 7,
    top: 3,
  },
  adviceDescription: {
    fontFamily: "Switzer_Regular",
    fontSize: 14,
    color: "#666",
    left: 7,
    top: 3,
  },
  floatingChatButton: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#58497B",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    bottom: 90,
    right: 20,
    zIndex: 100, // Ensures it stays above other components
  },
  exitModalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  exitModalContent: {
    width: 280,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  exitModalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  exitModalText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 25,
  },
  exitButtonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  cancelExitButton: {
    flex: 1,
    backgroundColor: "#aaa",
    borderRadius: 8,
    padding: 12,
    marginRight: 10,
    alignItems: "center",
  },
  confirmExitButton: {
    flex: 1,
    backgroundColor: "#ff5c5c",
    borderRadius: 8,
    padding: 12,
    marginLeft: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
