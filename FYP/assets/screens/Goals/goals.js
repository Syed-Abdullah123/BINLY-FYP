import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
  FlatList,
} from "react-native";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useFonts } from "expo-font";
import { RFValue } from "react-native-responsive-fontsize";
import { goalsData } from "./goalsData";

export default function Goals({ navigation }) {
  const shuffleArray = (array) => {
    return array
      .map((item) => ({ item, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ item }) => item);
  };

  // Pick 3 random goals when the component mounts
  const initialShuffledGoals = useMemo(() => {
    const shuffledGoals = shuffleArray(goalsData);
    return shuffledGoals.slice(0, 3); // Pick 3 random goals once
  }, []);

  const [cardsData, setCardsData] = useState(initialShuffledGoals);

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

  const removeGoal = useCallback((goalId) => {
    setCardsData((prevData) => prevData.filter((goal) => goal.id !== goalId));
  }, []);

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

  const Card = ({ item }) => {
    const categoryColor = getCategoryColor(item.category);

    const handlePress = useCallback(() => {
      navigation.navigate("GoalDetails", {
        item,
        removeGoal, // Pass the removeGoal function consistently
      });
    }, [item]);

    return (
      <View>
        <Pressable onPress={handlePress}>
          <View style={styles.card}>
            <View style={styles.row1}>
              <View style={styles.col1}>
                <Image
                  source={item.imageSource}
                  style={styles.imageSource}
                ></Image>
              </View>
              <View style={styles.col2}>
                <View style={styles.colRow1}>
                  <View
                    style={[
                      styles.category,
                      { backgroundColor: categoryColor },
                    ]}
                  >
                    <Text style={styles.categoryText}>{item.category}</Text>
                  </View>
                  <Text style={styles.task}>{item.task}</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      right: 10,
                    }}
                  >
                    <Image
                      source={item.coinImageSource}
                      style={{ width: 30, height: 30 }}
                    ></Image>
                    <Text style={styles.task}>{item.coinValue}</Text>
                  </View>
                </View>
                <View>
                  <Text
                    style={styles.title}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                  >
                    {item.title}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.row2}>
              <TouchableOpacity style={styles.button} onPress={handlePress}>
                <Text style={styles.buttonText}>Complete Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cardsData}
        renderItem={({ item }) => <Card item={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingVertical: 20, gap: 20 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Text style={styles.emptyText}>No goals yet.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#F7F7FE",
  },
  card: {
    width: "100%",
    height: 200,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  row1: {
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  imageSource: {
    height: 100,
    width: 100,
    right: 15,
    borderRadius: 10,
  },
  col2: {
    justifyContent: "center",
    flexDirection: "column",
    gap: 5,
  },
  colRow1: {
    flexDirection: "row",
    gap: 15,
  },
  category: {
    width: 70,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryText: {
    fontFamily: "Switzer_Regular",
    fontSize: 16,
  },
  task: {
    fontFamily: "Switzer_Regular",
    fontSize: 16,
    alignSelf: "center",
  },
  title: {
    fontFamily: "Switzer_Medium",
    fontSize: RFValue(18),
    top: 10,
    maxWidth: "90%", // Adjust based on your design
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
    marginRight: 10,
  },
  row2: {
    top: 25,
  },
  emptyText: {
    fontFamily: "Switzer_Regular",
    fontSize: 16,
  },
});
