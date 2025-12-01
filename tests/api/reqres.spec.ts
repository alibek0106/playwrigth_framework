import { test, expect } from '../../src/fixtures';
import { DataFactory } from '../../src/utils/DataFactory';
import {
    CreateUserResponseSchema,
    SingleUserResponseSchema,
    ListUsersSchema,
    RegisterResponseSchema
} from '../../src/models/api/ReqResModels';
import { StatusCode } from '../../src/constants/StatusCode';

// DDT tests
test.describe('ReqRes API = Data Driven Tests', { tag: ['@api', '@regression'] }, () => {
    // Generate test data before the tests run
    const testData = DataFactory.generateDeterministicUserList(3);

    for (const [index, user] of testData.entries()) {
        test(`POST Create User - Iteration ${index + 1} (Job: ${user.job})`, { tag: index === 0 ? '@smoke' : undefined }, async ({ api }) => {
            const response = await api.createUser({ name: user.name, job: user.job });
            expect(response.status(), 'Response status is not Created').toBe(StatusCode.CREATED);

            const body = await response.json();
            CreateUserResponseSchema.parse(body);
            expect(body.name, 'Name is not as expected').toBe(user.name);
            expect(body.job, 'Job is not as expected').toBe(user.job);
        });
    }
});

// General API tests
test.describe('ReqRes API tests', { tag: ['@api', '@regression'] }, () => {
    test('GET Single User - Happy Path', { tag: '@smoke' }, async ({ api }) => {
        const response = await api.getSingleUser(2);
        expect(response.status(), 'Response status is not OK').toBe(StatusCode.OK);

        const body = await response.json();
        SingleUserResponseSchema.parse(body);
        expect(body.data.id, 'ID is not as expected').toBe(2);
        expect(body.data.email, 'Email does not contain expected website').toContain('reqres.in');
    });

    test('GET Single User - Not Found', async ({ api }) => {
        const response = await api.getSingleUser(9999);
        expect(response.status(), 'User with id: 9999 was found').toBe(StatusCode.NOT_FOUND);
        // 404 returns empty object {}
        const body = await response.json();
        expect(Object.keys(body).length).toBe(0);
    });

    test('GET List Users - Pagination', async ({ api }) => {
        const page = 2;
        const response = await api.listUsers(page);
        expect(response.status(), 'Response status is not OK').toBe(StatusCode.OK);

        const body = await response.json();
        ListUsersSchema.parse(body);
        expect(body.page, 'Page is not as expected').toBe(page);
        expect(body.data.length, 'Data length is not as expected').toBeGreaterThan(0);
    });

    test('POST Register - Success', { tag: '@smoke' }, async ({ api }) => {
        const response = await api.registerUser(process.env.REQRES_USER!, process.env.REQRES_PASS!);
        expect(response.status(), 'Response status is not as expected').toBe(StatusCode.OK);

        const body = await response.json();
        RegisterResponseSchema.parse(body);
        expect(body.token, 'Register token is not defined').toBeDefined();
    });

    test('POST Register - Missing Password (negative)', async ({ api }) => {
        const response = await api.registerUser(process.env.REQRES_USER_NOPASS!); // Missing password
        expect(response.status(), 'Response status is not as expected').toBe(StatusCode.BAD_REQUEST);

        const body = await response.json();
        expect(body.error, 'Error message is not as expected').toBe('Missing password');
    });
});