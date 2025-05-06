import { PlusIcon, EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import React from "react";


export default function EmptySearch({estate} ) {
    return (
        <div className="flex justify-center items-center w-full h-32 text-gray-500">
            {estate}
        </div>
    );
}
