import React, { useContext, useEffect } from 'react';
import Container from '../../component/Container';
import { Link, NavLink, useLocation, useNavigate } from 'react-router';
import GoogleSignin from './GoogleSignin';
import { AuthContext } from '../../provider/AuthProvider';
import toast from 'react-hot-toast';
import axios from 'axios';


const Login = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { setLoading, signingUser, user } = useContext(AuthContext);
    const from = location.state?.from?.pathname || "/";


    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log("🚀 ~ handleSubmit ~ email:", email, "password:", password);
        signingUser(email, password)
            .then(result => {
                try {
                    const jwtSend = async () => {
                        const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/jwt`, { email }, { withCredentials: true })

                        console.log("🚀 ~ userPost ~ data:", data)
                    }
                    jwtSend()
                } catch (error) {
                    console.log("🚀 ~ handleSubmit ~ error:", error)

                }
                toast.success('successfully login')
                setLoading(false)
                navigate(from, { replace: true });
            }
            )

    };

    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [user, navigate])

    return (
        <Container>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Log In now!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <section className="bg-white dark:bg-gray-900">
                            <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
                                <div className="w-full max-w-md">
                                    <div className="flex justify-center mx-auto">
                                        <img className="w-auto h-7 sm:h-8" src="https://merakiui.com/images/logo.svg" alt="Logo" />
                                    </div>

                                    <ul className="flex items-center justify-center gap-4 mt-6">
                                        <li>
                                            <NavLink to={'/signup'}
                                                className={({ isActive }) =>
                                                    isActive ? "btn btn-info" : "btn text-black"
                                                }>
                                                Sign In
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={'/login'}
                                                className={({ isActive }) =>
                                                    isActive ? "btn btn-info" : "btn text-black"
                                                }>
                                                Log In
                                            </NavLink>
                                        </li>
                                    </ul>
                                    <form onSubmit={handleSubmit}>

                                        <div className="relative flex items-center mt-6">
                                            <span className="absolute">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            </span>
                                            <input type="email" name="email" className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Email address" required />
                                        </div>

                                        <div className="relative flex items-center mt-4">
                                            <span className="absolute">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                </svg>
                                            </span>
                                            <input type="password" name="password" className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Password" required />
                                        </div>

                                        <div className="mt-6">
                                            <button type="submit" className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                                Log In
                                            </button>
                                        </div>
                                    </form>

                                    <div>
                                        <div className="mt-6 text-center">
                                            <Link to={'/signup'} className="text-sm text-blue-500 hover:underline dark:text-blue-400">
                                                Don’t have an account yet? Sign up
                                            </Link>
                                        </div>
                                        <GoogleSignin />
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Login;
