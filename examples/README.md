# Smart Environment Detector - Examples

This directory contains comprehensive examples demonstrating how to use Smart Environment Detector in different scenarios.

## 📁 Files

- **`usage-examples.js`** - Node.js/CommonJS examples
- **`../docs/examples.html`** - Browser-based interactive examples
- **`README.md`** - This file

## 🚀 Running Examples

### Node.js Examples

```bash
cd examples
node usage-examples.js
```

### Browser Examples

1. **Open the interactive demo:**
   ```bash
   cd docs
   python -m http.server 8080
   # Open http://localhost:8080/examples.html
   ```

2. **Or view the main documentation site:**
   ```bash
   # Open http://localhost:8080
   ```

## 📚 Example Categories

### 1. Basic Usage
- Simple environment detection
- Quick capability checks
- Getting environment summary

### 2. Advanced Features
- Platform-specific adaptations
- Progressive feature loading
- Performance-based optimizations

### 3. Security & Accessibility
- Secure context detection
- Accessibility preference handling
- Privacy-aware features

### 4. Experimental APIs
- Cutting-edge feature detection
- WebGPU, WebXR, File System Access
- Future-proof implementations

### 5. Error Handling
- Robust detection patterns
- Fallback strategies
- Performance monitoring

## 🛠️ Integration Patterns

### React/Vue Components
```javascript
import { detect, supports } from 'smart-env-detector';

function MyComponent() {
  const env = detect();
  
  return (
    <div>
      {supports('webGL') ? 
        <AdvancedRenderer /> : 
        <BasicRenderer />}
    </div>
  );
}
```

### Progressive Enhancement
```javascript
const env = detect();

if (env.performance.cpuCores >= 4 && supports('webGL')) {
  loadHighPerformanceFeatures();
} else {
  loadOptimizedFeatures();
}
```

### Accessibility First
```javascript
const env = detect();

if (env.accessibility.reducedMotion) {
  disableAnimations();
}

if (env.accessibility.highContrast) {
  enableHighContrastMode();
}
```

## 🎯 Use Cases

### Web Applications
- **Progressive Web Apps** - Feature detection for offline capabilities
- **Gaming** - Performance-based rendering optimization
- **Media Apps** - Codec and hardware support detection
- **Accessibility Tools** - User preference detection

### Development Tools
- **Build Optimization** - Environment-specific bundling
- **Testing** - Cross-platform test automation
- **Analytics** - Environment tracking and insights
- **Performance** - Resource loading strategies

### Libraries & Frameworks
- **Polyfill Loading** - Conditional polyfill inclusion
- **Feature Flags** - Environment-based feature toggles
- **Adaptive UI** - Device-specific interface adjustments
- **Optimization** - Performance-based code paths

## 🔧 Best Practices

1. **Cache Results** - Use the built-in caching for better performance
2. **Graceful Degradation** - Always provide fallbacks
3. **Privacy Respect** - Honor user accessibility preferences
4. **Performance Budget** - Use detection results to optimize loading
5. **Future-Proof** - Handle unknown capabilities gracefully

## 📖 Documentation

For complete API documentation and more examples, visit:
- [Main Documentation](../docs/index.html)
- [API Reference](../README.md#api-reference)
- [Live Demo](../docs/index.html#demo)
