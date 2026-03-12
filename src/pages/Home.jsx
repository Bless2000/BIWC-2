import React from 'react';
import { 
  Users, 
  Heart, 
  Zap, 
  Play,
  Music2,
} from 'lucide-react';
import Button from '../components/ui/Button';
import ServiceCard from '../components/ui/ServiceCard';
import MinistryCard from '../components/features/ministries/MinistryCard';
import HeroBanner from '../components/sections/HeroBanner';
import ImageCarousel from '../components/sections/ImageCarousel';
import EventsPreview from '../components/sections/EventsPreview';
import NewHere from '../components/sections/NewHere';

// Defined these art components here for the Home page
const RingsArt = () => (
  <svg width="160" height="160" viewBox="0 0 160 160" fill="none" className="opacity-[0.18]">
    <ellipse cx="80" cy="80" rx="65" ry="40" stroke="white" strokeWidth="1"/>
    <ellipse cx="80" cy="80" rx="40" ry="65" stroke="white" strokeWidth="1"/>
  </svg>
);

export default function Home() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 relative z-10 pb-20">
      <HeroBanner />
      
      {/* Service Schedule */}
      <section className="max-w-[1200px] mx-auto mb-20 mt-10">
        <div className="flex items-baseline gap-3 mb-8 border-b border-white/10 pb-4">
          <h2 className="text-2xl font-bold text-white uppercase tracking-wide">Service <em>Schedule</em></h2>
          <span className="font-italic italic text-white/30 text-lg">Join us in person or online</span>
        </div>
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <ServiceCard 
            title="Sunday Main Service" 
            time="7:30am – 9:30am" 
            day="Sunday" 
            icon={Users} 
            onJoin={() => window.open('https://youtube.com/@biwcghana', '_blank')}
          />
          <ServiceCard 
            title="Mid Week Online Service" 
            time="6:30pm – 8:30pm" 
            day="Wednesday" 
            icon={Zap} 
            onJoin={() => window.open('https://youtube.com/@biwcghana', '_blank')}
          />
          <ServiceCard 
            title="Friday Prayer Service" 
            time="6:30pm – 8:30pm" 
            day="Friday" 
            icon={Heart} 
            onJoin={() => window.open('https://youtube.com/@biwcghana', '_blank')}
          />
        </div>
      </section>

      {/* Image Carousel */}
      <ImageCarousel />      

      {/* Upcoming Events */}
      <EventsPreview />

      {/* New Here Section */}
      <NewHere />


      {/* Ministries */}
      <section className="max-w-[1200px] mx-auto mb-20 mt-20">
        <div className="flex items-baseline gap-3 mb-8 border-b border-white/10 pb-4">
          <h2 className="text-2xl font-bold text-white uppercase tracking-wide">Our <em>Ministries</em></h2>
          <span className="font-italic italic text-white/30 text-lg font-medium">Explore our community</span>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <MinistryCard 
            title="Men's Fellowship" 
            tagline="Faith · Purpose · Leadership"
            variant="blue"
            geoPattern="cross"
            icon={Users}
          />
          <MinistryCard 
            title="Women's Ministry" 
            tagline="Grace · Strength · Community"
            variant="gold"
            geoPattern="rings"
            art={RingsArt}
            icon={Heart}
          />
          <MinistryCard 
            title="Youth Fellowship" 
            tagline="Bold · Fearless · Called"
            variant="red"
            geoPattern="lines"
            icon={Zap}
          />
          <MinistryCard 
            title="Worship Ministry" 
            tagline="Praise · Presence · Power"
            variant="purple"
            geoPattern="rings"
            icon={Music2}
          />
        </div>
      </section>
    </div>
  );
}
