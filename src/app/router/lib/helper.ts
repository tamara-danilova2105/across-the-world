export const getRouteMain = () => '/';
export const getRouteAbout = () => '/about';
export const getRouteBlog = () => '/blog';
export const getRouteBlogDetails = (id: string) => `/blog/${id}`;
export const getRouteTours = () => '/tours';
export const getRouteToursDetails = (region: string, id: string) => `/tours/${region}/${id}`;
export const getRouteTestimonials = () => '/testimonials';
export const getRouteAdmin = () => '/admin';
export const getRoutePrivacyPolicy = () => '/privacy-policy';
export const getRouteSignin = () => '/signin'