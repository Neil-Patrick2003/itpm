import React from 'react';

import Navbar from '../Components/Navbar';
import Hero from '../Components/Hero';
import Sponsorship from '../Components/sponsorship';
import Work from '../Components/work';
import About from '../Components/about';
import Contact from '../Components/contact';
import Footer from '../Components/footer';
import BouncingBall from '../Components/BouncingBall';
import {BsTransparency} from "react-icons/bs";
import Transparency from '../Components/Transparency';
import ProgramSwiper from "@/Components/ProgramSwiper.jsx";


const Welcome = ({ programCount, totalBeneficiaries, topSponsors, programs }) => {
    return (
        <>
           <Navbar/>
           <Hero/>
            <ProgramSwiper programs={programs}/>
            <Transparency data={{ topSponsors, programCount, totalBeneficiaries, programs }}/>
           <Sponsorship />
           <About/>
           <Work/>
           <Contact/>
           <Footer/>
        </>
    );
}

export default Welcome;
