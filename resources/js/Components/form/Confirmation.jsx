export default function Confirmation({ data, setData }) {
    return (
        <div className="p-6 bg-white rounded-2xl border max-w-xl mx-auto">
            <h1 className="text-2xl font-bold text-green-600 mb-6 text-center">
                Please Review User Details
            </h1>

            <div className="space-y-4 text-gray-700">
                <p><span className="font-semibold text-green-700">Name:</span> {data.name}</p>
                <p><span className="font-semibold text-green-700">Email:</span> {data.email}</p>
                <p><span className="font-semibold text-green-700">Phone:</span> {data.phone}</p>
                <p><span className="font-semibold text-green-700">Address:</span> {data.address}</p>
                <p><span className="font-semibold text-green-700">Role:</span> {data.role}</p>
                <p><span className="font-semibold text-green-700">Assign Area:</span> {data.assign_address || 'None'}</p>
                <p><span className="font-semibold text-green-700">Password:</span> {data.password}</p>
            </div>
        </div>
    );
}
