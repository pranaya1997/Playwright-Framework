class TestAgent {
  constructor() {
    this.name = 'TestAgent';
  }

  async run(task) {
    return `Agent started for task: ${task}`;
  }
}

module.exports = { TestAgent };

