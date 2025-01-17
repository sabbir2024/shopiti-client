import { FaArrowRight } from "react-icons/fa";

const BannerCard = ({ title, image, discription }) => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2  w-full mx-auto'>
            <div className="md:relative w-2/3">
                <div className="md:absolute top-10 mt-12 ml-12 bottom-0 left-10">
                    <h3 className="text-3xl font-bold text-black uppercase">{title}</h3>
                    <p className="text-xs text-gray-700 py-5">{discription}</p>
                    <div className="flex gap-4">
                        <button className="btn text-white btn-outline bg-black">50% Discount</button>
                        <button className="btn btn-outline">Buy Now <FaArrowRight /></button>
                    </div>
                    <div className="stats shadow">
                        <div className="stat">
                            <div className="stat-figure text-primary">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    className="inline-block h-8 w-8 stroke-current">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                </svg>
                            </div>
                            <div className="stat-title">Total Likes</div>
                            <div className="stat-value text-primary">25.6K</div>
                            <div className="stat-desc">21% more than last month</div>
                        </div>

                        <div className="stat">
                            <div className="stat-figure text-secondary">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    className="inline-block h-8 w-8 stroke-current">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                </svg>
                            </div>
                            <div className="stat-title">Page Views</div>
                            <div className="stat-value text-secondary">2.6M</div>
                            <div className="stat-desc">21% more than last month</div>
                        </div>
                    </div>
                </div>
            </div>
            <img className="flex justify-center items-center place-content-center" src={image} alt="banar logo" />

        </div>
    );
};

export default BannerCard;