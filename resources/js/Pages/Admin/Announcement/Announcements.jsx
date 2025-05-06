import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {MegaphoneIcon} from "@heroicons/react/24/solid";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import {FaEdit} from "react-icons/fa";
import {MdDeleteForever} from "react-icons/md";
import {GrFormView} from "react-icons/gr";
import React, {useState} from "react";
import Editor from 'react-simple-wysiwyg';
import EmptyState from "@/Components/EmptyState.jsx";
import Modal from "@/Components/Modal.jsx";
import {useForm} from "@inertiajs/react";
import dayjs from "dayjs";

export default function Announcements({ announcements, search = '', page = 1  }) {


    const [description, setDescription] = useState('my <b>HTML</b>');
    const { data, setData, post, loading, error, processing, reset } = useForm({
        title: '',
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

        post('/announcements', {
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
        <AuthenticatedLayout>
            <Modal show={openAddAnnouncement} onClose={closeAddAnnouncementModal} maxWidth="2xl">
                <div className="flex flex-col gap-4 p-6 space-y-4 rounded-lg bg-white z-50 relative">
                    <h1 className="text-2xl font-bold text-gray-800">Create New Announcement</h1>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
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
                            <MegaphoneIcon className="h-12 w-12  text-green-500 r" />
                        </div>
                        <div>
                            <p className="text-sm font-medium  text-gray-400">create new announcement</p>
                            <h1 className="text-lg leading ">Announcements</h1>
                        </div>
                    </div>
                    <div>
                        <button className="px-4 py-1 border bg-green-400 text-white rounded-lg hover:bg-green-500 transition transition-all duration-150"
                                onClick={openAddAnnouncementModal}
                        >
                            Create new Announcement
                        </button>
                    </div>
                </div>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-bold text-green-700 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-green-700 uppercase tracking-wider">Announcement</th>
                        <th className="px-6 py-3 text-center text-xs font-bold text-green-700 uppercase tracking-wider"></th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                    {announcements.data.length === 0 ? (
                        <tr>
                            <td colSpan="3" className="px-6 py-12 text-center text-gray-500">
                                <div className="flex flex-col items-center">
                                    <EmptyState
                                        title="No Announcements Yet"
                                        description="Click below to get started on creating announcements."
                                        icon={MegaphoneIcon}
                                        actionLabel="Create Announcement"
                                        onActionClick={() => console.log("Clicked!")}
                                    />
                                </div>
                            </td>
                        </tr>
                    ) : (
                        announcements.data.map((announcement) => (
                            <tr key={announcement.id}>
                                <td>
                                    { dayjs(announcement.created_at).format('MMMM D, YYYY') }
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900">
                                    <div className="flex items-center gap-3">
                                        <div className="shrink-0">
                                            {announcement.user.profile_photo_url ? (
                                                <img
                                                    src={imageUrl + announcement.user.profile_photo_url}
                                                    alt={announcement.user.name}
                                                    className="rounded-full w-12 h-12 object-cover"
                                                />
                                            ) : (
                                                <Avatar {...stringAvatar(announcement.user.name)} sx={{ width: 48, height: 48 }} />
                                            )}
                                        </div>
                                        <div>
                                            <div className="font-semibold">{announcement.title}</div>
                                            <div className="text-gray-500 text-sm">
                                                <div dangerouslySetInnerHTML={{ __html: announcement.description }} />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900">{announcement.content}</td>
                            </tr>
                        ))
                    )}
                    </tbody>

                </table>

            </div>
        </AuthenticatedLayout>
    )
}
