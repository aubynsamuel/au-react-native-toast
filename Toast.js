import { useState, useEffect, useRef } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
} from "react-native";

// Create a global state manager for toast
class ToastManager {
  static listeners = [];

  static subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  static show(message, duration = 3000, pressToDismiss = true, containerStyle = {}, textStyle = {},) {
    this.listeners.forEach((listener) => {
      listener({
        message,
        duration,
        pressToDismiss,
        containerStyle,
        textStyle,
      });
    });
  }
}

const Toast = () => {
  const [toastInfo, setToastInfo] = useState(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const timeoutRef = useRef(null);

  useEffect(() => {
    // Subscribe to toast events
    const unsubscribe = ToastManager.subscribe((info) => {
      // Show the toast
      showToast(info);
    });

    // Cleanup subscription
    return () => {
      unsubscribe();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const showToast = (info) => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set the new toast info
    setToastInfo(info);

    // Animate toast in
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Set timeout to hide toast
    timeoutRef.current = setTimeout(() => {
      dismissToast();
    }, info.duration);
  };

  const dismissToast = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setToastInfo(null);
    });
  };

  const handlePress = () => {
    if (toastInfo?.pressToDismiss) {
      dismissToast();
    }
  };

  // Render nothing if no toast
  if (!toastInfo) return null;

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <Animated.View testID={"toastContainer"}
        style={[styles.toastContainer, { opacity: fadeAnim }, toastInfo.containerStyle]}
      >
        <Text style={[styles.toastText, toastInfo.textStyle]}>{toastInfo.message}</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: "absolute",
    bottom: 50,
    left: "15%",
    right: "15%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 3,
  },
  toastText: {
    color: "#fff",
    fontSize: 17,
    textAlign: "center",
  },
});

// Export the ToastManager for showing toasts
export const showToast = ToastManager.show.bind(ToastManager);

export default Toast;
