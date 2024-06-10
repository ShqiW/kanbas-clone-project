import { FaCheckCircle } from "react-icons/fa";
import { FaCircle } from "react-icons/fa";
export default function GreenCheckmark() {
    return (
        <span className="me-2 position-relative">
            <FaCheckCircle style={{ top: "2px" }}
                className="text-success me-2 position-absolute fs-5" />
            <FaCircle className="text-white me-1 fs-6" />
        </span>
    );
}

