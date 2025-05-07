import {usePage, Link, useForm} from '@inertiajs/react';
import ParentLayout from '../Partials/ParentLayout';
import dayjs from "dayjs";
import React from "react";
import relativeTime from 'dayjs/plugin/relativeTime';
import {ChatBubbleLeftRightIcon} from "@heroicons/react/24/outline/index.js";
import {PaperAirplaneIcon} from "@heroicons/react/20/solid/index.js";
import InputError from "@/Components/InputError.jsx";
import InputLabel from "@/Components/InputLabel.jsx";

dayjs.extend(relativeTime);

const Create = ({topics}) => {

    const {post, processing, reset, setData, errors, data} = useForm({
        title: '',
        body: '',
        image: null,
    })

    const submit = (e) => {
        e.preventDefault();
        post(route('parent.forum.blogs.store', ), {
            onFinish: () => reset('title', 'body', 'image'),
        });
    };

    const handleFileChange = (e) => {
        if (e.target.files?.length) {
            setData('image', e.target.files[0])
        }
    };


    return (
        <ParentLayout>
            <div className="space-y-4">
                <div>
                    <Link href={"/parent/forum/blogs"} className={"text-xs text-green-600 underline"}>Back to Blogs</Link>
                </div>

                <form onSubmit={submit} className={"space-y-6"}>

                    <div>
                        <InputLabel htmlFor="image" value="Image" className="text-[#66CA6A]"/>

                        <input
                            type="file"
                            accept={"image/*"}
                            onChange={handleFileChange}
                            required
                        />

                        <InputError message={errors.image}/>
                    </div>

                    <div>
                        <InputLabel htmlFor="title" value="Title" className="text-[#66CA6A]"/>

                        <div className="relative">
                            <input
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                required
                                placeholder={`Enter title`}
                                className="w-full border rounded-md border-gray-300"
                            />
                        </div>
                        <InputError message={errors.title}/>
                    </div>

                    <div>
                        <InputLabel htmlFor="body" value="Body" className="text-[#66CA6A]"/>

                        <textarea placeholder={""} required value={data.body}
                                  onChange={(e) => setData('body', e.target.value)}
                                  className={"border w-full border-gray-300 rounded-md"} rows={12}></textarea>

                        <InputError message={errors.body}/>
                    </div>

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
