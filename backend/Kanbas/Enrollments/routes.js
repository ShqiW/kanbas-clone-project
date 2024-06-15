import * as dao from "./dao.js";

export default function EnrollmentRoutes(app) {
    const createEnrollment = async (req, res) => {
        const course = await dao.createEnrollment(req.body)
        res.json(course)
    }
    const findEnrollmentByUserId = async (req, res) => {
        const course = await dao.findEnrollmentByUserId(req.params.userId);
        res.json(course);
    }
    const deleteEnrollment = async (req, res) => {
        const status = await dao.deleteEnrollment(req.params.id)
        res.json(status)
    }

    app.post("/api/enrollments", createEnrollment);
    app.get("/api/enrollments/:userId", findEnrollmentByUserId);
    app.delete("/api/enrollments/:id", deleteEnrollment);
}
