import { coursesControllers } from "./modules/courses/courses.controllers.js";
import { UsersControllers } from "./modules/users/users.controllers.js";

const userRoutes = new UsersControllers()
const coursesRoutes = new coursesControllers()

export default {
    // User routes
    create_user: userRoutes.createUser, // advance
    get_users: userRoutes.getUsers, // inspect
    get_user_by_address: userRoutes.getUserByAddress, // inspect
    get_user_by_id: userRoutes.getUserById, // inspect
    add_to_waitlist: userRoutes.AddToWaitlist, // advance
    add_to_cart: userRoutes.AddToCart, // advance
    remove_from_cart: userRoutes.removeFromCart, // advance
    remove_from_waitlist: userRoutes.removeFromWaitlist, // advance
    get_user_waitlist: userRoutes.getUserWaitlist, // inspect
    get_user_cart: userRoutes.getUserCart, // inspect
    get_user_enrolled_courses: userRoutes.getUserEnrolledCourses, // inspect
    enroll_to_course: userRoutes.enrollToCourse, // advance

    // Courses routes
    create_course: coursesRoutes.createCourse, // advance
    get_courses: coursesRoutes.getCourses, // inspect
    get_lessons: coursesRoutes.getLessons, // inspect
    create_lessons: coursesRoutes.createLessons, // advance
    get_creator_courses: coursesRoutes.getCreatorCourses, // inspect
    get_course_by_id: coursesRoutes.getCourseId, // inspect
};

