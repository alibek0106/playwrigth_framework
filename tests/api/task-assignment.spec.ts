import { test, expect } from '../../src/fixtures';
import { DataFactory } from '../../src/utils/DataFactory';
import { StatusCode } from '../../src/constants/StatusCode';
import {
    CreateUserResponseSchema,
    SingleUserResponseSchema
} from '../../src/models/api/ReqResModels';

test.describe('Task Assignment: 4 API Scenarios', { tag: '@task' }, () => {
    // 1. Positive GET
    // Fetch a valid user and validate the contract
    test('1. Positive GET - Fetch Single User', async ({ api }) => {
        const knownUser = DataFactory.getKnownUser(); // Known valid user
        const response = await api.getSingleUser(knownUser.id);
        expect(response.status(), `GET /users/${knownUser.id} should return 200 OK, got ${response.status()}`).toBe(StatusCode.OK);
        // Assert Schema
        const json = await response.json();
        const body = SingleUserResponseSchema.parse(json);

        // Assert Data
        expect(body.data.id, `User ID in response should match requested ID: ${knownUser.id}`).toBe(knownUser.id);
        expect(body.data.email, `User ${knownUser.id} should have a valid reqres.in email`).toBe(knownUser.email);
    });

    // 2. Negative GET
    // Fetch a non-existent user
    test('2. Negative GET - User Not Found', async ({ api }) => {
        const invalidId = 99999;
        const response = await api.getSingleUser(invalidId);
        expect(response.status(), `GET /users/${invalidId} should return 404 Not Found`).toBe(StatusCode.NOT_FOUND);

        const body = await response.json();
        expect(Object.keys(body).length, 'Response body for non-existent user should be empty').toBe(0);
    });

    // 3. Positive POST
    // Create a new user successfully
    test('3. Positive POST - Create User', async ({ api }) => {
        const [userData] = DataFactory.generateUserList(1);
        const response = await api.createUser({
            name: userData.name,
            job: userData.job
        });

        expect(response.status(), 'POST /users should return 201 Created').toBe(StatusCode.CREATED);

        const body = CreateUserResponseSchema.parse(await response.json());

        expect(body.name, 'Response name should match request name').toBe(userData.name);
        expect(body.job, 'Response job should match request job').toBe(userData.job);
        expect(body.id, 'New user should have an ID').toBeDefined();
    });

    // 4. Negative POST
    // Try to register without a password (Missing required field)
    test('4. Negative POST - Register Unsuccessful', async ({ api }) => {
        const email = process.env.REQRES_USER_NOPASS!;
        if (!email) throw new Error('REQRES_USER_NOPASS env var is not set');

        const response = await api.registerUser(email, undefined);
        expect(response.status(), 'Registering without password should return 400 Bad Request').toBe(StatusCode.BAD_REQUEST);

        const body = await response.json();
        expect(body.error, 'Error message should indicate missing password').toMatch(/missing password/i);
    });
})