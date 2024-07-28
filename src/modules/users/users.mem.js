class UsersMemory {
    Users;

    constructor(){
        this.Users = new Map()
    }

       /**
     * ### UsersMemory addUser
     * @description Adds a new user to the memory.
     * @param {Object} user - The user object to add.
     */
       addUser(user) {
        this.Users.set(user.id, user);
    }

    /**
     * ### UsersMemory getUsers
     * @description Returns all users in the memory.
     * @returns {Array} Array of all users.
     */
    getUsers() {
        return Array.from(this.Users.values());
    }

    /**
     * ### UsersMemory getOneUser
     * @description Returns a single user by ID.
     * @param {string} userId - The ID of the user to retrieve.
     * @returns {Object|undefined} The user object, or undefined if not found.
     */
    getOneUser(userId) {
        return this.Users.get(userId);
    }

    /**
     * ### UsersMemory getUserByAddress
     * @description Returns a single user by address.
     * @param {string} address - The address of the user to retrieve.
     * @returns {Object|undefined} The user object, or undefined if not found.
     */
    getUserByAddress(address) {
        for (let user of this.Users.values()) {
            if (user.address === address) {
                return user;
            }
        }
        return undefined;
    }
}

export default new UsersMemory()