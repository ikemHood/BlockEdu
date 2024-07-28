import crypto from 'node:crypto';

export default class User {
    id;
    cart;
    address;
    enrolled;
    watchlist;
    createdAt;

    /**
     * ### User model required data
     * @param {string} address - Address (e.g., "0x...")
     */
    constructor(address) {
        this.id = crypto.randomUUID();
        this.address = address;
        this.createdAt = Date.now();
        this.watchlist = new Map();
        this.cart = new Map();
        this.enrolled = new Map();
    }

    /**
     * ### User toJson
     * @description Returns user's basic data.
     * @returns {Object} User object containing id, address, and createdAt.
     */
    toJson() {
        return {
            id: this.id,
            address: this.address,
            createdAt: this.createdAt,
        };
    }

    /**
     * ### User getWaitlist
     * @description Returns an array of courses in the user's waitlist.
     * @returns {Array} Array of CoursesModel in the waitlist.
     */
    getWaitlist() {
        return Array.from(this.watchlist.values());
    }

    /**
     * ### User getCart
     * @description Returns an array of courses in the user's cart.
     * @returns {Array} Array of CoursesModel in the cart.
     */
    getCart() {
        return Array.from(this.cart.values());
    }

    /**
     * ### User getEnrolled
     * @description Returns an array of courses the user is enrolled in.
     * @returns {Array} Array of CoursesModel the user is enrolled in.
     */
    getEnrolled() {
        return Array.from(this.enrolled.values());
    }

    /**
     * ### User addWaitlist
     * @description Adds a single course to the user's waitlist.
     * @param {Object} course - CoursesModel to be added to the waitlist.
     */
    addWaitlist(course) {
        this.watchlist.set(course.id, course);
    }

    /**
     * ### User addCart
     * @description Adds a single course to the user's cart.
     * @param {Object} course - CoursesModel to be added to the cart.
     */
    addCart(course) {
        this.cart.set(course.id, course);
    }
    
    /**
     * ### User enroll
     * @description Enrolls the user in a course.
     * @param {Object} course - CoursesModel to enroll the user in.
     */
    enroll(course) {
        this.enrolled.set(course.id, course);
    }

    /**
     * ### User removeCart
     * @description Removes a single course from the user's cart.
     * @param {string} courseId - The ID of the course to be removed from the cart.
     */
    removeCart(courseId) {
        this.cart.delete(courseId);
    }

    /**
     * ### User removeWaitlist
     * @description Removes a single course from the user's waitlist.
     * @param {string} courseId - The ID of the course to be removed from the waitlist.
     */
    removeWaitlist(courseId) {
        this.watchlist.delete(courseId);
    }
}
