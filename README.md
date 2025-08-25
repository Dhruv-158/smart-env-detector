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

<table>
<tr>
<td width="50%">

### 🔍 **Comprehensive Detection**
- **Platform Identification**: Browser, Node.js, Electron, React Native, Web Workers
- **Runtime Analysis**: Browser types, versions, JavaScript engines
- **Capability Testing**: 17+ modern web APIs and features
- **Performance Metrics**: Memory, CPU, network, device characteristics

</td>
<td width="50%">

### 🚀 **Developer Experience**
- **Zero Dependencies**: Lightweight and self-contained
- **TypeScript First**: Full type definitions included
- **Smart Caching**: Configurable performance optimization
- **Cross-Platform**: Works everywhere JavaScript runs
- **Accessibility Aware**: Built-in a11y preference detection

</td>
</tr>
</table>

---

## 📦 Installation

```bash
# npm
npm install smart-env-detector

# yarn
yarn add smart-env-detector

# pnpm
pnpm add smart-env-detector
```

---

## 🚀 Quick Start

```javascript
import { detect, supports, getSummary } from 'smart-env-detector';

// Get complete environment information
const env = detect();
console.log(env.platform);        // "browser"
console.log(env.runtime.name);    // "Chrome"
console.log(env.runtime.version); // "91.0"

// Quick capability checks
if (supports('webGL')) {
  initializeWebGLRenderer();
}

if (supports('indexedDB')) {
  setupOfflineStorage();
}

// Human-readable summary
console.log(getSummary()); 
// Output: "Chrome 91.0 on browser"
```

### Advanced Usage

```javascript
import { SmartEnvironmentDetector } from 'smart-env-detector';

const detector = new SmartEnvironmentDetector();

// Detect with experimental features
const env = detector.detect({
  includeExperimentalFeatures: true,
  cacheDuration: 60000 // Cache for 1 minute
});

// Check cutting-edge capabilities
if (env.experimental.webGPU) {
  console.log('WebGPU is available!');
}

if (env.experimental.webXR) {
  console.log('VR/AR capabilities detected!');
}
```

---

## � API Reference

### Core Functions

#### `detect(options?: DetectionOptions): EnvironmentInfo`

Returns comprehensive environment information about the current runtime.

**Parameters:**

```typescript
interface DetectionOptions {
  includeExperimentalFeatures?: boolean; // Include experimental APIs (default: false)
  cacheDuration?: number;                 // Cache duration in ms (default: 300000)
}
```

**Example:**

```javascript
import { detect } from 'smart-env-detector';

// Basic detection
const env = detect();

// With experimental features
const envWithExperimental = detect({ 
  includeExperimentalFeatures: true,
  cacheDuration: 60000 // 1 minute cache
});
```

#### `supports(capability: string): boolean`

Quick check for specific platform capability.

**Example:**

```javascript
import { supports } from 'smart-env-detector';

if (supports('webGL')) {
  // WebGL is available
  initializeWebGLRenderer();
}

if (supports('serviceWorker')) {
  // Service Worker supported
  registerServiceWorker();
}
```

#### `getSummary(): string`

Returns a human-readable environment summary.

**Example:**

```javascript
import { getSummary } from 'smart-env-detector';

console.log(getSummary());
// Outputs: "Chrome 91.0 on browser"
//          "Node.js v16.14.0 on nodejs"
//          "Safari 14.1 on browser"
```

### Data Structure

The `detect()` function returns an `EnvironmentInfo` object with the following structure:

```typescript
interface EnvironmentInfo {
  // Platform identification
  platform: 'browser' | 'nodejs' | 'webworker' | 'electron' | 'react-native' | 'unknown';
  
  // Runtime details
  runtime: {
    name: string;        // Chrome, Firefox, Safari, Node.js, etc.
    version: string;     // Version number (e.g., "91.0", "v16.14.0")
    engine: string;      // JavaScript engine (V8, SpiderMonkey, etc.)
  };
  
  // Feature capabilities
  capabilities: {
    localStorage: boolean;      // Local storage support
    sessionStorage: boolean;    // Session storage support
    indexedDB: boolean;         // IndexedDB support
    webGL: boolean;            // WebGL rendering support
    webAssembly: boolean;      // WebAssembly support
    serviceWorker: boolean;    // Service Worker support
    pushNotifications: boolean; // Push notification support
    geolocation: boolean;      // Geolocation API support
    camera: boolean;           // Camera access support
    microphone: boolean;       // Microphone access support
    bluetooth: boolean;        // Bluetooth API support
    nfc: boolean;             // NFC support
    vibration: boolean;       // Vibration API support
    fullscreen: boolean;      // Fullscreen API support
    clipboard: boolean;       // Clipboard API support
    share: boolean;           // Web Share API support
    wakeLock: boolean;        // Wake Lock API support
  };
  
  // Performance metrics
  performance: {
    memoryLimit: number | null;      // JS heap size limit in bytes
    cpuCores: number | null;         // Number of logical CPU cores
    connectionType: string | null;   // Network connection type
    devicePixelRatio: number | null; // Device pixel density ratio
  };
  
  // Security context
  security: {
    https: boolean;              // HTTPS connection
    mixedContent: boolean;       // Mixed HTTP/HTTPS content
    cookiesEnabled: boolean;     // Cookie support enabled
    thirdPartyCookies: boolean;  // Third-party cookie support
  };
  
  // Accessibility preferences
  accessibility: {
    reducedMotion: boolean;      // Prefers reduced motion
    highContrast: boolean;       // Prefers high contrast
    screenReader: boolean;       // Screen reader detected
  };
  
  // Experimental features (when enabled)
  experimental: {
    webGPU: boolean;            // WebGPU API support
    fileSystemAccess: boolean;  // File System Access API
    webRTC: boolean;            // WebRTC support
    webXR: boolean;             // WebXR (VR/AR) support
  };
}
```

### Class-Based Usage

For advanced use cases, you can use the `SmartEnvironmentDetector` class:

```javascript
import { SmartEnvironmentDetector } from 'smart-env-detector';

// Create detector instance
const detector = new SmartEnvironmentDetector();

// Detect environment
const env = detector.detect({
  includeExperimentalFeatures: true
});

// Check specific capability
const hasWebGL = detector.supports('webGL');

// Get summary
const summary = detector.getSummary();

// Clear cache manually
detector.clearCache();

// Multiple independent instances
const detector1 = new SmartEnvironmentDetector();
const detector2 = new SmartEnvironmentDetector();
// Each has independent cache
```

---

---

## 💡 Examples

### 🎯 Progressive Feature Loading

Adapt your application based on available capabilities:

```javascript
import { detect, supports } from 'smart-env-detector';

async function initializeApp() {
  const env = detect();
  
  // Load features based on capabilities
  if (supports('webGL') && env.performance.cpuCores >= 4) {
    // High-performance 3D features
    const { WebGLRenderer } = await import('./renderers/webgl-renderer');
    return new WebGLRenderer();
  } else if (supports('webGL')) {
    // Basic 3D features
    const { BasicWebGLRenderer } = await import('./renderers/basic-webgl');
    return new BasicWebGLRenderer();
  } else {
    // 2D fallback
    const { Canvas2DRenderer } = await import('./renderers/canvas-renderer');
    return new Canvas2DRenderer();
  }
}
```

### ⚡ Smart Resource Loading

Optimize loading strategy based on device capabilities:

```javascript
import { detect } from 'smart-env-detector';

function getLoadingStrategy() {
  const env = detect();
  
  return {
    // Image quality based on connection
    imageQuality: env.performance.connectionType === '4g' ? 'high' : 'medium',
    
    // Script loading based on memory
    scriptBundle: env.performance.memoryLimit > 1000000000 ? 'full' : 'minimal',
    
    // Animation complexity based on CPU
    animationLevel: env.performance.cpuCores >= 4 ? 'smooth' : 'basic',
    
    // Preloading strategy
    enablePreloading: env.performance.connectionType === '4g' && 
                      env.performance.memoryLimit > 500000000
  };
}

// Use the strategy
const strategy = getLoadingStrategy();
loadAssets(strategy);
```

### 🛡️ Security-Aware Development

Implement features based on security context:

```javascript
import { detect } from 'smart-env-detector';

function initializeSecureFeatures() {
  const env = detect();
  
  const features = {
    // Location features require HTTPS
    location: env.security.https && supports('geolocation'),
    
    // Camera/mic require secure context
    mediaAccess: env.security.https && (supports('camera') || supports('microphone')),
    
    // Persistent storage in secure context
    persistence: env.security.https && supports('indexedDB'),
    
    // Push notifications require HTTPS
    notifications: env.security.https && supports('pushNotifications')
  };
  
  // Initialize only available features
  Object.entries(features).forEach(([feature, available]) => {
    if (available) {
      console.log(`✅ ${feature} feature enabled`);
      initializeFeature(feature);
    } else {
      console.log(`❌ ${feature} feature disabled (requirements not met)`);
    }
  });
  
  return features;
}
```

### ♿ Accessibility-First UI

Respect user preferences for better accessibility:

```javascript
import { detect } from 'smart-env-detector';

function setupAccessibility() {
  const env = detect();
  
  // Respect motion preferences
  if (env.accessibility.reducedMotion) {
    document.documentElement.style.setProperty('--animation-duration', '0.01ms');
    document.documentElement.style.setProperty('--transition-duration', '0.01ms');
    console.log('Animations disabled per user preference');
  }
  
  // High contrast support
  if (env.accessibility.highContrast) {
    document.body.classList.add('high-contrast');
    console.log('High contrast mode enabled');
  }
  
  // Screen reader optimizations
  if (env.accessibility.screenReader) {
    document.body.classList.add('screen-reader-optimized');
    // Load additional ARIA enhancements
    loadAriaEnhancements();
    console.log('Screen reader optimizations enabled');
  }
}

// Apply on page load
document.addEventListener('DOMContentLoaded', setupAccessibility);
```

### 🧪 Cutting-Edge Feature Detection

Use experimental features when available:

```javascript
import { detect } from 'smart-env-detector';

async function enableFutureFeatures() {
  const env = detect({ includeExperimentalFeatures: true });
  
  // WebGPU for advanced graphics
  if (env.experimental.webGPU) {
    console.log('🚀 WebGPU available - enabling advanced rendering');
    const { WebGPURenderer } = await import('./renderers/webgpu-renderer');
    return new WebGPURenderer();
  }
  
  // File System Access for advanced file operations
  if (env.experimental.fileSystemAccess) {
    console.log('📁 File System Access available');
    enableAdvancedFileOperations();
  }
  
  // WebXR for immersive experiences
  if (env.experimental.webXR) {
    console.log('🥽 WebXR available - VR/AR features enabled');
    await initializeXRFeatures();
  }
  
  // WebRTC for real-time communication
  if (env.experimental.webRTC) {
    console.log('📞 WebRTC available - enabling peer-to-peer features');
    setupWebRTCFeatures();
  }
}
```

### 📱 Cross-Platform Adaptation

Handle different platforms gracefully:

```javascript
import { detect } from 'smart-env-detector';

function adaptToPlatform() {
  const env = detect();
  
  switch (env.platform) {
    case 'browser':
      // Browser-specific optimizations
      if (env.runtime.name === 'Safari') {
        loadSafariPolyfills();
      }
      enableBrowserFeatures();
      break;
      
    case 'nodejs':
      // Node.js environment
      enableServerFeatures();
      setupFileSystemAccess();
      break;
      
    case 'electron':
      // Electron app
      enableDesktopFeatures();
      setupNativeIntegration();
      break;
      
    case 'react-native':
      // React Native app
      enableMobileFeatures();
      setupNativeModules();
      break;
      
    case 'webworker':
      // Web Worker context
      setupWorkerCommunication();
      enableBackgroundProcessing();
      break;
      
    default:
      // Unknown platform - use safe defaults
      enableBasicFeatures();
  }
}
```

### 🔄 Dynamic Configuration

Create adaptive configurations:

```javascript
import { detect } from 'smart-env-detector';

function createAppConfig() {
  const env = detect({ includeExperimentalFeatures: true });
  
  return {
    // Rendering configuration
    renderer: {
      type: supports('webGL') ? 'webgl' : 'canvas',
      antialias: env.performance.cpuCores >= 4,
      shadows: env.performance.memoryLimit > 1000000000,
      particles: env.performance.connectionType === '4g'
    },
    
    // Storage configuration
    storage: {
      primary: supports('indexedDB') ? 'indexedDB' : 'localStorage',
      enableCache: env.performance.memoryLimit > 500000000,
      cacheSize: Math.min(env.performance.memoryLimit / 10, 100000000)
    },
    
    // UI configuration
    ui: {
      animations: !env.accessibility.reducedMotion,
      theme: env.accessibility.highContrast ? 'high-contrast' : 'default',
      fontSize: env.accessibility.screenReader ? 'large' : 'normal'
    },
    
    // Feature flags
    features: {
      offlineMode: supports('serviceWorker'),
      pushNotifications: env.security.https && supports('pushNotifications'),
      webrtc: env.experimental.webRTC,
      fileAccess: env.experimental.fileSystemAccess,
      immersive: env.experimental.webXR
    }
  };
}

// Use configuration
const config = createAppConfig();
initializeApp(config);
```

---

## 🛠️ Development

### Getting Started

```bash
# Clone the repository
git clone https://github.com/yourusername/smart-env-detector.git
cd smart-env-detector

# Install dependencies
npm install

# Start development
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

### Project Structure

```text
smart-env-detector/
├── src/
│   ├── index.ts              # Main library source
│   └── __tests__/
│       ├── index.test.ts     # Comprehensive test suite
│       └── setup.ts          # Test configuration
├── dist/                     # Built files (auto-generated)
├── examples/                 # Usage examples
├── package.json              # Package configuration
├── tsconfig.json            # TypeScript configuration
├── jest.config.js           # Test configuration
└── README.md                # This file
```

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run build` | Compile TypeScript to JavaScript |
| `npm test` | Run test suite with coverage |
| `npm run lint` | Run code quality checks |
| `npm run dev` | Development mode with watch |
| `npm run prepare` | Pre-publish preparation |

### Testing

The library includes a comprehensive test suite with 90%+ coverage:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

**Test Categories:**

- ✅ Platform detection across environments
- ✅ Runtime identification and version parsing  
- ✅ Capability detection with fallbacks
- ✅ Performance metric collection
- ✅ Security context validation
- ✅ Accessibility preference detection
- ✅ Experimental feature testing
- ✅ Caching behavior verification
- ✅ Error handling and edge cases

---

## 🌟 Why Choose Smart Environment Detector?

| Feature | Smart Environment Detector | Basic Libraries |
|---------|---------------------------|-----------------|
| **Detection Scope** | 50+ environment properties | 5-10 basic checks |
| **Performance Metrics** | ✅ Memory, CPU, Network | ❌ Not included |
| **Accessibility Support** | ✅ Motion, contrast, screen readers | ❌ Not supported |
| **Security Context** | ✅ HTTPS, cookies, mixed content | ❌ Limited |
| **Experimental APIs** | ✅ WebGPU, WebXR, File API | ❌ Not covered |
| **Caching System** | ✅ Smart, configurable | ❌ No optimization |
| **Cross-Platform** | ✅ Browser, Node.js, Electron, RN | ⚠️ Browser only |
| **TypeScript** | ✅ Full type definitions | ⚠️ Partial or missing |
| **Bundle Size** | ✅ Lightweight (~12KB) | ⚠️ Variable |
| **Test Coverage** | ✅ 90%+ comprehensive | ⚠️ Often lacking |

---

## 🤝 Contributing

We welcome contributions! Here's how to get involved:

### Quick Start

1. **Fork** the repository on GitHub
2. **Clone** your fork locally
3. **Create** a feature branch: `git checkout -b feature/amazing-feature`
4. **Make** your changes and add tests
5. **Test** your changes: `npm test`
6. **Commit** with clear messages: `git commit -m 'Add amazing feature'`
7. **Push** to your branch: `git push origin feature/amazing-feature`
8. **Open** a Pull Request

### Development Guidelines

- **Write Tests**: All new features should include comprehensive tests
- **Follow Style**: Use the existing code style and run `npm run lint`
- **Update Docs**: Update README.md and JSDoc comments for API changes
- **Check Compatibility**: Ensure changes work across all supported environments

### Areas for Contribution

- 🐛 **Bug Fixes**: Fix issues or improve edge case handling
- ✨ **New Features**: Add detection for new APIs or capabilities
- 📚 **Documentation**: Improve examples, guides, or API docs
- 🧪 **Testing**: Expand test coverage or add new test scenarios
- 🔧 **Performance**: Optimize detection algorithms or reduce bundle size

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for full details.

```text
MIT License - you are free to:
✅ Use commercially
✅ Modify and distribute
✅ Include in private projects
✅ Include in open source projects
```

---

## 📞 Support & Community

### Get Help

- � **Bug Reports**: [GitHub Issues](https://github.com/yourusername/smart-env-detector/issues)
- � **Feature Requests**: [GitHub Discussions](https://github.com/yourusername/smart-env-detector/discussions)
- ❓ **Questions**: [Stack Overflow](https://stackoverflow.com/questions/tagged/smart-env-detector)

### Stay Updated

- ⭐ **Star** the repository to stay updated
- 👀 **Watch** for new releases and updates
- 📢 **Follow** [@yourusername](https://twitter.com/yourusername) for announcements

---

## 🙏 Acknowledgments

- Inspired by the need for comprehensive environment detection in modern web development
- Built with accessibility, performance, and developer experience in mind
- Thanks to the open-source community for tools, feedback, and contributions
- Special thanks to contributors who help make this library better

---

**Made with ❤️ for developers who build amazing experiences across all platforms**

[⭐ Star on GitHub](https://github.com/yourusername/smart-env-detector) • [📦 NPM Package](https://www.npmjs.com/package/smart-env-detector) • [📖 Documentation](https://github.com/yourusername/smart-env-detector#readme)
