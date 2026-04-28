import { Locator, Page } from "@playwright/test";

export class PimPage {
    readonly page: Page;
    readonly addButton: Locator;
    readonly pimHeader: Locator;
    readonly firstNameInput: Locator;
    readonly middleNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly saveButton: Locator;
    readonly newEmployeeNameHeading: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addButton = this.page.getByRole('button', { name: 'Add' });
        this.pimHeader = this.page.getByRole('heading', { name: 'Employee Information' });
        this.firstNameInput = this.page.getByPlaceholder('First Name');
        this.middleNameInput = this.page.getByPlaceholder('Middle Name');
        this.lastNameInput = this.page.getByPlaceholder('Last Name');
        this.saveButton = this.page.getByRole('button', { name: 'Save' });
        this.newEmployeeNameHeading = this.page.locator('.orangehrm-edit-employee-name');
    }

    // async verifyPimPage() {
    //     await expect(this.pimHeader).toBeVisible();
    //     await expect(this.pimHeader).toHaveText('Employee Information');
    // }

    async addNewEmployee(firstName: string, middleName: string, lastName: string) {
        await this.addButton.click();
        await this.firstNameInput.fill(firstName);
        await this.middleNameInput.fill(middleName);
        await this.lastNameInput.fill(lastName);
        await this.saveButton.click();
    }
}