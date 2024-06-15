import { useDispatch, useSelector } from "react-redux";
import { setQuestion } from "../reducer";
import { FaPlus } from "react-icons/fa";

export default function MultipleChoice() {
    const dispatch = useDispatch();
    const question = useSelector((state: any) => state.quizzesReducer.question);

    return (
        <div>
            <div className="col-12 p-3">
                <div className="col-12 mb-3">
                    <p>Enter your question and multiple answers, then select the one correct answer.</p>
                    <label>Question:</label>
                    <textarea
                        value={question.questionText}
                        className="form-control mb-2"
                        onChange={(e) => dispatch(setQuestion({ ...question, questionText: e.target.value }))}
                    />
                </div>

                <br />
                <div className="col-12">
                    <h6>Answers:</h6>
                    {question.multiAnswer.map((answer, i) => {
                        return (
                            <div key={i} className="col-12 row border m-3 p-2">
                                <div className="col-5">
                                    <input value={answer.answer} className="form-control mb-2" onChange={(e) => dispatch(setQuestion({
                                        ...question,
                                        multiAnswer: [...question.multiAnswer.slice(0, i),
                                        { ...question.multiAnswer[i], answer: e.target.value },
                                        ...question.multiAnswer.slice(i + 1)
                                        ]
                                    }))}
                                    />
                                </div>
                                <div className="col-5 d-flex align-items-center">
                                    <span className="me-2">If this answer is correct, please check: </span>
                                    <input
                                        type="checkbox"
                                        checked={answer.correct}
                                        onChange={() => dispatch(setQuestion({
                                            ...question,
                                            multiAnswer: [
                                                ...question.multiAnswer.slice(0, i),
                                                {
                                                    ...question.multiAnswer[i],
                                                    correct: !answer.correct
                                                },
                                                ...question.multiAnswer.slice(i + 1)
                                            ]
                                        }))}
                                    />
                                </div>
                                <div className="col-2 text-end">
                                    <button
                                        type="button"
                                        className="btn btn-danger p-2 m-2"
                                        onClick={() => dispatch(setQuestion({
                                            ...question,
                                            multiAnswer: [
                                                ...question.multiAnswer.slice(0, i),
                                                ...question.multiAnswer.slice(i + 1)
                                            ]
                                        }))}
                                    >
                                        Delete Answer
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="text-end">
                    <span
                        className="text-danger"
                        style={{ cursor: 'pointer' }}
                        onClick={() => dispatch(setQuestion({
                            ...question,
                            multiAnswer: [
                                ...question.multiAnswer,
                                { answer: "", correct: false }
                            ]
                        }))}
                    >
                        <FaPlus /> Add Another Answer
                    </span>
                </div>
            </div>
        </div>
    );
}