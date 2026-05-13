import React from 'react';
import { Link } from 'react-router-dom';
import { UserPlus, ArrowRight } from 'lucide-react';

// Geo dot pattern
const GeoDots = () => (
  <div
    className="absolute inset-0 pointer-events-none opacity-[0.05]"
    style={{ backgroundImage: 'radial-gradient(circle,#fff 1px,transparent 1px)', backgroundSize: '22px 22px' }}
  />
);

function NewHere() {
  return (
    <section className="max-w-[1200px] mx-auto px-4 sm:px-6 mb-20 sm:mb-28">
      <div
        className="relative rounded-2xl sm:rounded-[2.5rem] overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(26,58,143,0.55), rgba(13,31,96,0.85))',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <GeoDots />

        {/* Shimmer overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 55%)' }}
        />

        {/* Decorative gold glow — top right */}
        <div
          className="absolute -top-20 -right-20 w-72 sm:w-96 h-72 sm:h-96 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(245,200,66,0.18), transparent 65%)', filter: 'blur(40px)' }}
        />
        {/* Decorative red glow — bottom left */}
        <div
          className="absolute -bottom-16 -left-16 w-56 sm:w-72 h-56 sm:h-72 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(212,32,32,0.14), transparent 65%)', filter: 'blur(50px)' }}
        />

        {/* Content
            Mobile:  tight padding, single column, centred
            Desktop: generous padding, centred */}
        <div className="relative z-10 px-6 py-10 sm:px-10 sm:py-14 md:px-16 md:py-20 flex flex-col items-center text-center">

          {/* Eyebrow */}
          <span
            className="inline-block text-[9.5px] sm:text-[10px] font-bold uppercase tracking-[0.28em] mb-4 px-3 py-1 rounded-full"
            style={{ background: 'rgba(245,200,66,0.12)', border: '1px solid rgba(245,200,66,0.28)', color: 'var(--gold-bright)' }}
          >
            First Time Here?
          </span>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-5 tracking-wide leading-tight max-w-lg">
            New <em>Here?</em>
          </h2>

          {/* Gold divider */}
          <div
            className="w-12 h-[2px] rounded-full mb-5 sm:mb-7"
            style={{ background: 'linear-gradient(90deg, transparent, var(--gold-bright), transparent)' }}
          />

          {/* Body */}
          <p className="text-white/55 text-[14px] sm:text-[15px] md:text-[16px] max-w-xl mx-auto mb-7 sm:mb-10 leading-[1.85]">
            We would love to welcome you to our church family. Discover our community,
            find your purpose, and grow with us in faith.
          </p>

          {/* CTAs
              Mobile:  stacked full-width
              sm+:     side by side */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Link
              to="/new-here"
              className="inline-flex items-center justify-center gap-2 px-7 sm:px-10 py-3.5 sm:py-4 rounded-full font-bold uppercase tracking-widest text-[12.5px] sm:text-[13px] text-white transition-all duration-200 hover:-translate-y-[2px]"
              style={{
                background: 'linear-gradient(135deg, var(--gold), #e8a820)',
                boxShadow: '0 4px 20px rgba(200,144,10,0.45)',
              }}
            >
              <UserPlus size={16} />
              Register as a New Member
            </Link>

            <Link
              to="/about"
              className="inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold uppercase tracking-widest text-[12.5px] sm:text-[13px] text-white/70 hover:text-white transition-all duration-200 hover:-translate-y-[1px]"
              style={{ border: '1.5px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.06)' }}
            >
              Learn About Us
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-8 sm:mt-10">
            {[
              '🙏 Spirit-Filled Worship',
              '❤️ Loving Community',
              '📖 Word-Centred Teaching',
            ].map((text, i) => (
              <span key={i} className="text-white/30 text-[11px] sm:text-[12px] font-medium">
                {text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default NewHere;