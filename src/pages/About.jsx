import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Quote,
  Heart,
  Zap,
  Users,
  Globe,
  BookOpen,
  Shield,
  ChevronRight,
  MapPin,
  Phone,
  Mail,
} from 'lucide-react';
import Button from '../components/ui/Button';

// ─── Image Imports ─────────────────────────────────────────────────────────
import pastorImg from '../assets/images/Rev-dr-Ernest.jpg';
import churchImg from '../assets/images/church.jpg';

// ─── Data ────────────────────────────────────────────────────────────────────

const CORE_VALUES = [
  {
    icon: BookOpen,
    title: 'Word-Centred',
    body: 'Everything we do is anchored in the truth of the Holy Scriptures. The Bible is our final authority for faith and practice.',
    color: '#4a80f0',
    gradient: 'linear-gradient(135deg, #0d2a7a, #2555c0)',
  },
  {
    icon: Zap,
    title: 'Spirit-Filled',
    body: 'We believe in the active work of the Holy Spirit — moving, healing, and empowering believers for kingdom service.',
    color: '#f5c842',
    gradient: 'linear-gradient(135deg, #7a4a00, #c8900a)',
  },
  {
    icon: Heart,
    title: 'Love-Driven',
    body: 'The love of Christ compels us — toward God in worship, toward each other in fellowship, and toward the world in mission.',
    color: '#ff4a4a',
    gradient: 'linear-gradient(135deg, #7a0a0a, #d42020)',
  },
  {
    icon: Users,
    title: 'Community-Rooted',
    body: 'We are a family, not just a congregation. We bear one another\'s burdens, celebrate together, and grow together.',
    color: '#40c070',
    gradient: 'linear-gradient(135deg, #0a4a1a, #1a8040)',
  },
  {
    icon: Globe,
    title: 'Mission-Minded',
    body: 'The Great Commission is our mandate. We exist to make disciples of all nations — starting right here in Accra.',
    color: '#a070f0',
    gradient: 'linear-gradient(135deg, #2a0a7a, #5535b0)',
  },
  {
    icon: Shield,
    title: 'Integrity-Led',
    body: 'We hold ourselves to the highest standard of character — in our leadership, our stewardship, and our daily witness.',
    color: '#20c0c0',
    gradient: 'linear-gradient(135deg, #0a4a4a, #0a8080)',
  },
];

const LEADERSHIP = [
  {
    name: "Rev. Dr. Ernest Adu Gyamfi",
    role: 'Lead Pastor',
    bio: 'A visionary leader with a deep passion for the Word of God and the people of God. Committed to raising believers who impact their generation.',
    image: pastorImg,
  },
  {
    name: "Elder's Name",
    role: 'Elder / Board Chairman',
    bio: 'A pillar of wisdom and prayer. Serves the church with decades of faithful service and a shepherd\'s heart for every member.',
  },
  {
    name: "Deacon's Name",
    role: 'Head Deacon',
    bio: 'An exemplary servant-leader who ensures the practical ministry of the church runs with excellence and integrity.',
  },
];

const MILESTONES = [
  { year: '2008', title: 'Founded', body: 'BIWC was established with a small but faithful group of believers with a vision to transform Accra.' },
  { year: '2011', title: 'First Building', body: 'The congregation moved into its first permanent building — a landmark answered prayer.' },
  { year: '2015', title: 'Youth Explosion', body: 'The Youth Fellowship was formally launched, becoming one of the fastest-growing arms of the church.' },
  { year: '2018', title: 'Media Launch', body: 'BIWC went online, launching its YouTube channel and live streaming to reach beyond its walls.' },
  { year: '2021', title: 'Abelemkpe Campus', body: 'The church relocated to its current home in Abelemkpe — a dedicated worship centre for the community.' },
  { year: 'Now', title: 'Still Growing', body: 'With 8 active ministries and a growing congregation, BIWC continues to expand its impact across Accra and beyond.' },
];

// ─── Geo pattern util ────────────────────────────────────────────────────────
const GeoDots = () => (
  <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
    style={{ backgroundImage: 'radial-gradient(circle,#fff 1px,transparent 1px)', backgroundSize: '22px 22px' }} />
);
const GeoCross = () => (
  <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
    style={{ background: 'linear-gradient(90deg,#fff 1px,transparent 1px) 0 0/22px 22px,linear-gradient(0deg,#fff 1px,transparent 1px) 0 0/22px 22px' }} />
);

// ─── Section heading (matches site pattern) ───────────────────────────────────
const SectionHead = ({ eyebrow, title, italic, subtitle, center = false }) => (
  <div className={`mb-10 ${center ? 'text-center' : ''}`}>
    <span
      className={`inline-block text-[10px] font-bold uppercase tracking-[0.28em] mb-4 px-3 py-1 rounded-full ${center ? 'mx-auto' : ''}`}
      style={{ background: 'rgba(245,200,66,0.1)', border: '1px solid rgba(245,200,66,0.25)', color: 'var(--gold-bright)' }}
    >
      {eyebrow}
    </span>
    <h2 className={`text-3xl md:text-4xl font-bold text-white tracking-wide ${center ? 'mx-auto' : ''}`}>
      {title} {italic && <em>{italic}</em>}
    </h2>
    <div className={`w-14 h-[2px] mt-4 ${center ? 'mx-auto' : ''}`}
      style={{ background: 'linear-gradient(90deg, var(--gold-bright), transparent)' }} />
    {subtitle && (
      <p className={`text-white/50 text-[15px] leading-relaxed mt-5 max-w-2xl ${center ? 'mx-auto' : ''}`}>
        {subtitle}
      </p>
    )}
  </div>
);

// ─── Value Card ───────────────────────────────────────────────────────────────
const ValueCard = ({ value }) => {
  const Icon = value.icon;
  return (
    <div
      className="glass rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden group transition-all duration-300 hover:-translate-y-1.5"
      style={{ border: `1px solid rgba(255,255,255,0.09)` }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 70% 50% at 50% 0%, ${value.color}14, transparent)` }}
      />
      {/* Top accent line */}
      <div className="absolute top-0 left-6 right-6 h-[2px] rounded-b-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${value.color}, transparent)` }} />

      {/* Icon */}
      <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: `${value.color}15`, border: `1px solid ${value.color}30` }}>
        <Icon size={20} style={{ color: value.color }} />
      </div>

      <div>
        <h3 className="text-white font-bold text-[15px] tracking-wide mb-2">{value.title}</h3>
        <p className="text-white/50 text-[13px] leading-relaxed">{value.body}</p>
      </div>
    </div>
  );
};

// ─── Leadership Card ──────────────────────────────────────────────────────────
const LeaderCard = ({ person }) => {
  const initials = person.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className="glass rounded-2xl overflow-hidden group transition-all duration-300 hover:-translate-y-1.5 relative"
      style={{ border: '1px solid rgba(255,255,255,0.09)' }}
    >
      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(245,200,66,0.08), transparent)' }} />

      {/* Avatar area */}
      <div className="relative h-52 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, rgba(26,58,143,0.5), rgba(6,15,46,0.8))' }}>
        <GeoDots />

        {person.image ? (
          <img src={person.image} alt={person.name}
            className="absolute inset-0 w-full h-full object-cover object-top opacity-80 group-hover:scale-105 transition-transform duration-700" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '2px solid rgba(245,200,66,0.3)',
                color: 'var(--gold-bright)',
                fontFamily: 'var(--font-display)',
              }}
            >
              {initials}
            </div>
          </div>
        )}

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-16"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(6,15,46,0.95))' }} />

        {/* Role pill */}
        <div
          className="absolute top-4 left-4 px-3 py-1 rounded-full text-[9.5px] font-bold uppercase tracking-widest"
          style={{ background: 'rgba(245,200,66,0.15)', border: '1px solid rgba(245,200,66,0.3)', color: 'var(--gold-bright)' }}
        >
          {person.role}
        </div>
      </div>

      {/* Info */}
      <div className="p-6">
        <h3 className="text-white font-bold text-lg tracking-wide mb-1">{person.name}</h3>
        <p className="text-white/45 text-[13px] leading-relaxed">{person.bio}</p>
      </div>
    </div>
  );
};

// ─── Timeline Item ────────────────────────────────────────────────────────────
const TimelineItem = ({ item, index, isLast }) => {
  const isEven = index % 2 === 0;
  return (
    <div className={`relative flex items-start gap-0 ${isEven ? 'flex-row' : 'flex-row-reverse'} md:gap-0`}>
      {/* Left/Right content */}
      <div className={`w-[calc(50%-28px)] ${isEven ? 'text-right pr-8' : 'text-left pl-8'} hidden md:block`}>
        <div
          className={`inline-block glass rounded-xl p-5 transition-all duration-300 hover:-translate-y-1 text-left ${isEven ? 'ml-auto' : ''}`}
          style={{ border: '1px solid rgba(255,255,255,0.09)', maxWidth: '320px' }}
        >
          <p
            className="text-[10px] font-bold uppercase tracking-[0.25em] mb-2"
            style={{ color: 'var(--gold-bright)' }}
          >
            {item.year}
          </p>
          <h4 className="text-white font-bold text-[15px] mb-1.5 tracking-wide">{item.title}</h4>
          <p className="text-white/45 text-[12.5px] leading-relaxed">{item.body}</p>
        </div>
      </div>

      {/* Centre spine + dot */}
      <div className="relative flex flex-col items-center w-14 shrink-0">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center z-10 shrink-0"
          style={{
            background: 'linear-gradient(135deg, var(--gold), #e8a820)',
            boxShadow: '0 0 20px rgba(200,144,10,0.45)',
          }}
        >
          <span className="text-[10px] font-bold text-black">
            {item.year === 'Now' ? '✦' : item.year.slice(2)}
          </span>
        </div>
        {!isLast && (
          <div className="w-[2px] flex-1 mt-2" style={{ background: 'linear-gradient(to bottom, rgba(245,200,66,0.4), rgba(245,200,66,0.05))' }} />
        )}
      </div>

      {/* Mobile: full-width below */}
      <div className="flex-1 pb-8 md:w-[calc(50%-28px)] md:hidden">
        <div
          className="glass rounded-xl p-5"
          style={{ border: '1px solid rgba(255,255,255,0.09)' }}
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] mb-2" style={{ color: 'var(--gold-bright)' }}>
            {item.year}
          </p>
          <h4 className="text-white font-bold text-[15px] mb-1.5 tracking-wide">{item.title}</h4>
          <p className="text-white/45 text-[12.5px] leading-relaxed">{item.body}</p>
        </div>
      </div>

      {/* Right spacer on desktop */}
      <div className="hidden md:block w-[calc(50%-28px)]" />
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function About() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 relative z-10 pb-24">

      {/* ══════════════════════════════════════════════════
          ① HERO — Who We Are
      ══════════════════════════════════════════════════ */}
      <section className="max-w-[1200px] mx-auto mb-28 mt-10">

        {/* Page eyebrow */}
        <div className="mb-10">
          <span
            className="inline-block text-[10px] font-bold uppercase tracking-[0.3em] mb-5 px-3 py-1 rounded-full"
            style={{ background: 'rgba(245,200,66,0.1)', border: '1px solid rgba(245,200,66,0.25)', color: 'var(--gold-bright)' }}
          >
            About Us
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-white leading-[1.1] mb-4 tracking-wide">
            We Are <em>BIWC</em>
          </h1>

          <div className="w-16 h-[2px] mb-7"
            style={{ background: 'linear-gradient(90deg, var(--gold-bright), transparent)' }} />

          <p className="text-white/55 text-[16px] leading-[1.9] max-w-2xl">
            Believers International Worship Center is a Spirit-filled, Word-driven community
            of faith planted in the heart of Abelemkpe, Accra. We exist for one reason:
            to know God deeply and make Him known boldly.
          </p>
        </div>

        {/* Hero image grid */}
        <div className="grid md:grid-cols-3 gap-4 h-[420px] md:h-[480px]">

          {/* Main large image — pastor */}
          <div
            className="md:col-span-2 relative rounded-2xl overflow-hidden group"
            style={{ border: '1px solid rgba(255,255,255,0.12)' }}
          >
            <div className="absolute inset-0"
              style={{ background: 'linear-gradient(135deg, #0d2a7a 0%, #143070 50%, #251584 100%)' }} />
            <GeoDots />
            
            <img src={pastorImg} alt="Lead Pastor" className="absolute inset-0 w-full h-full object-cover object-top opacity-70 group-hover:scale-[1.03] transition-transform duration-700" />
            
            <div className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, rgba(6,15,46,0.85) 0%, rgba(6,15,46,0.1) 55%)' }} />

            {/* Label */}
            <div className="absolute bottom-6 left-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/40 mb-1">Lead Pastor</p>
              <h3 className="text-white text-xl font-bold tracking-wide">Rev. Dr. Ernest Adu Gyamfi</h3>
              <p className="text-[12px] mt-0.5" style={{ color: 'var(--gold-bright)', fontStyle: 'italic' }}>
                Believers International Worship Center
              </p>
            </div>
          </div>

          {/* Right stacked panels */}
          <div className="flex flex-col gap-4">

            {/* Church image */}
            <div
              className="flex-1 relative rounded-2xl overflow-hidden group"
              style={{ border: '1px solid rgba(255,255,255,0.12)' }}
            >
              <div className="absolute inset-0"
                style={{ background: 'linear-gradient(135deg, #060f3a 0%, #0d2060 100%)' }} />
              <GeoCross />
              
              <img src={churchImg} alt="BIWC Church" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-[1.04] transition-transform duration-700" />
              
              <div className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(6,15,46,0.8) 0%, transparent 60%)' }} />
              <div className="absolute bottom-4 left-4">
                <p className="text-white font-bold text-[13px] tracking-wide">BIWC Abelemkpe</p>
                <p className="text-white/40 text-[10.5px] uppercase tracking-wider mt-0.5">Accra, Ghana</p>
              </div>
            </div>

            {/* Scripture card */}
            <div
              className="relative rounded-2xl p-5 overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(200,144,10,0.15), rgba(200,144,10,0.05))',
                border: '1px solid rgba(200,144,10,0.28)',
              }}
            >
              <GeoDots />
              <div
                className="absolute left-0 top-0 bottom-0 w-[3px] rounded-r-full"
                style={{ background: 'linear-gradient(to bottom, var(--gold-bright), transparent)' }}
              />
              <Quote size={14} className="mb-2" style={{ color: 'var(--gold-bright)' }} />
              <p className="text-white/80 text-[13px] leading-relaxed italic ml-1"
                style={{ fontStyle: 'italic' }}>
                "…building up the body of Christ, until we all attain unity of the faith."
              </p>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] mt-3 ml-1"
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
      <section className="max-w-[1200px] mx-auto mb-28">
        <SectionHead
          eyebrow="Our Foundation"
          title="Mission,"
          italic="Vision & Motto"
          subtitle="Three pillars that define who we are, why we exist, and how we live."
        />

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              label: 'Our Mission',
              heading: 'What We Do',
              body: 'To make disciples of Jesus Christ through the preaching of the Gospel, equipping the saints for ministry, and transforming lives and communities with the love and power of God.',
              icon: '✦',
              color: '#4a80f0',
              gradient: 'linear-gradient(135deg, rgba(13,42,122,0.6), rgba(37,85,192,0.3))',
              border: 'rgba(74,128,240,0.25)',
            },
            {
              label: 'Our Vision',
              heading: 'Where We\'re Going',
              body: 'To be a lighthouse church — a centre of excellence in the body of Christ that raises kingdom-minded believers who impact every sphere of society in Accra, Ghana, and the nations.',
              icon: '◎',
              color: '#f5c842',
              gradient: 'linear-gradient(135deg, rgba(122,74,0,0.6), rgba(200,144,10,0.3))',
              border: 'rgba(245,200,66,0.25)',
            },
            {
              label: 'Our Motto',
              heading: 'How We Live',
              body: '"Transformed by the Word, Empowered by the Spirit." Every sermon, every service, and every ministry is designed to see lives genuinely changed from the inside out.',
              icon: '"',
              color: '#ff4a4a',
              gradient: 'linear-gradient(135deg, rgba(122,10,10,0.6), rgba(212,32,32,0.3))',
              border: 'rgba(255,74,74,0.25)',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="relative rounded-2xl p-7 overflow-hidden group transition-all duration-300 hover:-translate-y-1.5"
              style={{ background: item.gradient, border: `1px solid ${item.border}` }}
            >
              <GeoDots />
              {/* Accent left bar */}
              <div
                className="absolute left-0 top-4 bottom-4 w-[3px] rounded-r-full"
                style={{ background: `linear-gradient(to bottom, ${item.color}, transparent)` }}
              />
              {/* Big decorative character */}
              <div
                className="text-[80px] font-bold leading-none mb-3 opacity-10 select-none pointer-events-none"
                style={{ color: item.color, fontFamily: 'var(--font-display)', lineHeight: 1 }}
              >
                {item.icon}
              </div>
              <span
                className="inline-block text-[9.5px] font-bold uppercase tracking-[0.25em] mb-3 px-2.5 py-1 rounded-full"
                style={{ background: `${item.color}15`, border: `1px solid ${item.color}30`, color: item.color }}
              >
                {item.label}
              </span>
              <h3 className="text-white font-bold text-xl tracking-wide mb-4">{item.heading}</h3>
              <p className="text-white/60 text-[13.5px] leading-relaxed relative z-10">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          ③ HISTORY TIMELINE
      ══════════════════════════════════════════════════ */}
      <section className="max-w-[1200px] mx-auto mb-28">
        <SectionHead
          eyebrow="Our Journey"
          title="A Brief"
          italic="History"
          subtitle="From a small gathering of believers to a growing, vibrant church — this is the story God is writing through us."
          center
        />

        <div className="relative mt-14">
          {/* Vertical spine line (desktop) */}
          <div
            className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 hidden md:block pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, rgba(245,200,66,0.3), rgba(245,200,66,0.05) 90%)' }}
          />

          <div className="space-y-10">
            {MILESTONES.map((item, i) => (
              <TimelineItem
                key={i}
                item={item}
                index={i}
                isLast={i === MILESTONES.length - 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          ④ CORE VALUES
      ══════════════════════════════════════════════════ */}
      <section className="max-w-[1200px] mx-auto mb-28">
        <SectionHead
          eyebrow="What We Believe"
          title="Our Core"
          italic="Values"
          subtitle="Six convictions that shape our culture, guide our decisions, and define how we love God and people."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CORE_VALUES.map((value, i) => (
            <ValueCard key={i} value={value} />
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          ⑤ LEADERSHIP
      ══════════════════════════════════════════════════ */}
      <section className="max-w-[1200px] mx-auto mb-28">
        <SectionHead
          eyebrow="Meet the Team"
          title="Our"
          italic="Leadership"
          subtitle="Godly men and women who serve with humility, lead with integrity, and give their lives for this church."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {LEADERSHIP.map((person, i) => (
            <LeaderCard key={i} person={person} />
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          ⑥ BELIEFS — What We Stand For
      ══════════════════════════════════════════════════ */}
      <section className="max-w-[1200px] mx-auto mb-28">
        <div className="grid md:grid-cols-2 gap-10 items-center">

          {/* Left: text */}
          <div>
            <SectionHead
              eyebrow="Statement of Faith"
              title="What We"
              italic="Believe"
            />
            <div className="space-y-4">
              {[
                { ref: 'Genesis 1:1', text: 'We believe in one God — Father, Son, and Holy Spirit — eternally existing in three persons.' },
                { ref: 'John 3:16', text: 'We believe in the death and resurrection of Jesus Christ as the only means of salvation.' },
                { ref: '2 Tim 3:16', text: 'We believe the Holy Bible is the inspired, infallible Word of God and our supreme authority.' },
                { ref: 'Acts 2:4', text: 'We believe in the baptism of the Holy Spirit with the evidence of speaking in other tongues.' },
                { ref: 'Matt 28:19', text: 'We believe in water baptism by immersion as a public declaration of faith in Christ.' },
                { ref: '1 Thess 4:16', text: 'We believe in the imminent, personal return of Jesus Christ for His church.' },
              ].map((item, i) => (
                <div key={i}
                  className="flex gap-4 p-4 rounded-xl transition-all duration-200 hover:bg-white/5"
                  style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div
                    className="shrink-0 text-[9.5px] font-bold uppercase tracking-wider px-2 py-1 rounded-md h-fit mt-0.5"
                    style={{ background: 'rgba(245,200,66,0.1)', border: '1px solid rgba(245,200,66,0.2)', color: 'var(--gold-bright)' }}
                  >
                    {item.ref}
                  </div>
                  <p className="text-white/60 text-[13.5px] leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: denomination + affiliation card */}
          <div className="space-y-5">
            {/* Denomination */}
            <div
              className="relative rounded-2xl p-7 overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(37,21,132,0.5), rgba(13,42,122,0.3))',
                border: '1px solid rgba(74,128,240,0.25)',
              }}
            >
              <GeoCross />
              <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-r-full"
                style={{ background: 'linear-gradient(to bottom, #4a80f0, transparent)' }} />
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] mb-2 ml-3" style={{ color: '#4a80f0' }}>
                Denomination
              </p>
              <h4 className="text-white font-bold text-lg tracking-wide mb-2 ml-3">Ghana Baptist Convention</h4>
              <p className="text-white/50 text-[13px] leading-relaxed ml-3">
                BIWC is a proud member of the Ghana Baptist Convention — a fellowship of churches committed to the Baptist distinctives of Scripture, soul liberty, and congregational governance.
              </p>
            </div>

            {/* Affiliation */}
            <div
              className="relative rounded-2xl p-7 overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(122,74,0,0.5), rgba(200,144,10,0.15))',
                border: '1px solid rgba(200,144,10,0.25)',
              }}
            >
              <GeoDots />
              <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-r-full"
                style={{ background: 'linear-gradient(to bottom, var(--gold-bright), transparent)' }} />
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] mb-2 ml-3" style={{ color: 'var(--gold-bright)' }}>
                Location
              </p>
              <h4 className="text-white font-bold text-lg tracking-wide mb-2 ml-3">Abelemkpe, Accra — Ghana</h4>
              <p className="text-white/50 text-[13px] leading-relaxed ml-3">
                Serving the Abelemkpe community and the greater Accra region with the love of Christ — in the sanctuary, on the streets, and beyond.
              </p>
            </div>

            {/* Quick contact */}
            <div
              className="glass rounded-2xl p-5"
              style={{ border: '1px solid rgba(255,255,255,0.09)' }}
            >
              <p className="text-[9.5px] font-bold uppercase tracking-[0.22em] text-white/30 mb-4">Get In Touch</p>
              <div className="space-y-3">
                {[
                  { icon: MapPin, label: 'Abelemkpe, Accra, Ghana' },
                  { icon: Phone, label: '+233 240 000 000' },
                  { icon: Mail, label: 'biwc@gmail.com' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-[13px] text-white/50">
                    <item.icon size={14} style={{ color: 'var(--gold-bright)' }} className="shrink-0" />
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          ⑦ JOIN US CTA BANNER
      ══════════════════════════════════════════════════ */}
      <section className="max-w-[1200px] mx-auto">
        <div
          className="relative rounded-3xl overflow-hidden p-10 md:p-16"
          style={{
            background: 'linear-gradient(135deg, rgba(26,58,143,0.55), rgba(13,31,96,0.85))',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          {/* Pattern */}
          <GeoDots />

          {/* Shimmer */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 55%)' }} />

          {/* Glow orb */}
          <div
            className="absolute -right-24 -bottom-24 w-80 h-80 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(245,200,66,0.3), transparent)', filter: 'blur(50px)' }}
          />
          <div
            className="absolute -left-16 top-0 w-64 h-64 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(212,32,32,0.2), transparent)', filter: 'blur(60px)' }}
          />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="max-w-xl">
              <span
                className="inline-block text-[10px] font-bold uppercase tracking-[0.28em] mb-5 px-3 py-1 rounded-full"
                style={{ background: 'rgba(245,200,66,0.12)', border: '1px solid rgba(245,200,66,0.28)', color: 'var(--gold-bright)' }}
              >
                You're Welcome Here
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-wide leading-tight">
                Come As You <em>Are</em>
              </h2>
              <p className="text-white/50 text-[15px] leading-relaxed">
                No matter your background, story, or where you are in your faith journey —
                there's a seat for you at BIWC. Come experience a community that will love you, challenge you, and help you grow.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <Link to="/contact">
                <Button variant="gold" size="lg" icon={ArrowRight}>
                  Plan Your Visit
                </Button>
              </Link>
              <Link to="/ministries">
                <Button variant="ghost" size="lg" icon={ChevronRight}>
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
