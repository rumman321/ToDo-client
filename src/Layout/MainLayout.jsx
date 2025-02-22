import { Outlet } from "react-router-dom";
import Navber from "../Component/Navber/Navber";


const MainLayout = () => {
    return (
        <div>
            <Navber></Navber>
            <div className="pt-20">
            <Outlet></Outlet>
            </div>
        </div>
    );
};

export default MainLayout;