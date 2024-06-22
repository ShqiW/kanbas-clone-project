import { FaEllipsisVertical } from "react-icons/fa6";
import { FaBan, FaCheckCircle, FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { findQuizzesForCourse } from "./client";
import { setQuizzes, deleteQuiz, updateQuiz } from "./reducer";
import { formatDate } from "../Assignments/DateFormat";
import * as client from "./client";
import { SiStarship } from 'react-icons/si';


function QuizAvailable(props: any) {
    const currentDate = new Date();
    const { quiz } = props;

    if (currentDate > new Date(quiz.availableUntil)) {
        return <strong>Closed</strong>;
    }
    if (currentDate > new Date(quiz.availableFrom)) {
        return <strong>Available</strong>;
    }
    const availableDateString = formatDate(quiz.availableFrom);

    return (
        <span>
            <strong>Not Available Until</strong> {availableDateString}
        </span>
    );
}

export default function Quizzes() {
    const { cid } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state: any) => state.accountReducer.currentUser);
    const quizzes = useSelector((state: any) => state.quizzesReducer.quizzes);
    const [activeQuizId, setActiveQuizId] = useState<string | null>(null);

    const fetchQuizzes = async () => {
        if (cid) {
            try {
                let fetchedQuizzes = await findQuizzesForCourse(cid);
                dispatch(setQuizzes(fetchedQuizzes));
                fetchedQuizzes.map(async (q: any, i: number) => {
                    let history = await client.findHistoriesByQuizId(q._id)
                    let newFetchedQuizzes = [...fetchedQuizzes]
                    if (history.length > 0) {
                        newFetchedQuizzes[i] = { ...newFetchedQuizzes[i], score: history[0].points }
                        dispatch(setQuizzes(newFetchedQuizzes));
                    }
                })
            } catch (error) {
                console.error("Error fetching quizzes:", error);
            }
        }
    };

    useEffect(() => { fetchQuizzes(); }, [cid]);
    const filteredQuizzes = user && user.role === "STUDENT" ? quizzes.filter((quiz: any) => quiz.published) : quizzes;
    const handleMenu = (quizId: string) => {
        setActiveQuizId(activeQuizId === quizId ? null : quizId);
    };
    const handleAddNewQuiz = async () => {
        if (cid) {
            const newQuiz = await client.createQuiz(cid, { name: `New Quiz` });
            navigate(`/Kanbas/Courses/${cid}/Quizzes/${newQuiz._id}/edit`);
        }
    };

    const handleDelete = async (quizId: string) => {
        await client.deleteQuiz(quizId);
        dispatch(deleteQuiz(quizId));
        setActiveQuizId(null);
    };

    const handleChangePublishValue = async (quiz: any, newPublishStatus: any) => {
        const newQuiz = { ...quiz, published: newPublishStatus };
        await client.updateQuiz(newQuiz);
        dispatch(updateQuiz(newQuiz));
        setActiveQuizId(null);
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-6">
                    <input id="quiz-search" className="form-control" placeholder="Search for Quiz" />
                </div>
                <div className="col-6 text-end">
                    {user && user.role === "FACULTY" && (
                        <button type="button" className="btn btn-danger ps-3 pe-3 me-2" onClick={handleAddNewQuiz}>
                            <FaPlus /> Quiz
                        </button>
                    )}
                    <button type="button" className="btn btn-light rounded pl-0 ps-3 pe-3">
                        <div onClick={() => handleMenu(null)}>
                            <FaEllipsisVertical />
                        </div>
                    </button>
                </div>
            </div>
            <hr />

            <div className="wd-title p-3 ps-4 bg-secondary d-flex align-items-center">
                <span style={{ fontWeight: "bold" }}>Assignment Quizzes</span>
            </div>
            <ul className="list-group">
                {filteredQuizzes.map((quiz) => (
                    <li key={quiz._id} className="list-group-item">
                        <div className="d-flex align-items-center justify-content-between">
                            <Link
                                to={`/Kanbas/Courses/${cid}/quizzes/${quiz._id}`}
                                className="wd-quiz-list-item list-group-item d-flex align-items-center justify-content-between"
                                style={{ textDecoration: 'none', border: 'none', width: '100%' }}
                            >
                                <div className="d-flex align-items-center">
                                    <SiStarship className="me-3" style={{ fontSize: '24px' }} />
                                    <div className="flex-grow-1">
                                        <div>
                                            <span style={{ fontWeight: "bold" }}>{quiz.name}</span>
                                        </div>
                                        <div>
                                            <QuizAvailable quiz={quiz} /> |
                                            <span style={{ fontWeight: "bold" }}>Due </span>
                                            {quiz.dueDate ? formatDate(quiz.dueDate) : 'N/A'}

                                            {(quiz.questions && quiz.questions.length > 0) ?
                                                `| ${quiz.questions.reduce((addedPoints, { points }) => addedPoints + points, 0)} pts | ` : `| 0 pts | `
                                            }
                                            {quiz.questions ? quiz.questions.length : 0} Questions


                                            {user && user.role === "STUDENT" && (
                                                <span style={{ fontWeight: "bold" }}>| {'score' in quiz ? `${quiz.score} /  ${quiz.questions.reduce((addedPoints, { points }) => addedPoints + points, 0)} pts` : 'No score yet'} </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <div className="d-flex align-items-center me-2">
                                {/* NEED UPDATE: display if student took the quiz */}
                                {user.role === "STUDENT" && (
                                    <FaCheckCircle />
                                )}

                                {user.role === "FACULTY" && (
                                    <>
                                        {quiz.published ? (
                                            <FaCheckCircle className="me-2 text-success" style={{ fontSize: '24px' }} />
                                        ) : (
                                            <FaCheckCircle className="me-2" style={{ fontSize: '24px', color: '#999999' }} />
                                        )}
                                        <div onClick={() => handleMenu(quiz._id)}>
                                            <FaEllipsisVertical style={{ fontSize: '24px' }} />
                                        </div>
                                        {activeQuizId === quiz._id && (
                                            <div className="context-menu">
                                                <button type="button" className="btn btn-light btn-sm rounded m-2" onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}/edit`)}>
                                                    Edit
                                                </button>
                                                {quiz.published ? (
                                                    <button type="button" className="btn btn-danger btn-sm rounded m-2" onClick={() => handleChangePublishValue(quiz, false)}>
                                                        <FaBan /> Unpublish
                                                    </button>
                                                ) : (
                                                    <button type="button" className="btn btn-success btn-sm rounded m-2" onClick={() => handleChangePublishValue(quiz, true)}>
                                                        <FaCheckCircle /> Publish
                                                    </button>
                                                )}
                                                <button type="button" className="btn btn-danger btn-sm rounded m-2" onClick={() => handleDelete(quiz._id)}>
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>

                        </div >
                    </li >
                ))
                }
            </ul >
            {/* <pre>{JSON.stringify(quizzes, null, 2)}</pre> */}
        </div >
    );
}
