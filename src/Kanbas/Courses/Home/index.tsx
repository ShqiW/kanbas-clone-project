import Modules from "../Modules";
import CourseStatus from "./Status";
export default function Home() {
    return (

        <div id="wd-home" className="d-flex ms-5 me-5">
            <div>
                {/* 
                <div className="flex-fill">
                    <TopBlock />
                </div> */}

                <div className="flex-fill">
                    <Modules />

                </div>
            </div>
            <div className="d-none d-xl-block ms-5">
                <CourseStatus />
            </div>
        </div>


    );
}

