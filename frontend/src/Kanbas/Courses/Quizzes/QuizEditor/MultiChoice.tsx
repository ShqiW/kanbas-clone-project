import { useDispatch, useSelector } from "react-redux";
import { setQuestion } from "../reducer";
import { FaPlus } from "react-icons/fa";

export default function MultipleChoice() {
    const dispatch = useDispatch();
    const question = useSelector((state: any) => state.quizzesReducer.question);

    const handleAnswerChange = (index: number, value: string) => {
        const updatedAnswers = question.multipleChoiceQuestionAnswers.map((answer, i) =>
            i === index ? { ...answer, answer: value } : answer
        );
        dispatch(setQuestion({ ...question, multipleChoiceQuestionAnswers: updatedAnswers }));
    };
    const handleCorrectAnswerChange = (index: number) => {
        const updatedAnswers = question.multipleChoiceQuestionAnswers.map((answer, i) => ({
            ...answer,
            correct: i === index
        }));
        dispatch(setQuestion({ ...question, multipleChoiceQuestionAnswers: updatedAnswers }));
    };
    const handleDeleteAnswer = (index: number) => {
        const updatedAnswers = question.multipleChoiceQuestionAnswers.filter((_, i) => i !== index);
        dispatch(setQuestion({ ...question, multipleChoiceQuestionAnswers: updatedAnswers }));
    };
    const handleAddAnswer = () => {
        const newAnswer = { answer: "", correct: false };
        dispatch(setQuestion({
            ...question,
            multipleChoiceQuestionAnswers: [...question.multipleChoiceQuestionAnswers, newAnswer]
        }));
    };

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
                    {question.multipleChoiceQuestionAnswers.map((answer, i) => (
                        <div key={i} className="col-12 row border m-3 p-2 align-items-center">
                            <div className="col-5">
                                <input
                                    value={answer.answer}
                                    className="form-control mb-2"
                                    onChange={(e) => handleAnswerChange(i, e.target.value)}
                                />
                            </div>
                            <div className="col-5 d-flex align-items-center">
                                <span className="me-2">If this answer is correct, please check: </span>
                                <input
                                    type="checkbox"
                                    checked={answer.correct}
                                    onChange={() => handleCorrectAnswerChange(i)}
                                />
                            </div>
                            <div className="col-2 text-end">
                                <button
                                    type="button"
                                    className="btn btn-danger p-2 m-2"
                                    onClick={() => handleDeleteAnswer(i)}
                                >
                                    Delete Answer
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-end">
                    <span className="text-danger" style={{ cursor: 'pointer' }} onClick={handleAddAnswer}>
                        <FaPlus /> Add Another Answer
                    </span>
                </div>
            </div>
        </div>
    );
}
