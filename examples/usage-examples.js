// Example usage scenarios for Smart Environment Detector

const { SmartEnvironmentDetector } = require('../dist/index.js');

// Create a shared detector instance
const detector = new SmartEnvironmentDetector();

// Example 1: Feature-based progressive enhancement
function initializeApp() {
  console.log('🔍 Detecting environment...');
  
  console.log(detector.getSummary());
  
  const env = detector.detect({
    includeExperimentalFeatures: true,
    includePerformanceTests: true
  });
  
  console.log('\n📊 Environment Analysis:');
  console.log('Platform:', env.platform);
  console.log('Runtime:', `${env.runtime.name} ${env.runtime.version}`);
  console.log('CPU Cores:', env.performance.cpuCores);
  console.log('Connection:', env.performance.connectionType);
  console.log('Memory Limit:', env.performance.memoryLimit ? 
    `${Math.round(env.performance.memoryLimit / 1024 / 1024)}MB` : 'Unknown');
  
  // Feature detection and progressive enhancement
  const features = {
    canUseAdvancedGraphics: env.capabilities.webGL && env.performance.cpuCores >= 4,
    canUseOfflineStorage: env.capabilities.indexedDB && env.capabilities.serviceWorker,
    canUseRealtimeFeatures: env.capabilities.serviceWorker && env.performance.connectionType !== 'slow-2g',
    shouldOptimizeForPerformance: env.performance.cpuCores <= 2 || env.performance.connectionType === '3g',
    canUseExperimentalFeatures: env.experimental.webGPU || env.experimental.fileSystemAccess
  };
  
  console.log('\n🎯 Recommended Features:');
  Object.entries(features).forEach(([feature, enabled]) => {
    console.log(`${enabled ? '✅' : '❌'} ${feature}`);
  });
  
  return features;
}

// Example 2: Accessibility-aware initialization
function setupAccessibility() {
  const env = detector.detect();
  
  if (env.accessibility.reducedMotion) {
    console.log('🔄 Reduced motion preference detected - disabling animations');
    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty('--animation-duration', '0s');
    }
  }
  
  if (env.accessibility.highContrast) {
    console.log('🎨 High contrast preference detected - applying high contrast theme');
    if (typeof document !== 'undefined') {
      document.body.classList.add('high-contrast');
    }
  }
  
  if (env.accessibility.screenReader) {
    console.log('🔊 Screen reader detected - enhancing ARIA support');
    if (typeof document !== 'undefined') {
      document.body.classList.add('screen-reader-optimized');
    }
  }
}

// Example 3: Performance-based resource loading
async function loadResourcesBasedOnCapabilities() {
  const env = detector.detect({ includePerformanceTests: true });
  
  // Determine resource loading strategy
  const loadingStrategy = {
    images: 'standard',
    scripts: 'standard',
    styles: 'standard'
  };
  
  // Adjust based on connection and performance
  if (env.performance.connectionType === 'slow-2g' || env.performance.connectionType === '2g') {
    loadingStrategy.images = 'compressed';
    loadingStrategy.scripts = 'minimal';
    console.log('📱 Slow connection detected - using minimal resources');
  } else if (env.performance.connectionType === '4g' && env.performance.cpuCores >= 8) {
    loadingStrategy.images = 'high-quality';
    loadingStrategy.scripts = 'full';
    console.log('🚀 High-performance device detected - loading full resources');
  }
  
  // Load resources accordingly
  console.log('📦 Loading strategy:', loadingStrategy);
  
  return loadingStrategy;
}

// Example 4: Security-aware feature enablement
function initializeSecurityFeatures() {
  const env = detector.detect();
  
  console.log('🔒 Security Analysis:');
  console.log('HTTPS:', env.security.https ? '✅' : '❌');
  console.log('Cookies Enabled:', env.security.cookiesEnabled ? '✅' : '❌');
  console.log('Mixed Content:', env.security.mixedContent ? '⚠️' : '✅');
  
  // Enable features based on security context
  if (env.security.https && env.security.cookiesEnabled) {
    console.log('🛡️ Secure context - enabling sensitive features');
    return {
      canUseLocation: true,
      canUseCamera: env.capabilities.camera,
      canUsePushNotifications: env.capabilities.pushNotifications,
      canUseSecureStorage: true
    };
  } else {
    console.log('⚠️ Insecure context - limiting sensitive features');
    return {
      canUseLocation: false,
      canUseCamera: false,
      canUsePushNotifications: false,
      canUseSecureStorage: false
    };
  }
}

// Example 5: Simple capability checks
function quickCapabilityChecks() {
  console.log('\n⚡ Quick Capability Checks:');
  
  const capabilities = [
    'localStorage',
    'webGL',
    'serviceWorker',
    'pushNotifications',
    'geolocation',
    'camera',
    'webAssembly'
  ];
  
  capabilities.forEach(capability => {
    const isSupported = detector.supports(capability);
    console.log(`${isSupported ? '✅' : '❌'} ${capability}`);
  });
}

// Example 6: Experimental features detection
function checkExperimentalFeatures() {
  const env = detector.detect({ includeExperimentalFeatures: true });
  
  console.log('\n🧪 Experimental Features:');
  console.log('WebGPU:', env.experimental.webGPU ? '🆕' : '❌');
  console.log('File System Access:', env.experimental.fileSystemAccess ? '🆕' : '❌');
  console.log('WebXR:', env.experimental.webXR ? '🆕' : '❌');
  console.log('WebRTC:', env.experimental.webRTC ? '🆕' : '❌');
  
  if (env.experimental.webGPU) {
    console.log('🎮 WebGPU available - can use advanced graphics');
  }
  
  if (env.experimental.fileSystemAccess) {
    console.log('📁 File System Access API available - can read/write files');
  }
  
  if (env.experimental.webXR) {
    console.log('🥽 WebXR available - can create VR/AR experiences');
  }
}

// Example 7: Adaptive UI based on device capabilities
function setupAdaptiveUI() {
  const env = detector.detect();
  
  console.log('\n🎨 Setting up adaptive UI...');
  
  // Adjust UI based on device capabilities
  if (env.performance.devicePixelRatio > 2) {
    console.log('📱 High-DPI display detected - using crisp graphics');
    if (typeof document !== 'undefined') {
      document.body.classList.add('high-dpi');
    }
  }
  
  if (env.performance.cpuCores <= 2) {
    console.log('⚡ Low-power device - simplifying animations');
    if (typeof document !== 'undefined') {
      document.body.classList.add('performance-mode');
    }
  }
  
  if (env.platform === 'react-native') {
    console.log('📱 React Native detected - using mobile-optimized components');
    if (typeof document !== 'undefined') {
      document.body.classList.add('mobile-app');
    }
  }
  
  if (env.platform === 'electron') {
    console.log('💻 Electron detected - enabling desktop features');
    if (typeof document !== 'undefined') {
      document.body.classList.add('desktop-app');
    }
  }
}

// Example 8: Feature detection for library authors
function createFeatureMatrix() {
  const env = detector.detect({ includeExperimentalFeatures: true });
  
  const featureMatrix = {
    storage: {
      basic: env.capabilities.localStorage,
      advanced: env.capabilities.indexedDB,
      persistent: env.capabilities.serviceWorker
    },
    graphics: {
      canvas2d: env.platform === 'browser',
      webgl: env.capabilities.webGL,
      webgpu: env.experimental.webGPU
    },
    media: {
      camera: env.capabilities.camera,
      microphone: env.capabilities.microphone,
      webrtc: env.experimental.webRTC
    },
    compute: {
      webassembly: env.capabilities.webAssembly,
      workers: env.platform === 'browser',
      sharedArrayBuffer: typeof SharedArrayBuffer !== 'undefined'
    },
    platform: {
      mobile: env.platform === 'react-native',
      desktop: env.platform === 'electron',
      web: env.platform === 'browser',
      server: env.platform === 'nodejs'
    }
  };
  
  console.log('\n🎯 Feature Matrix:');
  console.log(JSON.stringify(featureMatrix, null, 2));
  
  return featureMatrix;
}

// Example 9: Performance monitoring setup
function initializePerformanceMonitoring() {
  const env = detector.detect({ includePerformanceTests: true });
  
  const performanceConfig = {
    enableMetrics: env.performance.memoryLimit > 1000000000, // 1GB
    samplingRate: env.performance.cpuCores >= 4 ? 1.0 : 0.5,
    enableTracing: env.security.https && env.capabilities.serviceWorker,
    reportingEndpoint: env.security.https ? '/api/metrics' : null
  };
  
  console.log('\n📈 Performance Monitoring Config:');
  console.log('Enable Metrics:', performanceConfig.enableMetrics);
  console.log('Sampling Rate:', performanceConfig.samplingRate);
  console.log('Enable Tracing:', performanceConfig.enableTracing);
  console.log('Reporting:', performanceConfig.reportingEndpoint ? 'Enabled' : 'Disabled');
  
  return performanceConfig;
}

// Example 10: Conditional polyfill loading
function loadPolyfillsIfNeeded() {
  const env = detector.detect();
  
  const polyfillsNeeded = [];
  
  if (!env.capabilities.webAssembly) {
    polyfillsNeeded.push('webassembly');
  }
  
  if (!env.capabilities.indexedDB) {
    polyfillsNeeded.push('indexeddb');
  }
  
  if (env.runtime.name === 'Internet Explorer') {
    polyfillsNeeded.push('es6-promise', 'fetch', 'array-from');
  }
  
  if (polyfillsNeeded.length > 0) {
    console.log('\n📚 Polyfills needed:', polyfillsNeeded);
    // In a real app, you would load these polyfills dynamically
    return polyfillsNeeded;
  }
  
  console.log('\n✨ No polyfills needed - modern environment detected');
  return [];
}

// Run examples if this file is executed directly
if (typeof module !== 'undefined' && require.main === module) {
  console.log('🚀 Smart Environment Detector - Usage Examples\n');
  
  try {
    initializeApp();
    quickCapabilityChecks();
    checkExperimentalFeatures();
    
    if (typeof document !== 'undefined') {
      setupAccessibility();
      setupAdaptiveUI();
      loadResourcesBasedOnCapabilities();
      initializeSecurityFeatures();
    }
    
    createFeatureMatrix();
    initializePerformanceMonitoring();
    loadPolyfillsIfNeeded();
    
  } catch (error) {
    console.error('Error running examples:', error);
  }
}

// Export examples for testing
module.exports = {
  initializeApp,
  setupAccessibility,
  loadResourcesBasedOnCapabilities,
  initializeSecurityFeatures,
  quickCapabilityChecks,
  checkExperimentalFeatures,
  setupAdaptiveUI,
  createFeatureMatrix,
  initializePerformanceMonitoring,
  loadPolyfillsIfNeeded
};
