
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import * as client from "./Courses/client";
import { useState, useEffect } from "react";
import KanbasNavigation from "./Navigation";
import store from "./store";
import { Provider } from "react-redux"
import Account from "./Courses/Account";
import ProtectedRoute from "./ProtectedRoute";
import Session from "./Courses/Account/Session";
import Enrollment from "./Courses/Enrollment";


export default function Kanbas() {
    const [courses, setCourses] = useState<any[]>([]);

    const [course, setCourse] = useState<any>({
        _id: "1234", name: "New Course", number: "New Number",
        startDate: "2023-09-10", endDate: "2023-12-15", description: "New Description", img_url: "images/NEU.png"
    });

    const addNewCourse = async () => {
        const newCourse = await client.createCourse(course);
        setCourses([...courses, newCourse]);
    };


    const deleteCourse = async (courseId: string) => {
        await client.deleteCourse(courseId);
        setCourses(courses.filter(
            (c) => c._id !== courseId));
    };


    const updateCourse = async () => {
        await client.updateCourse(course);
        setCourses(
            courses.map((c) => {
                if (c._id === course._id) {
                    return course;
                } else {
                    return c;
                }
            })
        );
    };

    return (
        <Provider store={store}>
            <Session>
                <div id="wd-kanbas" className="h-100">
                    <div className="d-flex h-100">
                        <div className="d-none d-md-block bg-black">
                            <KanbasNavigation />
                        </div>
                        <div className="flex-fill p-4">
                            <Routes>
                                <Route path="/" element={<Navigate to="Dashboard" />} />
                                <Route path="/Account/*" element={<Account />} />
                                <Route path="Dashboard" element={
                                    <ProtectedRoute>
                                        <Dashboard
                                            courses={courses}
                                            course={course}
                                            setCourse={setCourse}
                                            setCourses={setCourses}
                                            addNewCourse={addNewCourse}
                                            deleteCourse={deleteCourse}
                                            updateCourse={updateCourse} />
                                    </ProtectedRoute>
                                } />
                                <Route path="Courses/enroll" element={
                                    <ProtectedRoute>
                                        <Enrollment />
                                    </ProtectedRoute>
                                } />
                                <Route path="Courses/:cid/*" element={
                                    <ProtectedRoute>
                                        <Courses courses={courses} />
                                    </ProtectedRoute>
                                } />
                            </Routes>

                        </div>
                    </div>
                </div>;
            </Session>
        </Provider>
    )
}

