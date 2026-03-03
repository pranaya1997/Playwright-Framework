const { expect } = require('@playwright/test');
const config = require('../../resources/test-data/config.json');

class FlightPage {
  constructor(page) {
    this.page = page;
    
    this.flightCards = page.locator('[class*="flight"]');
    // Book buttons
    this.bookNowButtons = page.getByRole('button', { name: /Book/i });
    // Loader
    this.loader = page.locator('[class*="loader"]');
  }
  
  async waitForResults() {
    await this.page.waitForLoadState('networkidle');
    await this.flightCards.first().waitFor({ state: 'visible' });
  }

  async bookFirstFlight() {
    await this.waitForResults();
    await this.page.mouse.wheel(0, 4000);
    await this.bookNowButtons.first().click();
  }

}

module.exports = { FlightPage };
