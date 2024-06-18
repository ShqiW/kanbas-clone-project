import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;

export const createQuiz = async (courseId: any, quiz: any) => {
    const response = await axios.post(`${COURSES_API}/${courseId}/quizzes`, quiz);
    return response.data;
};

export const findQuizzesForCourse = async (courseId: any) => {
    const response = await axios.get(`${COURSES_API}/${courseId}/quizzes`);
    return response.data;
};

// Question?
// export const findQuizByQuizId = async (quizId: any) => {
//     const response = await axios.get(`${QUIZZES_API}/${quizId}`)
//     console.log('API Response:', response.data);
//     return response.data;
// }
export const findQuizByQuizId = async (quizId: any) => {
    const response = await axios.get(`${QUIZZES_API}/${quizId}`);
    console.log('API Response:', response.data);
    if (Array.isArray(response.data)) {
        return response.data[0];
    }
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
