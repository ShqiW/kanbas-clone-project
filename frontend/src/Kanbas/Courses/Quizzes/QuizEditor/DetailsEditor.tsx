import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as client from "../client"
import { useEffect, useState } from "react";
import { setQuiz, updateQuiz, deleteQuiz } from "../reducer";
import Select from 'react-select'
import { parseDateString } from "../../Assignments/parseDateString";
import { Editor } from "@tinymce/tinymce-react";


export default function DetailsEditor() {
    const WYSIWYG_API = process.env.REACT_APP_WYSIWYG_API;
    const dispatch = useDispatch();
    const { cid, qid } = useParams();
    const navigate = useNavigate();
    const quiz = useSelector((state: any) => state.quizzesReducer.quiz);


    useEffect(() => {
        if (qid) {
            client.findQuizByQuizId(qid).then((quiz) => {
                dispatch(setQuiz(quiz))
            });
        }
    }, []);
    const type = [
        { value: 'GRADED_QUIZ', label: 'GRADED_QUIZ' },
        { value: 'PRACTICE_QUIZ', label: 'PRACTICE_QUIZ' },
        { value: 'GRADED_SURVEY', label: 'GRADED_SURVEY' },
        { value: 'UNGRADED_SURVEY', label: 'UNGRADED_SURVEY' }
    ]
    const assignmentGroup = [
        { value: 'QUIZZES', label: 'QUIZZES' },
        { value: 'EXAMS', label: 'EXAMS' },
        { value: 'ASSIGNMENTS', label: 'ASSIGNMENTS' },
        { value: 'PROJECT', label: 'PROJECT' }
    ]
    const handleSave = async () => {
        let updatedQuiz = { ...quiz, isTemporary: false };
        const updatedQuizData = await client.updateQuiz(updatedQuiz);
        dispatch(updateQuiz(updatedQuizData));
        navigate(`/Kanbas/Courses/${cid}/Quizzes`);
    };

    const handleSaveAndPublish = async () => {
        const updatedQuiz = { ...quiz, published: true };
        const response = await client.updateQuiz(updatedQuiz);
        dispatch(updateQuiz(response));
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}`);
    };
    const handleCancel = async () => {
        console.log(quiz)
        if (quiz.isTemporary) {
            await client.deleteQuiz(quiz._id);
            dispatch(deleteQuiz(quiz._id));
            console.log("in right track")
        }
        navigate(`/Kanbas/Courses/${cid}/Quizzes`);
    };


    return (
        <div className="container">
            Details
            <input value={quiz.name} className="form-control mb-2" onChange={(e) => dispatch(setQuiz({ ...quiz, name: e.target.value }))} />
            <p>Quiz Instructions:</p>

            {/* Error: tinymce can only be initialised when in a document */}
            <Editor
                apiKey={WYSIWYG_API}
                value={quiz.description}
                onEditorChange={(newDescription, editor) => {
                    dispatch(setQuiz({ ...quiz, description: newDescription }))
                }}
                initialValue="<p>Add quiz description</p>"
                init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                    ],
                    toolbar: 'undo redo | blocks | ' +
                        'bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
            />

            <br /> <br /> <br /> <br /> <br />
            <div>
                <div className="row">
                    <div className="col-3 text-end"><p>Quiz Type</p></div>
                    <div className="col-9">
                        <Select
                            value={type.find((qt) => qt.value === quiz.type)}
                            options={type}
                            onChange={(e) => dispatch(setQuiz({ ...quiz, type: e?.value }))}
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
                        <div className="row mb-1">
                            <div className="col-6">
                                <input
                                    type="checkbox"
                                    id="timeLimit"
                                    checked={!quiz.isTimeLimit}
                                    onChange={() => dispatch(setQuiz({ ...quiz, isTimeLimit: !quiz.isTimeLimit }))}
                                />
                                <label htmlFor="timeLimit">Time Limit (Minutes)</label>
                            </div>
                            <div className="col-6">
                                <input
                                    type="number"
                                    id="timeLimitValue"
                                    className="form-control"
                                    disabled={quiz.isTimeLimit}
                                    value={quiz.timeLimit || ''}
                                    onChange={(e) => dispatch(setQuiz({ ...quiz, timeLimit: e.target.value }))}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <input
                                    type="checkbox"
                                    id="multipleAttempts"
                                    checked={quiz.multipleAttempts}
                                    onChange={() => dispatch(setQuiz({ ...quiz, multipleAttempts: !quiz.multipleAttempts }))}
                                />
                                <label htmlFor="timeLimit">Allow Multiple attempts</label>
                            </div>
                            <div className="col-6">
                                <input
                                    type="number"
                                    id="attemptChance"
                                    className="form-control"
                                    disabled={!quiz.multipleAttempts}
                                    value={quiz.attemptChance || ''}
                                    onChange={(e) => dispatch(setQuiz({ ...quiz, attemptChance: e.target.value }))}
                                />
                            </div>
                        </div>
                        <div className=" p-1">
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

                            <div className="row align-items-center">
                                <div className="col-6">
                                    <label htmlFor="accessCode">Access Code</label>
                                </div>
                                <div className="col-6">
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
                                min={parseDateString(quiz.availableFrom)}
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
                                    onChange={(e) => dispatch(setQuiz({ ...quiz, availableFrom: e.target.value }))}
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
                                    onChange={(e) => dispatch(setQuiz({ ...quiz, availableUntil: e.target.value }))}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 d-flex justify-content-center p-3 m-3">
                    <Link to={`/Kanbas/Courses/${cid}/Quizzes`}
                        className="btn btn-light m-2"
                        onClick={() => handleCancel()}>
                        Cancel
                    </Link>
                    <button className="btn btn-light m-2" onClick={() => handleSaveAndPublish()}>
                        Save & Publish
                    </button>
                    <button className="btn btn-danger m-2" onClick={() => handleSave()}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}
