import React from 'react'
import { motion } from 'framer-motion'

const about = () => {
    return (
        <div className='max-w-[1400px] mx-auto min-h-screen p-4 md:p-4 lg:p-6 border'>
            <section id='about' className="h-fullflex flex-col justify-center items-center p-6 md:p-7 lg:p-12 mt-20 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 100 }} // Start hidden and below
                    whileInView={{ opacity: 1, y: 0 }} // Move up smoothly when in view
                    viewport={{ once: true, amount: 0.2 }} // Only triggers once, when 30% in view
                    transition={{ duration: 1, ease: "easeOut" }} // Smooth transition
                >
                    <h1 className='text-lg md:text-xl lg:text-2xl mb-8 md:mb-10 lg:mb-12'>About us</h1>
                    <p className='text-sm md:text-lg lg:text-xl md:mb-6 leading-relaxed tracking-wide'>
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
                    </p>
                </motion.div>

            </section>
        </div>
    )
}

export default about