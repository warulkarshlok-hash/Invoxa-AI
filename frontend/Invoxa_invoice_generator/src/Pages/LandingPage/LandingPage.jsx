import React from 'react'
import Header from '../../Components/Landing/Header';
import Hero from '../../Components/Landing/Hero';
import Features from '../../Components/Landing/Features';
import Testimonials from '../../Components/Landing/Testimonials';
import Faqs from '../../Components/Landing/Faqs';
import Footer from '../../Components/Landing/Footer';

function LandingPage() {
  return (
    <div className='bg-[#ffffff] text-gray-600'>
      <Header />

      <main>
        <Hero/>
        <Features />
         <Testimonials />
         <Faqs />
         <Footer/>
      </main>
    </div>
  )
}

export default LandingPage;
