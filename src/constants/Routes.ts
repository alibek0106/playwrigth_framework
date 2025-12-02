export const Routes = {
    // API
    USERS: '/api/users',
    REGISTER: '/api/register',
    userById: (id: number) => `/api/users/${id}`,

    // UI
    LOGIN: '/',
    INVENTORY: '/inventory.html',
    CART: '/cart.html',
    CHECKOUT_STEP_ONE: '/checkout-step-one.html',
    CHECKOUT_STEP_TWO: '/checkout-step-two.html',
    CHECKOUT_COMPLETE: '/checkout-complete.html',
} as const;