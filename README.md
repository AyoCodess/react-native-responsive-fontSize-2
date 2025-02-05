# React Native Responsive Font Size

A utility for responsive font scaling in React Native applications, with improved support for modern devices including notched phones and tablets.

## Features

- 📱 Responsive font scaling based on device height
- 📏 Percentage-based and value-based scaling options
- 🎯 Precise handling of notched devices (iPhone X+)
- 💪 Robust tablet support for both iOS and Android
- 🔄 Landscape/Portrait orientation support
- 📝 TypeScript support

## Installation

```bash
npm install react-native-responsive-fontsize-2
# or
yarn add react-native-responsive-fontsize-2
```

## Usage

```javascript
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

// Percentage based
<Text style={{ fontSize: RFPercentage(3) }}>
  This text is 3% of screen height
</Text>

// Value based (using default base height of 680)
<Text style={{ fontSize: RFValue(16) }}>
  This text scales based on device height
</Text>

// Value based with custom base height
<Text style={{ fontSize: RFValue(16, 800) }}>
  This text uses a custom base height
</Text>
```

## API

### RFPercentage(percent: number)
Returns a font size that is `percent` percent of the screen height.

### RFValue(fontSize: number, standardScreenHeight?: number)
Returns a font size scaled relative to a standard screen height (default: 680).

## Device Support

- iOS Phones (including notched devices)
- Android Phones
- iOS Tablets (iPad)
- Android Tablets
- Handles both portrait and landscape orientations

## How It Works

The library uses different scaling strategies based on device type:

- Regular phones: Direct scaling based on screen height
- Notched iOS devices: 0.92x scaling factor in portrait mode
- Android devices: 15% height reduction for status bar
- Tablets: Special scaling using tablet base height (0.6x factor)

## Contributing

Pull requests are welcome! Please read our contributing guidelines before getting started.

## License

MIT

<img src="images/main.png" alt="main image">

# react-native-responsive-fontsize

[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen.svg)](https://github.com/heyman333/react-native-responsive-fontSize/pulls)
[![Platform](https://img.shields.io/badge/platform-react--native-lightgrey.svg)](http://facebook.github.io/react-native/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/heyman333/react-native-responsive-fontSize/blob/master/LICENSE) [![Greenkeeper badge](https://badges.greenkeeper.io/heyman333/react-native-responsive-fontSize.svg)](https://greenkeeper.io/)
<a href="https://www.npmjs.com/package/react-native-responsive-fontsize">
<img alt="npm version" src="http://img.shields.io/npm/v/react-native-responsive-fontsize.svg?style=flat-square">
</a>
<a href="https://www.npmjs.com/package/react-native-responsive-fontsize">
<img src="http://img.shields.io/npm/dm/react-native-responsive-fontsize.svg?style=flat-square">
</a>

<strong>Use this library if you have a small problem with the font size 🎉</strong>

<hr />

#### How to install

```shell
yarn add react-native-responsive-fontsize-2
# or
npm install react-native-responsive-fontsize-2 --save
```

#### How it looks on different device sizes

|                                                               iPhone SE                                                                |                                                               iPhone X                                                                |
| :------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://raw.githubusercontent.com/heyman333/react-native-responsive-fontSize/master/images/SE.png" width="320" height="568"> | <img src="https://raw.githubusercontent.com/heyman333/react-native-responsive-fontSize/master/images/X.png" width="385" height="812"> |

#### Methods

|              |                  arguments                   | Description                                                                                         |
| :----------: | :------------------------------------------: | --------------------------------------------------------------------------------------------------- |
| RFPercentage |               percent: number                | The font size is calculated as a percentage of the height(`width` in landscape mode) of the device. |
|   RFValue    | value: number, standardScreenHeight?: number | The font size is calculated based on standardScreenHeight and passed value                          |

- when using `RFValue`'s `standardScreenHeight`
  - default standardScreenHeight is `680`
  - In landscape mode, please pass the `screen width`

#### Usage

```js
import { RFPercentage, RFValue } from "react-native-responsive-fontsize-2";

const styles = StyleSheet.create({
  welcome: {
    fontSize: RFValue(24, 580) // second argument is standardScreenHeight(optional),
    textAlign: "center",
    margin: 10,
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
    fontSize: RFPercentage(5),
  },
});
```

#### Changelog

[releases](https://github.com/heyman333/react-native-responsive-fontSize/releases)
