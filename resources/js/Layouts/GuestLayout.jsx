import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import logo from '../../assets/image/logo.png';

export default function GuestLayout({ children }) {
    return (
        <div className="h-screen overflow-hidden flex flex-col w-full relative bg-white">
            {/* Background Orbits */}
            <div className="absolute bottom-[-150px] left-[-200px] transform rotate-45 z-0 hidden lg:block">
                <div className="h-[1050px] w-[1050px] rounded-[120px] bg-green-300">
                    <motion.div
                        className="absolute w-full h-full border border-[#66CA6A] rounded-[120px] z-10"
                        initial={{ scale: 0, opacity: 1 }}
                        animate={{
                            scale: [1, 1.5],
                            opacity: [1, 0.5, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatType: 'loop',
                            ease: 'easeIn',
                        }}
                    />
                </div>
            </div>

            <div className="absolute bottom-[-150px] left-[-400px] transform rotate-45 h-[1050px] w-[1050px] bg-[#66CA6A] rounded-[120px] z-0 hidden lg:block" />

            {/* Form Area */}
            <div className="relative z-20 flex items-center justify-center lg:justify-end h-full p-4 md:pr-24">
                <div className="w-full max-w-md md:max-w-xl lg:max-w-[600px] p-4 md:p-8 bg-white md:bg-white/30 md:backdrop-blur-sm h-full md:h-auto overflow-y-auto scrollbar-hide rounded-none">
                    {children}
                </div>
            </div>
        </div>
    );
}
