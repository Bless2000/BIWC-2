import React from 'react';
import { ArrowRight } from 'lucide-react';

const ProgramCard = ({ 
  category = 'Auxiliary', 
  title, 
  tagline, 
  geoPattern = 'dots', // 'dots', 'lines', 'cross', 'rings'
  art: ArtSVG, // Optional custom SVG art component
  image // Image to display in the art layer
}) => {
  const patternClass = `prog-geo-${geoPattern}`;

  return (
    <div className="prog-card group cursor-pointer">
      <div className="prog-visual">
        {/* Background Layer - Simplified to dark base */}
        <div className="absolute inset-0 bg-navy-deep/80" />
        
        {/* Pattern Layer */}
        <div className={patternClass} />
        
        {/* Art Layer */}
        <div className="prog-art">
          {image ? (
            <img 
              src={image} 
              alt={title} 
              className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500" 
            />
          ) : ArtSVG ? (
            <ArtSVG />
          ) : (
            <svg width="160" height="160" viewBox="0 0 160 160" fill="none" className="opacity-[0.18]">
              <circle cx="80" cy="80" r="70" stroke="white" strokeWidth="1"/>
              <circle cx="80" cy="80" r="50" stroke="white" strokeWidth="1"/>
              <line x1="10" y1="80" x2="150" y2="80" stroke="white" strokeWidth="1"/>
              <line x1="80" y1="10" x2="80" y2="150" stroke="white" strokeWidth="1"/>
            </svg>
          )}
        </div>

        {/* Effects Layer */}
        <div className="prog-shine" />
        <div className="prog-fade" />

        {/* Category Pill */}
        <span className="prog-cat-pill">{category}</span>

        {/* Footer Overlay */}
        <div className="prog-footer">
          <div className="prog-footer-text">
            <h4>{title}</h4>
            <span>{tagline}</span>
          </div>
          <div className="prog-arrow">
            <ArrowRight size={12} strokeWidth={3} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramCard;
