import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight,
  ArrowRight,
  Play,
  Phone,
} from 'lucide-react';
import Button from '../components/ui/Button';
import { MINISTRIES } from '../assets/data/ministriesData';

// ─── Geo Pattern SVGs ─────────────────────────────────────────────────────────
const GeoPatterns = {
  dots: () => (
    <div className="absolute inset-0 opacity-10"
      style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
  ),
  lines: () => (
    <div className="absolute inset-0 opacity-10"
      style={{ background: 'repeating-linear-gradient(45deg, #fff, #fff 1px, transparent 1px, transparent 10px)' }} />
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

// ─── Ministry Hero Card ───────────────────────────────────────────────────────
const MinistryCard = ({ ministry, isActive, onClick }) => {
  const GeoEl = GeoPatterns[ministry.geoPattern] || GeoPatterns.dots;
  const Icon = ministry.icon;

  return (
    <button
      onClick={onClick}
      className={`prog-card text-left transition-all duration-500 cursor-pointer w-full ${isActive ? 'ring-2 ring-gold-bright/60 -translate-y-2 shadow-[0_20px_60px_rgba(0,0,0,0.5)]' : ''}`}
      style={{ aspectRatio: '4/5' }}
    >
      {/* Visual Layer */}
      <div className="prog-visual">
        <div className="prog-visual-bg" style={{ background: ministry.gradient }} />
        <GeoEl />
        {/* Shine */}
        <div className="prog-shine" />
        {/* Fade */}
        <div className="prog-fade" />
      </div>

      {/* Category pill */}
      <div className="prog-cat-pill">{ministry.shortTitle}</div>

      {/* Active indicator */}
      {isActive && (
        <div className="absolute top-4 right-4 z-30 w-6 h-6 rounded-full flex items-center justify-center"
          style={{ background: 'var(--gold-bright)' }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 6l3 3 5-5" stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}

      {/* Icon */}
      <div className="prog-art">
        <div className="prog-icon-wrap">
          <Icon size={32} className="text-white opacity-70" />
        </div>
      </div>

      {/* Footer */}
      <div className="prog-footer">
        <div className="prog-footer-text">
          <h4>{ministry.title}</h4>
          <span className="font-italic italic" style={{ color: ministry.accentColor, fontStyle: 'italic' }}>
            {ministry.tagline}
          </span>
        </div>
        <div className="prog-arrow">
          <ChevronRight size={14} />
        </div>
      </div>
    </button>
  );
};

// ─── Detail Panel ─────────────────────────────────────────────────────────────
const MinistryDetail = ({ ministry }) => {
  const Icon = ministry.icon;

  return (
    <div className="glass rounded-3xl overflow-hidden transition-all duration-500"
      style={{ boxShadow: `0 24px 80px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.1)` }}>

      {/* Header Banner */}
      <div className="relative h-52 overflow-hidden">
        <div className="absolute inset-0" style={{ background: ministry.gradient }} />
        {/* Geo pattern */}
        {React.createElement(GeoPatterns[ministry.geoPattern] || GeoPatterns.dots)}
        {/* Shimmer */}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 60%)' }} />
        {/* Fade to glass */}
        <div className="absolute bottom-0 left-0 right-0 h-24"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(9,9,30,0.95))' }} />

        {/* Icon */}
        <div className="absolute bottom-6 left-6 flex items-end gap-4">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)' }}>
            <Icon size={28} className="text-white" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-1">Ministry</p>
            <h2 className="text-2xl font-bold text-white tracking-wide">{ministry.title}</h2>
          </div>
        </div>

        {/* Members badge */}
        <div className="absolute top-5 right-5 px-3 py-1.5 rounded-full text-xs font-bold"
          style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)', color: ministry.accentColor }}>
          {ministry.members} Members
        </div>
      </div>

      {/* Body */}
      <div className="p-6 space-y-6">
        {/* Tagline */}
        <p className="font-italic italic text-lg" style={{ color: ministry.accentColor, fontStyle: 'italic' }}>
          {ministry.tagline}
        </p>

        {/* Description */}
        <p className="text-white/65 text-sm leading-relaxed">{ministry.description}</p>

        {/* Mission */}
        <div className="rounded-xl p-4 relative overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl" style={{ background: ministry.gradient }} />
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/30 mb-2 ml-3">Our Mission</p>
          <p className="text-white/80 text-sm leading-relaxed italic ml-3 font-medium">{ministry.mission}</p>
        </div>

        {/* Activities */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/30 mb-3">What We Do</p>
          <div className="grid grid-cols-2 gap-2">
            {ministry.activities.map((activity, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-white/60">
                <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: ministry.accentColor }} />
                {activity}
              </div>
            ))}
          </div>
        </div>

        {/* Meta */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-white/30 mb-1">Meeting Time</p>
            <p className="text-white text-xs font-bold leading-snug">{ministry.meetingTime}</p>
          </div>
          <div className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-white/30 mb-1">Leader</p>
            <p className="text-white text-xs font-bold leading-snug">{ministry.leader}</p>
          </div>
        </div>

        {/* CTA */}
        <div className="flex gap-3 pt-1">
          <button className="flex-1 py-3 rounded-full text-[12px] font-bold uppercase tracking-wider transition-all duration-200 hover:-translate-y-[2px]"
            style={{
              background: ministry.gradient,
              color: '#fff',
              boxShadow: `0 4px 20px rgba(0,0,0,0.35)`,
            }}>
            Join This Ministry
          </button>
          <Link to="/contact"
            className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:-translate-y-[2px]"
            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}>
            <Phone size={16} className="text-white/60" />
          </Link>
        </div>
      </div>
    </div>
  );
};

// ─── Page Header ──────────────────────────────────────────────────────────────
const PageHeader = () => (
  <div className="relative mb-16 overflow-hidden">
    {/* Decorative cross */}
    <div className="absolute -right-10 -top-10 w-64 h-64 opacity-[0.03] pointer-events-none">
      <svg viewBox="0 0 200 200" fill="white" xmlns="http://www.w3.org/2000/svg">
        <rect x="80" y="0" width="40" height="200" />
        <rect x="0" y="80" width="200" height="40" />
      </svg>
    </div>

    <span className="inline-block text-[10px] font-bold uppercase tracking-[0.3em] text-gold-bright mb-4 px-3 py-1 rounded-full"
      style={{ background: 'rgba(245,200,66,0.1)', border: '1px solid rgba(245,200,66,0.25)' }}>
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

// ─── Stats Strip ──────────────────────────────────────────────────────────────
const StatsStrip = () => (
  <div className="glass rounded-2xl p-6 mb-16 grid grid-cols-2 md:grid-cols-4 gap-6">
    {[
      { value: '8', label: 'Active Ministries', color: '#f5c842' },
      { value: '350+', label: 'Ministry Members', color: '#4a80f0' },
      { value: '15+', label: 'Years of Ministry', color: '#ff4a4a' },
      { value: '∞', label: 'Lives Transformed', color: '#40c070' },
    ].map((stat, i) => (
      <div key={i} className="text-center">
        <div className="text-3xl font-bold mb-1" style={{ color: stat.color, fontFamily: 'var(--font-display)' }}>
          {stat.value}
        </div>
        <div className="text-white/40 text-[11px] uppercase tracking-wider font-bold">{stat.label}</div>
      </div>
    ))}
  </div>
);

// ─── Join CTA ─────────────────────────────────────────────────────────────────
const JoinCTA = () => (
  <div className="relative mt-20 rounded-3xl overflow-hidden"
    style={{ background: 'linear-gradient(135deg, rgba(26,58,143,0.5), rgba(13,31,96,0.8))', border: '1px solid rgba(255,255,255,0.1)' }}>

    {/* Background pattern */}
    <div className="absolute inset-0 opacity-5"
      style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
    <div className="absolute inset-0"
      style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 60%)' }} />

    {/* Decorative orb */}
    <div className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full opacity-20"
      style={{ background: 'radial-gradient(circle, #f5c842, transparent)', filter: 'blur(40px)' }} />

    <div className="relative z-10 p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8">
      <div className="max-w-xl">
        <span className="inline-block text-[10px] font-bold uppercase tracking-[0.25em] text-gold-bright mb-4">
          Not Sure Where to Start?
        </span>
        <h2 className="text-3xl font-bold text-white mb-3 tracking-wide">
          Find Your <em>Place</em>
        </h2>
        <p className="text-white/50 text-sm leading-relaxed">
          Every member of BIWC is a minister. We'll help you discover your spiritual gifts and connect you to the ministry where you'll thrive and make the greatest impact.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 shrink-0">
        <Link to="/contact">
          <Button variant="gold" size="lg" icon={ArrowRight}>
            Get Connected
          </Button>
        </Link>
        <Link to="/about">
          <Button variant="ghost" size="lg">
            Learn More
          </Button>
        </Link>
      </div>
    </div>
  </div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Ministries() {
  const [activeId, setActiveId] = useState(MINISTRIES[0].id);

  const activeMinistry = MINISTRIES.find(m => m.id === activeId) || MINISTRIES[0];

  return (
    <div className="max-w-[1400px] mx-auto px-6 relative z-10 pb-24">

      <PageHeader />
      <StatsStrip />

      {/* Main Layout: Cards + Detail Panel */}
      <div className="flex flex-col xl:flex-row gap-10">

        {/* Left: Ministry Grid */}
        <div className="flex-1">
          {/* Section label */}
          <div className="flex items-baseline gap-3 mb-6 border-b border-white/10 pb-4">
            <h2 className="text-xl font-bold text-white uppercase tracking-wide">
              All <em>Ministries</em>
            </h2>
            <span className="font-italic italic text-white/30 text-base" style={{ fontStyle: 'italic' }}>
              Select one to explore
            </span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3 gap-5">
            {MINISTRIES.map(ministry => (
              <MinistryCard
                key={ministry.id}
                ministry={ministry}
                isActive={activeId === ministry.id}
                onClick={() => setActiveId(ministry.id)}
              />
            ))}
          </div>
        </div>

        {/* Right: Detail Panel (Sticky) */}
        <div className="xl:w-[380px] shrink-0">
          <div className="sticky top-36">
            {/* Label */}
            <div className="flex items-baseline gap-3 mb-6 border-b border-white/10 pb-4">
              <h2 className="text-xl font-bold text-white uppercase tracking-wide">
                Ministry <em>Details</em>
              </h2>
            </div>
            <MinistryDetail ministry={activeMinistry} />

            {/* Quick links */}
            <div className="mt-5 glass rounded-2xl p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-4">
                Quick Actions
              </p>
              <div className="space-y-2">
                <Link to="/give"
                  className="flex items-center justify-between px-4 py-3 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/8 transition-all duration-200 group"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <span className="font-medium">Support the Ministries</span>
                  <ChevronRight size={14} className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                </Link>
                <a href="https://youtube.com/@biwcghana" target="_blank" rel="noreferrer"
                  className="flex items-center justify-between px-4 py-3 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/8 transition-all duration-200 group"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <span className="flex items-center gap-2 font-medium">
                    <Play size={13} /> Watch Ministry Content
                  </span>
                  <ChevronRight size={14} className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                </a>
                <Link to="/contact"
                  className="flex items-center justify-between px-4 py-3 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/8 transition-all duration-200 group"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <span className="font-medium">Contact a Ministry Leader</span>
                  <ChevronRight size={14} className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <JoinCTA />
    </div>
  );
}
