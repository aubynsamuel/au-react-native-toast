import React from 'react';
import { ViewStyle, TextStyle } from 'react-native';
import { ToastManagerListener } from './types';
declare class ToastManager {
    private static listeners;
    static subscribe(listener: ToastManagerListener): () => void;
    static show(message: string, duration?: number, pressToDismiss?: boolean, containerStyle?: ViewStyle, textStyle?: TextStyle): void;
}
declare const Toast: React.FC;
export declare const showToast: typeof ToastManager.show;
export default Toast;
