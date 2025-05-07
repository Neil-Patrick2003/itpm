import WorkerLayout from "@/Layouts/WorkerLayout.jsx";
import Modal from "@/Components/Modal.jsx";
import Editor from "react-simple-wysiwyg";
import {MegaphoneIcon} from "@heroicons/react/24/solid/index.js";
import EmptyState from "@/Components/EmptyState.jsx";
import dayjs from "dayjs";
import Avatar from "@mui/material/Avatar";
import React, {useState} from "react";
import {useForm} from "@inertiajs/react";


const MealIndex = ({announcements}) => {

    const [description, setDescription] = useState('my <b>HTML</b>');
    const { data, setData, post, loading, error, processing, reset } = useForm({
        title: '',
        goal_type: '',
        description: '',
    });

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

    function onChange(e) {
        setDescription(e.target.value);
        setData('description', e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault()
        console.log(data)

        post('/health_workers/nutrition', {
            onSuccess: () => {
                reset();
                closeAddAnnouncementModal();
            }
        })
    }

// const handleSubmit = () => {
//     e.pre
//     setOpenAddAnnouncement(false);
//     setBody('');
// };

    const [ openAddAnnouncement, setOpenAddAnnouncement ] = useState(false);

    const openAddAnnouncementModal = () => {
        setOpenAddAnnouncement(true);
    }

    const closeAddAnnouncementModal = () => {
        setOpenAddAnnouncement(false);
    }

    return (
        <WorkerLayout>

            <Modal show={openAddAnnouncement} onClose={closeAddAnnouncementModal} maxWidth="2xl">
                <div className="flex flex-col gap-4 p-6 space-y-4 rounded-lg bg-white z-50 relative">
                    <h1 className="text-2xl font-bold text-gray-800">Create New Meal Plan</h1>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                    />
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Goal</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={data.goal_type}
                        onChange={(e) => setData('goal_type', e.target.value)}
                    />
                    <Editor value={description} onChange={onChange}
                            className={'w-full h-64'}/>


                    <button
                        onClick={handleSubmit}
                        className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >submit</button>
                </div>
            </Modal>


            <div className="shadow p-4 bg-white rounded-md min-h-screen ">
                <div className="flex justify-between border items-center mb-4">
                    <div className="flex gap-4 items-center">
                        <div className="bg-gray-200 rounded-full p-2 flex justify-center items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                 stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"/>
                            </svg>

                        </div>
                        <div>
                            <p className="text-sm font-medium  text-gray-400">create new meal plan</p>
                            <h1 className="text-lg leading ">Healthy Diet</h1>
                        </div>
                    </div>
                    <div>
                        <button
                            className="px-4 py-1 border bg-green-400 text-white rounded-lg hover:bg-green-500 transition transition-all duration-150"
                                onClick={openAddAnnouncementModal}
                        >
                            Create new Healthy Meal Plan
                        </button>
                    </div>
                </div>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-bold text-green-700 uppercase tracking-wider">Ty</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-green-700 uppercase tracking-wider">Announcement</th>
                        <th className="px-6 py-3 text-center text-xs font-bold text-green-700 uppercase tracking-wider"></th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                    {announcements.length === 0 ? (
                        <tr>
                            <td colSpan="3" className="px-6 py-12 text-center text-gray-500">
                                <div className="flex flex-col items-center">
                                    <EmptyState
                                        title="No Meals Yet"
                                        description="Click below to get started on creating meal plan."
                                        actionLabel="Create Announcement"
                                        onActionClick={() => console.log("Clicked!")}
                                    />
                                </div>
                            </td>
                        </tr>
                    ) : (
                        announcements.map((announcement) => (
                            <tr key={announcement.id}>
                                <td>
                                    { dayjs(announcement.created_at).format('MMMM D, YYYY') }
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900">

                                            <div className="font-semibold">{announcement.title}</div>
                                            <div className="text-gray-500 text-sm">
                                                <div dangerouslySetInnerHTML={{ __html: announcement.description }} />
                                            </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900">{announcement.content}</td>
                            </tr>
                        ))
                    )}
                    </tbody>

                </table>

            </div>
        </WorkerLayout>
    )
}

export default MealIndex
