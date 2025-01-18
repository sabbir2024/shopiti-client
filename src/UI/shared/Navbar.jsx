import Container from "../../component/Container";
import { IoSearch } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { Link, NavLink } from 'react-router'
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import useMyOrder from "../../../hooks/useMyOrder";



const Navbar = () => {

    const { user, logOut } = useContext(AuthContext);
    const { order } = useMyOrder();

    const navLinks = <>
        <li><NavLink to={'/'}>Home</NavLink> </li>
        <li>
            <details>
                <summary>Shop</summary>
                <ul className="p-2 grid grid-cols-3 w-96 z-30">
                    <li><NavLink to={'/all-product'}>All Product</NavLink></li>
                    <li><NavLink to={'/casual'}>Casual</NavLink></li>
                    <li><NavLink to={'/formal'}>Formal</NavLink></li>
                    <li><NavLink to={'/gym'}>GYM</NavLink></li>
                    <li><NavLink to={'/party'}>Party</NavLink></li>
                    <li><NavLink to={'/selling'}>Selling</NavLink></li>
                    <li><NavLink to={'/arrivals'}>Arrivals</NavLink></li>
                </ul>
            </details>
        </li>
        <li><NavLink to={'/on-sale'}>On Sale</NavLink> </li>
        <li><NavLink to={'/new-arrivals'}>New Arrivals</NavLink> </li>

    </>
    return (
        <Container>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {navLinks}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">Shopiti</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navLinks}
                    </ul>
                </div>
                <div className="navbar-end flex justify-between w-full mx-auto gap-2">
                    <div className="hidden md:flex">
                        <label className="input input-bordered flex items-center gap-2">
                            <input type="text" className="grow" placeholder="Search" />
                            <IoSearch />
                        </label>
                    </div>
                    <div className="flex md:hidden"> <IoSearch /> </div>
                    <div className="flex gap-4">
                        {user && <Link to={'/dashbord/my-order-list'} className="indicator">
                            <span className="indicator-item badge badge-secondary">{order?.length}</span>
                            <button className="btn"><FaShoppingCart className="text-3xl" /></button>
                        </Link>}
                        {user ? <div><div className="dropdown dropdown-end tooltip tooltip-left" data-tip={user?.
                            displayName}>
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full ">
                                    <img
                                        alt="Tailwind CSS Navbar component"
                                        src={user?.photoURL} />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-30 mt-3 w-52 p-2 shadow">
                                <li>
                                    <a className="justify-between ">
                                        Profile
                                        <span className="badge">New</span>
                                    </a>
                                </li>
                                <li>
                                    <Link to='/dashbord/static'>Dashbord</Link>
                                </li>
                                <li><Link to={'/dashbord/settings'}>Settings</Link></li>
                                <button onClick={() => logOut()}>Logout</button>
                            </ul>
                        </div></div> : <Link className="btn btn-outline" to={'/login'}>Login</Link>}
                    </div>
                </div>
            </div>
        </Container >
    );
};

export default Navbar;