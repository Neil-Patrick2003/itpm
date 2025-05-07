import React from 'react';
import { motion } from 'framer-motion';
import Marquee from "react-fast-marquee";

const Sponsorship = () => {
    const sponsors = [
        'TechNova Inc.',
        'GreenFuel Solutions',
        'CodeWave',
        'ByteBuilds',
        'CyberNet Corp.',
        'Digital Spark',
        'EcoLogic Systems',
        'Nexus Labs'
    ];

    return (
        <section id='sponsor' className="min-h-screen w-full  flex items-center justify-center">
            <motion.div
                className="w-full  max-w-[1400px] bg-white rounded-2xl shadow-xl border border-green-200 p-8 md:p-12"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
            >
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-green-800">
                        🌱 Our Sponsors
                    </h2>
                    <p className="mt-3 text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
                        Huge thanks to our partners who make our journey possible.
                    </p>
                </div>

                <div className="bg-[#E6F4EA] border border-green-200 rounded-xl p-6 mb-10 text-center shadow-sm">
                    <h3 className="text-xl md:text-2xl font-semibold text-green-700 mb-2">What We've Achieved Together</h3>
                    <p className="text-gray-700 text-sm md:text-base max-w-3xl mx-auto">
                        Thanks to the support of our amazing sponsors, we've successfully hosted 5 tech bootcamps,
                        empowered over 1,000 students through hands-on coding sessions, launched community clean-up
                        drives, and helped build sustainable tech solutions for local businesses. Your partnership
                        fuels change.
                    </p>
                </div>

                <Marquee pauseOnHover speed={50} gradient={true} gradientColor={[239, 255, 244]}>
                    <div className="flex items-center gap-10">
                        {sponsors.map((sponsor, index) => (
                            <motion.div
                                key={index}
                                className="bg-[#E6F4EA] px-8 py-4 rounded-xl shadow-md border border-green-300 text-green-900 font-medium whitespace-nowrap hover:bg-green-200 transition"
                                whileHover={{ scale: 1.05 }}
                            >
                                {sponsor}
                            </motion.div>
                        ))}
                    </div>
                </Marquee>

                <div className="text-center mt-12">
                    <p className="text-sm text-gray-500">
                        Want your logo here?{' '}
                        <a href="#" className="text-green-700 font-semibold underline">
                            Become a Sponsor
                        </a>
                    </p>
                </div>
            </motion.div>
            <div >

            </div>
        </section>
    );
};

export default Sponsorship;
