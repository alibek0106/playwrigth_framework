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
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Referer': 'https://reqres.in/',
                'Origin': 'https://reqres.in',
                'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"'
            }
        });

        const service = new ReqResService(context);
        await use(service);
        await context.dispose();
    }
};