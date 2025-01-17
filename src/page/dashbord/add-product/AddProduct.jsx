import Container from "../../../component/Container";
import pBG from "../../../assets/pBG.jpg";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const AddProduct = () => {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        // Convert colors and sizes to arrays from checkboxes
        const colors = Array.from(formData.getAll("color"));
        const sizes = Array.from(formData.getAll("size"));

        data.color = colors.length > 0 ? colors : [];
        data.size = sizes.length > 0 ? sizes : [];

        // Collect image URLs
        const imageUrls = {
            img1: e.target.img1.value.trim(),
            img2: e.target.img2.value.trim(),
            img3: e.target.img3.value.trim(),
        };

        // Check if any of the image URLs are empty
        if (Object.values(imageUrls).some(url => !url)) {
            toast.error("Please provide valid image URLs for all images.");
            return;
        }

        // Check if all required fields are filled before submitting
        if (!data.title || !data.category || !data.price || Object.values(imageUrls).length === 0) {
            toast.error("Please fill in all required fields and provide image URLs.");
            return;
        }

        const addedProduct = {
            ...data,
            img: imageUrls, // Send image URLs as an object
        };

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/add-product`,
                addedProduct,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            toast.success("Product successfully added!");
            navigate('/dashbord/product-list')
        } catch (error) {
            console.error("Error adding product:", error);
            toast.error(`Failed to add product: ${error.response?.data?.message || "Unknown error"}`);
        }
    };


    return (
        <Container>
            <div
                className="hero min-h-screen"
                style={{
                    backgroundImage: `url(${pBG})`,
                }}
            >
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-neutral-content text-center">
                    <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
                        <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
                            Add Product
                        </h2>

                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                                {/* Title */}
                                <div>
                                    <label htmlFor="title" className="text-gray-700 dark:text-gray-200">
                                        Title
                                    </label>
                                    <input
                                        id="title"
                                        name="title"
                                        type="text"
                                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 focus:border-blue-400 focus:ring focus:ring-blue-300 focus:outline-none"
                                        required
                                    />
                                    {/* date */}
                                </div>
                                <div>
                                    <label htmlFor="date" className="text-gray-700 dark:text-gray-200">
                                        Date
                                    </label>
                                    <input
                                        id="date"
                                        name="date"
                                        type="date"
                                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 focus:border-blue-400 focus:ring focus:ring-blue-300 focus:outline-none"
                                        required
                                    />
                                </div>

                                {/* Category */}
                                <div>
                                    <label htmlFor="category" className="text-gray-700 dark:text-gray-200">
                                        Category
                                    </label>
                                    <select
                                        id="category"
                                        name="category"
                                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 focus:border-blue-400 focus:ring focus:ring-blue-300 focus:outline-none"
                                        required
                                    >
                                        <option value="" disabled>
                                            Select a category
                                        </option>
                                        <option value="casual">Casual</option>
                                        <option value="formal">Formal</option>
                                        <option value="gym">Gym</option>
                                        <option value="party">Party</option>
                                        <option value="selling">Selling</option>
                                        <option value="arrivals">Arrivals</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="brand" className="text-gray-700 dark:text-gray-200">
                                        Brand
                                    </label>
                                    <select
                                        id="brand"
                                        name="brand"
                                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 focus:border-blue-400 focus:ring focus:ring-blue-300 focus:outline-none"
                                        required
                                    >
                                        <option value="" disabled>
                                            Select a brand
                                        </option>
                                        <option value="Puma">Puma</option>
                                        <option value="Calvin Klein">Calvin Klein</option>
                                        <option value="Tommy Hilfiger">Tommy Hilfiger</option>
                                        <option value="Levi's">Levi's</option>
                                        <option value="Zara">Zara</option>
                                        <option value="H&M">H&M</option>
                                        <option value="GAP">GAP</option>
                                        <option value="Uniqlo">Uniqlo</option>
                                        <option value="Nike">Nike</option>
                                        <option value="Adidas">Adidas</option>
                                    </select>
                                </div>


                                {/* Image URLs Input */}
                                {[1, 2, 3].map((i) => (
                                    <div key={`img${i}`}>
                                        <label htmlFor={`img${i}`} className="text-gray-700 dark:text-gray-200">
                                            Image {i} URL
                                        </label>
                                        <input
                                            id={`img${i}`}
                                            name={`img${i}`}
                                            type="text"
                                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 focus:border-blue-400 focus:ring focus:ring-blue-300 focus:outline-none"
                                            placeholder="Enter image URL"
                                        />
                                    </div>
                                ))}

                                {/* Price */}
                                <div>
                                    <label htmlFor="price" className="text-gray-700 dark:text-gray-200">
                                        Price
                                    </label>
                                    <input
                                        id="price"
                                        name="price"
                                        type="number"
                                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 focus:border-blue-400 focus:ring focus:ring-blue-300 focus:outline-none"
                                        required
                                    />
                                </div>

                                {/* Discount */}
                                <div>
                                    <label htmlFor="discount" className="text-gray-700 dark:text-gray-200">
                                        Discount (%)
                                    </label>
                                    <input
                                        id="discount"
                                        name="discount"
                                        type="number"
                                        min="0"
                                        max="100"
                                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 focus:border-blue-400 focus:ring focus:ring-blue-300 focus:outline-none"
                                    />
                                </div>

                                {/* Gender */}
                                <div>
                                    <label htmlFor="gender" className="text-gray-700 dark:text-gray-200">
                                        Gender
                                    </label>
                                    <select
                                        id="gender"
                                        name="gender"
                                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 focus:border-blue-400 focus:ring focus:ring-blue-300 focus:outline-none"
                                    >
                                        <option value="Unisex">Unisex</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>

                                {/* Description */}
                                <div className="col-span-2">
                                    <label htmlFor="description" className="text-gray-700 dark:text-gray-200">
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 focus:border-blue-400 focus:ring focus:ring-blue-300 focus:outline-none"
                                        rows="4"
                                    ></textarea>
                                </div>

                                {/* Colors */}
                                <div>
                                    <label htmlFor="color" className="text-gray-700 dark:text-gray-200">
                                        Colors
                                    </label>
                                    <div className="grid grid-cols-2 gap-2 mt-2">
                                        {[
                                            { value: "#FF0000", label: "Red" },
                                            { value: "#0000FF", label: "Blue" },
                                            { value: "#008000", label: "Green" },
                                            { value: "#FFFF00", label: "Yellow" },
                                            { value: "#000000", label: "Black" },
                                            { value: "#FFFFFF", label: "White" },
                                        ].map((color) => (
                                            <label key={color.value} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    name="color"
                                                    value={color.value}
                                                    className="form-checkbox h-4 w-4 text-blue-600"
                                                />
                                                <span
                                                    className="ml-2 inline-block w-4 h-4 border"
                                                    style={{ backgroundColor: color.value }}
                                                ></span>
                                                <span className="ml-2 text-black">{color.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Sizes */}
                                <div>
                                    <label htmlFor="size" className="text-gray-700 dark:text-gray-200">
                                        Sizes
                                    </label>
                                    <div className="grid grid-cols-2 gap-2 mt-2">
                                        {["S", "M", "L", "XL", "XXL"].map((size) => (
                                            <label key={size} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    name="size"
                                                    value={size}
                                                    className="form-checkbox h-4 w-4 text-blue-600"
                                                />
                                                <span className="ml-2 text-black">{size}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end mt-6">
                                <button
                                    type="submit"
                                    className="px-8 py-2 text-white bg-gray-700 rounded-md hover:bg-gray-600"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </section>
                </div>
            </div>
        </Container>
    );
};

export default AddProduct;
