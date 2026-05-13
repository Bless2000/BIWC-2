import React, { useState } from 'react';
import {
  Mail, Phone, MapPin, Clock, Send, CheckCircle2,
  Youtube, Facebook, Instagram, Music2,
  MessageSquare, Heart, Users, ChevronRight,
  AlertCircle, Loader2, ExternalLink,
} from 'lucide-react';

/**
 * BIWC – Contact Page
 *
 * ─── CMS MIGRATION ───────────────────────────────────────────────────────────
 * All content data lives in the CONTACT_DATA object below.
 * When your headless CMS is ready, replace CONTACT_DATA with a fetch:
 *
 *   const [contactData, setContactData] = useState(null);
 *   useEffect(() => {
 *     fetch('/api/contact-page')                // Sanity / Contentful / etc.
 *       .then(r => r.json())
 *       .then(setContactData);
 *   }, []);
 *
 * The CMS document should expose the same fields as CONTACT_DATA below.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * FORM SUBMISSION:
 *  The form currently uses a mock submit handler.
 *  Wire it to your backend / Formspree / EmailJS / Sanity webhook
 *  by replacing handleSubmit with your real API call.
 */

// ─── CMS Data shape (replace with CMS fetch) ──────────────────────────────────
const CONTACT_DATA = {
  church: {
    name:      'Believers International Worship Center',
    shortName: 'BIWC',
    tagline:   'Abelemkpe, Accra — Ghana',
    bio:       "We'd love to hear from you. Whether you have a question, a prayer request, or you're planning your first visit — our team is ready to welcome you.",
  },

  // ── Contact details ────────────────────────────────────────────────────────
  details: [
    {
      id:    'email',
      label: 'Email Us',
      value: 'biwc@gmail.com',
      sub:   'We typically reply within 24 hours',
      icon:  'Mail',
      href:  'mailto:biwc@gmail.com',
      color: '#f5c842',
    },
    {
      id:    'phone',
      label: 'Call Us',
      value: '+233 240 000 000',
      sub:   'Mon – Fri, 9:00am – 5:00pm',
      icon:  'Phone',
      href:  'tel:+233240000000',
      color: '#4a80f0',
    },
    {
      id:    'address',
      label: 'Visit Us',
      value: 'Abelemkpe, Accra',
      sub:   'Greater Accra Region, Ghana',
      icon:  'MapPin',
      href:  'https://maps.google.com/?q=Abelemkpe+Accra+Ghana',
      color: '#40c070',
    },
  ],

  // ── Service times ──────────────────────────────────────────────────────────
  serviceTimes: [
    { day: 'Sunday',    name: 'Main Service',        time: '7:30am – 9:30am',  color: '#4a80f0' },
    { day: 'Wednesday', name: 'Midweek Online',       time: '6:30pm – 8:30pm',  color: '#f5c842' },
    { day: 'Friday',    name: 'Online Prayer',        time: '6:30pm – 8:30pm',  color: '#ff4a4a' },
  ],

  // ── Social media links ─────────────────────────────────────────────────────
  // CMS: each platform is a document with name, url, handle, icon, color fields
  socials: [
    {
      id:      'youtube',
      name:    'YouTube',
      handle:  '@biwcghana',
      url:     'https://youtube.com/@biwcghana',
      icon:    'Youtube',
      color:   '#ff4a4a',
      bg:      'rgba(255,74,74,0.12)',
      border:  'rgba(255,74,74,0.3)',
      label:   'Watch sermons & live services',
    },
    {
      id:      'facebook',
      name:    'Facebook',
      handle:  '@biwcghana',
      url:     'https://facebook.com/@biwcghana',
      icon:    'Facebook',
      color:   '#4a80f0',
      bg:      'rgba(74,128,240,0.12)',
      border:  'rgba(74,128,240,0.3)',
      label:   'Stay updated with church news',
    },
    {
      id:      'instagram',
      name:    'Instagram',
      handle:  '@biwcghana',
      url:     'https://instagram.com/@biwcghana',
      icon:    'Instagram',
      color:   '#f5c842',
      bg:      'rgba(245,200,66,0.12)',
      border:  'rgba(245,200,66,0.3)',
      label:   'Photos & moments from church life',
    },
    {
      id:      'tiktok',
      name:    'TikTok',
      handle:  '@biwcghana',
      url:     'https://tiktok.com/@biwcghana',
      icon:    'Music2',
      color:   '#a070f0',
      bg:      'rgba(160,112,240,0.12)',
      border:  'rgba(160,112,240,0.3)',
      label:   'Short clips & highlights',
    },
  ],

  // ── Contact reasons (for the form dropdown) ────────────────────────────────
  reasons: [
    'General Inquiry',
    'Plan a Visit',
    'Prayer Request',
    'Membership Information',
    'Join a Ministry',
    'Event Information',
    'Pastoral Care',
    'Media / Press',
    'Other',
  ],

  // ── Map embed URL ──────────────────────────────────────────────────────────
  // Replace with real Google Maps embed src for Abelemkpe church location
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.7!2d-0.2057!3d5.5913!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sAbelemkpe%2C+Accra!5e0!3m2!1sen!2sgh!4v1',
};

// ─── Icon resolver ────────────────────────────────────────────────────────────
const ICONS = { Mail, Phone, MapPin, Clock, Youtube, Facebook, Instagram, Music2 };
const Ico = ({ name, size = 18, className = '', style = {} }) => {
  const C = ICONS[name];
  return C ? <C size={size} className={className} style={style} /> : null;
};

// ─── Geo patterns ─────────────────────────────────────────────────────────────
const GeoDots = ({ opacity = '0.06' }) => (
  <div className="absolute inset-0 pointer-events-none"
    style={{ opacity, backgroundImage: 'radial-gradient(circle,#fff 1px,transparent 1px)', backgroundSize: '22px 22px' }} />
);
const GeoCross = () => (
  <div className="absolute inset-0 pointer-events-none opacity-[0.05]"
    style={{ background: 'linear-gradient(90deg,#fff 1px,transparent 1px) 0 0/22px 22px,linear-gradient(0deg,#fff 1px,transparent 1px) 0 0/22px 22px' }} />
);

// ─── Section heading ──────────────────────────────────────────────────────────
const SectionHead = ({ eyebrow, title, italic }) => (
  <div className="mb-7 md:mb-9">
    <span className="inline-block text-[10px] font-bold uppercase tracking-[0.28em] mb-3 px-3 py-1 rounded-full"
      style={{ background: 'rgba(245,200,66,0.1)', border: '1px solid rgba(245,200,66,0.25)', color: 'var(--gold-bright)' }}>
      {eyebrow}
    </span>
    <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-wide">
      {title} {italic && <em>{italic}</em>}
    </h2>
    <div className="w-10 h-[2px] mt-3"
      style={{ background: 'linear-gradient(90deg, var(--gold-bright), transparent)' }} />
  </div>
);

// ─── Contact detail card ──────────────────────────────────────────────────────
const DetailCard = ({ item }) => (
  <a
    href={item.href}
    target={item.id === 'address' ? '_blank' : undefined}
    rel={item.id === 'address' ? 'noreferrer' : undefined}
    className="glass rounded-2xl p-5 flex items-start gap-4 group transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
    style={{ border: '1px solid rgba(255,255,255,0.09)' }}
  >
    {/* Hover glow */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      style={{ background: `radial-gradient(ellipse 80% 60% at 0% 50%, ${item.color}14, transparent)` }} />
    {/* Left accent bar */}
    <div className="absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      style={{ background: `linear-gradient(to bottom, ${item.color}, transparent)` }} />

    {/* Icon */}
    <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
      style={{ background: `${item.color}15`, border: `1px solid ${item.color}28` }}>
      <Ico name={item.icon} size={18} style={{ color: item.color }} />
    </div>

    {/* Text */}
    <div className="flex-1 min-w-0">
      <p className="text-[9.5px] font-bold uppercase tracking-[0.22em] text-white/30 mb-1">{item.label}</p>
      <p className="text-white font-bold text-[13.5px] leading-snug mb-0.5 break-words">{item.value}</p>
      <p className="text-white/35 text-[11.5px]">{item.sub}</p>
    </div>

    <ChevronRight size={14} className="text-white/20 group-hover:text-white/60 group-hover:translate-x-0.5 transition-all duration-200 shrink-0 mt-1" />
  </a>
);

// ─── Social platform card ─────────────────────────────────────────────────────
const SocialCard = ({ platform }) => (
  <a
    href={platform.url}
    target="_blank"
    rel="noreferrer"
    className="relative rounded-2xl p-5 flex flex-col gap-3 group transition-all duration-300 hover:-translate-y-1.5 overflow-hidden"
    style={{ background: platform.bg, border: `1px solid ${platform.border}` }}
  >
    <GeoDots opacity="0.05" />
    {/* Shimmer */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
      style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 60%)' }} />

    {/* Top row */}
    <div className="flex items-center justify-between relative z-10">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center"
        style={{ background: `${platform.color}20`, border: `1px solid ${platform.color}35` }}>
        <Ico name={platform.icon} size={18} style={{ color: platform.color }} />
      </div>
      <ExternalLink size={13} className="opacity-0 group-hover:opacity-60 transition-opacity duration-200"
        style={{ color: platform.color }} />
    </div>

    {/* Platform name + handle */}
    <div className="relative z-10">
      <p className="text-white font-bold text-[14px] tracking-wide">{platform.name}</p>
      <p className="text-[11.5px] font-bold mt-0.5" style={{ color: platform.color }}>{platform.handle}</p>
    </div>

    {/* Label */}
    <p className="text-white/40 text-[11.5px] leading-snug relative z-10">{platform.label}</p>
  </a>
);

// ─── Service times card ───────────────────────────────────────────────────────
const ServiceTimesCard = ({ times }) => (
  <div className="glass rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.09)' }}>
    <div className="px-5 pt-5 pb-3 border-b border-white/8">
      <div className="flex items-center gap-2">
        <Clock size={14} style={{ color: 'var(--gold-bright)' }} />
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/40">Service Times</p>
      </div>
    </div>
    <div className="divide-y divide-white/[0.06]">
      {times.map((svc, i) => (
        <div key={i} className="flex items-center justify-between px-5 py-4 group hover:bg-white/[0.03] transition-colors duration-200">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full shrink-0"
              style={{ background: svc.color, boxShadow: `0 0 8px ${svc.color}80` }} />
            <div>
              <p className="text-white font-bold text-[13px]">{svc.name}</p>
              <p className="text-white/35 text-[11px] uppercase tracking-wide">{svc.day}</p>
            </div>
          </div>
          <p className="text-[12px] font-bold" style={{ color: svc.color }}>{svc.time}</p>
        </div>
      ))}
    </div>
  </div>
);

// ─── Contact form ─────────────────────────────────────────────────────────────
const ContactForm = ({ reasons }) => {
  const [form,    setForm]    = useState({ name: '', email: '', phone: '', reason: '', message: '' });
  const [errors,  setErrors]  = useState({});
  const [status,  setStatus]  = useState('idle'); // idle | sending | success | error
  const [touched, setTouched] = useState({});

  const validate = (data) => {
    const e = {};
    if (!data.name.trim())                          e.name    = 'Your name is required.';
    if (!data.email.trim())                         e.email   = 'Email address is required.';
    else if (!/\S+@\S+\.\S+/.test(data.email))      e.email   = 'Please enter a valid email.';
    if (!data.reason)                               e.reason  = 'Please select a reason.';
    if (!data.message.trim())                       e.message = 'A message is required.';
    else if (data.message.trim().length < 10)       e.message = 'Message is too short.';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (touched[name]) {
      const errs = validate({ ...form, [name]: value });
      setErrors(prev => ({ ...prev, [name]: errs[name] }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(t => ({ ...t, [name]: true }));
    const errs = validate(form);
    setErrors(prev => ({ ...prev, [name]: errs[name] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allTouched = Object.fromEntries(Object.keys(form).map(k => [k, true]));
    setTouched(allTouched);
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus('sending');
    try {
      // ── TODO: Replace with real API call ────────────────────────────────────
      // await fetch('/api/contact', { method: 'POST', body: JSON.stringify(form) });
      // or: await emailjs.send('service_id', 'template_id', form, 'public_key');
      // ────────────────────────────────────────────────────────────────────────
      await new Promise(r => setTimeout(r, 1800)); // mock delay
      setStatus('success');
      setForm({ name: '', email: '', phone: '', reason: '', message: '' });
      setTouched({});
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="glass-form flex flex-col items-center text-center py-14 px-8">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
          style={{ background: 'rgba(64,192,112,0.15)', border: '1px solid rgba(64,192,112,0.35)' }}>
          <CheckCircle2 size={32} style={{ color: '#40c070' }} />
        </div>
        <h3 className="text-white font-bold text-xl tracking-wide mb-2">Message Sent!</h3>
        <div className="w-8 h-[2px] mb-4"
          style={{ background: 'linear-gradient(90deg, var(--gold-bright), transparent)' }} />
        <p className="text-white/50 text-[14px] leading-relaxed max-w-sm mb-7">
          Thank you for reaching out. A member of our team will get back to you within 24 hours. God bless you!
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="px-7 py-3 rounded-full text-[12px] font-bold uppercase tracking-wider transition-all duration-200 hover:-translate-y-[1px]"
          style={{ background: 'rgba(245,200,66,0.12)', border: '1px solid rgba(245,200,66,0.3)', color: 'var(--gold-bright)' }}
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="glass-form">
      {/* Form title */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <MessageSquare size={14} style={{ color: 'var(--gold-bright)' }} />
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/35">Get in Touch</p>
        </div>
        <h3 className="text-white font-bold text-xl tracking-wide">Send Us a <em>Message</em></h3>
      </div>

      {/* Error banner */}
      {status === 'error' && (
        <div className="flex items-start gap-3 p-4 rounded-xl mb-5"
          style={{ background: 'rgba(212,32,32,0.1)', border: '1px solid rgba(212,32,32,0.3)' }}>
          <AlertCircle size={15} className="shrink-0 mt-0.5" style={{ color: '#ff6060' }} />
          <p className="text-[13px]" style={{ color: '#ff8888' }}>
            Something went wrong. Please try again or email us directly.
          </p>
        </div>
      )}

      {/* Name + Email — side by side on sm+ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 sm:gap-4">
        <Field label="Full Name" name="name" type="text" placeholder="Your full name"
          value={form.name} onChange={handleChange} onBlur={handleBlur} error={errors.name} touched={touched.name} required />
        <Field label="Email Address" name="email" type="email" placeholder="your@email.com"
          value={form.email} onChange={handleChange} onBlur={handleBlur} error={errors.email} touched={touched.email} required />
      </div>

      {/* Phone + Reason — side by side on sm+ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 sm:gap-4">
        <Field label="Phone (optional)" name="phone" type="tel" placeholder="+233 000 000 000"
          value={form.phone} onChange={handleChange} onBlur={handleBlur} />
        <SelectField label="Reason for Contact" name="reason" options={reasons}
          value={form.reason} onChange={handleChange} onBlur={handleBlur} error={errors.reason} touched={touched.reason} required />
      </div>

      {/* Message */}
      <Field label="Your Message" name="message" type="textarea" placeholder="Tell us how we can help, or share what's on your heart…"
        value={form.message} onChange={handleChange} onBlur={handleBlur} error={errors.message} touched={touched.message} required />

      {/* Submit */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-2">
        <p className="text-white/25 text-[11.5px] leading-relaxed max-w-xs">
          We reply within 24 hours. Your information is kept private.
        </p>
        <button
          type="submit"
          disabled={status === 'sending'}
          className="btn-submit shrink-0 w-full sm:w-auto justify-center"
        >
          {status === 'sending'
            ? <><Loader2 size={15} className="animate-spin" /> Sending…</>
            : <><Send size={14} /> Send Message</>
          }
        </button>
      </div>
    </form>
  );
};

// ─── Form field ───────────────────────────────────────────────────────────────
const Field = ({ label, name, type, placeholder, value, onChange, onBlur, error, touched, required }) => (
  <div className="form-group">
    <label htmlFor={name}>
      {label}{required && <span className="ml-1" style={{ color: 'var(--gold-bright)' }}>*</span>}
    </label>
    {type === 'textarea'
      ? <textarea id={name} name={name} placeholder={placeholder} value={value}
          onChange={onChange} onBlur={onBlur} rows={5}
          style={touched && error ? { borderColor: 'rgba(212,32,32,0.6)' } : {}} />
      : <input id={name} name={name} type={type} placeholder={placeholder} value={value}
          onChange={onChange} onBlur={onBlur}
          style={touched && error ? { borderColor: 'rgba(212,32,32,0.6)' } : {}} />
    }
    {touched && error && (
      <p className="flex items-center gap-1.5 mt-1.5 text-[11px]" style={{ color: '#ff7070' }}>
        <AlertCircle size={10} /> {error}
      </p>
    )}
  </div>
);

// ─── Select field ─────────────────────────────────────────────────────────────
const SelectField = ({ label, name, options, value, onChange, onBlur, error, touched, required }) => (
  <div className="form-group">
    <label htmlFor={name}>
      {label}{required && <span className="ml-1" style={{ color: 'var(--gold-bright)' }}>*</span>}
    </label>
    <select
      id={name} name={name} value={value}
      onChange={onChange} onBlur={onBlur}
      className="w-full rounded-lg px-4 py-3 text-[13px] text-white outline-none transition-all duration-200 appearance-none"
      style={{
        background: 'rgba(255,255,255,0.05)',
        border: touched && error ? '1px solid rgba(212,32,32,0.6)' : '1px solid rgba(255,255,255,0.1)',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.3)' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 14px center',
      }}
    >
      <option value="" disabled style={{ background: '#0a102e' }}>Select a reason…</option>
      {options.map(opt => (
        <option key={opt} value={opt} style={{ background: '#0a102e' }}>{opt}</option>
      ))}
    </select>
    {touched && error && (
      <p className="flex items-center gap-1.5 mt-1.5 text-[11px]" style={{ color: '#ff7070' }}>
        <AlertCircle size={10} /> {error}
      </p>
    )}
  </div>
);

// ─── Map embed ────────────────────────────────────────────────────────────────
const MapEmbed = ({ url }) => (
  <div className="relative rounded-2xl overflow-hidden" style={{ height: '260px', border: '1px solid rgba(255,255,255,0.1)' }}>
    {/* Dark map tint overlay */}
    <div className="absolute inset-0 pointer-events-none z-10"
      style={{ background: 'rgba(6,15,46,0.25)', mixBlendMode: 'multiply' }} />
    <iframe
      src={url}
      width="100%"
      height="100%"
      style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.85) contrast(0.9)' }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="BIWC Church Location"
    />
  </div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Contact() {
  const { church, details, serviceTimes, socials, reasons, mapEmbedUrl } = CONTACT_DATA;

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10 pb-16 md:pb-24">
      <div className="max-w-[1200px] mx-auto">

        {/* ══════════════════════════════════════════════════
            ① PAGE HEADER
        ══════════════════════════════════════════════════ */}
        <div className="mb-10 md:mb-14">
          <span className="inline-block text-[10px] font-bold uppercase tracking-[0.3em] mb-4 px-3 py-1 rounded-full"
            style={{ background: 'rgba(245,200,66,0.1)', border: '1px solid rgba(245,200,66,0.25)', color: 'var(--gold-bright)' }}>
            Reach Out
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 tracking-wide">
            Get In <em>Touch</em>
          </h1>
          <div className="w-14 h-[2px] mb-5"
            style={{ background: 'linear-gradient(90deg, var(--gold-bright), transparent)' }} />
          <p className="text-white/50 text-[14px] md:text-[15px] leading-relaxed max-w-2xl">
            {church.bio}
          </p>
        </div>

        {/* ══════════════════════════════════════════════════
            ② MAIN GRID — Form (left) + Info (right)
        ══════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 md:gap-8 mb-16 md:mb-20 items-start">

          {/* ── Left: Contact Form ── */}
          <div>
            <ContactForm reasons={reasons} />
          </div>

          {/* ── Right: Info panel ── */}
          <div className="space-y-4">

            {/* Contact details */}
            <div className="space-y-3">
              {details.map(item => <DetailCard key={item.id} item={item} />)}
            </div>

            {/* Service times */}
            <ServiceTimesCard times={serviceTimes} />

            {/* Map */}
            <MapEmbed url={mapEmbedUrl} />
          </div>
        </div>

        {/* ══════════════════════════════════════════════════
            ③ SOCIAL MEDIA
        ══════════════════════════════════════════════════ */}
        <section className="mb-16 md:mb-20">
          <SectionHead eyebrow="Follow Us" title="Find Us" italic="Online" />
          {/* 2-col mobile → 4-col desktop */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {socials.map(platform => <SocialCard key={platform.id} platform={platform} />)}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            ④ FAQ STRIP
        ══════════════════════════════════════════════════ */}
        <section className="mb-16 md:mb-20">
          <SectionHead eyebrow="Common Questions" title="Quick" italic="Answers" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                q: 'When is your Sunday service?',
                a: 'Every Sunday at 7:30am – 9:30am. All are welcome — come as you are.',
                color: '#4a80f0',
              },
              {
                q: 'How do I join a ministry?',
                a: 'Fill out the contact form above or visit the Ministries page to find the right fit for you.',
                color: '#f5c842',
              },
              {
                q: 'Do you offer online services?',
                a: 'Yes! We stream every service live on our YouTube channel — youtube.com/@biwcghana.',
                color: '#ff4a4a',
              },
              {
                q: 'How can I submit a prayer request?',
                a: 'Use the contact form and select "Prayer Request" as the reason. Our prayer team will stand with you.',
                color: '#40c070',
              },
            ].map((item, i) => (
              <div key={i}
                className="glass rounded-2xl p-5 relative overflow-hidden group transition-all duration-300 hover:-translate-y-0.5"
                style={{ border: '1px solid rgba(255,255,255,0.09)' }}
              >
                <div className="absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full"
                  style={{ background: `linear-gradient(to bottom, ${item.color}, transparent)` }} />
                <p className="text-white font-bold text-[13.5px] tracking-wide mb-2 ml-3">{item.q}</p>
                <p className="text-white/45 text-[13px] leading-relaxed ml-3">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            ⑤ BOTTOM CTA BANNER
        ══════════════════════════════════════════════════ */}
        <section>
          <div className="relative rounded-2xl md:rounded-3xl overflow-hidden p-8 sm:p-10 md:p-14"
            style={{ background: 'linear-gradient(135deg, rgba(26,58,143,0.5), rgba(13,31,96,0.85))', border: '1px solid rgba(255,255,255,0.1)' }}>
            <GeoDots />
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 55%)' }} />
            <div className="absolute -right-16 -bottom-16 w-56 md:w-72 h-56 md:h-72 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle,rgba(245,200,66,0.25),transparent)', filter: 'blur(55px)' }} />
            <div className="absolute -left-12 top-0 w-48 md:w-60 h-48 md:h-60 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle,rgba(212,32,32,0.15),transparent)', filter: 'blur(60px)' }} />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div className="max-w-xl">
                <div className="flex items-center gap-2 mb-4">
                  <Heart size={14} style={{ color: 'var(--gold-bright)' }} />
                  <span className="text-[10px] font-bold uppercase tracking-[0.28em]" style={{ color: 'var(--gold-bright)' }}>
                    Planning a Visit?
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 tracking-wide leading-tight">
                  We'd Love to <em>Welcome You</em>
                </h2>
                <p className="text-white/50 text-[13.5px] leading-relaxed">
                  Whether it's your first Sunday or you've been attending for years, BIWC is a place where everyone belongs. Join us and experience the difference.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-3 shrink-0">
                <a href="https://maps.google.com/?q=Abelemkpe+Accra+Ghana" target="_blank" rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-bold uppercase tracking-widest text-[12.5px] text-white transition-all duration-200 hover:-translate-y-[2px]"
                  style={{ background: 'linear-gradient(135deg, var(--gold), #e8a820)', boxShadow: '0 4px 20px rgba(200,144,10,0.45)' }}>
                  <MapPin size={15} /> Get Directions
                </a>
                <a href="https://youtube.com/@biwcghana" target="_blank" rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold uppercase tracking-widest text-[12.5px] text-white/60 hover:text-white transition-all duration-200"
                  style={{ border: '1px solid rgba(255,255,255,0.18)', background: 'rgba(255,255,255,0.06)' }}>
                  <Users size={15} /> Watch Online
                </a>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
