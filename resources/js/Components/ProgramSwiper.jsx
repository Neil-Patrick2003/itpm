import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/pagination';

const ProgramSwiper = ({ programs }) => {
    const swiperRef = useRef();
    const imageUrl = '/storage/';

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-green-100 to-white flex flex-col items-center px-4 sm:px-6 py-10">
            {/* Header */}
            <div className="max-w-3xl text-center mb-10">
                <h1 className=" text-md md:text-lg lg:xl font-bold  mb-2">
                    Programs Available
                </h1>
                <p className="text-gray-600">
                    We have a variety of programs available to help you achieve your goals. Please select a program to view details.
                </p>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between w-full max-w-6xl mb-6 px-2">
                <button
                    onClick={() => swiperRef.current?.slidePrev()}
                    className="px-4 py-2 text-sm sm:text-base bg-white shadow hover:bg-gray-100 rounded-lg transition"
                >
                    ← Back
                </button>
                <button
                    onClick={() => swiperRef.current?.slideNext()}
                    className="px-4 py-2 text-sm sm:text-base bg-white shadow hover:bg-gray-100 rounded-lg transition"
                >
                    Next →
                </button>
            </div>

            {/* Swiper Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-6xl"
            >
                <Swiper
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    spaceBetween={20}
                    breakpoints={{
                        0: { slidesPerView: 1, centeredSlides: true },
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    pagination={{ clickable: true }}
                    modules={[Pagination]}
                >
                    {programs.map((program, index) => (
                        <SwiperSlide key={index}>
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                                className="bg-white shadow-xl rounded-2xl overflow-hidden flex flex-col h-full"
                            >
                                <img
                                    src={`${imageUrl}${program.program_background_url}`}
                                    alt={program.title}
                                    className="w-full h-52 object-cover"
                                />
                                <div className="p-4 sm:p-6 flex-1 flex flex-col space-y-2">
                                    <h3 className="text-lg sm:text-2xl font-semibold text-gray-800">
                                        {program.title}
                                    </h3>

                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="text-xs sm:text-sm bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                                            Goal: {program.goal_type}
                                        </span>
                                        <span className="text-xs sm:text-sm bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                                            Duration: {program.duration ?? 'Flexible'}
                                        </span>
                                    </div>

                                    <p className="text-sm text-gray-600 mt-2 flex-1">
                                        {program.description}
                                    </p>

                                    <div className="mt-4">
                                        <button className="text-sm text-white bg-green-500 px-4 py-2 rounded hover:bg-green-600 transition">
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </motion.div>

            {/* Tag-style Footer */}
            <div className="mt-10 text-center w-full max-w-4xl px-4">
                <p className="text-sm text-gray-500 mb-3">Browse All Programs</p>
                <div className="flex flex-wrap justify-center gap-2">
                    {programs.map((program, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ scale: 1.05 }}
                            className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full hover:bg-gray-200 transition"
                        >
                            {program.title}
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProgramSwiper;
