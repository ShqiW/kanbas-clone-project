import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setQuiz } from "./reducer";
import * as client from "./client";

export default function QuizPreview() {
    const { qid } = useParams();
    const dispatch = useDispatch();
    const quiz = useSelector((state: any) => state.quizzesReducer.quiz);

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                if (qid) {
                    const fetchedQuiz = await client.findQuizByQuizId(qid);
                    dispatch(setQuiz(fetchedQuiz));
                }
            } catch (error) {
                console.error("Error fetching quiz:", error);
            }
        };
        fetchQuiz();
    }, [qid, dispatch]);

    const questionList = quiz ? quiz.questions : [];

    return (
        <div className="container">
            <h2>Quiz Preview</h2>
            <pre>{JSON.stringify(questionList, null, 2)}</pre>

        </div>
    );
}
