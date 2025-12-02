import { faker } from '@faker-js/faker';

export class DataFactory {
    /**
     * Set seed for deterministic generation (use in CI)
     */
    static setSeed(seed: number) {
        faker.seed(seed);
    }

    /**
     * Reset to random generation
     */
    static resetSeed() {
        faker.seed();
    }

    // ============ SAUCE DEMO USER DATA ============

    /**
     * Get SauceDemo standard user credentials from environment or defaults
     */
    static getSauceUser() {
        return {
            username: process.env.SAUCE_USER || 'standard_user',
            password: process.env.SAUCE_PASS || 'secret_sauce'
        };
    }

    /**
     * Get invalid SauceDemo credentials for negative testing
     */
    static getInvalidSauceUser() {
        return {
            username: process.env.SAUCE_USER || 'standard_user',
            password: 'wrong_password'
        };
    }

    // ============ CHECKOUT DATA ============

    /**
     * Generate random checkout details using Faker
     */
    static getCheckoutDetails() {
        return {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            postalCode: faker.location.zipCode()
        };
    }

    // ============ REQRES API DATA ============

    /**
     * Get known user from ReqRes API for testing
     */
    static getKnownUser() {
        return {
            id: 2,
            email: 'janet.weaver@reqres.in',
            firstName: 'Janet',
            lastName: 'Weaver'
        };
    }

    // ============ GENERIC USER DATA ============

    /**
     * Generate random user data
     */
    static generateUser() {
        return {
            email: faker.internet.email(),
            password: faker.internet.password({ length: 12 }),
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
        };
    }

    /**
     * Generate user with edge case characters
     */
    static generateUserWithEdgeCases() {
        return {
            email: faker.internet.email(),
            password: faker.internet.password({ length: 12 }),
            firstName: "O'Connor-Smith",
            lastName: "María José",
        };
    }

    // ============ BULK GENERATION ============

    /**
     * Generate multiple users for data-driven tests
     */
    static generateUsers(count: number) {
        return Array.from({ length: count }, () => this.generateUser());
    }

    /**
     * Deterministic generation for consistent CI results
     */
    static generateDeterministicUsers(count: number, seed: number = 42) {
        this.setSeed(seed);
        const users = this.generateUsers(count);
        this.resetSeed();
        return users;
    }
}