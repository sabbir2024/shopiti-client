import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import { Navigate } from "react-router";
import toast from "react-hot-toast"

const AdminHostRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [current, setCurrent] = useState([])
    console.log("🚀 ~ Dashbord ~ current:", current)

    useEffect(() => {
        fetchingUser()
    }, [])
    const fetchingUser = async () => {
        const { data } = await axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/user`)
        setCurrent(data)

    }
    if (loading) {
        return <span className="loading loading-infinity loading-lg"></span>
    }
    if (!user) {
        return <span className="loading loading-infinity loading-lg"></span>

    }

    if (!current) {
        return <span className="loading loading-infinity loading-lg"></span>
    }
    const currentUser = current?.filter(u => u?.email === user?.email)

    if (currentUser[0]?.role === 'host' || currentUser[0]?.role === 'admin') {
        return children
    }
    toast.error("You are not allowed to enter here.")
    return <Navigate to={'/'} />
};

export default AdminHostRoute;