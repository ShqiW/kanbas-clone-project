



import { FaEllipsisVertical } from "react-icons/fa6"
import { FaEdit, FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { findQuizzesForCourse } from "./client";
import { setQuizzes } from "./reducer";
import { formatDate } from "../Assignments/DateFormat";

export default function Quizzes() {
    const { cid } = useParams();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.accountReducer);
    const quizzes = useSelector((state) => state.quizzesReducer.quizzes);

    const fetchQuizzes = async () => {
        if (cid) {
            try {
                const fetchedQuizzes = await findQuizzesForCourse(cid);
                dispatch(setQuizzes(fetchedQuizzes));
            } catch (error) {
                console.error("Error fetching quizzes:", error);
            }
        }
    };

    useEffect(() => {
        fetchQuizzes();
    }, [cid]);

    return (
        <div className="container">
            <div className="row">
                <div className="col-6">
                    <input id="quiz-search" className="form-control" placeholder="Search for Quiz" />
                </div>
                <div className="col-6 text-end">
                    <button type="button" className="btn btn-danger ps-3 pe-3 me-2">
                        <FaPlus /> Quiz
                    </button>
                    <button type="button" className="btn btn-light rounded pl-0 ps-3 pe-3">
                        <FaEllipsisVertical />
                    </button>
                </div>
            </div>
            <hr />

            <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center">
                <span style={{ fontWeight: "bold" }}>Assignment Quizzes</span>
            </div>
            <ul className="list-group">
                {quizzes.map((quiz) => (
                    <li key={quiz._id} className="list-group-item">
                        <Link to={`/Kanbas/Courses/${cid}/quizzes/${quiz._id}`} className="wd-quiz-list-item list-group-item d-flex align-items-center justify-content-between">
                            <FaEllipsisVertical className="me-2" />
                            <div className="flex-grow-1">
                                <div>
                                    <span style={{ fontWeight: "bold" }}>{quiz.name}</span>
                                </div>
                                <div>
                                    <span className="text-danger">Multiple Modules</span> |
                                    <span style={{ fontWeight: "bold" }}>Not available until </span>
                                    {quiz.availableFrom ? formatDate(quiz.availableFrom) : 'N/A'} |
                                    <span style={{ fontWeight: "bold" }}>Due </span>
                                    {quiz.dueDate ? formatDate(quiz.dueDate) : 'N/A'} |
                                    <span style={{ fontWeight: "bold" }}>Points </span>
                                    {quiz.points ? `${quiz.points} pts` : 'N/A pts'}
                                </div>
                            </div>
                            <div className="d-flex align-items-center me-4">
                                <FaEdit style={{ color: "green" }} className="me-2" />
                                <FaEllipsisVertical className="me-2" />
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>

            <pre>{JSON.stringify(quizzes, null, 2)}</pre>
        </div>
    );
}
