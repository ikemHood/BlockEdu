import crypto from 'node:crypto';

export default class Lesson {
    id;
    name;
    module;
    content;
    createdAt;

    /**
     * ### Lesson model required data
     * @param {Object} params - Lesson parameters
     * @param {string} params.name - Lesson name
     * @param {string} params.module - Module the lesson belongs to
     * @param {string} params.content - Content of the lesson
     */
    constructor({ name, module, content }) {
        this.id = crypto.randomUUID();
        this.name = name;
        this.module = module;
        this.content = content;
        this.createdAt = Date.now();
    }

    /**
         * ### Lesson toJson
         * @description Returns the lesson's details as a JSON object.
         * @returns {Object} Lesson object containing id, name, module, course, content, and createdAt.
         */
    toJson() {
        return {
            id: this.id,
            name: this.name,
            module: this.module,
            content: this.content,
            createdAt: this.createdAt,
        };
    }
}
