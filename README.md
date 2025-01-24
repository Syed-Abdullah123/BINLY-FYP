# Binly - Waste Management Digitalization App

**Binly** is a mobile application designed to digitalize waste management by connecting users and waste collectors (community users). The app allows users to set daily waste management goals, track their progress, and communicate with waste collectors via an in-app chat. Additionally, Binly integrates a machine learning model to classify waste items into six predefined categories, enhancing the efficiency of waste sorting and management.

Built with **React Native** and powered by **Firebase/Firestore** for real-time data storage and authentication, Binly leverages the **Context API** for state management and **Flask** as a backend to serve the ML model.

---

## Features

- **User Roles**:
  - **Normal Users**: Set daily waste management goals and track progress.
  - **Community Users (Waste Collectors)**: Manage waste collection tasks and interact with normal users.
  
- **Goal Tracking**: Users can set and complete daily waste management goals, which are stored in **Firestore**.

- **In-App Chat**: Real-time messaging between normal users and community users using **Firebase/Firestore**.

- **Waste Classification**: A machine learning model classifies waste items into six categories. The model is integrated into the app using **Flask** as a backend.

- **Authentication**: Secure user authentication using **Firebase** and managed via the **Context API**.

- **Responsive Design**: Built with **React Native** for cross-platform compatibility (iOS and Android).

---

## Technologies Used

### Frontend
- **React Native**: Cross-platform mobile app development.
- **React Navigation**: For seamless navigation between screens.
- **Expo**: Development platform for React Native apps.
- **Context API**: For state management and user authentication.

### Backend
- **Firebase/Firestore**: Real-time database and authentication.
- **Flask**: Backend server to serve the machine learning model.

### Machine Learning
- **Custom ML Model**: Classifies waste items into six categories.
- **Flask Integration**: Connects the ML model to the React Native app.

## Screenshots
Below are the screenshots of the app, and how the app looks and feels.

<div style="flex-direction: row; gap: 10px;">
  <img src="./FYP/assets/screenshots/SignUp Screen.png" width="180" />
  <img src="./FYP/assets/screenshots/Login Screen.png" width="180" />
  <img src="./FYP/assets/screenshots/Home Screen.png" width="180" />
  <img src="./FYP/assets/screenshots/Articles Screen.png" width="180" />
  <img src="./FYP/assets/screenshots/Goals Screen.png" width="180" />
  <img src="./FYP/assets/screenshots/GoalDetails Screen.png" width="180" />
  <img src="./FYP/assets/screenshots/ChatUsers Screen.png" width="180" />
  <img src="./FYP/assets/screenshots/Chat Screen.png" width="180" />
  <img src="./FYP/assets/screenshots/CamScan Screen.png" width="180" />
  <img src="./FYP/assets/screenshots/CamScan1 Screen.png" width="180" />
</div>

## Dependencies
- **@react-native-async-storage/async-storage**: Local storage for user data.
- **@react-navigation**: Navigation library for React Native.
- **axios**: HTTP client for API requests.
- **expo-camera**: Camera functionality for capturing images.
- **expo-image-picker**: Image selection from the device gallery.
- **expo-location**: Location services for geolocation.
- **firebase**: Authentication and Firestore integration.
- **lottie-react-native**: Animation library for engaging UI.
- **react-native-maps**: Map integration for location-based features.
- **react-native-paper**: UI component library for a consistent design.

---

## Setup Instructions

### Prerequisites
- Node.js and npm installed.
- Expo CLI installed globally (`npm install -g expo-cli`).
- Firebase project setup with Firestore and Authentication enabled.
- Flask backend running with the ML model deployed.

### Steps to Run the Project
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/binly.git
   cd binly

2. **Install Dependencies**:
    ```bash
    npm install
3. **Configure Firebase**:
- Add your Firebase configuration in `firebaseConfig.js`.

- Ensure Firestore and Authentication are enabled in your Firebase console.

4. **Run the Flask Backend**:
- Navigate to the Flask backend directory and start the server:
    ```bash
    python app.py

5. **Start the React Native App**:
    ```bash
    expo start

Scan the QR code with the Expo Go app on your mobile device or use an emulator.

## Contributing
Contributions are welcome! If you’d like to contribute to Binly, please follow these steps:

1. Fork the repository.

2. Create a new branch (`git checkout -b feature/YourFeatureName`).

3. Commit your changes (`git commit -m 'Add some feature'`).

4. Push to the branch (`git push origin feature/YourFeatureName`).

5. Open a pull request

## Acknowledgments
Special thanks to **Firebase** and **Expo** for providing robust tools for app development.

Gratitude to the open-source community for libraries and resources that made this project possible.
