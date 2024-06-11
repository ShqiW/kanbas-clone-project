
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    assignments: [],
    assignment: { title: "New Assignment", description: "New Assignment Description" },
};

const assignmentsReducer = createSlice({
    name: "assignments",
    initialState,
    reducers: {
        addAssignment: (state, action) => {
            state.assignments = [action.payload, ...state.assignments];
        },
        deleteAssignment: (state, action) => {
            state.assignments = state.assignments.filter(
                (assignment) => assignment._id !== action.payload
            );
        },
        updateAssignment: (state, action) => {
            state.assignments = state.assignments.map(
                (assignment) => {
                    return assignment._id === action.payload._id ? action.payload : assignment;
                }
            );
        },
        setAssignments: (state, action) => {
            state.assignments = action.payload;
        },

        setAssignment: (state, action) => {
            state.assignment = action.payload;
        }
    }
});

export const {
    addAssignment,
    deleteAssignment,
    updateAssignment,
    setAssignments,
    setAssignment } =
    assignmentsReducer.actions;
export default assignmentsReducer.reducer;