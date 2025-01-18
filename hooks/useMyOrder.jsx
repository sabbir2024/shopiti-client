import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../src/provider/AuthProvider';
import axios from 'axios';

const useMyOrder = () => {
    const { user, loading: authLoading } = useContext(AuthContext);
    const [order, setOrder] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (authLoading || !user) {
            setLoading(false);
            return;
        }

        const fetchOrder = async () => {
            try {
                const url = `${import.meta.env.VITE_BACKEND_URL}/added-to-card/${user?.email}`;
                const { data } = await axios(url);
                setOrder(data);
            } catch (err) {
                console.error('🚀 ~ fetchOrder ~ error:', err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [authLoading, user]);

    return { order, loading, error };
};

export default useMyOrder;
