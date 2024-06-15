
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    quizzes: [],
    quiz: {
        _id: "",
        name: "",
        description: "",
        published: "",
        course: "",
        type: "",
        assignmentGroup: "",
        shuffleAnswer: "",
        timeLimit: "",
        multipleAttempts: "",
        showCorrectAnswers: "",
        accessCode: "",
        oneQuestionAtATime: "",
        webcamRequired: "",
        lockQuestionsAfterAnswering: "",
        dueDate: "",
        availableDate: "",
        untilDate: "",
        questions: []

    },
    question: {
        title: "",
        questionText: "",
        type: "",
        point: "",
        multiAnswer: [],
        tfAnswer: "",
        fillInAnswer: []
    }
};

const quizzesReducer = createSlice({
    name: "quizzes",
    initialState,
    reducers: {
        addQuiz: (state, action) => {
            state.quizzes = [action.payload, ...state.quizzes];
        },
        deleteQuiz: (state, action) => {
            state.quizzes = state.quizzes.filter(
                (quiz) => quiz._id !== action.payload
            );
        },
        updateQuiz: (state, action) => {
            state.quizzes = state.quizzes.map(
                (quiz) => {
                    return quiz._id === action.payload._id ? action.payload : quiz;
                }
            );
        },
        setQuizzes: (state, action) => {
            state.quizzes = action.payload;
            console.log("check for setQuizzes", action.payload)
        },

        setQuiz: (state, action) => {
            state.quiz = action.payload;
        },
        setQuestion: (state, action) => {
            state.question = action.payload;
        }
    }
});

export const {
    addQuiz,
    deleteQuiz,
    updateQuiz,
    setQuizzes,
    setQuiz, setQuestion } =
    quizzesReducer.actions;
export default quizzesReducer.reducer;

