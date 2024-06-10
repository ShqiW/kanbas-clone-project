import { BiImport } from "react-icons/bi";
import { LiaFileImportSolid } from "react-icons/lia";
import { IoMdSettings } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { CiFilter } from "react-icons/ci";
import { FaAngleDown } from "react-icons/fa6";
import '../../styles.css';

import { useParams } from "react-router-dom";
import { users } from "../../Database"; // Import users data
import { assignments } from "../../Database"; // Import assignments data
import { grades } from "../../Database"; // Import grades data
import { enrollments } from "../../Database"; // Import enrollments data

export default function Grades() {
    const { cid } = useParams();
    const enrollStudent = enrollments.filter(enrollment => enrollment.course === cid);
    const studentInfo = enrollStudent.map(enrollment => { return users.find(user => user._id === enrollment.user) })
    const courseAssignment = assignments.filter(assignment => assignment.course === cid)

    return (
        <div className="container">
            <div className="flex-fill">
                <div id="wd-grades" className="ms-5 me-5 row">
                    <form className="col mt-3">
                        <div id="wd-grade-import-and-export" className="d-flex justify-content-end mb-3">
                            <div className="btn btn-secondary me-2 align-middle fs-5"><BiImport className="me-2" />Import</div>
                            <div className="btn btn-secondary me-2 align-middle fs-5"><LiaFileImportSolid className="me-2" />Export</div>
                            <div className="btn btn-secondary align-middle fs-5"><IoMdSettings /></div>
                        </div>
                        <div id="wd-grades-search-student-assignment" className="row">
                            <div className="col">
                                <p style={{ fontWeight: "bold" }}>Student Names</p>
                                <div className="d-flex align-items-center input-group border" style={{ padding: "5px", borderRadius: "10px" }}>

                                    <IoSearch className="fs-5 ms-2 me-2" />
                                    <label htmlFor="searchStudenttDataList" className="form-label"></label>
                                    <input className="form-control border-0" list="datalistOptions" id="searchStudentDataList" placeholder="Search Students" />
                                    <datalist id="datalistOptions">
                                        <option value="A1" />
                                        <option value="A2" />
                                        <option value="A3" />
                                        <option value="A4" />

                                    </datalist>
                                    <FaAngleDown className="fs-5 ms-2 me-2" />
                                </div>
                            </div>
                            <div className="col">
                                <p style={{ fontWeight: "bold" }}>Assignment Names</p>
                                <div className="d-flex align-items-center input-group border" style={{ padding: "5px", borderRadius: "10px" }}>

                                    <IoSearch className="fs-5 ms-2 me-2" />
                                    <label htmlFor="searchAssignmentDataList" className="form-label"></label>
                                    <input className="form-control border-0" list="datalistOptions" id="searchAssignmentDataList" placeholder="Search Assignments" />
                                    <datalist id="datalistOptions">
                                        <option value="A1" />
                                        <option value="A2" />
                                        <option value="A3" />
                                        <option value="A4" />

                                    </datalist>
                                    <FaAngleDown className="fs-5 ms-2 me-2" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-auto mt-3">
                                <div className="btn btn-secondary me-2 align-middle fs-6">
                                    <CiFilter className="me-2 fs-4" />
                                    Apply Filters
                                </div>
                            </div>
                        </div>

                        <div id="wd-styling-tables" className="row mt-3">
                            <div className="table-responsive" style={{ overflowX: "auto" }}>
                                <table className="table table-bordered text-center table-striped" style={{ minWidth: "900px" }}>

                                    <thead>
                                        <tr>
                                            <th scope="col" className="text-left">Student Name</th>
                                            {courseAssignment.map(assignment => (
                                                <th key={assignment._id} scope="col">{assignment.title} < br /> Out of {assignment.points}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {studentInfo.map(student => (
                                            < tr key={student._id} >
                                                <th scope="row">{`${student.firstName} ${student.lastName}`}</th>
                                                {
                                                    courseAssignment.map(assignment => {
                                                        const studentGrade = grades.find(grade => grade.student === student._id && grade.assignment === assignment._id);
                                                        return (
                                                            <td key={assignment._id}>{studentGrade ? studentGrade.grade : 'N/A'}</td>
                                                        );
                                                    })
                                                }
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </form>
                </div>
            </div >
        </div >
    )
}

