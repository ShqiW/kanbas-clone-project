import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setQuestion } from "../reducer";
import { Editor } from "@tinymce/tinymce-react";


export default function TrueFalse() {
    const WYSIWYG_API = process.env.REACT_APP_WYSIWYG_API;
    const dispatch = useDispatch();
    const question = useSelector((state: any) => state.quizzesReducer.question);

    return (
        <div className="col-12 p-3">
            <div className="col-12 mb-3">
                <label>Question:</label>
                {/* <textarea
                    value={question.questionText}
                    className="form-control mb-2"
                    onChange={(e) => dispatch(setQuestion({ ...question, questionText: e.target.value }))}
                /> */}
                {/* <Editor
                    apiKey={WYSIWYG_API}
                    value={question.questionText}
                    onEditorChange={(newQuestionText, editor) => {
                        dispatch(setQuestion({ ...question, questionText: newQuestionText }))
                    }}
                    initialValue="<p>Add multiple question text</p>"
                    init={{
                        height: 300,
                        menubar: false,
                        plugins: [
                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                        ],
                        toolbar: 'undo redo | blocks | ' +
                            'bold italic forecolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                        zIndex: 1
                    }}
                /> */}
                <Editor
                    apiKey={WYSIWYG_API}
                    value={question.questionText}
                    onEditorChange={(newQuestionText, editor) => {
                        dispatch(setQuestion({ ...question, questionText: newQuestionText }))
                    }}
                />
            </div>
            <div className="col-12 mb-3">
                <label>Correct Answer:</label>
                <div>
                    <input
                        type="radio"
                        name="trueFalse"
                        checked={question.trueFalseAnswer === true}
                        onChange={() => dispatch(setQuestion({ ...question, trueFalseAnswer: true }))}
                    />
                    <label className="ms-2 me-3">True</label>
                    <input
                        type="radio"
                        name="trueFalse"
                        checked={question.trueFalseAnswer === false}
                        onChange={() => dispatch(setQuestion({ ...question, trueFalseAnswer: false }))}
                    />
                    <label className="ms-2">False</label>
                </div>
            </div>
        </div>
    );
}
