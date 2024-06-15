import { useEffect, useState } from "react";
import { Nav, NavItem } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";
import { FaEllipsisVertical } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import * as client from "../client";
import { setQuiz, updateQuiz } from "../reducer";
import DetailsEditor from "./DetailsEditor";
import QuestionsEditor from "./QuestionsEditor";
import { Link } from "react-router-dom";

export default function QuizEditor() {
    const { qid, cid } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [currentTab, setCurrentTab] = useState("Details");

    useEffect(() => {
        if (qid) {
            client.findQuizByQuizId(qid).then((quiz) => {
                dispatch(setQuiz(quiz));
            });
        }
    }, [qid, dispatch]);

    const quiz = useSelector(state => state.quizzesReducer.quiz);




    return (
        <div className="container">
            <div className="text-end col">
                Points 0
                <span><FaCheckCircle /> Published</span>
                <button className="btn "><FaEllipsisVertical /></button>
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
