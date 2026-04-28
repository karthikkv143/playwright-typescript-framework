import {test as baseTest} from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { DashBoardPage } from "../pages/DashBoardPage";
import { PimPage } from "../pages/PimPage";

type pomFixtures ={
    loginPage: LoginPage;
    dashboardPage: DashBoardPage;
    pimPage: PimPage;
}

//creating reusable method
let createObject = (PageClass: any) => async ({ page }: any, use: any) => {
    await use(new PageClass(page));
}

export const test = baseTest.extend<pomFixtures>({
    loginPage: createObject(LoginPage),
    dashboardPage: createObject(DashBoardPage),
    pimPage: createObject(PimPage),
});

export {expect} from "@playwright/test";

