import WorkerLayout from "@/Layouts/WorkerLayout.jsx";
import boy1 from "../../../../assets/image/Avatar/boys/boy1.png";
import {
    EnvelopeIcon,
    MapPinIcon,
    PhoneIcon,
    UsersIcon
} from "@heroicons/react/20/solid/index.js";
import { LineChart } from "@mui/x-charts/LineChart";
import React, { useEffect, useState } from "react";
import Modal from "@/Components/Modal.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import {FaPlusCircle, FaRulerVertical, FaUser, FaWeight} from "react-icons/fa";
import InputError from "@/Components/InputError.jsx";
import {useForm} from "@inertiajs/react";
import { BarChart } from '@mui/x-charts';

const ShowChildrenRecord = ({ child, growthData, recent_record }) => {
    const xLabels = growthData.map(item => item.date);
    const heightData = growthData.map(item => item.height);
    const weightData = growthData.map(item => item.weight);
    const [ isUpdatigRecordOpen, setIsUpdatigRecordOpen ] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        weight: '',
        height: '',
    })

    const openUpdateRecordModal = () => {
        setIsUpdatigRecordOpen(true);
    }

    const closeUpdateRecordModal = () => {
        setIsUpdatigRecordOpen(false);
    }

    const [chartWidth, setChartWidth] = useState(
        typeof window !== "undefined" ? (window.innerWidth > 768 ? 700 : window.innerWidth - 40) : 700
    );

    useEffect(() => {
        const handleResize = () => {
            const newWidth = window.innerWidth > 768 ? 700 : window.innerWidth - 40;
            setChartWidth(newWidth);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);


    function submitRecord(e) {
        e.preventDefault();

        post(`/health_workers/beneficiary/${child.id}`, {
            onSuccess: () => {
                setIsUpdatigRecordOpen(false)
                reset([
                    'weight',
                    'height',
                ])
            },
            onError: () => {
                // optional: handle validation errors if needed
            }
        });
    }


    return (
        <WorkerLayout>
            <Modal show={isUpdatigRecordOpen} onClose={closeUpdateRecordModal} maxWidth="xl">
                <div className="p-6 bg-white rounded space-y-6">
                    <form className="space-y-5" onSubmit={submitRecord}>
                        {/* Title with Icon */}
                        <div className="flex items-center gap-2">
                            <FaPlusCircle className="text-green-600 text-xl" />
                            <h2 className="text-xl font-bold">Add New Record</h2>
                        </div>

                        {/* Height Field */}
                        <div>
                            <InputLabel htmlFor="height" value="Height (cm)" />
                            <TextInput
                                id="height"
                                name="height"
                                value={data.height}
                                className="mt-1 block w-full"
                                autoComplete="off"
                                onChange={(e) => setData("height", e.target.value)}
                                required
                                icon={FaRulerVertical}
                            />
                            <InputError message={errors.height} className="mt-2" />
                        </div>

                        {/* Weight Field */}
                        <div>
                            <InputLabel htmlFor="weight" value="Weight (kg)" />
                            <TextInput
                                id="weight"
                                name="weight"
                                value={data.weight}
                                className="mt-1 block w-full"
                                autoComplete="off"
                                onChange={(e) => setData("weight", e.target.value)}
                                required
                                icon={FaWeight}
                            />
                            <InputError message={errors.weight} className="mt-2" />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end gap-3 pt-4">
                            <button
                                type="button"
                                className="px-4 py-2 border border-gray-300 text-green-800 rounded hover:bg-gray-100 transition"
                                onClick={closeUpdateRecordModal}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500 transition"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>

            <div className="grid  grid-cols-1 mt-4  md:grid-cols-4 gap-4 ">
                {/* 👤 Child Profile Card */}
                <div className="col-span-1 md:col-span-3 bg-green-50 border-2 border-green-100 rounded-lg p-4  ">
                    <div className="flex flex-col gap-4 items-center">
                        <img
                            src={boy1}
                            alt="Avatar"
                            className="h-32 w-32 object-cover rounded-full border border-green-200"
                        />

                        <div className="flex flex-col md:flex-row border bg-gradient-to-br from-green-300 to-green-400 w-full gap-4 p-4 rounded-md">
                            <div className="flex-1">
                                <div className="flex justify-between items-center flex-wrap gap-2">
                                    <h1 className="text-xl md:text-2xl font-bold ">{child.name}</h1>
                                    <span className="text-sm ">#{child.id}</span>
                                </div>
                                <p className="text-xs  mt-1">Created at: {child.created_at}</p>
                            </div>
                            <div className="flex flex-wrap gap-2 md:gap-4 items-center">
                                <span className="bg-green-100 text-green-700 rounded-full px-4 py-1 text-sm font-medium">
                                    {child.gender}
                                </span>
                                <span className="bounce bg-green-100 text-green-700 rounded-full px-4 py-1 text-sm font-medium">
                                    BMI: {recent_record ? parseFloat(recent_record.bmi).toFixed(2) : 'N/A'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <hr className="my-4" />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-green-600">
                        <div className="flex gap-2">
                            <UsersIcon className="h-5 w-5 text-green-500" />
                            <div>
                                <p className="text-gray-400">Parent</p>
                                <p className="text-green-600 text-base font-semibold">{child.parent.name}</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <MapPinIcon className="h-5 w-5 text-green-500" />
                            <div>
                                <p className="text-gray-400">Address</p>
                                <p className="text-green-600 text-base font-semibold">{child.parent.address}</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <PhoneIcon className="h-5 w-5 text-green-500" />
                            <div>
                                <p className="text-gray-400">Phone</p>
                                <p className="text-green-600 text-base font-semibold">{child.parent.phone}</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <EnvelopeIcon className="h-5 w-5 text-green-500" />
                            <div>
                                <p className="text-gray-400">Email</p>
                                <p className="text-green-600 text-base font-semibold">{child.parent.email}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Programs + Health Record */}
                <div className="col-span-1 md:col-span-1 bg-green-50 border-2 border-green-100 rounded-lg flex flex-col gap-4">
                    {/* 🩺 Latest Health Record */}
                    <div className="w-full  rounded-lg h-full p-4 md:p-6 drop-shadow-md">
                        <h2 className="text-xl font-semibold text-green-600 mb-4">Latest Health Record</h2>
                        {recent_record ? (
                            <div className="space-y-2 text-gray-700 text-sm">
                                <p><span className="font-medium">Height:</span> {recent_record.height} cm</p>
                                <p><span className="font-medium">Weight:</span> {recent_record.weight} kg</p>
                                <p><span className="font-medium">BMI:</span> {parseFloat(recent_record.bmi).toFixed(2)}</p>
                                <p><span className="font-medium">Recorded On:</span> {new Date(recent_record.created_at).toLocaleDateString("en-US", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric"
                                })}</p>

                            </div>
                        ) : (
                            <p className="text-gray-400 text-sm">No health record available.</p>
                        )}
                            <button onClick={openUpdateRecordModal} className="bg-green-600 text-white rounded-md px-4 py-2 mt-4">Update record</button>
                    </div>
                </div>
                <div className="col-span-1 md:col-span-1 flex flex-col gap-4 ">
                    {/* 🧩 Child Programs */}
                    <div className="w-full h-full  rounded-lg bg-green-50 border-2 border-green-100 p-4 md:p-6">
                        <h2 className="text-xl font-semibold text-green-600 mb-2">Child Programs</h2>
                        {child.program?.length > 0 ? (
                            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                                {child.program.map((item) => (
                                    <li key={item.id}>{item.title}</li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-400 text-sm">No programs assigned.</p>
                        )}
                    </div>
                </div>

                {/* 📈 Growth Chart */}
                <div className="col-span-1 md:col-span-3 bg-green-50 border-2 border-green-100   rounded-lg p-4 md:p-6 shadow-sm overflow-x-auto">
                    <h2 className="text-xl font-semibold text-green-600 mb-4">Growth Chart</h2>
                    <div className="min-w-[300px] md:min-w-0">
                        <BarChart
                            xAxis={[{ data:xLabels, scaleType: 'band', label: 'Date' }]}
                            series={[
                                { data: heightData, label: 'Height (cm)', color: '#84E99B' },
                                { data: weightData, label: 'Weight (kg)', color: '#5DA44A' },
                            ]}
                            height={250}
                        />

                    </div>

                </div>
            </div>
        </WorkerLayout>
    );
};

export default ShowChildrenRecord;
