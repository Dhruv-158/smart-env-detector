import { detect, supports, getSummary, SmartEnvironmentDetector } from '../index';

describe('SmartEnvironmentDetector', () => {
  let detector: SmartEnvironmentDetector;

  beforeEach(() => {
    detector = new SmartEnvironmentDetector();
    detector.clearCache();
    jest.clearAllMocks();
  });

  describe('Basic Functionality', () => {
    test('should create detector instance', () => {
      expect(detector).toBeInstanceOf(SmartEnvironmentDetector);
    });

    test('should detect current environment', () => {
      const result = detect();
      expect(result).toHaveProperty('platform');
      expect(result).toHaveProperty('runtime');
      expect(result).toHaveProperty('capabilities');
      expect(result).toHaveProperty('performance');
      expect(result).toHaveProperty('security');
      expect(result).toHaveProperty('accessibility');
      expect(result).toHaveProperty('experimental');
    });

    test('should return consistent structure', () => {
      const result = detect();
      
      // Platform should be a string
      expect(typeof result.platform).toBe('string');
      
      // Runtime should have required properties
      expect(result.runtime).toHaveProperty('name');
      expect(result.runtime).toHaveProperty('version');
      expect(result.runtime).toHaveProperty('engine');
      
      // Capabilities should be an object with boolean values
      expect(typeof result.capabilities).toBe('object');
      Object.values(result.capabilities).forEach(value => {
        expect(typeof value).toBe('boolean');
      });
      
      // Performance metrics should exist
      expect(result.performance).toHaveProperty('memoryLimit');
      expect(result.performance).toHaveProperty('cpuCores');
      expect(result.performance).toHaveProperty('connectionType');
      expect(result.performance).toHaveProperty('devicePixelRatio');
    });
  });

  describe('Capability Detection', () => {
    test('should detect at least basic capabilities', () => {
      const result = detect();
      
      // Should have all expected capability properties
      const expectedCapabilities = [
        'localStorage', 'sessionStorage', 'indexedDB', 'webGL', 'webAssembly',
        'serviceWorker', 'pushNotifications', 'geolocation', 'camera',
        'microphone', 'bluetooth', 'nfc', 'vibration', 'fullscreen',
        'clipboard', 'share', 'wakeLock'
      ];
      
      expectedCapabilities.forEach(capability => {
        expect(result.capabilities).toHaveProperty(capability);
        expect(typeof result.capabilities[capability as keyof typeof result.capabilities]).toBe('boolean');
      });
    });

    test('should handle missing APIs gracefully', () => {
      // This test ensures the library doesn't crash with missing APIs
      expect(() => detect()).not.toThrow();
    });
  });

  describe('Options Handling', () => {
    test('should handle includeExperimentalFeatures option', () => {
      const withExperimental = detect({ includeExperimentalFeatures: true });
      const withoutExperimental = detect({ includeExperimentalFeatures: false });
      
      expect(withExperimental.experimental).toHaveProperty('webGPU');
      expect(withExperimental.experimental).toHaveProperty('fileSystemAccess');
      expect(withExperimental.experimental).toHaveProperty('webRTC');
      expect(withExperimental.experimental).toHaveProperty('webXR');
      
      expect(withoutExperimental.experimental.webGPU).toBe(false);
      expect(withoutExperimental.experimental.fileSystemAccess).toBe(false);
      expect(withoutExperimental.experimental.webRTC).toBe(false);
      expect(withoutExperimental.experimental.webXR).toBe(false);
    });

    test('should handle cacheDuration option', () => {
      const spy = jest.spyOn(detector as any, 'performDetection');
      
      detector.detect({ cacheDuration: 1000 });
      detector.detect({ cacheDuration: 1000 });
      
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Caching System', () => {
    test('should cache results by default', () => {
      const spy = jest.spyOn(detector as any, 'performDetection');
      
      detector.detect();
      detector.detect();
      
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('should clear cache when requested', () => {
      const spy = jest.spyOn(detector as any, 'performDetection');
      
      detector.detect();
      detector.clearCache();
      detector.detect();
      
      expect(spy).toHaveBeenCalledTimes(2);
    });

    test('should cache different options separately', () => {
      const spy = jest.spyOn(detector as any, 'performDetection');
      
      detector.detect({ includeExperimentalFeatures: true });
      detector.detect({ includeExperimentalFeatures: false });
      
      expect(spy).toHaveBeenCalledTimes(2);
    });

    test('should respect cache expiration', (done) => {
      const spy = jest.spyOn(detector as any, 'performDetection');
      
      detector.detect({ cacheDuration: 50 });
      
      setTimeout(() => {
        detector.detect({ cacheDuration: 50 });
        expect(spy).toHaveBeenCalledTimes(2);
        done();
      }, 100);
    });
  });

  describe('Convenience Functions', () => {
    test('supports() should work', () => {
      const result = supports('localStorage');
      expect(typeof result).toBe('boolean');
    });

    test('supports() should handle non-existent features', () => {
      const result = supports('nonExistentFeature' as any);
      expect(result).toBe(false);
    });

    test('getSummary() should return string', () => {
      const summary = getSummary();
      expect(typeof summary).toBe('string');
      expect(summary.length).toBeGreaterThan(0);
    });

    test('getSummary() should contain platform and runtime info', () => {
      const summary = getSummary();
      const result = detect();
      
      expect(summary).toContain(result.platform);
      expect(summary).toContain(result.runtime.name);
    });
  });

  describe('Multiple Instances', () => {
    test('should create independent instances', () => {
      const detector1 = new SmartEnvironmentDetector();
      const detector2 = new SmartEnvironmentDetector();
      
      expect(detector1).not.toBe(detector2);
    });

    test('should have independent caches', () => {
      const detector1 = new SmartEnvironmentDetector();
      const detector2 = new SmartEnvironmentDetector();
      
      const spy1 = jest.spyOn(detector1 as any, 'performDetection');
      const spy2 = jest.spyOn(detector2 as any, 'performDetection');
      
      detector1.detect();
      detector2.detect();
      
      expect(spy1).toHaveBeenCalledTimes(1);
      expect(spy2).toHaveBeenCalledTimes(1);
    });
  });

  describe('Error Handling', () => {
    test('should not throw errors during detection', () => {
      expect(() => detect()).not.toThrow();
      expect(() => detect({ includeExperimentalFeatures: true })).not.toThrow();
      expect(() => detect({ cacheDuration: 1000 })).not.toThrow();
    });

    test('should handle undefined values gracefully', () => {
      const result = detect();
      
      // Even if some values are null/undefined, structure should be consistent
      expect(result.platform).toBeDefined();
      expect(result.runtime.name).toBeDefined();
      expect(result.runtime.version).toBeDefined();
      expect(result.runtime.engine).toBeDefined();
    });
  });

  describe('Performance Metrics', () => {
    test('should provide performance information', () => {
      const result = detect();
      
      // These should either be numbers or null, but defined
      expect(result.performance.memoryLimit === null || typeof result.performance.memoryLimit === 'number').toBe(true);
      expect(result.performance.cpuCores === null || typeof result.performance.cpuCores === 'number').toBe(true);
      expect(result.performance.connectionType === null || typeof result.performance.connectionType === 'string').toBe(true);
      expect(result.performance.devicePixelRatio === null || typeof result.performance.devicePixelRatio === 'number').toBe(true);
    });
  });

  describe('Security Context', () => {
    test('should detect security context', () => {
      const result = detect();
      
      expect(typeof result.security.https).toBe('boolean');
      expect(typeof result.security.cookiesEnabled).toBe('boolean');
    });
  });

  describe('Accessibility Features', () => {
    test('should detect accessibility preferences', () => {
      const result = detect();
      
      expect(typeof result.accessibility.reducedMotion).toBe('boolean');
      expect(typeof result.accessibility.highContrast).toBe('boolean');
      expect(typeof result.accessibility.screenReader).toBe('boolean');
    });
  });

  describe('Runtime Information', () => {
    test('should detect runtime information', () => {
      const result = detect();
      
      expect(typeof result.runtime.name).toBe('string');
      expect(typeof result.runtime.version).toBe('string');
      expect(typeof result.runtime.engine).toBe('string');
      
      expect(result.runtime.name.length).toBeGreaterThan(0);
      expect(result.runtime.version.length).toBeGreaterThan(0);
      expect(result.runtime.engine.length).toBeGreaterThan(0);
    });
  });

  describe('Platform Detection', () => {
    test('should detect a valid platform', () => {
      const result = detect();
      const validPlatforms = ['browser', 'nodejs', 'electron', 'react-native', 'webworker', 'unknown'];
      
      expect(validPlatforms).toContain(result.platform);
    });
  });

  // Integration tests that verify the library works correctly in its current environment
  describe('Current Environment Integration', () => {
    test('should detect Node.js test environment correctly', () => {
      const result = detect();
      
      // In the test environment, we expect either nodejs or unknown
      expect(['nodejs', 'browser', 'unknown']).toContain(result.platform);
    });

    test('should provide consistent results across multiple calls', () => {
      const result1 = detect();
      const result2 = detect();
      
      expect(result1).toEqual(result2);
    });

    test('should handle experimental features toggle', () => {
      const withExp = detect({ includeExperimentalFeatures: true });
      const withoutExp = detect({ includeExperimentalFeatures: false });
      
      // Structure should be the same
      expect(Object.keys(withExp.experimental)).toEqual(Object.keys(withoutExp.experimental));
      
      // Values might be different for experimental features
      const expKeys = Object.keys(withExp.experimental) as Array<keyof typeof withExp.experimental>;
      expKeys.forEach(key => {
        expect(typeof withExp.experimental[key]).toBe('boolean');
        expect(typeof withoutExp.experimental[key]).toBe('boolean');
      });
    });
  });
});
