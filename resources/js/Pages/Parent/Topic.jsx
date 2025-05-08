import './layout.css'
import ParentLayout from './Partials/ParentLayout.jsx';
import AnnouncementList from './Partials/AnnouncementList.jsx'
import dayjs from "dayjs";
import React from "react";
import relativeTime from 'dayjs/plugin/relativeTime';
import { useForm , Link} from '@inertiajs/react';
import {PaperAirplaneIcon} from "@heroicons/react/20/solid/index.js";
dayjs.extend(relativeTime);

const Topic = ({topic , posts}) => {
    const {post, processing, reset, setData, data} = useForm({
        body: ''
    })

    const submit = (e) => {
        e.preventDefault();
        post(route('parent.forum.posts.store', { topic: topic.id }), {
            onFinish: () => reset('body'),
        });
    };

    return (
        <ParentLayout>
            <div>
                <Link href={"/parent/forum/topics"} className={"text-xs text-green-600 underline"}>Back to Forum</Link>
                <div className={"mb-5"}>
                    <h2 className={"text-lg font-semibold"}>{topic.title}</h2>
                    <p className={"text-xs"}>Posted <span>{dayjs(topic.created_at).fromNow()} by {topic.user?.name}</span></p>
                </div>

                {posts.length ? <div className={"space-y-4 "}>
                    {posts.map(post => <div key={post.id} className={"border rounded p-2"}>
                        <div className="flex justify-between items-center text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                                <span>{post.user?.name} replied {dayjs(post.created_at).fromNow()}</span>
                            </div>
                        </div>

                        <h2 className="text-sm text-gray-900 line-clamp-2 leading-snug">
                            {post.body}
                        </h2>
                    </div>)}
                </div>: <div className={"text-center border px-2 py-2 rounded-md border-dashed text-xs"}>No replies yet</div>}

                <div className={"mt-5"}>
                    <form onSubmit={submit}>
                        <textarea placeholder={"Your Answer"} required value={data.body}
                                  onChange={(e) => setData('body', e.target.value)}
                                  className={"border w-full border-gray-300 rounded-md"}></textarea>

                        <button
                            type="submit"
                            className="flex items-center bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
                            disabled={processing}
                        >
                            <p className="text-sm text-white">{processing ? 'Posting...' : 'Post'}
                            </p>

                            <PaperAirplaneIcon className="ml-2 h-4 w-4 text-green-100"/>

                        </button>
                    </form>
                </div>

            </div>
        </ParentLayout>
    )
}

export default Topic
