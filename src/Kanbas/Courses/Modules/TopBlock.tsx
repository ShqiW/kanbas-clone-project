import { BsList } from "react-icons/bs";
import { FaChevronDown } from "react-icons/fa";

export default function TopBlock() {
    return (
        <div id="wd-topblock" className="d-none d-sm-flex d-md-none align-items-center justify-content-center bg-black text-white p-1 mb-3">
            <div className="d-flex justify-content-between align-items-center w-100">
                <div>
                    <BsList className="ms-3" />
                </div>
                <p className="mb-0 text-center">
                    CS5610 SU1 24 MON/FRI<br />
                    Modules
                </p>
                <div>
                    <FaChevronDown className="me-3" />
                </div>
            </div>
        </div>
    );
}

