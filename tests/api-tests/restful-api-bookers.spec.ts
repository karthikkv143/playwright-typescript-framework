import { test, expect } from "../../fixtures/hooks-fixtures";
import apiPathData from "../../testdata/api-data/api-path-data.json";
import restfulBookerApiData from "../../testdata/api-data/restful-booker-api-data.json";

test('Sample test to verify API testing with Playwright', { tag: ['@API', '@QA'], annotation: { type: 'Test case link', description: 'Please provide jira ticket link' } },
    async ({ request }) => {
        const response = await request.get(`${apiPathData.apiEndpoints.getBookings}`);
        const responseBody = await response.json();
        expect(response.status()).toBe(restfulBookerApiData.status);
        expect(response.statusText()).toBe(restfulBookerApiData.status_text);
        expect(await response.body()).not.toBeNull();
        expect(responseBody).not.toBeNull();
        expect(response.headers()['content-type']).toContain(restfulBookerApiData.content_type);
        console.log(responseBody);
    });

test('Get the book by id and verify the response', { tag: ['@API', '@QA'], annotation: { type: 'Test case link', description: 'Please provide jira ticket link' } }, async ({ request }) => {
    const response = await request.get(`${apiPathData.apiEndpoints.getBookingById}`.replace('{id}', '4'));
    const responseBody = await response.json();
    console.log(responseBody);
    expect(response.status()).toBe(restfulBookerApiData.status);
    expect(response.statusText()).toBe(restfulBookerApiData.status_text);
    expect(await response.body()).not.toBeNull();
    expect(responseBody).not.toBeNull();
    expect(response.headers()['content-type']).toContain(restfulBookerApiData.content_type);
    console.log(responseBody);
});

test('Create a new booking', { tag: ['@API', '@QA'], annotation: { type: 'Test case link', description: 'Please provide jira ticket link' } },
    async ({ request }) => {
        const response = await request.post(`${apiPathData.apiEndpoints.createBooking}`, { data: restfulBookerApiData.createBookingRequestBody });
        const responseBody = await response.json();
        console.log(responseBody);
        expect(response.status()).toBe(restfulBookerApiData.status);
        expect(responseBody.booking.firstname).toBe(restfulBookerApiData.createBookingRequestBody.firstname);
        expect(responseBody.booking.lastname).toBe(restfulBookerApiData.createBookingRequestBody.lastname);
    });

test('Update the booking details with Authentication', { tag: ['@API', '@QA'], annotation: { type: 'Test case link', description: 'Please provide jira ticket link' } },
    async ({ request }) => {
        const response = await request.put(`${apiPathData.apiEndpoints.updateBooking}`.replace('{id}', '2'),
            {
                headers: {
                    //we can keep this autorization header in playwright.config.ts file as well if all the API's have same authentication mechanism and credentials
                    Authorization: "Basic YWRtaW46cGFzc3dvcmQxMjM="
                },
                data: restfulBookerApiData.updateBookingRequestBody
            });
        console.log(response);
        const responseBody = await response.json();
        console.log(responseBody);
        expect(response.status()).toBe(restfulBookerApiData.status);
        expect(responseBody.firstname).toBe(restfulBookerApiData.updateBookingRequestBody.firstname);
        expect(responseBody.lastname).toBe(restfulBookerApiData.updateBookingRequestBody.lastname);
    });

test('Update the booking details with auth token', { tag: ['@API', '@QA'], annotation: { type: 'Test case link', description: 'Please provide jira ticket link' } },
    async ({ request ,commonApiUtils}) => {
        const token = await commonApiUtils.createToken();
        console.log(`${token} ===token is`);
        const response = await request.put(`${apiPathData.apiEndpoints.updateBooking}`.replace('{id}', '10'),
            {
                headers: {
                    cookie: `token=${token}`
                },
                data: restfulBookerApiData.updateBookingRequestBody
            });
        console.log(response);
        const responseBody = await response.json();
        console.log(responseBody);
        expect(response.status()).toBe(restfulBookerApiData.status);
        expect(responseBody.firstname).toBe(restfulBookerApiData.updateBookingRequestBody.firstname);
        expect(responseBody.lastname).toBe(restfulBookerApiData.updateBookingRequestBody.lastname);
    });