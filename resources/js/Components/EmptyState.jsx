import React from "react";

export default function EmptyState({
                                       title,
                                       description,
                                       icon: Icon,
                                       logo,
                                       actionLabel,
                                       onActionClick,
                                   }) {
    return (
        <div className="flex justify-center items-center py-20 px-4">
            <div className="group border-4 border-dashed border-gray-300 rounded-2xl p-10 max-w-xl w-full text-center shadow-md bg-white ">
                {/*hover:shadow-xl transition-all duration-300 ease-in-out hover:border-green-400*/}
                {logo ? (
                    <img src={logo} alt="Logo" className="w-20 h-20 mx-auto mb-4 rounded-full" />
                ) : Icon ? (
                    <Icon className="w-16 h-16 text-gray-400 mx-auto mb-4 group-hover:text-green-500 transition duration-300" />
                ) : null}

                <h2 className="text-2xl font-semibold text-gray-700 mb-2 group-hover:text-green-600 transition">
                    {title}
                </h2>
                <p className="text-gray-500 text-base mb-6">{description}</p>

                {actionLabel && onActionClick && (
                    <button
                        onClick={onActionClick}
                        className="mt-2 px-6 py-2 text-sm font-medium rounded-lg bg-green-500 text-white hover:bg-green-600 transition"
                    >
                        {actionLabel}
                    </button>
                )}
            </div>
        </div>
    );
}
