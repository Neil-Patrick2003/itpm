import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems
} from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import FlashMessage from "@/Components/FlashMessage.jsx";
import {Link, router, useForm, usePage} from "@inertiajs/react";
import React, {useState} from "react";
import logo from '../../assets/image/logo.png';
import Modal from "@/Components/Modal.jsx";

const user = {
    name: 'Tom Cook',
    email: 'tom@example.com',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}

const navigation = [
    { name: 'Dashboard', href: '/health_workers/dashboard' },
    { name: 'Record', href: '/health_workers/records' },
    { name: 'Beneficiaries', href: '/health_workers/beneficiary' },
    { name: 'Forum', href: '/health_workers/forum' },
    { name: 'Diet Plan', href: '/health_workers/diet_plan' },



]

const userNavigation = [
    { name: 'Your Profile', href: '/profile' },
    { name: 'Settings', href: '#' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function WorkerLayout({ children,  }) {
    const { props } = usePage();
    const announcements = props.announcements || [];
    const { data, setData, post, patch, processing, errors, reset } = useForm({
        is_read: ''
    })
    const currentPage = window.location.pathname;
    const [openAnnouncement, setOpenAnnouncement] = React.useState(false);
    const [selected, setSelected] = useState(null);


    const openAnnouncementModal = (announcement) => {
        setSelected(announcement);
        setOpenAnnouncement(true);

        // if (!announcement.is_read) {
        //     // Mark as read
        //     router.post(`/health_worker/announcements/${announcement.id}/read`, {}, {
        //         preserveScroll: true,
        //         onSuccess: () => {
        //             // Optional: update local state
        //             announcement.is_read = true;
        //         },
        //     });
        // }
    };

    return (
        <>

            <div className="min-h-full">
                <div className="bg-gray-100 pb-32">
                    <Disclosure as="nav" className="fix bg-green-900">
                        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                            <div className="border-b border-gray-700">
                                <div className="flex h-16 items-center justify-between px-4 sm:px-0">
                                    <div className="flex items-center">
                                        <div className="shrink-0">
                                            <img className='w-full max-w-[28px] object-cover' src={logo} alt="Healthy Living" />
                                        </div>
                                        <div className="hidden md:block">
                                            <div className="ml-10 flex items-baseline space-x-4">
                                                {navigation.map((item) => (
                                                    <a
                                                        key={item.name}
                                                        href={item.href}
                                                        aria-current={item.href === currentPage ? 'page' : undefined}
                                                        className={classNames(
                                                            item.href === currentPage
                                                                ? 'bg-green-700 text-white'
                                                                : 'text-gray-300 hover:bg-green-700 hover:text-white',
                                                            'rounded-md px-3 py-2 text-sm font-medium'
                                                        )}
                                                    >
                                                        {item.name}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hidden md:block">
                                        <div className="ml-4 flex items-center md:ml-6">
                                            <Menu as="div" className="relative ml-3">
                                                <div>
                                                    <MenuButton className="relative flex max-w-xs items-center text-sm focus:ring-2 focus:ring-white">
                                                        <span className="absolute -inset-1.5" />
                                                        <span className="sr-only">View notifications</span>
                                                        <BellIcon aria-hidden="true" className="size-8 text-white" />
                                                    </MenuButton>
                                                </div>

                                                <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden max-h-64 overflow-y-auto">
                                                    {announcements.map((announcement) => (
                                                        <MenuItem key={announcement.id}>
                                                            <button
                                                                onClick={() => openAnnouncementModal(announcement)} // Open modal with content
                                                                className={`block w-full text-left px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden ${
                                                                    announcement.is_read === 0 ? 'font-bold' : 'font-normal'
                                                                }`}
                                                            >
                                                                {announcement.title}
                                                            </button>
                                                        </MenuItem>
                                                    ))}

                                                    <MenuItem>
                                                        <Link
                                                            href="/logout"
                                                            method="post"
                                                            as="button"
                                                            className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                                                        >
                                                            See all announcements
                                                        </Link>
                                                    </MenuItem>
                                                </MenuItems>

                                            </Menu>

                                            {/*<button*/}
                                            {/*    type="button"*/}
                                            {/*    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"*/}
                                            {/*>*/}
                                            {/*    <span className="absolute -inset-1.5" />*/}
                                            {/*    <span className="sr-only">View notifications</span>*/}
                                            {/*    <BellIcon aria-hidden="true" className="size-6" />*/}
                                            {/*</button>*/}

                                            <Menu as="div" className="relative ml-3">
                                                <div>
                                                    <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                                                        <span className="absolute -inset-1.5" />
                                                        <span className="sr-only">Open user menu</span>
                                                        <img alt="" src={user.imageUrl} className="size-8 rounded-full" />
                                                    </MenuButton>
                                                </div>
                                                <MenuItems
                                                    transition
                                                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden"
                                                >
                                                    {userNavigation.map((item) => (
                                                        <MenuItem key={item.name}>
                                                            <a
                                                                href={item.href}
                                                                className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                                                            >
                                                                {item.name}
                                                            </a>
                                                        </MenuItem>
                                                    ))}
                                                    <MenuItem>
                                                        <Link href="/logout" method="post" as="button" className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden">Logout</Link>
                                                    </MenuItem>
                                                </MenuItems>
                                            </Menu>
                                        </div>
                                    </div>
                                    <div className="-mr-2 flex md:hidden">
                                        <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                                            <span className="absolute -inset-0.5" />
                                            <span className="sr-only">Open main menu</span>
                                            <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                                            <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
                                        </DisclosureButton>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <DisclosurePanel className="border-b border-gray-700 md:hidden">
                            <div className="space-y-1 px-2 py-3 sm:px-3">
                                {navigation.map((item) => (
                                    <DisclosureButton
                                        key={item.name}
                                        as="a"
                                        href={item.href}
                                        aria-current={item.href === currentPage ? 'page' : undefined}
                                        className={classNames(
                                            item.href === currentPage ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                            'block rounded-md px-3 py-2 text-base font-medium'
                                        )}
                                    >
                                        {item.name}
                                    </DisclosureButton>
                                ))}
                            </div>
                            <div className="border-t border-gray-700 pt-4 pb-3">
                                <div className="flex items-center px-5">
                                    <div className="shrink-0">
                                        <img alt="" src={user.imageUrl} className="size-10 rounded-full" />
                                    </div>
                                    <div className="ml-3">
                                        <div className="text-base font-medium text-white">{user.name}</div>
                                        <div className="text-sm font-medium text-gray-400">{user.email}</div>
                                    </div>
                                    <button
                                        type="button"
                                        className="relative ml-auto shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
                                    >
                                        <span className="absolute -inset-1.5" />
                                        <span className="sr-only">View notifications</span>
                                        <BellIcon aria-hidden="true" className="size-6" />
                                    </button>
                                </div>
                                <div className="mt-3 space-y-1 px-2">
                                    {userNavigation.map((item) => (
                                        <DisclosureButton
                                            key={item.name}
                                            as="a"
                                            href={item.href}
                                            className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                                        >
                                            {item.name}
                                        </DisclosureButton>
                                    ))}
                                </div>
                            </div>
                        </DisclosurePanel>
                    </Disclosure>


                </div>

                <main className="-mt-32">
                    <div className="mx-auto max-w-7xl pb-12 sm:px-6 lg:px-8">

                        {selected && (
                            <Modal show={openAnnouncement} onClose={() => setOpenAnnouncement(false)} maxWidth="lg">
                                <div className="p-6 bg-white rounded-lg shadow-lg">
                                    {/* Logo Section */}
                                    <div className="flex items-center justify-between border-b pb-4 mb-4">
                                        <div className="flex items-center space-x-3">
                                            <img src="/images/logo.png" alt="Logo" className="h-10 w-10 object-contain" />
                                            <h2 className="text-2xl font-bold text-green-700">Announcement</h2>
                                        </div>
                                        <button
                                            onClick={() => setOpenAnnouncement(false)}
                                            className="text-gray-400 hover:text-gray-600"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                                 viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                      d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>

                                    {/* Content Section */}
                                    <div className="space-y-4">
                                        <h3 className="text-xl font-semibold text-green-800">{selected.title}</h3>
                                        <p className="text-gray-700 leading-relaxed">{selected.description}</p>
                                        <p className="text-sm text-gray-500">
                                            Posted at: {new Date(selected.created_at).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            </Modal>

                        )}
                        <FlashMessage />
                        <div className="rounded-lg bg-white px-0 py-6 ">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}
