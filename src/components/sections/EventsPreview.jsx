import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, ChevronRight, ArrowRight } from 'lucide-react';
import { events } from '../../assets/data/events';

// ─── Category colour tokens (matches Events page) ─────────────────────────────
const CAT_STYLES = {
  Fellowship:   { color: '#4a80f0', bg: 'rgba(74,128,240,0.14)',   border: 'rgba(74,128,240,0.3)'   },
  Discipleship: { color: '#f5c842', bg: 'rgba(245,200,66,0.14)',  border: 'rgba(245,200,66,0.3)'  },
  Youth:        { color: '#a070f0', bg: 'rgba(160,112,240,0.14)', border: 'rgba(160,112,240,0.3)' },
  Women:        { color: '#ff4a4a', bg: 'rgba(255,74,74,0.14)',    border: 'rgba(255,74,74,0.3)'    },
  Leadership:   { color: '#20c0c0', bg: 'rgba(32,192,192,0.14)',  border: 'rgba(32,192,192,0.3)'  },
  Outreach:     { color: '#40c070', bg: 'rgba(64,192,112,0.14)',  border: 'rgba(64,192,112,0.3)'  },
};
const catStyle = (cat) => CAT_STYLES[cat] || { color: '#f5c842', bg: 'rgba(245,200,66,0.14)', border: 'rgba(245,200,66,0.3)' };

// ─── Single event card ────────────────────────────────────────────────────────
const PreviewCard = ({ event }) => {
  const s = catStyle(event.category);

  return (
    <Link
      to="/events"
      className="glass rounded-2xl overflow-hidden flex flex-col group transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_56px_rgba(0,0,0,0.45)]"
      style={{ border: '1px solid rgba(255,255,255,0.09)' }}
    >
      {/* Image */}
      <div className="relative h-44 sm:h-48 overflow-hidden shrink-0">
        <img
          src={event.image}
          alt={event.header}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.07]"
          loading="lazy"
        />
        {/* Gradient fade */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(6,15,46,0.9) 0%, rgba(6,15,46,0.05) 55%)' }}
        />

        {/* Category pill */}
        {event.category && (
          <div
            className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest"
            style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.color, backdropFilter: 'blur(6px)' }}
          >
            {event.category}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <h3
          className="text-white font-bold text-[14px] tracking-wide leading-snug mb-3 group-hover:text-gold-bright transition-colors duration-200"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {event.header}
        </h3>

        {/* Meta */}
        <div className="space-y-1.5 mb-4">
          {[
            { icon: Calendar, text: event.date },
            { icon: Clock,    text: event.time },
            { icon: MapPin,   text: event.location },
          ].map(({ icon: Icon, text }, i) => text && (
            <div key={i} className="flex items-center gap-2 text-[11.5px] text-white/40">
              <Icon size={11} style={{ color: 'var(--gold-bright)', flexShrink: 0 }} />
              <span className="truncate">{text}</span>
            </div>
          ))}
        </div>

        {/* Footer arrow */}
        <div className="flex items-center justify-between pt-3 border-t border-white/8 mt-auto">
          <span className="text-[10.5px] font-bold uppercase tracking-widest" style={{ color: 'var(--gold-bright)' }}>
            View Event
          </span>
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 group-hover:translate-x-1"
            style={{ background: 'rgba(245,200,66,0.1)', border: '1px solid rgba(245,200,66,0.25)' }}
          >
            <ChevronRight size={13} style={{ color: 'var(--gold-bright)' }} />
          </div>
        </div>
      </div>
    </Link>
  );
};

// ─── Main section ─────────────────────────────────────────────────────────────
function EventsPreview() {
  const upcomingEvents = events.slice(0, 3);

  return (
    <section className="max-w-[1200px] mx-auto px-4 sm:px-6 mb-20 sm:mb-28">

      {/* Section header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-7 sm:mb-8 border-b border-white/10 pb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-wide">
            Upcoming <em>Events</em>
          </h2>
          <span
            className="text-white/30 text-base mt-0.5 block"
            style={{ fontStyle: 'italic' }}
          >
            Mark your calendars
          </span>
        </div>

        {/* View all link */}
        <Link
          to="/events"
          className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider shrink-0 transition-all duration-200 hover:gap-2.5"
          style={{ color: 'var(--gold-bright)' }}
        >
          View All Events
          <ArrowRight size={13} />
        </Link>
      </div>

      {/* Cards grid
          Mobile:  1-col stacked
          Tablet:  2-col
          Desktop: 3-col */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
        {upcomingEvents.map((event) => (
          <PreviewCard key={event.id} event={event} />
        ))}
      </div>

      {/* Mobile-only "See all" CTA below cards */}
      <div className="mt-6 sm:hidden text-center">
        <Link
          to="/events"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-[12px] font-bold uppercase tracking-wider transition-all duration-200 hover:-translate-y-[1px]"
          style={{ background: 'rgba(245,200,66,0.1)', border: '1px solid rgba(245,200,66,0.28)', color: 'var(--gold-bright)' }}
        >
          See All Events <ChevronRight size={13} />
        </Link>
      </div>
    </section>
  );
}

export default EventsPreview;