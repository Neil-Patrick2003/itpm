import dayjs from "dayjs";
import React from "react";
import ParentLayout from '../Partials/ParentLayout.jsx';
import {Link} from "@inertiajs/react";

import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const Show = ({blog}) => {
    return <ParentLayout>
        <div>
            <Link href={"/parent/forum/blogs"} className={"text-xs text-green-600 underline"}>Back to Blogs</Link>
        </div>

        <div>
            <img className={"border-2 rounded-md"} src={`/storage/${blog.image_url}`}/>

            <h2 className="text-sm text-gray-900 line-clamp-2 leading-snug mt-2">
                {blog.title}
            </h2>

            <p className={"text-xs text-gray-700"}>Posted by {blog.user?.name} {' - '}
                <span>{dayjs(blog.created_at).fromNow()}</span>
            </p>

            <hr className={"my-4"}/>
            <p className={"text-sm"}>{blog.body}</p>
        </div>
    </ParentLayout>
}

export default Show
