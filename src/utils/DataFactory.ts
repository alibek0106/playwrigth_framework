import { faker } from '@faker-js/faker';

export class DataFactory {

    static getSauceUser() {
        return {
            username: 'standard_user',
            password: 'secret_sauce'
        };
    }

    static getInvalidSauceUser() {
        return {
            username: 'standard_user',
            password: 'wrong_password'
        };
    }

    static getCheckoutDetails() {
        return {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            postalCode: faker.location.zipCode()
        };
    }

    static getKnownUser() {
        return {
            id: 2,
            email: 'janet.weaver@reqres.in',
            firstName: 'Janet',
            lastName: 'Weaver'
        };
    }
}