import React from 'react'
import { motion } from 'framer-motion'
import center from "../../assets/image/center.jpg";

const About = () => {
    return (
        <div className=''>
            <section
                id='about'
                className="h-screen flex flex-col justify-center items-center px-6 md:px-12 lg:px-16 mt-20 text-center relative"
                style={{ backgroundImage: `url(${center})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
                {/* Semi-transparent overlay */}
                <div className="absolute inset-0 bg-black opacity-40"></div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className='p-6 lg:p-12 relative z-10'
                >
                    <motion.h1
                        className='text-white font-bold text-xl md:text-2xl lg:text-4xl mb-6 md:mb-10 lg:mb-12'
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Who are we?
                    </motion.h1>
                    <motion.p
                        className='text-gray-800 bg-white text-sm md:text-lg lg:text-xl leading-relaxed tracking-wide bg-opacity-80 p-6 rounded-xl'
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    >
                        The Tuy Rural Health Center is a dedicated public health facility in Batangas focused on community well-being. Our mission is to uplift the lives of children through nutrition, health education, and supportive programs that empower families.
                        <br /><br />
                        In partnership with local leaders and sponsors, we’re committed to ending child undernutrition — not through pity, but through compassion, unity, and action.
                    </motion.p>
                </motion.div>
            </section>
        </div>
    )
}

export default About
