

import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;

const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;



export const createQuiz = async (courseId: any, quiz: any) => {
    const response = await axios.post(`${COURSES_API}/${courseId}/Quizs`, quiz);
    return response.data;
};

export const findQuizzesForCourse = async (courseId: any) => {
    // console.log('Fetching quizzes for course:', courseId);
    const response = await axios.get(`${COURSES_API}/${courseId}/quizzes`);
    // console.log('Quizzes fetched:', response.data);
    return response.data;
};


export const findQuizByQuizId = async (quizId: any) => {
    const response = await axios.get(`${QUIZZES_API}/${quizId}`)
    return response.data;
}

export const deleteQuiz = async (quizId: any) => {
    const response = await axios.delete(`${QUIZZES_API}/${quizId}`);
    return response.data;
};

export const updateQuiz = async (quiz: any) => {
    const response = await axios.put(`${QUIZZES_API}/${quiz._id}`, quiz);
    return response.data;
};
