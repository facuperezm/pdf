/**
 * an array of routes that are public
 * this routes do not require authentication
 * @type {string[]}
 */

export const publicRoutes = ["/"];

/**
 * an array of routes that require authentication
 * @type {string[]}
 */
export const authRoutes = ["/auth/login"];

/**
 * api prefix for API authentication routes
 * Routes that start with this prefix are considered API routes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * Default redirect path after login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";
