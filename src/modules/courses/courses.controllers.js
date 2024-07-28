import StateHandler from "../../middleware/stateHandler.js"
import coursesMem from "./courses.mem.js"
import courseModel from "./courses.model.js"
import lessonModel from "./lessons.model.js"


export class coursesControllers {

    /**
     * ### createCourse
     * @description Creates a new course with the provided data. The course is associated with a creator (user) identified by either an address or an ID. 
     * The function validates the required parameters and adds the newly created course to the memory.
     * @param {Object} data - Course data
     * @param {string} [data.creator_address] - Address of the creator (optional if creator_id is provided)
     * @param {string} [data.creator_id] - ID of the creator (optional if creator_address is provided)
     * @param {string} data.name - Name of the course
     * @param {string} data.img_url - URL of the course image
     * @param {string} data.description - Description of the course
     * @returns {Promise<Object>} Result of the operation
     */
    async createCourse(data) {
        // Validate that either creator_address or creator_id is provided
        if (!data.creator_address && !data.creator_id) {
            return await StateHandler.handleReport({
                error: `creator id or address is required.`,
            });
        }
        // Validate required course fields
        if (!data.name || !data.img_url || !data.description) {
            return await StateHandler.handleReport({
                error: `course name, img_url, and description are required.`,
            });
        }

        // Find user based on address or id
        let user;
        if (data.creator_address) {
            user = usersMem.getUserByAddress(data.creator_address);
        } else if (data.creator_id) {
            user = usersMem.getOneUser(data.creator_id);
        }

        if (!user) {
            return await StateHandler.handleReport({
                error: `creator not found.`,
            });
        }

        // Create and add the new course
        return await StateHandler.advanceWrapper(() => {
            const course = new courseModel({ ...data, owner: user.id });
            coursesMem.addCourse(course);

            return {
                success: true,
                message: `Course created successfully!`,
                data: course.toJson(),
            };
        });
    }

    /**
     * ### getCourses
     * @description Retrieves all courses from memory.
     * @returns {Promise<Object>} Result of the operation with a list of all courses.
     */
    async getCourses() {
        return await StateHandler.inspectWrapper(() => {
            return {
                success: true,
                message: `Courses retrieved!`,
                data: coursesMem.getAllCourses(),
            };
        });
    }

    /**
     * ### getLessons
     * @description Retrieves all lessons for a specified course. The course is identified by its ID.
     * @param {string} course_id - ID of the course to retrieve lessons for
     * @returns {Promise<Object>} Result of the operation with a list of lessons.
     */
    async getLessons(course_id) {
        // Validate that course_id is provided
        if (!course_id) {
            return await StateHandler.handleReport({
                error: `course_id is required.`,
            });
        }

        // Find the course
        const course = coursesMem.getOneCourse(course_id);

        if (!course) {
            return await StateHandler.handleReport({
                error: `Course with ID '${course_id}' not found.`,
            });
        }

        // Retrieve and return lessons
        return await StateHandler.inspectWrapper(() => {
            return {
                success: true,
                message: `Lessons retrieved!`,
                data: course.getLessons(),
            };
        });
    }

    /**
     * ### createLessons
     * @description Creates a new lesson and adds it to a specified course. The lesson is created by a user identified by either an address or an ID.
     * @param {Object} data - Lesson data
     * @param {string} [data.creator_address] - Address of the creator (optional if creator_id is provided)
     * @param {string} [data.creator_id] - ID of the creator (optional if creator_address is provided)
     * @param {string} data.course_id - ID of the course to add the lesson to
     * @param {string} data.name - Name of the lesson
     * @param {string} data.module - Module of the lesson
     * @param {string} data.content - Content of the lesson
     * @returns {Promise<Object>} Result of the operation
     */
    async createLessons(data) {
        // Validate that either creator_address or creator_id is provided
        if (!data.creator_address && !data.creator_id) {
            return await StateHandler.handleReport({
                error: `creator id or address is required.`,
            });
        }

        // Validate that course_id is provided
        if (!data.course_id) {
            return await StateHandler.handleReport({
                error: `course_id is required.`,
            });
        }

        // Validate required lesson fields
        if (!data.name || !data.module || !data.content) {
            return await StateHandler.handleReport({
                error: `lesson name, module, and content are required.`,
            });
        }

        // Find user based on address or id
        let user;
        if (data.creator_address) {
            user = usersMem.getUserByAddress(data.creator_address);
        } else if (data.creator_id) {
            user = usersMem.getOneUser(data.creator_id);
        }

        if (!user) {
            return await StateHandler.handleReport({
                error: `creator not found.`,
            });
        }

        const course = coursesMem.getOneCourse(data.course_id);
        if (!course) {
            return await StateHandler.handleReport({
                error: `Course with ID '${data.course_id}' not found.`,
            });
        }

        // Create and add the new lesson
        return await StateHandler.advanceWrapper(() => {
            const lesson = new lessonModel(data);
            course.addLesson(lesson);

            return {
                success: true,
                message: `Lesson created successfully!`,
                data: lesson.toJson(),
            };
        });
    }

    /**
     * ### getCreatorCourses
     * @description Retrieves all courses created by a specified user. The user is identified by either an address or an ID.
     * @param {string} creator_id - ID of the creator (optional if creator_address is provided)
     * @returns {Promise<Object>} Result of the operation with a list of courses created by the user.
     */
    async getCreatorCourses(creator_id) {
        // Validate that either creator_address or creator_id is provided
        if (!creator_id) {
            return await StateHandler.handleReport({
                error: `creator id is required.`,
            });
        }

        // Find user based on address or id
        let user = usersMem.getOneUser(data.creator_id)

        if (!user) {
            return await StateHandler.handleReport({
                error: `creator not found.`,
            });
        }

        // Retrieve and return courses created by the user
        return await StateHandler.inspectWrapper(() => {
            return {
                success: true,
                message: `Courses retrieved!`,
                data: coursesMem.getOwnerCourses(user.id),
            };
        });
    }

    /**
     * ### getCourseId
     * @description Retrieves a specific course by its ID.
     * @param {string} id - ID of the course to retrieve
     * @returns {Promise<Object>} Result of the operation with the course data.
     */
    async getCourseId(id) {
        // Find the course by ID
        const course = coursesMem.getOneCourse(id);

        if (!course) {
            return await StateHandler.handleReport({
                error: `Course with ID '${id}' not found.`,
            });
        }

        // Retrieve and return the course data
        return await StateHandler.inspectWrapper(() => {
            return {
                success: true,
                message: `Course retrieved!`,
                data: course.toJson(),
            };
        });
    }
}
