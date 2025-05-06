import React from 'react';

import Navbar from '../Components/Navbar';
import Hero from '../Components/Hero';
import Sponsorship from '../Components/sponsorship';
import Work from '../Components/work';
import About from '../Components/about';
import Contact from '../Components/contact';
import Footer from '../Components/footer';
import BouncingBall from '../Components/BouncingBall';


const Welcome = () => {
    return (
        <>
           <Navbar/>
           <Hero/>
           <Sponsorship/>
           <About/>
           <Work/>
           <Contact/>
           <Footer/>
        </>
    );
}

export default Welcome;
