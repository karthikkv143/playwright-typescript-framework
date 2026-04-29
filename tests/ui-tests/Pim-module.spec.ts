import { test, expect } from "../../fixtures/hooks-fixtures";
import pimData from "../../testdata/ui-data/pim-module-data.json";

test('Verify employee is sucessfully created under PIM module', { tag: ['@UI', '@QA', '@PIM'] }, async ({ page, gotourl, dashboardPage, pimPage }) => {
    await test.step('Login to the application and verify dashboard page', async () => {
        await expect(page).toHaveTitle('OrangeHRM');
        await dashboardPage.verifyDashboardPage();
    });

    await test.step('Navigate to PIM page and verify the page', async () => {
        await dashboardPage.navigateToPIMPage();
        await expect(pimPage.pimHeader).toHaveText('Employee Information');
    });

    await test.step('Add new employee and verify the employee is created successfully', async () => {
        await pimPage.addNewEmployee(pimData.first_name, pimData.middle_name, pimData.last_name);
        await expect(pimPage.newEmployeeNameHeading).toHaveText(`${pimData.first_name} ${pimData.last_name}`);
    });
});