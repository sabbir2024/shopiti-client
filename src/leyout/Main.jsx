import { Outlet } from "react-router";
import Navbar from "../UI/shared/Navbar";
import Footer from "../UI/shared/Footer";

const Main = () => {
    return (
        <div>
            <Navbar />
            <div className="min-h-[calc(100vh-10px)]">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Main;