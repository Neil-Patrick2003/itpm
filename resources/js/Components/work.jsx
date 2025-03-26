import React from "react";
import { motion } from "framer-motion";
import one from "../../assets/image/one.png";
import two from "../../assets/image/two.png";
import three from "../../assets/image/three.png";
import four from "../../assets/image/four.png";

const Work = () => {
    return (
        <div className="max-w-[1400px] mx-auto p-4 md:p-6 lg:p-8">
            <section id="works" className="min-h-screen flex flex-col justify-center items-center text-center">
                <h2 className="text-lg md:text-xl lg:text-2xl my-6 md:mt-16 lg:mt-18">
                    How <span className="text-red-500 text-xl md:text-3xl lg:text-4xl">Nutrisafari</span> Works
                </h2>

                <div className="grid text-justify grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl px-4">

                    {/* Box 1 (From Left) */}
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true, amount: 0.2 }}
                        className="group flex flex-col drop-shadow-md text-gray-600 md:flex-row border rounded-lg w-full h-auto p-6 items-center 
                        bg-gradient-to-r from-white to-white transition-all duration-500 
                        hover:from-green-100 hover:to-green-200 hover:text-green-800 hover:shadow-lg transform hover:scale-105"
                    >
                        <div className="w-full flex justify-center items-center md:w-1/3">
                            <img className="w-full max-w-[240px] object-cover mx-auto" src={one} alt="Healthy Living" />
                        </div>
                        <div className="w-full md:w-2/3 mt-4 md:mt-0 p-4">
                            <h3 className="text-xl font-semibold group-hover:text-green-600">Find a diet you love</h3>
                            <p className="text-sm md:text-base group-hover:text-white">
                                Find a nutritious diet that fits your lifestyle and food preferences.
                            </p>
                        </div>
                    </motion.div>

                    {/* Box 2 (From Right) */}
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true, amount: 0.2 }}
                        className="group flex flex-col drop-shadow-md text-gray-600 md:flex-row border rounded-lg w-full h-auto p-6 items-center 
                        bg-gradient-to-r from-white to-white transition-all duration-500 
                        hover:from-green-100 hover:to-green-200 hover:text-green-800 hover:shadow-lg transform hover:scale-105"
                    >
                        <div className="w-full flex justify-center items-center md:w-1/3">
                            <img className="w-full max-w-[240px] object-cover mx-auto" src={two} alt="Healthy Living" />
                        </div>
                        <div className="w-full md:w-2/3 mt-4 md:mt-0 p-4">
                            <h3 className="text-xl font-semibold group-hover:text-green-600">Track your meals</h3>
                            <p className="text-sm md:text-base group-hover:text-white">
                                Keep track of your food intake and monitor your nutrition.
                            </p>
                        </div>
                    </motion.div>

                    {/* Box 3 (From Left) */}
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8,  }}
                        viewport={{ once: true, amount: 0.3 }}
                        className="group flex flex-col drop-shadow-md text-gray-600 md:flex-row border rounded-lg w-full h-auto p-6 items-center 
                        bg-gradient-to-r from-white to-white transition-all duration-500 
                        hover:from-green-100 hover:to-green-200 hover:text-green-800 hover:shadow-lg transform hover:scale-105"
                    >
                        <div className="w-full flex justify-center items-center md:w-1/3">
                            <img className="w-full max-w-[240px] object-cover mx-auto" src={three} alt="Healthy Living" />
                        </div>
                        <div className="w-full md:w-2/3 mt-4 md:mt-0 p-4">
                            <h3 className="text-xl font-semibold group-hover:text-green-600">Get personalized guidance</h3>
                            <p className="text-sm md:text-base group-hover:text-white">
                                Receive recommendations based on your diet preferences.
                            </p>
                        </div>
                    </motion.div>

                    {/* Box 4 (From Right) */}
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, }}
                        viewport={{ once: true, amount: 0.3 }}
                        className="group flex flex-col drop-shadow-md text-gray-600 md:flex-row border rounded-lg w-full h-auto p-6 items-center 
                        bg-gradient-to-r from-white to-white transition-all duration-500 
                        hover:from-green-100 hover:to-green-200 hover:text-green-800 hover:shadow-lg transform hover:scale-105"
                    >
                        <div className="w-full flex justify-center items-center md:w-1/3">
                            <img className="w-full max-w-[240px] object-cover mx-auto" src={four} alt="Healthy Living" />
                        </div>
                        <div className="w-full md:w-2/3 mt-4 md:mt-0 p-4">
                            <h3 className="text-xl font-semibold group-hover:text-green-600">Achieve your goals</h3>
                            <p className="text-sm md:text-base group-hover:text-white">
                                Stay motivated and achieve a healthier lifestyle.
                            </p>
                        </div>
                    </motion.div>

                </div>
            </section>
        </div>
    );
};

export default Work;
