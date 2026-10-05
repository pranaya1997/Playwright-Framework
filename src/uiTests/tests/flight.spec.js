const { expect } = require('@playwright/test');
const { baseTest } = require('../fixtures/baseTest');

const test = baseTest;

test.describe('Flight book in Yatra', () => {
  test.beforeEach(async ({ homePage }) => {
     homePage.page.evaluate(() => {
      document.body.style.zoom = '75%';
    });
     homePage.navigate();
     homePage.closeLoginWindow();
  });

  test('Book a flight', async ({ homePage, flightPage }) => {
     homePage.selectTripType('One Way');
     expect(homePage.oneWay).toBeChecked();

     homePage.selectDepartureCity();
     homePage.selectGoingCity();

     homePage.departureDate.click();
     homePage.chooseDepartureDate();

     await homePage.searchButton.click();

     await homePage.page.waitForURL(/air-search-ui\/dom2\/trigger/, { timeout: 20000 });
     await expect(homePage.page).toHaveURL(/air-search-ui\/dom2\/trigger/);

     flightPage.bookFirstFlight();
  });
});
