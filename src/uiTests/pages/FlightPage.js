const { expect } = require('@playwright/test');
const config = require('../../resources/test-data/config.json');

class FlightPage {
  constructor(page) {
    this.page = page;
    
    this.flightCards = page.locator('[class*="flight"]');
    this.viewFairs = page.locator("//button[normalize-space()= 'View Fares']");
    this.bookNowButtons = page.getByRole("button", { name: "Book Now" });
  }
  
  async waitForResults() {
    await this.page.waitForLoadState('networkidle');
    await this.flightCards.first().waitFor({ state: 'visible' });
  }

  async bookFirstFlight() {
    await this.waitForResults();
    await this.page.mouse.wheel(0, 4000);
    await this.viewFairs.first().click();
    await this.bookNowButtons.click();
  }

}

module.exports = { FlightPage };
