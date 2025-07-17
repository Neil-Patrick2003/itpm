import WorkerLayout from "@/Layouts/WorkerLayout.jsx";
import { FaSearch } from "react-icons/fa";
import {ChevronRightIcon, HomeIcon, PaperAirplaneIcon} from "@heroicons/react/20/solid";
import React from "react";
import dayjs from 'dayjs';

import { motion } from "framer-motion";
import { useForm } from "@inertiajs/react";
import Avatar from "@mui/material/Avatar";
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export default function ShowTopic({ topic }) {
    const pages = [
        { name: 'Forum', href: '/health_workers/forum', current: false },
        {
            name: topic.title.length > 10 ? topic.title.slice(0, 10) + '...' : topic.title,
            href: `/health_workers/forum/${topic.id}`,
            current: true
        }
    ];

    const { data, setData, post, errors, processing, reset } = useForm({ body: '' });

    function submit(e) {
        e.preventDefault();
        post(`/health_workers/forum/${topic.id}`, {
            onFinish: () => reset()
        });
    }

    const stringAvatar = (name) => {
        const nameSplit = name.trim().split(' ');
        const initials = nameSplit.length > 1
            ? `${nameSplit[0][0]}${nameSplit[1][0]}`
            : `${nameSplit[0][0]}`;
        return {
            sx: { bgcolor: '#4CAF50' },
            children: initials.toUpperCase(),
        };
    };

    return (
        
        <WorkerLayout>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col gap-y-4 px-2 md:p-4"
            >


                {/* Breadcrumb */}
                <div className="flex justify-between items-center mt-4 flex-wrap gap-2">
                    <nav aria-label="Breadcrumb">
                        <ol className="flex items-center space-x-4">
                            <li>
                                <a href="#" className="text-gray-400 hover:text-gray-500">
                                    <HomeIcon className="size-5 shrink-0" />
                                    <span className="sr-only">Home</span>
                                </a>
                            </li>
                            {pages.map((page) => (
                                <li key={page.name}>
                                    <div className="flex items-center">
                                        <ChevronRightIcon className="size-5 text-gray-400" />
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
                </div>

                {/* Main Topic */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="w-full bg-green-50 border-2 border-green-100 rounded-md shadow-sm p-4 md:p-12   "
                >
                    <div className="text-center">
                        <h2 className="text-xl font-semibold ">{topic.title}</h2>
                        <p className="text-sm  mt-1">Posted by {topic.user.name}</p>
                        <p className="flex items-center justify-center gap-1 text-xs text-gray-400 mt-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            {dayjs(topic.created_at).fromNow()}
                        </p>
                    </div>
                </motion.div>

                {/* Posts */}
                <div className="space-y-3">
                    {topic.posts.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="flex flex-col items-center justify-center text-center p-8 bg-white text-green-500"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-8 md:w-12 h-8 md:h-12 mb-2 text-green-400"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                />
                            </svg>
                            <p className="text-sm md:text-lg font-medium">No answers yet</p>
                            <p className="text-xs md:text-sm text-gray-400 mt-1">Be the first to post an answer to this topic.</p>
                        </motion.div>
                    ) : (
                        <div className="space-y-3">
                            {topic.posts.map((post, index) => (
                                <motion.div
                                    key={post.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.4 }}
                                    className="flex gap-4 p-2 border border-gray-200 rounded-full bg-white shadow-sm"
                                >
                                    <div className="shrink-0 w-10 h-10 bg-green-100 text-green-600 flex items-center justify-center rounded-full text-sm font-semibold">
                                        <div className="shrink-0">
                                            {topic.user.profile_photo_url ? (
                                                <img
                                                    src={imageUrl + topic.user.profile_photo_url}
                                                    alt={post.user.name}
                                                    className="rounded-full w-12 h-12 object-cover"
                                                />
                                            ) : (
                                                <Avatar {...stringAvatar(post.user.name)} sx={{ width: 48, height: 48 }} />
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex flex-col w-full">
                                        <div className="flex justify-between items-center">
                                            <p className="font-medium text-xs text-gray-800">{post.user.name}</p>
                                            <p className="text-xs text-gray-400 flex items-center gap-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                </svg>
                                                {dayjs(post.created_at).fromNow()}
                                            </p>
                                        </div>
                                        <p className="text-sm text-gray-700 mt-1 whitespace-pre-wrap">{post.body}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}

                </div>

                {/* Answer Form */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.4 }}
                    className="w-full mt-8 border-t pt-6"
                >
                    <h3 className="text-md md:text-lg font-medium text-gray-700 mb-2">Your Answer</h3>
                    <form onSubmit={submit}>
                        <div className="flex flex-row md:flex-row gap-2">
                            <textarea
                                value={data.body}
                                onChange={e => setData('body', e.target.value)}
                                placeholder="Type your answer here..."
                                className="flex-grow min-h-[100px] border-2 border-green-500 rounded-md p-3 resize-none text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                            <button
                                type="submit"
                                className="flex bg-green-500 text-white px-2 md:px-6 py-2 rounded-md hover:bg-green-600 transition mt-auto self-end md:self-auto"
                                disabled={processing}
                            >
                                <p className="hidden md:text-sm text-white">{processing ? 'Posting...' : 'Post'}
                                </p>

                                <PaperAirplaneIcon className="ml-2 h-6 w-6 text-green-100" />

                            </button>
                        </div>
                        {errors.body && <p className="text-sm text-red-500 mt-1">{errors.body}</p>}
                    </form>
                </motion.div>
            </motion.div>
        </WorkerLayout>
    );
}
