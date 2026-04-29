import { test, expect } from "../../fixtures/hooks-fixtures";
import LoginModuleData from "../../testdata/ui-data/LoginModuleData.json";

test.use({
    storageState: {
        cookies: [],
        origins: []
    }
});

test.describe('Login with invalid credentials', { tag: ['@INVALIDLOGIN'] }, () => {
    test('Login with invalid username and valid password ', { tag: ['@UI', '@QA'], annotation: { type: 'Test case link', description: 'Please provide jira ticket link' } }
        , async ({ gotourl, commonUtils, loginPage }) => {
            const decryptedPassword = commonUtils.decryptData(process.env.HRM_PASSWORD as string);
            await loginPage.loginToOrangeHrm(LoginModuleData.invalid_username, decryptedPassword);
            await expect(loginPage.errorMessage).toHaveText(LoginModuleData.error_message);
            await expect(loginPage.errorMessage).toBeVisible();
            await expect(loginPage.usernameInput).toBeVisible();
        });

    test('Login with valid username and invalid password ', { tag: ['@UI', '@QA'], annotation: { type: 'Test case link', description: 'Please provide jira ticket link' } }
        , async ({ gotourl, commonUtils, loginPage }) => {
            const decryptedUserName = commonUtils.decryptData(process.env.HRM_USERNAME as string);
            await loginPage.loginToOrangeHrm(decryptedUserName, LoginModuleData.invalid_password);
            await expect(loginPage.errorMessage).toHaveText(LoginModuleData.error_message);
            await expect(loginPage.errorMessage).toBeVisible();
            await expect(loginPage.usernameInput).toBeVisible();
        });

    test('Login with invalid username and invalid password ', { tag: ['@UI', '@QA'] }, async ({ gotourl, commonUtils, loginPage }) => {
        await loginPage.loginToOrangeHrm(LoginModuleData.invalid_username, LoginModuleData.invalid_password);
        await expect(loginPage.errorMessage).toHaveText(LoginModuleData.error_message);
        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.usernameInput).toBeVisible();
    });
});


test('Login with valid username and valid password ', { tag: ['@UI', '@UAT'] }, async ({ gotourl, commonUtils, loginPage, dashboardPage }) => {
    const decryptedUserName = commonUtils.decryptData(process.env.HRM_USERNAME as string);
    const decryptedPassword = commonUtils.decryptData(process.env.HRM_PASSWORD as string);
    await loginPage.loginToOrangeHrm(decryptedUserName, decryptedPassword);
    await dashboardPage.verifyDashboardPage();
}); 

test('Verify visual elements on dashboard page', { tag: ['@VISUAL', '@QA'] }, async ({ gotourl, commonUtils, loginPage, dashboardPage }) => {
    const decryptedUserName = commonUtils.decryptData(process.env.HRM_USERNAME as string);
    const decryptedPassword = commonUtils.decryptData(process.env.HRM_PASSWORD as string);
    await loginPage.loginToOrangeHrm(decryptedUserName, decryptedPassword);
    await dashboardPage.verifyDashboardPage();
    await expect(dashboardPage.orangeHrmLogo).toHaveScreenshot('../screenshots/orangeHrm.png',);
    await expect(dashboardPage.leftSideMenu).toHaveScreenshot('../screenshots/leftSideMenu.png',);
});