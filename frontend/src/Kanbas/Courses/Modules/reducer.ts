import { createSlice } from "@reduxjs/toolkit";
// import { modules } from "../../Database";
const initialState = {
    modules: [],
};

const modulesSlice = createSlice({
    name: "modules",
    initialState,
    reducers: {
        setModules: (state, action) => {
            state.modules = action.payload;
        },

        addModule: (state, { payload: module }) => {
            state.modules = [...state.modules, module];
        },
        deleteModule: (state, { payload: moduleId }) => {
            state.modules = state.modules.filter((m) => m._id !== moduleId);
        },
        updateModule: (state, { payload: module }) => {
            state.modules = state.modules.map((m) =>
                m._id === module._id ? module : m
            );
        },
        editModule: (state, { payload: moduleId }) => {
            state.modules = state.modules.map((m) =>
                m._id === moduleId ? { ...m, editing: true } : m
            );
        },
    },
});
export const { addModule, deleteModule, updateModule, editModule, setModules } =
    modulesSlice.actions;
export default modulesSlice.reducer;