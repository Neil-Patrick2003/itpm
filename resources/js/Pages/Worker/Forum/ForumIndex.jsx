import WorkerLayout from "@/Layouts/WorkerLayout.jsx";
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/20/solid';
import React, { useEffect, useState } from 'react';
import {Link, router, useForm, usePage} from "@inertiajs/react";
import Modal from '@/Components/Modal';
import InputLabel from "@/Components/InputLabel.jsx";
import { motion, AnimatePresence } from 'framer-motion';import { debounce } from 'lodash';
import { FaSearch } from "react-icons/fa";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';


dayjs.extend(relativeTime); // enable dayjs relative time format like "5 mins ago"

const pages = [
    { name: 'Forum', href: '/health_workers/forum', current: false },
];

export default function ForumIndex({ search, page = 1 }) {
    const { topics } = usePage().props;

    // Search input state
    const [searchTerm, setSearchTerm] = useState('');

    // Set search term from URL if exists
    useEffect(() => {
        if (search) setSearchTerm(search);
    }, [search]);

    // Debounced search function using lodash
    const handleSearchTermChange = (value) => {
        setSearchTerm(value);
        const delayed = debounce(() => {
            router.get('/health_workers/forum', { page, search: value }, {
                preserveState: true,
                replace: true,
            });
        }, 500);
        delayed();
        return () => delayed.cancel(); // Cleanup debounce on unmount
    };

    // Form initialization for creating a new topic
    const { data, setData, post, errors, processing, reset } = useForm({
        title: ''
    });

    // Modal state
    const [isAddTopicOpen, setIsAddTopicOpen] = useState(false);
    const closeAddTopicModal = () => setIsAddTopicOpen(false);

    // Submit form function
    function submit(e) {
        e.preventDefault();
        post('/health_workers/forum', {
            onFinish: () => reset(),       // Clear input after submit
            onSuccess: () => closeAddTopicModal(), // Close modal on success
        });
    }

    return (
        <WorkerLayout>
            {/* Create new topic modal */}
            <Modal show={isAddTopicOpen} onClose={() => setIsAddTopicOpen(false)} maxWidth="lg">
                <div className="p-6">
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
                                value={data.title}
                                onChange={e => setData('title', e.target.value)}
                                placeholder="Enter a clear and concise topic title..."
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                            />
                            {errors.title && (
                                <p className="text-red-500 text-xs mt-1">{errors.title}</p>
                            )}
                        </div>

                        <div className="flex justify-end">
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


            {/* Page content */}
            <div className="flex flex-col p-4 min-h-screen">
                {/* Header and search bar */}
                <div className="flex flex-col justify-between items-center space-x-4">
                    <h1 className="text-2xl font-bold">Nutrisafary Discussion</h1>
                    <p className="text-sm">All questions can be discussed here.</p>
                    <div className="relative w-full max-w-xl">
                        <input
                            value={searchTerm}
                            onChange={(e) => handleSearchTermChange(e.target.value)}
                            type="text"
                            name="search"
                            placeholder="Search discussions..."
                            className="border-2 border-green-500 rounded-md h-10 px-4 pl-10 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
                        />
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
                    </div>
                </div>

                {/* Breadcrumb and button */}
                <div className="flex justify-between items-center mt-6">
                    <nav aria-label="Breadcrumb" className="flex">
                        <ol role="list" className="flex items-center space-x-4">
                            <li>
                                <a href="#" className="text-gray-400 hover:text-gray-500">
                                    <HomeIcon aria-hidden="true" className="size-5 shrink-0" />
                                    <span className="sr-only">Home</span>
                                </a>
                            </li>
                            {pages.map((page) => (
                                <li key={page.name}>
                                    <div className="flex items-center">
                                        <ChevronRightIcon className="size-5 shrink-0 text-gray-400" />
                                        <a
                                            href={page.href}
                                            aria-current={page.current ? 'page' : undefined}
                                            className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                                        >
                                            {page.name}
                                        </a>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </nav>
                    <button
                        onClick={() => setIsAddTopicOpen(true)}
                        className="bg-green-500 text-white px-4 py-1 rounded-md"
                    >
                        Create New Discussion
                    </button>
                </div>

                {/* Discussion topics */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6">
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
                                    className="bg-white border border-gray-200 rounded-md p-4 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer hover:bg-green-50"
                                >
                                    <Link href={`/health_workers/forum/${topic.id}`} className="flex flex-col h-full justify-between">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-green-600 text-xs font-medium"># Question {topic.id}</span>
                                            <p className="flex items-center gap-1 text-xs text-gray-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                </svg>
                                                {dayjs(topic.created_at).fromNow()}
                                            </p>
                                        </div>
                                        <h2 className="text-base font-semibold text-gray-800 text-center">{topic.title}</h2>
                                    </Link>
                                </motion.div>
                            ))
                        ) : (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="col-span-full text-center py-12 text-gray-500"
                            >
                                <div className="flex flex-col items-center space-y-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                                    </svg>
                                    <p className="text-lg font-medium">No discussions yet</p>
                                    <p className="text-sm text-gray-400">Be the first to start a conversation!</p>
                                    <button
                                        onClick={() => setIsAddTopicOpen(true)}
                                        className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                                    >
                                        Create New Discussion
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </WorkerLayout>
    );
}
