import { NavLink, Outlet } from "react-router";
import Container from "../component/Container";
import Navbar from "../UI/shared/Navbar";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";

const Dashbord = () => {
    const { user, loading } = useContext(AuthContext);
    const [current, setCurrent] = useState([])
    console.log("🚀 ~ Dashbord ~ current:", current)

    useEffect(() => {
        fetchingUser()
    }, [])
    const fetchingUser = async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user`)
        setCurrent(data)

    }
    if (!user) {
        return <span className="loading loading-infinity loading-lg"></span>

    }

    if (!current) {
        return <span className="loading loading-infinity loading-lg"></span>
    }
    const currentUser = current?.filter(u => u?.email === user?.email)
    console.log("🚀 ~ Dashbord ~ currentUser:", currentUser[0]?.role)
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
                                {currentUser[0]?.role === 'admin' || currentUser[0]?.role === 'host' && <li><NavLink to={'/dashbord/add-product'}>Add Product</NavLink></li>}

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