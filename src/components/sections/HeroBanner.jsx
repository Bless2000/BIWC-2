import React from 'react';
import { Play } from 'lucide-react';
import Button from '../ui/Button';
import heroImg from '../../assets/images/hero-img.png';

const HeroBanner = () => {
  return (
    <section className="relative w-full min-h-[92vh] flex items-center justify-center overflow-hidden rounded-[2rem] mx-auto max-w-[1400px] mt-4 mb-20 shadow-2xl">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImg} 
          alt="BIWC Ghana Hero" 
          className="w-full h-full object-cover object-center scale-105"
        />
        {/* Darkening Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-bg/90 via-bg/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent" />
      </div>

      {/* Content Layer */}
      <div className="container relative z-10 px-8 md:px-16 flex flex-col items-start text-left max-w-[1200px]">
        
        
        <p className="text-black max-w-xl text-lg md:text-xl leading-relaxed mb-10 font-medium font-body animate-fade-in">
          A Spirit-filled community dedicated to transforming lives through the power of the Gospel and meaningful fellowship. Join us as we grow together in faith.
        </p>
        
        <div className="flex flex-wrap gap-5">
          <Button variant="danger" size="lg" icon={Play} className="!px-8 !py-4 text-base">
            Watch Live
          </Button>
          <Button variant="outline-white" size="lg" className="!px-8 !py-4 text-base">
            I'm New Here
          </Button>
        </div>
      </div>

      {/* Bottom Decorative Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-bg to-transparent z-10 pointer-events-none" />
    </section>
  );
};

export default HeroBanner;
