import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";

const LocationScreen = ({ navigation, route }) => {
  const [region, setRegion] = useState(null); // Map region
  const [location, setLocation] = useState(null); // User's current location
  const [searchQuery, setSearchQuery] = useState(""); // Search bar query
  const [selectedLocation, setSelectedLocation] = useState(null); // Location selected on the map
  const [locationAddress, setLocationAddress] = useState(""); // Address for selected location
  const [detailedAddress, setDetailedAddress] = useState(""); // Tracks detailed address
  const [isNextEnabled, setIsNextEnabled] = useState(false); // Button status

  // Enable Next button if detailedAddress is entered
  useEffect(() => {
    setIsNextEnabled(detailedAddress.trim() !== "");
  }, [detailedAddress]);

  // Fetch current location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Location permission is required to use this feature."
        );
        return;
      }
      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    })();
  }, []);

  // Fetch address using a free API (OpenStreetMap Nominatim for geocoding)
  const fetchAddress = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse`,
        {
          params: {
            lat,
            lon,
            format: "json",
          },
        }
      );
      const address = response.data?.display_name || "Address not found";
      setLocationAddress(address);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch address.");
    }
  };

  // Handle search for location
  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search`,
        {
          params: {
            q: searchQuery,
            format: "json",
            addressdetails: 1,
            limit: 1,
          },
        }
      );
      if (response.data.length > 0) {
        const result = response.data[0];
        setRegion({
          latitude: parseFloat(result.lat),
          longitude: parseFloat(result.lon),
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        });
        setSelectedLocation({
          latitude: parseFloat(result.lat),
          longitude: parseFloat(result.lon),
        });
        fetchAddress(result.lat, result.lon);
      } else {
        Alert.alert("Location Not Found", "Please enter a valid location.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to search location.");
    }
  };

  // Handle map tap for selecting a location
  const handleMapPress = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });
    fetchAddress(latitude, longitude);
  };

  return (
    // <KeyboardAvoidingView
    //   style={styles.container}
    //   behavior="padding"
    //   keyboardVerticalOffset={100}
    // >
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          style={{ flex: 1 }}
          placeholder="Search for a location..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Ionicons
          name="search-outline"
          size={24}
          onPress={handleSearch}
          style={{
            color: "#bbb",
            marginLeft: 10,
          }}
        />
      </View>

      {location ? (
        <MapView
          style={styles.map}
          region={region || location}
          showsUserLocation={true}
          onPress={handleMapPress}
        >
          {selectedLocation && <Marker coordinate={selectedLocation} />}
        </MapView>
      ) : (
        <Text>Loading Map...</Text>
      )}

      <View style={styles.addressMainCont}>
        <Text style={styles.addressHeading}>Enter Detailed Address</Text>
        <View style={styles.addressContainer}>
          {/* {locationAddress ? (
          // <ScrollView>
          <Text style={styles.addressText}>
            Selected Location: {locationAddress}
          </Text>
        ) : (
          // </ScrollView>
          <Text style={styles.placeholderText}>
            Select a place on the map to show the location here!
          </Text>
        )} */}
          <Ionicons
            name="location-outline"
            size={24}
            color={"#999"}
            style={styles.locationIcon}
          />
          <TextInput
            style={styles.addressText}
            placeholder="Enter Address ..."
            multiline
            value={detailedAddress}
            onChangeText={setDetailedAddress}
          ></TextInput>
        </View>
      </View>

      <View style={styles.bottomButton}>
        <TouchableOpacity
          disabled={!isNextEnabled} // Disable button if no detailed address
          onPress={() =>
            navigation.navigate("ConfirmationScreen", {
              images: route.params.images,
              mapLocation: selectedLocation || location,
              locationAddress: locationAddress, // Pass map location
              detailedAddress, // Pass detailed address
            })
          }
        >
          <LinearGradient
            style={styles.button}
            colors={isNextEnabled ? ["#58497B", "#241742"] : ["#bbb", "#bbb"]}
          >
            <Text style={styles.buttonText}>Next</Text>
            <Ionicons
              name="chevron-forward-outline"
              size={20}
              color={"#fffafa"}
              style={{ marginTop: 3 }}
            />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
    // </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7FE",
  },
  map: {
    width: "100%",
    height: "60%",
  },
  searchBar: {
    padding: 10,
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    elevation: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  addressHeading: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 10,
    marginLeft: 10,
  },
  addressContainer: {
    flexDirection: "row",
    padding: 8,
    width: "95%",
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    marginBottom: 10,
  },
  locationIcon: {
    marginRight: 8,
    padding: 2,
  },
  addressText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  placeholderText: {
    fontSize: 16,
    color: "#bbb",
  },
  bottomButton: {
    flex: 1,
    width: "100%",
    marginTop: 10,
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
});

export default LocationScreen;
