import { faker } from '@faker-js/faker';
import { CreateUserRequest } from '../models/api/ReqResModels';

export class DataFactory {
    /**
     * Generates an array of random users for DDT.
     * @param count - How many users to generate
     */
    static generateUserList(count: number): CreateUserRequest[] {
        const users: CreateUserRequest[] = [];

        for (let i = 0; i < count; i++) {
            users.push({
                name: faker.person.fullName(),
                job: faker.person.jobTitle()
            });
        }

        // Edge Case
        users.push({
            name: "OConner-Smith",
            job: "QA & Automation"
        });

        return users;
    }
}