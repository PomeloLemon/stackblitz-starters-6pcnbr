const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:8081', // 替换为你的应用程序 URL
    specPattern: 'cypress/e2e/**/*.cy.js' // 测试文件路径
  },
});
