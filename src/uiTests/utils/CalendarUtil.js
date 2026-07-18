class CalendarUtil {
    
  constructor(page) {
    this.page = page;
  }

  // ---------- PRIVATE HELPERS ----------

  formatDateForPicker(date) {
    const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });
    const month = date.toLocaleDateString('en-US', { month: 'long' });
    const day = date.getDate();
    const year = date.getFullYear();

    const suffix =
      day % 10 === 1 && day !== 11 ? 'st' :
      day % 10 === 2 && day !== 12 ? 'nd' :
      day % 10 === 3 && day !== 13 ? 'rd' : 'th';

    return `Choose ${weekday}, ${month} ${day}${suffix}, ${year}`;
  }

  buildFutureDate(daysAhead) {
    const date = new Date();
    date.setDate(date.getDate() + daysAhead);
    return date;
  }

  // ---------- PUBLIC METHODS ----------

  async selectToday() {
    const today = new Date();
    const label = this.formatDateForPicker(today);
    await this.page.getByRole('option', { name: label }).click();
  }

  async selectFutureDate(daysAhead) {
    const date = this.buildFutureDate(daysAhead);
    const label = this.formatDateForPicker(date);

    const day = this.page.getByRole('option', { name: label })
    .filter({ hasNot: this.page.locator('.react-datepicker__day--outside-month') });

    await day.first().click();
  }

  async selectRandomDateWithin(daysRange) {
    const randomDays = Math.floor(Math.random() * daysRange) + 1;
    await this.selectFutureDate(randomDays);
  }

  async selectDateByValue(day, month, year) {
    const date = new Date(`${month} ${day}, ${year}`);
    const label = this.formatDateForPicker(date);
    await this.page.getByRole('option', { name: label }).click();
  }

  async selectNext10DaysRandom() {
    await this.selectRandomDateWithin(10);
  }
}

module.exports = CalendarUtil;