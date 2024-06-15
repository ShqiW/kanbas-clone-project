import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import * as client from "../client"
import { useEffect, useState } from "react";
import { setQuiz } from "../reducer";
import Select from 'react-select'
import { parseDateString } from "../../Assignments/parseDateString";

export default function DetailsEditor() {
    const dispatch = useDispatch();
    const { cid, qid } = useParams();
    const quiz = useSelector(state => state.quizzesReducer.quiz);

    useEffect(() => {
        if (qid) {
            client.findQuizByQuizId(qid).then((quiz) => {
                dispatch(setQuiz(quiz))

            });
        }
    }, []);

    const quizType = [
        { value: 'GRADED_QUIZ', label: 'Graded Quiz' },
        { value: 'PRACTICE_QUIZ', label: 'Practice Quiz' },
        { value: 'GRADED_SURVEY', label: 'Graded Survey' },
        { value: 'UNGRADED_SURVEY', label: 'Ungraded Survey' }
    ]

    const assignmentGroup = [
        { value: 'QUIZZES', label: 'QUIZZES' },
        { value: 'EXAMS', label: 'EXAMS' },
        { value: 'ASSIGNMENTS', label: 'ASSIGNMENTS' },
        { value: 'PROJECT', label: 'PROJECT' }
    ]
    const [isTimeLimit, setIsTimeLimit] = useState(false);


    return (
        <div className="container">
            Details
            <input value={quiz.name} className="form-control mb-2" defaultValue="Unnamed Quiz" onChange={(e) => dispatch(setQuiz({ ...quiz, name: e.target.value }))} />
            <p>Quiz Instructions:</p>
            <input value={quiz.description} className="form-control mb-2" defaultValue="quiz description" onChange={(e) => dispatch(setQuiz({ ...quiz, description: e.target.value }))} />
            <br /> <br /> <br /> <br /> <br />
            <div>
                <div className="row">
                    <div className="col-3 text-end"><p>Quiz Type</p></div>
                    <div className="col-9">
                        <Select
                            value={quizType.find((qt) => qt.value === quiz.quizType)}
                            options={quizType}
                            onChange={(e) => dispatch(setQuiz({ ...quiz, quizType: e?.value }))}
                        />
                    </div>
                </div>
                <div className="row d-flex">
                    <div className="col-3 text-end"><p>Assignment Group</p></div>
                    <div className="col-9">
                        <Select
                            value={assignmentGroup.find((ag) => ag.value === quiz.assignmentGroup)}
                            options={assignmentGroup}
                            onChange={(e) => dispatch(setQuiz({ ...quiz, assignmentGroup: e?.value }))}
                        />
                        <strong>Options</strong>
                        <br />
                        <input type="checkbox" id="shuffleAnswers" checked={quiz.shuffleAnswers} onChange={(e) => dispatch(setQuiz({ ...quiz, shuffleAnswers: !quiz.shuffleAnswers }))} />
                        <label htmlFor="shuffleAnswers">Shuffle Answers</label>
                        <br />
                        <div className="row">
                            <div className="col-6">
                                <input type="checkbox" id="timeLimit" checked={isTimeLimit} onChange={() => setIsTimeLimit(!isTimeLimit)} />
                                <label htmlFor="timeLimit">Time Limit (Minutes)</label>
                            </div>
                            <div className="col-6">
                                <input type="number" disabled={!isTimeLimit} value={isTimeLimit ? quiz.timeLimit : ""}
                                    className="form-control" onChange={(e) => dispatch(setQuiz({ ...quiz, timeLimit: e.target.value }))}
                                />
                            </div>
                        </div>
                        <div className=" p-1">
                            <input type="checkbox" id="multipleAttempts" checked={quiz.multipleAttempts} onChange={(e) => dispatch(setQuiz({ ...quiz, multipleAttempts: !quiz.multipleAttempts }))} />
                            <label htmlFor="multipleAttempts">Allow Multiple Attempts</label>
                            <br />
                            <input type="checkbox" id="showCorrectAnswers" checked={quiz.showCorrectAnswers} onChange={(e) => dispatch(setQuiz({ ...quiz, showCorrectAnswers: !quiz.showCorrectAnswers }))} />
                            <label htmlFor="showCorrectAnswers">Show Correct Answers</label>
                            <br />
                            <input type="checkbox" id="oneQuestionAtATime" checked={quiz.oneQuestionAtATime} onChange={(e) => dispatch(setQuiz({ ...quiz, oneQuestionAtATime: !quiz.oneQuestionAtATime }))} />
                            <label htmlFor="oneQuestionAtATime">One Question at a time</label>
                            <br />
                            <input type="checkbox" id="webcamRequired" checked={quiz.webcamRequired} onChange={(e) => dispatch(setQuiz({ ...quiz, webcamRequired: !quiz.webcamRequired }))} />
                            <label htmlFor="webcamRequired">Webcam Required</label>
                            <br />


                            <input type="checkbox" id="lockQuestionsAfterAnswering" checked={quiz.lockQuestionsAfterAnswering} onChange={(e) => dispatch(setQuiz({ ...quiz, lockQuestionsAfterAnswering: !quiz.lockQuestionsAfterAnswering }))} />
                            <label htmlFor="lockQuestionsAfterAnswering">Lock Questions After Answering</label>
                            <br />

                            <div className="row">
                                <div className="col-3">
                                    <label htmlFor="accessCode">Access Code</label>
                                </div>
                                <div className="col-9">
                                    <input value={quiz.accessCode} id="accessCode"
                                        className="form-control mb-2" onChange={(e) => dispatch(setQuiz({ ...quiz, accessCode: e.target.value }))}
                                    />
                                </div>
                            </div>
                        </div>
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
                                value={parseDateString(quiz.dueDate)}
                                min={parseDateString(quiz.availableUntil)}
                                onChange={(e) => dispatch(setQuiz({ ...quiz, dueDate: e.target.value }))}
                            />
                        </div>
                        <div className="row mb-3">
                            <div className="col">
                                <label htmlFor="availableFrom" className="col-form-label">Available From</label>
                                <input
                                    type="datetime-local"
                                    id="availableFrom"
                                    className="form-control"
                                    value={parseDateString(quiz.availableFrom)}
                                    onChange={(e) => dispatch(setQuiz({ ...quiz, availableDate: e.target.value }))}
                                />
                            </div>
                            <div className="col">
                                <label htmlFor="availableUntil" className="col-form-label">Available Until</label>
                                <input
                                    type="datetime-local"
                                    id="availableUntil"
                                    className="form-control"
                                    value={parseDateString(quiz.availableUntil)}
                                    min={parseDateString(quiz.availableFrom)}
                                    onChange={(e) => dispatch(setQuiz({ ...quiz, untilDate: e.target.value }))}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 d-flex justify-content-center p-3 m-3">
                    <Link to={`/Kanbas/Courses/${cid}/Quizzes`}
                        className="btn btn-light m-2">
                        Cancel
                    </Link>
                    <button className="btn btn-light m-2">
                        Save & Publish
                    </button>
                    <button className="btn btn-danger m-2">
                        Save
                    </button>
                </div>


            </div>
        </div>
    )
}
