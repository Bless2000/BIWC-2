import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Quote } from 'lucide-react';
import pastorImg from '../../assets/images/Rev-dr-Ernest.jpg';
import churchImg from '../../assets/images/church.jpg';

/**
 * PastorMessage — Home page section
 * Drop into Home.jsx between any two sections, e.g. after <EventsPreview />
 *
 * Usage:
 *   import PastorMessage from '../components/sections/PastorMessage';
 *   <PastorMessage />
 */
const PastorMessage = () => {
  return (
    <section
      className="max-w-[1200px] mx-auto mb-32 mt-4 relative"
      aria-label="Message from the Pastor"
    >
      {/* ── Section label ── */}
      <div className="flex items-baseline gap-3 mb-10 border-b border-white/10 pb-4 px-6 md:px-0">
        <h2 className="text-2xl font-bold text-white uppercase tracking-wide">
          A Word From <em>Our Pastor</em>
        </h2>
        <span
          className="text-white/30 text-lg"
          style={{ fontStyle: 'italic' }}
        >
          A message for you
        </span>
      </div>

      {/* ── Main 3-col grid ── */}
      <div className="grid lg:grid-cols-3 gap-6 items-stretch px-6 md:px-0">

        {/* ── Col 1: Pastor photo ── */}
        <div className="relative group">
          {/* Accent glow behind image */}
          <div
            className="absolute -inset-2 rounded-3xl opacity-40 blur-2xl pointer-events-none transition-opacity duration-500 group-hover:opacity-60"
            style={{ background: 'linear-gradient(135deg, rgba(26,58,143,0.5), rgba(200,144,10,0.3))' }}
          />

          <div className="relative rounded-2xl overflow-hidden h-[420px] md:h-[500px]"
            style={{ border: '1px solid rgba(255,255,255,0.12)' }}>
            <img
              src={pastorImg}
              alt="Pastor"
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
              loading="lazy"
            />
            {/* Gradient overlay — subtle bottom fade */}
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, rgba(6,15,46,0.65) 0%, transparent 55%)' }}
            />

            {/* Pastor name tag */}
            <div
              className="absolute bottom-5 left-5 right-5 px-4 py-3 rounded-xl"
              style={{
                background: 'rgba(6,15,46,0.75)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.12)',
              }}
            >
              <p className="text-white font-bold text-sm tracking-wide">Rev. Dr. Ernest Adu Gyamfi</p>
              <p
                className="text-[11px] font-medium mt-0.5"
                style={{ color: 'var(--gold-bright)', fontStyle: 'italic' }}
              >
                Lead Pastor, BIWC
              </p>
            </div>
          </div>
        </div>

        {/* ── Col 2: Message content ── */}
        <div className="flex flex-col justify-center glass rounded-2xl p-8 md:p-10 relative overflow-hidden">

          {/* Decorative watermark cross */}
          <div
            className="absolute -right-6 -bottom-6 w-48 h-48 opacity-[0.04] pointer-events-none select-none"
            style={{ color: 'white' }}
          >
            <svg viewBox="0 0 200 200" fill="white" xmlns="http://www.w3.org/2000/svg">
              <rect x="80" y="0" width="40" height="200" />
              <rect x="0" y="80" width="200" height="40" />
            </svg>
          </div>

          {/* Quote icon */}
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 shrink-0"
            style={{
              background: 'rgba(200,144,10,0.12)',
              border: '1px solid rgba(200,144,10,0.28)',
            }}
          >
            <Quote size={18} style={{ color: 'var(--gold-bright)' }} />
          </div>

          {/* Eyebrow */}
          <span
            className="inline-block text-[10px] font-bold uppercase tracking-[0.28em] mb-4 px-3 py-1 rounded-full w-fit"
            style={{
              background: 'rgba(200,144,10,0.1)',
              border: '1px solid rgba(200,144,10,0.25)',
              color: 'var(--gold-bright)',
            }}
          >
            A Message for You
          </span>

          {/* Heading */}
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-5 tracking-wide leading-tight">
            Welcome to <em>BIWC</em>
          </h3>

          {/* Gold divider */}
          <div
            className="w-12 h-[2px] mb-6"
            style={{ background: 'linear-gradient(90deg, var(--gold-bright), transparent)' }}
          />

          {/* Message body */}
          <p className="text-white/60 text-[14.5px] leading-[1.9] mb-8">
            We are a warm and welcoming community of believers committed to growing in
            faith, serving others, and sharing the love of Christ. Whether you're
            exploring church for the first time or looking for a church to call home,
            we invite you to join us and experience the love and fellowship of our congregation.
          </p>

          {/* Signature */}
          <div className="flex items-center gap-3 mb-7 pb-7 border-b border-white/10">
            <div
              className="w-px h-8 rounded-full"
              style={{ background: 'var(--gold-bright)' }}
            />
            <div>
              <p className="text-white/80 text-[13px] font-bold">Rev. Dr. Ernest Adu Gyamfi</p>
              <p
                className="text-[11px] mt-0.5"
                style={{ color: 'var(--gold-bright)', fontStyle: 'italic' }}
              >
                Lead Pastor, BIWC Abelemkpe
              </p>
            </div>
          </div>

          {/* CTA */}
          <Link
            to="/about"
            className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest transition-all duration-200 hover:gap-3 w-fit group"
            style={{ color: 'var(--gold-bright)' }}
          >
            Learn About Us
            <ArrowRight
              size={14}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* ── Col 3: Church photo ── */}
        <div className="relative group lg:flex lg:flex-col lg:justify-end">

          {/* Accent glow */}
          <div
            className="absolute -inset-2 rounded-3xl opacity-30 blur-2xl pointer-events-none transition-opacity duration-500 group-hover:opacity-50"
            style={{ background: 'linear-gradient(135deg, rgba(200,144,10,0.4), rgba(212,32,32,0.2))' }}
          />

          {/* Scripture verse card — sits above the church image */}
          <div
            className="relative rounded-2xl p-5 mb-4"
            style={{
              background: 'rgba(6,15,46,0.7)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(245,200,66,0.2)',
            }}
          >
            {/* Accent left bar */}
            <div
              className="absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full"
              style={{ background: 'linear-gradient(to bottom, var(--gold-bright), transparent)' }}
            />
            <p
              className="text-white/80 text-[13px] leading-relaxed italic ml-3"
              style={{ fontFamily: 'var(--font-italic)', fontStyle: 'italic' }}
            >
              "For where two or three gather in my name, there am I with them."
            </p>
            <p
              className="text-[10px] font-bold uppercase tracking-widest mt-2 ml-3"
              style={{ color: 'var(--gold-bright)' }}
            >
              Matthew 18:20
            </p>
          </div>

          {/* Church image */}
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              height: '320px',
              border: '1px solid rgba(255,255,255,0.12)',
            }}
          >
            <img
              src={churchImg}
              alt="BIWC Church building"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              loading="lazy"
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, rgba(6,15,46,0.5) 0%, transparent 60%)' }}
            />
            {/* Church label */}
            <div
              className="absolute bottom-4 left-4 px-3 py-1.5 rounded-lg"
              style={{
                background: 'rgba(6,15,46,0.75)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <p className="text-white/70 text-[10.5px] font-bold uppercase tracking-wider">
                BIWC · Abelemkpe, Accra
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default PastorMessage;
