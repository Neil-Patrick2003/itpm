import React from 'react'
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {ChevronRightIcon, HomeIcon} from "@heroicons/react/20/solid/index.js";
import {Link} from "@inertiajs/react";

const AllBeneficiary = ( { childrens } ) => {
    const pages = [
        { name: 'All Beneficiary', href: '/childrens/beneficiary', current: false },
    ];

    //calculate age from birthdate
    const calculateAge = (birthday) => {
        const birthDate = new Date(birthday);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };


  return (
    <AuthenticatedLayout>
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
        <div className="overflow-hidden mt-4 bg-white shadow ring-1 ring-black/5 rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-green-50">
                <tr>
                    <th className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-600 sm:pl-6">Name</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-600">Age</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-600">Gender</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-600">Status</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-600">Address</th>
                    <th className="py-3.5 pr-4 pl-3 sm:pr-6 text-right text-sm font-semibold text-gray-600"></th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                {childrens.data.length === 0 ? (
                    <tr>
                        <td colSpan="5" className="text-center py-6 text-gray-500">
                            No beneficiaries found.
                        </td>
                    </tr>
                ) : (
                    childrens.data.map((children) => (
                        <tr key={children.id}>
                            <td className="py-4 pr-3 pl-4 text-sm font-medium text-gray-900 sm:pl-6">
                                {children.name}
                            </td>
                            <td className="px-3 py-4 text-sm text-gray-500">
                                {calculateAge(children.birth_date)} years
                            </td>
                            <td className="px-3 py-4 text-sm text-gray-500">{children.gender}</td>
                            <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                                {children.bmi ? (
                                    children.bmi < 18.5 ? (
                                        <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium">
                                                Underweight
                                            </span>
                                    ) : children.bmi < 25 ? (
                                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                                             Normal
                                            </span>
                                    ) : children.bmi < 30 ? (
                                        <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs font-medium">
                                                Overweight
                                              </span>
                                    ) : (
                                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-medium">
                                            Obese
                                          </span>
                                    )
                                ) : (
                                    <span className="text-gray-400 italic">N/A</span>
                                )}
                            </td>

                            <td className="flex gap-2 px-3 py-4 text-sm text-gray-500">
                                {children.program.map((program) => (
                                    <p className="flex flex-row" key={program.id}>{program.title}.</p>
                                ))}
                            </td>



                            <td className="py-4 pr-4 pl-3 sm:pr-6 text-right">
                                <button
                                    onClick={() => openProfile(children)}
                                    className="inline-flex items-center gap-1 border border-green-500 text-green-600 bg-green-50 hover:bg-green-100 hover:text-green-700 font-medium text-sm px-3 py-1.5 rounded-md transition-colors duration-150"
                                >
                                    View Profile
                                </button>
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>

        {/* Pagination */}
        <div className="flex gap-2 justify-end mt-4 items-center">
            {childrens.links.map((link) =>
                link.url ? (
                    <Link
                        key={link.label}
                        href={link.url}
                        className={`p-2 px-4 text-sm font-medium rounded-md ${
                            link.active
                                ? 'bg-green-600 text-white font-bold hover:bg-green-500'
                                : 'bg-white text-gray-700 hover:bg-green-50'
                        } border border-gray-300 shadow-md transition-all duration-200`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                ) : (
                    <span
                        key={link.label}
                        className="p-2 px-4 text-sm font-medium text-slate-400 cursor-not-allowed bg-white border border-gray-300 shadow-md rounded-md"
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                )
            )}
        </div>
    </AuthenticatedLayout>
  )
}

export default AllBeneficiary
