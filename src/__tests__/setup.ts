// Test setup file for Jest
// This file runs before all tests to configure the testing environment

// Mock console methods to avoid noise in test output
const originalConsole = { ...console };

beforeAll(() => {
  // Silence console.log during tests, but keep errors and warnings
  jest.spyOn(console, 'log').mockImplementation(() => {});
  
  // Keep console.warn and console.error for debugging
  jest.spyOn(console, 'warn').mockImplementation((...args: any[]) => {
    if (process.env.DEBUG_TESTS) {
      originalConsole.warn(...args);
    }
  });

  jest.spyOn(console, 'error').mockImplementation((...args: any[]) => {
    if (process.env.DEBUG_TESTS) {
      originalConsole.error(...args);
    }
  });
});

afterAll(() => {
  // Restore console methods
  jest.restoreAllMocks();
});

// Global test utilities
(global as any).flushPromises = () => new Promise(resolve => setImmediate(resolve));

// Mock requestAnimationFrame for tests
(global as any).requestAnimationFrame = (callback: FrameRequestCallback) => {
  return setTimeout(() => callback(Date.now()), 16) as any;
};

(global as any).cancelAnimationFrame = (id: number) => {
  clearTimeout(id);
};

export {};
