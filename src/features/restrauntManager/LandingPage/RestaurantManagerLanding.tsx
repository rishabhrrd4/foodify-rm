import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import QuickStart from './QuickStart';
import Benefits from './Benefits';
import SuccessStories from './SuccessStories';
import FAQ from './FAQ';
import Footer from './Footer';

const RestaurantManagerLanding: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar isScrolled={isScrolled} />
      <Hero />
      <QuickStart />
      <Benefits />
      <SuccessStories />
      <FAQ />
      <Footer />
    </div>
  );
};

export default RestaurantManagerLanding;