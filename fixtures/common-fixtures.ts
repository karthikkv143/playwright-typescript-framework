import { test as baseTest } from "./pom-fixtures";
import CommonUtils from "../utils/CommonUtils";


//creating reusable method
let createObject = (PageClass: any) => async ({ page }: any, use: any) => {
    await use(new PageClass(page));
}


type commonFixtures = {
    commonUtils : CommonUtils;
}

export const test = baseTest.extend<commonFixtures>({
    commonUtils : createObject(CommonUtils)
});