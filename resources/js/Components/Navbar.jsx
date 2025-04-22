import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { Link as ScrollLink } from 'react-scroll';
import { motion } from 'framer-motion';
import logo from '../../assets/image/logo.png';
import { Link } from '@inertiajs/react';

const Navbar = () => {
    const [nav, setNav] = useState(false);

    const toggleNav = () => setNav(!nav);
    const closeNav = () => setNav(false);

    const menuVariants = {
        open: {
            x: 0,
            transition: {
                type: "tween",
                duration: 0.3,
                ease: "easeOut"
            }
        },
        closed: {
            x: '-100%',
            transition: {
                type: "tween",
                duration: 0.3,
                ease: "easeIn"
            }
        }
    };

    const links = ["home", "sponsor", "about", "works", "contact"];

    return (
        <div className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md z-50 shadow-md">
            <div className="max-w-[1400px] mx-auto flex justify-between items-center h-20 px-4 text-green-900">
                {/* Logo */}
                <div className="flex gap-3 items-center">
                    <img className='w-full max-w-[32px] object-cover' src={logo} alt="Nutrisafari Logo" />
                    <p className="text-lg font-bold">Nutrisafari</p>
                </div>

                {/* Desktop Nav */}
                <ul className="hidden md:flex gap-10 text-green-800 font-medium items-center">
                    {links.map((item) => (
                        <li key={item}>
                            <motion.div className="flex flex-col cursor-pointer" whileHover="hover">
                                <ScrollLink to={item} smooth={true} offset={-70} duration={500}>
                                    {item.charAt(0).toUpperCase() + item.slice(1)}
                                </ScrollLink>
                                <motion.div
                                    className="border-t-4 border-green-800 rounded-xl"
                                    initial={{ width: 0 }}
                                    variants={{ hover: { width: "100%" } }}
                                    transition={{ duration: 0.2 }}
                                />
                            </motion.div>
                        </li>
                    ))}
                    <li>
                        <Link href="/login">
                            <button className="relative border-2 border-green-800 bg-transparent text-sm py-1 px-6 rounded-lg font-medium text-green-800 transition-colors before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:origin-top-left before:scale-x-0 before:bg-green-800 before:transition-transform before:duration-300 before:content-[''] hover:text-white before:hover:scale-x-100">
                                Login
                            </button>
                        </Link>
                    </li>
                </ul>

                {/* Mobile Menu Icon */}
                <div onClick={toggleNav} className="md:hidden z-60 text-green-900">
                    {nav ? <AiOutlineClose size={28} /> : <AiOutlineMenu size={28} />}
                </div>

                {/* Mobile Menu */}
                <motion.div
                    initial={false}
                    animate={nav ? 'open' : 'closed'}
                    variants={menuVariants}
                    className="fixed top-0 left-0 w-[80%] h-screen bg-green-100 z-40 p-8"
                >
                    <ul className="space-y-6 mt-20 text-2xl font-semibold text-green-800">
                        {links.map((item) => (
                            <li key={item}>
                                <ScrollLink
                                    to={item}
                                    smooth={true}
                                    offset={-70}
                                    duration={500}
                                    onClick={closeNav}
                                    className="cursor-pointer"
                                >
                                    {item.charAt(0).toUpperCase() + item.slice(1)}
                                </ScrollLink>
                            </li>
                        ))}
                        <li>
                            <Link href="/login">
                                <button
                                    onClick={closeNav}
                                    className="mt-4 border-2 border-green-800 bg-transparent text-base py-1 px-5 rounded-md font-medium text-green-800 hover:bg-green-800 hover:text-white transition"
                                >
                                    Login
                                </button>
                            </Link>
                        </li>
                    </ul>
                </motion.div>
            </div>
        </div>
    );
};

export default Navbar;
