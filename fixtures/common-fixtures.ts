import { test as baseTest } from "./pom-fixtures";
import CommonUtils from "../utils/CommonUtils";
import CommonApiUtils from "../utils/comminApiUtils";


//creating reusable method
let createObject = (PageClass: any) => async ({ page }: any, use: any) => {
    await use(new PageClass(page));
}

let createApiObject = (PageClass: any) => async ({ page }: any, use: any) => {
    await use(new PageClass(page));
}


type commonFixtures = {
    commonUtils : CommonUtils;
    commonApiUtils : CommonApiUtils;
}

export const test = baseTest.extend<commonFixtures>({
    commonUtils : createObject(CommonUtils),
    commonApiUtils : async ({ request }, use) => {
        await use(new CommonApiUtils(request));
    }
});