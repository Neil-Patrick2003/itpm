    import WorkerLayout from "@/Layouts/WorkerLayout.jsx";
    import React, {useState} from "react";
    import EmptyState from "@/Components/EmptyState.jsx";
    import {map} from "framer-motion/m";
    import {motion} from "framer-motion";
    import {Link, useForm} from "@inertiajs/react";
    import {PlusIcon} from "@heroicons/react/20/solid/index.js";
import Modal from "@/Components/Modal.jsx";
    const RecordPerProgram = ({program, records}) => {

        console.log(records);
        const { data, setData, post, processing, errors, reset } = useForm({
            height: '',
            weight: '',
        })


        const [selectedRecord, setSelectedRecord] = useState(null);

        const [openAddRecord, setOpenAddRecord] = useState(false);

        const openAddRecordModal = (record) => {
            setSelectedRecord(record);
            setOpenAddRecord(true);
        };

        const closeAddRecordModal = () => {
            setOpenAddRecord(false);
            setSelectedRecord(null);
            reset('height', 'weight');
        }

        function updateRecord(e) {
            e.preventDefault();

            post(`/health_workers/records/${program.id}/add_record/${selectedRecord.id}`, {
                onSuccess: () => {
                    closeAddRecordModal();
                    reset(); // This resets all fields defined in useForm
                }
            });
        }

        const calculateAge = (birthdate) => {
            const birthDate = new Date(birthdate);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDifference = today.getMonth() - birthDate.getMonth();

            // Adjust age if the birthday hasn't occurred yet this year
            if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            return age;
        };


        return (
            <WorkerLayout>
                <Modal show={openAddRecord} onClose={closeAddRecordModal} maxWidth="sm" className="bg-white rounded-md border border-gray-200 ">

                    <form onSubmit={updateRecord} className="p-6 space-y-4">
                        <h2 className="text-xl font-semibold text-gray-800">Add Record</h2>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Height (cm)</label>
                            <input
                                type="number"
                                name="height"
                                value={data.height}
                                onChange={(e) => setData('height', e.target.value)}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                            />
                            {errors.height && <p className="text-sm text-red-600">{errors.height}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
                            <input
                                type="number"
                                name="weight"
                                value={data.weight}
                                onChange={(e) => setData('weight', e.target.value)}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                            />
                            {errors.weight && <p className="text-sm text-red-600">{errors.weight}</p>}
                        </div>

                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={closeAddRecordModal}
                                className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700"
                                disabled={processing}
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </Modal>


                eto ba


                <div className="flex flex-col gap-4" >
                        <div className="flex items-center border border-gray-200 rounded-md justify-center bg-white w-full py-4">
                            <img
                                src={`/storage/${program.program_background_url}`}
                                className="w-1/3 max-h-64 object-contain rounded-md "
                                alt="program background"
                            />
                        </div>
                    <div className="p-4 border border-gray-200 rounded-md">
                        <h1 className="text-2xl font-semibold text-gray-800">{program.title}</h1>
                        <p className="text-gray-500 mt-4 text-base">{program.description}</p>
                    </div>
                </div>
                <div className="flex my-4 justify-center">
                    <Link href={`/health_workers/records/${program.id}/add_record`}>
                        <button className="flex items-center gap-2 px-2 text-sm md:text-md py-1 md:px-4 md:py-2 bg-[#7BDC9F] hover:bg-green-600 text-white rounded-md shadow">
                            <PlusIcon className="h-5 w-5" /> Add New Record
                        </button>
                    </Link>
                </div>

                <div className="overflow-auto  h-full rounded-md border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-green-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-bold text-green-700 uppercase tracking-wider" scope="col">Id</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-green-700 uppercase tracking-wider" scope="col">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-green-700 uppercase tracking-wider" scope="col">Age</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-green-700 uppercase tracking-wider" scope="col">Gender</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-green-700 uppercase tracking-wider" scope="col">Weight</th>
                            <th className="px-6 py-3 text-center text-xs font-bold text-green-700 uppercase tracking-wider" scope="col">Height</th>
                            <th className="px-6 py-3 text-center text-xs font-bold text-green-700 uppercase tracking-wider" scope="col">Action</th>

                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white w-full">
                        {}
                        {records.length === 0 ? (
                            <EmptyState title="No records yet" description="Add new record here and start improving health" />
                        ): (
                            records.map((child) => (
                                <tr key={child.id} >
                                    <td className="px-6 py-4 text-sm text-gray-700">{child.id}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">
                                        <div className="flex items-center gap-3">
                                            <div>
                                                <div className="font-semibold">{child.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        <div>{calculateAge(child.birth_date)} years old</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{child.gender}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {child.latest_record.weight} kg
                                    </td>
                                    <td className="px-6 py-4 flex justify-center gap-3 text-gray-600">
                                        {child.latest_record.height} cm

                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        <button
                                            onClick={() => openAddRecordModal(child.latest_record)} // Pass the record
                                            className="flex gap-2 bg-[#01DAA2] rounded-md px-4 py-2 text-white hover:bg-green-400"
                                        >
                                            Edit Record
                                        </button>
                                    </td>

                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>
            </WorkerLayout>
        )
    }


    export default RecordPerProgram
