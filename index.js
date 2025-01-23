import { Dimensions, PixelRatio, Platform } from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";

/**
 * Default screen heights for different device types
 * Used for scaling calculations
 */
const SCREEN_CONSTANTS = {
  PHONE_BASE_HEIGHT: 680, // Standard 5" phone screen height
  TABLET_BASE_HEIGHT: 1426, // Standard tablet screen height
  TABLET_MIN_DP: 1100, // Minimum diagonal size for tablets (~7 inches)
  IOS_NOTCH_HEIGHT: 78, // iPhone X+ notch height in portrait
};

/**
 * Determines if the current device is a tablet based on screen dimensions
 * iOS: Uses standard 1024pt width/height threshold (iPad standard)
 * Android: Uses a combination of screen size and density
 * @returns {boolean} True if device is a tablet
 */
function isTablet() {
  const { height, width } = Dimensions.get("window");

  // iOS tablet detection (iPad)
  if (Platform.OS === "ios") {
    const dimension = Math.max(width, height);
    return dimension >= 1024;
  }

  // Android tablet detection
  const pixelDensity = PixelRatio.get();
  const screenDiagonalDP = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
  return screenDiagonalDP >= SCREEN_CONSTANTS.TABLET_MIN_DP && pixelDensity < 2;
}

/**
 * Calculates responsive font size based on screen percentage
 * @param {number} percent - Font size as percentage of screen height
 * @returns {number} Calculated font size in pixels (rounded)
 */
export function RFPercentage(percent) {
  const { height, width } = Dimensions.get("window");
  const isPortrait = height > width;
  const standardLength = isPortrait ? height : width;

  let deviceHeight = standardLength;

  if (isPortrait) {
    if (Platform.OS === "ios" && isIphoneX()) {
      deviceHeight = standardLength * 0.92; // Adjust for iPhone X notch
    } else if (Platform.OS === "android") {
      deviceHeight = standardLength * 0.85; // Reduce height by 15% for Android status bar
    }
  }

  return Math.round((percent * deviceHeight) / 100);
}

/**
 * Calculates responsive font size based on reference device height
 * @param {number} fontSize - Base font size for reference device
 * @param {number} standardScreenHeight - Reference device height (default: PHONE_BASE_HEIGHT)
 * @returns {number} Calculated font size in pixels (rounded)
 */
export function RFValue(
  fontSize,
  standardScreenHeight = SCREEN_CONSTANTS.PHONE_BASE_HEIGHT
) {
  if (fontSize === 0) return 0;

  const { height, width } = Dimensions.get("window");
  const isPortrait = height > width;
  const standardLength = isPortrait ? height : width;

  // For Android tablets, use tablet base height and additional scaling
  if (Platform.OS === "android" && isTablet()) {
    standardScreenHeight = SCREEN_CONSTANTS.TABLET_BASE_HEIGHT;
    return Math.round(
      ((fontSize * standardLength) / standardScreenHeight) * 0.6
    );
  }

  // For iPhone X, use a slight scaling factor instead of height reduction
  if (Platform.OS === "ios" && isIphoneX() && isPortrait) {
    return Math.round(
      ((fontSize * standardLength) / standardScreenHeight) * 0.92
    );
  }

  return Math.round((fontSize * standardLength) / standardScreenHeight);
}
