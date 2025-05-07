import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {ChevronRightIcon, HomeIcon} from "@heroicons/react/20/solid/index.js";
import React from "react";
import children from "@/Pages/Admin/Children/Children.jsx";
import {Link} from "@inertiajs/react";
import Avatar from "@mui/material/Avatar";

const  ChildrensProfile = ({childrens}) => {

    // declaration of page
    const pages = [
        { name: 'Children', href: '/childrens', current: false },
        { name: 'Beneficiary', href: '/childrens/beneficiary', current: true },
        { name: 'Profile', href: '/childrens/beneficiary/profiles', current: true },
    ];

    const stringAvatar = (name) => {
        const nameSplit = name.trim().split(' ');
        const initials = nameSplit.length > 1
            ? `${nameSplit[0][0]}${nameSplit[1][0]}`
            : `${nameSplit[0][0]}`;
        return {
            sx: { bgcolor: '#43e5a2' },
            children: initials.toUpperCase(),
        };
    };


    return (
        <AuthenticatedLayout>
            {/*//the nav in the tap */}
            <nav className="flex" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-4">
                    <li>
                        <a href="#" className="text-gray-400 hover:text-gray-500">
                            <HomeIcon className="h-5 w-5" />
                            <span className="sr-only">Home</span>
                        </a>
                    </li>
                    {pages.map((page) => (
                        <li key={page.name}>
                            <div className="flex items-center">
                                <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                                <a
                                    href={page.href}
                                    className="ml-4 text-sm font-medium text-green-700 hover:text-green-900"
                                    aria-current={page.current ? 'page' : undefined}
                                >
                                    {page.name}
                                </a>
                            </div>
                        </li>
                    ))}
                </ol>
            </nav>

            <div className="grid mt-4 sm:grid-cols-1 gap-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
                {childrens.data.map((children) => (
                    <div key={children.id} id={`children-${children.id}`} className="border bg-white rounded-lg">
                        <div className="flex border justify-center items-center py-16">
                            <Avatar {...stringAvatar(children.name)} sx={{ width: 80, height: 80, mx: 'auto' }} />










                        </div>
                        <div className="flex flex-col justify-between py-2 px-4">
                            <div>
                                <h1>{children.name}</h1>
                                <p className="text-left text-xs font-medium text-gray-700">Address</p>
                            </div>

                            <Link
                                href={'/childrens/profile/' + children.id}

                                className="inline-flex justify-center mt-2 items-center gap-1 border w-full border-green-500 text-green-600 bg-green-50 hover:bg-green-100 hover:text-green-700 font-medium text-sm px-3 py-1.5 rounded-md transition-colors duration-150"
                            >
                                View Profile
                            </Link>

                        </div>
                    </div>
                ))}
            </div>
        </AuthenticatedLayout>
    )
}

export default ChildrensProfile;
