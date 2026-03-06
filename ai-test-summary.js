const fs = require("fs");

const results = fs.readFileSync("reports/test-results.json", "utf8");

async function generateSummary() {

const prompt = `
Analyze the following Playwright test results and give:

1. Total tests
2. Passed tests
3. Failed tests
4. Main failure reason
5. Suggested fix

Results:
${results}
`;

console.log("AI Summary:");
console.log(prompt);
}

generateSummary();
