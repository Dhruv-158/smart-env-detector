# Smart Environment Detector 🔍

<div align="center">

[![npm version](https://img.shields.io/npm/v/smart-env-detector.svg)](https://www.npmjs.com/package/smart-env-detector)
[![npm downloads](https://img.shields.io/npm/dm/smart-env-detector.svg)](https://www.npmjs.com/package/smart-env-detector)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/smart-env-detector.svg)](https://bundlephobia.com/package/smart-env-detector)

**A powerful, lightweight library for comprehensive environment detection in JavaScript applications**

*Detect platforms, capabilities, performance metrics, and accessibility features across all environments*

[📦 Install](#-installation) • [🚀 Quick Start](#-quick-start) • [📖 API Docs](#-api-reference) • [💡 Examples](#-examples) • [🤝 Contributing](#-contributing)

</div>

---

## 🌟 What Makes This Special?

Smart Environment Detector goes beyond basic platform detection to provide a complete picture of your application's runtime environment:

### 🔍 Comprehensive Detection

- **Platform Identification**: Browser, Node.js, Electron, React Native, Web Workers
- **Runtime Analysis**: Browser types, versions, JavaScript engines  
- **Capability Testing**: 17+ modern web APIs and features
- **Performance Metrics**: Memory, CPU, network, device characteristics

### 🚀 Developer Experience

- **Zero Dependencies**: Lightweight and self-contained
- **TypeScript First**: Full type definitions included
- **Smart Caching**: Configurable performance optimization
- **Cross-Platform**: Works everywhere JavaScript runs
- **Accessibility Aware**: Built-in a11y preference detection

---

## 📦 Installation

```bash
npm install smart-env-detector
```

## 🚀 Quick Start

```javascript
import { SmartEnvironmentDetector } from 'smart-env-detector';

const detector = new SmartEnvironmentDetector();
const env = detector.detect();

console.log('Platform:', env.platform);
console.log('Browser:', env.browser?.name);
console.log('Capabilities:', env.capabilities);
```

## 📖 API Reference

### SmartEnvironmentDetector

The main class for environment detection.

```typescript
const detector = new SmartEnvironmentDetector(options?);
```

#### Options

```typescript
interface SmartEnvironmentDetectorOptions {
  cache?: boolean;           // Enable caching (default: true)
  cacheTimeout?: number;     // Cache timeout in ms (default: 300000)
  enablePerformance?: boolean; // Include performance metrics (default: true)
}
```

#### Methods

##### `detect(): EnvironmentInfo`

Returns comprehensive environment information:

```typescript
interface EnvironmentInfo {
  platform: string;           // 'browser', 'node', 'electron', etc.
  runtime: RuntimeInfo;       // JavaScript engine details
  browser?: BrowserInfo;      // Browser-specific information
  node?: NodeInfo;           // Node.js-specific information
  capabilities: Capabilities; // Feature support detection
  performance: PerformanceInfo; // Performance metrics
  accessibility: AccessibilityInfo; // A11y preferences
  device: DeviceInfo;        // Device characteristics
  network?: NetworkInfo;     // Network information
}
```

##### `supports(feature: string): boolean`

Check if a specific feature is supported:

```javascript
detector.supports('webgl');        // true/false
detector.supports('websocket');    // true/false
detector.supports('touch');        // true/false
```

##### `getSummary(): string`

Get a human-readable summary:

```javascript
console.log(detector.getSummary());
// "Chrome 91 on Windows 10 with WebGL support"
```

## 💡 Examples

### Browser Feature Detection

```javascript
const detector = new SmartEnvironmentDetector();
const env = detector.detect();

if (env.capabilities.webgl) {
  // Initialize WebGL
}

if (env.capabilities.touch) {
  // Enable touch interactions
}

if (env.capabilities.offline) {
  // Setup offline functionality
}
```

### Performance-Aware Code

```javascript
const env = detector.detect();

if (env.performance.memory.available > 1024) {
  // Load high-quality assets
} else {
  // Load optimized assets
}

if (env.performance.cpu.cores >= 4) {
  // Enable multi-threaded processing
}
```

### Accessibility-Aware Design

```javascript
const env = detector.detect();

if (env.accessibility.prefersReducedMotion) {
  // Disable animations
}

if (env.accessibility.highContrast) {
  // Apply high contrast theme
}
```

### Cross-Platform Compatibility

```javascript
const env = detector.detect();

switch (env.platform) {
  case 'browser':
    // Browser-specific code
    break;
  case 'node':
    // Node.js-specific code
    break;
  case 'electron':
    // Electron-specific code
    break;
  case 'react-native':
    // React Native-specific code
    break;
}
```

## 🌐 Platform Support

| Platform | Support | Notes |
|----------|---------|-------|
| **Browsers** | ✅ Full | Chrome, Firefox, Safari, Edge |
| **Node.js** | ✅ Full | v14+ recommended |
| **Electron** | ✅ Full | Main and renderer processes |
| **React Native** | ✅ Full | iOS and Android |
| **Web Workers** | ✅ Full | Service Workers, Shared Workers |
| **Deno** | ✅ Partial | Core features available |

## 🔧 Configuration

### Caching

```javascript
// Disable caching
const detector = new SmartEnvironmentDetector({ cache: false });

// Custom cache timeout (5 minutes)
const detector = new SmartEnvironmentDetector({ 
  cacheTimeout: 300000 
});
```

### Performance Metrics

```javascript
// Disable performance metrics for faster detection
const detector = new SmartEnvironmentDetector({ 
  enablePerformance: false 
});
```

## 📊 Detection Capabilities

### Platform Detection
- Browser type and version
- Operating system
- JavaScript engine
- Runtime environment

### Feature Support
- WebGL and WebGL2
- WebAssembly
- Service Workers
- WebRTC
- Touch support
- Geolocation
- Camera/Microphone
- Local Storage
- IndexedDB
- WebSockets
- Fetch API
- CSS Grid
- CSS Flexbox
- And many more...

### Performance Metrics
- Available memory
- CPU core count
- Network connection type
- Screen resolution
- Device pixel ratio
- Viewport dimensions

### Accessibility Features
- Prefers reduced motion
- High contrast mode
- Screen reader detection
- Touch accommodation
- Color scheme preferences

## ⚡ Performance

- **Bundle Size**: ~13.7KB minified
- **Zero Dependencies**: No external dependencies
- **Fast Detection**: < 10ms typical detection time
- **Smart Caching**: Automatic result caching
- **Tree Shakable**: Import only what you need

## 🛡️ Security & Privacy

- **No Data Collection**: All detection happens locally
- **No Network Requests**: Completely offline capable
- **Privacy Focused**: Respects user privacy preferences
- **Secure by Default**: No sensitive information exposed

## 🤝 Contributing

We welcome contributions! Please feel free to submit issues and pull requests.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/Dhruv-158/smart-env-detector.git
cd smart-env-detector

# Install dependencies
npm install

# Run tests
npm test

# Build the project
npm run build
```

### Project Structure

```
smart-env-detector/
├── src/
│   ├── index.ts              # Main library
│   └── __tests__/
│       └── index.test.ts     # Test suite
├── docs/                     # Documentation site
├── examples/                 # Usage examples
└── dist/                     # Built files
```

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 📞 Support & Community

### Get Help

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/Dhruv-158/smart-env-detector/issues)
- 💡 **Feature Requests**: [GitHub Discussions](https://github.com/Dhruv-158/smart-env-detector/discussions)
- ❓ **Questions**: [Stack Overflow](https://stackoverflow.com/questions/tagged/smart-env-detector)

### Stay Updated

- ⭐ **Star** the repository to stay updated
- 👀 **Watch** for new releases and updates

---

## 🙏 Acknowledgments

- Inspired by the need for comprehensive environment detection in modern web development
- Built with accessibility, performance, and developer experience in mind
- Thanks to the open-source community for tools, feedback, and contributions

---

Made with ❤️ for developers who build amazing experiences across all platforms

[⭐ Star on GitHub](https://github.com/Dhruv-158/smart-env-detector) • [📦 NPM Package](https://www.npmjs.com/package/smart-env-detector) • [📖 Documentation](https://dhruv-158.github.io/smart-env-detector/)
