import { useEffect, useState } from "react";
import Container from "../../../component/Container";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import { Link } from "react-router"
import useUserRole from "../../../../hooks/useUserRole";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const { role } = useUserRole();

    useEffect(() => {
        getProduct();
    }, []);

    const getProduct = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/products`);
            setProducts(response?.data);
            // console.log("🚀 ~ getProduct ~ response:", response);
        } catch (error) {
            console.log("🚀 ~ getProduct ~ error:", error);
        }
    };


    const handelDelete = async (id) => {
        console.log("🚀 ~ handelDelete ~ id:", id);

        // Show a confirmation toast with 'Yes' and 'No' buttons
        const confirmationToast = toast.custom((t) => (
            <div className="bg-slate-400 text-white p-6">
                <p>Are you sure you want to delete this product?</p>
                <button
                    onClick={async () => {
                        toast.dismiss(t.id); // Dismiss the confirmation toast
                        try {
                            const dataDelete = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/removed-product/${id}`);
                            getProduct(); // Reload the product list
                            toast.success('Product has been deleted successfully!');
                        } catch (error) {
                            console.log("🚀 ~ handelDelete ~ error:", error);
                            toast.error('Error deleting product');
                        }
                    }}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                >
                    Yes, Delete it
                </button>
                <button
                    onClick={() => toast.dismiss(t.id)}
                    className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
                >
                    No, Cancel
                </button>
            </div>
        ), { duration: Infinity }); // Set duration to Infinity to keep it open until a response

    };

    return (
        <Container>
            <h1 className="text-xl font-bold">Total Products : {products?.length}</h1>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Price</th>
                            {(role !== 'admin' && role !== 'host') && <th>View Detalis</th>}
                            {role === 'admin' || role === 'host' && <th>Edit</th>}
                            {role === 'admin' || role === 'host' && <th>Delete</th>}

                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {products ? (
                            products?.map((item, inx) => (
                                <tr key={item?._id}>
                                    <th>{inx + 1}</th>
                                    <td>
                                        <div className="avatar">
                                            <Link to={`/order/${item?._id}`} className="w-8 rounded">
                                                <img
                                                    src={item?.img1}
                                                    alt="Image"
                                                />
                                            </Link>
                                        </div>
                                    </td>
                                    <td >
                                        <div className="group relative  flex cursor-pointer justify-center ">
                                            {/* Hover button */}
                                            <button >{item?.title.split(" ").slice(0, 3).join(" ")}</button>
                                            {/* Hover Text */}
                                            <div className="absolute cursor-pointer whitespace-nowrap opacity-0 duration-500 hover:hidden group-hover:bottom-6 group-hover:opacity-100 bg-blue-600 ">
                                                {item?.title}

                                            </div>
                                        </div>

                                    </td>
                                    <td>{item?.category}</td>
                                    <td>$ {item?.price}</td>

                                    {(role !== 'admin' && role !== 'host') && <td><Link to={`/all-product/${item?._id}`}>View</Link></td>}
                                    {role === 'admin' || role === 'host' && <td> <FaEdit /> </td>}
                                    {role === 'admin' || role === 'host' && <td> <button onClick={() => handelDelete(item?._id)} className="btn btn-outline"><MdDelete className="text-xl" /></button> </td>}

                                </tr>
                            ))
                        ) : (
                            <p>No Product Available</p>
                        )}
                    </tbody>
                </table>
            </div>
        </Container>
    );
};

export default ProductList;
