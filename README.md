# 🌼 Weather Around

**Weather Around** is a beautiful and responsive **React Native** application that offers users **real-time weather information** for any location.  
Users can view detailed weather data for their **current location** or **search for weather conditions** in cities around the world.  

---

## 🌞 Overview

The app integrates advanced APIs, modern UI/UX, and powerful state management tools to deliver an engaging and seamless experience.  
Built with **React Native**, **Redux Toolkit**, and **RTK Query**, it ensures smooth performance across Android and iOS platforms.

---

## 🚀 Features

### 🌐 API Integration
- Fetches **real-time weather data** from [OpenWeather](https://openweathermap.org/api) or [AccuWeather](https://developer.accuweather.com/).
- Uses **RTK Query** (Redux Toolkit) for efficient and optimized API handling.
- Minimizes redundant network calls by caching responses globally.

### 🔍 Recent Searches
- Stores the **last three searched cities** locally using `AsyncStorage`.
- Offers quick access to recently viewed locations for convenience.

### 📍 Geolocation
- Automatically detects the **user’s current location** using the device’s GPS.
- Displays live and accurate weather information for the detected area.

### 🔔 Push Notifications
- Integrated with **Firebase Cloud Messaging (FCM)** for real-time notifications.
- Notifies users about **severe weather alerts**, **hourly updates**, and **temperature changes**.
- Utilizes **Notifee** for advanced notification customization (optional).

### 🎨 Custom Theme and Styling
- Features a **modern and minimal UI** with **gradient backgrounds** and **custom fonts**.
- Uses a **consistent color palette** for a visually appealing and cohesive experience.

### 📱 Responsive Design
- Fully optimized for both **Android** and **iOS** devices.
- Supports **portrait** and **landscape** orientations, adapting dynamically to screen sizes.

### 🧭 State Management with Redux Toolkit
- Centralized state management for **weather data**, **user preferences**, and **API cache**.
- Ensures **high performance** and **predictable behavior** across the app.

### 💳 Payment Integration (Premium Features)
- Supports **in-app purchases** or **subscription models** for premium weather features.
- Allows users to **remove ads**, **unlock detailed forecasts**, or **access exclusive insights**.

### 💾 Local Storage with AsyncStorage
- Saves:
  - User preferences (theme, units, etc.)
  - Last fetched weather data (for offline access)
  - Recent search history
- Ensures basic functionality even without an internet connection.

### ⚠️ Error Handling & Alerts
- Displays user-friendly alerts for:
  - Invalid city names
  - Network or API failures
  - Missing GPS permissions

### 🌈 Weather Vector Icons
- Includes dynamic weather icons from libraries like **Ionicons**.
- Icons adjust automatically based on current weather conditions.

---

## 🧰 Tech Stack

| Category | Tools / Libraries |
|-----------|------------------|
| **Framework** | React Native |
| **State Management** | Redux Toolkit, RTK Query |
| **API** | OpenWeather / AccuWeather |
| **Notifications** | Firebase Cloud Messaging (FCM), Notifee |
| **Storage** | AsyncStorage |
| **Geolocation** | @react-native-community/geolocation  |
| **Payment Integration** | Stripe / In-App Purchases |
| **Icons** | Ionicons |
| **Navigation** | React Navigation v7 |

---

## ⚙️ Setup

```bash
# Clone the repository
git clone https://github.com/Nauman-Builds/Weather-Around.git

# Navigate to project directory
cd Weather-Around

# Install dependencies
yarn install

# Run the app
yarn android
# or
yarn ios
```

---

## 🧑‍💻 **Author**

**Muhammad Nauman Zafar**  
📱 *Mobile Application Developer* | React Native | Firebase | IoT Sensors | Google Maps SDK | TypeScript | Tailwind CSS | Android | iOS | JavaScript ES6  

**💼 Experience:** 3+ Years in Mobile App Development  
📧 **Email:** [nauman.zafar.123@gmail.com](mailto:nauman.zafar.123@gmail.com)  
🔗 **GitHub:** [Nauman-Builds](https://github.com/Nauman-Builds)  
🔗 **LinkedIn:** [Nauman Tech](https://linkedin.com/in/nauman-tech/)

---

## 📝 License
  
This project is created for **work demonstration and portfolio purposes** only.  
© 2025 Muhammad Nauman Zafar – All Rights Reserved.

---

> “Stay informed, stay prepared — Weather Around keeps you one step ahead of the storm.” 🌦️
