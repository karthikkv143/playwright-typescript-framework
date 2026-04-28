import { expect } from "@playwright/test";
import { test } from "../fixtures/hooks-fixtures";


// test.beforeEach(`Before each testcase`, async ({ loginPage }) => {
//     await loginPage.gotoOrangeHrm();
// });

// Global teardown is not required as we are handling logout in afterEach hook
// test.afterAll(`After each testcase`, async ({ dashboardPage }) => {
//     await dashboardPage.logoutFromApplication();
// });

test('Login with valid credentials', async ({ page, gotourl }) => {
    console.log(await page.title());
});

test('Validate orange hrm title', async ({ page, gotourl, logoutFromApp  }) => {
    await expect(page).toHaveTitle('OrangeHRM');
});


