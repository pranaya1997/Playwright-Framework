const { expect } = require('@playwright/test');
const config = require('../../resources/test-data/config.json');

class HolidaysPage {
  constructor(page) {
    this.page = page;
    
    this.departFrom = page.locator("//div[contains(@class,'MuiBox-root')]//p[normalize-space()='Depart From']")
    this.goingTo = page.locator("//div[contains(@class,'MuiBox-root')]//p[normalize-space()='Going To']")
    this.monthOfTravel = page.locator("//div[@role='combobox' and normalize-space()='Select Month']")
    this.monthSelect = page.locator("//li[@role='option' and @aria-selected='false']");

    this.departureFromInputText= page.locator("//input[@id='input-with-icon-adornment']");
    this.goingToInputText= page.locator("//input[@id='input-with-icon-adornment']");

    this.searchButton = page.locator("//button[normalize-space()='Search']");
  }

  async selectDepartureCity(cityName) {
    await this.departFrom.click();
    await this.departureFromInputText.fill(cityName);
    await this.page.locator("li.options").first().click();
  }

  async selectGoingToCity(cityName) {
    await this.goingTo.click();
    await this.goingToInputText.fill(cityName);
    await this.page.locator("li.options").first().click();
  }

  async selectTravelMonth() {
    await this.monthOfTravel.click();
    await this.monthSelect.first().click();
  }

}

module.exports = { HolidaysPage };
