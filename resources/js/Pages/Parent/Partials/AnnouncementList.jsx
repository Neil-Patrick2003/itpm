import dayjs from "dayjs";
import {Link} from "@inertiajs/react";


const AnnouncementList = ({announcements}) => {
    return <div className={"mt-4"}>
        {
            announcements.length ?
                <div className={"border px-2 py-4 rounded-md"}>
                    <p className={"tracking-wider font-medium mb-4"}>Announcements</p>

                    <div className={"space-y-4"}>
                        {
                            announcements.map(item => <div key={item.id} className={"border px-2 py-2 rounded-md"}>
                                <Link href={route('parent.announcement', { announcement: item.id })}>
                                    <p className={"font-medium text-sm"}>{item.title}</p>
                                    <p className={"text-xs text-gray-600"}> {dayjs(item.created_at).format('MMMM D, YYYY')}</p>
                                </Link>
                            </div>)
                        }
                    </div>
                </div>
                :
                <div className={"border py-4 px-2 rounded-md tracking-wider font-medium text-center"}>
                    No Announcements
                </div>
        }
    </div>
}

export default AnnouncementList
