import React from 'react';
import { CHURCH_INFO } from '../../utils/constants';

const TopBar = () => {
  return (
    <div className="w-full bg-bg/75 backdrop-blur-sm border-b border-white/10 h-[34px] flex items-center overflow-hidden z-[1100] relative mb-4">
      <div className="container mx-auto px-6 flex justify-between items-center text-[12px] font-medium tracking-wide">
        <div className="flex items-center gap-6">
          <a href={`mailto:${CHURCH_INFO.email}`} className="text-white/45 hover:text-gold-bright transition-colors duration-200">
            {CHURCH_INFO.email}
          </a>
          <span className="hidden md:inline text-white/45">
            Tel: {CHURCH_INFO.phone}
          </span>
        </div>
        <div className="text-white/45 hidden sm:block">
          {CHURCH_INFO.address}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
