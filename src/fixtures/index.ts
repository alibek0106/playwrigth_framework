import { test as base } from "@playwright/test";
import { ReqResFixture, reqResFixture } from "./reqRes.fixture";
import { UiFixtures, uiFixture } from './ui.fixture';

type MyFixtures = ReqResFixture & UiFixtures;

export const test = base.extend<MyFixtures>({
    ...reqResFixture,
    ...uiFixture,
});

export { expect } from "@playwright/test";