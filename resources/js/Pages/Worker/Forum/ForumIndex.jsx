import WorkerLayout from "@/Layouts/WorkerLayout.jsx";
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/20/solid';
import React, { useEffect, useState } from 'react';
import { Link, router, useForm, usePage } from "@inertiajs/react";
import Modal from '@/Components/Modal';
import InputLabel from "@/Components/InputLabel.jsx";
import { motion, AnimatePresence } from 'framer-motion';
import { debounce } from 'lodash';
import { FaSearch } from "react-icons/fa";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import DynamicEmptyEstate from "@/Components/DynamicEmptyEstate.jsx";
import {ChatBubbleLeftRightIcon} from "@heroicons/react/24/outline";

dayjs.extend(relativeTime);

const pages = [
    { name: 'Forum', href: '/health_workers/forum', current: false },
];

export default function ForumIndex({ search, page = 1 }) {
    const { topics } = usePage().props;

    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (search) setSearchTerm(search);
    }, [search]);

    // Debounced search to avoid excessive requests
    const handleSearchTermChange = (value) => {
        setSearchTerm(value);
        const delayed = debounce(() => {
            router.get('/health_workers/forum', { page, search: value }, {
                preserveState: true,
                replace: true,
            });
        }, 500);
        delayed();
        return () => delayed.cancel();
    };

    const { data, setData, post, errors, processing, reset } = useForm({
        title: ''
    });

    const [isAddTopicOpen, setIsAddTopicOpen] = useState(false);
    const closeAddTopicModal = () => setIsAddTopicOpen(false);

    function submit(e) {
        e.preventDefault();
        post('/health_workers/forum', {
            onFinish: () => reset(),
            onSuccess: () => closeAddTopicModal(),
        });
    }

    return (
        <WorkerLayout>
            {/* Create new topic modal */}
            <Modal show={isAddTopicOpen} onClose={closeAddTopicModal} maxWidth="lg">
                <div className="p-6 gap-y-4">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                        </svg>
                        Create New Discussion
                    </h2>

                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <InputLabel htmlFor="title" value="Discussion Title" className="mb-1 text-sm text-gray-700" />
                            <input
                                type="text"
                                id="title"
                                value={data.title}
                                onChange={e => setData('title', e.target.value)}
                                placeholder="Enter a clear and concise topic title..."
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                                aria-describedby="title-error"
                            />
                            {errors.title && (
                                <p id="title-error" className="text-red-500 text-xs mt-1">{errors.title}</p>
                            )}
                        </div>

                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={closeAddTopicModal}
                                className="bg-white border border-green-500 hover:bg-green-600 text-green-500 hover:text-white text-sm px-5 py-2 rounded-md transition duration-150"
                                disabled={processing}
                            >

                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-green-500 hover:bg-green-600 text-white text-sm px-5 py-2 rounded-md transition duration-150"
                                disabled={processing}
                            >
                                {processing ? 'Creating...' : 'Create'}
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>

            <div className="flex flex-col gap-y-4  ">
                <div className="flex flex-col bg-green-50 p-4 md:p-6 lg:p-8 items-center space-y-2">
                    <h1 className="text-2xl font-semibold ">Nutrisafary Discussion</h1>
                    <p className="text-sm ">All questions can be discussed here.</p>
                    <div className="relative w-full max-w-xl">
                        <input
                            type="text"
                            placeholder="Search discussions..."
                            className="border-2 border-green-800 rounded-md h-10 px-4 pl-10 text-sm text-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
                        />
                    </div>
                </div>
                <div className="flex justify-between items-center mb-6">
                    <nav aria-label="Breadcrumb" className="flex">
                        <ol role="list" className="flex items-center space-x-4">
                            <li>
                                <Link href="/" className="text-gray-400 hover:text-gray-500 flex items-center">
                                    <HomeIcon aria-hidden="true" className="h-5 w-5" />
                                    <span className="sr-only">Home</span>
                                </Link>
                            </li>
                            {pages.map((page) => (
                                <li key={page.name}>
                                    <div className="flex items-center">
                                        <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                                        <Link
                                            href={page.href}
                                            aria-current={page.current ? 'page' : undefined}
                                            className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                                        >
                                            {page.name}
                                        </Link>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </nav>
                    <button
                        onClick={() => setIsAddTopicOpen(true)}
                        className="flex bg-green-600 hover:bg-green-700 text-white px-2 md:px-5 py-2 rounded-full md:rounded-md transition focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="mr-0 md:mr-2 w-6 h-6 text-green-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                        </svg>
                        <span className="hidden md:flex ">Create New Discussion</span>
                    </button>
                </div>

                {/* Discussion topics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    <AnimatePresence>
                        {topics.data.length > 0 ? (
                            topics.data.map((topic, index) => (
                                <motion.div
                                    key={topic.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ delay: index * 0.05, duration: 0.6 }}
                                    whileHover={{ scale: 1.02 }}
                                    className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer hover:bg-green-50 flex flex-col space-y-4"
                                >
                                    <Link href={`/health_workers/forum/${topic.id}`} className="flex flex-col h-full space-y-4">
                                        {/* Header */}
                                        <div className="flex justify-between items-center text-xs text-gray-500">
                                            <span className="text-green-700 font-semibold"># Question {topic.id}</span>
                                            <div className="flex items-center gap-1" aria-label={`Posted ${dayjs(topic.created_at).fromNow()}`}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span>{dayjs(topic.created_at).fromNow()}</span>
                                            </div>
                                        </div>

                                        {/* Title */}
                                        <h2 className="text-lg font-semibold text-gray-900 line-clamp-2 leading-snug">
                                            {topic.title}
                                        </h2>

                                        {/* Footer */}
                                        <div className="flex justify-end items-center gap-1 text-gray-500 text-sm">
                                            <ChatBubbleLeftRightIcon className="h-5 w-5" />
                                            <span>{topic.posts_count}</span>
                                        </div>
                                    </Link>
                                </motion.div>

                            ))
                        ) : (
                            <DynamicEmptyEstate
                                title="No discussions yet"
                                subtitle="Be the first to start a conversation!"
                                buttonText="Create New Discussion"
                                svgPath="M12 4v16m8-8H4"
                                onClick={() => setIsAddTopicOpen(true)}
                            />
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Page content */}
            {/*<div className="flex flex-col p-4 min-h-screen max-w-7xl mx-auto">*/}
            {/*    /!* Header and search bar *!/*/}
            {/*    <div className="mb-6">*/}
            {/*        <h1 className="text-3xl font-bold text-green-600 mb-1">Nutrisafary Discussion</h1>*/}
            {/*        <p className="text-sm text-gray-600 mb-4">All questions can be discussed here.</p>*/}
            {/*        <div className="relative max-w-xl w-full">*/}
            {/*            <input*/}
            {/*                value={searchTerm}*/}
            {/*                onChange={(e) => handleSearchTermChange(e.target.value)}*/}
            {/*                type="search"*/}
            {/*                name="search"*/}
            {/*                placeholder="Search discussions..."*/}
            {/*                className="border-2 border-green-500 rounded-md h-11 px-4 pl-11 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 w-full transition"*/}
            {/*                aria-label="Search discussions"*/}
            {/*            />*/}
            {/*            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 pointer-events-none" />*/}
            {/*        </div>*/}
            {/*    </div>*/}

            {/*    /!* Breadcrumb and button *!/*/}
            {/*    <div className="flex justify-between items-center mb-6">*/}
            {/*        <nav aria-label="Breadcrumb" className="flex">*/}
            {/*            <ol role="list" className="flex items-center space-x-4">*/}
            {/*                <li>*/}
            {/*                    <Link href="/" className="text-gray-400 hover:text-gray-500 flex items-center">*/}
            {/*                        <HomeIcon aria-hidden="true" className="h-5 w-5" />*/}
            {/*                        <span className="sr-only">Home</span>*/}
            {/*                    </Link>*/}
            {/*                </li>*/}
            {/*                {pages.map((page) => (*/}
            {/*                    <li key={page.name}>*/}
            {/*                        <div className="flex items-center">*/}
            {/*                            <ChevronRightIcon className="h-5 w-5 text-gray-400" />*/}
            {/*                            <Link*/}
            {/*                                href={page.href}*/}
            {/*                                aria-current={page.current ? 'page' : undefined}*/}
            {/*                                className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"*/}
            {/*                            >*/}
            {/*                                {page.name}*/}
            {/*                            </Link>*/}
            {/*                        </div>*/}
            {/*                    </li>*/}
            {/*                ))}*/}
            {/*            </ol>*/}
            {/*        </nav>*/}
            {/*        <button*/}
            {/*            onClick={() => setIsAddTopicOpen(true)}*/}
            {/*            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md transition focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"*/}
            {/*        >*/}
            {/*            Create New Discussion*/}
            {/*        </button>*/}
            {/*    </div>*/}

            {/*    /!* Discussion topics *!/*/}
            {/*    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">*/}
            {/*        <AnimatePresence>*/}
            {/*            {topics.data.length > 0 ? (*/}
            {/*                topics.data.map((topic, index) => (*/}
            {/*                    <motion.div*/}
            {/*                        key={topic.id}*/}
            {/*                        initial={{ opacity: 0, y: 20 }}*/}
            {/*                        animate={{ opacity: 1, y: 0 }}*/}
            {/*                        exit={{ opacity: 0, y: -10 }}*/}
            {/*                        transition={{ delay: index * 0.05, duration: 0.6 }}*/}
            {/*                        whileHover={{ scale: 1.03 }}*/}
            {/*                        className="bg-white border border-gray-200 rounded-md p-5 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer hover:bg-green-50 flex flex-col justify-between"*/}
            {/*                    >*/}
            {/*                        <Link href={`/health_workers/forum/${topic.id}`} className="flex flex-col h-full">*/}
            {/*                            <div className="flex justify-between items-center mb-3">*/}
            {/*                                <span className="text-green-700 text-xs font-semibold">*/}
            {/*                                    # Question {topic.id}*/}
            {/*                                </span>*/}
            {/*                                <p className="flex items-center gap-1 text-xs text-gray-400" aria-label={`Posted ${dayjs(topic.created_at).fromNow()}`}>*/}
            {/*                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">*/}
            {/*                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />*/}
            {/*                                    </svg>*/}
            {/*                                    {dayjs(topic.created_at).fromNow()}*/}
            {/*                                </p>*/}
            {/*                            </div>*/}
            {/*                            <h2 className="text-base font-semibold text-gray-900 line-clamp-3">*/}
            {/*                                {topic.title}*/}
            {/*                            </h2>*/}
            {/*                        </Link>*/}
            {/*                    </motion.div>*/}
            {/*                ))*/}
            {/*            ) : (*/}
            {/*                <DynamicEmptyEstate*/}
            {/*                    title="No discussions yet"*/}
            {/*                    subtitle="Be the first to start a conversation!"*/}
            {/*                    buttonText="Create New Discussion"*/}
            {/*                    svgPath="M12 4v16m8-8H4"*/}
            {/*                    onClick={() => setIsAddTopicOpen(true)}*/}
            {/*                />*/}
            {/*            )}*/}
            {/*        </AnimatePresence>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </WorkerLayout>
    );
}
