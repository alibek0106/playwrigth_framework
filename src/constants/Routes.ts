export const Routes = {
    // API
    USERS: '/api/users',
    REGISTER: 'api/register',
    userById: (id: number) => `/api/users/${id}`,

    // UI
    LOGIN: '/',
    INVENTORY: '/inventory.html',
    CART: '/cart.html'
};