import crypto from 'node:crypto';

export default class Course {
    id;
    name;
    owner;
    lessons;
    img_url;
    createdAt;
    description;

    /**
     * ### Course model required data
     * @param {Object} params - Course parameters
     * @param {string} params.name - Course name
     * @param {string} params.owner - Owner of the course
     * @param {string} params.img_url - Image URL of the course
     * @param {string} params.description - Description of the course
     */
    constructor({ name, owner, img_url, description }) {
        this.id = crypto.randomUUID();
        this.name = name;
        this.owner = owner;
        this.img_url = img_url;
        this.description = description;
        this.createdAt = Date.now();
        this.lessons = new Map();
    }

    /**
     * ### Course addLesson
     * @description Adds a single lesson to the course.
     * @param {Object} lesson - Lesson object to be added.
     */
    addLesson(lesson) {
        this.lessons.set(lesson.id, lesson);
    }

    /**
     * ### Course removeLesson
     * @description Removes a single lesson from the course.
     * @param {string} lessonId - The ID of the lesson to be removed.
     */
    removeLesson(lessonId) {
        this.lessons.delete(lessonId);
    }

    /**
     * ### Course updateCourseDetails
     * @description Updates course details.
     * @param {Object} params - Parameters to update.
     * @param {string} [params.name] - New course name.
     * @param {string} [params.owner] - New course owner.
     * @param {string} [params.img_url] - New image URL.
     * @param {string} [params.description] - New description.
     */
    updateCourseDetails({ name, owner, img_url, description }) {
        if (name) this.name = name;
        if (owner) this.owner = owner;
        if (img_url) this.img_url = img_url;
        if (description) this.description = description;
    }

    /**
     * ### Course getLessons
     * @description Returns an array of lessons in the course.
     * @returns {Array} Array of lesson objects.
     */
    getLessons() {
        return Array.from(this.lessons.values());
    }

    /**
     * ### Course toJson
     * @description Returns course basic data without lessons.
     * @returns {Object} Course object excluding lessons.
     */
    toJson() {
        return {
            id: this.id,
            name: this.name,
            owner: this.owner,
            img_url: this.img_url,
            description: this.description,
            createdAt: this.createdAt,
        };
    }
}
