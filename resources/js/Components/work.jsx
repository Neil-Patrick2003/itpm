import React from "react";
import { motion } from "framer-motion";
import one from "../../assets/image/one.png";
import two from "../../assets/image/two.png";
import three from "../../assets/image/three.png";
import four from "../../assets/image/four.png";

const cardData = [
    {
        img: one,
        title: "Find a diet you love",
        desc: "Find a nutritious diet that fits your lifestyle and food preferences.",
    },
    {
        img: two,
        title: "Track your meals",
        desc: "Keep track of your food intake and monitor your nutrition.",
    },
    {
        img: three,
        title: "Get personalized guidance",
        desc: "Receive recommendations based on your diet preferences.",
    },
    {
        img: four,
        title: "Achieve your goals",
        desc: "Stay motivated and achieve a healthier lifestyle.",
    },
];

const Work = () => {
    return (
        <div className="max-w-[1400px] mx-auto px-4 py-10 md:py-16">
            <section id="works" className="text-center">
                <h2 className="text-lg md:text-xl lg:text-2xl font-semibold my-6">
                    How <span className="text-[#66CA6A] text-xl md:text-3xl lg:text-4xl font-bold">Nutrisafari</span> Works
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                    {cardData.map((card, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.6,
                                delay: index * 0.2,
                                ease: "easeOut",
                            }}
                            viewport={{ once: true }}
                            className="group bg-white border rounded-xl shadow-md hover:shadow-xl p-6 transition transform hover:scale-[1.03] flex flex-col md:flex-row items-center"
                        >
                            <div className="w-full md:w-1/3 flex justify-center">
                                <img
                                    src={card.img}
                                    alt={card.title}
                                    className="w-full max-w-[180px] object-contain"
                                />
                            </div>
                            <div className="mt-4 md:mt-0 md:ml-6 text-left">
                                <h3 className="text-lg md:text-xl font-semibold text-[#1C3B2C] group-hover:text-[#66CA6A]">
                                    {card.title}
                                </h3>
                                <p className="text-sm md:text-base text-gray-600 mt-2 group-hover:text-gray-700">
                                    {card.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Work;
