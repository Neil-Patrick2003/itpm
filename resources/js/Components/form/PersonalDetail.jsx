export default function PersonalDetail({ data, setData }) {
    return (
        <div className=" flex flex-col justify-first my-4">
            <div className="flex flex-col gap-2 ">
                <label htmlFor="name" className="text-left text-gray-600 ">First Name</label>
                <input
                    id="name"
                    type="text"
                    required
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    className="border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-green-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-green-600 dark:focus:ring-green-600"
                />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="address" className="text-left text-gray-600 ">Address</label>
                <input
                    id="address"
                    type="text"
                    required
                    value={data.address}
                    onChange={(e) => setData('address', e.target.value)}
                    className="border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-green-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-green-600 dark:focus:ring-green-600"
                />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="phone" className="text-left text-gray-600 ">Phone Number</label>
                <input
                    id="phone"
                    type="number"
                    required
                    value={data.phone}
                    onChange={(e) => setData('phone', e.target.value)}
                    className="border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-green-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-green-600 dark:focus:ring-green-600"
                />
            </div>
        </div>
    );
}
