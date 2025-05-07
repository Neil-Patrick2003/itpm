import dayjs from "dayjs";
import React from "react";
import ParentLayout from './Partials/ParentLayout.jsx';
import {Link} from "@inertiajs/react";

import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const Announcement = ({annoucement}) => {
    return <ParentLayout>
        <div>
            <Link href={"/parent/home"} className={"text-xs text-green-600 underline"}>Back to Home</Link>
        </div>

        <div>
            <h2 className="text-sm text-gray-900 line-clamp-2 leading-snug mt-2">
                {annoucement.title}
            </h2>

            <p className={"text-xs text-gray-700"}>
                <span>{dayjs(annoucement.created_at).fromNow()}</span>
            </p>

            <hr className={"my-4"}/>
            <p className={"text-sm"}>{annoucement.description}</p>
        </div>
    </ParentLayout>
}

export default Announcement
