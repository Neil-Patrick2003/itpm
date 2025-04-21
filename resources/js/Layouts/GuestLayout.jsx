import { Link } from '@inertiajs/react';
import logo from '../../assets/image/logo.png';
import { motion } from 'framer-motion';

export default function GuestLayout({ children }) {
    return (
        <div className="h-screen overflow-hidden flex flex-col w-full relative bg-white">

            {/* Pulse Animation in Square Rectangle at the Bottom */}
            <div className="absolute bottom-[-150px] left-[-200px] transform rotate-45">
                <div className="h-[1050px] w-[1050px] bg-[#A7E3E1] rounded-[120px]">
                    <motion.div
                        className="absolute w-full h-full border border-blue-400 rounded-[120px] z-10"
                        initial={{ scale: 0, opacity: 1 }}
                        animate={{
                            scale: [1, 1.5, ], // Expanding pulse from 0 to 3 times size
                            opacity: [1, 0.5, 0, ], // Fade out progressively as it scales
                        }}
                        transition={{
                            duration: 2, // Pulse duration
                            repeat: Infinity, // Infinite loop of animation
                            repeatType: 'loop', // Loop the pulse animation
                            ease: 'easeIn', // Smooth easing
                        }}
                    />
                </div>
            </div>
            <div className="absolute bottom-[-150px] left-[-400px] border transform rotate-45 h-[1050px] w-[1050px] bg-[#67c4c1] rounded-[120px]" />



            {/* Left Side Content */}
            <div className="relative flex justify-end h-full items-center p-4 md:pr-24 z-10">
                <div className="max-w-[600px] w-full p-8 bg-white space-y-8">
                    <div>{children}</div>
                </div>
            </div>
        </div>
    );
}
