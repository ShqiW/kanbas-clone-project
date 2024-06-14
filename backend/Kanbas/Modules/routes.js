import * as dao from "./dao.js";


export default function ModuleRoutes(app) {
    const createModule = async (req, res) => {
        const { cid } = req.params;
        const module = { ...req.body, course: cid }
        const newModule = await dao.createModule(module)
        res.json(newModule)
    }
    const deleteModule = async (req, res) => {
        const status = await dao.deleteModule(req.params.mid)
        res.json(status)
    }
    const findModulesByCourse = async (req, res) => {
        const { cid } = req.params;
        const modules = await dao.findModulesByCourse(cid)
        res.send(modules)
    }
    const updateModule = async (req, res) => {
        const { mid } = req.params;
        const status = await dao.updateModule(mid, req.body);
        res.json(status);
    }

    app.post("/api/courses/:cid/modules", createModule)
    app.delete("/api/modules/:mid", deleteModule)
    app.put("/api/modules/:mid", updateModule);
    app.get("/api/courses/:cid/modules", findModulesByCourse);

}
