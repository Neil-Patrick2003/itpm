import React, { useState } from 'react';
import right from '../../assets/image/right.png';
import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';

const Hero = () => {
    const [isHover, setIsHover] = useState(false);

    return (
        <div className="bg-[#E6F4EA]">
            <section id='home' className="grid grid-cols-1 md:grid-cols-2 h-screen">
                {/* Left - Text */}
                <div className="flex flex-col justify-center p-6 md:p-10 lg:p-20 gap-4">
                    <motion.h1
                        initial={{ opacity: 0, x: -100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        className="text-[#66CA6A] text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight"
                    >
                        Healthy Living
                        <p className="text-black text-2xl md:text-3xl mt-2">made easy!</p>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, x: -100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="text-gray-600 text-base md:text-lg lg:text-xl mt-2"
                    >
                        Get your custom plan & one-on-one guidance from our experts.
                    </motion.p>

                    <Link href="/login" className="mt-4">
                        <motion.div
                            className="relative flex items-center w-full sm:w-[220px] bg-white rounded-full overflow-hidden shadow-md"
                            onMouseEnter={() => setIsHover(true)}
                            onMouseLeave={() => setIsHover(false)}
                            initial={{ opacity: 0, x: -100, scale: 0.9 }}
                            whileInView={{ opacity: 1, x: 0, scale: 1 }}
                            transition={{ duration: 1, delay: 1 }}
                        >
                            <motion.div
                                className="absolute left-6 w-3 h-3 bg-[#66CA6A] rounded-full z-0"
                                animate={{
                                    scale: isHover ? 45 : 1,
                                }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                            />
                            <motion.p
                                className="z-10 w-full text-center py-2 font-semibold text-lg"
                                animate={{ color: isHover ? "#fff" : "#166534" }}
                            >
                                Get Started
                            </motion.p>
                            <motion.div
                                className="absolute right-6 z-10"
                                animate={{ x: isHover ? 0 : 12 }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </motion.div>
                        </motion.div>
                    </Link>

                    <motion.p
                        className="text-sm md:text-base mt-6 text-gray-600"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 1.3 }}
                    >
                        Signup & get started today.
                    </motion.p>
                </div>

                {/* Right - Image */}
                <div className="flex justify-end items-center ">
                    <motion.img
                        src={right}
                        alt="Healthy Living"
                        className="w-[300px] md:w-[500px] lg:w-[600px] object-contain "
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1, y: [0, -10, 0] }}
                        transition={{
                            y: {
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "mirror",
                                ease: "easeInOut"
                            },
                            scale: { duration: 1 },
                            opacity: { duration: 1.5 }
                        }}
                    />
                </div>
            </section>
        </div>
    );
};

export default Hero;
