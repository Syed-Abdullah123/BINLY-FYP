import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";

const ConfirmationScreen = ({ navigation, route }) => {
  const { images, locationAddress, detailedAddress, mapLocation } =
    route.params; // Pass the image and location from previous screen

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.header}>Confirm Details</Text>

        {/* Image Preview */}
        <View style={styles.imageContainer}>
          {images && images.length > 0 ? (
            images.map((uri, index) => (
              <Image key={index} source={{ uri }} style={styles.imagePreview} />
            ))
          ) : (
            <Text>No images to display</Text>
          )}
        </View>

        {/* Location Details */}
        <View style={styles.locationContainer}>
          <Text style={styles.detailsTitle}>Map Location Address:</Text>
          <Text style={styles.locationText}>{locationAddress}</Text>

          <Text style={styles.detailsTitle}>Detailed Location:</Text>
          <Text style={styles.locationText}>{detailedAddress}</Text>
        </View>

        {/* Confirm Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={() => {
              navigation.navigate("ChatUsers", {
                images,
                locationAddress,
                detailedAddress,
              });
            }}
          >
            <Text style={styles.confirmButtonText}>Confirm and Proceed</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F7F7FE",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  imagePreview: {
    width: "50%",
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    resizeMode: "contain",
  },
  locationContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20,
  },
  locationText: {
    fontSize: 16,
    color: "#555",
    lineHeight: 24,
  },
  addressInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#333",
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 30,
    alignItems: "center",
  },
  confirmButton: {
    width: "100%",
    backgroundColor: "#241742",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  confirmButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  detailsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    textAlign: "left",
  },
  scrollView: {
    flexGrow: 1,
  },
});

export default ConfirmationScreen;
