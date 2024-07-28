class CourseMemory {
    courses;

    constructor() {
        this.courses = new Map();
    }

    /**
     * ### CourseMemory addCourse
     * @description Adds a new course to the memory.
     * @param {Object} course - The course object to add.
     */
    addCourse(course) {
        this.courses.set(course.id, course);
    }

    /**
     * ### CourseMemory getAllCourses
     * @description Returns all courses in the memory.
     * @returns {Array} Array of all courses.
     */
    getAllCourses() {
        return Array.from(this.courses.values());
    }

    /**
     * ### CourseMemory getOneCourse
     * @description Returns a single course by ID.
     * @param {string} courseId - The ID of the course to retrieve.
     * @returns {Object|undefined} The course object, or undefined if not found.
     */
    getOneCourse(courseId) {
        return this.courses.get(courseId);
    }

    /**
     * ### CourseMemory updateOneCourse
     * @description Updates a course's details by ID.
     * @param {string} courseId - The ID of the course to update.
     * @param {Object} update - The update object containing new values.
     * @returns {boolean} True if the update was successful, false if the course was not found.
     */
    updateOneCourse(courseId, update) {
        const course = this.courses.get(courseId);
        if (!course) {
            return false;
        }
        course.updateCourseDetails(update);
        return true;
    }

    /**
     * ### CourseMemory getOwnerCourses
     * @description Returns an array of courses with the same owner.
     * @param {string} owner - The owner of the courses to retrieve.
     * @returns {Array} Array of courses with the specified owner.
     */
    getOwnerCourses(owner) {
        return Array.from(this.courses.values()).filter(course => course.owner === owner);
    }
}

export default new CourseMemory()