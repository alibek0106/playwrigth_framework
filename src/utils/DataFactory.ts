import { faker } from '@faker-js/faker';
import { CreateUserRequest } from '../models/api/ReqResModels';

export class DataFactory {
    /**
     * Generate a repeatable (deterministic) list of users.
     * Useful for Data Driven Tests where we want consistent results in CI 
     */
    static generateDeterministicUserList(count: number, seed: number = 123): CreateUserRequest[] {
        faker.seed(seed);
        return this.generateUserList(count);
    }
    /**
     * Generates an array of random users for DDT.
     * @param count - How many users to generate
     * @param includeEdgeCases - Whether to include edge cases
     */
    static generateUserList(count: number, includeEdgeCases: boolean = false): CreateUserRequest[] {

        if (includeEdgeCases && count < 1) {
            throw new Error('Count must be at least 1 to include edge cases');
        }

        const users: CreateUserRequest[] = [];

        const randomCount = includeEdgeCases ? count - 1 : count;

        for (let i = 0; i < randomCount; i++) {
            users.push({
                name: faker.person.fullName(),
                job: faker.person.jobTitle()
            });
        }

        if (includeEdgeCases) {
            users.push({
                name: "OConner-Smith",
                job: "QA & Automation"
            });
        }
        return users;
    }

    static getEdgeCaseUser() {

    }

    static getCheckoutDetails() {
        return {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            postalCode: faker.location.zipCode()
        };
    }
}