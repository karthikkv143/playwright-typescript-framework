import { Locator, Page } from "@playwright/test";

/**
 * Page Object Model class representing the Login Page of OrangeHRM application.
 * This class encapsulates the elements and actions related to the login functionality.
 */
export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = this.page.getByRole('textbox', { name: 'Username' });
        this.passwordInput = this.page.getByPlaceholder('Password');
        this.loginButton = this.page.getByRole('button', { name: 'Login' });
        this.errorMessage = this.page.getByRole('alert');
    }


    /**
     * Navigate to the OrangeHRM login page
     */
    async gotoOrangeHrm() {
        // console.log(`${process.env.BASE_URL}/web/index.php/auth/login`);
        await this.page.goto(`${process.env.BASE_URL}/web/index.php/auth/login`);
    }

    /**
     * Perform login action with provided username and password
     * @param username - The username to login with
     * @param password - The password to login with
     */
    async loginToOrangeHrm(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

}