import { test as baseTest } from './common-fixtures'

type hooksFixtures = {
    gotourl: any;
    logoutFromApp: any;
}

export const test = baseTest.extend<hooksFixtures>({
    gotourl: async ({ loginPage }: any, use: () => Promise<void>) => {
        await loginPage.gotoOrangeHrm();
        await use();
    },

    logoutFromApp: async ({ dashboardPage }: any, use: () => Promise<void>) => {
        await use();
        await dashboardPage.logoutFromApplication();
    }
}); 

export { expect } from "@playwright/test";