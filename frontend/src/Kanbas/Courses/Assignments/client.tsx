import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const axiosWithCredentials = axios.create({ withCredentials: true });
const ASSIGNMENTS_API = `${REMOTE_SERVER}/api/assignments`;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;

export const findAssignmentsForCourse = async (courseId: any) => {
    const response = await axios.get(`${COURSES_API}/${courseId}/assignments`);
    return response.data;
};


export const createAssignment = async (courseId: any, assignment: any) => {
    const response = await axiosWithCredentials.post(`${COURSES_API}/${courseId}/assignments`, assignment);
    return response.data;
};

export const deleteAssignment = async (assignmentId: any) => {
    const response = await axiosWithCredentials.delete(`${ASSIGNMENTS_API}/${assignmentId}`);
    return response.data;
};

export const updateAssignment = async (assignment: any) => {
    const response = await axiosWithCredentials.put(`${ASSIGNMENTS_API}/${assignment._id}`, assignment);
    return response.data;
};
