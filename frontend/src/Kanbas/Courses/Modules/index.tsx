import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import * as client from "./client";
import ModuleControlButtons from "./ModuleControlButtons";
import { BsGripVertical } from 'react-icons/bs';
import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import { addModule, editModule, updateModule, deleteModule, setModules } from "./reducer";
import { useSelector, useDispatch } from "react-redux";

export default function Modules() {
    const [error, setError] = useState("");
    const { cid } = useParams();
    const [moduleName, setModuleName] = useState("");
    const { modules } = useSelector((state: any) => state.modulesReducer);
    const dispatch = useDispatch();

    const fetchModules = async () => {
        const modules = await client.findModulesForCourse(cid as string);
        dispatch(setModules(modules));
    };

    const createModule = async (module: any) => {
        try {
            const newModule = await client.createModule(cid as string, module);
            dispatch(addModule(newModule));
        } catch (err: any) {
            setError(err.response.data)
        }
    };
    const removeModule = async (moduleId: string) => {
        try {
            await client.deleteModule(moduleId);
            dispatch(deleteModule(moduleId));
        } catch (err: any) {
            setError(err.response.data)
        }
    };
    const saveModule = async (module: any) => {
        try {
            const status = await client.updateModule(module);
            dispatch(updateModule(module));
        } catch (err: any) {
            setError(err.response.data)
        }
    };



    useEffect(() => {
        fetchModules();
    }, [cid]);

    return (
        <div id="wd-modules">
            {error && <div className="alert alert-danger">{error}</div>}
            <ModulesControls setModuleName={setModuleName} moduleName={moduleName}
                addModule={() => {
                    createModule({ name: moduleName, course: cid });
                    setModuleName("");
                }} /><br /><br /><br /><br />
            <ul id="wd-modules" className="list-group rounded-0">
                {modules
                    .filter((module: any) => module.course === cid)
                    .map((module: any) => (
                        <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
                            <div className="wd-title p-3 ps-2 bg-secondary">
                                <BsGripVertical className="me-2 fs-3" />
                                {!module.editing && module.name}
                                {module.editing && (
                                    <input className="form-control w-50 d-inline-block"
                                        // onChange={(e) => dispatch(updateModule({ ...module, name: e.target.value }))}
                                        // onKeyDown={(e) => {
                                        //     if (e.key === "Enter") {
                                        //         dispatch(updateModule({ ...module, editing: false }));
                                        //     }
                                        // }}
                                        onChange={(e) => saveModule({ ...module, name: e.target.value })}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                saveModule({ ...module, editing: false });
                                            }
                                        }}
                                        value={module.name} />
                                )}

                                <ModuleControlButtons moduleId={module._id}
                                    // deleteModule={(moduleId) => {dispatch(deleteModule(moduleId));}}
                                    deleteModule={(moduleId) => { removeModule(moduleId); }}

                                    editModule={(moduleId) => dispatch(editModule(moduleId))}
                                />
                            </div>
                            {module.lessons && (
                                <ul className="wd-lessons list-group rounded-0">
                                    {module.lessons.map((lesson: any) => (
                                        <li className="wd-lesson list-group-item p-3 ps-1">
                                            <BsGripVertical className="me-2 fs-3" />
                                            {lesson.name}
                                            <LessonControlButtons />
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
            </ul>
        </div>
    );
}






