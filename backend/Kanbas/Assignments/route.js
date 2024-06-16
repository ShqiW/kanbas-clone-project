import * as dao from "./dao.js";

export default function AssignmentRoutes(app) {
    const createAssignment = async (req, res) => {
        const currentUser = req.session["currentUser"];
        if (!currentUser || currentUser.role !== "FACULTY") {
            res.sendStatus(401);
            return;
        }
        const { cid } = req.params;
        const assignment = { ...req.body, course: cid };
        const newAssignment = await dao.createAssignment(assignment);
        res.json(newAssignment);
    };

    const deleteAssignment = async (req, res) => {
        const currentUser = req.session["currentUser"];
        if (!currentUser || currentUser.role !== "FACULTY") {
            res.sendStatus(401);
            return;
        }
        const status = await dao.deleteAssignment(req.params.aid);
        res.json(status);
    };

    const findAssignmentsByCourse = async (req, res) => {
        const { cid } = req.params;
        const assignments = await dao.findAssignmentsByCourse(cid);
        res.json(assignments);
    };

    const updateAssignment = async (req, res) => {
        const currentUser = req.session["currentUser"];
        if (!currentUser || currentUser.role !== "FACULTY") {
            res.sendStatus(401);
            return;
        }
        const { aid } = req.params;
        const status = await dao.updateAssignment(aid, req.body);
        res.json(status);
    };

    app.post("/api/courses/:cid/assignments", createAssignment);
    app.delete("/api/assignments/:aid", deleteAssignment);
    app.put("/api/assignments/:aid", updateAssignment);
    app.get("/api/courses/:cid/assignments", findAssignmentsByCourse);
}
