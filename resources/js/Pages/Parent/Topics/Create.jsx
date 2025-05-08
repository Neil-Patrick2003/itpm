import {usePage, Link, useForm} from '@inertiajs/react';
import ParentLayout from '../Partials/ParentLayout';
import dayjs from "dayjs";
import React from "react";
import relativeTime from 'dayjs/plugin/relativeTime';
import {ChatBubbleLeftRightIcon} from "@heroicons/react/24/outline/index.js";
import {PaperAirplaneIcon} from "@heroicons/react/20/solid/index.js";

dayjs.extend(relativeTime);

const Create = ({topics}) => {

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
            <div className="space-y-4">
                <div>
                    <Link href={"/parent/forum/topics"} className={"text-xs text-green-600 underline"}>Back to Forum</Link>
                </div>

                <form onSubmit={submit} className={"mb-5"}>
                        <textarea placeholder={"Ask your question"} required value={data.title}
                                  onChange={(e) => setData('title', e.target.value)}
                                  className={"border w-full border-gray-300 rounded-md"} rows={10}></textarea>

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
            </div>
        </ParentLayout>
    )
}

export default Create
