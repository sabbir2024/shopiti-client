import React from 'react';
import Banner from '../../UI/home/Banner';
import Container from '../../component/Container';
import Marquee from "react-fast-marquee";
import HomeProduct from '../../UI/home/HomeProduct';
import DressStyle from '../../UI/home/DressStyle';
import CustomerReviews from '../../UI/home/CustomerReviews';


const Home = () => {
    return (
        <div>
            <Banner />
            <Container>
                <Marquee direction="left" gradientColor='black' gradient='true' onmouseover="this.stop()" pauseOnHover='true' onmouseout="this.start()">
                    <li className='list-none mr-6 text-3xl font-bold hover:text-green-600'>  Zara</li>
                    <li className='list-none mr-6 text-3xl font-bold hover:text-green-600'> H&M</li>
                    <li className='list-none mr-6 text-3xl font-bold hover:text-green-600'> GAP</li>
                    <li className='list-none mr-6 text-3xl font-bold hover:text-green-600'> Uniqlo</li>
                    <li className='list-none mr-6 text-3xl font-bold hover:text-green-600'> Nike</li>
                    <li className='list-none mr-6 text-3xl font-bold hover:text-green-600'> Adidas</li>
                    <li className='list-none mr-6 text-3xl font-bold hover:text-green-600'> Puma</li>
                    <li className='list-none mr-6 text-3xl font-bold hover:text-green-600'> Calvin Klein</li>
                    <li className='list-none mr-6 text-3xl font-bold hover:text-green-600'> Tommy Hilfiger</li>
                    <li className='list-none mr-6 text-3xl font-bold hover:text-green-600'> Levi's</li>
                </Marquee>
            </Container>
            <HomeProduct title={'new arrivals'} category={'arrivals'} />
            <HomeProduct title={'top selling'} category={'selling'} />
            <DressStyle />
            <CustomerReviews />
        </div>
    );
};

export default Home;