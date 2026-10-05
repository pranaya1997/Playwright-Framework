const { baseTest } = require('../fixtures/baseTest');
const config = require('../test-data/config.json');

const test = baseTest;

test.describe('Holidays Search in Yatra', () => {
  test.beforeEach(async ({ homePage }) => {
     await homePage.page.evaluate(() => {
      document.body.style.zoom = '75%';
    });
     await homePage.navigate();
     homePage.closeLoginWindow();
  });

  test('Search Holiday', async ({ homePage, holidaysPage }) => {
     homePage.holidays.click();
     holidaysPage.selectDepartureCity(config.testData.holidaySearch.departureCity);
     holidaysPage.selectGoingToCity(config.testData.holidaySearch.goingCity);
     holidaysPage.selectTravelMonth();
     holidaysPage.searchButton.click();
     holidaysPage.page.locator("//button[normalize-space()='View Details']").first().waitFor({ state: 'visible' });
  });
});
