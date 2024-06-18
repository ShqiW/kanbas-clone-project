import { useEffect, useState } from "react";
import { Nav, NavItem } from "react-bootstrap";
import { FaBan, FaCheckCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as client from "../client";
import { setQuiz } from "../reducer";
import DetailsEditor from "./DetailsEditor";
import QuestionsEditor from "./QuestionsEditor";


export default function QuizEditor() {
    const { qid } = useParams();
    const dispatch = useDispatch();
    const [currentTab, setCurrentTab] = useState("Details");
    const quiz = useSelector((state: any) => state.quizzesReducer.quiz);

    useEffect(() => {
        if (qid) {
            client.findQuizByQuizId(qid).then((quiz) => {
                dispatch(setQuiz(quiz));
            });
        }
    }, [qid, dispatch]);

    return (
        <div className="container">
            <div className="text-end col style={{ fontSize: '1.2em' }}">
                {currentTab === "Details" ? (
                    <>
                        Points {quiz.questions.length > 0 ? `${quiz.questions.reduce((addedPoints, { points }) => addedPoints + points, 0)}` : '0'}
                        {quiz.published ?
                            <div className="text-success"><FaCheckCircle /> Published</div>
                            : <div className="text-danger"><FaBan /> Unpublished </div>
                        }
                    </>
                ) : (
                    <>
                        Points {quiz.questions.length > 0 ? `${quiz.questions.reduce((addedPoints, { points }) => addedPoints + points, 0)}` : '0'}
                    </>
                )}
            </div>
            <hr />
            <Nav>
                <NavItem className={`nav-link ${currentTab === "Details" ? "active" : "text-danger"}`} onClick={() => setCurrentTab("Details")}>Details</NavItem>
                <NavItem className={`nav-link ${currentTab === "Questions" ? "active" : "text-danger"}`} onClick={() => setCurrentTab("Questions")}>Questions</NavItem>
            </Nav>
            {currentTab === "Details" ? <DetailsEditor /> : <QuestionsEditor />}
        </div>
    );
}
