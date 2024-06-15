import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Courses/Modules/reducer";
import assignmentsReducer from "./Courses/Assignments/reducer";
import accountReducer from "./Courses/Account/reducer";
import quizzesReducer from "./Courses/Quizzes/reducer"



const store = configureStore({
    reducer: {
        modulesReducer,
        assignmentsReducer,
        accountReducer,
        quizzesReducer
    },
});
export default store;
