import {Link} from '@inertiajs/react';
import ParentLayout from '../Partials/ParentLayout';
import dayjs from "dayjs";
import React from "react";
import relativeTime from 'dayjs/plugin/relativeTime';
import {ChatBubbleLeftRightIcon} from "@heroicons/react/24/outline/index.js";

dayjs.extend(relativeTime);

const Forum = ({topics}) => {

    return (
        <ParentLayout>
            <div className={"space-y-4"}>
                <div className={"flex gap-2"}>
                    <Link href="/parent/forum/blogs" className={"text-sm font-semibold border px-5 py-1.5 rounded-xl"}>Blogs</Link>
                    <Link href="/parent/forum/topics" className={"text-sm font-semibold border bg-[#66CA6A] text-white px-5 py-1.5 rounded-xl"}>Questions</Link>
                </div>

                <div>
                    <Link href={"/parent/forum/topics/create"} className={"text-xs text-green-600 underline"}>Create new question</Link>
                </div>

                <div className={"space-y-4"}>
                    {topics.map(topic => <div key={topic.id} className={"border rounded p-2"}>
                        <Link href={route('parent.forum.topic', {topic: topic.id})}>
                            <div className="flex justify-between items-center text-xs text-gray-500">
                                <span className="text-green-700 font-semibold"># Question {topic.id}</span>
                                <div className="flex items-center gap-1"
                                     aria-label={`Posted ${dayjs(topic.created_at).fromNow()}`}>
                                    <span>{dayjs(topic.created_at).fromNow()}</span>
                                </div>
                            </div>

                            {/* Title */}
                            <h2 className="text-xs text-gray-900 line-clamp-2 leading-snug">
                                {topic.title}
                            </h2>

                            {/* Footer */}
                            <div className="flex justify-end items-center gap-1 text-gray-500 text-sm">
                                <ChatBubbleLeftRightIcon className="h-5 w-5"/>
                                <span>{topic.posts_count}</span>
                            </div>
                        </Link>
                    </div>)}
                </div>
            </div>
        </ParentLayout>
    )
}

export default Forum
