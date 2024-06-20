
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    quizzes: [],
    quiz: {
        _id: "",
        name: "",
        description: "",
        published: false,
        course: "",
        type: "GRADED_QUIZ",
        points: 0,
        assignmentGroup: "QUIZZES",
        shuffleAnswers: true,
        timeLimit: 20,
        multipleAttempts: false,
        attemptChange: 1,
        showCorrectAnswers: false,
        accessCode: "",
        oneQuestionAtATime: true,
        webcamRequired: false,
        lockQuestionsAfterAnswering: false,
        dueDate: "",
        availableFrom: "",
        availableUntil: "",
        isTemporary: true,
        isTimeLimit: true,
        questions: []
    },
    question: {
        title: "",
        questionText: "Multiple",
        questionType: "MULTIPLE_CHOICE",
        points: 0,
        multipleChoiceQuestionAnswers: [],
        trueFalseAnswer: false,
        fillInBlankAnswers: []
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

