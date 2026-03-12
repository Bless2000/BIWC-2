import React from 'react';

const ServiceCard = ({ title, time, day, icon: Icon, onJoin }) => {
  const dayColors = {
    Wednesday: 'bg-gold-bright/12 text-gold-bright border-gold-bright/25',
    Friday: 'bg-red-bright/12 text-red-bright border-red-bright/25',
    Sunday: 'bg-blue-light/12 text-blue-mid border-blue-mid/25',
  };

  return (
    <div className="glass p-[18px_20px] rounded-2xl flex items-center gap-4 transition-all duration-300 hover:bg-white/15 hover:-translate-x-1 group">
      <div className="w-11 h-11 shrink-0 rounded-xl bg-gradient-to-br from-gold/25 to-gold/10 border border-gold/35 flex items-center justify-center">
        {Icon && <Icon className="text-gold-bright" size={20} />}
      </div>
      <div className="flex-1">
        <h4 className="text-[13.5px] font-bold text-white mb-[3px]">{title}</h4>
        <p className="text-[11.5px] text-white/50">{time}</p>
        <span className={`inline-block mt-1 text-[9.5px] font-bold uppercase tracking-wider px-[9px] py-[2px] rounded-full border ${dayColors[day] || dayColors.Sunday}`}>
          {day}
        </span>
      </div>
      <button 
        onClick={onJoin}
        className="bg-gradient-to-br from-red to-red-bright text-white px-5 py-[9px] rounded-full font-bold text-[11.5px] uppercase tracking-wider shadow-[0_3px_16px_rgba(212,32,32,0.4)] transition-all duration-200 hover:-translate-y-[2px] hover:shadow-[0_6px_22px_rgba(212,32,32,0.55)]"
      >
        Join Now
      </button>
    </div>
  );
};

export default ServiceCard;
