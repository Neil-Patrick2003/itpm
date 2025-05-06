'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    TransitionChild,
} from '@headlessui/react'
import {
    Bars3Icon,
    BellIcon,
    Cog6ToothIcon,
    DocumentDuplicateIcon,
    HomeIcon,
    UsersIcon,
    XMarkIcon,
    ChatBubbleLeftRightIcon,
    ChartPieIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'

const navigation = [
    { name: 'Dashboard', href: '/health_workers/dashboard', icon: HomeIcon },
    { name: 'Record', href: '/health_workers/records', icon: DocumentDuplicateIcon },
    { name: 'Beneficiaries', href: '/health_workers/beneficiary', icon: UsersIcon },
    { name: 'Forum', href: '/health_workers/forum', icon: ChatBubbleLeftRightIcon },
    { name: 'Diet Plan', href: '/health_workers/diet_plan', icon: ChartPieIcon },
]

const userNavigation = [
    { name: 'Your Profile', href: '/profile' },
    { name: 'Settings', href: '#' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function WorkerLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const pathname = usePathname()

    return (
        <>
            <div>
                {/* Mobile Sidebar */}
                <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
                    <DialogBackdrop className="fixed inset-0 bg-black/50" />
                    <div className="fixed inset-0 flex">
                        <DialogPanel className="relative mr-16 w-full max-w-xs bg-green-900 text-white">
                            <TransitionChild>
                                <div className="absolute top-0 left-full flex w-16 justify-center pt-5">
                                    <button onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
                                        <span className="sr-only">Close sidebar</span>
                                        <XMarkIcon className="h-6 w-6 text-white" />
                                    </button>
                                </div>
                            </TransitionChild>
                            <div className="flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-4">
                                <div className="flex h-16 shrink-0 items-center">
                                    <img
                                        src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=white"
                                        alt="Your Company"
                                        className="h-8 w-auto"
                                    />
                                </div>
                                <nav className="flex flex-1 flex-col">
                                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                        <li>
                                            <ul role="list" className="-mx-2 space-y-1">
                                                {navigation.map((item) => {
                                                    const isActive = pathname?.startsWith(item.href)
                                                    const Icon = item.icon

                                                    return (
                                                        <li key={item.name}>
                                                            <a
                                                                href={item.href}
                                                                className={classNames(
                                                                    isActive
                                                                        ? 'bg-lime-600 text-white'
                                                                        : 'text-white hover:bg-lime-700',
                                                                    'group flex gap-x-3 rounded-md p-2 text-sm font-semibold'
                                                                )}
                                                            >
                                                                <Icon
                                                                    className={classNames(
                                                                        isActive ? 'text-white' : 'text-lime-200 group-hover:text-white',
                                                                        'h-6 w-6'
                                                                    )}
                                                                />
                                                                {item.name}
                                                            </a>
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </DialogPanel>
                    </div>
                </Dialog>

                {/* Desktop Sidebar */}
                <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col bg-green-900 text-white">
                    <div className="flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-4">
                        <div className="flex h-16 shrink-0 items-center">
                            <img
                                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=white"
                                alt="Your Company"
                                className="h-8 w-auto"
                            />
                        </div>
                        <nav className="flex flex-1 flex-col">
                            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                <li>
                                    <ul role="list" className="-mx-2 space-y-1">
                                        {navigation.map((item) => {
                                            const isActive = pathname?.startsWith(item.href)
                                            const Icon = item.icon

                                            return (
                                                <li key={item.name}>
                                                    <a
                                                        href={item.href}
                                                        className={classNames(
                                                            isActive
                                                                ? 'bg-lime-600 text-white'
                                                                : 'text-white hover:bg-lime-700',
                                                            'group flex gap-x-3 rounded-md p-2 text-sm font-semibold'
                                                        )}
                                                    >
                                                        <Icon
                                                            className={classNames(
                                                                isActive ? 'text-white' : 'text-lime-200 group-hover:text-white',
                                                                'h-6 w-6'
                                                            )}
                                                        />
                                                        {item.name}
                                                    </a>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </li>
                                <li className="mt-auto">
                                    <a
                                        href="#"
                                        className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold text-white hover:bg-lime-700"
                                    >
                                        <Cog6ToothIcon className="h-6 w-6 text-white" />
                                        Settings
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

                {/* Main Content */}
                <div className="lg:pl-72">
                    <div className="sticky top-0 z-40 flex h-16 items-center gap-x-4 border-b bg-white shadow px-4 text-green-900 sm:gap-x-6 sm:px-6 lg:px-8">
                        <button onClick={() => setSidebarOpen(true)} className="-m-2.5 p-2.5 lg:hidden">
                            <span className="sr-only">Open sidebar</span>
                            <Bars3Icon className="h-6 w-6" />
                        </button>
                        <div className="flex flex-1 items-center justify-between">
                            <form action="#" method="GET" className="relative flex-1">
                                <MagnifyingGlassIcon className="absolute left-2.5 top-2.5 h-5 w-5 text-green-900" />
                                <input
                                    type="search"
                                    placeholder="Search"
                                    className="block w-full rounded-md border-0 bg-gray-100 py-1.5 pl-10 pr-3 text-white placeholder-white/70 focus:outline-none sm:text-sm"
                                />
                            </form>
                            <div className="flex items-center gap-x-4 lg:gap-x-6">
                                <button className="text-white hover:text-gray-300">
                                    <BellIcon className="h-6 w-6" />
                                </button>
                                <Menu as="div" className="relative">
                                    <MenuButton className="flex items-center gap-x-2">
                                        <img
                                            className="h-8 w-8 rounded-full bg-gray-100"
                                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                                            alt=""
                                        />
                                        <span className="hidden lg:block text-sm font-medium">Tom Cook</span>
                                        <ChevronDownIcon className="h-5 w-5" />
                                    </MenuButton>
                                    <MenuItems className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-black/5 focus:outline-none">
                                        {userNavigation.map((item) => (
                                            <MenuItem key={item.name}>
                                                <a
                                                    href={item.href}
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                >
                                                    {item.name}
                                                </a>
                                            </MenuItem>
                                        ))}
                                    </MenuItems>
                                </Menu>
                            </div>
                        </div>
                    </div>
                    <main className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">{children}</main>
                </div>
            </div>
        </>
    )
}
