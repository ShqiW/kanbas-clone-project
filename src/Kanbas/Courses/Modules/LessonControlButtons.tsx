import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
export default function LessonControlButtons() {
    return (
        <div className="float-end align-items-center gap-2">
            < GreenCheckmark />
            <IoEllipsisVertical className="fs-4" />
        </div >
    );
}
