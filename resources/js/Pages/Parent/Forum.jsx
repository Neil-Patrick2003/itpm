import './layout.css'
import {usePage, Link, useForm} from '@inertiajs/react';
import ParentLayout from './Partials/ParentLayout.jsx';
import dayjs from "dayjs";
import React from "react";
import relativeTime from 'dayjs/plugin/relativeTime';
import {ChatBubbleLeftRightIcon} from "@heroicons/react/24/outline/index.js";
import {PaperAirplaneIcon} from "@heroicons/react/20/solid/index.js";

dayjs.extend(relativeTime);

const Forum = ({topics}) => {

    const {post, processing, reset, setData, data} = useForm({
        title: ''
    })

    const submit = (e) => {
        e.preventDefault();
        post(route('parent.forum.topic.store', ), {
            onFinish: () => reset('title'),
        });
    };


    return (
        <ParentLayout>
            <div>
                <h2 className={"text-lg font-semibold mb-5"}>Forum</h2>

                <form onSubmit={submit} className={"mb-5"}>
                        <textarea placeholder={"Ask your question"} required value={data.title}
                                  onChange={(e) => setData('title', e.target.value)}
                                  className={"border w-full border-gray-300 rounded-md"}></textarea>

                    <div className={"flex justify-center"}>
                        <button
                            type="submit"
                            className="flex text-xs items-center bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
                            disabled={processing}
                        >
                            {processing ? 'Submitting...' : 'Submit'}
                        </button>
                    </div>
                </form>

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
