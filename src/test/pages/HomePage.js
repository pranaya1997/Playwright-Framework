const { expect } = require('@playwright/test');
const config = require('../../resources/test-data/config.json');
const CalendarUtil = require('../utils/CalendarUtil');

class HomePage {
  constructor(page) {
    this.page = page;
    this.calendar = new CalendarUtil(page);

//  this.loginWindow = page.getByRole('img', { name: 'cross' });
    this.loginWindow = page.locator('//img[@alt="cross"]');
    
    // Main tab elements
    this.logo = page.getByAltText('yatraLogo');
    this.flight = this.flight = page.getByRole('tab', { name: /Flights/i, selected: true });
    this.hotel = page.locator('//button[contains(.,\'Hotels\')]');
    this.holidays = page.locator('//button[contains(.,\'Holidays\')]');
    this.bus = page.locator('//button[contains(.,\'Bus\')]');
    this.trains = page.locator('//button[contains(.,\'Trains\')]');
    this.cabs = page.locator('//button[contains(.,\'Cabs\')]');

    // Trip type elements
    this.oneWay = page.locator("//h4[text()='One Way']");
    this.roundTrip = page.locator("//h4[text()='Round Trip']");
    this.multiCity = page.locator("//h4[text()='Multi City']");

    // Other elements
    this.departureFrom = page.getByText('Departure From');
    this.goingTo = page.getByText('Going To');
    this.departureDate = page.getByLabel('Departure Date');
    this.returnDate = page.getByLabel('Return Date');
    this.searchButton = page.locator('//button[contains(.,\'Search\')]');
    this.departureFromInputText = page.locator('//input[@id="input-with-icon-adornment"]');
    this.goingToInputText = page.locator('//input[@id="input-with-icon-adornment"]');

  }
  
  async waitForPageLoad() {
    await this.page.waitForLoadState('load');
  }

  async navigate() {
    await this.page.goto(config.baseURL + config.urls.flight);
    await this.waitForPageLoad();
  }

  async closeLoginWindow() {  
    //await this.loginWindow.waitFor({ state: 'visible' });
    await this.loginWindow.nth(0).click();
  }

  async selectTripType(tripType) {
    switch (tripType.toLowerCase()) {
      case 'one way':
        await this.oneWay.check();
        break;
      case 'round trip':
        await this.roundTrip.check();
        break;
      case 'multi city':
        await this.multiCity.check();
        break;
      default:
        throw new Error(`Invalid trip type: ${tripType}`);
    }
  }

  async selectDepartureCity() {   
    await this.departureFrom.click();
    await this.departureFromInputText.fill(config.testData.flightSearch.departureCity);

    const cityOption = this.page.locator(`//span[normalize-space()='${config.testData.flightSearch.departureCityCode}']`).first();
    await cityOption.waitFor({ state: 'visible' });
    await cityOption.click();
  }

  async selectGoingCity() {   
    await this.goingTo.click();
    await this.goingToInputText.fill(config.testData.flightSearch.goingCity);
    
    const cityOption = this.page.locator(`//span[normalize-space()='${config.testData.flightSearch.goingCityCode}']`).first();
    await cityOption.waitFor({ state: 'visible' });
    await cityOption.click();
  }

  async chooseDepartureDate() {
    await this.calendar.selectNext10DaysRandom();
  }

  async clickSearch() {
    await this.searchButton.click();
  }

}

module.exports = { HomePage };
