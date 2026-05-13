import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  User, Phone, Mail, MapPin, Church,
  Calendar, CheckCircle2, ArrowRight,
  ChevronRight, Heart, Sparkles, Users,
} from 'lucide-react';

// ─── Geo pattern ──────────────────────────────────────────────────────────────
const GeoDots = () => (
  <div className="absolute inset-0 pointer-events-none opacity-[0.05]"
    style={{ backgroundImage: 'radial-gradient(circle,#fff 1px,transparent 1px)', backgroundSize: '22px 22px' }} />
);

// ─── Reusable form label row ──────────────────────────────────────────────────
const Field = ({ label, required, hint, children }) => (
  <div className="form-group">
    <label className="flex items-center gap-1.5">
      {label}
      {required && <span style={{ color: 'var(--gold-bright)' }}>*</span>}
      {hint && (
        <span className="normal-case font-normal text-white/25 tracking-normal ml-1">{hint}</span>
      )}
    </label>
    {children}
  </div>
);

// ─── Intent choice card ───────────────────────────────────────────────────────
const ChoiceCard = ({ id, name, value, checked, onChange, icon: Icon, title, subtitle, color, gradient }) => (
  <label
    htmlFor={id}
    className="relative flex flex-col items-center text-center p-5 sm:p-6 rounded-2xl cursor-pointer transition-all duration-300 select-none"
    style={{
      background: checked ? `linear-gradient(135deg, ${color}22, ${color}0a)` : 'rgba(255,255,255,0.04)',
      border: `1.5px solid ${checked ? color + '70' : 'rgba(255,255,255,0.1)'}`,
      boxShadow: checked ? `0 0 32px ${color}25` : 'none',
    }}
  >
    <input id={id} type="radio" name={name} value={value}
      checked={checked} onChange={onChange} className="sr-only" />

    <div
      className="w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-all duration-300"
      style={{
        background: checked ? gradient : 'rgba(255,255,255,0.07)',
        boxShadow: checked ? `0 8px 24px ${color}45` : 'none',
        border: checked ? 'none' : '1px solid rgba(255,255,255,0.12)',
      }}
    >
      <Icon size={24} className={checked ? 'text-white' : 'text-white/40'} />
    </div>

    <h3 className="text-[14.5px] font-bold tracking-wide mb-1.5 transition-colors duration-200"
      style={{ color: checked ? '#fff' : 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-display)' }}>
      {title}
    </h3>
    <p className="text-[12.5px] leading-relaxed"
      style={{ color: checked ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.3)' }}>
      {subtitle}
    </p>

    {checked && (
      <div className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center"
        style={{ background: color }}>
        <CheckCircle2 size={14} className="text-white" />
      </div>
    )}
  </label>
);

// ─── Success screen ───────────────────────────────────────────────────────────
const SuccessScreen = ({ intent, name }) => (
  <div className="flex flex-col items-center text-center py-8 px-4">
    <div className="relative mb-8">
      <div className="w-24 h-24 rounded-full flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, rgba(26,58,143,0.5), rgba(37,85,192,0.3))',
          border: '1.5px solid rgba(74,128,240,0.4)',
          boxShadow: '0 0 60px rgba(74,128,240,0.3)',
        }}>
        <CheckCircle2 size={44} className="text-white" />
      </div>
      <div className="absolute inset-0 rounded-full animate-ping"
        style={{ background: 'rgba(74,128,240,0.12)', animationDuration: '2s' }} />
    </div>

    <span className="inline-block text-[10px] font-bold uppercase tracking-[0.3em] mb-4 px-3 py-1 rounded-full"
      style={{ background: 'rgba(245,200,66,0.1)', border: '1px solid rgba(245,200,66,0.28)', color: 'var(--gold-bright)' }}>
      You're In!
    </span>

    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 tracking-wide">
      Welcome to <em>BIWC</em>
    </h2>

    <p className="text-white/55 text-[14px] sm:text-[15px] leading-relaxed max-w-md mb-10">
      {intent === 'member'
        ? `Thank you, ${name}! We've received your interest. Someone from our team will be in touch with you shortly.`
        : `Thank you, ${name}! We can't wait to see you this Sunday. We'll have someone looking out for you!`}
    </p>

    <div className="glass rounded-2xl p-5 mb-8 w-full max-w-sm text-left"
      style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
      <p className="text-[9.5px] font-bold uppercase tracking-[0.22em] text-white/30 mb-4">
        Our Service Times
      </p>
      {[
        { day: 'Sunday',    time: '7:30am – 9:30am', label: 'Main Service',   color: '#4a80f0' },
        { day: 'Wednesday', time: '6:30pm – 8:30pm', label: 'Midweek Online', color: '#f5c842' },
        { day: 'Friday',    time: '6:30pm – 8:30pm', label: 'Online Prayer',  color: '#ff4a4a' },
      ].map((s, i) => (
        <div key={i} className="flex items-center gap-3 py-2.5 border-b border-white/8 last:border-0">
          <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: s.color }} />
          <div className="flex-1 min-w-0">
            <span className="text-white text-[12.5px] font-bold">{s.day}</span>
            <span className="text-white/40 text-[11px] ml-2">{s.time}</span>
          </div>
          <span className="text-[9.5px] font-bold uppercase tracking-wider shrink-0" style={{ color: s.color }}>
            {s.label}
          </span>
        </div>
      ))}
    </div>

    <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
      <Link to="/" className="flex-1">
        <button className="w-full py-3 rounded-full text-[12.5px] font-bold uppercase tracking-wider text-white transition-all duration-200 hover:-translate-y-[1px]"
          style={{ background: 'linear-gradient(135deg, var(--blue-mid), var(--blue))', boxShadow: '0 4px 20px rgba(26,58,143,0.45)' }}>
          Back to Home
        </button>
      </Link>
      <Link to="/contact" className="flex-1">
        <button className="w-full py-3 rounded-full text-[12.5px] font-bold uppercase tracking-wider text-white/50 hover:text-white transition-all duration-200"
          style={{ border: '1px solid rgba(255,255,255,0.15)' }}>
          Contact Us
        </button>
      </Link>
    </div>
  </div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function NewHere() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '', intent: '' });
  const [errors, setErrors]     = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [focused, setFocused]   = useState('');

  const set = (key, val) => {
    setForm(f => ({ ...f, [key]: val }));
    if (errors[key]) setErrors(e => ({ ...e, [key]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = 'Please enter your name';
    if (!form.phone.trim())   e.phone   = 'Please enter your phone number';
    if (!form.address.trim()) e.address = 'Please tell us where you stay';
    if (!form.intent)         e.intent  = 'Please choose one option above';
    return e;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    // TODO: swap for actual CMS / form API POST
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1400);
  };

  // Inline input style helper
  const inp = (key) => ({
    width: '100%',
    background: errors[key] ? 'rgba(212,32,32,0.06)' : focused === key ? 'rgba(255,255,255,0.09)' : 'rgba(255,255,255,0.05)',
    border: `1px solid ${errors[key] ? 'rgba(212,32,32,0.6)' : focused === key ? 'rgba(245,200,66,0.5)' : 'rgba(255,255,255,0.1)'}`,
    borderRadius: '12px',
    padding: '12px 16px 12px 40px',
    fontSize: '13px',
    color: '#e8eeff',
    outline: 'none',
    transition: 'border-color 0.2s, background 0.2s',
  });

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10 pb-16 md:pb-24">
      <div className="max-w-[680px] mx-auto">

        {/* ── Page Header ── */}
        {!submitted && (
          <div className="mb-10 md:mb-14">
            <span className="inline-block text-[10px] font-bold uppercase tracking-[0.3em] mb-4 px-3 py-1 rounded-full"
              style={{ background: 'rgba(245,200,66,0.1)', border: '1px solid rgba(245,200,66,0.25)', color: 'var(--gold-bright)' }}>
              First Time Here?
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-wide">
              I'm <em>New Here</em>
            </h1>
            <div className="w-14 h-[2px] mb-5"
              style={{ background: 'linear-gradient(90deg, var(--gold-bright), transparent)' }} />
            <p className="text-white/50 text-[14px] sm:text-[15px] leading-relaxed">
              We're so glad you're here. Fill in the details below and someone from our
              team will reach out to welcome you personally.
            </p>
          </div>
        )}

        {/* ── Success ── */}
        {submitted ? (
          <SuccessScreen intent={form.intent} name={form.name.split(' ')[0]} />
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-4">

            {/* ── Card 1: About You ── */}
            <div className="glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 relative overflow-hidden"
              style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
              <GeoDots />
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 60%)' }} />

              <div className="relative z-10">
                {/* Card heading */}
                <div className="flex items-center gap-2.5 mb-6">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(74,128,240,0.18)', border: '1px solid rgba(74,128,240,0.3)' }}>
                    <User size={13} style={{ color: '#4a80f0' }} />
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/40">About You</p>
                </div>

                <div className="space-y-4">

                  {/* Full name */}
                  <Field label="Full Name" required>
                    <div className="relative">
                      <User size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                        style={{ color: errors.name ? '#ff6060' : 'rgba(245,200,66,0.55)' }} />
                      <input
                        type="text" placeholder="e.g. Kofi Mensah"
                        value={form.name}
                        onChange={e => set('name', e.target.value)}
                        onFocus={() => setFocused('name')}
                        onBlur={() => setFocused('')}
                        style={inp('name')}
                      />
                    </div>
                    {errors.name && <p className="mt-1.5 text-[11px]" style={{ color: '#ff6060' }}>{errors.name}</p>}
                  </Field>

                  {/* Phone + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Phone Number" required>
                      <div className="relative">
                        <Phone size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                          style={{ color: errors.phone ? '#ff6060' : 'rgba(245,200,66,0.55)' }} />
                        <input
                          type="tel" placeholder="+233 xx xxx xxxx"
                          value={form.phone}
                          onChange={e => set('phone', e.target.value)}
                          onFocus={() => setFocused('phone')}
                          onBlur={() => setFocused('')}
                          style={inp('phone')}
                        />
                      </div>
                      {errors.phone && <p className="mt-1.5 text-[11px]" style={{ color: '#ff6060' }}>{errors.phone}</p>}
                    </Field>

                    <Field label="Email Address" hint="(optional)">
                      <div className="relative">
                        <Mail size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                          style={{ color: 'rgba(245,200,66,0.55)' }} />
                        <input
                          type="email" placeholder="you@example.com"
                          value={form.email}
                          onChange={e => set('email', e.target.value)}
                          onFocus={() => setFocused('email')}
                          onBlur={() => setFocused('')}
                          style={inp('email')}
                        />
                      </div>
                    </Field>
                  </div>

                  {/* Address */}
                  <Field label="Where Do You Stay?" required>
                    <div className="relative">
                      <MapPin size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                        style={{ color: errors.address ? '#ff6060' : 'rgba(245,200,66,0.55)' }} />
                      <input
                        type="text" placeholder="e.g. East Legon, Accra"
                        value={form.address}
                        onChange={e => set('address', e.target.value)}
                        onFocus={() => setFocused('address')}
                        onBlur={() => setFocused('')}
                        style={inp('address')}
                      />
                    </div>
                    {errors.address && <p className="mt-1.5 text-[11px]" style={{ color: '#ff6060' }}>{errors.address}</p>}
                  </Field>
                </div>
              </div>
            </div>

            {/* ── Card 2: What Would You Like? ── */}
            <div className="glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 relative overflow-hidden"
              style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
              <GeoDots />
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 60%)' }} />

              <div className="relative z-10">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(245,200,66,0.15)', border: '1px solid rgba(245,200,66,0.3)' }}>
                    <Sparkles size={13} style={{ color: 'var(--gold-bright)' }} />
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/40">
                    What Would You Like to Do?
                  </p>
                </div>
                <p className="text-white/28 text-[12px] mb-6 ml-9">Choose one — you can always do both later!</p>

                {/* Choice cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <ChoiceCard
                    id="intent-member" name="intent" value="member"
                    checked={form.intent === 'member'} onChange={() => set('intent', 'member')}
                    icon={Users} title="Become a Member"
                    subtitle="I want to officially join BIWC and be part of the family"
                    color="#4a80f0" gradient="linear-gradient(135deg,#0d2a7a,#2555c0)"
                  />
                  <ChoiceCard
                    id="intent-visit" name="intent" value="visit"
                    checked={form.intent === 'visit'} onChange={() => set('intent', 'visit')}
                    icon={Calendar} title="Visit This Sunday"
                    subtitle="I'd like to come to church next Sunday and see what it's like"
                    color="#f5c842" gradient="linear-gradient(135deg,#7a4a00,#c8900a)"
                  />
                </div>

                {errors.intent && (
                  <p className="mt-3 text-[11px]" style={{ color: '#ff6060' }}>{errors.intent}</p>
                )}

                {/* Contextual hint */}
                {form.intent === 'member' && (
                  <div className="mt-4 rounded-xl p-4 flex items-start gap-3"
                    style={{ background: 'rgba(74,128,240,0.08)', border: '1px solid rgba(74,128,240,0.22)' }}>
                    <Church size={13} style={{ color: '#4a80f0', flexShrink: 0, marginTop: 2 }} />
                    <p className="text-white/55 text-[12.5px] leading-relaxed">
                      A member of our team will contact you to walk you through the membership
                      process and connect you with the right ministry.
                    </p>
                  </div>
                )}
                {form.intent === 'visit' && (
                  <div className="mt-4 rounded-xl p-4 flex items-start gap-3"
                    style={{ background: 'rgba(245,200,66,0.08)', border: '1px solid rgba(245,200,66,0.22)' }}>
                    <Calendar size={13} style={{ color: 'var(--gold-bright)', flexShrink: 0, marginTop: 2 }} />
                    <p className="text-white/55 text-[12.5px] leading-relaxed">
                      Our Sunday Service runs <strong className="text-white/80">7:30am – 9:30am</strong> at
                      BIWC Abelemkpe, Accra. We'll have someone looking out for you at the door!
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* ── Submit ── */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-full font-bold uppercase tracking-widest text-[13px] sm:text-[14px] text-white flex items-center justify-center gap-3 transition-all duration-200 hover:-translate-y-[2px] disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
              style={{
                background: 'linear-gradient(135deg, var(--blue-mid), var(--blue))',
                boxShadow: '0 4px 24px rgba(26,58,143,0.5)',
              }}
            >
              {loading ? (
                <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Submitting…</>
              ) : (
                <>
                  <Heart size={15} />
                  {form.intent === 'member' ? "I Want to Become a Member"
                    : form.intent === 'visit' ? "I'll Be There Sunday!"
                    : "Submit"}
                  <ArrowRight size={14} />
                </>
              )}
            </button>

            <p className="text-center text-white/20 text-[11px] mt-3">
              We'll never share your info or spam you.
            </p>
          </form>
        )}

        {/* ── Footer links ── */}
        {!submitted && (
          <div className="mt-10 flex flex-wrap items-center justify-center gap-5 sm:gap-8">
            {[
              { label: 'Our Ministries', to: '/ministries' },
              { label: 'About BIWC',     to: '/about'      },
              { label: 'Contact Us',     to: '/contact'    },
            ].map(({ label, to }) => (
              <Link key={to} to={to}
                className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-white/25 hover:text-gold-bright transition-colors duration-200">
                {label} <ChevronRight size={11} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}