# Airtable Automation

This project consists automation for two test cases.

- Testcase 1: validating the sign-up flow
- Testcase 2: validating the inviting collaborators flow via email
- A few negative tests in addition to the above testcases to further more validate the above functionalities

## Tech-stack used

I have used following libraries/modules to complete the assignment

- [Cypress](https://docs.cypress.io/) - Automation framework
- [@testing-library/cypress](https://testing-library.com/) - test library which helps in locating elements the way end-user interacts with it
- [eslint-plugin-cypress](https://www.npmjs.com/package/eslint-plugin-cypress) - a library which helps in maintaing the coding standards across the project
- [eslint-plugin-unused-imports](https://www.npmjs.com/package/eslint-plugin-unused-imports) - library to automatically fix/remove the unused imports

## Installation

### Prerequisite
Requires [Node.js](https://nodejs.org/) (preferbly stable latest) to run. Also, please save the project to you local machine and follow the following steps to install and run the project. Make sure you are in the root level of the project before running the next set of commands.

### Steps to install and run the tests
1. `npm install` to install all the required dependencies of the project
2. to run the tests
   - in terminal mode, `npm run cy:run`
   - in GUI mode, `npm run cy:open`
