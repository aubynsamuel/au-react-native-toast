import React, { useState, useEffect, useRef } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  ViewStyle,
  TextStyle
} from 'react-native';
import { ToastOptions, ToastManagerListener } from './types';

class ToastManager {
  private static listeners: ToastManagerListener[] = [];

  static subscribe(listener: ToastManagerListener): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  static show(
    message: string, 
    duration: number = 3000, 
    pressToDismiss: boolean = true, 
    containerStyle: ViewStyle = {}, 
    textStyle: TextStyle = {}
  ): void {
    this.listeners.forEach(listener => {
      listener({
        message,
        duration,
        pressToDismiss,
        containerStyle,
        textStyle
      });
    });
  }
}

const Toast: React.FC = () => {
  const [toastInfo, setToastInfo] = useState<ToastOptions | null>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const unsubscribe = ToastManager.subscribe((info) => {
      showToast(info);
    });

    return () => {
      unsubscribe();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const showToast = (info: ToastOptions) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setToastInfo(info);

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

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

  if (!toastInfo) return null;

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <Animated.View 
        testID="toastContainer"
        style={[
          styles.toastContainer, 
          { opacity: fadeAnim }, 
          toastInfo.containerStyle
        ]}
      >
        <Text style={[styles.toastText, toastInfo.textStyle]}>
          {toastInfo.message}
        </Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    bottom: 50,
    left: '15%',
    right: '15%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 3,
  },
  toastText: {
    color: '#fff',
    fontSize: 17,
    textAlign: 'center',
  },
});

export const showToast = ToastManager.show.bind(ToastManager);
export default Toast;