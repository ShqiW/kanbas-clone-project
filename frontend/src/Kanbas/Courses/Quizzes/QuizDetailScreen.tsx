import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import * as client from './client';
import { setQuiz } from './reducer';
import { BsPencil } from 'react-icons/bs';
import { formatDate } from '../Assignments/DateFormat';
import { Link } from 'react-router-dom';

export default function QuizDetailScreen() {
    const { cid, qid } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const quiz = useSelector((state: any) => state.quizzesReducer.quiz);
    const user = useSelector((state: any) => state.accountReducer.currentUser);
    const [history, setHistory] = useState([] as any[]);

    useEffect(() => {
        if (qid) {
            setLoading(true);
            client.findQuizByQuizId(qid)
                .then((quiz) => {
                    // dispatch(setQuiz(quiz));
                    const totalPoints = quiz.questions.reduce((addedPoints, { points }) => addedPoints + points, 0);
                    dispatch(setQuiz({ ...quiz, points: totalPoints }));
                    setLoading(false);
                })
                .catch(() => setLoading(false));
            client.findHistoriesByQuizId(qid).then(hs => {
                setHistory(hs)
            }).catch(err => console.log(err))
        }
    }, [qid, dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!quiz) {
        return <div>Error loading quiz details.</div>;
    }

    return (
        <div className="container">
            <div className="col-12 text-center d-flex justify-content-center">
                {user && user.role === 'FACULTY' && (
                    <div>
                        <button type="button" className="btn rounded ps-3 pe-3 me-2 border" onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/take`)}>
                            Preview
                        </button>
                        <button type="button" className="btn rounded ps-3 pe-3 border" onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/edit`)}>
                            <BsPencil /> Edit
                        </button>
                    </div>
                )}
                {user && user.role === 'STUDENT' && (!quiz.multipleAttempts || history.length == 0 || quiz.multipleAttempts && quiz.attemptChance > history[0].attempts) && (
                    <button type="button" className="btn btn-sm rounded ps-3 pe-3 border" onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/take`)}>
                        Take Quiz
                    </button>
                )}
            </div>
            <br /><br />
            <hr />

            <h2>{quiz.name || 'No Name'}</h2>
            <div className="row mt-4">
                <div className="col-5 text-end mb-2">
                    <strong>Quiz Type</strong><br />
                    <strong>Points</strong><br />
                    <strong>Assignment Group</strong><br />
                    <strong>Shuffle Answers</strong><br />
                    <strong>Time Limit</strong><br />
                    <strong>Multiple Attempts</strong><br />
                    <strong>Show Correct Answers</strong><br />
                    <strong>Access Code</strong><br />
                    <strong>One Question at a Time</strong><br />
                    <strong>Webcam Required</strong><br />
                    <strong>Lock Questions After Answering</strong><br />
                </div>
                <div className="col-1"></div>
                <div className="col-6 mb-2">
                    {quiz.type || 'N/A'}<br />
                    {quiz.questions.length > 0 ? `${quiz.questions.reduce((addedPoints: any, { points }: { points: any }) => addedPoints + points, 0)}` : '0'}<br />
                    {quiz.assignmentGroup || 'N/A'}<br />
                    {quiz.shuffleAnswers ? 'Yes' : 'No'}<br />
                    {quiz.isTimeLimit ? 'No Time Limit' : quiz.timeLimit}<br />
                    {quiz.multipleAttempts ? 'Yes' : 'No'}<br />
                    {quiz.showCorrectAnswers ? 'Yes' : 'No'}<br />
                    {quiz.accessCode || 'N/A'}<br />
                    {quiz.oneQuestionAtATime ? 'Yes' : 'No'}<br />
                    {quiz.webcamRequired ? 'Yes' : 'No'}<br />
                    {quiz.lockQuestionsAfterAnswering ? 'Yes' : 'No'}<br />
                </div>
            </div>

            <table id="quiz-preview-table" className="table mt-4 text-center">
                <thead>
                    <tr>
                        <th>Due</th>
                        <th>Available From</th>
                        <th>Available Until</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{quiz.dueDate ? `at ${formatDate(quiz.dueDate)}` : 'N/A'}</td>
                        <td>{quiz.availableFrom ? `at ${formatDate(quiz.availableFrom)}` : 'N/A'}</td>
                        <td>{quiz.availableUntil ? `at ${formatDate(quiz.availableUntil)}` : 'N/A'}</td>
                    </tr>
                </tbody>
            </table>
            <br /><br /><br />
            <h2>History</h2>
            {history.length > 0 ? <div className='container'>
                <div className='row'>
                    <h4>Score: {history[0].points}</h4>
                </div>
                <div className='row'>
                    {history[0].questions.map((q: any, i: number) => {
                        return (
                            <div>
                                <h2 className={q.correct ? 'bg-success' : 'bg-danger'}>{q.title}</h2>
                                <div className="container my-3">
                                    <div className="row my-3">
                                        <div className="col">
                                            <div dangerouslySetInnerHTML={{ __html: q.questionText }} />
                                        </div>
                                        <div className="col-2">
                                            {q.correct ? q.points : 0} / {q.points} pts
                                        </div>
                                    </div>
                                    <div className="row my-3">
                                        {q.questionType === 'MULTIPLE_CHOICE' ? q.multipleChoiceQuestionAnswers.map((a: any, j: number) => (
                                            <div className="form-check">
                                                <input disabled key={`${i}${a.answer}`} id={`${i}${a.answer}`} className="form-check-input" type="radio" name={`${i}`} checked={'answer' in q && q.answer === j} />
                                                <label className="form-check-label" htmlFor={`${i}${a.answer}`}>{a.answer}</label>
                                                {(user.role === "STUDENT" && quiz.showCorrectAnswers && (!quiz.multipleAttempts || history[0].attempts >= quiz.attemptChance) || user.role == "FACULTY") &&
                                                    a.correct && <><span className="text-success"> (Correct)</span></>}
                                            </div>

                                        )) : q.questionType === 'TRUE_FALSE' ? <div>
                                            <div className="form-check">
                                                <input disabled className="form-check-input" type="radio" name={`${i}`} key={`${i}true`} id={`${i}true`} checked={'answer' in q && q.answer} />
                                                <label className="form-check-label" htmlFor={`${i}true`}>True</label>


                                                {(user.role === "STUDENT" && quiz.showCorrectAnswers && (!quiz.multipleAttempts || history[0].attempts >= quiz.attemptChance) || user.role == "FACULTY") &&
                                                    q.trueFalseAnswer && <><span className="text-success"> (Correct)</span>
                                                    </>}
                                            </div>
                                            <div className="form-check">
                                                <input disabled className="form-check-input" type="radio" name={`${i}`} key={`${i}false`} id={`${i}false`} checked={'answer' in q && !q.answer} />
                                                <label className="form-check-label" htmlFor={`${i}false`}>False</label>
                                                {(user.role === "STUDENT" && quiz.showCorrectAnswers && (!quiz.multipleAttempts || history[0].attempts >= quiz.attemptChance) || user.role === "FACULTY") &&
                                                    !q.trueFalseAnswer && <><span className="text-success"> (Correct)</span>
                                                    </>}
                                            </div>
                                        </div> : q.questionType === 'FILL_IN' ? <div>
                                            <label htmlFor={`${i}`} className="form-label">Answer:</label>
                                            <input disabled className="form-control" key={`${i}`} id={`${i}`} value={'answer' in q ? q.answer : ''} />
                                            {(user.role === "STUDENT" && quiz.showCorrectAnswers && (!quiz.multipleAttempts || history[0].attempts >= quiz.attemptChance) || user.role == "FACULTY") && <>
                                                <div className='border rounded bg-gray text-success p-1 mt-1'>
                                                    Correct Answer:
                                                    {q.fillInBlankAnswers.map((answer: any, index: number) => (
                                                        <div key={index}>
                                                            <span>{answer.text}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </>}
                                        </div> : null}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div> : null
            }
            {/* <pre>{JSON.stringify(quiz, null, 2)}</pre> */}
        </div >
    );
}
