const { test: base } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { FlightPage } = require('../pages/FlightPage');
const { HolidaysPage } = require('../pages/HolidaysPage');

const baseTest = base.extend({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  flightPage: async ({ page }, use) => {
    const flightPage = new FlightPage(page);
    await use(flightPage);
  },

  holidaysPage: async ({ page }, use) => {
    const holidaysPage = new HolidaysPage(page);
    await use(holidaysPage);
  }

});

module.exports = { baseTest };
