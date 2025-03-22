import React from 'react';
import right from '../../assets/image/right.png';
import one from '../../assets/image/one.png';
import two from '../../assets/image/two.png';
import three from '../../assets/image/three.png';
import four from '../../assets/image/four.png';

const Welcome = () => {
    return (
        <>
            <div className="">

                <div className="max-w-[1400px] mx-auto p-4 md:p-4 lg:p-6">

                    <section className="grid grid-cols-1 gap-4 md:grid-cols-2 h-screen">
                        <div className="flex flex-col justify-center h-full gap-4">
                            <h1 className="text-red-600 text-4xl md:text-7xl lg:text-8xl font-bold">
                                Healthy <span className='text-black text-xl md:text-2xl lg:text-4xl'>Living</span>
                            </h1>
                            <p className='text-xl md:text-2xl lg:text-4xl '>Made easy!!!</p>
                            <p className='md:text-lg lg:text-xl md:mb-6'>
                                Get your custom plan & one-on-one guidance from our experts.
                            </p>
                            <a href="/register" className="text-center bg-green-100 w-40 px-4 py-2 border rounded-md drop-shadow-lg text-xl">Sign In</a>
                            <p className='md:text-lg lg:text-xl'>
                                Sign in & get started today
                            </p>
                        </div>
                        <div className="flex justify-end items-center">
                            <img className='w-full max-w-[600px] object-cover' src={right} alt="Healthy Living" />
                        </div>
                    </section>

                    <section className="h-screen p-4">
                        <div className='flex justify-center p-2 md:p-4 lg:p-6 h-full border drop-shadow-lg rounded-l-2xl shadow-inner shadow-green-500/50'>
                            <h1 className='text-lg md:text-xl lg:text-2xl'>Top sponsors</h1>
                        </div>
                    </section>

                    <section className="h-screen flex flex-col items-center p-6 md:p-7 lg:p-12 mt-20 text-center">
                        <h1 className='text-lg md:text-xl lg:text-2xl mb-8 md:mb-10 lg:mb-12'>About us</h1>
                        <p className='text-sm md:text-lg lg:text-xl md:mb-6 leading-relaxed tracking-wide'>
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
                        </p>
                    </section>

         
                    <section className="h-screen">
                        <center><h2 className='text-lg md:text-xl lg:text-2xl my-6 md:mt-16 lg:mt-18'>How <span className='text-red-500 text-xl md:text-3xl lg:text-4xl'>Nutrisafari</span> Works</h2></center>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                            <div className='flex flex-col md:flex-row border w-full h-auto p-3'>
                                <div className='w-full flex justify-center items-center md:w-1/3'>
                                    <img className='w-full max-w-[240px] object-cover mx-auto' src={one} alt="Healthy Living" />
                                </div>
                                <div className='w-full md:w-2/3 mt-4 md:mt-0 p-2 md:p-6 overflow-hidden'>
                                    <h3 className="text-center md:text-left text-xl font-semibold">Find a diet you love</h3>
                                    <p className="md:text-left text-center text-sm md:text-base">
                                        Find a nutritious diet that fits your lifestyle and food preferences. Take charge of your daily habits with one of the many ongoing diets, including Clean Eating and High Protein.
                                    </p>
                                </div>
                            </div>
                            <div className='flex flex-col md:flex-row border w-full h-auto p-3'>
                                <div className='w-full flex justify-center items-center md:w-1/3'>
                                    <img className='w-full max-w-[240px] object-cover mx-auto' src={two} alt="Healthy Living" />
                                </div>
                                <div className='w-full md:w-2/3 mt-4 md:mt-0 p-2 md:p-6 overflow-hidden'>
                                    <h3 className="text-center md:text-left text-xl font-semibold">Start a simplified meal plan</h3>
                                    <p className="md:text-left text-center text-sm md:text-base">
                                        Find a nutritious diet that fits your lifestyle and food preferences. Take charge of your daily habits with one of the many ongoing diets, including Clean Eating and High Protein.
                                    </p>
                                </div>
                            </div>
                            <div className='flex flex-col md:flex-row border w-full h-auto p-3'>
                                <div className='w-full flex justify-center items-center md:w-1/3'>
                                    <img className='w-full max-w-[240px] object-cover mx-auto' src={three} alt="Healthy Living" />
                                </div>
                                <div className='w-full md:w-2/3 mt-4 md:mt-0 p-2 md:p-6 overflow-hidden'>
                                    <h3 className="text-center md:text-left text-xl font-semibold">Track your way to success</h3>
                                    <p className="md:text-left text-center text-sm md:text-base">
                                        Find a nutritious diet that fits your lifestyle and food preferences. Take charge of your daily habits with one of the many ongoing diets, including Clean Eating and High Protein.
                                    </p>
                                </div>
                            </div>
                            <div className='flex flex-col md:flex-row border w-full h-auto p-3'>
                                <div className='w-full flex justify-center items-center md:w-1/3'>
                                    <img className='w-full max-w-[240px] object-cover mx-auto' src={four} alt="Healthy Living" />
                                </div>
                                <div className='w-full md:w-2/3 mt-4 md:mt-0 p-2 md:p-6 overflow-hidden'>
                                    <h3 className="text-center md:text-left text-xl font-semibold">Start your own healthy journey</h3>
                                    <p className="md:text-left text-center text-sm md:text-base">
                                        Find a nutritious diet that fits your lifestyle and food preferences. Take charge of your daily habits with one of the many ongoing diets, including Clean Eating and High Protein.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <footer className="bg-green-900 text-white py-4 mt-8 w-full">
                        <div className="container mx-auto px-4">
                            <div className="text-center">
                                <p>&copy; {new Date().getFullYear()} Healthy Living. All rights reserved.</p>
                            </div>
                        </div>
                    </footer>

                </div>
            </div>
        </>
    );
}

export default Welcome;
