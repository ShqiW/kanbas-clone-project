import CoursesNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import { Navigate, Route, Routes, useParams, useLocation } from "react-router";
import AssignmentEditor from "./Assignments/Editor";
import Grades from "./Grades";
import Piazza from "./Piazza";
import Zoom from "./Zoom";
import Quizzes from "./Quizzes";
import People from "./People";
import { FaAlignJustify } from "react-icons/fa6";


export default function Courses({ courses }: { courses: any[] }) {
    const { cid } = useParams();
    const course = courses.find((course) => course._id === cid);
    const { pathname } = useLocation();

    // console.log("useParams() ->", useParams());
    // console.log(cid)
    // console.log("course ->", courses);
    // console.log("pathname ->", pathname);
    // Kanbas - Courses - Navigation - index.tsx: pathname -> /Kanbas/Courses / 1234 / Home

    return (
        <div id="wd-courses">
            <h2 className="text-danger">
                <FaAlignJustify className="me-4 fs-4 mb-1" />

                {course && course.name}  &gt; {pathname.split("/")[4]}

            </h2>

            <div className="d-flex">
                <div className="d-none d-md-block">
                    <CoursesNavigation />
                </div>
                <div className="flex-fill">

                    <Routes>
                        <Route path="Home" element={<Home />} />
                        <Route path="Modules" element={<Modules />} />
                        <Route path="Piazza" element={<Piazza />} />
                        <Route path="Zoom" element={<Zoom />} />
                        <Route path="Assignments" element={<Assignments />} />
                        <Route path="Assignments/:aid" element={<AssignmentEditor />} />
                        <Route path="Quizzes" element={<Quizzes />} />
                        <Route path="Grades" element={<Grades />} />
                        <Route path="People" element={<People />} />
                        <Route path="Setting" element={<Grades />} />

                    </Routes>
                </div>
            </div>

        </div>


    );
}
