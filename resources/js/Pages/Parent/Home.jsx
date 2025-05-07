import './layout.css'
import { usePage } from '@inertiajs/react';
import ParentLayout from './Partials/ParentLayout.jsx';
import AnnouncementList from './Partials/AnnouncementList.jsx'

const Home = ({announcements}) => {
    const page = usePage()
    const { user } = page.props.auth;

    return (
        <ParentLayout>
            <div>
                <h2 className={"text-lg font-semibold"}>Hello {user.name}!</h2>

                <AnnouncementList announcements={announcements}/>
            </div>
        </ParentLayout>
    )
}

export default Home
