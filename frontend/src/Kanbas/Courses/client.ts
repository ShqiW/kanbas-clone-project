import axios from "axios";
import { useSelector } from "react-redux";
const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;
const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;
export const fetchAllCourses = async () => {
    const { data } = await axios.get(COURSES_API);
    return data;
};
export const fetchAllUserCourses = async () => {
    const response = await axiosWithCredentials.get(ENROLLMENTS_API)
    let courses = []
    for (let enrollment of response.data) {
        let course = await axios.get(`${COURSES_API}/${enrollment.course}`)
        courses.push(course.data)
    }
    return courses
}
export const createCourse = async (course: any) => {
    const response = await axios.post(COURSES_API, course);
    return response.data;
};
export const deleteCourse = async (id: string) => {
    const response = await axios.delete(`${COURSES_API}/${id}`);
    return response.data;
};
export const updateCourse = async (course: any) => {
    const response = await axios.put(`${COURSES_API}/${course.id}`, course);
    return response.data;
};

