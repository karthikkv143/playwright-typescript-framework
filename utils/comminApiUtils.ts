import { APIRequestContext } from "@playwright/test";
import apiPathData from "../testdata/api-data/api-path-data.json";
import CommonUtils from "./CommonUtils";

export default class CommonApiUtils {

    private request: APIRequestContext;
    constructor(request: APIRequestContext) {
        this.request = request;
    }

    public async createToken(): Promise<string> {
        const commonUtils = new CommonUtils();
        const apiUserName = commonUtils.decryptData(process.env.API_USERNAME!);
        const apiPassword = commonUtils.decryptData(process.env.API_PASSWORD!);
        const response = await this.request.post(apiPathData.apiEndpoints.auth, {
            data: {
                username: apiUserName,
                password: apiPassword
            }
        });
        const responseBody = await response.json();
        return responseBody.token;
    }

}