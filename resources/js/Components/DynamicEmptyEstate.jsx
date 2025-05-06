import React from "react";
import { motion } from "framer-motion";

const DynamicEmptyEstate = ({
                        title = "Nothing here yet",
                        subtitle = "There's no data to show right now.",
                        buttonText = "Take Action",
                        iconComponent: Icon, // Optional React icon component
                        svgPath,             // Optional SVG path if no component
                        onClick,
                        actionLink
                    }) => {
    return (
        <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="col-span-full text-center py-12 text-gray-500"
        >
            <div className="flex flex-col items-center space-y-4">
                {/* Show icon component if provided */}
                {Icon && <Icon className="w-12 h-12 text-green-300" />}

                {/* Or SVG path fallback */}
                {!Icon && svgPath && (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-12 h-12 text-green-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d={svgPath}
                        />
                    </svg>
                )}

                <p className="text-lg font-medium">{title}</p>
                <p className="text-sm text-gray-400">{subtitle}</p>

                {onClick && (
                    <button
                        onClick={onClick}
                        className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                    >
                        {buttonText}
                    </button>
                )}

                {actionLink && !onClick && (
                    <a
                        href={actionLink}
                        className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                    >
                        {buttonText}
                    </a>
                )}
            </div>
        </motion.div>
    );
};

export default DynamicEmptyEstate;
