class HolidaysPage {
  constructor(page) {
    this.page = page;

    this.departFrom = page.locator("//div[contains(@class,'MuiBox-root')]//p[normalize-space()='Depart From']");
    this.goingTo = page.locator("//div[contains(@class,'MuiBox-root')]//p[normalize-space()='Going To']");
    this.monthOfTravel = page.locator("//div[@role='combobox' and normalize-space()='Select Month']");
    this.monthSelect = page.locator("//li[@role='option' and @aria-selected='false']");

    this.departureFromInputText = page.locator("//input[@id='input-with-icon-adornment']");
    this.goingToInputText = page.locator("//input[@id='input-with-icon-adornment']");
    this.searchButton = page.locator("//button[normalize-space()='Search']");
  }

  async selectDepartureCity(cityName) {
     this.departFrom.click();
     this.departureFromInputText.fill(cityName);
     this.page.locator('li.options').first().click();
  }

  async selectGoingToCity(cityName) {
     this.goingTo.click();
     this.goingToInputText.fill(cityName);
     this.page.locator('li.options').first().click();
  }

  async selectTravelMonth() {
     this.monthOfTravel.click();
     this.monthSelect.first().click();
  }
}

module.exports = { HolidaysPage };

