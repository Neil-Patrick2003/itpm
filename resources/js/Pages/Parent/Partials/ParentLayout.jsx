import '../layout.css'
import { Link, useForm, usePage } from '@inertiajs/react';
import { HomeIcon, UserCircleIcon, ChatBubbleBottomCenterIcon } from '@heroicons/react/20/solid';
import logo from '../../../../assets/image/logo.png'
import React from "react";

const ParentLayout = ({children}) => {
    const page = usePage()
    const { user } = page.props.auth;

    return <div className="h-screen flex flex-col">
        <div className={"parent_layout_header flex gap-3 items-center border-b-2 border-[#66CA6A]"}>
            <img className='w-full max-w-[32px] object-cover' src={logo} alt="Nutrisafari Logo"/>
            <p className="text-lg font-bold">Nutrisafari</p>
        </div>

        <div className={"parent_layout_content pt-4 pb-2 px-4"}>
            {children}
        </div>

        <div className="parent_layout_footer bg-[#66CA6A] text-white flex justify-between px-8 items-center">
            <Link href={route('parent.home')} className={"flex flex-col justify-center items-center"}>
                <HomeIcon className={"w-6 h-6"}/>
                <span className={"font-semibold text-sm"}>HOME</span>
            </Link>

            <Link href={route('parent.children')} className={"flex flex-col justify-center items-center"}>
                <UserCircleIcon className={"w-6 h-6"}/>
                <span className={"font-semibold text-sm"}>CHILD</span>
            </Link>

            <div className={"flex flex-col justify-center items-center"}>
                <ChatBubbleBottomCenterIcon className={"w-6 h-6"}/>
                <span className={"font-semibold text-sm"}>FORUM</span>
            </div>
        </div>
    </div>
}

export default ParentLayout
