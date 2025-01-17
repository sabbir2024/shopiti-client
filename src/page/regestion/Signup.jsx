import React, { useContext } from 'react';
import Container from '../../component/Container';
import { Link, NavLink, useLocation, useNavigate } from 'react-router';
import GoogleSignin from './GoogleSignin';
import { AuthContext } from '../../provider/AuthProvider';
import toast from 'react-hot-toast';
import axios from 'axios';

const Signup = () => {

    const { createUser, loading, setLoading, profileUpdate, user } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || "/";


    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.username.value;
        const email = form.email.value;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;
        const file = form.profilePhoto.files[0]



        const url = `https://api.imgbb.com/1/upload?expiration=600&key=${import.meta.env.VITE_IMGBB}`
        let photo = 'https://i.ibb.co.com/k0bCfh5/avatarjpg.jpg'
        if (file) {

            let formData = new FormData()
            formData.append("image", file);

            const response = await axios.post(url, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            photo = response?.data?.data?.display_url

        }

        console.log("🚀 ~ handleSubmit ~ photo:", photo)

        const toastId = toast.loading('Waiting...');




        if (password === confirmPassword) {

            createUser(email, password)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    setLoading(true);
                    toast.loading('Please wait while your profile is being updated...', { id: toastId });
                    try {
                        const updated = async () => {

                            const update = await profileUpdate(name, photo)
                                .then(() => {
                                    toast.success('sign up & profile update successfully', { id: toastId })
                                    const userPost = async () => {

                                        const users = {
                                            name: user?.displayName,
                                            email: user?.email,
                                            photos: user?.photoURL,
                                            role: 'user'
                                        }
                                        const userEmail = { email: user?.email }

                                        try {
                                            const { data: responceData } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/jwt`, { userEmail }, { withCredentials: true })

                                            console.log("🚀 ~ userPost ~ data:responceData:", responceData)
                                            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user`, users, {
                                                headers: {
                                                    'Content-Type': 'application/json'
                                                }
                                            })
                                            toast.success(`${data}`, { id: toastId });


                                        } catch (error) {
                                            console.log("🚀 ~ .then ~ error:", error)
                                            return data;

                                        }
                                    }
                                    userPost()
                                    navigate(from, { replace: true });

                                }).catch((error) => {
                                    toast.error('Please check the input fild', { id: toastId })
                                });
                        }
                        updated();
                        setLoading(false)
                    } catch (error) {
                        console.log("🚀 ~ .then ~ error:", error)

                    }
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setLoading(false); // Ensure loading state is reset on error
                    toast.error(`Error: ${errorMessage}`);
                });
        } else {
            alert('Please check your password');
        }
    };


    return (
        <Container>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Sign In now!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi.
                            In deleniti eaque aut repudiandae et a id nisi.
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
                                            <NavLink to="/signup" className={({ isActive }) => isActive ? "btn btn-info" : "text-black btn"}>
                                                Sign In
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/login" className={({ isActive }) => isActive ? "btn btn-info" : "text-black btn"}>
                                                Log In
                                            </NavLink>
                                        </li>
                                    </ul>
                                    <form onSubmit={handleSubmit}>
                                        <div className="relative flex items-center mt-8">
                                            <span className="absolute">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                            </span>
                                            <input type="text" name="username" className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Username" />
                                        </div>
                                        <label htmlFor="dropzone-file" className="flex items-center px-3 py-3 mx-auto mt-6 text-center bg-white border-2 border-dashed rounded-lg cursor-pointer dark:border-gray-600 dark:bg-gray-900">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                            </svg>
                                            <input id="dropzone-file" type="file" name="profilePhoto" className="" />
                                        </label>
                                        <div className="relative flex items-center mt-6">
                                            <span className="absolute">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            </span>
                                            <input type="email" name="email" className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Email address" />
                                        </div>
                                        <div className="relative flex items-center mt-4">
                                            <span className="absolute">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                </svg>
                                            </span>
                                            <input type="password" name="password" className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Password" />
                                        </div>
                                        <div className="relative flex items-center mt-4">
                                            <span className="absolute">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                </svg>
                                            </span>
                                            <input type="password" name="confirmPassword" className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Confirm Password" />
                                        </div>
                                        <div className="mt-6">
                                            <button type="submit" className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                                Sign Up
                                            </button>
                                        </div>
                                    </form>
                                    <div>
                                        <div className="mt-6 text-center">
                                            <Link to="/login" className="text-sm text-blue-500 hover:underline dark:text-blue-400">
                                                Already have an account?
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
    )
};

export default Signup;