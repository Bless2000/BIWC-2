import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar, Clock, MapPin, AlertCircle,
  ArrowRight, X, Search, ChevronRight, Filter,
} from 'lucide-react';
import Button from '../components/ui/Button';
import { events } from '../assets/data/events';

// ─── Category colour tokens ───────────────────────────────────────────────────
const CAT = {
  Fellowship:   { color: '#4a80f0', bg: 'rgba(74,128,240,0.14)',   border: 'rgba(74,128,240,0.3)'   },
  Discipleship: { color: '#f5c842', bg: 'rgba(245,200,66,0.14)',  border: 'rgba(245,200,66,0.3)'  },
  Youth:        { color: '#a070f0', bg: 'rgba(160,112,240,0.14)', border: 'rgba(160,112,240,0.3)' },
  Women:        { color: '#ff4a4a', bg: 'rgba(255,74,74,0.14)',    border: 'rgba(255,74,74,0.3)'    },
  Leadership:   { color: '#20c0c0', bg: 'rgba(32,192,192,0.14)',  border: 'rgba(32,192,192,0.3)'  },
  Outreach:     { color: '#40c070', bg: 'rgba(64,192,112,0.14)',  border: 'rgba(64,192,112,0.3)'  },
  All:          { color: '#f5c842', bg: 'rgba(245,200,66,0.14)',  border: 'rgba(245,200,66,0.3)'  },
};
const ALL_CATS = ['All', ...Array.from(new Set(events.map(e => e.category)))];

// ─── Geo pattern ──────────────────────────────────────────────────────────────
const GeoDots = () => (
  <div className="absolute inset-0 pointer-events-none opacity-[0.06]"
    style={{ backgroundImage: 'radial-gradient(circle,#fff 1px,transparent 1px)', backgroundSize: '22px 22px' }} />
);

// ─── Category filter pill ─────────────────────────────────────────────────────
const CatPill = ({ cat, active, onClick }) => {
  const s = CAT[cat] || CAT.All;
  return (
    <button
      onClick={onClick}
      className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10.5px] sm:text-[11px] font-bold uppercase tracking-wider sm:tracking-widest transition-all duration-200 hover:-translate-y-[1px] whitespace-nowrap"
      style={{
        background:  active ? s.color : s.bg,
        border:      `1px solid ${s.border}`,
        color:        active ? '#000' : s.color,
        boxShadow:    active ? `0 4px 16px ${s.color}40` : 'none',
      }}
    >
      {cat}
    </button>
  );
};

// ─── Event detail modal ───────────────────────────────────────────────────────
const EventModal = ({ event, onClose }) => {
  if (!event) return null;
  const s = CAT[event.category] || CAT.All;

  React.useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') onClose(); };
    // Prevent body scroll while modal open
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', fn);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', fn);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-10"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0"
        style={{ background: 'rgba(4,8,28,0.88)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)' }} />

      {/* Sheet on mobile (slides up), centered card on sm+ */}
      <div
        className="relative w-full sm:max-w-2xl max-h-[95vh] sm:max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl"
        style={{
          background: 'rgba(8,13,40,0.98)',
          border: '1px solid rgba(255,255,255,0.13)',
          boxShadow: '0 48px 120px rgba(0,0,0,0.75)',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Mobile drag handle */}
        <div className="sm:hidden flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-white/20" />
        </div>

        {/* Hero image */}
        <div className="relative h-48 sm:h-64 overflow-hidden rounded-t-3xl shrink-0">
          <img src={event.image} alt={event.header} className="w-full h-full object-cover" />
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(8,13,40,1) 0%, rgba(8,13,40,0.05) 55%)' }} />

          <div className="absolute top-4 left-4 px-2.5 py-1 rounded-full text-[9.5px] font-bold uppercase tracking-widest"
            style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.color, backdropFilter: 'blur(8px)' }}>
            {event.category}
          </div>

          <button onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
            style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
            <X size={14} className="text-white" />
          </button>

          {event.deadline && (
            <div className="absolute bottom-4 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider"
              style={{ background: 'rgba(212,32,32,0.25)', border: '1px solid rgba(212,32,32,0.45)', color: '#ff7070', backdropFilter: 'blur(8px)' }}>
              <AlertCircle size={9} /> Registration Deadline
            </div>
          )}
        </div>

        {/* Body */}
        <div className="p-5 sm:p-7 md:p-9">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-wide mb-2 leading-tight">
            {event.header}
          </h2>
          <div className="w-10 h-[2px] mb-5"
            style={{ background: 'linear-gradient(90deg, var(--gold-bright), transparent)' }} />

          {/* Meta — 1 col on mobile, 2 col on sm+ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
            {[
              { icon: Calendar,     label: 'Date',     value: event.date     },
              { icon: Clock,        label: 'Time',     value: event.time     },
              { icon: MapPin,       label: 'Location', value: event.location },
              ...(event.deadline ? [{ icon: AlertCircle, label: 'Deadline / Notes', value: event.deadline, alert: true }] : []),
            ].map(({ icon: Icon, label, value, alert }, i) => (
              <div key={i}
                className={`flex items-start gap-3 px-3.5 py-3 rounded-xl ${alert ? 'sm:col-span-2' : ''}`}
                style={{
                  background: alert ? 'rgba(212,32,32,0.07)' : 'rgba(255,255,255,0.04)',
                  border:     alert ? '1px solid rgba(212,32,32,0.22)' : '1px solid rgba(255,255,255,0.08)',
                }}>
                <Icon size={14} className="shrink-0 mt-0.5"
                  style={{ color: alert ? '#ff6060' : 'var(--gold-bright)' }} />
                <div className="min-w-0">
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/30 mb-0.5">{label}</p>
                  <p className="text-[12.5px] sm:text-[13px] font-medium leading-relaxed break-words"
                    style={{ color: alert ? '#ff8888' : 'rgba(255,255,255,0.78)' }}>
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="mb-7">
            <p className="text-[9.5px] font-bold uppercase tracking-[0.22em] text-white/25 mb-2.5">About This Event</p>
            <p className="text-white/65 text-[13.5px] leading-[1.85]">{event.description}</p>
          </div>

          {/* CTAs — stacked on mobile */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-white/8">
            <Link to="/contact" className="flex-1" onClick={onClose}>
              <Button variant="gold" size="md" icon={ArrowRight} className="w-full justify-center">
                Register / Enquire
              </Button>
            </Link>
            <button onClick={onClose}
              className="flex-1 py-3 rounded-full text-[12px] font-bold uppercase tracking-wider text-white/40 transition-all duration-200 hover:text-white"
              style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Featured event hero card ─────────────────────────────────────────────────
const FeaturedCard = ({ event, onClick }) => {
  if (!event) return null;
  const s = CAT[event.category] || CAT.All;

  return (
    <button
      onClick={onClick}
      className="w-full text-left relative rounded-2xl md:rounded-3xl overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_32px_80px_rgba(0,0,0,0.5)]"
      style={{ minHeight: '300px', border: '1px solid rgba(255,255,255,0.12)' }}
    >
      <img src={event.image} alt={event.header}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />

      {/* Gradient overlays */}
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(6,15,46,0.97) 0%, rgba(6,15,46,0.25) 55%, transparent 100%)' }} />
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(100deg, rgba(6,15,46,0.65) 0%, transparent 55%)' }} />

      {/* Top badges */}
      <div className="absolute top-4 sm:top-6 left-4 sm:left-6 flex items-center gap-2 flex-wrap">
        <div className="px-2.5 py-1 rounded-full text-[9px] sm:text-[9.5px] font-bold uppercase tracking-widest"
          style={{ background: 'rgba(245,200,66,0.2)', border: '1px solid rgba(245,200,66,0.4)', color: 'var(--gold-bright)', backdropFilter: 'blur(8px)' }}>
          ✦ Featured
        </div>
        <div className="px-2.5 py-1 rounded-full text-[9px] sm:text-[9.5px] font-bold uppercase tracking-widest"
          style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.color, backdropFilter: 'blur(8px)' }}>
          {event.category}
        </div>
      </div>

      {/* Deadline top-right */}
      {event.deadline && (
        <div className="absolute top-4 sm:top-6 right-4 sm:right-6 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider"
          style={{ background: 'rgba(212,32,32,0.2)', border: '1px solid rgba(212,32,32,0.4)', color: '#ff6060', backdropFilter: 'blur(8px)' }}>
          <AlertCircle size={9} /> Deadline
        </div>
      )}

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 md:p-10">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-wide leading-tight mb-2 md:mb-3">
          {event.header}
        </h2>
        <p className="text-white/55 text-[13px] sm:text-[14px] leading-relaxed mb-4 md:mb-5 line-clamp-2 max-w-2xl">
          {event.description}
        </p>

        {/* Meta row — wraps on mobile */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          {[
            { icon: Calendar, text: event.date },
            { icon: Clock,    text: event.time },
            { icon: MapPin,   text: event.location },
          ].map(({ icon: Icon, text }, i) => (
            <div key={i} className="flex items-center gap-1.5 text-[11.5px] sm:text-[12.5px] text-white/55">
              <Icon size={12} style={{ color: 'var(--gold-bright)', flexShrink: 0 }} />
              <span className="truncate max-w-[180px] sm:max-w-none">{text}</span>
            </div>
          ))}

          {/* Inline CTA — pushes right on sm+ */}
          <div
            className="mt-1 sm:mt-0 sm:ml-auto flex items-center gap-2 px-4 py-2 rounded-full text-[11px] sm:text-[12px] font-bold uppercase tracking-wider transition-all duration-300 group-hover:gap-3"
            style={{ background: 'rgba(245,200,66,0.15)', border: '1px solid rgba(245,200,66,0.38)', color: 'var(--gold-bright)' }}>
            View Details <ChevronRight size={13} />
          </div>
        </div>
      </div>
    </button>
  );
};

// ─── Regular event card ───────────────────────────────────────────────────────
const EventCard = ({ event, onClick }) => {
  const s = CAT[event.category] || CAT.All;
  return (
    <button
      onClick={onClick}
      className="text-left glass rounded-2xl overflow-hidden group transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(0,0,0,0.45)] w-full flex flex-col"
      style={{ border: '1px solid rgba(255,255,255,0.09)' }}
    >
      {/* Image */}
      <div className="relative h-44 sm:h-48 overflow-hidden shrink-0">
        <img src={event.image} alt={event.header}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.07]"
          loading="lazy" />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(6,15,46,0.88) 0%, rgba(6,15,46,0.05) 55%)' }} />

        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest"
          style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.color, backdropFilter: 'blur(6px)' }}>
          {event.category}
        </div>

        {event.deadline && (
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider"
            style={{ background: 'rgba(212,32,32,0.2)', border: '1px solid rgba(212,32,32,0.4)', color: '#ff6060', backdropFilter: 'blur(6px)' }}>
            <AlertCircle size={9} /> Deadline
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <h3 className="text-white font-bold text-[14px] tracking-wide leading-snug mb-3 group-hover:text-gold-bright transition-colors duration-200"
          style={{ fontFamily: 'var(--font-display)' }}>
          {event.header}
        </h3>

        {/* Meta */}
        <div className="space-y-1.5 mb-3">
          {[
            { icon: Calendar, text: event.date },
            { icon: Clock,    text: event.time },
            { icon: MapPin,   text: event.location },
          ].map(({ icon: Icon, text }, i) => (
            <div key={i} className="flex items-center gap-2 text-[11.5px] text-white/40">
              <Icon size={11} style={{ color: 'var(--gold-bright)', flexShrink: 0 }} />
              <span className="truncate">{text}</span>
            </div>
          ))}
        </div>

        {/* Description */}
        <p className="text-white/38 text-[12.5px] leading-relaxed line-clamp-2 mb-4 flex-1">
          {event.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-white/8 mt-auto">
          <span className="text-[10.5px] font-bold uppercase tracking-widest" style={{ color: 'var(--gold-bright)' }}>
            View Details
          </span>
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 group-hover:translate-x-1"
            style={{ background: 'rgba(245,200,66,0.1)', border: '1px solid rgba(245,200,66,0.25)' }}>
            <ChevronRight size={13} style={{ color: 'var(--gold-bright)' }} />
          </div>
        </div>
      </div>
    </button>
  );
};

// ─── Stats bar ────────────────────────────────────────────────────────────────
const StatsBar = ({ total, withDeadline, catCount }) => (
  <div className="glass rounded-2xl px-4 sm:px-6 py-4 sm:py-5 mb-10 md:mb-12 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
    {[
      { value: total,        label: 'Total Events',      color: '#f5c842' },
      { value: withDeadline, label: 'Registration Open', color: '#ff4a4a' },
      { value: catCount,     label: 'Categories',        color: '#4a80f0' },
      { value: 'Abelemkpe',  label: 'Primary Venue',     color: '#40c070' },
    ].map((s, i) => (
      <div key={i} className="text-center">
        <div className="text-xl sm:text-2xl font-bold mb-0.5"
          style={{ color: s.color, fontFamily: 'var(--font-display)' }}>
          {s.value}
        </div>
        <div className="text-[9.5px] sm:text-[10.5px] font-bold uppercase tracking-wider text-white/30 leading-tight">
          {s.label}
        </div>
      </div>
    ))}
  </div>
);

// ─── Empty state ──────────────────────────────────────────────────────────────
const EmptyState = ({ onClear }) => (
  <div className="rounded-2xl p-10 sm:p-16 text-center"
    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
    <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
      style={{ background: 'rgba(245,200,66,0.1)', border: '1px solid rgba(245,200,66,0.25)' }}>
      <Calendar size={24} style={{ color: 'var(--gold-bright)' }} />
    </div>
    <h3 className="text-white font-bold text-lg md:text-xl mb-2 tracking-wide">No Events Found</h3>
    <p className="text-white/35 text-sm mb-6 max-w-xs mx-auto">
      No events match your search or filter. Try a different category or clear the search.
    </p>
    <button onClick={onClear}
      className="px-6 py-2.5 rounded-full text-[12px] font-bold uppercase tracking-wider transition-all duration-200 hover:-translate-y-[1px]"
      style={{ background: 'rgba(245,200,66,0.12)', border: '1px solid rgba(245,200,66,0.3)', color: 'var(--gold-bright)' }}>
      Clear Filters
    </button>
  </div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Events() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery,    setSearchQuery]    = useState('');
  const [selectedEvent,  setSelectedEvent]  = useState(null);

  const filtered = useMemo(() => events.filter(e => {
    const matchCat = activeCategory === 'All' || e.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchQ = !q ||
      e.header.toLowerCase().includes(q) ||
      e.description.toLowerCase().includes(q) ||
      e.location.toLowerCase().includes(q);
    return matchCat && matchQ;
  }), [activeCategory, searchQuery]);

  const featured  = filtered[0] || null;
  const remaining = filtered.slice(1);
  const clearAll  = () => { setActiveCategory('All'); setSearchQuery(''); };

  return (
    <>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10 pb-16 md:pb-24">

        {/* ── Page Header ── */}
        <div className="max-w-[1200px] mx-auto mb-8 md:mb-10">
          <span className="inline-block text-[10px] font-bold uppercase tracking-[0.3em] mb-4 px-3 py-1 rounded-full"
            style={{ background: 'rgba(245,200,66,0.1)', border: '1px solid rgba(245,200,66,0.25)', color: 'var(--gold-bright)' }}>
            What's Happening
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 tracking-wide">
            Upcoming <em>Events</em>
          </h1>
          <div className="w-14 h-[2px] mb-5"
            style={{ background: 'linear-gradient(90deg, var(--gold-bright), transparent)' }} />
          <p className="text-white/50 text-[14px] md:text-[15px] leading-relaxed max-w-2xl">
            Stay connected with everything happening at BIWC. From retreats and fellowship gatherings
            to discipleship classes and outreach programs — there's always something to be part of.
          </p>
        </div>

        <div className="max-w-[1200px] mx-auto">
          <StatsBar
            total={events.length}
            withDeadline={events.filter(e => e.deadline).length}
            catCount={ALL_CATS.length - 1}
          />
        </div>

        {/* ── Search + Filters ── */}
        <div className="max-w-[1200px] mx-auto mb-8 md:mb-12">

          {/* Search */}
          <div className="relative mb-4">
            <Search size={14}
              className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: 'rgba(255,255,255,0.28)' }} />
            <input
              type="text"
              placeholder="Search events…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-3 text-[13px] text-white outline-none rounded-xl placeholder-white/25"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)' }}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors">
                <X size={14} />
              </button>
            )}
          </div>

          {/* Filter pills — horizontally scrollable on mobile */}
          <div className="flex items-center gap-2">
            <Filter size={12} className="text-white/25 shrink-0" />
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none flex-1">
              {ALL_CATS.map(cat => (
                <CatPill key={cat} cat={cat} active={activeCategory === cat} onClick={() => setActiveCategory(cat)} />
              ))}
            </div>
            {(activeCategory !== 'All' || searchQuery) && (
              <button onClick={clearAll}
                className="shrink-0 flex items-center gap-1 text-[10.5px] font-bold uppercase tracking-wider text-white/30 hover:text-white/70 transition-colors duration-200 ml-1">
                <X size={10} /> Clear
              </button>
            )}
          </div>
        </div>

        {/* ── Main Content ── */}
        <div className="max-w-[1200px] mx-auto">

          {filtered.length === 0 ? (
            <EmptyState onClear={clearAll} />
          ) : (
            <div className="space-y-10 md:space-y-14">

              {/* Featured */}
              {featured && (
                <div>
                  <div className="flex items-baseline gap-3 mb-4 md:mb-5 border-b border-white/10 pb-3 md:pb-4">
                    <h2 className="text-lg sm:text-xl font-bold text-white uppercase tracking-wide">
                      Featured <em>Event</em>
                    </h2>
                    <span className="text-white/25 text-sm hidden sm:block" style={{ fontStyle: 'italic' }}>
                      Click to view full details
                    </span>
                  </div>
                  <FeaturedCard event={featured} onClick={() => setSelectedEvent(featured)} />
                </div>
              )}

              {/* Grid */}
              {remaining.length > 0 && (
                <div>
                  <div className="flex items-baseline gap-3 mb-5 md:mb-6 border-b border-white/10 pb-3 md:pb-4">
                    <h2 className="text-lg sm:text-xl font-bold text-white uppercase tracking-wide">
                      All <em>Events</em>
                    </h2>
                    <span className="text-white/25 text-sm" style={{ fontStyle: 'italic' }}>
                      {remaining.length} more
                    </span>
                  </div>
                  {/* Mobile: 1-col → sm: 2-col → lg: 3-col */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                    {remaining.map(event => (
                      <EventCard key={event.id} event={event} onClick={() => setSelectedEvent(event)} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── Bottom CTA ── */}
          <div className="relative mt-16 md:mt-20 rounded-2xl md:rounded-3xl overflow-hidden p-8 sm:p-10 md:p-14"
            style={{ background: 'linear-gradient(135deg, rgba(26,58,143,0.5), rgba(13,31,96,0.82))', border: '1px solid rgba(255,255,255,0.1)' }}>
            <GeoDots />
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 55%)' }} />
            <div className="absolute -right-16 -bottom-16 w-56 md:w-72 h-56 md:h-72 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle,rgba(245,200,66,0.28), transparent)', filter: 'blur(55px)' }} />
            <div className="absolute -left-12 top-0 w-48 md:w-56 h-48 md:h-56 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle,rgba(212,32,32,0.18), transparent)', filter: 'blur(50px)' }} />

            {/* Stack on mobile, row on md+ */}
            <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-7 md:gap-8">
              <div className="max-w-xl">
                <span className="inline-block text-[10px] font-bold uppercase tracking-[0.28em] mb-4 px-3 py-1 rounded-full"
                  style={{ background: 'rgba(245,200,66,0.12)', border: '1px solid rgba(245,200,66,0.28)', color: 'var(--gold-bright)' }}>
                  Don't Miss Out
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-wide">
                  Stay <em>Connected</em>
                </h2>
                <p className="text-white/50 text-[13.5px] leading-relaxed">
                  Want to be notified about upcoming events, retreats, and programs? Reach out to us and we'll keep you in the loop.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-3 shrink-0">
                <Link to="/contact" className="flex-1 sm:flex-none">
                  <Button variant="gold" size="lg" icon={ArrowRight} className="w-full justify-center">
                    Get Notified
                  </Button>
                </Link>
                <Link to="/give" className="flex-1 sm:flex-none">
                  <Button variant="ghost" size="lg" className="w-full justify-center">
                    Support Events
                  </Button>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Modal — outside main div so it overlays everything */}
      {selectedEvent && (
        <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </>
  );
}
