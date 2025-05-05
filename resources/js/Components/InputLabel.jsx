export default function InputLabel({
    value,
    className = '',
    children,
    ...props
}) {
    return (
        <label
            {...props}
            className={
                `block text-sm md:text-md lg:text-lg font-medium text-gray-500 dark:text-gray-00 ` +
                className
            }
        >
            {value ? value : children}
        </label>
    );
}
