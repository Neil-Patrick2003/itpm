import WorkerLayout from "@/Layouts/WorkerLayout.jsx";
import { useForm } from "@inertiajs/react";
import { InputLabel } from "@mui/material";
import InputError from "@/Components/InputError.jsx";
import recording from '../../../../assets/image/recording.png';

const CreateProgramRecord = () => {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        birth_date: '',
        gender: '',
        weight: '',
        height: '',
        address: '',
        parent_name: '',
        parent_age: '',
        email: '',
        phone_number: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/health_workers/records/create');
    };

    return (
        <WorkerLayout>
            <div className="p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Create Program Record</h1>

                <div className="flex flex-col md:flex-row border border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden">
                    {/* Sidebar */}
                    <div className="w-full md:w-1/3 bg-gradient-to-b from-[#66CA6A] to-[#3BA77C] p-6 border-b md:border-b-0 md:border-r border-gray-200 flex flex-col items-center justify-center">
                        <img
                            src={recording}
                            alt="Illustration"
                            className="w-48 h-48 object-contain mb-4"
                        />
                        <h2 className="text-xl font-semibold text-white mb-2">Personal Details</h2>
                        <p className="text-sm text-white/80 text-center">
                            Please fill in the child's information and contact details.
                        </p>
                    </div>

                    {/* Form */}
                    <div className="w-full p-6">
                        <form onSubmit={submit} className="flex flex-col gap-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField label="Full Name" id="name" value={data.name} onChange={e => setData('name', e.target.value)} error={errors.name} />
                                <FormField label="Birth Date" id="birth_date" type="date" value={data.birth_date} onChange={e => setData('birth_date', e.target.value)} error={errors.birth_date} />

                                <div className="flex flex-col">
                                    <InputLabel htmlFor="gender" className="text-[#67c4c1] font-medium">Gender</InputLabel>
                                    <select
                                        id="gender"
                                        value={data.gender}
                                        onChange={e => setData('gender', e.target.value)}
                                        className="w-full mt-1 py-2 px-3 bg-gray-200 text-gray-700 border-0 border-b-2 border-b-gray-300 focus:border-b-[#66CA6A] focus:outline-none focus:ring-0"
                                    >
                                        <option value="">Select gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                    <InputError message={errors.gender} className="mt-1" />
                                </div>

                                <FormField label="Weight (kg)" id="weight" type="number" value={data.weight} onChange={e => setData('weight', e.target.value)} error={errors.weight} />
                                <FormField label="Height (cm)" id="height" type="number" value={data.height} onChange={e => setData('height', e.target.value)} error={errors.height} />
                                <FormField label="Parent's Name" id="parent_name" value={data.parent_name} onChange={e => setData('parent_name', e.target.value)} error={errors.parent_name} />
                                <FormField label="Address" id="address" value={data.address} onChange={e => setData('address', e.target.value)} error={errors.address} />
                                <FormField label="Parent's Age" id="parent_age" type="number" value={data.parent_age} onChange={e => setData('parent_age', e.target.value)} error={errors.parent_age} />
                                <FormField label="Email" id="email" type="email" value={data.email} onChange={e => setData('email', e.target.value)} error={errors.email} />
                                <FormField label="Phone Number" id="phone_number" value={data.phone_number} onChange={e => setData('phone_number', e.target.value)} error={errors.phone_number} />
                            </div>

                            <div className="flex justify-end mt-4">
                                <button
                                    type="submit"
                                    className="w-full md:w-1/3 py-2 bg-[#66CA6A] text-white font-semibold rounded-md hover:bg-[#5bb85c] transition-colors disabled:opacity-50"
                                    disabled={processing}
                                >
                                    {processing ? 'Submitting...' : 'Submit'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </WorkerLayout>
    );
};

// Reusable input field component
const FormField = ({ label, id, type = "text", value, onChange, error }) => (
    <div className="flex flex-col">
        <InputLabel htmlFor={id} className="text-[#67c4c1] font-medium">{label}</InputLabel>
        <input
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            className="w-full mt-1 py-2 px-3 bg-gray-200 text-gray-700 border-0 border-b-2 border-b-gray-300 focus:border-b-[#66CA6A] focus:outline-none focus:ring-0"
        />
        <InputError message={error} className="mt-1" />
    </div>
);

export default CreateProgramRecord;
