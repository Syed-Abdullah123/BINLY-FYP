import React from "react";
import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import { articles, adviceArticles } from "./articles";
import { useFonts } from "expo-font";

export default ArticleDetailsScreen = ({ route }) => {
  const { articleId, type } = route.params;

  // console.log("Article ID:", articleId, "Type:", type); // Debugging line

  const article =
    type === "featured"
      ? articles.find((a) => a.id === articleId)
      : adviceArticles.find((a) => a.id === articleId);

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

  if (!article) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Article not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={article.articleImg} style={styles.articleImage} />
        <Text style={styles.title}>{article.title}</Text>
        {article.content.map((section, index) => {
          switch (section.type) {
            case "heading":
              return (
                <Text key={index} style={styles.heading}>
                  {section.text}
                </Text>
              );
            case "subheading":
              return (
                <Text key={index} style={styles.subheading}>
                  {section.text}
                </Text>
              );
            case "paragraph":
              return (
                <Text key={index} style={styles.paragraph}>
                  {section.text}
                </Text>
              );
            case "list":
              return (
                <View key={index} style={styles.list}>
                  {section.items.map((item, i) => (
                    <View key={i} style={styles.listItemContainer}>
                      <Text style={styles.listBullet}>•</Text>
                      <Text style={styles.listItem}>{item}</Text>
                    </View>
                  ))}
                </View>
              );
            default:
              return null;
          }
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#F7F7FE",
  },
  articleImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontFamily: "Switzer_Bold",
    marginVertical: 16,
    color: "#333",
  },
  heading: {
    fontSize: 20,
    fontFamily: "Switzer_Bold",
    marginBottom: 8,
    color: "#555",
  },
  subheading: {
    fontSize: 20,
    fontFamily: "Switzer_Medium",
    marginVertical: 6,
    color: "#666",
  },
  paragraph: {
    fontSize: 16,
    fontFamily: "Switzer_Regular",
    marginVertical: 4,
    color: "#444",
    lineHeight: 24,
  },
  list: {
    marginVertical: 8,
    paddingLeft: 16,
  },
  listItemContainer: {
    flexDirection: "row",
    // alignItems: "center",
    marginVertical: 2,
  },
  listBullet: {
    fontSize: 16,
    fontFamily: "Switzer_Regular",
    marginRight: 8,
    color: "#444",
  },
  listItem: {
    fontSize: 16,
    fontFamily: "Switzer_Regular",
    color: "#444",
  },
  errorText: {
    fontSize: 18,
    fontFamily: "Switzer_Regular",
    color: "red",
    textAlign: "center",
    marginTop: 50,
  },
});
