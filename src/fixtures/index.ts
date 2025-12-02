import { test as base } from "@playwright/test";
import { ReqResFixture, reqResFixture } from "./reqRes.fixture";

type MyFixtures = ReqResFixture;

export const test = base.extend<MyFixtures>({
    ...reqResFixture,
});

export { expect } from "@playwright/test";