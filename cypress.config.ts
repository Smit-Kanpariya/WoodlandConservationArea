import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    // Base URL for your application
    baseUrl: "http://localhost:8080",

    // Viewport settings
    viewportWidth: 1280,
    viewportHeight: 720,

    // Video and screenshot settings
    video: true,
    screenshotOnRunFailure: true,

    // Timeouts
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,

    // Test isolation
    testIsolation: true,

    setupNodeEvents(on, config) {
      // implement node event listeners here
      return config;
    },
  },
});
