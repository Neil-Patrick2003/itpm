import React from 'react';

import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Sponsorship from '../components/sponsorship';
import Work from '../components/work';
import About from '../components/about';
import Contact from '../components/contact';
import Footer from '../components/footer';
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
