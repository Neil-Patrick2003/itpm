export default function Role({ data, setData }) {
    return (
        <div className=" flex flex-col justify-first my-4">
            <div className="flex flex-col gap-2 ">
                <label htmlFor="firstName" className="text-left text-gray-600 ">First Name</label>
                <select className="border border-gray-300 text-slate-400"
                    required
                    value={data.role}
                    onChange={(e) => setData('role', e.target.value)}
                >
                    <option>--please select--</option>
                    <option value="Admin">Admin</option>
                    <option value="health_worker">Health Worker</option>
                    <option value="parent">Parent</option>
                </select>
            </div>
            <hr className="my-4" />
            <p className="text-sx text-gray-600">if health worker please select assign area.</p>
            <div className="flex flex-col gap-2">
                <label htmlFor="firstName" className="text-left text-gray-600 ">Assign Area</label>
                <input
                    id="firstName"
                    type="text"
                    required
                    value={data.assign_address}
                    onChange={(e) => setData('assign_address', e.target.value)}
                    className="border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-green-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-green-600 dark:focus:ring-green-600"
                />
            </div>


        </div>
    )
}
