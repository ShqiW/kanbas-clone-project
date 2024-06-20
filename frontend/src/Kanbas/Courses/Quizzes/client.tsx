import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;
const HISTORY_API = `${REMOTE_SERVER}/api/history`;

export const createQuiz = async (courseId: any, quiz: any) => {
    const response = await axios.post(`${COURSES_API}/${courseId}/quizzes`, quiz);
    return response.data;
};

export const findQuizzesForCourse = async (courseId: any) => {
    const response = await axios.get(`${COURSES_API}/${courseId}/quizzes`);
    return response.data;
};

export const findQuizByQuizId = async (quizId: any) => {
    const response = await axios.get(`${QUIZZES_API}/${quizId}`)
    console.log('API Response:', response.data);
    return response.data;
}

export const deleteQuiz = async (quizId: any) => {
    const response = await axios.delete(`${QUIZZES_API}/${quizId}`);
    return response.data;
};

export const updateQuiz = async (quiz: any) => {
    try {
        const response = await axios.put(`${QUIZZES_API}/${quiz._id}`, quiz);
        return response.data;
    } catch (error) {
        console.error('Error updating quiz:', error);
        throw error;
    }
};

export const updateHistory = async (qid: String, history: any) => {
    const response = await axiosWithCredentials.post(`${HISTORY_API}/${qid}`, history);
    return response.data;
};

export const findHistoriesByQuizId = async (qid: String) => {
    const response = await axiosWithCredentials.get(`${HISTORY_API}/${qid}`);
    return response.data;
};
