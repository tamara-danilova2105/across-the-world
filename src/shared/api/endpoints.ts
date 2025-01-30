const config = {
    develop: 'http://localhost:8000',
}
export const apiUrl = config.develop;

export const endpoints = {
    path: {
        tours: '/tours',
        regions: '/regions',
        reviews: '/reviews'
    },
    admin: {
        registration: '/registration',
        signin: '/login',
        logout: '/logout',
        reset_password: '/reset-password',
        refresh_password: '/refresh-password',
        refresh: '/refresh'
    }
}