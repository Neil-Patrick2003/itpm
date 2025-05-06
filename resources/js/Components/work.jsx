import React from "react";
import { motion } from "framer-motion";
import one from "../../assets/image/love.png"; // Update images accordingly
import two from "../../assets/image/bowl.png";
import three from "../../assets/image/checklist.png";
import four from "../../assets/image/helping_hand.png";

const cardData = [
    {
        img: one,
        title: "Contact us, and become a sponsor.",
        desc: "Donate any amount by reaching us out. Your contribution will help provide essential meals and care to children in need.",
    },
    {
        img: two,
        title: "Support Local Nutrition Programs",
        desc: "Your sponsorship directly supports our feeding programs, ensuring children receive the nutrition they need to grow strong and healthy.",
    },
    {
        img: three,
        title: "Track Progress & Stay Updated",
        desc: "Receive regular updates and reports on the children you’re helping. You’ll see the positive impact your sponsorship is having on their health and well-being.",
    },
    {
        img: four,
        title: "Make a Lasting Impact",
        desc: "Your generosity is not just about one meal — it’s about creating a foundation for healthier, brighter futures for children and their communities.",
    },
];

const Work = () => {
    return (
        <div className="max-w-[1400px] mx-auto px-4 py-10 md:py-16">
            <section id="works" className="flex flex-col justify-center items-center text-center sm:h-full md:h-screen">
                <h2 className="text-lg md:text-xl lg:text-2xl font-semibold my-6">
                    How <span className="text-[#66CA6A] text-xl md:text-3xl lg:text-4xl font-bold">Your Sponsorship</span> Works
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
