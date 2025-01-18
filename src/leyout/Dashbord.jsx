import { NavLink, Outlet } from "react-router";
import { useState } from "react";
import Container from "../component/Container";
import Navbar from "../UI/shared/Navbar";
import useUserRole from "../../hooks/useUserRole";
import dbg from "../assets/pBG.jpg";

const Dashbord = () => {
    const { role } = useUserRole();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // Function to close the drawer
    const closeDrawer = () => {
        document.getElementById("my-drawer-2").checked = false;
        setIsDrawerOpen(false);
    };

    return (
        <Container>
            <Navbar />
            <div className="drawer lg:drawer-open">
                <input
                    id="my-drawer-2"
                    type="checkbox"
                    className="drawer-toggle"
                    onChange={(e) => setIsDrawerOpen(e.target.checked)}
                />
                <div
                    style={{ backgroundImage: `url(${dbg})` }}
                    className="drawer-content bg-no-repeat bg-cover flex flex-col"
                >
                    {/* Page content */}
                    <label
                        htmlFor="my-drawer-2"
                        className="btn btn-primary drawer-button lg:hidden"
                    >
                        {isDrawerOpen ? "Close drawer" : "Open drawer"}
                    </label>
                    <Outlet />
                </div>
                <div className="drawer-side">
                    <label
                        htmlFor="my-drawer-2"
                        aria-label="close sidebar"
                        className="drawer-overlay"
                    ></label>
                    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                        {/* Sidebar content */}
                        <div className="collapse collapse-arrow border-y-2">
                            <input type="checkbox" />
                            <div className="collapse-title text-xl font-medium">
                                General
                            </div>
                            <div className="collapse-content">
                                <li>
                                    <NavLink to="/dashbord/static" onClick={closeDrawer}>
                                        Static
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashbord/user-list" onClick={closeDrawer}>
                                        User List
                                    </NavLink>
                                </li>
                            </div>
                        </div>
                        <div className="collapse collapse-arrow border-y-2">
                            <input type="checkbox" />
                            <div className="collapse-title text-xl font-medium">
                                Product
                            </div>
                            <div className="collapse-content">
                                {role === "admin" || role === "host" ? (
                                    <li>
                                        <NavLink to="/dashbord/add-product" onClick={closeDrawer}>
                                            Add Product
                                        </NavLink>
                                    </li>
                                ) : null}
                                <li>
                                    <NavLink to="/dashbord/product-list" onClick={closeDrawer}>
                                        Product List
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashbord/my-order-list" onClick={closeDrawer}>
                                        My Order List
                                    </NavLink>
                                </li>
                            </div>
                        </div>
                    </ul>
                </div>
            </div>
        </Container>
    );
};

export default Dashbord;
