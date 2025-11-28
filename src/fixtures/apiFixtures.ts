import { test as base, request as playwrightRequest } from '@playwright/test';
import { ReqResService } from '../api/ReqResService';

type ApiFixtures = {
    api: ReqResService;
};

export const test = base.extend<ApiFixtures>({
    api: async ({ }, use) => {
        const context = await playwrightRequest.newContext({
            baseURL: process.env.API_URL,
            extraHTTPHeaders: {
                'Content-Type': 'application/json',
                'x-api-key': 'reqres-free-v1',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });

        const service = new ReqResService(context);
        await use(service);
        await context.dispose();
    }
});

export { expect } from '@playwright/test';