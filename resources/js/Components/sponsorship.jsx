import React from 'react'
import { color, motion } from 'framer-motion'


const sponsorship = () => {
    return (
        <div className='max-w-[1400px] mx-auto p-4 md:p-4 lg:p-6'>
            <section id='sponsor' className="h-screen w-full flex p-4 items-center">

                <motion.div className='flex justify-center w-full h-3/4 p-2 md:mt-8 md:p-4 lg:p-6 border drop-shadow-lg rounded-l-2xl bg-green-400'
                    initial={{ opacity: 0, y: 100 }} // Start hidden and below
                    whileInView={{ opacity: 1, y: 0 }} // Move up smoothly when in view
                    viewport={{ once: true, amount: 0.2 }} // Only triggers once, when 30% in view
                    transition={{ duration: 1, ease: "easeOut" }} // Smooth transition
                >
                    <div className='border w-full h-full text-center pt-4'>
                        <motion.h1
                            initial={{ opacity: 0, y: 100 }} // Start hidden and below
                            whileInView={{ opacity: 1, y: 0 }} // Move up smoothly when in view
                            viewport={{ once: true, amount: 0.2 }} // Only triggers once, when 30% in view
                            transition={{ duration: 1, ease: "easeOut", delay: 0.5 }} // Smooth transition

                        >

                            <p className='ext-lg md:text-xl lg:text-2xl'>Top Sphahaonsor!!!</p>
                        </motion.h1>
                    </div>




                </motion.div>
            </section>

        </div>

    )
}

export default sponsorship