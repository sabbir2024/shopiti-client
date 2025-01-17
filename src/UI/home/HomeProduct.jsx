import { useEffect, useState } from "react";
import axios from 'axios'
import Container from "../../component/Container";
import Grid from "../../component/Grid";
import ProductCard from "../../component/ProductCard";
import PreLoader from "../../component/PreLoader";


const HomeProduct = ({ category, title }) => {
    const [products, setProducts] = useState([]);

    const url = import.meta.env.VITE_BACKEND_URL;
    useEffect(() => {
        const fetchingProduct = async () => {
            try {
                const responce = await axios.get(`${url}/products`)
                setProducts(responce?.data)


            } catch (error) {
                console.log("🚀 ~ HomeProduct ~ error:", error)

            }
        }
        fetchingProduct();
    }, [url])






    const fetcherProduct = products?.filter(item => item.category === category)






    return (
        <>
            {
                products?.length > 0 ?
                    <Container>
                        <h3 className=" text-center py-8 text-3xl font-bold text-black uppercase text-hover">{title}</h3>
                        <Grid>
                            {fetcherProduct?.map(item => <ProductCard key={item._id} item={item} />)}
                        </Grid>
                        <div className="flex w-full justify-center items-center mx-auto my-3"><button className="btn btn-outline">View All</button></div>
                    </Container>
                    : <PreLoader />
            }
        </>

    );
};

export default HomeProduct;