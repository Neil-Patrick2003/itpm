import { Link } from '@inertiajs/react';
import logo from '../../assets/image/logo.png';
import { motion } from 'framer-motion';

export default function GuestLayout({ children }) {
    return (
        <div className="h-screen overflow-hidden flex flex-col w-full relative bg-white">
            {/* Background Orbits */}
            <div className="absolute bottom-[-150px] left-[-200px] transform rotate-45 z-0">
                <div className="h-[1050px] w-[1050px]  rounded-[120px]" style={{ backgroundColor: 'FF66CA6A' }}  >
                    <motion.div
                        className="absolute w-full h-full border border-blue-400 rounded-[120px] z-10"
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
            <div className="absolute bottom-[-150px] left-[-400px] transform rotate-45 h-[1050px] w-[1050px] bg-[#67c4c1] rounded-[120px] z-0" />

            {/* Form Area */}
            <div className="relative z-20 flex justify-end h-full items-center p-4 md:pr-24">
                <div className="max-w-[600px] w-full p-8 pt-12  bg-white md:bg-white/30 md:backdrop-blur-sm space-y-8 h-full overflow-y-auto scrollbar-hide rounded-lg">
                    {/* Scrollable Children */}
                    <div className="h-full">{children}</div>
                </div>
            </div>
        </div>
    );
}

