import { expect, Locator, Page } from "@playwright/test";

export class DashBoardPage {
    readonly page: Page;
    readonly dashboardHeader: Locator;
    readonly userProfileIcon: Locator;
    readonly logoutButton: Locator;
    readonly pimLink: Locator;
    readonly orangeHrmLogo: Locator;
    readonly leftSideMenu: Locator; 
    constructor(page: Page) {
        this.page = page;
        this.dashboardHeader = this.page.getByRole('heading', { name: 'Dashboard' });
        this.userProfileIcon = this.page.locator('.oxd-userdropdown-name');
        this.logoutButton = this.page.getByRole('menuitem', { name: 'Logout' });
        this.pimLink = this.page.getByRole('link', { name: 'PIM' });
        this.orangeHrmLogo = this.page.locator('.oxd-brand-banner');
        this.leftSideMenu = this.page.locator('div.oxd-sidepanel-body');
    }


    async verifyDashboardPage() {
        await this.page.waitForURL(`${process.env.BASE_URL}/web/index.php/dashboard/index`);
        await expect(this.dashboardHeader).toBeVisible();
        await expect(this.dashboardHeader).toHaveText('Dashboard');
        // await this.page.waitForTimeout(3000);
    }

    async logoutFromApplication() {
        await this.userProfileIcon.click();
        await this.logoutButton.click();
        await this.page.waitForURL(`${process.env.BASE_URL}/web/index.php/auth/login`);
    }

    async navigateToPIMPage() {
        await this.pimLink.isVisible();
        await this.pimLink.click();
        await this.page.waitForURL(`${process.env.BASE_URL}/web/index.php/pim/viewEmployeeList`);
    }
}