import { useDispatch, useSelector } from "react-redux";
import { setQuestion } from "../reducer";
import Select from 'react-select';
import MultipleChoice from "./MultiChoice";
import TrueFalse from "./TrueFalse";
import FillIn from "./FillIn";

function QuestionHeader() {
    const dispatch = useDispatch();
    const question = useSelector((state: any) => state.quizzesReducer.question);
    const questionTypeOptions = [
        { value: 'MULTIPLE_CHOICE', label: 'Multiple Choice' },
        { value: 'TRUE_FALSE', label: 'True False' },
        { value: 'FILL_IN', label: 'Fill In' }
    ];

    return (
        <div className="col-12 d-flex align-items-start p-3">
            <div className="col-3">
                <input
                    value={question.title}
                    className="form-control mb-2"
                    onChange={(e) => dispatch(setQuestion({ ...question, title: e.target.value }))}
                />
            </div>
            <div className="col-6">
                <Select
                    value={questionTypeOptions.find((option) => option.value === question.questionType)}
                    options={questionTypeOptions}
                    onChange={(e) => {
                        if (e) {
                            dispatch(setQuestion({ ...question, questionType: e.value }));
                        }
                    }}
                    styles={{
                        container: (provided) => ({
                            ...provided,
                            zIndex: 1000
                        })
                    }}
                />
            </div>
            <div className="col-1"></div>
            <div className="col-2 d-flex align-items-center">
                <span className="me-2">pts:</span>
                <input
                    type="number"
                    value={question.points}
                    className="form-control"
                    onChange={(e) => dispatch(setQuestion({ ...question, points: parseInt(e.target.value) }))}
                />
            </div>
        </div>
    );
}


export default function UpdateQuestionBody() {
    const question = useSelector((state: any) => state.quizzesReducer.question);
    return (
        <div>
            <QuestionHeader />
            {question.questionType === "MULTIPLE_CHOICE" ?
                <MultipleChoice /> :
                question.questionType === "TRUE_FALSE" ?
                    <TrueFalse /> :
                    <FillIn />
            }
        </div>
    );
}

