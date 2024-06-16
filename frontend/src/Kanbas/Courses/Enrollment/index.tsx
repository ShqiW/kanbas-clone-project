import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as client from "../client";
import { useSelector } from "react-redux";

export default function Enrollment() {
  const [courses, setCourses] = useState<any[]>([]);
  const fetchUnenrolledCourses = async () => {
    const unenrolledCourses = await client.fetchUserUnenrolledCourses();
    setCourses(unenrolledCourses);
  };
  const enrollCourse = async (course: any) => {
    await client.enrollCourse(course)
    fetchUnenrolledCourses()
  }
  useEffect(() => {
    fetchUnenrolledCourses();
  }, []);

  return (
    <div id="wd-dashboard" className="p-4">
      <h1 id="wd-dashboard-title">Available Courses</h1> <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {courses.map((course) => (
            <div key={course._id} className="wd-dashboard-course col" style={{ width: "300px" }}>
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
                  <button onClick={e => enrollCourse(course)} className="btn btn-primary float-end" id="wd-enroll-course-click">
                    Enroll
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
