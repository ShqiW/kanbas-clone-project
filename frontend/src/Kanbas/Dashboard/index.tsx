import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as db from "../Database";
import * as client from "../Courses/client";
import { useSelector } from "react-redux";

export default function Dashboard({
    courses, course, setCourse, setCourses, addNewCourse,
    deleteCourse, updateCourse
}: {
    courses: any[]; course: any; setCourse: (course: any) => void; setCourses: (courses: any[]) => void;
    addNewCourse: () => void; deleteCourse: (courseId: string) => void;
    updateCourse: () => void;
}) {
    const fetchCourses = async () => {
        const newCourses = await client.fetchUserCourses();
        setCourses(newCourses);
    };

    const { currentUser } = useSelector((state: any) => state.accountReducer);

    useEffect(() => {
        fetchCourses();
    }, []);

    console.log("Courses array:", courses);

    return (
        <div id="wd-dashboard" className="p-4">
            <h1 id="wd-dashboard-title">Dashboard</h1>
            <hr />
            {
                currentUser ? <div>
                    <h5 className="my-3">Enroll in new courses
                        <Link to="/Kanbas/Courses/enroll" className="btn btn-primary float-end">Enroll</Link>
                    </h5>
                    {currentUser.role == 'FACULTY' ? <h5 className="my-3">New Course
                        <button className="btn btn-primary float-end"
                            id="wd-add-new-course-click"
                            onClick={addNewCourse}>Add</button>
                        <button className="btn btn-warning float-end me-2"
                            onClick={updateCourse} id="wd-update-course-click">
                            Update
                        </button>
                        <br />
                        <input value={course.name} className="form-control mb-2" onChange={(e) => setCourse({ ...course, name: e.target.value })} />
                        <textarea value={course.description} className="form-control" onChange={(e) => setCourse({ ...course, description: e.target.value })} />
                    </h5> : null
                    }
                </div> : null
            }
            <hr />

            <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>

            <hr />
            <div id="wd-dashboard-courses" className="row">
                <div className="row row-cols-1 row-cols-md-5 g-4">
                    {courses.filter(course => course !== null).map((course) => (
                        <div key={course._id} className="wd-dashboard-course col" style={{ width: "300px" }}>
                            <Link to={`/Kanbas/Courses/${course._id}/Home`} className="text-decoration-none" >
                                <div className="card rounded-3 overflow-hidden">
                                    <img src={course.img_url} height="160" alt={course.name} />
                                    <div className="card-body">
                                        <span className="wd-dashboard-course-link"
                                            style={{ textDecoration: "none", color: "navy", fontWeight: "bold" }} >
                                            {course.name}
                                        </span>
                                        <p className="wd-dashboard-course-title card-text" style={{ maxHeight: 53, overflow: "hidden" }}>
                                            {course.description}
                                        </p>
                                        <Link to={`/Kanbas/Courses/${course._id}/Home`} className="btn btn-primary">Go</Link>

                                        <button onClick={(event) => {
                                            event.preventDefault();
                                            deleteCourse(course._id);
                                        }} className="btn btn-danger float-end"
                                            id="wd-delete-course-click">
                                            Delete
                                        </button>
                                        {currentUser ? currentUser.role === "STUDENT" ? null :
                                            <button id="wd-edit-course-click"
                                                onClick={(event) => {
                                                    event.preventDefault();
                                                    setCourse(course);
                                                }}
                                                className="btn btn-warning me-2 float-end" >
                                                Edit
                                            </button> : null
                                        }
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}


// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import * as db from "../Database";
// import * as client from "../Courses/client";
// import { useSelector } from "react-redux";

// export default function Dashboard(
//     {
//         courses, course, setCourse, setCourses, addNewCourse,
//         deleteCourse, updateCourse
//     }: {
//         courses: any[]; course: any; setCourse: (course: any) => void; setCourses: (course: any) => void;
//         addNewCourse: () => void; deleteCourse: (course: any) => void;
//         updateCourse: () => void;
//     }) {
//     const fetchCourses = async () => {
//         const newCourses = await client.fetchUserCourses();
//         setCourses(newCourses);
//     };
//     const { currentUser } = useSelector((state: any) => state.accountReducer);
//     useEffect(() => {
//         fetchCourses();
//     }, []);

//     return (
//         <div id="wd-dashboard" className="p-4">
//             <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
//             {
//                 currentUser ? currentUser.role === "STUDENT" ? <h5>Enroll in new courses
//                     <Link to="/Kanbas/Courses/enroll" className="btn btn-primary float-end">Enroll</Link>
//                 </h5> : <h5>New Course
//                     <button className="btn btn-primary float-end"
//                         id="wd-add-new-course-click"
//                         onClick={addNewCourse} > Add </button>
//                     <button className="btn btn-warning float-end me-2"
//                         onClick={updateCourse} id="wd-update-course-click">
//                         Update
//                     </button>
//                     <br />
//                     <input value={course.name} className="form-control mb-2" onChange={(e) => setCourse({ ...course, name: e.target.value })} />
//                     <textarea value={course.description} className="form-control" onChange={(e) => setCourse({ ...course, description: e.target.value })} />
//                 </h5> : null
//             }
//             <hr />

//             <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
//             <div id="wd-dashboard-courses" className="row">
//                 <div className="row row-cols-1 row-cols-md-5 g-4">
//                     {courses.map((course) => (
//                         <div key={course._id} className="wd-dashboard-course col" style={{ width: "300px" }}>
//                             <Link to={`/Kanbas/Courses/${course._id}/Home`} className="text-decoration-none" >
//                                 <div className="card rounded-3 overflow-hidden">
//                                     <img src={course.img_url} height="160" alt={course.name} />
//                                     <div className="card-body">
//                                         <span className="wd-dashboard-course-link"
//                                             style={{ textDecoration: "none", color: "navy", fontWeight: "bold" }} >
//                                             {course.name}
//                                         </span>
//                                         <p className="wd-dashboard-course-title card-text" style={{ maxHeight: 53, overflow: "hidden" }}>
//                                             {course.description}
//                                         </p>
//                                         <Link to={`/Kanbas/Courses/${course._id}/Home`} className="btn btn-primary">Go</Link>

//                                         <button onClick={(event) => {
//                                             event.preventDefault();
//                                             deleteCourse(course._id);
//                                         }} className="btn btn-danger float-end"
//                                             id="wd-delete-course-click">
//                                             Delete
//                                         </button>
//                                         <button id="wd-edit-course-click"
//                                             onClick={(event) => {
//                                                 event.preventDefault();
//                                                 setCourse(course);
//                                             }}
//                                             className="btn btn-warning me-2 float-end" >
//                                             Edit
//                                         </button>
//                                     </div>
//                                 </div>
//                             </Link>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }
