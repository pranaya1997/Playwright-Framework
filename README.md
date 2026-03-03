# Playwright AI Framework - Page Object Model

A clean and simple Playwright testing framework using Page Object Model (POM) pattern. Focused on essential functionality without unnecessary complexity.

## Project Structure

```
playwright-ai-framework/
├── tests/                     → Test files (Test cases)
│   ├── login.spec.js
│   ├── home.spec.js
├── pages/                     → Page Object Classes
│   ├── LoginPage.js
│   ├── HomePage.js
├── fixtures/                  → Custom fixtures / test setup
│   └── baseTest.js
├── utils/                     → Reusable utilities
│   ├── config.js
│   ├── testData.js
│   ├── helper.js
├── locators/                  → Centralized locators
│   └── loginLocators.js
├── test-data/                 → External test data
│   └── users.json
├── hooks/                     → Before/After hooks
│   └── hooks.js
├── reports/
├── playwright.config.js       → Playwright configuration
├── package.json
├── tsconfig.json
├── .env                       → Environment variables
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
```bash
npm install
npx playwright install
```

### Running Tests
```bash
# Run all tests
npm test

# Run tests in headed mode (visible browser)
npm run test:headed

# Run tests in debug mode
npm run test:debug

# Open test report
npm run report:open
```

## Framework Components

### Tests Directory (`src/tests/`)
- **Pages** (`src/tests/pages/`) - Page Object Model classes for web page interactions
- **Test Files** (`*.spec.js`) - Playwright test files using POM

### Utils Directory (`src/utils/`)
- **testData.js** - Test data configuration

## Configuration

### Playwright Config
Main configuration in `playwright.config.js`:
- Test directory: `./src/tests`
- Test pattern: `**/*.spec.js`
- Browser projects: Chrome, Firefox, Safari
- Reporters and trace settings

## Writing Tests

### Basic Test Structure
```javascript
const { test, expect } = require('@playwright/test');
const GooglePage = require('./pages/google.page');
const testData = require('../utils/testData');

test.describe('Google Search Tests', () => {
    let googlePage;

    test.beforeEach(async ({ page }) => {
        googlePage = new GooglePage(page);
        await googlePage.navigateToGoogle();
    });

    test('should perform search', async () => {
        await googlePage.search('Playwright testing');
        await expect(googlePage.searchBox).toHaveValue('Playwright testing');
    });
});
```

### Page Object Model Example
```javascript
class GooglePage {
    constructor(page) {
        this.page = page;
        this.searchBox = page.locator('textarea[name="q"], input[name="q"]');
        this.searchButton = page.locator('input[name="btnK"]').first();
    }

    async navigateToGoogle() {
        await this.page.goto(testData.baseURL);
    }

    async search(query) {
        await this.searchBox.fill(query);
        await this.searchBox.press('Enter');
    }
}
```

## Best Practices

1. **Page Object Model**: Keep page interactions in page objects
2. **Test Data**: Use external configuration for test data
3. **Assertions**: Use Playwright's built-in assertions
4. **Selectors**: Prefer stable selectors (name, role-based)
5. **Test Organization**: Group related tests in describe blocks

## Reports

Test reports are generated in:
- `reports/playwright-report/` - HTML reports
- `reports/test-results.json` - JSON test results
