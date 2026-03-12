import React from 'react';
import Button from '../ui/Button';
import { UserPlus } from 'lucide-react';
import "../../styles/NewHere.css";

function NewHere() {
  return (
    <section className="new-here-section max-w-[1200px] mx-auto px-6 mb-20">
      <div className="glass p-12 md:p-20 rounded-[2.5rem] text-center relative overflow-hidden group">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold-bright/5 rounded-full blur-3xl -mr-32 -mt-32 transition-transform duration-700 group-hover:scale-150" />
        
        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            New <em>Here?</em>
          </h2>
          
          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            We would love to welcome you to our church family. Discover our community, find your purpose, and grow with us in faith.
          </p>

          <Button 
            variant="gold" 
            size="lg" 
            icon={UserPlus}
            className="!px-10 !py-4 text-base"
            onClick={() => window.open('https://forms.gle/your-form-id', '_blank')}
          >
            Register as a New Member
          </Button>
        </div>
      </div>
    </section>
  );
}

export default NewHere;
