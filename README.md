Chat App 👋
A real-time mobile chat application built with Expo, React Native, and Expo Router.

Features
Real-time Messaging: Instant message delivery

Authentication: Secure user sign-up, login, and session persistence.

Direct & Group Chats: One-on-one private messaging and multi-user group channels.

Tech Stack
Frontend: React Native, Expo SDK, JS

Navigation: Expo Router (File-based routing)

Styling: NativeWind / Tailwind CSS

State Management: React Context

Backend / Database: Firebase 

Getting Started
Prerequisites
Ensure you have Node.js installed along with the Expo Go app on your iOS or Android mobile device (or an iOS Simulator / Android Emulator running on your machine).

1. Install Dependencies
Bash
npm install


Code snippet
EXPO_PUBLIC_API_URL=https://your-api-endpoint.com
EXPO_PUBLIC_SOCKET_SERVER=wss://your-websocket-server.com
2. Start the Development Server
Bash
npx expo start
In the terminal output, scan the QR code using the Expo Go app (Android) or the native Camera app (iOS), or select an option to run:

Press a for Android emulator

Press i for iOS simulator

Press w for Web browser


npm run ios - Opens the project on an iOS simulator.

npm run web - Runs the project in a desktop web browser.
