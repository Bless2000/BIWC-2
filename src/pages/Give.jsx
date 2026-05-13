import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Copy, Check, Smartphone, Building2,
  Globe, ChevronRight, Heart, ArrowRight,
  Landmark, BookOpen, Users, Zap,
} from 'lucide-react';

/**
 * BIWC – Give Page
 *
 * CMS MIGRATION:
 *  Replace GIVING_DATA below with a fetch from your headless CMS.
 *  All account numbers, names, and mobile money IDs come from the CMS.
 *  The page layout and design stay the same — only the data changes.
 *
 * CMS Schema for payment methods:
 *  {
 *    id:       string (unique slug)
 *    type:     'bank' | 'mobile' | 'online'
 *    label:    string  — display name e.g. "Bank Transfer"
 *    provider: string  — bank name or network e.g. "GCB Bank"
 *    fields:   { label: string, value: string }[]
 *    icon:     'bank' | 'mobile' | 'globe'
 *    color:    hex string
 *    gradient: CSS gradient string
 *  }
 *
 * GIVING FUNDS:
 *  {
 *    id, label, description, icon (lucide name string)
 *  }
 */

// ─── CMS DATA — replace with fetch ───────────────────────────────────────────
const GIVING_DATA = {
  // General giving note (CMS field: giving_note)
  note: "Every seed you sow into BIWC is an investment in the Kingdom of God. Your generosity fuels our ministries, our outreach, and our mission to transform lives across Accra and beyond.",

  // Scripture (CMS field: giving_scripture)
  scripture: {
    text: "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.",
    ref:  "2 Corinthians 9:7",
  },

  // Payment methods (CMS collection: payment_methods)
  methods: [
    {
      id: 'gcb-bank',
      type: 'bank',
      label: 'Bank Transfer',
      provider: 'GCB Bank',
      icon: 'bank',
      color: '#4a80f0',
      gradient: 'linear-gradient(135deg, #0d2a7a, #2555c0)',
      fields: [
        { label: 'Account Name',   value: 'Believers International Worship Center' },
        { label: 'Account Number', value: '0000000000' },       // ← replace via CMS
        { label: 'Branch',         value: 'Abelemkpe Branch'    },
        { label: 'Sort Code',      value: '000000'               },  // ← replace via CMS
      ],
    },
    {
      id: 'mtn-momo',
      type: 'mobile',
      label: 'MTN Mobile Money',
      provider: 'MTN MoMo',
      icon: 'mobile',
      color: '#f5c842',
      gradient: 'linear-gradient(135deg, #7a4a00, #c8900a)',
      fields: [
        { label: 'MoMo Number', value: '024 000 0000' },         // ← replace via CMS
        { label: 'Name',        value: 'BIWC Ghana'   },
        { label: 'Reference',   value: 'BIWC Tithe / Offering'  },
      ],
    },
    {
      id: 'telecel-cash',
      type: 'mobile',
      label: 'Telecel Cash',
      provider: 'Telecel',
      icon: 'mobile',
      color: '#ff4a4a',
      gradient: 'linear-gradient(135deg, #7a0a0a, #d42020)',
      fields: [
        { label: 'Number',    value: '050 000 0000' },           // ← replace via CMS
        { label: 'Name',      value: 'BIWC Ghana'  },
        { label: 'Reference', value: 'BIWC Tithe / Offering'    },
      ],
    },
    {
      id: 'at-money',
      type: 'mobile',
      label: 'AT Money',
      provider: 'AirtelTigo',
      icon: 'mobile',
      color: '#40c070',
      gradient: 'linear-gradient(135deg, #0a4a1a, #1a8040)',
      fields: [
        { label: 'Number',    value: '027 000 0000' },           // ← replace via CMS
        { label: 'Name',      value: 'BIWC Ghana'  },
        { label: 'Reference', value: 'BIWC Tithe / Offering'    },
      ],
    },
  ],

  // Giving funds (CMS collection: giving_funds)
  funds: [
    { id: 'tithe',     label: 'Tithes',           icon: 'landmark', description: 'Your faithful tithe — the first tenth of your increase.'         },
    { id: 'offering',  label: 'Offering',          icon: 'heart',    description: 'A freewill offering over and above your tithe.'                   },
    { id: 'missions',  label: 'Missions',          icon: 'globe',    description: 'Fuelling our outreach and evangelism programs.'                   },
    { id: 'building',  label: 'Building Fund',     icon: 'building', description: 'Supporting the growth and expansion of our facilities.'           },
    { id: 'widows',    label: 'Widows & Orphans',  icon: 'users',    description: 'Caring for the most vulnerable in our community.'                 },
    { id: 'youth',     label: 'Youth Ministry',    icon: 'zap',      description: 'Investing in the next generation of Kingdom leaders.'             },
  ],
};

// ─── Icon map for funds ───────────────────────────────────────────────────────
const FUND_ICONS = {
  landmark: Landmark, heart: Heart, globe: Globe,
  building: Building2, users: Users, zap: Zap,
};

// ─── Geo pattern ──────────────────────────────────────────────────────────────
const GeoDots = () => (
  <div className="absolute inset-0 pointer-events-none opacity-[0.06]"
    style={{ backgroundImage: 'radial-gradient(circle,#fff 1px,transparent 1px)', backgroundSize: '22px 22px' }} />
);

// ─── Copy-to-clipboard button ─────────────────────────────────────────────────
const CopyBtn = ({ value }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(value).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={copy}
      className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all duration-200 hover:scale-110"
      style={{
        background: copied ? 'rgba(64,192,112,0.2)' : 'rgba(255,255,255,0.08)',
        border: `1px solid ${copied ? 'rgba(64,192,112,0.45)' : 'rgba(255,255,255,0.14)'}`,
      }}
      title="Copy to clipboard"
    >
      {copied
        ? <Check size={12} style={{ color: '#40c070' }} />
        : <Copy size={12} className="text-white/40" />
      }
    </button>
  );
};

// ─── Payment method card ──────────────────────────────────────────────────────
const MethodCard = ({ method, active, onClick }) => {
  const IconComp = method.icon === 'mobile' ? Smartphone
    : method.icon === 'globe'  ? Globe
    : Building2;

  return (
    <button
      onClick={onClick}
      className="w-full text-left transition-all duration-300 rounded-2xl relative overflow-hidden"
      style={{
        background: active
          ? `linear-gradient(135deg, ${method.color}20, ${method.color}08)`
          : 'rgba(255,255,255,0.04)',
        border: `1.5px solid ${active ? method.color + '60' : 'rgba(255,255,255,0.09)'}`,
        boxShadow: active ? `0 0 32px ${method.color}22` : 'none',
      }}
    >
      {active && <GeoDots />}
      <div className="relative z-10 flex items-center gap-3.5 p-4">
        {/* Icon */}
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300"
          style={{
            background: active ? method.gradient : 'rgba(255,255,255,0.07)',
            boxShadow: active ? `0 4px 16px ${method.color}45` : 'none',
            border: active ? 'none' : '1px solid rgba(255,255,255,0.12)',
          }}
        >
          <IconComp size={18} className={active ? 'text-white' : 'text-white/40'} />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-[12.5px] font-bold tracking-wide truncate"
            style={{ color: active ? '#fff' : 'rgba(255,255,255,0.55)' }}>
            {method.label}
          </p>
          <p className="text-[11px] truncate"
            style={{ color: active ? method.color : 'rgba(255,255,255,0.28)' }}>
            {method.provider}
          </p>
        </div>

        {/* Active indicator dot */}
        <div
          className="w-2 h-2 rounded-full shrink-0 transition-all duration-300"
          style={{ background: active ? method.color : 'rgba(255,255,255,0.15)', boxShadow: active ? `0 0 8px ${method.color}` : 'none' }}
        />
      </div>
    </button>
  );
};

// ─── Payment detail panel ─────────────────────────────────────────────────────
const MethodDetail = ({ method }) => {
  const IconComp = method.icon === 'mobile' ? Smartphone
    : method.icon === 'globe'  ? Globe
    : Building2;

  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-500"
      style={{
        background: `linear-gradient(135deg, ${method.color}14, rgba(255,255,255,0.03))`,
        border: `1.5px solid ${method.color}40`,
        boxShadow: `0 16px 60px ${method.color}18`,
      }}
    >
      {/* Header bar */}
      <div className="relative px-5 py-5 overflow-hidden"
        style={{ background: method.gradient, borderBottom: `1px solid ${method.color}30` }}>
        <GeoDots />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 60%)' }} />

        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)' }}>
            <IconComp size={18} className="text-white" />
          </div>
          <div>
            <p className="text-[9.5px] font-bold uppercase tracking-[0.22em] text-white/50 mb-0.5">
              Payment Method
            </p>
            <h3 className="text-white font-bold text-base tracking-wide">{method.label}</h3>
          </div>
        </div>
      </div>

      {/* Fields */}
      <div className="p-5 space-y-3">
        {method.fields.map((field, i) => (
          <div key={i}
            className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="min-w-0">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/30 mb-0.5">
                {field.label}
              </p>
              <p className="text-white font-bold text-[13px] truncate">{field.value}</p>
            </div>
            <CopyBtn value={field.value} />
          </div>
        ))}

        {/* Info note */}
        <div className="mt-2 flex items-start gap-2.5 px-3 py-2.5 rounded-xl"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="w-1 h-1 rounded-full mt-1.5 shrink-0" style={{ background: method.color }} />
          <p className="text-white/35 text-[11.5px] leading-relaxed">
            After making your transfer, please save your receipt. You may contact us to confirm your gift.
          </p>
        </div>
      </div>
    </div>
  );
};

// ─── Fund pill ────────────────────────────────────────────────────────────────
const FundPill = ({ fund, active, onClick }) => {
  const Icon = FUND_ICONS[fund.icon] || Heart;
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-3.5 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all duration-200 whitespace-nowrap"
      style={{
        background: active ? 'var(--gold-bright)' : 'rgba(255,255,255,0.06)',
        border: `1px solid ${active ? 'var(--gold-bright)' : 'rgba(255,255,255,0.12)'}`,
        color: active ? '#000' : 'rgba(255,255,255,0.45)',
        boxShadow: active ? '0 4px 16px rgba(245,200,66,0.4)' : 'none',
      }}
    >
      <Icon size={11} />
      {fund.label}
    </button>
  );
};

// ─── Main page ────────────────────────────────────────────────────────────────
export default function Give() {
  const [activeMethod, setActiveMethod] = useState(GIVING_DATA.methods[0].id);
  const [activeFund,   setActiveFund]   = useState('tithe');

  const currentMethod = GIVING_DATA.methods.find(m => m.id === activeMethod);
  const currentFund   = GIVING_DATA.funds.find(f => f.id === activeFund);

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10 pb-16 md:pb-24">

      {/* ── Page Header ── */}
      <div className="max-w-[1200px] mx-auto mb-10 md:mb-16">
        <span className="inline-block text-[10px] font-bold uppercase tracking-[0.3em] mb-4 px-3 py-1 rounded-full"
          style={{ background: 'rgba(245,200,66,0.1)', border: '1px solid rgba(245,200,66,0.25)', color: 'var(--gold-bright)' }}>
          Sow a Seed
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-wide">
          Give <em>Generously</em>
        </h1>
        <div className="w-14 h-[2px] mb-5"
          style={{ background: 'linear-gradient(90deg, var(--gold-bright), transparent)' }} />
        <p className="text-white/50 text-[14px] sm:text-[15px] leading-relaxed max-w-2xl">
          {GIVING_DATA.note}
        </p>
      </div>

      <div className="max-w-[1200px] mx-auto space-y-6">

        {/* ── Scripture banner ── */}
        <div className="relative rounded-2xl p-5 sm:p-7 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(122,74,0,0.45), rgba(6,15,46,0.8))',
            border: '1px solid rgba(200,144,10,0.3)',
          }}>
          <GeoDots />
          <div className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full"
            style={{ background: 'linear-gradient(to bottom, var(--gold-bright), transparent)' }} />
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.04), transparent 60%)' }} />
          {/* Giant watermark quote */}
          <div className="absolute -top-4 left-3 text-[100px] font-bold leading-none opacity-[0.06] select-none pointer-events-none"
            style={{ color: 'var(--gold-bright)', fontFamily: 'var(--font-display)' }}>
            "
          </div>
          <div className="relative z-10 ml-4">
            <p className="text-white/80 text-[14px] sm:text-[15px] leading-[1.85] italic mb-2"
              style={{ fontStyle: 'italic' }}>
              "{GIVING_DATA.scripture.text}"
            </p>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em]"
              style={{ color: 'var(--gold-bright)' }}>
              — {GIVING_DATA.scripture.ref}
            </p>
          </div>
        </div>

        {/* ── Fund selector ── */}
        <div className="glass rounded-2xl p-5 sm:p-6"
          style={{ border: '1px solid rgba(255,255,255,0.09)' }}>
          <p className="text-[9.5px] font-bold uppercase tracking-[0.25em] text-white/30 mb-4">
            Giving Towards
          </p>

          {/* Horizontally scrollable pill row on mobile */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none flex-wrap sm:flex-nowrap">
            {GIVING_DATA.funds.map(fund => (
              <FundPill
                key={fund.id}
                fund={fund}
                active={activeFund === fund.id}
                onClick={() => setActiveFund(fund.id)}
              />
            ))}
          </div>

          {/* Fund description */}
          {currentFund && (
            <div className="mt-4 flex items-start gap-2.5 px-4 py-3 rounded-xl"
              style={{ background: 'rgba(245,200,66,0.06)', border: '1px solid rgba(245,200,66,0.15)' }}>
              {React.createElement(FUND_ICONS[currentFund.icon] || Heart, {
                size: 13, style: { color: 'var(--gold-bright)', flexShrink: 0, marginTop: 1 }
              })}
              <p className="text-white/55 text-[12.5px] leading-relaxed">{currentFund.description}</p>
            </div>
          )}
        </div>

        {/* ── Payment methods + detail panel ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          {/* Left: method selector */}
          <div>
            <p className="text-[9.5px] font-bold uppercase tracking-[0.25em] text-white/30 mb-4">
              Choose a Payment Method
            </p>
            <div className="space-y-2.5">
              {GIVING_DATA.methods.map(method => (
                <MethodCard
                  key={method.id}
                  method={method}
                  active={activeMethod === method.id}
                  onClick={() => setActiveMethod(method.id)}
                />
              ))}
            </div>

            {/* Coming soon note */}
            <div
              className="mt-4 flex items-start gap-3 px-4 py-3.5 rounded-xl"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <Globe size={13} className="text-white/25 shrink-0 mt-0.5" />
              <div>
                <p className="text-white/35 text-[11.5px] font-bold uppercase tracking-wider mb-0.5">
                  Online Payment — Coming Soon
                </p>
                <p className="text-white/25 text-[11px] leading-relaxed">
                  We're working on a secure online giving portal. For now, please use
                  the bank transfer or mobile money options above.
                </p>
              </div>
            </div>
          </div>

          {/* Right: detail panel */}
          <div>
            <p className="text-[9.5px] font-bold uppercase tracking-[0.25em] text-white/30 mb-4">
              Payment Details
            </p>
            {currentMethod && <MethodDetail method={currentMethod} />}
          </div>
        </div>

        {/* ── How to give step guide ── */}
        <div className="glass rounded-2xl p-6 sm:p-8 relative overflow-hidden"
          style={{ border: '1px solid rgba(255,255,255,0.09)' }}>
          <GeoDots />
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.03), transparent 60%)' }} />

          <p className="text-[9.5px] font-bold uppercase tracking-[0.25em] text-white/30 mb-6 relative z-10">
            How to Give
          </p>

          {/* Steps — wrap to 2-col on sm+ */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { step: '01', title: 'Choose a Fund',   body: 'Select what your gift is towards — tithes, offerings, missions, etc.' },
              { step: '02', title: 'Pick a Method',   body: 'Choose your preferred payment — bank transfer or mobile money.'        },
              { step: '03', title: 'Make the Payment',body: 'Use the account details shown to complete your gift.'                   },
              { step: '04', title: 'Save Your Receipt',body: 'Keep proof of payment. Contact us if you need confirmation.'           },
            ].map((s, i) => (
              <div key={i}
                className="relative p-4 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                {/* Step number — large watermark */}
                <div
                  className="text-[40px] font-bold leading-none mb-3 opacity-[0.12] select-none"
                  style={{ color: 'var(--gold-bright)', fontFamily: 'var(--font-display)' }}>
                  {s.step}
                </div>
                <h4 className="text-white font-bold text-[13px] tracking-wide mb-1.5">{s.title}</h4>
                <p className="text-white/40 text-[12px] leading-relaxed">{s.body}</p>
                {/* Connector line — hidden on last item and mobile */}
                {i < 3 && (
                  <div className="hidden lg:block absolute top-8 -right-2 w-4 h-[1px]"
                    style={{ background: 'rgba(245,200,66,0.25)' }} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom CTA ── */}
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden p-8 sm:p-10 md:p-14"
          style={{
            background: 'linear-gradient(135deg, rgba(122,74,0,0.5), rgba(6,15,46,0.88))',
            border: '1px solid rgba(200,144,10,0.28)',
          }}>
          <GeoDots />
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.04), transparent 55%)' }} />
          <div className="absolute -right-16 -bottom-16 w-56 md:w-72 h-56 md:h-72 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(245,200,66,0.3), transparent)', filter: 'blur(55px)' }} />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-7 md:gap-8">
            <div className="max-w-xl">
              <span className="inline-block text-[10px] font-bold uppercase tracking-[0.28em] mb-4 px-3 py-1 rounded-full"
                style={{ background: 'rgba(245,200,66,0.12)', border: '1px solid rgba(245,200,66,0.28)', color: 'var(--gold-bright)' }}>
                Questions?
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-wide">
                Need <em>Help Giving?</em>
              </h2>
              <p className="text-white/50 text-[13.5px] leading-relaxed">
                If you have any questions about giving, need to confirm a transaction,
                or want to set up a regular giving arrangement — our team is happy to help.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-3 shrink-0">
              <Link to="/contact" className="flex-1 sm:flex-none">
                <button className="w-full inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-bold uppercase tracking-widest text-[12.5px] text-white transition-all duration-200 hover:-translate-y-[2px]"
                  style={{ background: 'linear-gradient(135deg, var(--gold), #e8a820)', boxShadow: '0 4px 20px rgba(200,144,10,0.45)' }}>
                  <Heart size={14} /> Contact Us
                </button>
              </Link>
              <Link to="/about" className="flex-1 sm:flex-none">
                <button className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold uppercase tracking-widest text-[12.5px] text-white/55 hover:text-white transition-all duration-200"
                  style={{ border: '1px solid rgba(255,255,255,0.18)', background: 'rgba(255,255,255,0.06)' }}>
                  Learn About Us <ChevronRight size={13} />
                </button>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
