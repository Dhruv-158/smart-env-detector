export interface EnvironmentInfo {
  platform: 'browser' | 'nodejs' | 'webworker' | 'electron' | 'react-native' | 'unknown';
  runtime: {
    name: string;
    version: string;
    engine: string;
  };
  capabilities: {
    localStorage: boolean;
    sessionStorage: boolean;
    indexedDB: boolean;
    webGL: boolean;
    webAssembly: boolean;
    serviceWorker: boolean;
    pushNotifications: boolean;
    geolocation: boolean;
    camera: boolean;
    microphone: boolean;
    bluetooth: boolean;
    nfc: boolean;
    vibration: boolean;
    fullscreen: boolean;
    clipboard: boolean;
    share: boolean;
    wakeLock: boolean;
  };
  performance: {
    memoryLimit: number | null;
    cpuCores: number | null;
    connectionType: string | null;
    devicePixelRatio: number | null;
  };
  security: {
    https: boolean;
    mixedContent: boolean;
    cookiesEnabled: boolean;
    thirdPartyCookies: boolean;
  };
  accessibility: {
    reducedMotion: boolean;
    highContrast: boolean;
    screenReader: boolean;
  };
  experimental: {
    webGPU: boolean;
    fileSystemAccess: boolean;
    webRTC: boolean;
    webXR: boolean;
  };
}

export interface DetectionOptions {
  includePerformanceTests?: boolean;
  includeExperimentalFeatures?: boolean;
  cacheDuration?: number; // in milliseconds
}

class SmartEnvironmentDetector {
  private cache: Map<string, { data: EnvironmentInfo; timestamp: number }> = new Map();
  private readonly defaultCacheDuration = 5 * 60 * 1000; // 5 minutes

  /**
   * Detects the current environment with comprehensive information
   */
  public detect(options: DetectionOptions = {}): EnvironmentInfo {
    const cacheKey = JSON.stringify(options);
    const cached = this.cache.get(cacheKey);
    const cacheDuration = options.cacheDuration ?? this.defaultCacheDuration;

    if (cached && Date.now() - cached.timestamp < cacheDuration) {
      return cached.data;
    }

    const info = this.performDetection(options);
    this.cache.set(cacheKey, { data: info, timestamp: Date.now() });
    
    return info;
  }

  private performDetection(options: DetectionOptions): EnvironmentInfo {
    const platform = this.detectPlatform();
    const runtime = this.detectRuntime();
    const capabilities = this.detectCapabilities();
    const performance = this.detectPerformance();
    const security = this.detectSecurity();
    const accessibility = this.detectAccessibility();
    const experimental = options.includeExperimentalFeatures 
      ? this.detectExperimentalFeatures() 
      : this.getEmptyExperimental();

    return {
      platform,
      runtime,
      capabilities,
      performance,
      security,
      accessibility,
      experimental
    };
  }

  private detectPlatform(): EnvironmentInfo['platform'] {
    // Node.js detection
    if (typeof process !== 'undefined' && process.versions && process.versions.node) {
      return 'nodejs';
    }

    // Browser context
    if (typeof window !== 'undefined') {
      // Electron detection
      if (typeof (window as any).process !== 'undefined' && (window as any).process.type) {
        return 'electron';
      }

      // React Native detection
      if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
        return 'react-native';
      }

      return 'browser';
    }

    // Web Worker detection
    if (typeof self !== 'undefined' && typeof importScripts === 'function') {
      return 'webworker';
    }

    return 'unknown';
  }

  private detectRuntime(): EnvironmentInfo['runtime'] {
    const platform = this.detectPlatform();

    if (platform === 'nodejs') {
      return {
        name: 'Node.js',
        version: process.version,
        engine: 'V8'
      };
    }

    if (typeof navigator !== 'undefined') {
      const userAgent = navigator.userAgent || '';
      
      if (userAgent.includes('Edg/')) {
        // Modern Edge (Chromium-based)
        const version = userAgent.match(/Edg\/(\d+\.\d+)/)?.[1] || 'unknown';
        return { name: 'Edge', version, engine: 'Chromium' };
      } else if (userAgent.includes('Edge/')) {
        // Legacy Edge
        const version = userAgent.match(/Edge\/(\d+\.\d+)/)?.[1] || 'unknown';
        return { name: 'Edge', version, engine: 'Chakra' };
      } else if (userAgent.includes('Chrome')) {
        const version = userAgent.match(/Chrome\/(\d+\.\d+)/)?.[1] || 'unknown';
        return { name: 'Chrome', version, engine: 'V8' };
      } else if (userAgent.includes('Firefox')) {
        const version = userAgent.match(/Firefox\/(\d+\.\d+)/)?.[1] || 'unknown';
        return { name: 'Firefox', version, engine: 'SpiderMonkey' };
      } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
        const version = userAgent.match(/Version\/(\d+\.\d+)/)?.[1] || 'unknown';
        return { name: 'Safari', version, engine: 'JavaScriptCore' };
      }
    }

    return { name: 'Unknown', version: 'unknown', engine: 'unknown' };
  }

  private detectCapabilities(): EnvironmentInfo['capabilities'] {
    const hasWindow = typeof window !== 'undefined';
    const hasNavigator = typeof navigator !== 'undefined';
    const hasDocument = typeof document !== 'undefined';

    return {
      localStorage: hasWindow && 'localStorage' in window,
      sessionStorage: hasWindow && 'sessionStorage' in window,
      indexedDB: hasWindow && 'indexedDB' in window,
      webGL: hasWindow && this.hasWebGL(),
      webAssembly: typeof WebAssembly !== 'undefined',
      serviceWorker: hasNavigator && 'serviceWorker' in navigator,
      pushNotifications: hasWindow && 'Notification' in window,
      geolocation: hasNavigator && 'geolocation' in navigator,
      camera: hasNavigator && 'mediaDevices' in navigator,
      microphone: hasNavigator && 'mediaDevices' in navigator,
      bluetooth: hasNavigator && 'bluetooth' in navigator,
      nfc: hasNavigator && 'nfc' in navigator,
      vibration: hasNavigator && 'vibrate' in navigator,
      fullscreen: hasDocument && 'requestFullscreen' in document.documentElement,
      clipboard: hasNavigator && 'clipboard' in navigator,
      share: hasNavigator && 'share' in navigator,
      wakeLock: hasNavigator && 'wakeLock' in navigator
    };
  }

  private hasWebGL(): boolean {
    if (typeof document === 'undefined') {
      return false;
    }
    
    try {
      const canvas = document.createElement('canvas');
      return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
    } catch {
      return false;
    }
  }

  private detectPerformance(): EnvironmentInfo['performance'] {
    const hasNavigator = typeof navigator !== 'undefined';
    const hasWindow = typeof window !== 'undefined';

    return {
      memoryLimit: this.getMemoryInfo(),
      cpuCores: hasNavigator ? navigator.hardwareConcurrency || null : null,
      connectionType: this.getConnectionType(),
      devicePixelRatio: hasWindow ? window.devicePixelRatio || null : null
    };
  }

  private getMemoryInfo(): number | null {
    if (typeof performance !== 'undefined' && 'memory' in performance) {
      const memory = (performance as any).memory;
      return memory.jsHeapSizeLimit || null;
    }
    return null;
  }

  private getConnectionType(): string | null {
    if (typeof navigator !== 'undefined' && 'connection' in navigator) {
      const connection = (navigator as any).connection;
      return connection.effectiveType || connection.type || null;
    }
    return null;
  }

  private detectSecurity(): EnvironmentInfo['security'] {
    const hasLocation = typeof location !== 'undefined';
    const hasNavigator = typeof navigator !== 'undefined';

    return {
      https: hasLocation ? location.protocol === 'https:' : false,
      mixedContent: this.detectMixedContent(),
      cookiesEnabled: hasNavigator ? Boolean(navigator.cookieEnabled) : false,
      thirdPartyCookies: this.detectThirdPartyCookies()
    };
  }

  private detectMixedContent(): boolean {
    if (typeof location === 'undefined') {
      return false;
    }
    return location.protocol === 'https:' && this.hasInsecureContent();
  }

  private hasInsecureContent(): boolean {
    // This is a simplified check - real implementation would be more complex
    return false;
  }

  private detectThirdPartyCookies(): boolean {
    // Simplified detection - real implementation would test cookie setting
    return true;
  }

  private detectAccessibility(): EnvironmentInfo['accessibility'] {
    const hasWindow = typeof window !== 'undefined';

    return {
      reducedMotion: hasWindow && this.prefersReducedMotion(),
      highContrast: hasWindow && this.prefersHighContrast(),
      screenReader: this.detectScreenReader()
    };
  }

  private prefersReducedMotion(): boolean {
    if (typeof window === 'undefined') {
      return false;
    }
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  private prefersHighContrast(): boolean {
    if (typeof window === 'undefined') {
      return false;
    }
    return window.matchMedia('(prefers-contrast: high)').matches;
  }

  private detectScreenReader(): boolean {
    // Basic screen reader detection
    if (typeof navigator === 'undefined') {
      return false;
    }
    return /JAWS|NVDA|VoiceOver|TalkBack|Dragon/i.test(navigator.userAgent);
  }

  private detectExperimentalFeatures(): EnvironmentInfo['experimental'] {
    const hasWindow = typeof window !== 'undefined';
    const hasNavigator = typeof navigator !== 'undefined';

    return {
      webGPU: hasNavigator && 'gpu' in navigator,
      fileSystemAccess: hasWindow && 'showOpenFilePicker' in window,
      webRTC: hasWindow && 'RTCPeerConnection' in window,
      webXR: hasNavigator && 'xr' in navigator
    };
  }

  private getEmptyExperimental(): EnvironmentInfo['experimental'] {
    return {
      webGPU: false,
      fileSystemAccess: false,
      webRTC: false,
      webXR: false
    };
  }

  /**
   * Clears the detection cache
   */
  public clearCache(): void {
    this.cache.clear();
  }

  /**
   * Returns a simple boolean check for specific capabilities
   */
  public supports(feature: keyof EnvironmentInfo['capabilities']): boolean {
    const capabilities = this.detect().capabilities;
    return capabilities[feature] || false;
  }

  /**
   * Returns a human-readable summary of the environment
   */
  public getSummary(): string {
    const info = this.detect();
    return `${info.runtime.name} ${info.runtime.version} on ${info.platform}`;
  }
}

// Export singleton instance and class
export const envDetector = new SmartEnvironmentDetector();
export { SmartEnvironmentDetector };

// Convenience functions
export const detect = (options?: DetectionOptions) => envDetector.detect(options);
export const supports = (feature: keyof EnvironmentInfo['capabilities']) => envDetector.supports(feature);
export const getSummary = () => envDetector.getSummary();
