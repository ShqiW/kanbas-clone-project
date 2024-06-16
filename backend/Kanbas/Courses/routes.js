import * as dao from "./dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js"

export default function CourseRoutes(app) {
    const createCourse = async (req, res) => {
        const currentUser = req.session["currentUser"];
        if (!currentUser || currentUser.role != 'FACULTY') {
            res.sendStatus(401);
            return;
        }
        const course = await dao.createCourse(req.body)
        await enrollmentsDao.createEnrollment({
            user: currentUser._id,
            course: course._id,
        })
        res.json(course)
    }
    const findAllCourses = async (req, res) => {
        const courses = await dao.findAllCourses();
        res.json(courses);
    }
    const findCourseById = async (req, res) => {
        const course = await dao.findCourseById(req.params.id);
        res.json(course);
    }
    const updateCourse = async (req, res) => {
        const { id } = req.params;
        const status = await dao.updateCourse(id, req.body)
        res.json(status)
    }

    const deleteCourse = async (req, res) => {
        const { id } = req.params;
        const status = await dao.deleteCourse(id, req.body)
        res.json(status)
    }

    app.post("/api/courses", createCourse);
    app.get("/api/courses", findAllCourses);
    app.get("/api/courses/:id", findCourseById);
    app.put("/api/courses/:id", updateCourse);
    app.delete("/api/courses/:id", deleteCourse);
}
