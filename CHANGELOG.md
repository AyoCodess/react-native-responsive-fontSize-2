# Changelog

## [2.0.0] - 2025

### Major Changes
- Complete rewrite of scaling calculations for better accuracy
- Improved tablet detection logic
- Enhanced notch handling for modern iOS devices

### Added
- Better handling of Android status bar heights
- Improved landscape mode support
- Detailed code comments explaining calculations

### Changed
- Simplified scaling factors for better predictability:
  - iPhone X notch adjustment: 0.92x scaling in portrait mode
  - Android status bar: 15% height reduction
  - Android tablets: 0.6x scaling factor
- Improved portrait/landscape detection
- More consistent calculations between RFValue and RFPercentage

### Fixed
- More accurate font scaling on iPhone X and notched devices
- Better tablet detection using screen diagonal calculation
- Consistent behavior between iOS and Android
- Improved handling of edge cases (zero font size, very large screens)

### Technical Improvements
- Removed redundant calculations
- Better code organization with clear constants
- More efficient screen dimension handling
- Improved type safety with TypeScript definitions

### Constants
- Added standardized screen constants:
  - PHONE_BASE_HEIGHT: 680 (Standard 5" phone)
  - TABLET_BASE_HEIGHT: 1426 (Standard tablet)
  - TABLET_MIN_DP: 1100 (7" tablet threshold)
  - IOS_NOTCH_HEIGHT: 78 (iPhone X+ notch) 
