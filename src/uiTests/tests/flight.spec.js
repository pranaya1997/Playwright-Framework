const { expect } = require('@playwright/test');
const { baseTest } = require('../fixtures/baseTest');

const test = baseTest;

test.describe('Flight book in Yatra', () => {

  test.beforeEach(async ({ homePage }) => {
    await homePage.page.evaluate(() => {
      document.body.style.zoom = '75%';
    })
    await homePage.navigate();
    await homePage.closeLoginWindow();
  });

  test('Book a flight', async ({ homePage, flightPage }) => {
    await homePage.selectTripType('One Way');
    await expect(homePage.oneWay).toBeChecked();

    await homePage.selectDepartureCity();
    await homePage.selectGoingCity();

    await homePage.departureDate.click();
    await homePage.chooseDepartureDate();

    await homePage.searchButton.click();

    await homePage.page.waitForURL(/air-search-ui\/dom2\/trigger/, { timeout: 20000 });
    await expect(homePage.page).toHaveURL(/air-search-ui\/dom2\/trigger/);

    // click the first visible one
    await flightPage.bookFirstFlight();
  });

});
