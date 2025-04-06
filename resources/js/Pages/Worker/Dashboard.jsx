import React from 'react'
import WorkerLayout from "@/Layouts/WorkerLayout.jsx";
import {Link, usePage} from "@inertiajs/react";

const Dashboard = () => {
    const auth = usePage().props;

  return (
    <WorkerLayout>
        hi {auth?.user?.name}
        <Link href="/logout" method="post" as="button">Logout</Link>

    </WorkerLayout>
  )
}

export default Dashboard
