import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
    const { pathname } = useLocation();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const links = currentUser ? ["Profile"] : ["Signin", "Signup"];

    return (
        <div id="wd-courses-navigation" className="list-group fs-5 rounded-0">
            {links.map((link) => (
                <Link to={`/Kanbas/Account/${link}`} className={`border border-0 list-group-item
           ${pathname.includes(link) ? "active text-black" : "text-danger"}`}> {link} </Link>
            ))}
        </div>
    );
}
