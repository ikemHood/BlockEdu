import userModel from "./users.model.js";
import StateHandler from "../../middleware/stateHandler.js";
import usersMem from "./users.mem.js";
import coursesMem from "../courses/courses.mem.js";

/**
 * UsersControllers class to manage user-related operations.
 */
export class UsersControllers {

    /**
     * Create a new user and add them to the in-memory users list.
     * 
     * @param {Object} data - Data for the new user.
     * @param {string} data.address - The address of the new user.
     * @returns {Promise<Object>} A promise that resolves to an object containing success status, a message, and the new user's data.
     */
    async createUser(data) {
        return await StateHandler.advanceWrapper(() => {
            const user = new userModel(data.address);
            usersMem.addUser(user);

            return {
                success: true,
                message: 'User created successfully!',
                data: user.toJson(),
            };
        });
    }

    /**
     * Retrieve all users from the in-memory users list.
     * 
     * @returns {Promise<Object>} A promise that resolves to an object containing success status, a message, and the list of users.
     */
    async getUsers() {
        return await StateHandler.inspectWrapper(() => {
            return {
                success: true,
                message: 'Users retrieved!',
                data: usersMem.getUsers(),
            };
        });
    }

    /**
     * Retrieve a user by their address.
     * 
     * @param {string} address - The address of the user to be retrieved.
     * @returns {Promise<Object>} A promise that resolves to an object containing success status, a message, and the user's data if found.
     */
    async getUserByAddress(address) {
        const user = usersMem.getUserByAddress(address);

        if (!user) {
            return await StateHandler.handleReport({
                error: `User with address '${address}' not found.`,
            });
        }

        return await StateHandler.inspectWrapper(async () => {
            return {
                success: true,
                message: 'User retrieved!',
                data: user.toJson(),
            };
        });
    }

    /**
     * Retrieve a user by their ID.
     * 
     * @param {string} id - The ID of the user to be retrieved.
     * @returns {Promise<Object>} A promise that resolves to an object containing success status, a message, and the user's data if found.
     */
    async getUserById(id) {
        const user = usersMem.getUserByAddress(id);

        if (!user) {
            return await StateHandler.handleReport({
                error: `User with ID '${id}' not found.`,
            });
        }

        return await StateHandler.inspectWrapper(async () => {
            return {
                success: true,
                message: 'User retrieved!',
                data: user.toJson(),
            };
        });
    }

    /**
     * Add a course to a user's waitlist.
     * 
     * @param {Object} data - Data containing the user's address or ID and the course ID.
     * @param {string} [data.address] - The address of the user.
     * @param {string} [data.id] - The ID of the user.
     * @param {string} data.course_id - The ID of the course to be added to the waitlist.
     * @returns {Promise<Object>} A promise that resolves to an object containing success status and a message if successful.
     */
    async AddToWaitlist(data) {
        if (!data.address && !data.id) {
            return await StateHandler.handleReport({
                error: 'User ID or address is required.',
            });
        }
        if (!data.course_id) {
            return await StateHandler.handleReport({
                error: 'Course ID is required.',
            });
        }

        let user;
        if (data.address) {
            user = usersMem.getUserByAddress(data.address);
        } else if (data.id) {
            user = usersMem.getOneUser(data.id);
        }

        if (!user) {
            return await StateHandler.handleReport({
                error: 'User not found.',
            });
        }

        const course = coursesMem.getOneCourse(data.course_id);

        if (!course) {
            return await StateHandler.handleReport({
                error: 'Course not found.',
            });
        }

        user.AddWaitlist(course);

        return await StateHandler.advanceWrapper(() => {
            return {
                success: true,
                message: 'Course added to waitlist successfully!',
            };
        });
    }

    /**
     * Add a course to a user's cart.
     * 
     * @param {Object} data - Data containing the user's address or ID and the course ID.
     * @param {string} [data.address] - The address of the user.
     * @param {string} [data.id] - The ID of the user.
     * @param {string} data.course_id - The ID of the course to be added to the cart.
     * @returns {Promise<Object>} A promise that resolves to an object containing success status and a message if successful.
     */
    async AddToCart(data) {
        if (!data.address && !data.id) {
            return await StateHandler.handleReport({
                error: 'User ID or address is required.',
            });
        }
        if (!data.course_id) {
            return await StateHandler.handleReport({
                error: 'Course ID is required.',
            });
        }

        let user;
        if (data.address) {
            user = usersMem.getUserByAddress(data.address);
        } else if (data.id) {
            user = usersMem.getOneUser(data.id);
        }

        if (!user) {
            return await StateHandler.handleReport({
                error: 'User not found.',
            });
        }

        const course = coursesMem.getOneCourse(data.course_id);

        if (!course) {
            return await StateHandler.handleReport({
                error: 'Course not found.',
            });
        }

        user.addCart(course);

        return await StateHandler.advanceWrapper(() => {
            return {
                success: true,
                message: 'Course added to cart successfully!',
            };
        });
    }

    /**
     * Remove a course from a user's cart.
     * 
     * @param {Object} data - Data containing the user's address or ID and the course ID.
     * @param {string} [data.address] - The address of the user.
     * @param {string} [data.id] - The ID of the user.
     * @param {string} data.course_id - The ID of the course to be removed from the cart.
     * @returns {Promise<Object>} A promise that resolves to an object containing success status and a message if successful.
     */
    async removeFromCart(data) {
        if (!data.address && !data.id) {
            return await StateHandler.handleReport({
                error: 'User ID or address is required.',
            });
        }
        if (!data.course_id) {
            return await StateHandler.handleReport({
                error: 'Course ID is required.',
            });
        }

        let user;
        if (data.address) {
            user = usersMem.getUserByAddress(data.address);
        } else if (data.id) {
            user = usersMem.getOneUser(data.id);
        }

        if (!user) {
            return await StateHandler.handleReport({
                error: 'User not found.',
            });
        }

        const course = coursesMem.getOneCourse(data.course_id);

        if (!course) {
            return await StateHandler.handleReport({
                error: 'Course not found.',
            });
        }

        user.removeCart(course.id);

        return await StateHandler.advanceWrapper(() => {
            return {
                success: true,
                message: 'Course removed from cart successfully!',
            };
        });
    }

    /**
     * Remove a course from a user's waitlist.
     * 
     * @param {Object} data - Data containing the user's address or ID and the course ID.
     * @param {string} [data.address] - The address of the user.
     * @param {string} [data.id] - The ID of the user.
     * @param {string} data.course_id - The ID of the course to be removed from the waitlist.
     * @returns {Promise<Object>} A promise that resolves to an object containing success status and a message if successful.
     */
    async removeFromWaitlist(data) {
        if (!data.address && !data.id) {
            return await StateHandler.handleReport({
                error: 'User ID or address is required.',
            });
        }
        if (!data.course_id) {
            return await StateHandler.handleReport({
                error: 'Course ID is required.',
            });
        }

        let user;
        if (data.address) {
            user = usersMem.getUserByAddress(data.address);
        } else if (data.id) {
            user = usersMem.getOneUser(data.id);
        }

        if (!user) {
            return await StateHandler.handleReport({
                error: 'User not found.',
            });
        }

        const course = coursesMem.getOneCourse(data.course_id);

        if (!course) {
            return await StateHandler.handleReport({
                error: 'Course not found.',
            });
        }

        user.removeWaitlist(course.id);

        return await StateHandler.advanceWrapper(() => {
            return {
                success: true,
                message: 'Course removed from waitlist successfully!',
            };
        });
    }

    /**
       * Retrieve the waitlist for a user.
       * 
       * @param {string} id - The address of the user.
       * @returns {Promise<Object>} A promise that resolves to an object containing success status, a message, and the user's waitlist if found.
       */
    async getUserWaitlist(id) {
        if (!id) {
            return await StateHandler.handleReport({
                error: 'User ID or address is required.',
            });
        }

        const user = usersMem.getOneUser(data.id)
        if (!user) {
            return await StateHandler.handleReport({
                error: 'User not found.',
            });
        }

        return await StateHandler.inspectWrapper(() => {
            return {
                success: true,
                message: 'Waitlist retrieved successfully!',
                data: user.getWaitlist(),
            };
        });
    }
    
    /**
     * Retrieve the cart for a user.
     * 
     * @param {string} id - The ID of the user.
     * @returns {Promise<Object>} A promise that resolves to an object containing success status, a message, and the user's cart if found.
     */
    async getUserCart(id) {
        if (!id) {
            return await StateHandler.handleReport({
                error: 'User ID or address is required.',
            });
        }

        const user = usersMem.getOneUser(data.id)
        if (!user) {
            return await StateHandler.handleReport({
                error: 'User not found.',
            });
        }

        return await StateHandler.inspectWrapper(() => {
            return {
                success: true,
                message: 'Cart retrieved successfully!',
                data: user.getCart(),
            };
        });
    }

    /**
     * Retrieve the enrolled courses for a user.
     * 
     * @param {string} id - The ID of the user.
     * @returns {Promise<Object>} A promise that resolves to an object containing success status, a message, and the user's enrolled courses if found.
     */
    async getUserEnrolledCourses(id) {
        if (!id) {
            return await StateHandler.handleReport({
                error: 'User ID or address is required.',
            });
        }

        const user = usersMem.getOneUser(data.id)
        if (!user) {
            return await StateHandler.handleReport({
                error: 'User not found.',
            });
        }

        return await StateHandler.inspectWrapper(() => {
            return {
                success: true,
                message: 'Enrolled courses retrieved successfully!',
                data: user.getEnrolled(),
            };
        });
    }

    /**
     * Enroll a user in a course.
     * 
     * @param {Object} data - Data containing the user's address or ID, the course ID, and payment status.
     * @param {string} [data.address] - The address of the user.
     * @param {string} [data.id] - The ID of the user.
     * @param {string} data.course_id - The ID of the course to enroll in.
     * @param {boolean} data.paid - Whether the user has paid for the course.
     * @returns {Promise<Object>} A promise that resolves to an object containing success status and a message if successful.
     */
    async enrollToCourse(data) {
        if (!data.address && !data.id) {
            return await StateHandler.handleReport({
                error: 'User ID or address is required.',
            });
        }
        if (!data.course_id) {
            return await StateHandler.handleReport({
                error: 'Course ID is required.',
            });
        }

        let user;
        if (data.address) {
            user = usersMem.getUserByAddress(data.address);
        } else if (data.id) {
            user = usersMem.getOneUser(data.id);
        }

        if (!user) {
            return await StateHandler.handleReport({
                error: 'User not found.',
            });
        }

        const course = coursesMem.getOneCourse(data.course_id);

        if (!course) {
            return await StateHandler.handleReport({
                error: 'Course not found.',
            });
        }

        // This is a placeholder for payment handling.
        if (!data.paid) {
            return await StateHandler.handleReport({
                error: 'User has not purchased the course.',
            });
        }

        user.enroll(course);

        return await StateHandler.advanceWrapper(() => {
            return {
                success: true,
                message: `User has enrolled in ${course.name}.`,
            };
        });
    }
}
