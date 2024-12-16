import React, { useState } from "react";
import { View, Text, Pressable, FlatList, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CustomDropdown = ({ placeholder, options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(placeholder);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option); // Pass the selected option back to the parent component
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.dropdown} onPress={toggleDropdown}>
        <Text style={styles.placeholder}>{selectedOption}</Text>
        <Ionicons
          name={isOpen ? "chevron-up" : "chevron-down"}
          size={20}
          color="#999"
        />
      </Pressable>

      {isOpen && (
        <FlatList
          data={options}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Pressable style={styles.option} onPress={() => selectOption(item)}>
              <Text style={styles.optionText}>{item}</Text>
            </Pressable>
          )}
        />
      )}
    </View>
  );
};

export default CustomDropdown;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    width: "95%",
    borderRadius: 8,
    overflow: "hidden",
    marginTop: 10,
  },
  dropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 5,
    borderBottomWidth: 5,
    borderTopColor: "#58497B",
    borderLeftColor: "#58497B",
    borderRightColor: "#241742",
    borderBottomColor: "#241742",
    borderRadius: 8,
  },
  placeholder: {
    fontSize: 16,
    color: "#4A4A4A",
  },
  option: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#bbb",
  },
  optionText: {
    fontSize: 16,
    color: "#4A4A4A",
  },
});
