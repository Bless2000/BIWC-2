import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  MapPin,
  AlertCircle,
  ArrowRight,
  X,
  Search,
  ChevronRight,
  Filter,
} from 'lucide-react';
import Button from '../components/ui/Button';
import { events } from '../assets/data/events';

// ─── Category colour config ───────────────────────────────────────────────────
const CATEGORY_STYLES = {
  Fellowship:   { color: '#4a80f0', bg: 'rgba(74,128,240,0.12)',   border: 'rgba(74,128,240,0.28)'   },
  Discipleship: { color: '#f5c842', bg: 'rgba(245,200,66,0.12)',  border: 'rgba(245,200,66,0.28)'  },
  Youth:        { color: '#a070f0', bg: 'rgba(160,112,240,0.12)', border: 'rgba(160,112,240,0.28)' },
  Women:        { color: '#ff4a4a', bg: 'rgba(255,74,74,0.12)',    border: 'rgba(255,74,74,0.28)'    },
  Leadership:   { color: '#20c0c0', bg: 'rgba(32,192,192,0.12)',  border: 'rgba(32,192,192,0.28)'  },
  Outreach:     { color: '#40c070', bg: 'rgba(64,192,112,0.12)',  border: 'rgba(64,192,112,0.28)'  },
  All:          { color: '#f5c842', bg: 'rgba(245,200,66,0.12)',  border: 'rgba(245,200,66,0.28)'  },
};

const ALL_CATEGORIES = ['All', ...Array.from(new Set(events.map(e => e.category)))];

// ─── Geo pattern ──────────────────────────────────────────────────────────────
const GeoDots = () => (
  <div className="absolute inset-0 pointer-events-none opacity-[0.06]"
    style={{ backgroundImage: 'radial-gradient(circle,#fff 1px,transparent 1px)', backgroundSize: '22px 22px' }} />
);

// ─── Category Filter Pill ─────────────────────────────────────────────────────
const CategoryPill = ({ cat, active, onClick }) => {
  const s = CATEGORY_STYLES[cat] || CATEGORY_STYLES.All;
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all duration-200 hover:-translate-y-[1px] whitespace-nowrap"
      style={{
        background:  active ? s.color : s.bg,
        border:      `1px solid ${s.border}`,
        color:        active ? '#000' : s.color,
        boxShadow:    active ? `0 4px 18px ${s.color}45` : 'none',
      }}
    >
      {cat}
    </button>
  );
};

// ─── Event Detail Modal ───────────────────────────────────────────────────────
const EventModal = ({ event, onClose }) => {
  if (!event) return null;
  const catStyle = CATEGORY_STYLES[event.category] || CATEGORY_STYLES.All;

  // Close on Escape key
  React.useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-10"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(4,8,28,0.88)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)' }}
      />

      {/* Modal card */}
      <div
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl"
        style={{
          background: 'rgba(8,13,40,0.98)',
          border: '1px solid rgba(255,255,255,0.13)',
          boxShadow: '0 48px 120px rgba(0,0,0,0.75)',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Hero image */}
        <div className="relative h-64 overflow-hidden rounded-t-3xl shrink-0">
          <img
            src={event.image}
            alt={event.header}
            className="w-full h-full object-cover"
          />
          {/* Gradient fade */}
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(8,13,40,1) 0%, rgba(8,13,40,0.05) 55%)' }} />

          {/* Category pill */}
          <div
            className="absolute top-5 left-5 px-3 py-1 rounded-full text-[9.5px] font-bold uppercase tracking-widest"
            style={{ background: catStyle.bg, border: `1px solid ${catStyle.border}`, color: catStyle.color, backdropFilter: 'blur(8px)' }}
          >
            {event.category}
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
            style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}
          >
            <X size={15} className="text-white" />
          </button>

          {/* Deadline flag on image */}
          {event.deadline && (
            <div
              className="absolute bottom-5 left-5 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9.5px] font-bold uppercase tracking-wider"
              style={{ background: 'rgba(212,32,32,0.25)', border: '1px solid rgba(212,32,32,0.45)', color: '#ff7070', backdropFilter: 'blur(8px)' }}
            >
              <AlertCircle size={10} /> Registration Deadline
            </div>
          )}
        </div>

        {/* Body */}
        <div className="p-7 md:p-9">
          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-wide mb-2 leading-tight">
            {event.header}
          </h2>
          <div className="w-12 h-[2px] mb-7"
            style={{ background: 'linear-gradient(90deg, var(--gold-bright), transparent)' }} />

          {/* Meta grid */}
          <div className="grid sm:grid-cols-2 gap-3 mb-7">
            {[
              { icon: Calendar,     label: 'Date',     value: event.date,     alert: false },
              { icon: Clock,        label: 'Time',     value: event.time,     alert: false },
              { icon: MapPin,       label: 'Location', value: event.location, alert: false },
              ...(event.deadline
                ? [{ icon: AlertCircle, label: 'Deadline / Notes', value: event.deadline, alert: true }]
                : []),
            ].map(({ icon: Icon, label, value, alert }, i) => (
              <div
                key={i}
                className={`flex items-start gap-3 px-4 py-3.5 rounded-xl ${alert ? 'sm:col-span-2' : ''}`}
                style={{
                  background: alert ? 'rgba(212,32,32,0.07)' : 'rgba(255,255,255,0.04)',
                  border:     alert ? '1px solid rgba(212,32,32,0.22)' : '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <Icon size={15} className="shrink-0 mt-0.5"
                  style={{ color: alert ? '#ff6060' : 'var(--gold-bright)' }} />
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/30 mb-0.5">{label}</p>
                  <p className="text-[13px] font-medium leading-relaxed"
                    style={{ color: alert ? '#ff8888' : 'rgba(255,255,255,0.78)' }}>
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="mb-8">
            <p className="text-[9.5px] font-bold uppercase tracking-[0.22em] text-white/25 mb-3">
              About This Event
            </p>
            <p className="text-white/65 text-[14px] leading-[1.9]">{event.description}</p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-white/8">
            <Link to="/contact" className="flex-1" onClick={onClose}>
              <Button variant="gold" size="md" icon={ArrowRight} className="w-full justify-center">
                Register / Enquire
              </Button>
            </Link>
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-full text-[12px] font-bold uppercase tracking-wider text-white/45 transition-all duration-200 hover:text-white"
              style={{ border: '1px solid rgba(255,255,255,0.1)' }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Featured Event Card (hero) ───────────────────────────────────────────────
const FeaturedCard = ({ event, onClick }) => {
  if (!event) return null;
  const catStyle = CATEGORY_STYLES[event.category] || CATEGORY_STYLES.All;

  return (
    <button
      onClick={onClick}
      className="w-full text-left relative rounded-3xl overflow-hidden group transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_32px_80px_rgba(0,0,0,0.55)]"
      style={{ minHeight: '400px', border: '1px solid rgba(255,255,255,0.12)' }}
    >
      {/* Background image */}
      <img
        src={event.image}
        alt={event.header}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(6,15,46,0.97) 0%, rgba(6,15,46,0.25) 55%, transparent 100%)' }} />
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(100deg, rgba(6,15,46,0.65) 0%, transparent 55%)' }} />

      {/* Top badges */}
      <div className="absolute top-6 left-6 flex items-center gap-2">
        <div
          className="px-3 py-1 rounded-full text-[9.5px] font-bold uppercase tracking-widest"
          style={{ background: 'rgba(245,200,66,0.2)', border: '1px solid rgba(245,200,66,0.4)', color: 'var(--gold-bright)', backdropFilter: 'blur(8px)' }}
        >
          ✦ Featured
        </div>
        <div
          className="px-3 py-1 rounded-full text-[9.5px] font-bold uppercase tracking-widest"
          style={{ background: catStyle.bg, border: `1px solid ${catStyle.border}`, color: catStyle.color, backdropFilter: 'blur(8px)' }}
        >
          {event.category}
        </div>
      </div>

      {/* Deadline badge top-right */}
      {event.deadline && (
        <div
          className="absolute top-6 right-6 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider"
          style={{ background: 'rgba(212,32,32,0.2)', border: '1px solid rgba(212,32,32,0.4)', color: '#ff6060', backdropFilter: 'blur(8px)' }}
        >
          <AlertCircle size={9} /> Deadline
        </div>
      )}

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-wide leading-tight mb-3">
          {event.header}
        </h2>
        <p className="text-white/55 text-[14px] leading-relaxed mb-6 max-w-2xl line-clamp-2">
          {event.description}
        </p>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <div className="flex items-center gap-2 text-[12.5px] text-white/55">
            <Calendar size={13} style={{ color: 'var(--gold-bright)' }} />
            {event.date}
          </div>
          <div className="flex items-center gap-2 text-[12.5px] text-white/55">
            <Clock size={13} style={{ color: 'var(--gold-bright)' }} />
            {event.time}
          </div>
          <div className="flex items-center gap-2 text-[12.5px] text-white/55">
            <MapPin size={13} style={{ color: 'var(--gold-bright)' }} />
            {event.location}
          </div>

          {/* View details pill */}
          <div
            className="ml-auto flex items-center gap-2 px-5 py-2.5 rounded-full text-[12px] font-bold uppercase tracking-wider transition-all duration-300 group-hover:gap-3"
            style={{ background: 'rgba(245,200,66,0.15)', border: '1px solid rgba(245,200,66,0.38)', color: 'var(--gold-bright)' }}
          >
            View Details <ChevronRight size={14} />
          </div>
        </div>
      </div>
    </button>
  );
};

// ─── Regular Event Card ───────────────────────────────────────────────────────
const EventCard = ({ event, onClick }) => {
  const catStyle = CATEGORY_STYLES[event.category] || CATEGORY_STYLES.All;

  return (
    <button
      onClick={onClick}
      className="text-left glass rounded-2xl overflow-hidden group transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(0,0,0,0.45)] w-full flex flex-col"
      style={{ border: '1px solid rgba(255,255,255,0.09)' }}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden shrink-0">
        <img
          src={event.image}
          alt={event.header}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.07]"
          loading="lazy"
        />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(6,15,46,0.88) 0%, rgba(6,15,46,0.05) 55%)' }} />

        {/* Category */}
        <div
          className="absolute top-4 left-4 px-2.5 py-1 rounded-full text-[9.5px] font-bold uppercase tracking-widest"
          style={{ background: catStyle.bg, border: `1px solid ${catStyle.border}`, color: catStyle.color, backdropFilter: 'blur(6px)' }}
        >
          {event.category}
        </div>

        {/* Deadline badge */}
        {event.deadline && (
          <div
            className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider"
            style={{ background: 'rgba(212,32,32,0.2)', border: '1px solid rgba(212,32,32,0.4)', color: '#ff6060', backdropFilter: 'blur(6px)' }}
          >
            <AlertCircle size={9} /> Deadline
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <h3
          className="text-white font-bold text-[14.5px] tracking-wide leading-snug mb-3 group-hover:text-gold-bright transition-colors duration-200"
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
          ].map(({ icon: Icon, text }, i) => (
            <div key={i} className="flex items-center gap-2 text-[12px] text-white/40">
              <Icon size={11} style={{ color: 'var(--gold-bright)', flexShrink: 0 }} />
              <span className="truncate">{text}</span>
            </div>
          ))}
        </div>

        {/* Description snippet */}
        <p className="text-white/38 text-[12.5px] leading-relaxed line-clamp-2 mb-4 flex-1">
          {event.description}
        </p>

        {/* Footer CTA */}
        <div className="flex items-center justify-between pt-3.5 border-t border-white/8 mt-auto">
          <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: 'var(--gold-bright)' }}>
            View Details
          </span>
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 group-hover:translate-x-1"
            style={{ background: 'rgba(245,200,66,0.1)', border: '1px solid rgba(245,200,66,0.25)' }}
          >
            <ChevronRight size={13} style={{ color: 'var(--gold-bright)' }} />
          </div>
        </div>
      </div>
    </button>
  );
};

// ─── Stats Bar ────────────────────────────────────────────────────────────────
const StatsBar = ({ total, withDeadline, categoryCount }) => (
  <div className="glass rounded-2xl px-6 py-5 mb-12 grid grid-cols-2 md:grid-cols-4 gap-4">
    {[
      { value: total,          label: 'Total Events',      color: '#f5c842' },
      { value: withDeadline,   label: 'Registration Open', color: '#ff4a4a' },
      { value: categoryCount,  label: 'Categories',        color: '#4a80f0' },
      { value: 'Abelemkpe',    label: 'Primary Venue',     color: '#40c070' },
    ].map((s, i) => (
      <div key={i} className="text-center">
        <div className="text-2xl font-bold mb-0.5"
          style={{ color: s.color, fontFamily: 'var(--font-display)' }}>
          {s.value}
        </div>
        <div className="text-[10.5px] font-bold uppercase tracking-wider text-white/30">{s.label}</div>
      </div>
    ))}
  </div>
);

// ─── Empty State ──────────────────────────────────────────────────────────────
const EmptyState = ({ onClear }) => (
  <div
    className="rounded-2xl p-16 text-center"
    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
  >
    <div
      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
      style={{ background: 'rgba(245,200,66,0.1)', border: '1px solid rgba(245,200,66,0.25)' }}
    >
      <Calendar size={26} style={{ color: 'var(--gold-bright)' }} />
    </div>
    <h3 className="text-white font-bold text-xl mb-2 tracking-wide">No Events Found</h3>
    <p className="text-white/35 text-sm mb-7 max-w-xs mx-auto">
      No events match your current search or filter. Try a different category or clear the search.
    </p>
    <button
      onClick={onClear}
      className="px-6 py-2.5 rounded-full text-[12px] font-bold uppercase tracking-wider transition-all duration-200 hover:-translate-y-[1px]"
      style={{ background: 'rgba(245,200,66,0.12)', border: '1px solid rgba(245,200,66,0.3)', color: 'var(--gold-bright)' }}
    >
      Clear Filters
    </button>
  </div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Events() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery,    setSearchQuery]    = useState('');
  const [selectedEvent,  setSelectedEvent]  = useState(null);

  // Filtered list
  const filtered = useMemo(() => {
    return events.filter(e => {
      const matchCat   = activeCategory === 'All' || e.category === activeCategory;
      const matchQuery = !searchQuery ||
        e.header.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [activeCategory, searchQuery]);

  const featured  = filtered[0] || null;
  const remaining = filtered.slice(1);

  const clearAll = () => { setActiveCategory('All'); setSearchQuery(''); };

  return (
    <>
      <div className="max-w-[1400px] mx-auto px-6 relative z-10 pb-24">

        {/* ── Page Header ── */}
        <div className="max-w-[1200px] mx-auto mb-10">
          <span
            className="inline-block text-[10px] font-bold uppercase tracking-[0.3em] mb-5 px-3 py-1 rounded-full"
            style={{ background: 'rgba(245,200,66,0.1)', border: '1px solid rgba(245,200,66,0.25)', color: 'var(--gold-bright)' }}
          >
            What's Happening
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-wide">
            Upcoming <em>Events</em>
          </h1>
          <div className="w-16 h-[2px] mb-6"
            style={{ background: 'linear-gradient(90deg, var(--gold-bright), transparent)' }} />
          <p className="text-white/50 text-[15px] leading-relaxed max-w-2xl">
            Stay connected with everything happening at BIWC. From retreats and fellowship gatherings
            to discipleship classes and outreach programs — there's always something to be part of.
          </p>
        </div>

        {/* ── Stats ── */}
        <div className="max-w-[1200px] mx-auto">
          <StatsBar
            total={events.length}
            withDeadline={events.filter(e => e.deadline).length}
            categoryCount={ALL_CATEGORIES.length - 1}
          />
        </div>

        {/* ── Search + Filter bar ── */}
        <div className="max-w-[1200px] mx-auto mb-12">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center flex-wrap">

            {/* Search input */}
            <div className="relative w-full sm:w-auto sm:min-w-[260px]">
              <Search size={14}
                className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: 'rgba(255,255,255,0.28)' }}
              />
              <input
                type="text"
                placeholder="Search events…"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 text-[13px] text-white outline-none rounded-xl placeholder-white/25"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  backdropFilter: 'blur(10px)',
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Category filters */}
            <div className="flex items-center gap-2 flex-wrap">
              <Filter size={12} className="text-white/25 shrink-0" />
              {ALL_CATEGORIES.map(cat => (
                <CategoryPill
                  key={cat}
                  cat={cat}
                  active={activeCategory === cat}
                  onClick={() => setActiveCategory(cat)}
                />
              ))}
            </div>

            {/* Active filter count indicator */}
            {(activeCategory !== 'All' || searchQuery) && (
              <button
                onClick={clearAll}
                className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-white/35 hover:text-white/70 transition-colors duration-200 ml-auto"
              >
                <X size={11} /> Clear All
              </button>
            )}
          </div>
        </div>

        {/* ── Main Content ── */}
        <div className="max-w-[1200px] mx-auto">

          {filtered.length === 0 ? (
            <EmptyState onClear={clearAll} />
          ) : (
            <div className="space-y-12">

              {/* Featured event */}
              {featured && (
                <div>
                  <div className="flex items-baseline gap-3 mb-5 border-b border-white/10 pb-4">
                    <h2 className="text-xl font-bold text-white uppercase tracking-wide">
                      Featured <em>Event</em>
                    </h2>
                    <span className="text-white/25 text-sm" style={{ fontStyle: 'italic' }}>
                      Click to view full details
                    </span>
                  </div>
                  <FeaturedCard event={featured} onClick={() => setSelectedEvent(featured)} />
                </div>
              )}

              {/* Remaining grid */}
              {remaining.length > 0 && (
                <div>
                  <div className="flex items-baseline gap-3 mb-6 border-b border-white/10 pb-4">
                    <h2 className="text-xl font-bold text-white uppercase tracking-wide">
                      All <em>Events</em>
                    </h2>
                    <span className="text-white/25 text-base" style={{ fontStyle: 'italic' }}>
                      {remaining.length} more event{remaining.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {remaining.map(event => (
                      <EventCard
                        key={event.id}
                        event={event}
                        onClick={() => setSelectedEvent(event)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── Bottom CTA ── */}
          <div
            className="relative mt-20 rounded-3xl overflow-hidden p-10 md:p-14"
            style={{
              background: 'linear-gradient(135deg, rgba(26,58,143,0.5), rgba(13,31,96,0.82))',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <GeoDots />
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 55%)' }} />
            <div
              className="absolute -right-20 -bottom-20 w-72 h-72 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle,rgba(245,200,66,0.28), transparent)', filter: 'blur(55px)' }}
            />
            <div
              className="absolute -left-14 top-0 w-56 h-56 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle,rgba(212,32,32,0.18), transparent)', filter: 'blur(50px)' }}
            />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-xl">
                <span
                  className="inline-block text-[10px] font-bold uppercase tracking-[0.28em] mb-4 px-3 py-1 rounded-full"
                  style={{ background: 'rgba(245,200,66,0.12)', border: '1px solid rgba(245,200,66,0.28)', color: 'var(--gold-bright)' }}
                >
                  Don't Miss Out
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-wide">
                  Stay <em>Connected</em>
                </h2>
                <p className="text-white/50 text-sm leading-relaxed">
                  Want to be notified about upcoming events, retreats, and programs?
                  Reach out to us and we'll keep you in the loop.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <Link to="/contact">
                  <Button variant="gold" size="lg" icon={ArrowRight}>Get Notified</Button>
                </Link>
                <Link to="/give">
                  <Button variant="ghost" size="lg">Support Events</Button>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Detail Modal (portal-style, outside main div) ── */}
      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </>
  );
}
