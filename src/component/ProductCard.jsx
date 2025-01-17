import { Link } from "react-router";

const ProductCard = ({ item }) => {

    // Function to calculate the discounted price
    function calculateDiscountedPrice(originalPrice, discountPercentage) {
        if (isNaN(originalPrice) || isNaN(discountPercentage)) {
            return 0; // Return 0 if inputs are invalid
        }
        let discountAmount = (originalPrice * discountPercentage) / 100;
        let discountedPrice = originalPrice - discountAmount; // Subtract discount
        return discountedPrice;
    }

    // Ensure price and discount are valid numbers
    let price = parseFloat(item?.price); // Parse price
    let discount = parseFloat(item?.discount); // Parse discount

    if (isNaN(price) || isNaN(discount)) {
        price = 0; // Default to 0 if invalid
        discount = 0; // Default to 0 if invalid
    }

    // Calculate and format the discounted price
    let discountPrice = calculateDiscountedPrice(price, discount);
    let formattedDiscountPrice = discountPrice.toFixed(2); // Format to 2 decimal places

    return (
        <div>
            <Link to={`/all-product/${item?._id}`} className="card bg-base-100 shadow-xl">
                <figure>
                    <img
                        className="h-[225px] w-[225px]"
                        src={item?.img1}
                        alt="Product img"
                    />
                </figure>
                <div className="card-body">
                    <h2 className="card-title h-[56px]">{item?.title.split(" ").slice(0, 6).join(" ")} ...</h2>

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
                        <span>${price}</span>{" "}
                        <span className="line-through text-gray-300">${discount}</span>
                        <div className="badge badge-secondary">{formattedDiscountPrice}%</div>
                    </h2>
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;
