import React, { useState } from 'react';
import right from '../../assets/image/right.png';
import { delay, motion } from 'framer-motion'
import { Link } from '@inertiajs/react';


const Hero = () => {
    const [isHover, setIsHover] = useState(false);

    return (
        <div className='bg-green-200'>
            <section id='home' className="mt-12 md:mt-12 lg:mt-0 grid w-full grid-cols-1 gap-4 md:grid-cols-2 h-screen">
                <div className="max-w-[1400px] mx-auto p-4 md:p-4 lg:p-6 flex flex-col justify-center h-full gap-1 md:gap-4">
                    <motion.h1
                        initial={{ opacity: 0, x: -100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className='text-red-600 text-6xl md:text-7xl lg:text-8xl font-bold'
                    >
                        Healthy <span className='text-black text-2xl md:text-3xl lg:text-4xl'>Living </span>
                        <p className='text-black text-2xl md:mt-4 md:text-3xl lg:text-4xl'>made easy!!!</p>
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.8 }}
                    >
                        <p className='text-sm md:text-lg lg:text-xl mb-4 md:mb-6'>
                            Get your custom plan & one-on-one guidance from our experts.
                        </p>
                    </motion.div>

                    <Link href='login'>
                        
                        <motion.div className="inter flex w-1/2  md:w-full drop-shadow-md   "
                            initial={{ opacity: 0, x: -100, scale: 0.9 }}
                            whileInView={{ opacity: 1, x: 0, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 1.5 }}
                        >
                            <div
                                className="flex justify-center items-center bg-white py-2 rounded-lg relative overflow-hidden w-full sm:w-1/2 md:w-1/3"
                                onMouseEnter={() => setIsHover(true)}
                                onMouseLeave={() => setIsHover(false)}
                            >
                                {/* Expanding Circle */}
                                <motion.div
                                    className="w-[8px] h-[8px] bg-green-800 rounded-full absolute left-6"
                                    animate={{
                                        scale: isHover ? 45 : 1,
                                    }}
                                    transition={{
                                        ease: "easeIn",
                                        duration: 0.2,
                                    }}
                                ></motion.div>

                                {/* Button Text */}
                                <motion.div
                                    className="text-lg font-bold text-center z-10"
                                    animate={{
                                        x: isHover ? -8 : 8,
                                        color: isHover ? "#FFFFFF" : "#166534",
                                    }}
                                >
                                    <p>Get Started</p>
                                </motion.div>

                                {/* Arrow Icon */}
                                <motion.div
                                    className="absolute flex items-center right-4 md:right-6"
                                    animate={{
                                        x: isHover ? 0 : 12,
                                    }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="white"
                                        className="size-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                                        />
                                    </svg>
                                </motion.div>
                            </div>
                        </motion.div>

                    </Link>

                    <motion.div
                        initial={{ opacity: 0, x: -100, scale: 0.9 }}
                        whileInView={{ opacity: 1, x: 0, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 1.8 }}
                        whileHover={{ scale: 1.05, rotateX: 10, boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)" }}
                        className='text-sm md:text-md lg:text-lg'
                    >
                        Signup & get started today
                    </motion.div>

                </div>
                <div className="flex justify-end items-center ">
                    <motion.img
                        src={right}
                        className="w-[400px] md:w-[600px]"
                        initial={{ scale: 0.8 }}
                        animate={{
                            scale: 1,
                            y: [0, -10, 0]
                        }}
                        transition={{
                            scale: { duration: 1, ease: "easeOut" },
                            y: { duration: 1.5, repeat: Infinity, repeatType: "mirror", ease: "linear" }
                        }}
                    />
                </div>
            </section></div>
    )
}

export default Hero