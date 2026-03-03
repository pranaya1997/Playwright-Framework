const { expect } = require('@playwright/test');
const { baseTest } = require('../fixtures/baseTest');
const ai = require('../../ai/aiAgent');

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

  // ========================================================

  test.only('AI Flight Search', async ({ page }) => {

  await page.goto('https://www.yatra.com');

  const steps = JSON.parse(
    await ai.run("Search flight from Bangalore to Mumbai")
  );

  for (const step of steps) {

    if (step.action === "goto")
      await page.goto(step.value);

    if (step.action === "fill")
      await page.fill(step.selector, step.value);

    if (step.action === "click")
      await page.click(step.selector);

    if (step.action === "wait")
      await page.waitForTimeout(2000);
  }
});

});
