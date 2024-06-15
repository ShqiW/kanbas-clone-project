import React from "react"
import { Link, useParams, useLocation } from "react-router-dom";
import "./index.css";

const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];
export default function CoursesNavigation() {
    const { cid } = useParams();
    const { pathname } = useLocation();

    return (
        <div id="wd-courses-navigation" className="list-group fs-5 rounded-0">
            {links.map(link => {
                const to = `/Kanbas/Courses/${cid}/${link}`;
                const isActive = pathname.includes(link);

                return (
                    <Link
                        key={link}
                        to={to}
                        className={`list-group-item border border-0 ${isActive ? "active" : "text-danger"}`} >
                        {link}
                    </Link>

                )
            })}

        </div >

    )
}


// import "./index.css";

// export default function CoursesNavigation() {
//     return (
//         <div id="wd-courses-navigation" className="list-group fs-5 rounded-0">
//             <a id="wd-course-home-link" href="#/Kanbas/Courses/1234/Home" className="list-group-item active border border-0">Home</a>
//             <a id="wd-course-home-link" href="#/Kanbas/Courses/1234/Modules" className="list-group-item text-danger border border-0">Modules</a>
//             <a id="wd-course-home-link" href="#/Kanbas/Courses/1234/Piazza" className="list-group-item text-danger border border-0">Piazza</a>
//             <a id="wd-course-home-link" href="#/Kanbas/Courses/1234/Zoom" className="list-group-item text-danger border border-0">Zoom Meetings</a>
//             <a id="wd-course-home-link" href="#/Kanbas/Courses/1234/Assignments" className="list-group-item text-danger border border-0">Assignments</a>
//             <a id="wd-course-home-link" href="#/Kanbas/Courses/1234/Quizzes" className="list-group-item text-danger border border-0">Quizzes</a>
//             <a id="wd-course-home-link" href="#/Kanbas/Courses/1234/Grades" className="list-group-item text-danger border border-0">Grades</a>
//             <a id="wd-course-home-link" href="#/Kanbas/Courses/1234/People" className="list-group-item text-danger border border-0">People</a>
//             <a id="wd-course-home-link" href="#/Kanbas/Courses/1234/Settings" className="list-group-item text-danger border border-0">Settings</a>
//         </div>
//     );
// }

