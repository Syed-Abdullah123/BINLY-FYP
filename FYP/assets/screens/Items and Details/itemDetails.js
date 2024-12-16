import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { recycleData } from "./recycleData";

const screenWidth = Dimensions.get("window").width;

const Accordion = ({ title, image, isOpen, toggleAccordion, content }) => {
  return (
    <View style={styles.accordion}>
      <TouchableOpacity onPress={toggleAccordion} style={styles.header}>
        <View style={styles.leftContent}>
          <Image source={image} style={styles.image} />
          <Text style={styles.title}>{title}</Text>
        </View>
        <Ionicons
          name={isOpen ? "chevron-up-outline" : "chevron-down-outline"}
          size={16}
          color="black"
        />
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.accordionContent}>
          <Image source={image} style={styles.accordionImage} />
          <Text style={styles.accordionTitle}>{title}</Text>
          <Text style={styles.accordionDescription}>{content.description}</Text>
          {content.details.map((detail, index) => {
            if (detail.type === "heading") {
              return (
                <Text key={index} style={styles.accordionHeading}>
                  {detail.text}
                </Text>
              );
            }
            if (detail.type === "subheading") {
              return (
                <Text key={index} style={styles.accordionSubheading}>
                  {detail.text}
                </Text>
              );
            }
            return (
              <Text key={index} style={styles.accordionText}>
                {detail.text}
              </Text>
            );
          })}
        </View>
      )}
    </View>
  );
};

export default function ItemDetails({ navigation }) {
  const route = useRoute();
  const { item } = route.params;
  const material = item.title;

  const [fontsLoaded] = useFonts({
    Montserrat_Regular: require("../../fonts/Montserrat-Regular.ttf"),
    Montserrat_Bold: require("../../fonts/Montserrat-Bold.ttf"),
    Switzer_Regular: require("../../fonts/Switzer-Regular.otf"),
    Switzer_Medium: require("../../fonts/Switzer-Medium.otf"),
    Switzer_Bold: require("../../fonts/Switzer-Bold.otf"),
  });

  const [accordionState, setAccordionState] = useState({});
  const [showRecyclable, setShowRecyclable] = useState(true);

  const data = recycleData[material];

  useEffect(() => {
    setShowRecyclable(true);
    setAccordionState({});
  }, [material]);

  const toggleAccordion = (id) => {
    setAccordionState((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleRecyclablePress = () => {
    setShowRecyclable(true);
  };

  const handleUnrecyclablePress = () => {
    setShowRecyclable(false);
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{ alignItems: "center" }}>
          <View style={styles.imageView}>
            <Image
              source={item.imageUrl}
              resizeMode="cover"
              style={{
                height: 180,
                width: screenWidth * 0.8,
                borderRadius: 10,
              }}
            />
          </View>
          <Text style={styles.imageTitle}>{item.title}</Text>
        </View>
        <View style={{ alignItems: "center", marginTop: 15 }}>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <TouchableOpacity
              style={[styles.button, showRecyclable && styles.activeButton]}
              onPress={handleRecyclablePress}
            >
              <Text
                style={[
                  styles.buttonText,
                  showRecyclable && styles.activeButtonText,
                ]}
              >
                Recyclable
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, !showRecyclable && styles.activeButton]}
              onPress={handleUnrecyclablePress}
            >
              <Text
                style={[
                  styles.buttonText,
                  !showRecyclable && styles.activeButtonText,
                ]}
              >
                Unrecyclable
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flex: 1, padding: 10 }}>
          {showRecyclable &&
            data.recyclable.map((recyclableItem) => (
              <Accordion
                key={recyclableItem.id}
                title={recyclableItem.title}
                image={recyclableItem.image}
                isOpen={accordionState[recyclableItem.id]}
                toggleAccordion={() => toggleAccordion(recyclableItem.id)}
                content={recyclableItem.content}
              />
            ))}
          {!showRecyclable &&
            data.unrecyclable.map((unrecyclableItem) => (
              <Accordion
                key={unrecyclableItem.id}
                title={unrecyclableItem.title}
                image={unrecyclableItem.image}
                isOpen={accordionState[unrecyclableItem.id]}
                toggleAccordion={() => toggleAccordion(unrecyclableItem.id)}
                content={unrecyclableItem.content}
              />
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7FE",
  },
  imageView: {
    backgroundColor: "#fff",
    elevation: 1,
    width: screenWidth * 0.9,
    height: 220,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
  },
  imageTitle: {
    textAlign: "center",
    fontFamily: "Switzer_Bold",
    fontSize: 24,
    color: "#58497B",
    letterSpacing: 0.4,
    marginTop: 15,
  },
  headerText: {
    textAlign: "center",
    fontFamily: "Montserrat_Bold",
    fontSize: 20,
    marginTop: 30,
    marginBottom: 40,
  },
  items: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 50,
    elevation: 0.1,
    height: 450,
    width: 300,
    gap: 20,
    marginRight: 10,
    marginLeft: 10,
  },
  itemText: {
    marginTop: 10,
    fontSize: 28,
    textAlign: "center",
    fontFamily: "Switzer_Medium",
    letterSpacing: 1,
    color: "#58497B",
  },
  accordion: {
    marginTop: 10,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  leftContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontFamily: "Switzer_Medium",
  },
  accordionContent: {
    padding: 10,
  },
  accordionImage: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    borderRadius: 5,
  },
  accordionTitle: {
    fontFamily: "Switzer_Bold",
    fontSize: 18,
    // fontWeight: "bold",
    marginBottom: 10,
  },
  accordionDescription: {
    fontFamily: "Switzer_Regular",
    fontSize: 14,
    marginBottom: 10,
  },
  accordionHeading: {
    fontFamily: "Switzer_Bold",
    fontSize: 16,
    marginTop: 10,
    marginBottom: 5,
  },
  accordionSubheading: {
    fontFamily: "Switzer_Medium",
    fontSize: 14,
    marginTop: 5,
    marginBottom: 5,
  },
  accordionText: {
    fontFamily: "Switzer_Regular",
    fontSize: 14,
    marginBottom: 5,
  },
  content: {
    padding: 10,
    fontFamily: "Switzer_Regular",
  },

  button: {
    padding: 10,
    alignItems: "center",
    width: 130,
    borderRadius: 40,
  },
  buttonText: {
    fontFamily: "Switzer_Regular",
  },
  activeButton: {
    backgroundColor: "#241742",
  },
  activeButtonText: {
    color: "#fff",
  },
  inactiveButton: {
    backgroundColor: "red",
  },
  inactiveButtonText: {
    color: "grey",
  },
});
