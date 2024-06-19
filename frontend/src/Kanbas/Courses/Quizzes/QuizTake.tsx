import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes, useNavigate, useParams } from "react-router-dom";
import { setQuiz } from "./reducer";
import * as client from "./client";
import { Link } from "react-router-dom";

export default function QuizTake() {
    const { qid } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const quiz = useSelector((state: any) => state.quizzesReducer.quiz);
    const user = useSelector((state: any) => state.accountReducer.currentUser);
    const [history, setHistory] = useState([] as any[]);
    const submit = async () => {
        try {
            await client.updateHistory(qid!, {questions: questionList});
            navigate("..", {relative: "path"})
        } catch (error) {
            console.error("Error fetching quizzes:", error);
        }
    }

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                if (qid) {
                    const fetchedQuiz = await client.findQuizByQuizId(qid);
                    dispatch(setQuiz(fetchedQuiz));
                    client.findHistoriesByQuizId(qid).then(hs => setHistory(hs)).catch(err => console.log(err))
                }
            } catch (error) {
                console.error("Error fetching quiz:", error);
            }
        };
        fetchQuiz();
    }, [qid, dispatch]);

    const [questionList, setQuestionList] = useState(quiz.questions);

    return (
        <div className="container">
            <Routes>
                <Route path="" element={<Navigate to="0" />} />
                {questionList.map((q: any, i: number) => (
                    <Route path={`${i}`} element={
                        <div>
                            <h2>{q.title}</h2>
                            <div className="container my-3">
                                <div className="row my-3">
                                    <div className="col">
                                        <h4>{q.questionText}</h4>
                                    </div>
                                    <div className="col-2">
                                        {q.points}pts
                                    </div>
                                </div>
                                <div className="row my-3">
                                    <div className="col">
                                        {q.questionType === 'MULTIPLE_CHOICE' ? q.multipleChoiceQuestionAnswers.map((a: any, j: number) => (
                                            <div className="form-check">
                                                <input key={`${i}${a.answer}`} id={`${i}${a.answer}`} className="form-check-input" type="radio" name={`${i}`} checked={'answer' in q && q.answer === j} onClick={() => {
                                                    setQuestionList((questionList: any) => {
                                                        let newQuestions = JSON.parse(JSON.stringify(questionList));
                                                        newQuestions[i].answer = j
                                                        newQuestions[i].answerTime = new Date().toString()
                                                        return newQuestions;
                                                    })
                                                }} />
                                                <label className="form-check-label" htmlFor={`${i}${a.answer}`}>{a.answer}</label>
                                            </div>
                                        )) : q.questionType === 'TRUE_FALSE' ? <div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name={`${i}`} key={`${i}true`} id={`${i}true`} checked={'answer' in q && q.answer} onClick={() => {
                                                    setQuestionList((questionList: any) => {
                                                        let newQuestions = JSON.parse(JSON.stringify(questionList));
                                                        newQuestions[i].answer = true
                                                        newQuestions[i].answerTime = new Date().toString()
                                                        return newQuestions;
                                                    })
                                                }} />
                                                <label className="form-check-label" htmlFor={`${i}true`}>True</label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name={`${i}`} key={`${i}false`} id={`${i}false`} checked={'answer' in q && !q.answer} onClick={() => {
                                                    setQuestionList((questionList: any) => {
                                                        let newQuestions = JSON.parse(JSON.stringify(questionList));
                                                        newQuestions[i].answer = false
                                                        newQuestions[i].answerTime = new Date().toString()
                                                        return newQuestions;
                                                    })
                                                }} />
                                                <label className="form-check-label" htmlFor={`${i}false`}>False</label>
                                            </div>
                                        </div> : q.questionType === 'FILL_IN' ? <div>
                                            <label htmlFor={`${i}`} className="form-label">Answer:</label>
                                            <input className="form-control" key={`${i}`} id={`${i}`} value={'answer' in q ? q.answer : ''} onChange={e => {
                                                setQuestionList((questionList: any) => {
                                                    let newQuestions = JSON.parse(JSON.stringify(questionList));
                                                    newQuestions[i].answer = e.target.value;
                                                    newQuestions[i].answerTime = new Date().toString()
                                                    return newQuestions;
                                                })
                                            }} />
                                        </div> : null}
                                        {user && user.role === 'FACULTY' && history.length > 0 ? i >= 0 && i < history[0].questions.length ? <div className="my-5 container">
                                            <div className="row">
                                                <h3>Last attempt</h3>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    answer: {'answer' in history[0].questions[i] ? history[0].questions[i].answer.toString() : null}
                                                </div>
                                                <div className="col">
                                                    time: {'answer' in history[0].questions[i] ? history[0].questions[i].answerTime : null}
                                                </div>
                                            </div>
                                        </div> : null : null}
                                    </div>
                                </div>
                            </div>
                            {i > 0 ? <Link to={`../${i - 1}`} className="btn btn-primary mx-2">Previous</Link> : null}
                            {i < questionList.length - 1 ? <Link to={`../${i + 1}`} className="btn btn-primary mx-2">Next</Link> : <button className="btn btn-warning mx-2" onClick={() => submit()}>Submit</button>}
                        </div>
                    } />
                ))}
            </Routes>
        </div>
    );
}
