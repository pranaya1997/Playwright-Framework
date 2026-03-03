const { expect } = require('@playwright/test');
const { baseTest } = require('../fixtures/baseTest');
const config = require('../../resources/test-data/config.json');

const test = baseTest;

test.describe('Holidays Search in Yatra', () => {
  
  test.beforeEach(async ({ homePage }) => {
    await homePage.page.evaluate(() => {
      document.body.style.zoom = '75%'; 
    })
    await homePage.navigate();
    await homePage.closeLoginWindow();
  });

  test('Search Holiday', async ({ homePage, holidaysPage }) => {
    await homePage.holidays.click();
    await holidaysPage.selectDepartureCity(config.testData.holidaySearch.departureCity);
    await holidaysPage.selectGoingToCity(config.testData.holidaySearch.goingCity);
    await holidaysPage.selectTravelMonth();
    await holidaysPage.searchButton.click();
    await holidaysPage.page.locator("//button[normalize-space()='View Details']").first().waitFor({ state: 'visible' });      
  });

});
