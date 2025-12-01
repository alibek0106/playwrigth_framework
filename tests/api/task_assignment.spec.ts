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
        const userID = 2; // Known valid user
        const response = await api.getSingleUser(userID);
        expect(response.status(), 'Response status is not OK').toBe(StatusCode.OK);
        // Assert Schema
        const body = await response.json();
        SingleUserResponseSchema.parse(body);

        // Assert Data
        expect(body.data.id, 'ID is not as expected').toBe(userID);
        expect(body.data.email, 'Email is not as expected').toContain('reqres.in');
    });

    // 2. Negative GET
    // Fetch a non-existent user
    test(('2. Negative GET - User Not Found'), async ({ api }) => {
        const ivalidId = 99999;
        const response = await api.getSingleUser(ivalidId);
        expect(response.status(), 'User with id: 9999 was found').toBe(StatusCode.NOT_FOUND);

        const body = await response.json();
        expect(Object.keys(body).length, 'Response body is not empty').toBe(0);
    });

    // 3. Positive POST
    // Create a new user successfully
    test('3. Positive POST - Create User', async ({ api }) => {
        const [userData] = DataFactory.generateUserList(1);
        const response = await api.createUser({
            name: userData.name,
            job: userData.job
        });

        expect(response.status(), 'Response status is not Created').toBe(StatusCode.CREATED);

        const body = CreateUserResponseSchema.parse(await response.json());

        expect(body.name, 'Name is not as expected').toBe(userData.name);
        expect(body.job, 'Job is not as expected').toBe(userData.job);
        expect(body.id, 'ID is not defined').toBeDefined();
    });

    // 4. Negative POST
    // Try to register without a password (Missing required field)
    test('4. Negative POST - Register Unsuccessful', async ({ api }) => {
        const email = process.env.REQRES_USER_NOPASS!;
        const response = await api.registerUser(email, undefined);
        expect(response.status(), 'Response status is not Bad Request').toBe(StatusCode.BAD_REQUEST);

        const body = await response.json();
        expect(body.error).toBe('Missing password');
    });
})