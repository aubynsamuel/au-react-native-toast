"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.showToast = void 0;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
class ToastManager {
    static subscribe(listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }
    static show(message, duration = 3000, pressToDismiss = true, containerStyle = {}, textStyle = {}) {
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
ToastManager.listeners = [];
const Toast = () => {
    const [toastInfo, setToastInfo] = (0, react_1.useState)(null);
    const fadeAnim = (0, react_1.useRef)(new react_native_1.Animated.Value(0)).current;
    const timeoutRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
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
    const showToast = (info) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setToastInfo(info);
        react_native_1.Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
        timeoutRef.current = setTimeout(() => {
            dismissToast();
        }, info.duration);
    };
    const dismissToast = () => {
        react_native_1.Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            setToastInfo(null);
        });
    };
    const handlePress = () => {
        if (toastInfo === null || toastInfo === void 0 ? void 0 : toastInfo.pressToDismiss) {
            dismissToast();
        }
    };
    if (!toastInfo)
        return null;
    return (<react_native_1.TouchableWithoutFeedback onPress={handlePress}>
      <react_native_1.Animated.View testID="toastContainer" style={[
            styles.toastContainer,
            { opacity: fadeAnim },
            toastInfo.containerStyle
        ]}>
        <react_native_1.Text style={[styles.toastText, toastInfo.textStyle]}>
          {toastInfo.message}
        </react_native_1.Text>
      </react_native_1.Animated.View>
    </react_native_1.TouchableWithoutFeedback>);
};
const styles = react_native_1.StyleSheet.create({
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
exports.showToast = ToastManager.show.bind(ToastManager);
exports.default = Toast;
//# sourceMappingURL=Toast.js.map