import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../src/provider/AuthProvider";
import axios from "axios";

const useUserRole = () => {
    const { user, loading } = useContext(AuthContext);
    const [current, setCurrent] = useState([])

    useEffect(() => {
        fetchingUser()
    }, [])
    const fetchingUser = async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user`)
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
    const role = currentUser[0]?.role
    return { role }
};

export default useUserRole;