import React from 'react';
import { Play, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import heroImg from '../../assets/images/hero-img.png';

const HeroBanner = () => {
  return (
    <section className="relative w-full min-h-[88vh] sm:min-h-[92vh] flex items-end overflow-hidden rounded-2xl sm:rounded-[2rem] mx-auto max-w-[1400px] mt-2 sm:mt-4 mb-14 sm:mb-20 shadow-2xl pb-12 sm:pb-20">

      {/* ── Background image + overlays ── */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="BIWC Ghana Hero"
          className="w-full h-full object-cover object-center scale-105"
        />
        {/* Left-to-right dark fade */}
        {/* <div className="absolute inset-0"
          style={{ background: 'linear-gradient(105deg, rgba(6,15,46,0.93) 0%, rgba(6,15,46,0.6) 55%, rgba(6,15,46,0.15) 100%)' }} /> */}
        {/* Bottom fade into page bg */}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(6,15,46,1) 0%, transparent 50%)' }} />
        {/* Subtle top fade */}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(6,15,46,0.4) 0%, transparent 30%)' }} />
      </div>

      {/* ── Decorative orb ── */}
      <div
        className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full pointer-events-none hidden md:block"
        style={{ background: 'radial-gradient(circle, rgba(200,144,10,0.12), transparent 65%)', filter: 'blur(40px)' }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-5 sm:px-8 md:px-16  sm:py-0">

        {/* Eyebrow pill
        <div className="flex items-center gap-2 mb-5 sm:mb-6">
          <span
            className="inline-block text-[9.5px] sm:text-[10px] font-bold uppercase tracking-[0.28em] px-3 py-1 rounded-full"
            style={{ background: 'rgba(245,200,66,0.12)', border: '1px solid rgba(245,200,66,0.3)', color: 'var(--gold-bright)' }}
          >
            Welcome to BIWC Abelemkpe
          </span>
        </div> */}

        {/* Main heading
        <h1 className="text-[2.2rem] sm:text-5xl md:text-6xl lg:text-[4.5rem] font-bold text-white leading-[1.08] tracking-wide mb-5 sm:mb-6 max-w-[640px]">
          A Church That <em>Transforms</em> Lives
        </h1> */}

        {/* Gold accent line
        <div
          className="w-16 h-[3px] rounded-full mb-6 sm:mb-8"
          style={{ background: 'linear-gradient(90deg, var(--gold-bright), transparent)' }}
        /> */}

        {/* Description
        <p className="text-white/65 max-w-lg sm:max-w-xl text-[14.5px] sm:text-[16px] md:text-[17px] leading-[1.8] mb-8 sm:mb-10">
          A Spirit-filled community dedicated to transforming lives through the power of the
          Gospel and meaningful fellowship. Join us as we grow together in faith.
        </p> */}

        {/* CTAs */}
        <div className="flex flex-col xs:flex-row flex-wrap gap-3 sm:gap-4">
          <a
            href="https://youtube.com/@biwcghana"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-[13px] sm:text-[14px] px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-white transition-all duration-200 hover:-translate-y-[2px] hover:shadow-[0_8px_28px_rgba(212,32,32,0.65)]"
            style={{
              background: 'linear-gradient(135deg, var(--red), var(--red-bright))',
              boxShadow: '0 4px 20px rgba(212,32,32,0.5)',
            }}
          >
            <Play size={16} fill="white" />
            Watch Live
          </a>

          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-[13px] sm:text-[14px] px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-white transition-all duration-200 hover:-translate-y-[1px] hover:bg-white/15"
            style={{ border: '1.5px solid rgba(255,255,255,0.35)', background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(8px)' }}
          >
            I'm New Here
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* Service time chips — mobile: scroll, desktop: row */}
        <div className="flex items-center gap-2 sm:gap-3 mt-10 sm:mt-12 overflow-x-auto pb-1 scrollbar-none">
          {[
            { day: 'Sunday',    time: '7:30am',  label: 'Main Service'         },
            { day: 'Wednesday', time: '6:30pm',  label: 'Midweek Online'       },
            { day: 'Friday',    time: '6:30pm',  label: 'Online Prayer'        },
          ].map((svc, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full shrink-0 text-[11px] sm:text-[12px] font-medium text-white/60"
              style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)' }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: i === 0 ? '#4a80f0' : i === 1 ? '#f5c842' : '#ff4a4a' }}
              />
              <span className="font-bold text-white/80">{svc.day}</span>
              <span className="text-white/40">·</span>
              <span>{svc.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom fade ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(6,15,46,1), transparent)' }}
      />
    </section>
  );
};

export default HeroBanner;
