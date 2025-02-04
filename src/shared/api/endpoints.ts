const config = {
    develop: 'http://localhost:8000',
    production: 'https://across-the-world-backend.onrender.com'
}
export const apiUrl = config.production;

export const endpoints = {
    path: {
        tours: '/tours',
        regions: '/regions',
        reviews: '/reviews',
        news: '/news',
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