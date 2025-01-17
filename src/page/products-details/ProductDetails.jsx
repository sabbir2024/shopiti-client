import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Container from "../../component/Container";
import BreadCrumbs from "../../UI/product-details/BreadCrumbs";
import ProductImg from "../../UI/product-details/ProductImg";
import ProductDitails from "../../UI/product-details/ProductDitails";
import ProductFQC from "../../UI/product-details/ProductFQC";
import HomeProduct from "../../UI/home/HomeProduct";

const Order = () => {
    const { id } = useParams();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const url = `${backendUrl}/products/${id}`;

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchingData = async () => {
            try {
                const response = await axios.get(url);
                setProduct(response.data);
                setError(null);
            } catch (error) {
                console.error("Error fetching product data:", error);
                setError("Failed to load product data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchingData();
    }, [url]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <Container>
            <BreadCrumbs product={product} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                <ProductImg product={product} />
                <ProductDitails product={product} />
            </div>
            <ProductFQC product={product} />
            <HomeProduct title="You might also like" category={product?.category} />
        </Container>
    );
};

export default Order;
