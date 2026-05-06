import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Music, Baby, Video, HeartHandshake, Star,
  Shield, Heart, Zap, Users,
  ChevronRight, ArrowRight, Play, Phone, ExternalLink,
} from 'lucide-react';
import Button from '../components/ui/Button';
import { MINISTRIES_DATA } from '../assets/data/ministriesData';

// ─── Icon map ─────────────────────────────────────────────────────────────────
const ICON_MAP = {
  Music, Baby, Video, HeartHandshake,
  Star, Shield, Heart, Zap, Users,
};

// ─── Geo patterns ─────────────────────────────────────────────────────────────
const GeoPatterns = {
  dots: () => (
    <div className="absolute inset-0 opacity-10"
      style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
  ),
  lines: () => (
    <div className="absolute inset-0 opacity-10"
      style={{ background: 'repeating-linear-gradient(45deg,#fff,#fff 1px,transparent 1px,transparent 10px)' }} />
  ),
  cross: () => (
    <div className="absolute inset-0 opacity-10"
      style={{ background: 'linear-gradient(90deg,#fff 1px,transparent 1px) 0 0/20px 20px, linear-gradient(0deg,#fff 1px,transparent 1px) 0 0/20px 20px' }} />
  ),
  rings: () => (
    <div className="absolute inset-0 opacity-10"
      style={{ background: 'radial-gradient(circle,transparent 40%,#fff 41%,#fff 44%,transparent 45%) 0 0/40px 40px' }} />
  ),
};

// ─── Small member avatars for the detail panel ────────────────────────────────
const MiniAvatar = ({ member, accentColor }) => {
  const initials = member.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  return (
    <div className="flex flex-col items-center gap-1.5 text-center">
      <div
        className="w-11 h-11 rounded-full flex items-center justify-center text-[12px] font-bold overflow-hidden shrink-0"
        style={{
          background: member.image ? 'transparent'
            : 'linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.05))',
          border: `1px solid ${accentColor}40`,
          color: accentColor,
        }}
      >
        {member.image
          ? <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
          : initials}
      </div>
      <div>
        <p className="text-white text-[11px] font-bold leading-tight">{member.name}</p>
        <p className="text-[9.5px] font-medium leading-tight mt-0.5" style={{ color: accentColor }}>
          {member.role}
        </p>
      </div>
    </div>
  );
};

// ─── Ministry poster card ─────────────────────────────────────────────────────
// Clicking selects it in the panel; the footer arrow links to the full page
const MinistryCard = ({ ministry, isActive, onSelect }) => {
  return (
    <div
      className={`prog-card relative transition-all duration-500 cursor-pointer ${
        isActive ? 'ring-2 ring-gold-bright/60 -translate-y-2 shadow-[0_20px_60px_rgba(0,0,0,0.5)]' : ''
      }`}
      style={{ aspectRatio: '4/5' }}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onSelect()}
    >
      {/* Visual */}
      <div className="prog-visual">
        {ministry.image
          ? <img src={ministry.image} alt={ministry.title} className="prog-visual-bg w-full h-full object-cover" />
          : <div className="prog-visual-bg" style={{ background: ministry.gradient }} />}
        <div className="prog-shine" />
        <div className="prog-fade" />
      </div>

      {/* Pill */}
      <div className="prog-cat-pill">{ministry.shortTitle}</div>

      {/* Active check */}
      {isActive && (
        <div className="absolute top-4 right-4 z-30 w-6 h-6 rounded-full flex items-center justify-center"
          style={{ background: 'var(--gold-bright)' }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 6l3 3 5-5" stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}

      {/* Footer — arrow is a Link to the full page */}
      <div className="prog-footer">
        <div className="prog-footer-text">
          <h4>{ministry.title}</h4>
          <span style={{ color: ministry.accentColor, fontStyle: 'italic' }}>{ministry.tagline}</span>
        </div>
        {/* Stop propagation so clicking the arrow doesn't also trigger onSelect */}
        <Link
          to={`/ministries/${ministry.id}`}
          onClick={e => e.stopPropagation()}
          className="prog-arrow hover:scale-110 transition-transform duration-200"
          title={`View ${ministry.title} full page`}
        >
          <ExternalLink size={13} />
        </Link>
      </div>
    </div>
  );
};

// ─── Side detail panel ────────────────────────────────────────────────────────
const MinistryDetail = ({ ministry }) => {
  const Icon = ICON_MAP[ministry.icon] || Users;
  const hasMembers = ministry.members?.length > 0;

  return (
    <div className="glass rounded-3xl overflow-hidden"
      style={{ boxShadow: '0 24px 80px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.1)' }}>

      {/* Banner */}
      <div className="relative h-48 overflow-hidden">
        {ministry.image
          ? <img src={ministry.image} alt={ministry.title} className="absolute inset-0 w-full h-full object-cover opacity-60" />
          : <div className="absolute inset-0" style={{ background: ministry.gradient }} />}
        {React.createElement(GeoPatterns[ministry.geoPattern] || GeoPatterns.dots)}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 60%)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-20"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(9,9,30,0.96))' }} />

        <div className="absolute bottom-5 left-5 flex items-end gap-3">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)' }}>
            <Icon size={24} className="text-white" />
          </div>
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/35 mb-0.5">Ministry</p>
            <h2 className="text-[17px] font-bold text-white tracking-wide leading-tight">{ministry.title}</h2>
          </div>
        </div>

        {hasMembers && (
          <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-[10px] font-bold"
            style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)', color: ministry.accentColor }}>
            {ministry.members.length} Members
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-5 space-y-4">

        {/* Tagline */}
        <p className="text-sm font-medium" style={{ color: ministry.accentColor, fontStyle: 'italic' }}>
          {ministry.tagline}
        </p>

        {/* Description */}
        <p className="text-white/55 text-[13px] leading-relaxed">{ministry.description}</p>

        {/* Mission */}
        <div className="rounded-xl p-4 relative overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl" style={{ background: ministry.gradient }} />
          <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/28 mb-1.5 ml-3">Mission</p>
          <p className="text-white/70 text-[12.5px] leading-relaxed italic ml-3">{ministry.mission}</p>
        </div>

        {/* Activities */}
        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/28 mb-2.5">What We Do</p>
          <div className="grid grid-cols-2 gap-1.5">
            {ministry.activities.map((a, i) => (
              <div key={i} className="flex items-center gap-2 text-[12px] text-white/50">
                <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: ministry.accentColor }} />
                {a}
              </div>
            ))}
          </div>
        </div>

        {/* Members preview */}
        {hasMembers && (
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/28 mb-3">Team</p>
            <div className="flex flex-wrap gap-3">
              {ministry.members.slice(0, 4).map(m => (
                <MiniAvatar key={m.id} member={m} accentColor={ministry.accentColor} />
              ))}
              {ministry.members.length > 4 && (
                <div className="flex flex-col items-center justify-center gap-1">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center text-[11px] font-bold"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.4)' }}>
                    +{ministry.members.length - 4}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Meeting time */}
        <div className="rounded-xl p-3"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-white/28 mb-1">Meeting Time</p>
          <p className="text-white text-[12px] font-bold">{ministry.meetingTime}</p>
        </div>

        {/* CTAs */}
        <div className="flex gap-2.5 pt-1">
          {/* Primary: full page */}
          <Link to={`/ministries/${ministry.id}`} className="flex-1">
            <button
              className="w-full py-3 rounded-full text-[12px] font-bold uppercase tracking-wider transition-all duration-200 hover:-translate-y-[2px] flex items-center justify-center gap-2"
              style={{ background: ministry.gradient, color: '#fff', boxShadow: '0 4px 20px rgba(0,0,0,0.35)' }}
            >
              View Full Page <ExternalLink size={12} />
            </button>
          </Link>
          {/* Secondary: contact */}
          <Link to="/contact"
            className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 hover:-translate-y-[2px] shrink-0"
            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.14)' }}>
            <Phone size={15} className="text-white/55" />
          </Link>
        </div>
      </div>
    </div>
  );
};

// ─── Page header ──────────────────────────────────────────────────────────────
const PageHeader = () => (
  <div className="relative mb-14 overflow-hidden">
    <div className="absolute -right-10 -top-10 w-64 h-64 opacity-[0.03] pointer-events-none select-none">
      <svg viewBox="0 0 200 200" fill="white">
        <rect x="80" y="0" width="40" height="200" />
        <rect x="0" y="80" width="200" height="40" />
      </svg>
    </div>
    <span className="inline-block text-[10px] font-bold uppercase tracking-[0.3em] text-gold-bright mb-4 px-3 py-1 rounded-full"
      style={{ background: 'rgba(245,200,66,0.10)', border: '1px solid rgba(245,200,66,0.25)' }}>
      Get Involved
    </span>
    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-wide">
      Our <em>Ministries</em>
    </h1>
    <div className="w-16 h-[2px] mb-6" style={{ background: 'linear-gradient(90deg, #f5c842, transparent)' }} />
    <p className="text-white/50 text-base leading-relaxed max-w-2xl">
      Every believer is called to serve. Explore our ministries and find your place in the body of Christ — where your gifts are valued, your growth is nurtured, and your purpose is unlocked.
    </p>
  </div>
);

// ─── Stats strip ──────────────────────────────────────────────────────────────
const StatsStrip = () => (
  <div className="glass rounded-2xl p-6 mb-14 grid grid-cols-2 md:grid-cols-4 gap-6">
    {[
      { value: `${MINISTRIES_DATA.length}`, label: 'Active Ministries', color: '#f5c842' },
      { value: '350+', label: 'Ministry Members',  color: '#4a80f0' },
      { value: '15+',  label: 'Years of Ministry', color: '#ff4a4a' },
      { value: '∞',    label: 'Lives Transformed',  color: '#40c070' },
    ].map((stat, i) => (
      <div key={i} className="text-center">
        <div className="text-3xl font-bold mb-1"
          style={{ color: stat.color, fontFamily: 'var(--font-display)' }}>
          {stat.value}
        </div>
        <div className="text-white/40 text-[11px] uppercase tracking-wider font-bold">{stat.label}</div>
      </div>
    ))}
  </div>
);

// ─── Bottom CTA ───────────────────────────────────────────────────────────────
const JoinCTA = () => (
  <div className="relative mt-20 rounded-3xl overflow-hidden"
    style={{ background: 'linear-gradient(135deg, rgba(26,58,143,0.5), rgba(13,31,96,0.8))', border: '1px solid rgba(255,255,255,0.1)' }}>
    <div className="absolute inset-0 opacity-5"
      style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
    <div className="absolute inset-0"
      style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 60%)' }} />
    <div className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full opacity-20 pointer-events-none"
      style={{ background: 'radial-gradient(circle, #f5c842, transparent)', filter: 'blur(40px)' }} />

    <div className="relative z-10 p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8">
      <div className="max-w-xl">
        <span className="inline-block text-[10px] font-bold uppercase tracking-[0.25em] text-gold-bright mb-4">
          Not Sure Where to Start?
        </span>
        <h2 className="text-3xl font-bold text-white mb-3 tracking-wide">Find Your <em>Place</em></h2>
        <p className="text-white/50 text-sm leading-relaxed">
          Every member of BIWC is a minister. We'll help you discover your spiritual gifts and connect you to the ministry where you'll thrive and make the greatest impact.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 shrink-0">
        <Link to="/contact">
          <Button variant="gold" size="lg" icon={ArrowRight}>Get Connected</Button>
        </Link>
        <Link to="/about">
          <Button variant="ghost" size="lg">Learn More</Button>
        </Link>
      </div>
    </div>
  </div>
);

// ─── Main page ────────────────────────────────────────────────────────────────
export default function Ministries() {
  const [activeId, setActiveId] = useState(MINISTRIES_DATA[0].id);
  const activeMinistry = MINISTRIES_DATA.find(m => m.id === activeId) || MINISTRIES_DATA[0];

  return (
    <div className="max-w-[1400px] mx-auto px-6 relative z-10 pb-24">
      <PageHeader />
      <StatsStrip />

      <div className="flex flex-col xl:flex-row gap-10">

        {/* ── Left: grid ── */}
        <div className="flex-1">
          <div className="flex items-baseline gap-3 mb-6 border-b border-white/10 pb-4">
            <h2 className="text-xl font-bold text-white uppercase tracking-wide">All <em>Ministries</em></h2>
            <span className="text-white/30 text-base" style={{ fontStyle: 'italic' }}>
              Click to preview · <ExternalLink size={11} className="inline mb-0.5" /> opens full page
            </span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3 gap-5">
            {MINISTRIES_DATA.map(ministry => (
              <MinistryCard
                key={ministry.id}
                ministry={ministry}
                isActive={activeId === ministry.id}
                onSelect={() => setActiveId(ministry.id)}
              />
            ))}
          </div>
        </div>

        {/* ── Right: sticky detail ── */}
        <div className="xl:w-[380px] shrink-0">
          <div className="sticky top-36">
            <div className="flex items-baseline gap-3 mb-6 border-b border-white/10 pb-4">
              <h2 className="text-xl font-bold text-white uppercase tracking-wide">
                Ministry <em>Details</em>
              </h2>
            </div>

            <MinistryDetail ministry={activeMinistry} />

            {/* Quick links */}
            <div className="mt-5 glass rounded-2xl p-5">
              <p className="text-[9.5px] font-bold uppercase tracking-[0.2em] text-white/30 mb-4">Quick Actions</p>
              <div className="space-y-2">
                {[
                  { label: 'Support the Ministries', to: '/give' },
                  { label: 'Watch Ministry Content', href: 'https://youtube.com/@biwcghana', icon: <Play size={12} /> },
                  { label: 'Contact a Ministry Leader', to: '/contact' },
                ].map((item, i) =>
                  item.href ? (
                    <a key={i} href={item.href} target="_blank" rel="noreferrer"
                      className="flex items-center justify-between px-4 py-3 rounded-xl text-[12.5px] text-white/50 hover:text-white transition-all duration-200 group"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                      <span className="flex items-center gap-2 font-medium">{item.icon}{item.label}</span>
                      <ChevronRight size={13} className="opacity-35 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                    </a>
                  ) : (
                    <Link key={i} to={item.to}
                      className="flex items-center justify-between px-4 py-3 rounded-xl text-[12.5px] text-white/50 hover:text-white transition-all duration-200 group"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                      <span className="font-medium">{item.label}</span>
                      <ChevronRight size={13} className="opacity-35 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                    </Link>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <JoinCTA />
    </div>
  );
}
