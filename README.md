<div align="center">
      
# React Native Toast Message Component

A lightweight, highly customizable toast message component for React Native applications.

</div>

## ✨ Features

- 🚀 Simple and Lightweight
- 🎨 Fully Customizable Styles
- 👆 Tap-to-Dismiss Functionality
- 📦 No dependencies
- 🌍 Global Toast Manager
- 📱 Compatible with React Native

<div align="center">
      <img src="screenshots/toastMessage.png" width="200" alt="Toast Message Screenshot" />
</div>

## 🚀 Installation

Install the package using npm or yarn:

```bash
# npm
npm install au-react-native-toast
```

```bash
# Yarn
yarn add au-react-native-toast
```

## 🛠 Usage

### You can try our example snack in your Expo Go app here: <https://snack.expo.dev/@aubynsamuel04/toast-message>

### Step 1: Import Toast Component

Place the `Toast` component anywhere in your app

```jsx
import React from 'react';
import { Toast } from 'au-react-native-toast';

const App = () => (
  <View style={{flex: 1}}>
    {/* Your app components */}
    <Toast />
  <View/>
);

export default App;
```

### Step 2: Show Toast Messages

Use the `showToast` function to display messages:

```jsx
import { showToast } from "au-react-native-toast";

// Basic usage
showToast("Hello, World!");

// With custom duration
showToast("Important message", 5000);

// With custom styles
showToast(
  "Success!",
  3000,
  true,
  { backgroundColor: "green" },
  { color: "white", fontWeight: "bold" }
);
```

## Full Example

```jsx
import { Button, View, StyleSheet } from "react-native";
import { Toast, showToast } from "au-react-native-toast";

const App = () => {
  return (
    <>
      <View style={styles.container}>
        <Button
          title="Show Toast"
          onPress={() => showToast("Toast Message!", 3000, true)}
        />
      </View>
      <Toast />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default App;
```

## 📝 API

### `showToast(message, duration?, pressToDismiss?, containerStyle?, textStyle?)`

| Parameter        | Type      | Default  | Description                              |
| ---------------- | --------- | -------- | ---------------------------------------- |
| `message`        | `string`  | Required | The text to display in the toast         |
| `duration`       | `number`  | `3000`   | Time to show the toast (in milliseconds) |
| `pressToDismiss` | `boolean` | `true`   | Allow dismissing toast by tapping        |
| `containerStyle` | `object`  | `{}`     | Custom container styles                  |
| `textStyle`      | `object`  | `{}`     | Custom text styles                       |

## 🎨 Customization

You can fully customize the toast appearance:

```jsx
showToast(
  "Custom Style",
  3000,
  true,
  {
    backgroundColor: "rgba(0,0,0,0.8)",
    borderRadius: 10,
  },
  {
    color: "yellow",
    fontSize: 16,
    fontWeight: "500",
  }
);
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

Made with ❤️ by Samuel Aubyn
