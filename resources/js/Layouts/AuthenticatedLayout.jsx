import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Dialog, DialogBackdrop, DialogPanel, TransitionChild } from '@headlessui/react';
import Logo from '../../assets/image/new-logo.png';
import Text from '../../assets/image/Text.png';
import { Bars3Icon, CalendarIcon, ChartPieIcon, DocumentDuplicateIcon, FolderIcon, HomeIcon, UsersIcon, XMarkIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';



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

export default function AuthenticatedLayout({ header, children }) {
    const { user } = usePage().props;

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const { url } = usePage();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    function logout(e) {
        e.preventDefault();
        post('/logout');
    }

    return (
        <>
            <div className='min-h-full bg-gray-100'>
                {/* Sidebar Modal (for small screens) */}
                <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
                    <DialogBackdrop
                        transition
                        className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-closed:opacity-0"
                    />
                    <div className="fixed inset-0 flex">
                        <DialogPanel
                            transition
                            className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-closed:-translate-x-full"
                        >
                            <TransitionChild>
                                <div className="absolute top-0 left-full flex w-16 justify-center pt-5 duration-300 ease-in-out data-closed:opacity-0">
                                    <button type="button" onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
                                        <span className="sr-only">Close sidebar</span>
                                        <XMarkIcon aria-hidden="true" className="size-6 text-white" />
                                    </button>
                                </div>
                            </TransitionChild>
                            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6 pb-2">
                                <div className="flex h-16 shrink-0 items-center">
                                    <img
                                        alt="Your Company"
                                        src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=white"
                                        className="h-8 w-auto"
                                    />
                                </div>
                                <nav className="flex flex-1 flex-col">
                                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                        <li>
                                            <ul role="list" className="-mx-2 space-y-1">
                                                {navigation.map((item) => (
                                                    <li key={item.name}>
                                                        <Link
                                                            href={item.href}
                                                            className={classNames(
                                                                url === item.href
                                                                    ? 'bg-indigo-700 text-white'
                                                                    : 'text-indigo-200 hover:bg-indigo-700 hover:text-white',
                                                                'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                                                            )}
                                                        >
                                                            <item.icon
                                                                aria-hidden="true"
                                                                className={classNames(
                                                                    url === item.href ? 'text-white' : 'text-indigo-200 group-hover:text-white',
                                                                    'size-6 shrink-0',
                                                                )}
                                                            />
                                                            {item.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </DialogPanel>
                    </div>
                </Dialog>

                {/* Desktop Sidebar */}
                <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col p-4">
                    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 rounded-xl">
                        <div className="flex h-16 shrink-0 items-center">
                            <img
                                alt="Your Company"
                                src={Logo}
                                className="h-8 w-auto"
                                style={{ width: '40px', height: '40px' }}
                            />
                            <img
                                alt="Your Company"
                                src={Text}
                                className="h-8 w-auto"
                                style={{ width: '140px', height: '60px' }}
                            />
                        </div>
                        <nav className="flex flex-1 flex-col">
                            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                <li>
                                    <ul role="list" className="-mx-2 space-y-2">
                                        {navigation.map((item) => (
                                            <li key={item.name}>
                                                <Link
                                                    href={item.href}
                                                    className={classNames(
                                                        url === item.href
                                                            ? 'bg-[#01DA9F] text-white'
                                                            : 'text-gray-800 hover:bg-[#01DA9F] hover:text-white',
                                                        'group flex gap-x-3 rounded-full py-2 px-6 text-sm/6 font-semibold',
                                                    )}
                                                >
                                                    <item.icon
                                                        aria-hidden="true"
                                                        className={classNames(
                                                            url === item.href ? 'text-white' : 'text-gray-400 group-hover:text-white',
                                                            'size-6 shrink-0',
                                                        )}
                                                    />
                                                    {item.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className="relative inline-block w-full">
                        <button
                            onClick={toggleMenu}
                            className="flex items-center gap-x-2 w-full px-6 py-2 bg-green-700 text-white rounded-b-lg shadow-md focus:outline-none"
                        >
                            {/* Image inside the button */}
                            <img src="/path/to/your/image.png" alt="Icon" className="h-5 w-5" />
                            {/* Toggle Arrow Icon */}
                            {isOpen ? (
                                <ChevronUpIcon className="h-5 w-5" />
                            ) : (
                                <ChevronDownIcon className="h-5 w-5" />
                            )}
                            <span>{user.name}</span>
                        </button>

                        {/* Dropdown Menu */}
                        {isOpen && (
                            <ul className="absolute bottom-full left-0 mb-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                                <li className="px-6 py-2 cursor-pointer hover:bg-gray-100">
                                    <Link href="/logout" method="post" as="button">Logout</Link>
                                </li>
                                <li className="px-6 py-2 cursor-pointer hover:bg-gray-100">

                                </li>
                                <li className="px-6 py-2 cursor-pointer hover:bg-gray-100">Option 3</li>
                            </ul>
                        )}
                    </div>
                </div>

                {/* Main Content */}
                <main className="lg:pl-[282px]">
                    <div className="bg">{children}</div>
                </main>
            </div>
        </>
    );
}

