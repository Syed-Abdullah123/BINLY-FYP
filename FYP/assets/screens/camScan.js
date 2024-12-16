import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  ActivityIndicator,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";
import { useFonts } from "expo-font";
import Constants from "expo-constants";

// Function to get the correct API URL based on environment
const getApiUrl = () => {
  const DEV_MODE = __DEV__;

  if (DEV_MODE) {
    // For iOS simulator
    if (Constants.platform?.ios) {
      return "http://localhost:5000";
    }
    // For Android emulator
    if (Constants.platform?.android) {
      return "http://172.0.1.87:5000";
    }
    // For physical device (replace with your laptop's IP)
    // return "http://172.0.6.249:5000"; // Replace X with your actual IP
  }
  // return "https://your-production-url.com";
};

const API_URL = getApiUrl();

const CustomTextBox = ({ onTakePhoto, onPickImage }) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.iconButton} onPress={onTakePhoto}>
        <View style={styles.iconView}>
          <Icon name="camera" size={20} color="#fff" />
        </View>
        <Text style={styles.iconButtonText}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton} onPress={onPickImage}>
        <View style={styles.iconView}>
          <Icon name="upload" size={20} color="#fff" />
        </View>
        <Text style={styles.iconButtonText}>Upload Photo</Text>
      </TouchableOpacity>
    </View>
  );
};

const CamScan = ({ navigation }) => {
  const [images, setImages] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImageUri, setSelectedImageUri] = useState(null);
  const [isPhotoUploaded, setIsPhotoUploaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  // Updated getPrediction function with better error handling
  const getPrediction = async (uri) => {
    setIsLoading(true);
    try {
      // Get file extension
      const uriParts = uri.split(".");
      const fileType = uriParts[uriParts.length - 1];

      // Create form data
      const formData = new FormData();

      // Handle the image file
      formData.append("image", {
        uri: Platform.OS === "ios" ? uri.replace("file://", "") : uri,
        type: `image/${fileType}`,
        name: `photo.${fileType}`,
      });

      console.log("Making request to:", `${API_URL}/predict`);
      console.log("With image URI:", uri);
      console.log("FormData:", JSON.stringify(Array.from(formData)));

      // Increase timeout for larger images
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 second timeout

      try {
        const serverResponse = await fetch(`${API_URL}/predict`, {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!serverResponse.ok) {
          const errorText = await serverResponse.text();
          console.error("Server response:", errorText);
          throw new Error(`HTTP error! status: ${serverResponse.status}`);
        }

        const result = await serverResponse.json();
        console.log("Prediction result:", result);

        if (!result.success) {
          throw new Error(result.error || "Prediction failed");
        }

        return result.prediction;
      } catch (fetchError) {
        console.error("Fetch error:", fetchError);
        throw fetchError;
      }
    } catch (error) {
      console.error("Prediction error:", error);
      let errorMessage = "Failed to get prediction";

      if (error.name === "AbortError") {
        errorMessage =
          "Request timed out. Please try with a smaller image or check your connection.";
      } else if (error.message.includes("Network request failed")) {
        errorMessage = `Network error. Please ensure:
  1. Your phone and computer are on the same network
  2. The server is running at ${API_URL}
  3. Your computer's firewall allows incoming connections
  4. Try accessing ${API_URL}/health in your phone's browser`;
      } else {
        errorMessage = `Error: ${error.message}`;
      }

      Alert.alert(
        "Error",
        errorMessage,
        [
          {
            text: "OK",
            onPress: () => console.log("Alert closed"),
            style: "default",
          },
        ],
        { cancelable: true }
      );
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const pickImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      const newImages = result.assets.map((asset) => asset.uri);
      setImages([...images, ...newImages]);

      // Get predictions for new images
      for (const uri of newImages) {
        const prediction = await getPrediction(uri);
        if (prediction) {
          setPredictions((prev) => [...prev, prediction]);
        }
      }
      setIsPhotoUploaded(true);
    }
  };

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImages([...images, uri]);

      // Get prediction for new image
      const prediction = await getPrediction(uri);
      if (prediction) {
        setPredictions((prev) => [...prev, prediction]);
      }
      setIsPhotoUploaded(true);
    }
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPredictions = predictions.filter((_, i) => i !== index);
    setImages(newImages);
    setPredictions(newPredictions);
    setIsPhotoUploaded(newImages.length > 0);
  };

  const openImageModal = (uri, index) => {
    setSelectedImageUri({ uri, prediction: predictions[index] });
    setIsModalVisible(true);
  };

  const closeImageModal = () => {
    setIsModalVisible(false);
    setSelectedImageUri(null);
  };

  const testConnection = async () => {
    try {
      console.log("Testing connection to:", `${API_URL}/health`);

      const response = await fetch(`${API_URL}/health`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Server health check result:", result);

      Alert.alert("Connection Test", "Successfully connected to the server!", [
        { text: "OK", style: "default" },
      ]);

      return true;
    } catch (error) {
      console.error("Connection test failed:", error);

      Alert.alert(
        "Connection Test Failed",
        `Could not connect to server at ${API_URL}. Error: ${error.message}`,
        [{ text: "OK", style: "default" }]
      );

      return false;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Upload photo or take a photo</Text>
      <CustomTextBox onTakePhoto={takePhoto} onPickImage={pickImages} />
      <TouchableOpacity style={styles.testButton} onPress={testConnection}>
        <Text style={styles.testButtonText}>Test Connection</Text>
      </TouchableOpacity>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#58497B" />
          <Text>Analyzing image...</Text>
        </View>
      )}
      <ScrollView contentContainerStyle={styles.imageGrid}>
        {images.length === 0 ? (
          <Image
            source={require("../images/placeholderImage.png")}
            style={styles.placeholderImage}
          />
        ) : (
          images.map((uri, index) => (
            <View key={index} style={styles.imageWrapper}>
              <TouchableOpacity onPress={() => openImageModal(uri, index)}>
                <Image source={{ uri }} style={styles.image} />
                {predictions[index] && (
                  <View style={styles.predictionOverlay}>
                    <Text style={styles.predictionText}>
                      {predictions[index].class}
                    </Text>
                    <Text style={styles.confidenceText}>
                      {(predictions[index].confidence * 100).toFixed(1)}%
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.removeIcon}
                onPress={() => removeImage(index)}
              >
                <Icon
                  name="times-circle"
                  size={27}
                  color="#58497B"
                  style={{ bottom: 1 }}
                />
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>

      {/* Enabled or disabled button when the image is uploaded */}
      {/* <TouchableOpacity
        style={
          isPhotoUploaded ? styles.nextButtonEnabled : styles.nextButtonDisabled
        }
        disabled={!isPhotoUploaded}
        onPress={() =>
          navigation.navigate("Location", { predictions: predictions })
        }
      >
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Text style={styles.nextButtonText}>Next</Text>
          <Icon
            name="chevron-right"
            size={14}
            color="white"
            style={{ alignSelf: "center", paddingTop: 2 }}
          />
        </View>
      </TouchableOpacity> */}

      <Modal visible={isModalVisible} transparent={true} animationType="fade">
        <View style={styles.modalBackground}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={closeImageModal}
          >
            <Icon
              name="times-circle"
              size={45}
              color="red"
              style={{ bottom: 1 }}
            />
          </TouchableOpacity>

          {selectedImageUri && (
            <View style={styles.modalContent}>
              <Image
                source={{ uri: selectedImageUri.uri }}
                style={styles.fullscreenImage}
              />
              {selectedImageUri.prediction && (
                <View style={styles.modalPredictionContainer}>
                  <Text style={styles.modalPredictionText}>
                    Type: {selectedImageUri.prediction.class}
                  </Text>
                  <Text style={styles.modalConfidenceText}>
                    Confidence:{" "}
                    {(selectedImageUri.prediction.confidence * 100).toFixed(1)}%
                  </Text>
                </View>
              )}
            </View>
          )}
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#F7F7FE",
    borderColor: "black",
    borderWidth: 1,
  },
  header: {
    fontFamily: "Montserrat_Bold",
    fontSize: 18,
    margin: 20,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
    width: "80%",
    alignSelf: "center",
    position: "absolute",
    bottom: "20%",
    // backgroundColor: "red",
    zIndex: 1,
  },
  iconButton: {
    alignItems: "center",
    padding: 10,
    gap: 8,
  },
  iconView: {
    width: 50,
    height: 50,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#58497B",
    shadowColor: "#58497B",
    elevation: 2,
  },
  iconButtonText: {
    marginLeft: 5,
    fontSize: 16,
    fontFamily: "Switzer_Regular",
  },
  placeholderImage: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
    borderRadius: 5,
    marginBottom: 10,
  },
  nextButtonEnabled: {
    backgroundColor: "#58497B", // Green for enabled state
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
    alignSelf: "center",
    bottom: "17%",
  },
  nextButtonDisabled: {
    backgroundColor: "#bbb", // Grey for disabled state
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
    alignSelf: "center",
    bottom: "17%",
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Montserrat_Bold",
  },
  imageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
  },
  imageWrapper: {
    width: "47%",
    position: "relative",
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
    borderRadius: 5,
  },
  removeIcon: {
    position: "absolute",
    top: 5,
    right: 5,
    width: 25,
    height: 25,
    backgroundColor: "white",
    borderRadius: 15,
    alignItems: "center",
    // padding: 6,
  },
  imageCount: {
    marginBottom: 10,
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Montserrat_Regular",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 50,
    right: 20,
    backgroundColor: "#fff",
    width: 43,
    height: 43,
    borderRadius: 30,
    alignItems: "center",
    zIndex: 1,
  },
  closeButtonText: {
    color: "white",
    fontSize: 18,
    fontFamily: "Montserrat_Bold",
  },
  fullscreenImage: {
    width: "90%",
    height: "70%",
    resizeMode: "contain",
  },
  loadingContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -50 }, { translateY: -50 }],
    alignItems: "center",
    zIndex: 1000,
    padding: 20,
    borderRadius: 10,
  },
  predictionOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 5,
    alignItems: "center",
  },
  predictionText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  confidenceText: {
    color: "white",
    fontSize: 10,
  },
  modalContent: {
    flex: 1,
    justifyContent: "center",
  },
  modalPredictionContainer: {
    position: "absolute",
    bottom: 40,
    left: 20,
    right: 20,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  modalPredictionText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  modalConfidenceText: {
    color: "white",
    fontSize: 16,
  },
  testButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  testButtonText: {
    color: "white",
    textAlign: "center",
  },
});

export default CamScan;
