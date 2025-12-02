import { test as base } from "@playwright/test";
import { UiFixtures, uiFixture } from './ui.fixture';

type MyFixtures = UiFixtures;

export const test = base.extend<MyFixtures>({
    ...uiFixture,
});

export { expect } from "@playwright/test";