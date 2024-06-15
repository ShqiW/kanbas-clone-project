import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setQuestion } from "../reducer";


export default function TrueFalse() {
    const dispatch = useDispatch();
    const question = useSelector((state: any) => state.quizzesReducer.question);

    return (
        <div className="col-12 p-3">

            <div className="col-12 mb-3">
                <label>Question:</label>
                <textarea
                    value={question.questionText}
                    className="form-control mb-2"
                    onChange={(e) => dispatch(setQuestion({ ...question, questionText: e.target.value }))}
                />
            </div>


            <div className="col-12 mb-3">
                <label>Correct Answer:</label>
                <div>
                    <input
                        type="radio"
                        name="trueFalse"
                        checked={question.correctAnswer === true}
                        onChange={() => dispatch(setQuestion({ ...question, correctAnswer: true }))}
                    />
                    <label className="ms-2 me-3">True</label>
                    <input
                        type="radio"
                        name="trueFalse"
                        checked={question.correctAnswer === false}
                        onChange={() => dispatch(setQuestion({ ...question, correctAnswer: false }))}
                    />
                    <label className="ms-2">False</label>
                </div>
            </div>
        </div>
    );
}
