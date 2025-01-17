import { useState } from "react";
import { FaCertificate, FaTshirt } from "react-icons/fa";

const ProductDetails = ({ product }) => {
    const [count, setCount] = useState(1);
    const [selectedColor, setSelectedColor] = useState(product?.color?.[0]); // Set the default selected color
    const [selectedSize, setSelectedSize] = useState(product?.size?.[0]); // Set the default selected size

    function calculateDiscountedPrice(originalPrice, discountPercentage) {
        let discountAmount = (originalPrice * discountPercentage) / 100;
        let discountedPrice = originalPrice - discountAmount; // Subtract to get the discount
        return discountedPrice;
    }

    let price = product?.price;
    let discount = product?.discount;
    let discountPrice = calculateDiscountedPrice(price, discount);
    let formattedDiscountPrice = discountPrice.toFixed(2);

    const handleDecrement = () => { if (count - 1 < 1) { alert("Count cannot be less than 1 !"); } else { setCount(count - 1); } };

    // Dynamic Color Mapping
    const handleColorSelect = (color) => {
        setSelectedColor(color); // Update the selected color state when clicked
    };

    // Handle Size Select
    const handleSizeSelect = (size) => {
        setSelectedSize(size); // Update the selected size state when clicked
    };

    return (
        <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">
                    {product?.title}
                </h2>
                <div className="rating rating-xs rating-half">
                    <input type="radio" name="rating-10" className="rating-hidden" />
                    <input type="radio" name="rating-10" className="mask mask-star-2 mask-half-1 bg-orange-400" />
                    <input type="radio" name="rating-10" className="mask mask-star-2 mask-half-2 bg-orange-400" />
                    <input
                        type="radio"
                        name="rating-10"
                        className="mask mask-star-2 mask-half-1 bg-orange-400"
                        defaultChecked
                    />
                    <input type="radio" name="rating-10" className="mask mask-star-2 mask-half-2 bg-orange-400" />
                    <input type="radio" name="rating-10" className="mask mask-star-2 mask-half-1 bg-orange-400" />
                    <input type="radio" name="rating-10" className="mask mask-star-2 mask-half-2 bg-orange-400" />
                    <input type="radio" name="rating-10" className="mask mask-star-2 mask-half-1 bg-orange-400" />
                    <input type="radio" name="rating-10" className="mask mask-star-2 mask-half-2 bg-orange-400" />
                    <input type="radio" name="rating-10" className="mask mask-star-2 mask-half-1 bg-orange-400" />
                    <input type="radio" name="rating-10" className="mask mask-star-2 mask-half-2 bg-orange-400" />
                </div>
                <h2 className="card-title">
                    <span>${formattedDiscountPrice}</span> <span className="line-through text-gray-400">${price}</span>
                    <div className="badge badge-secondary"> {discount}%</div>
                </h2>
                <p>{product?.description}</p>
                <hr />
                <p>us for</p>
                <p>{product?.gender}</p>
                <hr />
                <p>Select Color</p>
                <div className="flex gap-2 text-5xl">
                    {/* Dynamic color swatches */}
                    {product?.color?.map((color, index) => (
                        <FaTshirt

                            key={index}
                            className={`hover:animate-pulse cursor-pointer ${selectedColor === color ? 'border-4 border-black' : ''}`}
                            style={{ color: color }}
                            onClick={() => handleColorSelect(color)} // Handle color click
                        />
                    ))}
                </div>
                <hr />
                <p>Choose Size</p>
                <div className="flex gap-3">
                    {product?.size?.map((size, index) => (
                        <kbd
                            key={index}
                            onClick={() => handleSizeSelect(size)} // Handle size click
                            className={`kbd hover:bg-black cursor-pointer hover:text-white kbd-lg ${selectedSize === size ? 'bg-black text-white' : ''}`}
                        >
                            {size}
                        </kbd>
                    ))}
                </div>
                <hr />
                <div className="flex w-full justify-between mx-auto">
                    <div className="join join-vertical lg:join-horizontal">
                        <button onClick={() => setCount(count + 1)} className="btn join-item">+</button>
                        <button className="btn join-item">{count}</button>
                        <button onClick={handleDecrement} className="btn join-item">-</button>
                    </div>
                    <button className="btn btn-outline">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
