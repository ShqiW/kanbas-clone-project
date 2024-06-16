import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addAssignment, updateAssignment } from "../Assignments/reducer";
import { parseDateString } from "./parseDateString";
import * as client from "../Assignments/client";

export default function AssignmentEditor() {
    const { cid, aid } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { assignments } = useSelector((state) => state.assignmentsReducer);
    const [error, setError] = useState("");

    const initialAssignment = {
        title: "New Assignment",
        description: "New Assignment Description",
        points: "100",
        dueDate: "",
        availableFrom: "",
        availableUntil: "",
        course: cid
    };

    const [assignment, setAssignmentState] = useState(initialAssignment);
    // const [isEditing, setIsEditing] = useState(false); // 新增的状态

    useEffect(() => {
        if (aid && assignments.length > 0) {
            const matchedAssignment = assignments.find((a) => a._id === aid) || initialAssignment;
            setAssignmentState(matchedAssignment);
        }
    }, [aid, assignments]);


    const handleFieldChange = (fieldName, value) => {
        setAssignmentState(prevState => ({
            ...prevState,
            [fieldName]: value
        }));
    };


    const handleSave = () => {
        const currentAssignment = { ...assignment }; // 确保使用最新的状态
        if (currentAssignment._id) {
            // Existing assignment
            client.updateAssignment(currentAssignment).then((updatedAssignment) => {
                dispatch(updateAssignment(updatedAssignment));
                navigate(`/Kanbas/Courses/${cid}/Assignments`);
            }).catch(err => setError(err.response.data));
        } else {
            // New assignment, assign a unique _id
            client.createAssignment(cid, currentAssignment).then((newAssignment) => {
                dispatch(addAssignment(newAssignment));
                navigate(`/Kanbas/Courses/${cid}/Assignments`);
            }).catch(err => setError(err.response.data));
        }
    };

    return (
        <div className="flex-fill">
            <div id="wd-assignments-editor" className="ms-5 me-5 row">
                {error && <div className="alert alert-danger">{error}</div>}
                <form>
                    <div>
                        <label htmlFor="title" className="col col-form-label">Assignment Name</label>
                        <div className="col mb-3">
                            <input
                                id="title"
                                className="form-control"
                                value={assignment.title}
                                onChange={(e) => handleFieldChange("title", e.target.value)}
                            />
                        </div>
                        <div className="row mb-3 ms-1">
                            <textarea
                                id="assignmentDescription"
                                className="form-control mb-2"
                                cols={10}
                                value={assignment.description}
                                onChange={(e) => handleFieldChange("description", e.target.value)}
                            />
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="points" className="col-3 col-form-label text-end">Points</label>
                            <div className="col border ms-2.3 me-2.5 rounded">
                                <input
                                    id="points"
                                    className="col-9 form-control border-0"
                                    value={assignment.points}
                                    onChange={(e) => handleFieldChange("points", e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-3   text-end">Assign</div>
                            <div className="col border rounded">
                                <label htmlFor="dueDate" className="col-form-label text-end">Due</label>
                                <div className="col">
                                    <input
                                        type="datetime-local"
                                        id="dueDate"
                                        className="form-control"
                                        value={parseDateString(assignment.dueDate)}
                                        min={parseDateString(assignment.availableUntil)}
                                        onChange={(e) => handleFieldChange("dueDate", e.target.value)}
                                    />
                                </div>
                                <div className="row mb-3">
                                    <div className="col">
                                        <label htmlFor="availableFrom" className="col-form-label">Available From</label>
                                        <input
                                            type="datetime-local"
                                            id="availableFrom"
                                            className="form-control"
                                            value={parseDateString(assignment.availableFrom)}
                                            onChange={(e) => handleFieldChange("availableFrom", e.target.value)}
                                        />
                                    </div>
                                    <div className="col">
                                        <label htmlFor="availableUntil" className="col-form-label">Available Until</label>
                                        <input
                                            type="datetime-local"
                                            id="availableUntil"
                                            className="form-control"
                                            value={parseDateString(assignment.availableUntil)}
                                            min={parseDateString(assignment.availableFrom)}
                                            onChange={(e) => handleFieldChange("availableUntil", e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="row mb-3 float-end">
                            <div className="col">
                                <Link to={`/Kanbas/Courses/${cid}/Assignments`} className="btn btn-secondary me-2">Cancel</Link>
                                <button
                                    onClick={handleSave}
                                    className="btn btn-success me-2 float-end"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
