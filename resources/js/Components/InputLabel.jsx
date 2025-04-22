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
                `block text:sm md:text-md lg:text-lg font-medium text-gray-700 dark:text-gray-300 ` +
                className
            }
        >
            {value ? value : children}
        </label>
    );
}
