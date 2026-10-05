const { expect } = require('@playwright/test');
const { baseTest } = require('../fixtures/baseTest');

const test = baseTest;

test.describe('Yatra Home Page Functionality', () => {
  test.beforeEach(async ({ homePage }) => {
     await homePage.navigate();
     homePage.closeLoginWindow();
  });

  test('should display home page navigation elements', async ({ homePage }) => {
     await expect(homePage.logo).toBeVisible();
     await expect(homePage.flight).toBeVisible();
     await expect(homePage.hotel).toBeVisible();
     await expect(homePage.holidays).toBeVisible();
     expect(homePage.bus).toBeVisible();
     expect(homePage.trains).toBeVisible();
     expect(homePage.cabs).toBeVisible();
     expect(homePage.oneWay).toBeVisible();
     expect(homePage.roundTrip).toBeVisible();
     await expect(homePage.multiCity).toBeVisible();
     await expect(homePage.departureFrom).toBeVisible();
     await expect(homePage.goingTo).toBeVisible();
     await expect(homePage.departureDate).toBeVisible();
     await expect(homePage.returnDate).toBeVisible();
     await expect(homePage.searchButton).toBeVisible();
  });

  test('Search a Flight without selecting departure date', async ({ homePage }) => {
     await homePage.selectTripType('One Way');
     await expect(homePage.oneWay).toBeVisible();
     await homePage.selectDepartureCity();
     await homePage.selectGoingCity();
     await homePage.searchButton.click();
  });

  test('Search a Flight with selecting deaprture date', async ({ homePage }) => {
     homePage.selectTripType('One Way');
     expect(homePage.oneWay).toBeChecked();

     homePage.selectDepartureCity();
     homePage.selectGoingCity();

     homePage.departureDate.click();
     homePage.chooseDepartureDate();

     await homePage.searchButton.click();

     await homePage.page.waitForURL(/air-search-ui\/dom2\/trigger/, { timeout: 20000 });
     await expect(homePage.page).toHaveURL(/air-search-ui\/dom2\/trigger/);
  });
});
