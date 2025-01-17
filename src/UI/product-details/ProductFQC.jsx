import RatingReviews from "./RatingReviews";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import FCQs from "./FCQs";

const ProductFQC = ({ product }) => {


    return (
        <div>
            <div className="w-full">
                <Tabs>
                    <div className="flex items-center justify-center w-full mx-auto">
                        <TabList>
                            <Tab>Product Details</Tab>
                            <Tab>Rating & Reviews</Tab>
                            <Tab>FCQs</Tab>
                        </TabList>
                    </div>

                    <TabPanel>
                        <div className="flex items-center text-gray-800 -px-3 dark:text-gray-200">
                            <svg className="w-5 h-5 mx-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>

                            <span className="mx-3">Insurance</span>
                        </div>

                        <div className="flex items-center text-gray-800 -px-3 dark:text-gray-200">
                            <svg className="w-5 h-5 mx-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>

                            <span className="mx-3">All legal documents</span>
                        </div>

                        <div className="flex items-center text-gray-800 -px-3 dark:text-gray-200">
                            <svg className="w-5 h-5 mx-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>

                            <span className="mx-3">From US glasses dealers</span>
                        </div>

                        <div className="flex items-center text-gray-800 -px-3 dark:text-gray-200">
                            <svg className="w-5 h-5 mx-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>

                            <span className="mx-3">Payment Security</span>
                        </div>

                        <div className="flex items-center text-gray-800 -px-3 dark:text-gray-200">
                            <svg className="w-5 h-5 mx-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>

                            <span className="mx-3">Fast shipping (+ Express)</span>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <RatingReviews />
                    </TabPanel>
                    <TabPanel>
                        <FCQs />
                    </TabPanel>
                </Tabs>
            </div>

        </div>
    );
};

export default ProductFQC;