import { test } from "../../fixtures/common-fixtures";

test(`Global Setup Test`, async ({ commonUtils, loginPage, page, dashboardPage }) => {
    const decryptedUsername = commonUtils.decryptData(process.env.HRM_USERNAME as string);
    const decryptedPassword = commonUtils.decryptData(process.env.HRM_PASSWORD as string);
    await loginPage.gotoOrangeHrm();
    await loginPage.loginToOrangeHrm(decryptedUsername, decryptedPassword);
    await page.waitForURL(`${process.env.BASE_URL}/web/index.php/dashboard/index`);
    await dashboardPage.verifyDashboardPage();
    await page.context().storageState({ path: './authentication/.auth/auth.json' });
});