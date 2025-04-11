import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import Logo from '../../assets/image/new-logo.png';
import Text from '../../assets/image/Text.png';
import {
    CalendarIcon,
    ChartPieIcon,
    BellAlertIcon,
    DocumentDuplicateIcon,
    FolderIcon,
    HomeIcon,
    UsersIcon,
    XMarkIcon,
    Bars3Icon,
    ChevronDownIcon,
    ChevronUpIcon
} from '@heroicons/react/24/outline';
import { Menu, MenuItem, Fade } from '@mui/material';
import FlashMessage from "@/Components/FlashMessage.jsx";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function AuthenticatedLayout({ header, children, logoUrl }) {
    const { auth } = usePage().props;
    const userName = auth?.user?.name;

    const [anchorEl, setAnchorEl] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isChildrenMenuOpen, setIsChildrenMenuOpen] = useState(false); // NEW: toggle submenu

    const open = Boolean(anchorEl);
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const { url } = usePage();

    const navigation = [
        { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
        { name: 'Manage User', href: '/users', icon: UsersIcon },
        { name: 'Manage Program', href: '/programs', icon: CalendarIcon },
        { name: 'Sponsorship', href: '/sponsorships', icon: CalendarIcon },
        { name: 'Analytics', href: '/reports', icon: DocumentDuplicateIcon },
        { name: 'Funds & Budget', href: '/funds', icon: ChartPieIcon },
    ];

    return (
        <div className="flex flex-col h-screen">
            {/* Header */}
            <header className="bg-white border shadow-lg">
                <div className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-x-4">
                        {/* Mobile menu button */}
                        <button
                            className="lg:hidden text-gray-500"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <Bars3Icon className="h-6 w-6" />
                        </button>
                        <img src={logoUrl || Logo} alt="Logo" className="h-8 w-auto" />
                        <img src={Text} alt="Text Logo" className="h-8 w-auto" />
                    </div>

                    <h1 className="hidden md:block text-xl font-semibold">{header || 'Default Page Title'}</h1>

                    <div className="flex items-center gap-x-4">
                        <BellAlertIcon className="h-8 w-8 text-green-600 border border-green-600 rounded-full p-1" />
                        <button onClick={handleClick} className="flex items-center bg-green-50 px-4 py-1 rounded-full">
                            <span className="h-10 w-10 rounded-full bg-gray-300"></span>
                            <span className="ml-2 hidden md:block text-green-600">{userName}</span>
                        </button>
                        <Menu
                            id="fade-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            TransitionComponent={Fade}
                        >
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleClose}><Link href="/logout" method="post" as="button">Logout</Link></MenuItem>
                        </Menu>
                    </div>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <aside className="hidden lg:flex lg:flex-col lg:w-72 bg-white p-4 border-r">
                    <nav className="flex-1 space-y-4">
                        {navigation.map(item => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={classNames(
                                    url?.startsWith(item.href) ? 'bg-[#01DA9F] text-white' : 'text-gray-700 hover:bg-[#01DA9F] hover:text-white',
                                    'flex items-center gap-x-3 rounded-lg px-6 py-3 text-lg font-medium transition-all'
                                )}
                            >
                                <item.icon className="h-6 w-6" />
                                {item.name}
                            </Link>
                        ))}

                        {/* Children Menu */}
                        <div>
                            <button
                                onClick={() => setIsChildrenMenuOpen(!isChildrenMenuOpen)}
                                className="flex items-center justify-between w-full gap-x-3 rounded-lg px-6 py-3 text-lg font-medium text-gray-700 hover:bg-[#01DA9F] hover:text-white transition-all"
                            >
                                <div className="flex items-center gap-x-3">
                                    <FolderIcon className="h-6 w-6" />
                                    <span>Children</span>
                                </div>
                                {isChildrenMenuOpen ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
                            </button>
                            {isChildrenMenuOpen && (
                                <ul className="ml-10 mt-2 space-y-2">
                                    <li>
                                        <Link
                                            href="/childrens"
                                            className={classNames(
                                                url?.startsWith('/childrens') ? 'text-[#01DA9F] font-bold' : 'text-gray-600',
                                                'hover:text-[#01DA9F] block'
                                            )}
                                        >
                                            All Records
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/beneficiaries"
                                            className={classNames(
                                                url?.startsWith('/beneficiaries') ? 'text-[#01DA9F] font-bold' : 'text-gray-600',
                                                'hover:text-[#01DA9F] block'
                                            )}
                                        >
                                            All Beneficiaries
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </div>
                    </nav>
                </aside>

                {/* Mobile Sidebar (Dialog) */}
                <Dialog open={sidebarOpen} onClose={() => setSidebarOpen(false)} className="lg:hidden z-50">
                    <DialogBackdrop className="fixed inset-0 bg-black/50" />
                    <div className="fixed inset-0 flex">
                        <DialogPanel className="w-72 bg-white p-4 overflow-y-auto">
                            <div className="flex justify-between mb-4">
                                <img src={logoUrl || Logo} alt="Logo" className="h-8 w-auto" />
                                <button onClick={() => setSidebarOpen(false)}>
                                    <XMarkIcon className="h-6 w-6 text-gray-500" />
                                </button>
                            </div>

                            <nav className="space-y-4">
                                {navigation.map(item => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={classNames(
                                            url?.startsWith(item.href) ? 'bg-[#01DA9F] text-white' : 'text-gray-700 hover:bg-[#01DA9F] hover:text-white',
                                            'flex items-center gap-x-3 rounded-lg px-6 py-3 text-lg font-medium transition-all'
                                        )}
                                    >
                                        <item.icon className="h-6 w-6" />
                                        {item.name}
                                    </Link>
                                ))}

                                {/* Mobile Children Submenu */}
                                <div>
                                    <button
                                        onClick={() => setIsChildrenMenuOpen(!isChildrenMenuOpen)}
                                        className="flex items-center justify-between w-full gap-x-3 rounded-lg px-6 py-3 text-lg font-medium text-gray-700 hover:bg-[#01DA9F] hover:text-white transition-all"
                                    >
                                        <div className="flex items-center gap-x-3">
                                            <FolderIcon className="h-6 w-6" />
                                            <span>Children</span>
                                        </div>
                                        {isChildrenMenuOpen ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
                                    </button>
                                    {isChildrenMenuOpen && (
                                        <ul className="ml-10 mt-2 space-y-2">
                                            <li>
                                                <Link
                                                    href="/childrens"
                                                    className="block text-gray-600 hover:text-[#01DA9F]"
                                                >
                                                    All Records
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href="/beneficiaries"
                                                    className="block text-gray-600 hover:text-[#01DA9F]"
                                                >
                                                    All Beneficiaries
                                                </Link>
                                            </li>
                                        </ul>
                                    )}
                                </div>
                            </nav>
                        </DialogPanel>
                    </div>
                </Dialog>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-6 bg-[#F6FBF8]">
                    <FlashMessage />
                    {children}
                </main>
            </div>
        </div>
    );
}

