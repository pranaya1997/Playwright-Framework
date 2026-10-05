const { expect } = require('@playwright/test');

class Helper {
  static async waitForElement(page, selector, timeout = 30000) {
     page.waitForSelector(selector, { timeout });
  }

  static async waitForElementToBeVisible(page, selector, timeout = 30000) {
     page.waitForSelector(selector, { state: 'visible', timeout });
  }

  static async waitForElementToBeHidden(page, selector, timeout = 30000) {
     page.waitForSelector(selector, { state: 'hidden', timeout });
  }

  static async scrollToElement(page, selector) {
     page.locator(selector).scrollIntoViewIfNeeded();
  }

  static async takeScreenshot(page, name) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
     page.screenshot({
      path: `screenshots/${name}-${timestamp}.png`,
      fullPage: true
    });
  }

  static generateRandomString(length = 10) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  static generateRandomEmail() {
    const randomString = this.generateRandomString(8);
    return `test${randomString}@example.com`;
  }

  static async clearAndType(page, selector, text) {
     page.locator(selector).clear();
     page.locator(selector).fill(text);
  }

  static async verifyElementText(page, selector, expectedText) {
     expect(page.locator(selector)).toHaveText(expectedText);
  }

  static async verifyElementContainsText(page, selector, expectedText) {
     expect(page.locator(selector)).toContainText(expectedText);
  }
}

module.exports = { Helper };

