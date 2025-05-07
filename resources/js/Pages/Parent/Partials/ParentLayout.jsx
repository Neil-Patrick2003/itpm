import '../layout.css'
import { Link, useForm, usePage } from '@inertiajs/react';
import { HomeIcon, UserCircleIcon, ChatBubbleBottomCenterIcon } from '@heroicons/react/20/solid';
import logo from '../../../../assets/image/logo.png'
import React, {useState} from "react";
import {Fade, Menu, MenuItem} from "@mui/material";

const ParentLayout = ({children}) => {
    const page = usePage()
    const { user } = page.props.auth;


    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const handleClose = () => setAnchorEl(null);
    const handleClick = (event) => setAnchorEl(event.currentTarget);

    return <div className="h-screen flex flex-col">
        <div className={"parent_layout_header px-4 flex justify-between gap-3 items-center border-b-2 border-[#66CA6A]"}>
            <div className={"flex items-center gap-3"}>
                <img className='w-full max-w-[32px] object-cover' src={logo} alt="Nutrisafari Logo"/>
                <p className="text-lg font-bold">Nutrisafari</p>
            </div>

            <button onClick={handleClick}>
                <UserCircleIcon className="w-8 h-8"/>
            </button>
            <Menu
                id="fade-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                <MenuItem onClick={handleClose}>
                    <Link href="/logout" method="post" as="button">Logout</Link>
                </MenuItem>
            </Menu>
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

            <Link href={route('parent.forum.topics')} className={"flex flex-col justify-center items-center"}>
                <ChatBubbleBottomCenterIcon className={"w-6 h-6"}/>
                <span className={"font-semibold text-sm"}>FORUM</span>
            </Link>
        </div>
    </div>
}

export default ParentLayout
