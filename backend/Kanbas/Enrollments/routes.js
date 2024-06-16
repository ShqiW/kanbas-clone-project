import * as dao from "./dao.js";

export default function EnrollmentRoutes(app) {
    const createEnrollment = async (req, res) => {
        const currentUser = req.session["currentUser"];
        const enrollment = await dao.createEnrollment({
            user: currentUser._id,
            course: req.body._id
        })
        res.json(enrollment)
    }
    const findEnrollmentByUser = async (req, res) => {
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
            res.sendStatus(401);
            return;
        }
        const course = await dao.findEnrollmentByUserId(currentUser._id);
        res.json(course);
    }
    const deleteEnrollment = async (req, res) => {
        const status = await dao.deleteEnrollment(req.params.id)
        res.json(status)
    }

    app.post("/api/enrollments", createEnrollment);
    app.get("/api/enrollments", findEnrollmentByUser);
    app.delete("/api/enrollments/:id", deleteEnrollment);
}
