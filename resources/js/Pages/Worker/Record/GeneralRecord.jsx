import WorkerLayout from "@/Layouts/WorkerLayout.jsx";
import DynamicEmptyEstate from "@/Components/DynamicEmptyEstate.jsx";
import {Link} from "@inertiajs/react";

const GeneralRecord = ({ programs, records }) => {
    const hasData = records?.data?.length > 0;

    console.log(records);

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
        <WorkerLayout>
            <div className=" p-4 mt-8">
                <div className="flex justify-end">
                    <Link href="/health_workers/records/general/new_record" className="flex gap-2 items-center">
                        <button className="border px-4 py-2 bg-green-500 rounded-md">Add new Record</button>
                    </Link>

                </div>

                {!hasData ? (
                    <DynamicEmptyEstate
                        title="No records yet"
                        description="Add new record here and start improving health"
                        icon={null}
                        logo={null}
                        actionLabel="Add New Record"
                        onActionClick={() => {
                            // Add record logic
                        }}
                    />
                ) : (
                    <div className="flow-root">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                <div className="overflow-hidden shadow-sm ring-1 ring-black/5 sm:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-300">
                                        <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6">Children Name</th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Age</th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Gender</th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Height</th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Weight</th>


                                            <th scope="col" className="relative py-3.5 pr-4 pl-3 sm:pr-6">
                                                <span className="sr-only">Edit</span>
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                        {records.data.map((record) => (
                                            <tr key={record.id}>
                                                <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">
                                                    {record.name}
                                                </td>
                                                <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">{calculateAge(record.birth_date)} years old</td>
                                                <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">{record.gender}</td>
                                                <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                                                    {record.latest_record && record.latest_record.height
                                                        ? record.latest_record.height
                                                        : 'N/A'}
                                                </td>
                                                <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                                                    {record.latest_record && record.latest_record.height
                                                        ? record.latest_record.weight
                                                        : 'N/A'}
                                                </td>
                                                <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">

                                                </td>

                                                <td className="relative py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-6">
                                                    <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                                        Edit<span className="sr-only">, {record.name}</span>
                                                    </a>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </WorkerLayout>
    );
};

export default GeneralRecord;
