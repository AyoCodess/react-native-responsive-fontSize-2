import { Dimensions,PixelRatio,Platform } from "react-native"
import { isIphoneX } from "react-native-iphone-x-helper"
import { beforeEach,describe,expect,test,vi } from 'vitest'
import { RFPercentage,RFValue } from "../index"

vi.mock("react-native/Libraries/Utilities/Dimensions")
vi.mock("react-native/Libraries/Utilities/Platform",() => ({
  OS: "ios",
  select: () => null,
}))
vi.mock("react-native/Libraries/Utilities/PixelRatio",() => ({
  get: vi.fn(() => 2),
}))
vi.mock("react-native-iphone-x-helper")
vi.mock("react-native/Libraries/Components/StatusBar/StatusBar",() => ({
  currentHeight: 100,
}))

describe("react-native-responsive-fontsize",() => {
  beforeEach(() => {
    vi.clearAllMocks()
    Platform.OS = "ios"
  })

  describe("RFValue",() => {
    test("should return correct font size for non-notched iOS phones",() => {
      Dimensions.get.mockImplementation(() => ({ width: 375,height: 667 }))
      isIphoneX.mockReturnValue(false)
      expect(RFValue(16)).toBe(16)
    })

    test("should return adjusted font size for iPhone X (notched devices)",() => {
      Dimensions.get.mockImplementation(() => ({ width: 375,height: 812 }))
      isIphoneX.mockReturnValue(true)
      expect(RFValue(16)).toBe(18)
    })

    test("should handle landscape orientation correctly",() => {
      Dimensions.get.mockImplementation(() => ({ width: 812,height: 375 }))
      isIphoneX.mockReturnValue(true)
      expect(RFValue(16)).toBe(19)
    })

    test("should use tablet base height for Android tablets",() => {
      Platform.OS = "android"
      Dimensions.get.mockImplementation(() => ({ width: 1280,height: 800 }))
      PixelRatio.get.mockReturnValue(1.5)
      expect(RFValue(16)).toBe(9)
    })
  })

  describe("RFPercentage",() => {
    test("should calculate percentage-based font size for regular phones",() => {
      Dimensions.get.mockImplementation(() => ({ width: 375,height: 667 }))
      isIphoneX.mockReturnValue(false)
      expect(RFPercentage(3)).toBe(20)
    })

    test("should adjust percentage calculation for notched devices",() => {
      Dimensions.get.mockImplementation(() => ({ width: 375,height: 812 }))
      isIphoneX.mockReturnValue(true)
      expect(RFPercentage(3)).toBe(22)
    })

    test("should handle Android devices with status bar",() => {
      Platform.OS = "android"
      Dimensions.get.mockImplementation(() => ({ width: 360,height: 640 }))
      isIphoneX.mockReturnValue(false)
      expect(RFPercentage(3)).toBe(16)
    })
  })

  describe("Edge Cases",() => {
    test("should handle zero font size",() => {
      Dimensions.get.mockImplementation(() => ({ width: 375,height: 667 }))
      expect(RFValue(0)).toBe(0)
    })

    test("should handle very large font sizes",() => {
      Dimensions.get.mockImplementation(() => ({ width: 375,height: 667 }))
      expect(RFValue(100)).toBe(98)
    })

    test("should handle custom base heights",() => {
      Dimensions.get.mockImplementation(() => ({ width: 375,height: 667 }))
      expect(RFValue(16,800)).toBe(13)
    })
  })

  describe("Platform Specific",() => {
    test("should handle iOS tablets",() => {
      Dimensions.get.mockImplementation(() => ({ width: 1024,height: 1366 }))
      expect(RFValue(16)).toBe(32)
    })

    test("should handle Android tablets with low pixel density",() => {
      Platform.OS = "android"
      Dimensions.get.mockImplementation(() => ({ width: 1280,height: 800 }))
      PixelRatio.get.mockReturnValue(1.5)
      expect(RFValue(16)).toBe(9)
    })

    test("should handle Android phones with high pixel density",() => {
      Platform.OS = "android"
      Dimensions.get.mockImplementation(() => ({ width: 360,height: 640 }))
      PixelRatio.get.mockReturnValue(3)
      expect(RFValue(16)).toBe(15)
    })
  })
})
