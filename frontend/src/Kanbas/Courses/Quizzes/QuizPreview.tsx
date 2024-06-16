import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

export default function QuizPreview() {
    const { cid, qid } = useParams();
    const dispatch = useDispatch();

    return (
        <div className="container">
            QuizPreview Part
        </div>
    )
};