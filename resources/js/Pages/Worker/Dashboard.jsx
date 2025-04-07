import React from 'react'
import WorkerLayout from "@/Layouts/WorkerLayout.jsx";
import {Link, usePage} from "@inertiajs/react";
import ImageSlider, { Slide } from "react-auto-image-slider";
import AutoImageSlider from "@/Components/AutoImageSlider.jsx";



const Dashboard = ({programs}) => {
    const auth = usePage().props;

  return (
    <WorkerLayout>
        hi {auth?.user?.name}
        <Link href="/logout" method="post" as="button">Logout</Link>


        turn (
        <div className="App">
            <h1 className="text-center text-2xl font-semibold mb-8">Auto Image Slider</h1>
            {/* Pass the programsArray to the AutoImageSlider */}
            <AutoImageSlider programs={programs} autoSlideInterval={3000} />
        </div>



        {programs.map(program => (
            <li key={program.id}>{program.title}</li>
        ))}

    </WorkerLayout>
  )
}

export default Dashboard
