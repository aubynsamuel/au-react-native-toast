import React from "react";
import { render, act, fireEvent } from "@testing-library/react-native";
import { showToast } from "../../components/ToastMessage";
import Toast from "../../components/ToastMessage";

// Mock timer functions
jest.useFakeTimers();

describe("Toast Component", () => {
  // Utility function to render the Toast component
  const renderToast = () => {
    return render(
      <>
        <Toast />
      </>
    );
  };

  // Reset toast manager between tests
  beforeEach(() => {
    jest.clearAllTimers();
  });

  // Basic Rendering Tests
  describe("Basic Rendering", () => {
    it("should not render when no toast is shown", () => {
      const { queryByText } = renderToast();
      expect(queryByText(/./)).toBeNull();
    });

    it("should render toast with correct message", () => {
      const { getByText } = renderToast();

      act(() => {
        showToast("Test Message");
      });

      expect(getByText("Test Message")).toBeTruthy();
    });
  });

  // Duration Behavior Tests
  describe("Duration Behavior", () => {
    it("should automatically dismiss after default duration", () => {
      const { getByText, queryByText } = renderToast();

      act(() => {
        showToast("Temporary Toast");
        // Advance timers by default duration (3000ms)
        jest.advanceTimersByTime(3300);
      });

      expect(queryByText("Temporary Toast")).toBeNull();
    });

    it("should dismiss after custom duration", () => {
      const { getByText, queryByText } = renderToast();

      act(() => {
        showToast("Custom Duration Toast", 5000);
        // Advance timers by custom duration
        jest.advanceTimersByTime(5300);
      });

      expect(queryByText("Custom Duration Toast")).toBeNull();
    });
  });

  // Dismiss Behavior Tests
  describe("Dismiss Behavior", () => {
    it("should dismiss when pressed if pressToDismiss is true", () => {
      const { getByText, queryByText } = renderToast();

      act(() => {
        showToast("Dismissible Toast", 3000, true);
      });

      const toast = getByText("Dismissible Toast");

      act(() => {
        fireEvent.press(toast);
        jest.runAllTimers();
      });

      expect(queryByText("Dismissible Toast")).toBeNull();
    });

    it("should not dismiss when pressed if pressToDismiss is false", () => {
      const { getByText, queryByText } = renderToast();

      act(() => {
        showToast("Non-Dismissible Toast", 3000, false);
      });

      const toast = getByText("Non-Dismissible Toast");

      act(() => {
        fireEvent.press(toast);
      });

      // Since pressToDismiss is false, the toast should remain
      expect(queryByText("Non-Dismissible Toast")).not.toBeNull();
    });
  });

  // Style Application Tests
  describe("Style Application", () => {
    it("should apply custom styles to Toast Container", () => {
      const customStyle = {
        backgroundColor: "red",
        borderRadius: 10,
      };

      const { getByTestId } = renderToast();

      act(() => {
        showToast("Toast Container Styles", 3000, true, customStyle, {});
      });

      const toastContainer = getByTestId("toastContainer");

      // Check if custom styles are included in the style array
      // Flatten and normalize styles
      const combinedStyle = Array.isArray(toastContainer.props.style)
        ? Object.assign(
            {},
            ...toastContainer.props.style.map((style) =>
              typeof style === "object" ? style : {}
            )
          )
        : toastContainer.props.style;

      // Check if the custom styles are applied
      expect(combinedStyle).toMatchObject(customStyle);
    });

    it("should apply custom styles to toast text message", () => {
      const customStyle = {
        color: "red",
        borderRadius: 10,
      };

      const { getByText } = renderToast();

      act(() => {
        showToast("Styled Toast", 3000, true, {}, customStyle);
      });

      const toastText = getByText("Styled Toast");

      // Check if custom styles are included in the style array
      const combinedTextStyle = toastText.props.style;
      expect(combinedTextStyle).toContainEqual(
        expect.objectContaining(customStyle)
      );
    });
  });

  // Multiple Toast Scenarios
  describe("Multiple Toast Scenarios", () => {
    it("should handle multiple toast calls", () => {
      const { getByText, queryByText } = renderToast();

      act(() => {
        showToast("First Toast", 1000);
        showToast("Second Toast", 2000);
      });

      // First toast should disappear quickly
      act(() => {
        jest.advanceTimersByTime(1300);
      });

      expect(queryByText("First Toast")).toBeNull();
      expect(getByText("Second Toast")).toBeTruthy();

      // Second toast should also disappear
      act(() => {
        jest.advanceTimersByTime(2300);
      });

      expect(queryByText("Second Toast")).toBeNull();
    });
  });

  // Edge Case Tests
  describe("Edge Cases", () => {
    it("should handle empty message", () => {
      const { queryByText } = renderToast();

      act(() => {
        showToast("");
      });

      expect(queryByText(/./)).toBeNull();
    });

    it("should handle very long messages", () => {
      const longMessage = "A".repeat(500);
      const { getByText } = renderToast();

      act(() => {
        showToast(longMessage);
      });

      expect(getByText(longMessage)).toBeTruthy();
    });
  });

  // Performance and Cleanup Tests
  describe("Performance and Cleanup", () => {
    it("should clean up timers on unmount", () => {
      const clearTimeoutSpy = jest.spyOn(global, "clearTimeout");

      const { unmount } = renderToast();

      act(() => {
        showToast("Cleanup Test");
        unmount();
      });

      expect(clearTimeoutSpy).toHaveBeenCalled();
      clearTimeoutSpy.mockRestore();
    });
  });
});
