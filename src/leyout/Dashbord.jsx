import { NavLink, Outlet } from "react-router";
import Container from "../component/Container";
import Navbar from "../UI/shared/Navbar";
import useUserRole from "../../hooks/useUserRole";

const Dashbord = () => {

    const { role } = useUserRole();
    return (
        <Container>
            <Navbar />
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col ">
                    {/* Page content here */}
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
                        Open drawer
                    </label>
                    <Outlet />
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                        {/* Sidebar content here */}
                        <div className="collapse collapse-arrow border-y-2">
                            <input type="checkbox" />
                            <div className="collapse-title text-xl font-medium">Genarel</div>
                            <div className="collapse-content">
                                <li><NavLink to={'/dashbord/static'}>Static</NavLink></li>
                                <li><NavLink to={'/dashbord/user-list'}>User List</NavLink></li>
                            </div>
                        </div>
                        <div className="collapse collapse-arrow border-y-2">
                            <input type="checkbox" />
                            <div className="collapse-title text-xl font-medium">Product</div>
                            <div className="collapse-content">
                                {role === 'admin' || role === 'host' && <li><NavLink to={'/dashbord/add-product'}>Add Product</NavLink></li>}

                                <li><NavLink to={'/dashbord/product-list'}>Product List</NavLink></li>
                            </div>
                        </div>
                    </ul>
                </div>
            </div>
        </Container>
    );
};

export default Dashbord;