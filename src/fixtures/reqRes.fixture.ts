import { APIRequestContext, request as playwrightRequest } from "@playwright/test";
import { ReqResService } from "../api/ReqResService";

export type ReqResFixture = {
    api: ReqResService;
};

export const reqResFixture = {
    api: async ({ }, use: (r: ReqResService) => Promise<void>) => {
        const context = await playwrightRequest.newContext({
            baseURL: process.env.API_URL || 'https://reqres.in',
            extraHTTPHeaders: {
                'Content-Type': 'application/json',
                'x-api-key': 'reqres-free-v1',
            }
        });

        const service = new ReqResService(context);
        await use(service);
        await context.dispose();
    }
};