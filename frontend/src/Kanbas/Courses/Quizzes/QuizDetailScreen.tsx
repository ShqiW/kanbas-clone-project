import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import * as client from "./client";
import { setQuiz } from "./reducer";
import { useEffect } from "react";
import { FaBan, FaCheckCircle } from "react-icons/fa";
import { FaEllipsisVertical } from "react-icons/fa6";
import { BsPencil } from "react-icons/bs";

export default function QuizDetailScreen() {
    const { cid, qid } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const quiz = useSelector((state: any) => state.quizzesReducer.quiz);
    const user = useSelector((state: any) => state.accountReducer.currentUser);

    useEffect(() => {
        if (qid) {
            client.findQuizByQuizId(qid).then((quiz) => {
                dispatch(setQuiz(quiz));
            });
        }
    }, [qid, dispatch]);

    return (
        <div className="container">
            <div className="col-12 text-center d-flex justify-content-center">
                {user && user.role === "FACULTY" && (
                    <>
                        {quiz.published ? (
                            <button type="button" className="btn btn-success btn-sm rounded ps-3 pe-3 border">
                                <FaCheckCircle /> Published
                            </button>
                        ) : (
                            <button type="button" className="btn btn-danger btn-sm rounded ps-3 pe-3 border">
                                <FaBan /> Unpublished
                            </button>
                        )}
                        <button type="button" className="btn btn-sm rounded ps-3 pe-3 border" onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/preview`)}>
                            <BsPencil /> Preview
                        </button>
                        <button type="button" className="btn btn-sm rounded ps-3 pe-3 border" onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/edit`)}>
                            <BsPencil /> Edit
                        </button>
                        <button type="button" className="btn btn-light btn-sm rounded ps-3 pe-3 border">
                            <FaEllipsisVertical />
                        </button>
                    </>
                )}
                {user && user.role === "STUDENT" && (
                    <button type="button" className="btn btn-sm rounded ps-3 pe-3 border" onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/preview`)}>
                        Take Quiz
                    </button>
                )}
            </div>

            <div className="row mt-4">
                <div className="col-3 text-end">
                    <strong>Quiz Type</strong><br />
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
                <div className="col-8">
                    {quiz.type}<br />
                    {quiz.assignmentGroup}<br />
                    {quiz.shuffleAnswer ? 'Yes' : 'No'}<br />
                    {quiz.timeLimit}<br />
                    {quiz.multipleAttempts ? 'Yes' : 'No'}<br />
                    {quiz.showCorrectAnswers ? 'Yes' : 'No'}<br />
                    {quiz.accessCode}<br />
                    {quiz.oneQuestionAtATime ? 'Yes' : 'No'}<br />
                    {quiz.webcamRequired ? 'Yes' : 'No'}<br />
                    {quiz.lockQuestionsAfterAnswering ? 'Yes' : 'No'}<br />
                </div>
            </div>

            <table id="quiz-preview-table" className="table mt-4">
                <thead>
                    <tr>
                        <th>Due</th>
                        <th>Available From</th>
                        <th>Available Until</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{quiz.dueDate} at {quiz.dueTime}</td>
                        <td>{quiz.availableDate} at {quiz.availableTime}</td>
                        <td>{quiz.untilDate} at {quiz.untilTime}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
