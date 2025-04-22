import React from 'react';
import { motion } from 'framer-motion';
import InputLabel from "@/Components/InputLabel.jsx";
import { MdEmail, MdPhone, MdPerson, MdMessage } from "react-icons/md";

const fadeInVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: 'easeOut', delay },
    }),
};

const Contact = () => {
    return (
        <div className="relative min-h-screen bg-white flex items-center justify-center px-6 sm:px-10 md:px-16 py-20">
            {/* Decorative Background */}
            <div className="absolute top-0 left-0 w-full h-2/5 bg-[#E6F4EA] z-0 rounded-b-3xl" />

            <section id="contact" className="relative z-10 max-w-[1400px] w-full">
                {/* Header */}
                <motion.div
                    className="text-center my-12 md:mt-24"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeInVariant}
                    custom={0}
                >
                    <h1 className="text-2xl md:text-4xl font-semibold text-[#66CA6A] mb-4">
                        Get in Touch with Us
                    </h1>
                    <p className="text-base md:text-lg text-gray-700 leading-relaxed italic max-w-3xl mx-auto">
                        "Every child deserves a chance to grow, learn, and thrive. Through your sponsorship, we bring hope and opportunity to children in need. Reach out and become part of a child’s journey today."
                    </p>
                </motion.div>

                {/* Contact Form */}
                <motion.div
                    className="bg-white rounded-2xl shadow-lg p-6 sm:p-10 lg:p-24 flex flex-col gap-10"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeInVariant}
                    custom={0.2}
                >
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-6">
                            {/* Name */}
                            <motion.div variants={fadeInVariant} custom={0.3}>
                                <InputLabel htmlFor="name" value="Name" />
                                <div className="relative">
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        required
                                        placeholder="Your full name"
                                        className="w-full py-2 pl-3 pr-10 text-[#4E9E4E] bg-transparent border-b-2 border-gray-300 placeholder-gray-400 focus:border-[#67c4c1] focus:outline-none"
                                    />
                                    <MdPerson className="absolute right-2 top-1/2 -translate-y-1/2 text-[#66CA6A] w-5 h-5" />
                                </div>
                            </motion.div>

                            {/* Email */}
                            <motion.div variants={fadeInVariant} custom={0.4}>
                                <InputLabel htmlFor="email" value="Email" />
                                <div className="relative">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        placeholder="you@example.com"
                                        className="w-full py-2 pl-3 pr-10 text-[#67c4c1] bg-transparent border-b-2 border-gray-300 placeholder-gray-400 focus:border-[#67c4c1] focus:outline-none"
                                    />
                                    <MdEmail className="absolute right-2 top-1/2 -translate-y-1/2 text-[#66CA6A] w-5 h-5" />
                                </div>
                            </motion.div>

                            {/* Phone */}
                            <motion.div variants={fadeInVariant} custom={0.5}>
                                <InputLabel htmlFor="phone" value="Phone" />
                                <div className="relative">
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        required
                                        placeholder="+63..."
                                        className="w-full py-2 pl-3 pr-10 text-[#67c4c1] bg-transparent border-b-2 border-gray-300 placeholder-gray-400 focus:border-[#67c4c1] focus:outline-none"
                                    />
                                    <MdPhone className="absolute right-2 top-1/2 -translate-y-1/2 text-[#66CA6A] w-5 h-5" />
                                </div>
                            </motion.div>
                        </div>

                        <motion.div className="flex flex-col " variants={fadeInVariant} custom={0.6}>
                            <InputLabel htmlFor="message" value="Message" />
                            <div className="relative">
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    placeholder="Write your message here..."
                                    className="w-full h-[232px] py-2 pl-3 pr-10 text-[#66CA6A] bg-transparent border-b-2 border-gray-300 placeholder-gray-400 focus:border-[#67c4c1] focus:outline-none resize-none"
                                />
                                <MdMessage className="absolute right-2 top-4 text-[#66CA6A] w-5 h-5" />
                            </div>
                        </motion.div>

                        {/* Submit Button */}
                        <motion.div className="col-span-2 flex justify-end" variants={fadeInVariant} custom={0.7}>
                            <button
                                type="submit"
                                className="w-1/2 max-w-xs bg-[#67c4c1] hover:bg-[#A7E3E1] transition text-white font-medium py-3 rounded-full"
                            >
                                Send
                            </button>
                        </motion.div>
                    </form>
                </motion.div>
            </section>
        </div>
    );
};

export default Contact;
