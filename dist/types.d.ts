import { ViewStyle, TextStyle } from 'react-native';
export interface ToastOptions {
    message: string;
    duration?: number;
    pressToDismiss?: boolean;
    containerStyle?: ViewStyle;
    textStyle?: TextStyle;
}
export interface ToastManagerListener {
    (options: ToastOptions): void;
}
