class FlightPage {

  constructor(page) {
    this.page = page;

    this.flightCards = page.locator('[class*="flight"]');
    this.viewFairs = page.locator("//button[normalize-space()= 'View Fares']");
    this.bookNowButtons = page.getByRole('button', { name: 'Book Now' });
  }

  async waitForResults() {
    this.page.waitForLoadState('networkidle');
    this.flightCards.first().waitFor({ state: 'visible' });
  }

  async bookFirstFlight() {
    this.waitForResults();
    this.page.mouse.wheel(0, 4000);
    this.viewFairs.first().click();
    this.bookNowButtons.click();
  }
}

module.exports = { FlightPage };