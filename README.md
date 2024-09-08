# BBC API Test

This project is an automated test suite for the BBC API using Cucumber(Gherkin), TypeScript, and Supertest. It's a take home assignment completed by Catherine Siviter.

## Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14.x or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Installation

1. Clone the repository or download the project files.
2. Navigate to the project directory.
3. Run the following command to install all dependencies:


```
npm install
```
## Running Tests

### 1. Run the Cucumber Tests

To execute the end-to-end tests and generate a report in JSON format:

```
npm run test
```

This command will:
- Run all `.feature` files located in the `features/` directory.
- Output the test results in a file called `cucumber_report.json`.

### 2. Generate HTML Report

Once the tests are complete, you can generate a readable HTML report. Use the following command:

```
npm run generate:report
```
This command will:
- Take the `cucumber_report.json` file and generate an HTML report.
- The report will be created in the `./reports` folder.

## Customizing Reports

If you want to customize the report's appearance or output location, you can modify `report.js` according to your needs.

## Example Commands

1. Run tests and generate the JSON report:

```
npm run test
```
2. Generate the HTML report from the JSON output:

```
npm run generate:report
```

## Manual tests

Manual test cases can be found in Gherkin syntax under the 'manual' folder. 
