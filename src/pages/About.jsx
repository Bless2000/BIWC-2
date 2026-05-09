import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Quote, Heart, Zap, Users,
  Globe, BookOpen, Shield, ChevronRight,
  MapPin, Phone, Mail,
} from 'lucide-react';
import Button from '../components/ui/Button';

// ─── Image Imports ─────────────────────────────────────────────────────────
import pastorImg from '../assets/images/Rev-dr-Ernest.jpg';
import churchImg from '../assets/images/church.jpg';

// ─── Static data ─────────────────────────────────────────────────────────────
const CORE_VALUES = [
  { icon: BookOpen, title: 'Word-Centred',     color: '#4a80f0', body: 'Everything we do is anchored in the truth of the Holy Scriptures. The Bible is our final authority for faith and practice.' },
  { icon: Zap,      title: 'Spirit-Filled',    color: '#f5c842', body: 'We believe in the active work of the Holy Spirit — moving, healing, and empowering believers for kingdom service.' },
  { icon: Heart,    title: 'Love-Driven',      color: '#ff4a4a', body: 'The love of Christ compels us — toward God in worship, toward each other in fellowship, and toward the world in mission.' },
  { icon: Users,    title: 'Community-Rooted', color: '#40c070', body: "We are a family, not just a congregation. We bear one another's burdens, celebrate together, and grow together." },
  { icon: Globe,    title: 'Mission-Minded',   color: '#a070f0', body: 'The Great Commission is our mandate. We exist to make disciples of all nations — starting right here in Accra.' },
  { icon: Shield,   title: 'Integrity-Led',    color: '#20c0c0', body: 'We hold ourselves to the highest standard of character — in our leadership, our stewardship, and our daily witness.' },
];

const LEADERSHIP = [
  { 
    name: "Rev. Dr. Ernest Adu Gyamfi", 
    role: 'Lead Pastor',           
    bio: 'A visionary leader with a deep passion for the Word of God and the people of God. Committed to raising believers who impact their generation.',
    image: pastorImg
  },
  { 
    name: "Elder's Name",  
    role: 'Elder / Board Chairman', 
    bio: "A pillar of wisdom and prayer. Serves the church with decades of faithful service and a shepherd's heart for every member." 
  },
  { 
    name: "Deacon's Name", 
    role: 'Head Deacon',           
    bio: 'An exemplary servant-leader who ensures the practical ministry of the church runs with excellence and integrity.' 
  },
];

const MILESTONES = [
  { year: '2008', title: 'Founded',           body: 'BIWC was established with a small but faithful group of believers with a vision to transform Accra.' },
  { year: '2011', title: 'First Building',    body: 'The congregation moved into its first permanent building — a landmark answered prayer.' },
  { year: '2015', title: 'Youth Explosion',   body: 'The Youth Fellowship was formally launched, becoming one of the fastest-growing arms of the church.' },
  { year: '2018', title: 'Media Launch',      body: 'BIWC went online, launching its YouTube channel and live streaming to reach beyond its walls.' },
  { year: '2021', title: 'Abelemkpe Campus',  body: 'The church relocated to its current home in Abelemkpe — a dedicated worship centre for the community.' },
  { year: 'Now',  title: 'Still Growing',     body: 'With 8 active ministries and a growing congregation, BIWC continues to expand its impact across Accra and beyond.' },
];

const MVV = [
  {
    label: 'Our Mission', heading: 'What We Do',
    icon: '✦', color: '#4a80f0',
    gradient: 'linear-gradient(135deg, rgba(13,42,122,0.65), rgba(37,85,192,0.35))',
    border: 'rgba(74,128,240,0.28)',
    body: 'To make disciples of Jesus Christ through the preaching of the Gospel, equipping the saints for ministry, and transforming lives and communities with the love and power of God.',
  },
  {
    label: 'Our Vision', heading: "Where We're Going",
    icon: '◎', color: '#f5c842',
    gradient: 'linear-gradient(135deg, rgba(122,74,0,0.65), rgba(200,144,10,0.35))',
    border: 'rgba(245,200,66,0.28)',
    body: 'To be a lighthouse church — a centre of excellence in the body of Christ that raises kingdom-minded believers who impact every sphere of society in Accra, Ghana, and the nations.',
  },
  {
    label: 'Our Motto', heading: 'How We Live',
    icon: '"', color: '#ff4a4a',
    gradient: 'linear-gradient(135deg, rgba(122,10,10,0.65), rgba(212,32,32,0.35))',
    border: 'rgba(255,74,74,0.28)',
    body: '"Transformed by the Word, Empowered by the Spirit." Every sermon, every service, and every ministry is designed to see lives genuinely changed from the inside out.',
  },
];

const BELIEFS = [
  { ref: 'Genesis 1:1',  text: 'We believe in one God — Father, Son, and Holy Spirit — eternally existing in three persons.' },
  { ref: 'John 3:16',    text: 'We believe in the death and resurrection of Jesus Christ as the only means of salvation.' },
  { ref: '2 Tim 3:16',   text: 'We believe the Holy Bible is the inspired, infallible Word of God and our supreme authority.' },
  { ref: 'Acts 2:4',     text: 'We believe in the baptism of the Holy Spirit with the evidence of speaking in other tongues.' },
  { ref: 'Matt 28:19',   text: 'We believe in water baptism by immersion as a public declaration of faith in Christ.' },
  { ref: '1 Thess 4:16', text: 'We believe in the imminent, personal return of Jesus Christ for His church.' },
];

// ─── Geo patterns ─────────────────────────────────────────────────────────────
const GeoDots = () => (
  <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
    style={{ backgroundImage: 'radial-gradient(circle,#fff 1px,transparent 1px)', backgroundSize: '22px 22px' }} />
);
const GeoCross = () => (
  <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
    style={{ background: 'linear-gradient(90deg,#fff 1px,transparent 1px) 0 0/22px 22px,linear-gradient(0deg,#fff 1px,transparent 1px) 0 0/22px 22px' }} />
);

// ─── Reusable section heading ─────────────────────────────────────────────────
const SectionHead = ({ eyebrow, title, italic, subtitle, center = false }) => (
  <div className={`mb-8 md:mb-12 ${center ? 'text-center' : ''}`}>
    <span
      className="inline-block text-[10px] font-bold uppercase tracking-[0.28em] mb-3 px-3 py-1 rounded-full"
      style={{ background: 'rgba(245,200,66,0.1)', border: '1px solid rgba(245,200,66,0.25)', color: 'var(--gold-bright)' }}
    >
      {eyebrow}
    </span>
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-wide">
      {title} {italic && <em>{italic}</em>}
    </h2>
    <div className={`w-12 h-[2px] mt-3 ${center ? 'mx-auto' : ''}`}
      style={{ background: 'linear-gradient(90deg, var(--gold-bright), transparent)' }} />
    {subtitle && (
      <p className={`text-white/50 text-[14px] md:text-[15px] leading-relaxed mt-4 max-w-2xl ${center ? 'mx-auto' : ''}`}>
        {subtitle}
      </p>
    )}
  </div>
);

// ─── Value card ───────────────────────────────────────────────────────────────
const ValueCard = ({ value }) => {
  const Icon = value.icon;
  return (
    <div
      className="glass rounded-2xl p-5 flex flex-col gap-3 relative overflow-hidden group transition-all duration-300 hover:-translate-y-1"
      style={{ border: '1px solid rgba(255,255,255,0.09)' }}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 70% 50% at 50% 0%, ${value.color}14, transparent)` }} />
      <div className="absolute top-0 left-6 right-6 h-[2px] rounded-b-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${value.color}, transparent)` }} />
      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: `${value.color}15`, border: `1px solid ${value.color}30` }}>
        <Icon size={18} style={{ color: value.color }} />
      </div>
      <div>
        <h3 className="text-white font-bold text-[14px] tracking-wide mb-1.5">{value.title}</h3>
        <p className="text-white/50 text-[13px] leading-relaxed">{value.body}</p>
      </div>
    </div>
  );
};

// ─── Leadership card ──────────────────────────────────────────────────────────
const LeaderCard = ({ person }) => {
  const initials = person.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  return (
    <div
      className="glass rounded-2xl overflow-hidden group transition-all duration-300 hover:-translate-y-1 relative"
      style={{ border: '1px solid rgba(255,255,255,0.09)' }}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(245,200,66,0.08), transparent)' }} />

      {/* Avatar area */}
      <div className="relative h-44 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, rgba(26,58,143,0.5), rgba(6,15,46,0.8))' }}>
        <GeoDots />
        {person.image
          ? <img src={person.image} alt={person.name}
              className="absolute inset-0 w-full h-full object-cover object-top opacity-80 group-hover:scale-105 transition-transform duration-700" />
          : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold"
                style={{ background: 'rgba(255,255,255,0.06)', border: '2px solid rgba(245,200,66,0.3)', color: 'var(--gold-bright)', fontFamily: 'var(--font-display)' }}>
                {initials}
              </div>
            </div>
          )
        }
        <div className="absolute bottom-0 left-0 right-0 h-14"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(6,15,46,0.95))' }} />
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest"
          style={{ background: 'rgba(245,200,66,0.15)', border: '1px solid rgba(245,200,66,0.3)', color: 'var(--gold-bright)' }}>
          {person.role}
        </div>
      </div>

      <div className="p-4 md:p-5">
        <h3 className="text-white font-bold text-base tracking-wide mb-1">{person.name}</h3>
        <p className="text-white/45 text-[12.5px] leading-relaxed">{person.bio}</p>
      </div>
    </div>
  );
};

// ─── Timeline item — mobile: left-spine, desktop: alternating ────────────────
const TimelineItem = ({ item, index, isLast }) => {
  const isEven = index % 2 === 0;
  return (
    <>
      {/* MOBILE (< md) */}
      <div className="flex items-start gap-3 md:hidden">
        <div className="flex flex-col items-center shrink-0 pt-1">
          <div className="w-8 h-8 rounded-full flex items-center justify-center z-10 shrink-0"
            style={{ background: 'linear-gradient(135deg, var(--gold), #e8a820)', boxShadow: '0 0 14px rgba(200,144,10,0.4)' }}>
            <span className="text-[9px] font-bold text-black">{item.year === 'Now' ? '✦' : item.year.slice(2)}</span>
          </div>
          {!isLast && (
            <div className="w-[2px] flex-1 mt-1.5 min-h-[32px]"
              style={{ background: 'linear-gradient(to bottom, rgba(245,200,66,0.4), rgba(245,200,66,0.06))' }} />
          )}
        </div>
        <div className="flex-1 pb-5">
          <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)' }}>
            <p className="text-[9px] font-bold uppercase tracking-[0.25em] mb-1" style={{ color: 'var(--gold-bright)' }}>{item.year}</p>
            <h4 className="text-white font-bold text-[13.5px] mb-1 tracking-wide">{item.title}</h4>
            <p className="text-white/45 text-[12px] leading-relaxed">{item.body}</p>
          </div>
        </div>
      </div>

      {/* DESKTOP (≥ md) */}
      <div className={`hidden md:flex items-start ${isEven ? 'flex-row' : 'flex-row-reverse'}`}>
        {/* Content side */}
        <div className={`w-[calc(50%-28px)] ${isEven ? 'pr-8 flex justify-end' : 'pl-8'}`}>
          <div className="glass rounded-xl p-5 transition-all duration-300 hover:-translate-y-1 w-full max-w-[320px]"
            style={{ border: '1px solid rgba(255,255,255,0.09)' }}>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] mb-2" style={{ color: 'var(--gold-bright)' }}>{item.year}</p>
            <h4 className="text-white font-bold text-[15px] mb-1.5 tracking-wide">{item.title}</h4>
            <p className="text-white/45 text-[12.5px] leading-relaxed">{item.body}</p>
          </div>
        </div>
        {/* Centre dot */}
        <div className="relative flex flex-col items-center w-14 shrink-0">
          <div className="w-10 h-10 rounded-full flex items-center justify-center z-10"
            style={{ background: 'linear-gradient(135deg, var(--gold), #e8a820)', boxShadow: '0 0 20px rgba(200,144,10,0.45)' }}>
            <span className="text-[10px] font-bold text-black">{item.year === 'Now' ? '✦' : item.year.slice(2)}</span>
          </div>
          {!isLast && (
            <div className="w-[2px] flex-1 mt-2"
              style={{ background: 'linear-gradient(to bottom, rgba(245,200,66,0.4), rgba(245,200,66,0.05))' }} />
          )}
        </div>
        {/* Spacer */}
        <div className="w-[calc(50%-28px)]" />
      </div>
    </>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function About() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10 pb-16 md:pb-24">

      {/* ══════════════════════════════════════════════════
          ① HERO
      ══════════════════════════════════════════════════ */}
      <section className="max-w-[1200px] mx-auto mb-16 md:mb-24">

        {/* Intro text */}
        <div className="mb-8">
          <span className="inline-block text-[10px] font-bold uppercase tracking-[0.3em] mb-4 px-3 py-1 rounded-full"
            style={{ background: 'rgba(245,200,66,0.1)', border: '1px solid rgba(245,200,66,0.25)', color: 'var(--gold-bright)' }}>
            About Us
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-white leading-[1.1] mb-4 tracking-wide">
            We Are <em>BIWC</em>
          </h1>
          <div className="w-14 h-[2px] mb-5"
            style={{ background: 'linear-gradient(90deg, var(--gold-bright), transparent)' }} />
          <p className="text-white/55 text-[14px] md:text-[15px] leading-[1.85] max-w-2xl">
            Believers International Worship Center is a Spirit-filled, Word-driven community
            of faith planted in the heart of Abelemkpe, Accra. We exist for one reason:
            to know God deeply and make Him known boldly.
          </p>
        </div>

        {/* Hero image grid
            Mobile:  Pastor image full width → church + scripture stacked below
            Tablet:  Same stacked layout, taller
            Desktop: 2-col left (pastor) + 1-col right (church stacked + scripture) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Pastor — spans 2 cols on desktop */}
          <div className="md:col-span-2 relative rounded-2xl overflow-hidden group"
            style={{ height: '280px', border: '1px solid rgba(255,255,255,0.12)' }}>
            <div className="absolute inset-0"
              style={{ background: 'linear-gradient(135deg, #0d2a7a 0%, #143070 50%, #251584 100%)' }} />
            <GeoDots />
            
            <img src={pastorImg} alt="Lead Pastor" className="absolute inset-0 w-full h-full object-cover object-top opacity-70 group-hover:scale-[1.03] transition-transform duration-700" />
            
            <div className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, rgba(6,15,46,0.85) 0%, rgba(6,15,46,0.08) 55%)' }} />
            <div className="absolute bottom-5 left-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/40 mb-1">Lead Pastor</p>
              <h3 className="text-white text-lg font-bold tracking-wide">Rev. Dr. Ernest Adu Gyamfi</h3>
              <p className="text-[11px] mt-0.5" style={{ color: 'var(--gold-bright)', fontStyle: 'italic' }}>
                Believers International Worship Center
              </p>
            </div>
          </div>

          {/* Right column — stacks vertically always, side by side only on sm breakpoint */}
          <div className="grid grid-cols-2 md:grid-cols-1 gap-4">

            {/* Church image */}
            <div className="relative rounded-2xl overflow-hidden"
              style={{ height: '132px', border: '1px solid rgba(255,255,255,0.12)' }}>
              <div className="absolute inset-0"
                style={{ background: 'linear-gradient(135deg, #060f3a 0%, #0d2060 100%)' }} />
              <GeoCross />
              
              <img src={churchImg} alt="BIWC Church" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-[1.04] transition-transform duration-700" />
              
              <div className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(6,15,46,0.8) 0%, transparent 60%)' }} />
              <div className="absolute bottom-3 left-3">
                <p className="text-white font-bold text-[12px] tracking-wide">BIWC Abelemkpe</p>
                <p className="text-white/40 text-[10px] uppercase tracking-wider mt-0.5">Accra, Ghana</p>
              </div>
            </div>

            {/* Scripture card */}
            <div className="relative rounded-2xl p-4 overflow-hidden"
              style={{
                height: '132px',
                background: 'linear-gradient(135deg, rgba(200,144,10,0.15), rgba(200,144,10,0.05))',
                border: '1px solid rgba(200,144,10,0.28)',
              }}>
              <GeoDots />
              <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-r-full"
                style={{ background: 'linear-gradient(to bottom, var(--gold-bright), transparent)' }} />
              <Quote size={12} className="mb-1.5 ml-1" style={{ color: 'var(--gold-bright)' }} />
              <p className="text-white/80 text-[11.5px] leading-snug italic ml-1" style={{ fontStyle: 'italic' }}>
                "…building up the body of Christ, until we all attain unity of the faith."
              </p>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] mt-2 ml-1"
                style={{ color: 'var(--gold-bright)' }}>
                Ephesians 4:12–13
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          ② MISSION · VISION · MOTTO
      ══════════════════════════════════════════════════ */}
      <section className="max-w-[1200px] mx-auto mb-16 md:mb-24">
        <SectionHead
          eyebrow="Our Foundation"
          title="Mission,"
          italic="Vision & Motto"
          subtitle="Three pillars that define who we are, why we exist, and how we live."
        />
        {/* Mobile: 1-col, tablet: 1-col, desktop: 3-col equal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {MVV.map((item, i) => (
            <div key={i}
              className="relative rounded-2xl p-5 md:p-7 overflow-hidden group transition-all duration-300 hover:-translate-y-1"
              style={{ background: item.gradient, border: `1px solid ${item.border}` }}>
              <GeoDots />
              <div className="absolute left-0 top-4 bottom-4 w-[3px] rounded-r-full"
                style={{ background: `linear-gradient(to bottom, ${item.color}, transparent)` }} />
              {/* Decorative character — smaller on mobile */}
              <div className="text-[60px] md:text-[72px] font-bold leading-none mb-2 opacity-10 select-none pointer-events-none"
                style={{ color: item.color, fontFamily: 'var(--font-display)', lineHeight: 1 }}>
                {item.icon}
              </div>
              <span className="inline-block text-[9.5px] font-bold uppercase tracking-[0.25em] mb-2 px-2.5 py-1 rounded-full"
                style={{ background: `${item.color}15`, border: `1px solid ${item.color}30`, color: item.color }}>
                {item.label}
              </span>
              <h3 className="text-white font-bold text-[17px] md:text-xl tracking-wide mb-3">{item.heading}</h3>
              <p className="text-white/60 text-[13px] leading-relaxed relative z-10">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          ③ HISTORY TIMELINE
      ══════════════════════════════════════════════════ */}
      <section className="max-w-[1200px] mx-auto mb-16 md:mb-24">
        <SectionHead
          eyebrow="Our Journey"
          title="A Brief"
          italic="History"
          subtitle="From a small gathering of believers to a growing, vibrant church — this is the story God is writing through us."
          center
        />

        <div className="relative mt-8 md:mt-12">
          {/* Desktop centre spine */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 hidden md:block pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, rgba(245,200,66,0.3), rgba(245,200,66,0.04) 90%)' }} />
          <div className="space-y-1 md:space-y-8">
            {MILESTONES.map((item, i) => (
              <TimelineItem key={i} item={item} index={i} isLast={i === MILESTONES.length - 1} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          ④ CORE VALUES
      ══════════════════════════════════════════════════ */}
      <section className="max-w-[1200px] mx-auto mb-16 md:mb-24">
        <SectionHead
          eyebrow="What We Believe"
          title="Our Core"
          italic="Values"
          subtitle="Six convictions that shape our culture, guide our decisions, and define how we love God and people."
        />
        {/* Mobile: 1-col → tablet: 2-col → desktop: 3-col */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CORE_VALUES.map((v, i) => <ValueCard key={i} value={v} />)}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          ⑤ LEADERSHIP
      ══════════════════════════════════════════════════ */}
      <section className="max-w-[1200px] mx-auto mb-16 md:mb-24">
        <SectionHead
          eyebrow="Meet the Team"
          title="Our"
          italic="Leadership"
          subtitle="Godly men and women who serve with humility, lead with integrity, and give their lives for this church."
        />
        {/* Mobile: 1-col → tablet: 2-col → desktop: 3-col */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {LEADERSHIP.map((p, i) => <LeaderCard key={i} person={p} />)}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          ⑥ BELIEFS + AFFILIATION
      ══════════════════════════════════════════════════ */}
      <section className="max-w-[1200px] mx-auto mb-16 md:mb-24">
        <SectionHead eyebrow="Statement of Faith" title="What We" italic="Believe" />
        {/* Mobile: stacked → desktop: 2-col */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-start">

          {/* Belief statements */}
          <div className="space-y-2.5">
            {BELIEFS.map((item, i) => (
              <div key={i}
                className="flex gap-3 p-3.5 rounded-xl transition-all duration-200 hover:bg-white/5"
                style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
                {/* Fixed-width ref pill — doesn't squeeze text */}
                <div
                  className="shrink-0 text-[9px] font-bold uppercase tracking-wide px-2 py-1 rounded-md h-fit mt-0.5 w-[78px] text-center"
                  style={{ background: 'rgba(245,200,66,0.1)', border: '1px solid rgba(245,200,66,0.2)', color: 'var(--gold-bright)' }}>
                  {item.ref}
                </div>
                <p className="text-white/60 text-[13px] leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>

          {/* Denomination + location + contact */}
          <div className="space-y-4">
            {/* Denomination */}
            <div className="relative rounded-2xl p-5 overflow-hidden"
              style={{ background: 'linear-gradient(135deg, rgba(37,21,132,0.5), rgba(13,42,122,0.3))', border: '1px solid rgba(74,128,240,0.25)' }}>
              <GeoCross />
              <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-r-full"
                style={{ background: 'linear-gradient(to bottom, #4a80f0, transparent)' }} />
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] mb-1.5 ml-3" style={{ color: '#4a80f0' }}>Denomination</p>
              <h4 className="text-white font-bold text-base tracking-wide mb-2 ml-3">Ghana Baptist Convention</h4>
              <p className="text-white/50 text-[13px] leading-relaxed ml-3">
                BIWC is a proud member of the Ghana Baptist Convention — a fellowship of churches committed to Scripture, soul liberty, and congregational governance.
              </p>
            </div>

            {/* Location */}
            <div className="relative rounded-2xl p-5 overflow-hidden"
              style={{ background: 'linear-gradient(135deg, rgba(122,74,0,0.5), rgba(200,144,10,0.15))', border: '1px solid rgba(200,144,10,0.25)' }}>
              <GeoDots />
              <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-r-full"
                style={{ background: 'linear-gradient(to bottom, var(--gold-bright), transparent)' }} />
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] mb-1.5 ml-3" style={{ color: 'var(--gold-bright)' }}>Location</p>
              <h4 className="text-white font-bold text-base tracking-wide mb-2 ml-3">Abelemkpe, Accra — Ghana</h4>
              <p className="text-white/50 text-[13px] leading-relaxed ml-3">
                Serving the Abelemkpe community and the greater Accra region with the love of Christ — in the sanctuary, on the streets, and beyond.
              </p>
            </div>

            {/* Contact strip */}
            <div className="glass rounded-2xl p-4" style={{ border: '1px solid rgba(255,255,255,0.09)' }}>
              <p className="text-[9.5px] font-bold uppercase tracking-[0.22em] text-white/30 mb-3">Get In Touch</p>
              <div className="space-y-2.5">
                {[
                  { icon: MapPin, label: 'Abelemkpe, Accra, Ghana' },
                  { icon: Phone,  label: '+233 240 000 000' },
                  { icon: Mail,   label: 'biwc@gmail.com' },
                ].map(({ icon: Icon, label }, i) => (
                  <div key={i} className="flex items-center gap-3 text-[13px] text-white/50">
                    <Icon size={13} style={{ color: 'var(--gold-bright)' }} className="shrink-0" />
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          ⑦ JOIN CTA BANNER
      ══════════════════════════════════════════════════ */}
      <section className="max-w-[1200px] mx-auto">
        <div className="relative rounded-2xl md:rounded-3xl overflow-hidden p-8 sm:p-10 md:p-14"
          style={{ background: 'linear-gradient(135deg, rgba(26,58,143,0.55), rgba(13,31,96,0.85))', border: '1px solid rgba(255,255,255,0.1)' }}>
          <GeoDots />
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 55%)' }} />
          <div className="absolute -right-16 -bottom-16 w-56 md:w-72 h-56 md:h-72 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(245,200,66,0.28), transparent)', filter: 'blur(50px)' }} />
          <div className="absolute -left-12 top-0 w-48 md:w-60 h-48 md:h-60 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(212,32,32,0.18), transparent)', filter: 'blur(60px)' }} />

          {/* Stack on mobile, row on md+ */}
          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <span className="inline-block text-[10px] font-bold uppercase tracking-[0.28em] mb-4 px-3 py-1 rounded-full"
                style={{ background: 'rgba(245,200,66,0.12)', border: '1px solid rgba(245,200,66,0.28)', color: 'var(--gold-bright)' }}>
                You're Welcome Here
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 tracking-wide leading-tight">
                Come As You <em>Are</em>
              </h2>
              <p className="text-white/50 text-[13.5px] md:text-[14.5px] leading-relaxed max-w-lg">
                No matter your background, story, or where you are in your faith journey —
                there's a seat for you at BIWC. Come experience a community that will love you, challenge you, and help you grow.
              </p>
            </div>

            {/* Full-width buttons on mobile, auto-width on md+ */}
            <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-3 shrink-0">
              <Link to="/contact" className="flex-1 md:flex-none">
                <Button variant="gold" size="lg" icon={ArrowRight} className="w-full justify-center">
                  Plan Your Visit
                </Button>
              </Link>
              <Link to="/ministries" className="flex-1 md:flex-none">
                <Button variant="ghost" size="lg" icon={ChevronRight} className="w-full justify-center">
                  Our Ministries
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
