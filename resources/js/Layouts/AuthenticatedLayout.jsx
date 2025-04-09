import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import Logo from '../../assets/image/new-logo.png';  // Default logo
import Text from '../../assets/image/Text.png';
import {  CalendarIcon, ChartPieIcon, BellAlertIcon, DocumentDuplicateIcon, FolderIcon, HomeIcon, UsersIcon, XMarkIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { Button, Menu, MenuItem, Avatar, Typography } from '@mui/material';
import { Fade } from '@mui/material';



const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    { name: 'Manage User', href: '/users', icon: UsersIcon },
    { name: 'Manage Program', href: '/programs', icon: CalendarIcon },
    { name: 'Children Record', href: '/childrens', icon: FolderIcon },
    { name: 'Sponsorship', href: '/sponsorships', icon: CalendarIcon },
    { name: 'Analytics', href: '/reports', icon: DocumentDuplicateIcon },
    { name: 'Funds & Budget', href: '/funds', icon: ChartPieIcon },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function AuthenticatedLayout({ header, children, logoUrl }) {
    const { auth } = usePage().props;
    const userName = auth?.user?.name;

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const { url } = usePage();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    function logout(e) {
        e.preventDefault();
        post('/logout');
    }

    return (
        <>
            <div className="flex flex-col h-screen">
                {/* Header */}
                <header className="bg-white border shadow-lg">
                    <div className="flex flex-row">
                        <div className="w-80">
                            <div className="flex items-center px-8 py-3 gap-x-4">
                                        {/* Dynamically set the logo image */}
                                        <img
                                            alt="Logo"
                                            src={logoUrl || Logo}  // Default to the Logo if no logoUrl is passed
                                            className="h-8 w-auto"
                                        />
                                        <img alt="Text Logo" src={Text} className="h-8 w-auto" />
                                    </div>
                        </div>
                        <div className="flex w-full justify-between">


                            <div className="flex items-center px-8 py-3 gap-x-4">
                                <div className="flex-1 text-center">
                                <h1 className="text-xl font-semibold">{header || 'Default Page Title'}</h1>
                                </div>
                            </div>

                            <div className="h-12 flex mt-1 pr-8 text-center">
                                <div className="flex items-center px-8 py-3 gap-x-4">

                                    <div className="relative inline-block">
                                        {/* Bell Icon with Border */}
                                        <BellAlertIcon className="h-8 w-8 text-green-600 border border-green-600 rounded-full p-1" />

                                        {/* Notification Indicator */}
                                        {/*{notifications > 0 && (*/}
                                        {/*    <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-semibold text-white bg-red-500 border-2 border-white rounded-full">*/}
                                        {/*      /!*{notifications}*!/*/}
                                        {/*    </span>*/}
                                        {/*)}*/}
                                    </div>

                                </div>

                                <button onClick={handleClick} className="flex pr-4 h-full rounded-full bg-green-50">
                                    <span className="h-full border w-12 rounded-full "></span>
                                    <h1 className="pt-[10px] ml-2 text-green-600">{userName}</h1>
                                </button>

                                <Menu
                                    id="fade-menu"
                                    MenuListProps={{
                                        'aria-labelledby': 'fade-button',
                                    }}
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    TransitionComponent={Fade}
                                >
                                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                                    <MenuItem onClick={handleClose}>My account</MenuItem>
                                    <MenuItem onClick={handleClose}><Link href="/logout" method="post" as="button">Logout</Link></MenuItem>
                                </Menu>

                             </div>
                        </div>
                    </div>
                    {/*<div className="flex justify-between items-center p-4">*/}
                    {/*

                    {/*    <div className="flex-1 text-center">*/}
                    {/*        /!* Dynamic Page Title *!/*/}
                    {/*        <h1 className="text-xl font-semibold">{header || 'Default Page Title'}</h1>*/}
                    {/*    </div>*/}

                    {/*    <div className="flex items-center gap-x-4">*/}
                    {/*        /!* User Profile Dropdown *!/*/}
                    {/*        <button*/}
                    {/*            onClick={toggleMenu}*/}
                    {/*            className="flex items-center gap-x-2 px-4 py-2 bg-green-700 text-white rounded-full"*/}
                    {/*        >*/}
                    {/*            <img alt="Icon" className="h-5 w-5" />*/}
                    {/*            {isOpen ? (*/}
                    {/*                <ChevronUpIcon className="h-5 w-5" />*/}
                    {/*            ) : (*/}
                    {/*                <ChevronDownIcon className="h-5 w-5" />*/}
                    {/*            )}*/}
                    {/*            <span>{userName}</span>*/}
                    {/*        </button>*/}

                    {/*        {isOpen && (*/}
                    {/*            <ul className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg">*/}
                    {/*                <li className="px-6 py-2 cursor-pointer hover:bg-gray-100">*/}
                    {/*                    <Link href="/logout" method="post" as="button">Logout</Link>*/}
                    {/*                </li>*/}
                    {/*            </ul>*/}
                    {/*        )}*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </header>

                <div className="flex flex-1 overflow-hidden">
                    {/* Sidebar for large screens */}
                    <div className="hidden lg:flex lg:flex-col lg:w-72 lg:bg-white p-4">
                        <div className="flex flex-col gap-y-5">
                            <nav className="flex-1">
                                <ul className="space-y-4">
                                    {navigation.map((item) => (
                                        <li key={item.name}>
                                            <Link
                                                href={item.href}
                                                className={classNames(
                                                    url === item.href ? 'bg-[#01DA9F] text-white' : 'text-gray-400 hover:bg-[#01DA9F] hover:text-white',
                                                    'group flex items-center gap-x-3 rounded-full text-xl px-6 py-2 text-sm font-semibold'
                                                )}
                                            >
                                                <item.icon className="h-6 w-6" />
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    </div>

                    {/* Mobile Sidebar (Dialog) */}
                    <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
                        <DialogBackdrop className="fixed inset-0 bg-gray-900/80" />
                        <div className="fixed inset-0 flex">
                            <DialogPanel className="w-72 bg-white flex flex-col gap-y-5 p-4">
                                <div className="flex justify-between items-center">
                                    <button type="button" onClick={() => setSidebarOpen(false)} className="text-gray-500">
                                        <XMarkIcon className="h-6 w-6" />
                                    </button>
                                </div>
                                <nav>
                                    <ul className="space-y-4">
                                        {navigation.map((item) => (
                                            <li key={item.name}>
                                                <Link
                                                    href={item.href}
                                                    className={classNames(
                                                        url === item.href ? 'bg-[#74CB60] text-gray-400' : 'text-gray-800 hover:bg-[#01DA9F] hover:text-white',
                                                        'group flex items-center gap-x-3 rounded-lg px-6 py-2 text-sm font-semibold'
                                                    )}
                                                >
                                                    <item.icon className="h-6 w-6" />
                                                    {item.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                            </DialogPanel>
                        </div>
                    </Dialog>

                    {/* Main Content */}
                    <main className="flex-1 overflow-y-auto p-6 bg-[#F6FBF8]">
                        {children}
                    </main>
                </div>
            </div>
        </>
    );
}
