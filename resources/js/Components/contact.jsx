import React, { useState } from 'react';
import { motion } from 'framer-motion';
import InputLabel from "@/Components/InputLabel.jsx";
import { MdEmail, MdPhone, MdPerson, MdMessage } from "react-icons/md";
import { useForm } from "@inertiajs/react";
import { MdInfo } from "react-icons/md";
import FlashMessage from "@/Components/FlashMessage.jsx";

const fadeInVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: 'easeOut', delay },
    }),
};

const Contact = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        from: '',
        phone: '',
        subject: '',
        message: '',
    });

    function submit(e) {
        e.preventDefault();
        post('/send-message', {
            onFinish: () => reset(),
        });
    }

    return (
        <div className="relative min-h-screen bg-white flex items-center justify-center px-4 sm:px-6 md:px-10 lg:px-16 py-16 sm:py-20">
            <FlashMessage />
            {/* Decorative Background */}
            <div className="absolute top-0 left-0 w-full h-1/3 sm:h-2/5 bg-[#E6F4EA] z-0" />

            <section id="contact" className="relative z-10 max-w-[1400px] w-full">
                {/* Header */}
                <motion.div
                    className="text-center my-10 md:my-20"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeInVariant}
                    custom={0}
                >
                    <h1 className="text-xl sm:text-2xl md:text-4xl font-semibold text-[#66CA6A] mb-4">
                        Get in Touch with Us
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed italic max-w-3xl mx-auto px-2">
                        "Every child deserves a chance to grow, learn, and thrive. Through your sponsorship, we bring hope and opportunity to children in need. Reach out and become part of a child’s journey today."
                    </p>
                </motion.div>

                {/* Contact Form */}
                <motion.div
                    className="bg-white rounded-2xl shadow-lg p-5 sm:p-8 md:p-12 lg:p-20 flex flex-col gap-10"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeInVariant}
                    custom={0.2}
                >
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={submit}>
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
                                        onChange={e => (data.name = e.target.value)}
                                        placeholder="Your full name"
                                        className="w-full mt-1 py-2 px-3 bg-gray-200 text-gray-700 border-0 border-b-2 border-b-gray-300 focus:border-b-[#66CA6A] focus:outline-none focus:ring-0"
                                    />
                                    <MdPerson className="absolute right-2 top-1/2 -translate-y-1/2 text-[#66CA6A] w-5 h-5" />
                                </div>
                            </motion.div>

                            {/* Email */}
                            <motion.div variants={fadeInVariant} custom={0.4}>
                                <InputLabel htmlFor="from" value="Email" />
                                <div className="relative">
                                    <input
                                        id="from"
                                        name="from"
                                        type="email"
                                        required
                                        onChange={e => (data.from = e.target.value)}
                                        placeholder="you@example.com"
                                        className="w-full mt-1 py-2 px-3 bg-gray-200 text-gray-700 border-0 border-b-2 border-b-gray-300 focus:border-b-[#66CA6A] focus:outline-none focus:ring-0"
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
                                        type="text"
                                        onChange={e => (data.phone = e.target.value)}
                                        required
                                        placeholder="+63..."
                                        className="w-full mt-1 py-2 px-3 bg-gray-200 text-gray-700 border-0 border-b-2 border-b-gray-300 focus:border-b-[#66CA6A] focus:outline-none focus:ring-0"
                                    />
                                    <MdPhone className="absolute right-2 top-1/2 -translate-y-1/2 text-[#66CA6A] w-5 h-5" />
                                </div>
                            </motion.div>
                        </div>

                        {/* Message */}
                        <motion.div className="flex flex-col gap-3" variants={fadeInVariant} custom={0.6}>
                            <motion.div variants={fadeInVariant} custom={0.5} className="">
                                <InputLabel htmlFor="subject" value="Subject" />
                                <div className="relative">
                                    <input
                                        id="subject"
                                        name="subject"
                                        type="text"
                                        onChange={e => (data.subject = e.target.value)}
                                        required
                                        placeholder="Sponsorship, Donation, etc."
                                        className="w-full mt-1 py-2 px-3 bg-gray-200 text-gray-700 border-0 border-b-2 border-b-gray-300 focus:border-b-[#66CA6A] focus:outline-none focus:ring-0"
                                    />
                                    <MdInfo className="absolute right-2 top-1/2 -translate-y-1/2 text-[#66CA6A] w-5 h-5" />
                                </div>
                            </motion.div>
                            <InputLabel htmlFor="message" value="Message" />
                            <div className="relative">
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    onChange={e => (data.message = e.target.value)}
                                    rows="5"
                                    autoComplete="message"
                                    autoCorrect="off"
                                    autoCapitalize="off"
                                    spellCheck="false"
                                    placeholder="Write your message here..."
                                    className="w-full sm:h-[200px] md:h-[165px] bg-gray-200 text-gray-700 border-0 border-b-2 border-b-gray-300 focus:border-b-[#66CA6A] focus:outline-none focus:ring-0"
                                />
                                <MdMessage className="absolute right-2 top-4 text-[#66CA6A] w-5 h-5" />
                            </div>
                        </motion.div>

                        {/* Submit Button */}
                        <motion.div
                            className="col-span-1 md:col-span-2 flex justify-center md:justify-end mt-4"
                            variants={fadeInVariant}
                            custom={0.7}
                        >
                            <button
                                type="submit"
                                disabled={processing}  // Use 'processing' from Inertia.js for the loading state
                                className={`w-full sm:w-1/2 md:max-w-xs ${processing ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#66CA6A] hover:bg-green-400'} transition text-white font-medium py-3 rounded-md`}
                            >
                                {processing ? (
                                    <div className="flex justify-center items-center">
                                        <div className="w-5 h-5 border-4 border-t-transparent border-green-400 border-solid rounded-full animate-spin"></div>
                                    </div>
                                ) : (
                                    'Send'
                                )}
                            </button>
                        </motion.div>
                    </form>
                </motion.div>
            </section>
        </div>
    );
};

export default Contact;
