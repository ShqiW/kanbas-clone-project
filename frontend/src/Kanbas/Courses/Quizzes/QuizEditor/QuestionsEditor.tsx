
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";

import * as client from "../client"
import { useEffect, useState } from "react";
import { setQuiz, updateQuiz, setQuestion } from "../reducer";
import { FaPlus } from "react-icons/fa";
import { Modal } from "react-bootstrap";
import UpdateQuestionBody from "./UpdateQuestionBody";


export default function QuestionsEditor() {
    const { cid } = useParams();
    const dispatch = useDispatch();
    const question = useSelector((state) => state.quizzesReducer.question);
    const quiz = useSelector((state) => state.quizzesReducer.quiz);


    const [questionNumber, setQuestionNumber] = useState(-1);
    const [showQuestionModal, setShowQuestionModal] = useState<boolean>(false);
    const [questions, setQuestions] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [newQuestion, setNewQuestion] = useState({
        type: "multiple_choice",
        content: "",
        options: [],
        points: 0,
    });
    //const questions = quiz && quiz.questions ? quiz.questions : [];



    const handleSave = async () => {
        const updatedQuizData = await client.updateQuiz(quiz);
        dispatch(updateQuiz(updatedQuizData));
        navigate(`/Kanbas/Courses/${cid}/Quizzes`);
    }

    const handleUpdateQuestion = async () => {
        const updatedQuizData = await client.updateQuiz(quiz);
        dispatch(updateQuiz(updatedQuizData));
        navigate(`/Kanbas/Courses/${cid}/Quizzes`);
    }



    return (
        <div>
            <Modal show={showQuestionModal} size="xl" onHide={() => setShowQuestionModal(false)}>


                <Modal.Header closeButton>
                    <Modal.Title>Editing Question: {question.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <UpdateQuestionBody />
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-start">
                    <button type="button" className="btn btn-light p-2 m-2" onClick={() => setShowQuestionModal(false)}>
                        Cancel
                    </button>
                    <button type="button" className="btn btn-danger p-2 m-2" onClick={() => handleUpdateQuestion()}>
                        Update Question
                    </button>
                </Modal.Footer>


            </Modal>

            <div className="d-flex justify-content-center p-3 m-3">
                <button className="btn btn-secondary m-2" onClick={() => {
                    // dispatch setQuestion
                    // deal question number
                    setShowQuestionModal(true);
                }}><FaPlus /> New Question</button>
            </div>
            <hr />

            <div className="col d-flex justify-content-center  p-3 m-3">
                <Link to={`/Kanbas/Courses/${cid}/Quizzes`} className="btn btn-light float-end m-2">Cancel</Link>
                <button onClick={handleSave} className="btn btn-danger m-2 float-end">Save</button>
            </div>
        </div>
    )
}
