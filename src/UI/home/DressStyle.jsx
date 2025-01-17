import React from 'react';
import Container from '../../component/Container';

import img from '../../assets/category/casual.png'
import img2 from '../../assets/category/formal.png'
import img3 from '../../assets/category/gym.png'
import img4 from '../../assets/category/party.png'

const DressStyle = () => {
    return (
        <Container>
            <div className='w-full h-full bg-zinc-400 text-center py-6'>
                <h1 className="mb-5 text-5xl font-bold uppercase">browse by dress style</h1>
                <div className='w-full h-full bg-zinc-400 flex justify-center mx-auto'>
                    <div className='w-3/4 grid grid-cols-1 md:grid-cols-3 gap-3 rounded-xl'>
                        <div
                            className="hero rounded-xl "
                            style={{
                                backgroundImage: `url(${img})`,
                            }}>
                            <div className="hero-overlay bg-opacity-60"></div>
                            <div className="hero-content text-neutral-content text-center">
                                <div className="max-w-md">
                                    <h1 className="mb-5 text-5xl font-bold">Casual</h1>
                                </div>
                            </div>
                        </div>
                        <div
                            className="hero rounded-xl  md:col-span-2"
                            style={{
                                backgroundImage: `url(${img2})`,
                            }}>
                            <div className="hero-overlay bg-opacity-60"></div>
                            <div className="hero-content text-neutral-content text-center">
                                <div className="max-w-md">
                                    <h1 className="mb-5 text-5xl font-bold">Formal</h1>
                                </div>
                            </div>
                        </div>
                        <div
                            className="hero rounded-xl  md:col-span-2"
                            style={{
                                backgroundImage: `url(${img3})`,
                            }}>
                            <div className="hero-overlay bg-opacity-60"></div>
                            <div className="hero-content text-neutral-content text-center">
                                <div className="max-w-md">
                                    <h1 className="mb-5 text-5xl font-bold">gym</h1>
                                </div>
                            </div>
                        </div>
                        <div
                            className="hero rounded-xl "
                            style={{
                                backgroundImage: `url(${img4})`,
                            }}>
                            <div className="hero-overlay bg-opacity-60"></div>
                            <div className="hero-content text-neutral-content text-center">
                                <div className="max-w-md">
                                    <h1 className="mb-5 text-5xl font-bold">Partri</h1>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </Container>
    );
};

export default DressStyle;