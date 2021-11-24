import React from 'react';
import Explainer from '../components/Explainer';
import Features from '../components/Features';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import HowCreateWorks from '../components/HowCreateWorks';
import HowItWorks from '../components/HowItWorks';
import NewHeader from '../components/NewHeader';

function Landing() {
  return (
    <div>
      <NewHeader />
      <Hero />
      <Features />
      <Explainer />
      <HowItWorks />
      <HowCreateWorks />
      <Footer />
    </div>
  );
}

export default Landing;
