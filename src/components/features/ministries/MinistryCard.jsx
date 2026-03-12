import React from 'react';
import { ArrowRight } from 'lucide-react';

const ProgramCard = ({ 
  category = 'Auxiliary', 
  title, 
  tagline, 
  variant = 'blue', 
  icon: Icon,
  geoPattern = 'dots', // 'dots', 'lines', 'cross', 'rings'
  art: ArtSVG // Optional custom SVG art component
}) => {
  const bgClass = `img-${variant}`;
  const patternClass = `prog-geo-${geoPattern}`;

  return (
    <div className="prog-card group cursor-pointer">
      <div className="prog-visual">
        {/* Background Layer */}
        <div className={`prog-visual-bg ${bgClass}`} />
        
        {/* Pattern Layer */}
        <div className={patternClass} />
        
        {/* Art Layer */}
        <div className="prog-art">
          {ArtSVG ? <ArtSVG /> : (
            <svg width="160" height="160" viewBox="0 0 160 160" fill="none" className="opacity-[0.18]">
              <circle cx="80" cy="80" r="70" stroke="white" strokeWidth="1"/>
              <circle cx="80" cy="80" r="50" stroke="white" strokeWidth="1"/>
              <line x1="10" y1="80" x2="150" y2="80" stroke="white" strokeWidth="1"/>
              <line x1="80" y1="10" x2="80" y2="150" stroke="white" strokeWidth="1"/>
            </svg>
          )}
        </div>

        {/* Icon Layer */}
        <div className="prog-icon-wrap">
          {Icon && <Icon className="text-white" size={32} strokeWidth={1.5} />}
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
