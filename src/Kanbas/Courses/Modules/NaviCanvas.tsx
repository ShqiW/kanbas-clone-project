import { SiCanvas } from "react-icons/si";



export default function NaviCanvas() {
    return (
        <div id="wd-navicanvas" className="d-flex">

            <div className="list-group">
                <SiCanvas />
                <h3>CANVAS</h3>
                <a href="#/Kanbas/Dashboard"
                    className="list-group-item list-group-item-action">
                    Dashboard</a>
            </div>



        </div>
    )
}