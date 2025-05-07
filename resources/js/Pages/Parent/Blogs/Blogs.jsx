import { Link, useForm} from '@inertiajs/react';
import ParentLayout from '../Partials/ParentLayout.jsx';
import dayjs from "dayjs";
import React from "react";
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const Blogs = ({blogs}) => {
    return (
        <ParentLayout>
            <div className={"space-y-4"}>
                <div className={"flex gap-2"}>
                    <Link href="/parent/forum/blogs"
                          className={"text-sm font-semibold border bg-[#66CA6A] text-white px-5 py-1.5 rounded-xl"}>Blogs</Link>
                    <Link href="/parent/forum/topics"
                          className={"text-sm font-semibold border px-5 py-1.5 rounded-xl"}>Questions</Link>
                </div>

                <div>
                    <Link href={"/parent/forum/blogs/create"} className={"text-xs text-green-600 underline"}>Create new
                        blog post</Link>
                </div>

                {
                    blogs.length ? <div>
                        {blogs.map(blog => <div key={blog.id} className={"border rounded p-2"}>
                            <Link href={route('parent.forum.blogs.show', {blog: blog.id})}>
                                <img src={`/storage/${blog.image_url}`}/>

                                <h2 className="text-sm text-gray-900 line-clamp-2 leading-snug mt-2">
                                    {blog.title}
                                </h2>

                                <p className={"text-xs text-gray-700"}>Posted by {blog.user?.name} {' - '}
                                    <span>{dayjs(blog.created_at).fromNow()}</span></p>

                            </Link>
                        </div>)}
                    </div> : <div className={"border border-dashed p-4 rounded-md"}>
                        <p className={"text-sm text-gray-600 text-center"}>No Blogs posts yet</p>
                    </div>
                }
            </div>
        </ParentLayout>
    )
}

export default Blogs
