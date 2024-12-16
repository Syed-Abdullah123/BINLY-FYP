import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { useFonts } from "expo-font";
import { Ionicons } from "@expo/vector-icons";

export default function Recycle({ navigation }) {
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

  const carouselData = [
    {
      id: 1,
      title: "Plastic",
      imageUrl: require("../../images/plastic.jpg"),
    },
    {
      id: 2,
      title: "Glass",
      imageUrl: require("../../images/glass.jpg"),
    },
    {
      id: 3,
      title: "Paper",
      imageUrl: require("../../images/paper.jpg"),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <FlatList
          data={carouselData}
          renderItem={({ item }) => (
            <View>
              <Pressable
                onPress={() => {
                  navigation.navigate("ItemDetails", { item });
                }}
              >
                <View style={styles.items}>
                  <Image
                    source={item.imageUrl}
                    style={styles.image}
                    resizeMode="cover"
                  />
                </View>
                <View style={styles.textView}>
                  <Text style={styles.itemText}>{item.title}</Text>
                </View>
              </Pressable>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          snapToAlignment="center"
        />
      </View>
      <TouchableOpacity
        style={styles.floatingChatButton}
        onPress={() => navigation.navigate("ChatUsers")}
      >
        <Ionicons name="chatbubble-ellipses-outline" size={24} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7FE",
  },
  items: {
    backgroundColor: "#fff",
    borderRadius: 20,
    shadowColor: "#000",
    elevation: 5,
    height: 400,
    width: screenWidth * 0.9,
    marginHorizontal: 15,
    padding: 20,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  textView: {
    backgroundColor: "yellow",
    marginTop: 20,
    width: 200,
    alignSelf: "center",
    padding: 10,
    backgroundColor: "#58497B",
  },
  itemText: {
    fontSize: 32,
    textAlign: "center",
    fontFamily: "Switzer_Bold",
    letterSpacing: 0.5,
    color: "#fff",
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
});
