
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { IoSearch, IoEllipsisVertical } from "react-icons/io5";
import { BsGripVertical } from "react-icons/bs";
import { PiNoteBold } from "react-icons/pi";
import { deleteAssignment, setAssignments } from "./reducer";
import { FaPlus } from "react-icons/fa6";
import * as client from "./client";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { formatDate } from "./DateFormat";

export default function Assignments() {
    const { cid } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { assignments } = useSelector((state) => state.assignmentsReducer);
    console.log(assignments);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [assignmentToDelete, setAssignmentToDelete] = useState(null);
    const [error, setError] = useState("");

    const fetchAssignments = async () => {
        try {
            const fetchedAssignments = await client.findAssignmentsForCourse(cid);
            dispatch(setAssignments(fetchedAssignments));
        } catch (error) {
            console.error("Error fetching assignments: bug", error);
        }
    };

    useEffect(() => {
        fetchAssignments();
    }, [cid]);

    console.log("after usefetch assignment", assignments);


    const handleDelete = (assignmentId) => {
        setAssignmentToDelete(assignmentId);
        setShowConfirmation(true);
    };

    const confirmDelete = async () => {
        if (assignmentToDelete) {
            try {
                await client.deleteAssignment(assignmentToDelete);
                dispatch(deleteAssignment(assignmentToDelete));
            } catch (err: any) {
                setError(err.response.data)
            } finally {
                setShowConfirmation(false);
            }
        }
    };

    const cancelDelete = () => {
        setShowConfirmation(false);
    };

    return (
        <div className="flex-fill ms-5 me-10">
            <div id="wd-assignment" className="md-5">
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="wd-float-left d-flex" style={{ marginRight: '10px', verticalAlign: "middle" }}>
                    <div className="input-group border me-2 rounded" style={{ height: "40px" }}>
                        <span className="input-group-text border-0" style={{ backgroundColor: "transparent" }}>
                            <IoSearch />
                        </span>
                        <input
                            id="wd-search-assignment"
                            type="text"
                            className="form-control border-0 d-flex"
                            placeholder="Search"
                            style={{ width: "400px" }}
                        />
                    </div>
                </div>
                <div className="wd-float-right" style={{ verticalAlign: "middle", height: "40px" }}>
                    <button
                        onClick={() => {
                            navigate(`/Kanbas/Courses/${cid}/Assignments/new`);
                        }}
                        className="btn btn-danger me-2 float-end btn-m wd-btns"
                    >
                        <FaPlus /> Assignment
                    </button>
                </div>
                <div className="wd-float-done"></div>
            </div>

            <ul id="wd-assigment-list" className="list-group rounded-0 mt-5">
                {assignments.filter((assignment) => assignment.course === cid).map(assignment => (
                    <li key={assignment._id} className="wd-assignment-list-item list-group-item p-0 mb-5 fs-5 border-gray">
                        <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center">
                            <BsGripVertical className="me-2 fs-4" style={{ display: "inline-block" }} />
                            <span style={{ fontWeight: "bold" }}>Assignment</span>
                            <div className="ms-auto">
                                <div className="border border-black me-2 ps-2 pe-2 fs-5" style={{ borderRadius: "10px", display: "inline-block" }}>40% of Total</div>
                                <FaTrash className="me-2" onClick={() => handleDelete(assignment._id)} />
                                <FaPlus className="me-2 fs-4" style={{ display: "inline-block" }} />
                                <IoEllipsisVertical className="fs-4" style={{ display: "inline-block" }} />
                            </div>
                        </div>

                        <div id="wd-assignment-hyperlink-list">
                            <div className="list-group">
                                <Link to={`/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}
                                    className="wd-assignment-list-item list-group-item p-3 ps-1 d-flex align-items-center justify-content-between"
                                >
                                    <div className="d-flex align-items-center me-4">
                                        <BsGripVertical className="me-4 fs-3" />
                                        <PiNoteBold className="text-success fs-3" />
                                    </div>
                                    <div className="flex-grow-1">
                                        <div>
                                            <span style={{ fontWeight: "bold" }}>{assignment.title}</span>
                                        </div>
                                        <div>
                                            <span className="text-danger">Multiple Modules</span> |
                                            <span style={{ fontWeight: "bold" }}>Not available until </span>
                                            {assignment.availableFrom ? formatDate(assignment.availableFrom) : 'N/A'} |
                                            <span style={{ fontWeight: "bold" }}>Due </span>
                                            {assignment.dueDate ? formatDate(assignment.dueDate) : 'N/A'} |
                                            <span style={{ fontWeight: "bold" }}>Points </span>
                                            {assignment.points ? assignment.points : 'N/A'} pts
                                        </div>
                                    </div>
                                    <LessonControlButtons />
                                </Link>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            {showConfirmation && (
                <div className="modal" style={{ display: "block" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirm Delete</h5>
                                <button type="button" className="btn-close" onClick={cancelDelete}></button>
                            </div>
                            <div className="modal-body">
                                Are you sure you want to delete this assignment?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={cancelDelete}>Cancel</button>
                                <button type="button" className="btn btn-danger" onClick={confirmDelete}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

