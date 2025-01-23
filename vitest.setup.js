import { vi } from 'vitest'

// Mock react-native
vi.mock('react-native',() => ({
  Dimensions: {
    get: vi.fn(() => ({ width: 375,height: 812 }))
  },
  Platform: {
    OS: 'ios',
    select: vi.fn(obj => obj.ios)
  },
  StatusBar: {
    currentHeight: 20
  },
  PixelRatio: {
    get: vi.fn(() => 2),
    getPixelSizeForLayoutSize: vi.fn(size => size * 2),
    roundToNearestPixel: vi.fn(size => size)
  }
}))

// Mock iphone-x-helper
vi.mock('react-native-iphone-x-helper',() => ({
  isIphoneX: vi.fn(() => false),
  getStatusBarHeight: vi.fn(() => 20),
  getBottomSpace: vi.fn(() => 0)
}))
