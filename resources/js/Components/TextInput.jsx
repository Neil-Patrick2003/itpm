import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, icon: Icon, ...props },
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <div className="relative w-full">
            <input
                {...props}
                type={type}
                className={`rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-green-500 
                dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-green-600 
                dark:focus:ring-green-600 ${Icon ? 'pr-10' : ''} ` + className}
                ref={localRef}
            />
            {Icon && (
                <div className="absolute inset-y-0 right-3 flex items-center text-gray-400">
                    <Icon className="w-5 h-5" />
                </div>
            )}
        </div>
    );
});
