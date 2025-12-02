export enum SortOption {
    NAME_AZ = 'az',
    NAME_ZA = 'za',
    PRICE_LOW_HIGH = 'lohi',
    PRICE_HIGH_LOW = 'hilo'
}

export const ExpectedProducts = {
    ZA_FIRST_ITEM: 'Test.allTheThings() T-Shirt (Red)',
    LOHI_FIRST_ITEM: 'Sauce Labs Onesie',
    LOHI_FIRST_PRICE: '$7.99',
    HILO_FIRST_ITEM: 'Sauce Labs Fleece Jacket',
    HILO_FIRST_PRICE: '$49.99'
} as const;