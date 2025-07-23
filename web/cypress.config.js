const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    //defaultCommandTimeout: 10000 // 10 seconds
    experimentalStudio: true // Enable experimental Studio feature
    ,video: true
    ,baseUrl: 'http://localhost:3000'
  },
});
