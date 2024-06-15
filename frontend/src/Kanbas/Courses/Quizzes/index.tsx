


import { FaEdit, FaPlus } from "react-icons/fa";
import { FaEllipsisVertical } from "react-icons/fa6"
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { findQuizzesForCourse } from "./client";
import { setQuizzes } from "./reducer";
import { useCallback, useEffect } from "react";
import * as client from "./client"
import { formatDate } from "../Assignments/DateFormat";

export default function Quizzes() {
    const { cid } = useParams();

    const dispatch = useDispatch();
    const user = useSelector((state) => state.accountReducer);
    const quizzes = useSelector((state) => state.quizzesReducer.quizzes);
    const quizList = quizzes.filter(
        (quiz) => quiz.course === cid);
    console.log("ql", quizList);



    const fetchQuizzes = async () => {
        //console.log("intrack")
        if (cid) {
            try {
                const fetchedQuizzes = await client.findQuizzesForCourse(cid);
                dispatch(setQuizzes(fetchedQuizzes));
                console.log("fetched Quizzes", fetchedQuizzes)
            } catch (error) {
                console.error("Error fetching quizzes: bug", error);
            }
        }
    };


    useEffect(() => {
        fetchQuizzes();
    }, [cid]);

    console.log("after usefetch quiz", quizzes);

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

            <ul id="wd-quiz-list" className="list-group">
                <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center">
                    <span style={{ fontWeight: "bold" }}>Assignment Quizzes</span>
                </div>
                <ul className="list-group">
                    {quizzes.map((quiz) => (
                        <li key={quiz._id} className="list-group-item">

                            <Link to={`/Kanbas/Courses/${cid}/quizzes/${quiz._id}`}
                                className="wd-quiz-list-item list-group-item d-flex align-items-center justify-content-between">
                                <div>
                                    <FaEllipsisVertical className="me-2" />
                                </div>

                                <div className="flex-grow-1">
                                    <div>
                                        <span style={{ fontWeight: "bold" }}>{quiz.name}</span>
                                    </div>
                                    <div>
                                        <span className="text-danger">Multiple Modules</span> |
                                        <span style={{ fontWeight: "bold" }}>Not available until </span>
                                        {quiz.availableFrom ? formatDate(quiz.availableFrom) : 'N/A'} |
                                        <span style={{ fontWeight: "bold" }}>Due </span>
                                        {quiz.dueDate ? formatDate(quiz).dueDate : 'N/A'} |
                                        <span style={{ fontWeight: "bold" }}>Points </span>
                                        {quiz.points ? quiz.points : 'N/A'} pts
                                    </div>
                                </div>
                                <div className="d-flex align-items-center me-4">
                                    <FaEdit style={{ color: "green" }} className="me-2" />
                                    <FaEllipsisVertical className="me-2" />
                                </div>
                            </Link>
                        </li>
                    ))
                    }


                </ul>
            </ul>
            <pre>{JSON.stringify(quizzes, null, 2)}</pre>
        </div>
    );
}
