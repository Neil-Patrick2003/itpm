import React from 'react';
import right from '../../assets/image/right.png';

const Welcome = () => {
    return (
        <>
            <div className="">

                <div className='max-w-[1400px] mx-auto h-[100vh] p-4 md:p-4 lg:p-6'>
                    <section className="grid grid-cols-1 gap-4 md:grid-cols-2 h-full">

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
                            <img className=' w-full max-w-[600px] object-cover' src={right} alt="Healthy Living" />
                        </div>
                    </section>

                    <section className="h-[100vh] p-4">
                        <div className='flex justify-center p-2 md:p-4 lg:p-6 h-full border drop-shadow-lg rounded-l-2xl shadow-inner shadow-green-500/50'>
                            <h1 className='text-lg md:text-xl lg:text-2xl'>Top sponsors</h1>
                        </div>
                    </section>
                    <section className="flex flex-col items-center h-[100vh] p-6 md:p-7 lg:p-12 mt-20 text-center">
                        <h1 className='text-lg md:text-xl lg:text-2xl mb-8 md:mb-10 lg:mb-12'>About us</h1>
                        <p className='text-sm md:text-lg lg:text-xl md:mb-6 leading-relaxed tracking-wide'>
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
                        </p>
                    </section>

                    <section className="h-[100vh] border">
                        <h2>How It Works</h2>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                            <div className='border w-full h-60'>1</div>
                            <div className='border w-full h-60'>2</div>
                            <div className='border w-full h-60'>3</div>
                            <div className='border w-full h-60'>4</div>
                        </div>
                    </section>

                    {/* Footer */}
                    <footer className="bg-green-900 text-white py-4 mt-8">
                        <div className="text-center">
                            <p>&copy; {new Date().getFullYear()} Healthy Living. All rights reserved.</p>
                        </div>
                    </footer>
                </div>
                <div>hi</div>
            </div>
        </>
    );
}

export default Welcome;
