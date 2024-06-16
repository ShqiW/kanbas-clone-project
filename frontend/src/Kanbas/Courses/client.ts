import axios from "axios";
import { log } from "console";
import { useSelector } from "react-redux";
const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;
const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;
export const fetchAllCourses = async () => {
    const { data } = await axios.get(COURSES_API);
    return data;
};
export const fetchUserEnrollments = async () => {
    const { data } = await axiosWithCredentials.get(ENROLLMENTS_API)
    return data
}
export const fetchUserCourses = async () => {
    const courses = await fetchAllCourses()
    const enrollments = await fetchUserEnrollments()
    let userCourses = []
    for (let course of courses) {
        for (let enrollment of enrollments) {
            if (course._id === enrollment.course) {
                userCourses.push(course)
                break
            }
        }
    }
    return userCourses
}
export const fetchUserUnenrolledCourses = async () => {
    const courses = await fetchAllCourses()
    const enrollments = await fetchUserEnrollments()
    let unenrolledCourses = []

    for (let course of courses) {
        let enrolled = false
        for (let enrollment of enrollments) {
            if (course._id === enrollment.course) {
                enrolled = true
                break
            }
        }
        if (!enrolled) {
            unenrolledCourses.push(course)
        }
    }
    return unenrolledCourses
}
export const createCourse = async (course: any) => {
    const response = await axiosWithCredentials.post(COURSES_API, course);
    return response.data;
};
export const deleteCourse = async (id: string) => {
    const response = await axiosWithCredentials.delete(`${ENROLLMENTS_API}/${id}`);
    return response.data;
};
export const updateCourse = async (course: any) => {
    const response = await axiosWithCredentials.put(`${COURSES_API}/${course._id}`, course);
    return response.data;
};
export const enrollCourse = async (course: any) => {
    const { data } = await axiosWithCredentials.post(ENROLLMENTS_API, course);
    return data
}
