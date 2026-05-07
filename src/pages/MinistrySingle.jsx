import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Music, Baby, Video, HeartHandshake, Star,
  Shield, Heart, Zap, Users, ChevronLeft,
  ChevronRight, ArrowRight, Phone, Clock,
  Crown, Sparkles, BookOpen,
} from 'lucide-react';
import Button from '../components/ui/Button';
import { MINISTRIES_DATA } from '../assets/data/ministriesData';

// ─── Icon map ─────────────────────────────────────────────────────────────────
const ICON_MAP = {
  Music, Baby, Video, HeartHandshake,
  Star, Shield, Heart, Zap, Users, BookOpen,
};

// ─── Geo pattern fills ────────────────────────────────────────────────────────
const GeoPatterns = {
  dots: () => (
    <div className="absolute inset-0 opacity-[0.07] pointer-events-none"
      style={{ backgroundImage: 'radial-gradient(circle,#fff 1px,transparent 1px)', backgroundSize: '24px 24px' }} />
  ),
  lines: () => (
    <div className="absolute inset-0 opacity-[0.07] pointer-events-none"
      style={{ background: 'repeating-linear-gradient(45deg,#fff,#fff 1px,transparent 1px,transparent 12px)' }} />
  ),
  cross: () => (
    <div className="absolute inset-0 opacity-[0.07] pointer-events-none"
      style={{ background: 'linear-gradient(90deg,#fff 1px,transparent 1px) 0 0/24px 24px,linear-gradient(0deg,#fff 1px,transparent 1px) 0 0/24px 24px' }} />
  ),
  rings: () => (
    <div className="absolute inset-0 opacity-[0.07] pointer-events-none"
      style={{ background: 'radial-gradient(circle,transparent 40%,#fff 41%,#fff 44%,transparent 45%) 0 0/48px 48px' }} />
  ),
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const getInitials = (name) =>
  name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();

const LEADER_KEYWORDS = ['leader', 'deputy', 'co-leader', 'pastor', 'minister', 'coordinator'];
const isLeaderRole = (role) =>
  LEADER_KEYWORDS.some((kw) => role.toLowerCase().includes(kw));

// ─── Section Heading ──────────────────────────────────────────────────────────
const SectionHead = ({ eyebrow, title, italic, accentColor }) => (
  <div className="mb-10">
    <span
      className="inline-block text-[10px] font-bold uppercase tracking-[0.28em] mb-3 px-3 py-1 rounded-full"
      style={{ background: `${accentColor}15`, border: `1px solid ${accentColor}35`, color: accentColor }}
    >
      {eyebrow}
    </span>
    <h2 className="text-2xl md:text-3xl font-bold text-white tracking-wide">
      {title} {italic && <em>{italic}</em>}
    </h2>
    <div className="w-12 h-[2px] mt-3"
      style={{ background: `linear-gradient(90deg, ${accentColor}, transparent)` }} />
  </div>
);

// ─── Leader Card (large, featured) ───────────────────────────────────────────
const LeaderCard = ({ member, accentColor, gradient }) => {
  const initials = getInitials(member.name);
  const isHead = member.role.toLowerCase().includes('leader') &&
    !member.role.toLowerCase().includes('deputy');

  return (
    <div
      className="glass rounded-2xl p-6 flex flex-col sm:flex-row items-center sm:items-start gap-5 relative overflow-hidden group transition-all duration-300 hover:-translate-y-1"
      style={{ border: `1px solid ${accentColor}35` }}
    >
      {/* Glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 70% 50% at 0% 50%, ${accentColor}12, transparent)` }} />

      {/* Avatar */}
      <div className="relative shrink-0">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold overflow-hidden"
          style={{
            background: member.image ? 'transparent' : gradient,
            border: `2.5px solid ${accentColor}60`,
            boxShadow: `0 0 28px ${accentColor}30`,
          }}
        >
          {member.image
            ? <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
            : <span className="text-white/90">{initials}</span>
          }
        </div>
        {/* Leader dot */}
        <div
          className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center"
          style={{ background: accentColor, borderColor: '#060f2e' }}
        >
          <Crown size={9} color="#000" />
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 text-center sm:text-left">
        <h3 className="text-white font-bold text-lg leading-tight mb-1">{member.name}</h3>
        <span
          className="inline-block text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3"
          style={{ background: `${accentColor}18`, border: `1px solid ${accentColor}35`, color: accentColor }}
        >
          {member.role}
        </span>
        {isHead && (
          <p className="text-white/40 text-xs leading-relaxed">
            Oversees and leads this ministry with vision and dedication.
          </p>
        )}
      </div>
    </div>
  );
};

// ─── Member Card (grid, smaller) ──────────────────────────────────────────────
const MemberCard = ({ member, accentColor }) => {
  const initials = getInitials(member.name);
  return (
    <div
      className="glass rounded-2xl p-5 flex flex-col items-center text-center gap-3 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group"
      style={{ border: '1px solid rgba(255,255,255,0.08)' }}
    >
      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 60% 40% at 50% 0%, ${accentColor}12, transparent)` }} />

      {/* Avatar */}
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold overflow-hidden"
        style={{
          background: member.image ? 'transparent' : `linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.04))`,
          border: `1.5px solid ${accentColor}40`,
        }}
      >
        {member.image
          ? <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
          : <span style={{ color: accentColor }}>{initials}</span>
        }
      </div>

      {/* Info */}
      <div>
        <h4 className="text-white font-bold text-[13px] leading-tight mb-1.5">{member.name}</h4>
        <span
          className="inline-block text-[9.5px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
          style={{ background: `${accentColor}12`, border: `1px solid ${accentColor}28`, color: accentColor }}
        >
          {member.role}
        </span>
      </div>
    </div>
  );
};

// ─── Empty Members Placeholder ────────────────────────────────────────────────
const EmptyTeam = ({ accentColor }) => (
  <div
    className="rounded-2xl p-12 text-center"
    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
  >
    <div
      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
      style={{ background: `${accentColor}12`, border: `1px solid ${accentColor}28` }}
    >
      <Users size={26} style={{ color: accentColor }} />
    </div>
    <p className="text-white/50 text-sm font-medium">
      Ministry team details are being updated.
    </p>
    <p className="text-white/25 text-xs mt-1">
      Contact us for more information about joining this ministry.
    </p>
  </div>
);

// ─── Sibling Ministry Card ────────────────────────────────────────────────────
const SiblingCard = ({ ministry }) => {
  const SibIcon = ICON_MAP[ministry.icon] || Users;
  const SibGeo = GeoPatterns[ministry.geoPattern] || GeoPatterns.dots;
  return (
    <Link
      to={`/ministries/${ministry.id}`}
      className="group relative rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
      style={{ minHeight: '160px', border: '1px solid rgba(255,255,255,0.1)' }}
    >
      <div className="absolute inset-0" style={{ background: ministry.gradient, opacity: 0.75 }} />
      <SibGeo />
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 60%)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-20"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(6,15,46,0.92))' }} />

      <div className="relative z-10 p-5 h-full flex flex-col justify-between">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.15)' }}
        >
          <SibIcon size={18} className="text-white" />
        </div>
        <div className="mt-12">
          <p className="text-white font-bold text-[13px] leading-tight">{ministry.title}</p>
          <p className="text-[10px] mt-0.5 font-medium" style={{ color: ministry.accentColor, fontStyle: 'italic' }}>
            {ministry.tagline}
          </p>
        </div>
      </div>

      {/* Hover arrow */}
      <div
        className="absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0"
        style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)' }}
      >
        <ChevronRight size={13} className="text-white" />
      </div>
    </Link>
  );
};

// ─── 404 fallback ─────────────────────────────────────────────────────────────
const NotFound = () => (
  <div className="max-w-[1200px] mx-auto px-6 py-40 text-center">
    <div className="text-8xl mb-6 opacity-20">✝</div>
    <h1 className="text-4xl font-bold text-white mb-4 tracking-wide">Ministry Not Found</h1>
    <p className="text-white/40 text-base mb-10">
      This ministry doesn't exist or may have been removed.
    </p>
    <Link to="/ministries">
      <Button variant="gold" size="lg" icon={ChevronLeft}>Back to Ministries</Button>
    </Link>
  </div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function MinistrySingle() {
  const { id } = useParams();
  const navigate = useNavigate();

  const ministry = MINISTRIES_DATA.find((m) => m.id === id);
  if (!ministry) return <NotFound />;

  const Icon = ICON_MAP[ministry.icon] || Users;
  const GeoEl = GeoPatterns[ministry.geoPattern] || GeoPatterns.dots;

  // Split members into leaders and general
  const leaders = ministry.members.filter((m) => isLeaderRole(m.role));
  const general = ministry.members.filter((m) => !isLeaderRole(m.role));
  const hasMembers = ministry.members.length > 0;

  // Sibling ministries (exclude current, pick 3)
  const siblings = MINISTRIES_DATA.filter((m) => m.id !== ministry.id).slice(0, 3);

  return (
    <div className="relative z-10 pb-24">

      {/* ══════════════════════════════════════════════════
          HERO BANNER
      ══════════════════════════════════════════════════ */}
      <div className="relative w-full overflow-hidden" style={{ minHeight: '520px' }}>

        {/* Background — image or gradient */}
        {ministry.image
          ? <img src={ministry.image} alt={ministry.title}
              className="absolute inset-0 w-full h-full object-cover opacity-35" />
          : <div className="absolute inset-0" style={{ background: ministry.gradient }} />
        }

        {/* Geo pattern overlay */}
        <GeoEl />

        {/* Top shimmer */}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 50%)' }} />

        {/* Vignette — top */}
        <div className="absolute top-0 left-0 right-0 h-40"
          style={{ background: 'linear-gradient(to bottom, rgba(6,15,46,0.7), transparent)' }} />

        {/* Vignette — bottom fade to page */}
        <div className="absolute bottom-0 left-0 right-0 h-56"
          style={{ background: 'linear-gradient(to bottom, transparent, #060f2e)' }} />

        {/* Accent glow orb (bottom-right) */}
        <div
          className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${ministry.accentColor}35, transparent 65%)`,
            filter: 'blur(40px)',
          }}
        />

        {/* Hero Content */}
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 flex flex-col justify-end pb-20 pt-24"
          style={{ minHeight: '520px' }}>

          {/* Back breadcrumb */}
          <button
            onClick={() => navigate('/ministries')}
            className="inline-flex items-center gap-2 text-white/40 hover:text-white text-[11.5px] font-bold uppercase tracking-widest mb-10 transition-all duration-200 group w-fit"
          >
            <ChevronLeft size={15}
              className="group-hover:-translate-x-1 transition-transform duration-200" />
            All Ministries
          </button>

          {/* Icon + Title */}
          <div className="flex flex-col md:flex-row md:items-end gap-7">
            {/* Icon box */}
            <div
              className="w-[80px] h-[80px] rounded-2xl flex items-center justify-center shrink-0"
              style={{
                background: 'rgba(255,255,255,0.07)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: `1.5px solid ${ministry.accentColor}55`,
                boxShadow: `0 0 48px ${ministry.accentColor}28, inset 0 1px 0 rgba(255,255,255,0.1)`,
              }}
            >
              <Icon size={38} className="text-white" />
            </div>

            {/* Title block */}
            <div>
              <span
                className="inline-block text-[10px] font-bold uppercase tracking-[0.3em] mb-3 px-3 py-1 rounded-full"
                style={{
                  background: `${ministry.accentColor}20`,
                  border: `1px solid ${ministry.accentColor}45`,
                  color: ministry.accentColor,
                }}
              >
                BIWC Ministry
              </span>

              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-white tracking-wide leading-[1.1]">
                {ministry.title}
              </h1>

              <p
                className="text-xl mt-3 font-medium"
                style={{ color: ministry.accentColor, fontStyle: 'italic' }}
              >
                {ministry.tagline}
              </p>
            </div>
          </div>

          {/* Meta chips */}
          <div className="flex flex-wrap items-center gap-4 mt-8">
            {ministry.meetingTime && ministry.meetingTime !== 'TBC' && (
              <div
                className="flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-medium text-white/70"
                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)' }}
              >
                <Clock size={13} style={{ color: ministry.accentColor }} />
                {ministry.meetingTime}
              </div>
            )}
            {hasMembers && (
              <div
                className="flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-medium text-white/70"
                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)' }}
              >
                <Users size={13} style={{ color: ministry.accentColor }} />
                {ministry.members.length} Team Member{ministry.members.length !== 1 ? 's' : ''}
              </div>
            )}
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-medium text-white/70"
              style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)' }}
            >
              <Sparkles size={13} style={{ color: ministry.accentColor }} />
              Active Ministry
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          BODY
      ══════════════════════════════════════════════════ */}
      <div className="max-w-[1200px] mx-auto px-6 mt-4 space-y-24">

        {/* ── About + Mission ── */}
        <section className="grid md:grid-cols-2 gap-8 items-start">

          {/* Description */}
          <div>
            <SectionHead
              eyebrow="About"
              title="Who"
              italic="We Are"
              accentColor={ministry.accentColor}
            />
            <p className="text-white/60 text-[15px] leading-[1.85]">
              {ministry.description}
            </p>
          </div>

          {/* Mission statement card */}
          <div>
            <SectionHead
              eyebrow="Purpose"
              title="Our"
              italic="Mission"
              accentColor={ministry.accentColor}
            />
            <div
              className="relative rounded-2xl p-7 overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${ministry.accentColor}10, rgba(255,255,255,0.03))`,
                border: `1px solid ${ministry.accentColor}28`,
              }}
            >
              {/* Decorative left border */}
              <div
                className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
                style={{ background: ministry.gradient }}
              />
              {/* Giant quote mark watermark */}
              <div
                className="absolute -top-6 -left-1 text-[140px] font-bold leading-none pointer-events-none select-none opacity-[0.05]"
                style={{ color: ministry.accentColor, fontFamily: 'var(--font-display)' }}
              >
                "
              </div>
              <p
                className="text-white text-[16px] leading-relaxed font-medium relative z-10 ml-3"
                style={{ fontStyle: 'italic' }}
              >
                {ministry.mission}
              </p>
            </div>
          </div>
        </section>

        {/* ── Leadership ── */}
        {leaders.length > 0 && (
          <section>
            <SectionHead
              eyebrow="Leadership"
              title="Meet Our"
              italic="Leaders"
              accentColor={ministry.accentColor}
            />
            <div className={`grid gap-5 ${
              leaders.length === 1
                ? 'md:grid-cols-1 max-w-md'
                : leaders.length === 2
                ? 'sm:grid-cols-2 max-w-2xl'
                : 'sm:grid-cols-2 md:grid-cols-3'
            }`}>
              {leaders.map((member) => (
                <LeaderCard
                  key={member.id}
                  member={member}
                  accentColor={ministry.accentColor}
                  gradient={ministry.gradient}
                />
              ))}
            </div>
          </section>
        )}

        {/* ── General Members ── */}
        {general.length > 0 && (
          <section>
            <SectionHead
              eyebrow="Team"
              title="Ministry"
              italic="Members"
              accentColor={ministry.accentColor}
            />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {general.map((member) => (
                <MemberCard
                  key={member.id}
                  member={member}
                  accentColor={ministry.accentColor}
                  gradient={ministry.gradient}
                />
              ))}
            </div>
          </section>
        )}

        {/* Empty team state */}
        {!hasMembers && (
          <section>
            <SectionHead
              eyebrow="Team"
              title="Ministry"
              italic="Members"
              accentColor={ministry.accentColor}
            />
            <EmptyTeam accentColor={ministry.accentColor} />
          </section>
        )}

        {/* ── Activities + Schedule (side-by-side) ── */}
        <section className="grid md:grid-cols-3 gap-8">

          {/* Activities — takes 2 cols */}
          <div className="md:col-span-2">
            <SectionHead
              eyebrow="Programs"
              title="What"
              italic="We Do"
              accentColor={ministry.accentColor}
            />
            <div className="grid sm:grid-cols-2 gap-3">
              {ministry.activities.map((activity, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3.5 px-5 py-4 rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.09)',
                  }}
                >
                  <div
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ background: ministry.accentColor, boxShadow: `0 0 8px ${ministry.accentColor}` }}
                  />
                  <span className="text-white/70 text-sm font-medium">{activity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Schedule card */}
          <div className="flex flex-col gap-4">
            <SectionHead
              eyebrow="Schedule"
              title="When"
              italic="We Meet"
              accentColor={ministry.accentColor}
            />

            <div
              className="rounded-2xl p-6 flex flex-col items-center text-center gap-4 h-full justify-center"
              style={{
                background: `linear-gradient(135deg, ${ministry.accentColor}12, rgba(255,255,255,0.03))`,
                border: `1px solid ${ministry.accentColor}28`,
              }}
            >
              {/* Clock icon */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{
                  background: `${ministry.accentColor}18`,
                  border: `1px solid ${ministry.accentColor}35`,
                }}
              >
                <Clock size={26} style={{ color: ministry.accentColor }} />
              </div>

              {ministry.meetingTime === 'TBC' ? (
                <>
                  <p className="text-white/70 font-bold text-base">To Be Confirmed</p>
                  <p className="text-white/35 text-xs leading-relaxed">
                    Contact us to find out the current meeting schedule for this ministry.
                  </p>
                </>
              ) : (
                <>
                  <p className="text-white font-bold text-base leading-snug">
                    {ministry.meetingTime}
                  </p>
                  <p className="text-white/35 text-xs">
                    All are welcome. Come as you are.
                  </p>
                </>
              )}

              <Link to="/contact" className="w-full">
                <button
                  className="w-full py-2.5 rounded-full text-[11.5px] font-bold uppercase tracking-wider transition-all duration-200 hover:-translate-y-[1px]"
                  style={{
                    background: `${ministry.accentColor}20`,
                    border: `1px solid ${ministry.accentColor}40`,
                    color: ministry.accentColor,
                  }}
                >
                  Ask Us More
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* ── Join CTA Banner ── */}
        <section>
          <div
            className="relative rounded-3xl overflow-hidden p-10 md:p-14"
            style={{
              background: `linear-gradient(135deg, ${ministry.accentColor}15, rgba(255,255,255,0.03))`,
              border: `1px solid ${ministry.accentColor}28`,
            }}
          >
            {/* Background geo */}
            <GeoEl />

            {/* Accent glow */}
            <div
              className="absolute -right-20 -bottom-20 w-72 h-72 rounded-full pointer-events-none"
              style={{
                background: `radial-gradient(circle, ${ministry.accentColor}45, transparent)`,
                filter: 'blur(55px)',
              }}
            />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
              {/* Text */}
              <div className="max-w-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles size={15} style={{ color: ministry.accentColor }} />
                  <span
                    className="text-[10px] font-bold uppercase tracking-[0.28em]"
                    style={{ color: ministry.accentColor }}
                  >
                    You Belong Here
                  </span>
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-wide leading-tight">
                  Join the <em>{ministry.shortTitle}</em> Ministry
                </h2>

                <p className="text-white/50 text-sm leading-relaxed">
                  Whether you're new to faith or have walked with God for years, there's a place for you. Reach out and we'll connect you with the right person.
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <Link to="/contact">
                  <Button variant="gold" size="lg" icon={ArrowRight}>
                    Get Connected
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="ghost" size="lg" icon={Phone}>
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Explore More Ministries ── */}
        <section>
          <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
            <h3 className="text-xl font-bold text-white uppercase tracking-wide">
              Explore <em>More</em>
            </h3>
            <Link
              to="/ministries"
              className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-white/35 hover:text-gold-bright transition-colors duration-200"
            >
              View All <ChevronRight size={13} />
            </Link>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {siblings.map((sib) => (
              <SiblingCard key={sib.id} ministry={sib} />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
