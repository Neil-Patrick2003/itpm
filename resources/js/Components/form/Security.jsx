export default function Security({ data, setData }) {
    return (
        <div className=" flex flex-col justify-first my-4">
            <div className="flex flex-col gap-2 ">
                <label htmlFor="email" className="text-left text-gray-600 ">Email</label>
                <input
                    id="email"
                    type="email"
                    required
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    className="border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-green-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-green-600 dark:focus:ring-green-600"
                />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="password" className="text-left text-gray-600 ">Password</label>
                <input
                    id="password"
                    type="password"
                    required
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    className="border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-green-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-green-600 dark:focus:ring-green-600"
                />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="confirm_password" className="text-left text-gray-600 ">Confirm Password</label>
                <input
                    id="confirm_password"
                    type="password"
                    required
                    value={data.confirm_password}
                    onChange={(e) => setData('confirm_password', e.target.value)}
                    className="border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-green-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-green-600 dark:focus:ring-green-600"
                />
            </div>
        </div>
    )
}
