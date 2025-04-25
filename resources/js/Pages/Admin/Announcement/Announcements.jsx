import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {MegaphoneIcon} from "@heroicons/react/24/solid";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import {FaEdit} from "react-icons/fa";
import {MdDeleteForever} from "react-icons/md";
import {GrFormView} from "react-icons/gr";
import React, {useState} from "react";
import WysiwygEditor from "@/Components/form/WysiwygEditor.jsx";
import EmptyState from "@/Components/EmptyState.jsx";

export default function Announcements({ announcements, search = '', page = 1  }) {

    const [content, setContent] = useState("");

    const handleSubmit = () => {
        console.log("Content:", content);
    };

    return (
        <AuthenticatedLayout>
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
                        <button className="px-4 py-1 border bg-green-400 text-white rounded-lg hover:bg-green-500 transition transition-all duration-150">
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
                                            <div className="font-semibold">{announcement.user.name}</div>
                                            <div className="text-gray-500 text-sm">{announcement.user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900">{announcement.content}</td>
                                <td className="px-6 py-4 flex justify-center gap-3 text-gray-600">
                                    <Tooltip title="Edit User" arrow>
                                        <button>
                                            <FaEdit className="w-5 h-5 hover:text-green-600 transition" />
                                        </button>
                                    </Tooltip>
                                    <Tooltip title="Delete User" arrow>
                                        <button>
                                            <MdDeleteForever className="h-6 w-6 text-red-500 hover:text-red-600 transition" />
                                        </button>
                                    </Tooltip>
                                    <Tooltip title="View Details" arrow>
                                        <button>
                                            <GrFormView className="w-8 h-8 text-blue-500 hover:text-blue-600 transition" />
                                        </button>
                                    </Tooltip>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>

                </table>
                <WysiwygEditor value={content} onChange={setContent} />
                <button
                    onClick={handleSubmit}
                    className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >submit</button>
            </div>
        </AuthenticatedLayout>
    )
}
