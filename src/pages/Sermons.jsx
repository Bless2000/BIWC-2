import React, { useState, useMemo, useEffect } from 'react';
import {
  Play, Search, X, ChevronRight, Tv2,
  Calendar, Clock, User, BookOpen, Filter,
  Volume2, Youtube, ExternalLink, Radio,
} from 'lucide-react';

// Import local sermon thumbnails
import sermon1 from '../assets/images/sermon1.jpg';
import sermon2 from '../assets/images/sermon2.jpg';
import sermon3 from '../assets/images/Sermon3.jpg';
import sermon5 from '../assets/images/sermon5.jpg';

/**
 * BIWC – Sermons Page
 *
 * Sermons are sourced from youtube.com/@biwcghana and played
 * directly on this page via the YouTube IFrame embed.
 *
 * CMS MIGRATION:
 *  Replace SERMONS_DATA with a fetch from your headless CMS or
 *  the YouTube Data API v3 (GET /youtube/v3/search?channelId=...).
 *  Each sermon must have a valid youtubeId for the embed to work.
 *
 * LIVE SERVICE:
 *  Set isLive: true + liveYoutubeId on the sermon object that is
 *  currently streaming. The page will surface it as a live banner
 *  automatically.
 *
 * YOUTUBE CHANNEL: https://www.youtube.com/@biwcghana
 */

const CHANNEL_URL = 'https://www.youtube.com/@biwcghana';

// ─── Sermon data (swap for CMS / YouTube API fetch) ──────────────────────────
const SERMONS_DATA = [
  // ── LIVE SERVICE (set isLive: true when streaming) ───────────────────────
  {
    id: 'live',
    title: 'Sunday Service — LIVE',
    speaker: 'Pastor BIWC',
    series: 'Sunday Service',
    date: 'Live Now',
    duration: 'Ongoing',
    category: 'Sunday Service',
    isLive: true,
    // Replace with the actual YouTube live stream ID when live
    youtubeId: 'jfKfPfyJRdk', // placeholder — swap for real live stream ID
    description: 'Join us live as we worship and receive the Word of God together.',
    scripture: '',
    thumbnail: null,
  },
  // ── PAST SERMONS — replace youtubeId values with real IDs from @biwcghana ──
  {
    id: 1,
    title: 'Walking in the Spirit',
    speaker: "Pastor's Name",
    series: 'Life in the Spirit',
    date: 'May 11, 2025',
    duration: '58 min',
    category: 'Sunday Service',
    isLive: false,
    youtubeId: 'dQw4w9WgXcQ', // ← replace with real YouTube video ID
    description: 'A powerful message on what it means to truly walk in the Spirit — moment by moment, step by step.',
    scripture: 'Galatians 5:16–25',
    thumbnail: sermon1,
  },
  {
    id: 2,
    title: 'The Power of Prayer',
    speaker: "Pastor's Name",
    series: 'Foundations of Faith',
    date: 'May 4, 2025',
    duration: '52 min',
    category: 'Sunday Service',
    isLive: false,
    youtubeId: 'dQw4w9WgXcQ',
    description: 'Discover how prayer moves heaven and transforms our hearts, families, and communities.',
    scripture: 'James 5:16–18',
    thumbnail: sermon2,
  },
  {
    id: 3,
    title: 'Word Conference 2025 — Day 1',
    speaker: 'Guest Speaker',
    series: 'Word Conference 2025',
    date: 'Aug 22, 2025',
    duration: '1h 24 min',
    category: 'Conference',
    isLive: false,
    youtubeId: 'dQw4w9WgXcQ',
    description: 'Opening message of the BIWC Word Conference 2025 — "The kingdoms of this world have become the Kingdom of our Lord."',
    scripture: 'Revelation 11:15',
    thumbnail: sermon3,
  },
  {
    id: 4,
    title: 'Word Conference 2025 — Day 2',
    speaker: 'Guest Speaker',
    series: 'Word Conference 2025',
    date: 'Aug 23, 2025',
    duration: '1h 10 min',
    category: 'Conference',
    isLive: false,
    youtubeId: 'dQw4w9WgXcQ',
    description: 'Day 2 of the BIWC Word Conference 2025 — a fresh encounter with the living Word.',
    scripture: 'Hebrews 4:12',
    thumbnail: sermon5,
  },
  {
    id: 5,
    title: 'Faith That Moves Mountains',
    speaker: "Pastor's Name",
    series: 'Foundations of Faith',
    date: 'Apr 27, 2025',
    duration: '45 min',
    category: 'Sunday Service',
    isLive: false,
    youtubeId: 'dQw4w9WgXcQ',
    description: 'What does genuine, mountain-moving faith look like? This message unpacks the anatomy of biblical faith.',
    scripture: 'Matthew 17:20',
    thumbnail: sermon1,
  },
  {
    id: 6,
    title: 'Midweek Service — Abiding in Christ',
    speaker: "Elder's Name",
    series: 'Midweek',
    date: 'Apr 23, 2025',
    duration: '38 min',
    category: 'Midweek',
    isLive: false,
    youtubeId: 'dQw4w9WgXcQ',
    description: 'An intimate teaching on what it means to abide in Christ and bear lasting fruit.',
    scripture: 'John 15:1–11',
    thumbnail: sermon2,
  },
  {
    id: 7,
    title: 'Grace That Is Greater',
    speaker: "Pastor's Name",
    series: 'Life in the Spirit',
    date: 'Apr 20, 2025',
    duration: '55 min',
    category: 'Sunday Service',
    isLive: false,
    youtubeId: 'dQw4w9WgXcQ',
    description: 'Grace is not just a doctrine — it is a person. This message reveals the depths of God\'s grace for every believer.',
    scripture: 'Romans 5:20–21',
    thumbnail: sermon3,
  },
  {
    id: 8,
    title: 'Friday Prayer — Breakthrough',
    speaker: 'Prayer Team',
    series: 'Friday Prayer',
    date: 'Apr 18, 2025',
    duration: '1h 05 min',
    category: 'Prayer',
    isLive: false,
    youtubeId: 'dQw4w9WgXcQ',
    description: 'A powerful night of intercession and breakthrough prayer. Join the prayer community of BIWC.',
    scripture: 'Isaiah 58:6',
    thumbnail: sermon3,
  },
  {
    id: 9,
    title: 'The Resurrection and the Life',
    speaker: "Pastor's Name",
    series: 'Special Services',
    date: 'Apr 13, 2025',
    duration: '50 min',
    category: 'Special',
    isLive: false,
    youtubeId: 'dQw4w9WgXcQ',
    description: 'Easter Sunday message — the risen Christ is the anchor of our faith and the hope of our salvation.',
    scripture: 'John 11:25–26',
    thumbnail: sermon5,
  },
];

// ─── Category tokens ──────────────────────────────────────────────────────────
const CAT = {
  'Sunday Service': { color: '#4a80f0', bg: 'rgba(74,128,240,0.14)',  border: 'rgba(74,128,240,0.32)'  },
  'Conference':     { color: '#f5c842', bg: 'rgba(245,200,66,0.14)', border: 'rgba(245,200,66,0.32)' },
  'Midweek':        { color: '#40c070', bg: 'rgba(64,192,112,0.14)', border: 'rgba(64,192,112,0.32)' },
  'Prayer':         { color: '#a070f0', bg: 'rgba(160,112,240,0.14)',border: 'rgba(160,112,240,0.32)'},
  'Special':        { color: '#ff4a4a', bg: 'rgba(255,74,74,0.14)',  border: 'rgba(255,74,74,0.32)'  },
  'Live':           { color: '#ff4a4a', bg: 'rgba(255,74,74,0.18)',  border: 'rgba(255,74,74,0.45)'  },
};
const catStyle = (cat) => CAT[cat] || CAT['Sunday Service'];

// ─── YouTube thumbnail helper ─────────────────────────────────────────────────
const ytThumb = (id) =>
  id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;

// ─── Geo dots ─────────────────────────────────────────────────────────────────
const GeoDots = ({ opacity = '0.06' }) => (
  <div className="absolute inset-0 pointer-events-none"
    style={{ opacity, backgroundImage: 'radial-gradient(circle,#fff 1px,transparent 1px)', backgroundSize: '22px 22px' }} />
);

// ─── Inline YouTube player ────────────────────────────────────────────────────
const YouTubePlayer = ({ sermon, onClose }) => {
  const embedUrl = sermon.isLive
    ? `https://www.youtube.com/embed/${sermon.youtubeId}?autoplay=1&rel=0`
    : `https://www.youtube.com/embed/${sermon.youtubeId}?autoplay=1&rel=0&modestbranding=1`;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const fn = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', fn);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', fn);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[2000] flex flex-col items-center justify-center p-0 sm:p-4 md:p-8"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0"
        style={{ background: 'rgba(2,5,18,0.96)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }} />

      {/* Panel */}
      <div
        className="relative w-full sm:max-w-4xl lg:max-w-5xl rounded-none sm:rounded-2xl overflow-hidden"
        style={{ boxShadow: '0 48px 120px rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Video header */}
        <div
          className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4"
          style={{ background: 'rgba(8,13,40,0.95)', borderBottom: '1px solid rgba(255,255,255,0.09)' }}
        >
          <div className="flex items-center gap-3 min-w-0">
            {sermon.isLive && (
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9.5px] font-bold uppercase tracking-widest shrink-0"
                style={{ background: 'rgba(212,32,32,0.2)', border: '1px solid rgba(212,32,32,0.5)', color: '#ff4a4a' }}>
                <Radio size={9} className="animate-pulse" /> Live
              </span>
            )}
            <div className="min-w-0">
              <p className="text-white font-bold text-[13px] sm:text-[14px] truncate">{sermon.title}</p>
              {sermon.speaker && (
                <p className="text-white/40 text-[11px] truncate">{sermon.speaker}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0 ml-3">
            <a
              href={`https://www.youtube.com/watch?v=${sermon.youtubeId}`}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10.5px] font-bold text-white/50 hover:text-white transition-colors duration-200"
              style={{ border: '1px solid rgba(255,255,255,0.15)' }}
            >
              <ExternalLink size={12} /> YouTube
            </a>
            <button onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all duration-200">
              <X size={16} />
            </button>
          </div>
        </div>

        {/* 16:9 iframe */}
        <div className="relative w-full" style={{ paddingBottom: '56.25%', background: '#000' }}>
          <iframe
            className="absolute inset-0 w-full h-full"
            src={embedUrl}
            title={sermon.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        {/* Video meta footer */}
        {(sermon.scripture || sermon.description) && (
          <div
            className="px-4 sm:px-6 py-4"
            style={{ background: 'rgba(8,13,40,0.95)', borderTop: '1px solid rgba(255,255,255,0.07)' }}
          >
            {sermon.scripture && (
              <div className="flex items-center gap-2 mb-2">
                <BookOpen size={12} style={{ color: 'var(--gold-bright)', flexShrink: 0 }} />
                <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: 'var(--gold-bright)' }}>
                  {sermon.scripture}
                </span>
              </div>
            )}
            {sermon.description && (
              <p className="text-white/50 text-[12.5px] leading-relaxed line-clamp-2">{sermon.description}</p>
            )}
          </div>
        )}
      </div>

      {/* Escape hint */}
      <p className="relative z-10 mt-4 text-white/20 text-[11px] font-medium tracking-widest hidden sm:block">
        Press ESC or click outside to close
      </p>
    </div>
  );
};

// ─── Live banner ──────────────────────────────────────────────────────────────
const LiveBanner = ({ sermon, onPlay }) => (
  <div
    className="relative rounded-2xl sm:rounded-3xl overflow-hidden mb-10 md:mb-14"
    style={{ border: '1px solid rgba(212,32,32,0.45)' }}
  >
    {/* Animated red glow bg */}
    <div className="absolute inset-0"
      style={{ background: 'linear-gradient(135deg, rgba(122,10,10,0.65), rgba(6,15,46,0.9))' }} />
    <GeoDots />
    <div className="absolute inset-0 pointer-events-none"
      style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.05), transparent 60%)' }} />
    {/* Glow orb */}
    <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full pointer-events-none"
      style={{ background: 'radial-gradient(circle, rgba(212,32,32,0.35), transparent)', filter: 'blur(40px)' }} />

    <div className="relative z-10 p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10">
      {/* Thumbnail / play area */}
      <button
        onClick={onPlay}
        className="relative rounded-xl overflow-hidden shrink-0 w-full md:w-64 group"
        style={{ aspectRatio: '16/9' }}
      >
        <div className="absolute inset-0 flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, rgba(122,10,10,0.8), rgba(6,15,46,0.9))' }}>
          <GeoDots />
        </div>
        {/* Pulsing live ring */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-full animate-ping"
              style={{ background: 'rgba(212,32,32,0.4)', width: '64px', height: '64px', margin: 'auto' }} />
            <div
              className="relative w-16 h-16 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
              style={{ background: 'rgba(212,32,32,0.9)', boxShadow: '0 0 40px rgba(212,32,32,0.6)' }}>
              <Play size={24} fill="white" className="text-white ml-1" />
            </div>
          </div>
        </div>
      </button>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest"
            style={{ background: 'rgba(212,32,32,0.25)', border: '1px solid rgba(212,32,32,0.55)', color: '#ff6060' }}>
            <Radio size={10} className="animate-pulse" /> Live Now
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">
            Sunday Service
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-wide mb-2 leading-tight">
          {sermon.title}
        </h2>
        <p className="text-white/50 text-[13.5px] leading-relaxed mb-5 max-w-lg">{sermon.description}</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onPlay}
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-bold uppercase tracking-widest text-[12.5px] text-white transition-all duration-200 hover:-translate-y-[2px]"
            style={{ background: 'linear-gradient(135deg, #d42020, #ff3030)', boxShadow: '0 4px 20px rgba(212,32,32,0.55)' }}
          >
            <Play size={15} fill="white" /> Watch Live
          </button>
          <a
            href={CHANNEL_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold uppercase tracking-widest text-[12.5px] text-white/60 hover:text-white transition-all duration-200"
            style={{ border: '1px solid rgba(255,255,255,0.18)', background: 'rgba(255,255,255,0.06)' }}
          >
            <Youtube size={15} /> YouTube
          </a>
        </div>
      </div>
    </div>
  </div>
);

// ─── Featured sermon card (largest, first sermon) ─────────────────────────────
const FeaturedSermonCard = ({ sermon, onPlay }) => {
  const s = catStyle(sermon.category);
  const thumb = sermon.thumbnail || ytThumb(sermon.youtubeId);

  return (
    <button
      onClick={() => onPlay(sermon)}
      className="w-full text-left relative rounded-2xl overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(0,0,0,0.5)]"
      style={{ minHeight: '280px', border: '1px solid rgba(255,255,255,0.12)' }}
    >
      {/* BG */}
      {thumb
        ? <img src={thumb} alt={sermon.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
        : <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #0d2a7a, #2555c0)' }} />
      }
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(6,15,46,0.97) 0%, rgba(6,15,46,0.2) 60%, transparent 100%)' }} />
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(100deg, rgba(6,15,46,0.75) 0%, transparent 60%)' }} />

      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
          style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)' }}>
          <Play size={22} fill="white" className="text-white ml-1" />
        </div>
      </div>

      {/* Top badges */}
      <div className="absolute top-4 left-4 sm:top-5 sm:left-5 flex gap-2">
        <div className="px-2.5 py-1 rounded-full text-[9.5px] font-bold uppercase tracking-widest"
          style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.color, backdropFilter: 'blur(6px)' }}>
          {sermon.category}
        </div>
        <div className="px-2.5 py-1 rounded-full text-[9.5px] font-bold uppercase tracking-widest"
          style={{ background: 'rgba(245,200,66,0.18)', border: '1px solid rgba(245,200,66,0.38)', color: 'var(--gold-bright)', backdropFilter: 'blur(6px)' }}>
          ✦ Latest
        </div>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7 md:p-8">
        <div className="flex items-center gap-3 mb-2 flex-wrap">
          {sermon.scripture && (
            <div className="flex items-center gap-1.5 text-[11px] text-white/40">
              <BookOpen size={11} style={{ color: 'var(--gold-bright)' }} />
              <span style={{ color: 'var(--gold-bright)' }}>{sermon.scripture}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5 text-[11px] text-white/40">
            <Calendar size={10} /> {sermon.date}
          </div>
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-wide leading-tight mb-1.5">
          {sermon.title}
        </h2>
        <p className="text-white/45 text-[12.5px] mb-4">{sermon.speaker} · {sermon.series}</p>
        <p className="text-white/35 text-[12.5px] leading-relaxed line-clamp-2 mb-5 max-w-2xl">{sermon.description}</p>
        <div
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[12px] font-bold uppercase tracking-wider transition-all duration-300 group-hover:gap-3"
          style={{ background: 'rgba(245,200,66,0.15)', border: '1px solid rgba(245,200,66,0.38)', color: 'var(--gold-bright)' }}>
          <Play size={13} fill="currentColor" /> Watch Sermon
        </div>
      </div>
    </button>
  );
};

// ─── Sermon card (grid) ───────────────────────────────────────────────────────
const SermonCard = ({ sermon, onPlay }) => {
  const s = catStyle(sermon.category);
  const thumb = sermon.thumbnail || ytThumb(sermon.youtubeId);

  return (
    <button
      onClick={() => onPlay(sermon)}
      className="text-left glass rounded-2xl overflow-hidden group transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_56px_rgba(0,0,0,0.45)] w-full flex flex-col"
      style={{ border: '1px solid rgba(255,255,255,0.09)' }}
    >
      {/* Thumbnail */}
      <div className="relative overflow-hidden shrink-0" style={{ aspectRatio: '16/9' }}>
        {thumb
          ? <img src={thumb} alt={sermon.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.07]"
              loading="lazy" />
          : <div className="w-full h-full flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #0d2a7a, #2555c0)' }}>
              <GeoDots />
            </div>
        }
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(6,15,46,0.85) 0%, rgba(6,15,46,0.05) 50%)' }} />

        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(212,32,32,0.85)', boxShadow: '0 0 24px rgba(212,32,32,0.6)' }}>
            <Play size={18} fill="white" className="text-white ml-0.5" />
          </div>
        </div>

        {/* Duration badge */}
        {sermon.duration && (
          <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded text-[10px] font-bold"
            style={{ background: 'rgba(0,0,0,0.75)', color: 'rgba(255,255,255,0.85)' }}>
            {sermon.duration}
          </div>
        )}

        {/* Category pill */}
        <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest"
          style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.color, backdropFilter: 'blur(6px)' }}>
          {sermon.category}
        </div>
      </div>

      {/* Info */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <h3 className="text-white font-bold text-[13.5px] tracking-wide leading-snug mb-2 group-hover:text-gold-bright transition-colors duration-200 text-left line-clamp-2"
          style={{ fontFamily: 'var(--font-display)' }}>
          {sermon.title}
        </h3>

        <div className="space-y-1 mb-3">
          {[
            { icon: User,     text: sermon.speaker },
            { icon: BookOpen, text: sermon.series  },
            { icon: Calendar, text: sermon.date    },
          ].map(({ icon: Icon, text }, i) => text && (
            <div key={i} className="flex items-center gap-1.5 text-[11.5px] text-white/38">
              <Icon size={10} style={{ color: 'var(--gold-bright)', flexShrink: 0 }} />
              <span className="truncate">{text}</span>
            </div>
          ))}
        </div>

        {sermon.scripture && (
          <div className="mt-auto pt-3 border-t border-white/8">
            <div className="flex items-center gap-1.5 text-[11px] font-bold" style={{ color: 'var(--gold-bright)' }}>
              <BookOpen size={10} />
              {sermon.scripture}
            </div>
          </div>
        )}
      </div>
    </button>
  );
};

// ─── Stats bar ────────────────────────────────────────────────────────────────
const StatsBar = ({ total, series }) => (
  <div className="glass rounded-2xl px-4 sm:px-6 py-4 mb-10 md:mb-14 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
    {[
      { value: total,                     label: 'Sermons',        color: '#f5c842' },
      { value: series,                    label: 'Series',         color: '#4a80f0' },
      { value: 'Every Sunday',            label: 'New Uploads',    color: '#40c070' },
      { value: '@biwcghana',              label: 'YouTube Channel',color: '#ff4a4a' },
    ].map((s, i) => (
      <div key={i} className="text-center">
        <div className="text-base sm:text-xl font-bold mb-0.5 truncate px-1"
          style={{ color: s.color, fontFamily: 'var(--font-display)' }}>
          {s.value}
        </div>
        <div className="text-[9.5px] sm:text-[10.5px] font-bold uppercase tracking-wider text-white/30 leading-tight">
          {s.label}
        </div>
      </div>
    ))}
  </div>
);

// ─── Main page ────────────────────────────────────────────────────────────────
export default function Sermons() {
  const [activeSermon,    setActiveSermon]    = useState(null);
  const [searchQuery,     setSearchQuery]     = useState('');
  const [activeCategory,  setActiveCategory]  = useState('All');
  const [activeSeries,    setActiveSeries]    = useState('All');

  // Separate live sermon from regular sermons
  const liveSermon   = useMemo(() => SERMONS_DATA.find(s => s.isLive), []);
  const pastSermons  = useMemo(() => SERMONS_DATA.filter(s => !s.isLive), []);

  const allCategories = useMemo(() => ['All', ...Array.from(new Set(pastSermons.map(s => s.category)))], [pastSermons]);
  const allSeries     = useMemo(() => ['All', ...Array.from(new Set(pastSermons.map(s => s.series)))], [pastSermons]);
  const seriesCount   = allSeries.length - 1;

  // Filtered list
  const filtered = useMemo(() => pastSermons.filter(s => {
    const matchCat    = activeCategory === 'All' || s.category === activeCategory;
    const matchSeries = activeSeries   === 'All' || s.series   === activeSeries;
    const q = searchQuery.toLowerCase();
    const matchQ = !q ||
      s.title.toLowerCase().includes(q) ||
      s.speaker.toLowerCase().includes(q) ||
      s.series.toLowerCase().includes(q) ||
      (s.scripture || '').toLowerCase().includes(q);
    return matchCat && matchSeries && matchQ;
  }), [activeCategory, activeSeries, searchQuery, pastSermons]);

  const featured  = filtered[0] || null;
  const remaining = filtered.slice(1);
  const clearAll  = () => { setActiveCategory('All'); setActiveSeries('All'); setSearchQuery(''); };
  const hasFilter = activeCategory !== 'All' || activeSeries !== 'All' || searchQuery;

  return (
    <>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10 pb-16 md:pb-24">

        {/* ── Page Header ── */}
        <div className="max-w-[1200px] mx-auto mb-10 md:mb-14">
          <span className="inline-block text-[10px] font-bold uppercase tracking-[0.3em] mb-4 px-3 py-1 rounded-full"
            style={{ background: 'rgba(245,200,66,0.1)', border: '1px solid rgba(245,200,66,0.25)', color: 'var(--gold-bright)' }}>
            Watch & Listen
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 tracking-wide">
            Sermons & <em>Messages</em>
          </h1>
          <div className="w-14 h-[2px] mb-5"
            style={{ background: 'linear-gradient(90deg, var(--gold-bright), transparent)' }} />
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <p className="text-white/50 text-[14px] md:text-[15px] leading-relaxed max-w-2xl">
              Watch our sermons, live services, and special messages directly on this page.
              All content is streamed from our YouTube channel.
            </p>
            <a href={CHANNEL_URL} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider shrink-0 transition-all duration-200 hover:-translate-y-[1px]"
              style={{ background: 'rgba(212,32,32,0.12)', border: '1px solid rgba(212,32,32,0.35)', color: '#ff6060' }}>
              <Youtube size={14} /> @biwcghana
            </a>
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto">

          <StatsBar total={pastSermons.length} series={seriesCount} />

          {/* ── ① Live Banner (shows when isLive: true) ── */}
          {liveSermon && (
            <div className="mb-10 md:mb-14">
              <div className="flex items-center gap-3 mb-5 pb-3 border-b border-white/10">
                <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider"
                  style={{ color: '#ff4a4a' }}>
                  <Radio size={12} className="animate-pulse" /> Live Right Now
                </span>
              </div>
              <LiveBanner sermon={liveSermon} onPlay={() => setActiveSermon(liveSermon)} />
            </div>
          )}

          {/* ── ② Search + Filters ── */}
          <div className="mb-8 md:mb-12 space-y-3 sm:space-y-4">

            {/* Search */}
            <div className="relative">
              <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: 'rgba(255,255,255,0.28)' }} />
              <input
                type="text"
                placeholder="Search sermons, speakers, scripture…"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-3 text-[13px] text-white outline-none rounded-xl placeholder-white/25"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)' }}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors">
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Category + Series filters — horizontally scrollable on mobile */}
            <div className="flex flex-col gap-2">
              {/* Categories */}
              <div className="flex items-center gap-2">
                <Filter size={11} className="text-white/25 shrink-0" />
                <div className="flex gap-2 overflow-x-auto pb-0.5 scrollbar-none flex-1">
                  {allCategories.map(cat => {
                    const s = cat === 'All' ? CAT['Sunday Service'] : catStyle(cat);
                    const active = activeCategory === cat;
                    return (
                      <button key={cat} onClick={() => setActiveCategory(cat)}
                        className="px-3 py-1.5 rounded-full text-[10.5px] font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200"
                        style={{
                          background: active ? s.color : s.bg,
                          border:     `1px solid ${s.border}`,
                          color:       active ? '#000' : s.color,
                          boxShadow:   active ? `0 3px 14px ${s.color}40` : 'none',
                        }}>
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Series (only show when multiple) */}
              {allSeries.length > 2 && (
                <div className="flex items-center gap-2">
                  <BookOpen size={11} className="text-white/25 shrink-0" />
                  <div className="flex gap-2 overflow-x-auto pb-0.5 scrollbar-none flex-1">
                    {allSeries.map(series => {
                      const active = activeSeries === series;
                      return (
                        <button key={series} onClick={() => setActiveSeries(series)}
                          className="px-3 py-1.5 rounded-full text-[10.5px] font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200"
                          style={{
                            background: active ? 'var(--gold-bright)' : 'rgba(245,200,66,0.1)',
                            border:     '1px solid rgba(245,200,66,0.28)',
                            color:       active ? '#000' : 'var(--gold-bright)',
                            boxShadow:   active ? '0 3px 14px rgba(245,200,66,0.35)' : 'none',
                          }}>
                          {series}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Clear all */}
              {hasFilter && (
                <button onClick={clearAll}
                  className="self-start flex items-center gap-1 text-[10.5px] font-bold uppercase tracking-wider text-white/30 hover:text-white/70 transition-colors duration-200">
                  <X size={10} /> Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* ── ③ Sermon Content ── */}
          {filtered.length === 0 ? (
            <div className="rounded-2xl p-12 sm:p-16 text-center"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <Volume2 size={32} className="mx-auto mb-4 opacity-20 text-white" />
              <h3 className="text-white font-bold text-xl mb-2 tracking-wide">No Sermons Found</h3>
              <p className="text-white/35 text-sm mb-6 max-w-xs mx-auto">
                Try a different search or filter, or browse all sermons.
              </p>
              <button onClick={clearAll}
                className="px-6 py-2.5 rounded-full text-[12px] font-bold uppercase tracking-wider"
                style={{ background: 'rgba(245,200,66,0.12)', border: '1px solid rgba(245,200,66,0.3)', color: 'var(--gold-bright)' }}>
                Show All Sermons
              </button>
            </div>
          ) : (
            <div className="space-y-10 md:space-y-14">

              {/* Featured sermon */}
              {featured && (
                <div>
                  <div className="flex items-baseline gap-3 mb-5 pb-3 border-b border-white/10">
                    <h2 className="text-lg sm:text-xl font-bold text-white uppercase tracking-wide">
                      Latest <em>Sermon</em>
                    </h2>
                    <span className="text-white/25 text-sm hidden sm:block" style={{ fontStyle: 'italic' }}>
                      Click to watch
                    </span>
                  </div>
                  <FeaturedSermonCard sermon={featured} onPlay={setActiveSermon} />
                </div>
              )}

              {/* Grid: 1-col → 2-col → 3-col */}
              {remaining.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-5 pb-3 border-b border-white/10">
                    <h2 className="text-lg sm:text-xl font-bold text-white uppercase tracking-wide">
                      All <em>Sermons</em>
                    </h2>
                    <span className="text-white/25 text-[12px]" style={{ fontStyle: 'italic' }}>
                      {remaining.length} more
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                    {remaining.map(s => (
                      <SermonCard key={s.id} sermon={s} onPlay={setActiveSermon} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── ④ Channel CTA ── */}
          <div className="relative mt-16 md:mt-20 rounded-2xl md:rounded-3xl overflow-hidden p-8 sm:p-10 md:p-14"
            style={{ background: 'linear-gradient(135deg, rgba(122,10,10,0.45), rgba(6,15,46,0.88))', border: '1px solid rgba(212,32,32,0.3)' }}>
            <GeoDots />
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.04), transparent 55%)' }} />
            <div className="absolute -right-16 -bottom-16 w-56 md:w-72 h-56 md:h-72 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(212,32,32,0.3), transparent)', filter: 'blur(55px)' }} />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-7 md:gap-8">
              <div className="max-w-xl">
                <span className="inline-block text-[10px] font-bold uppercase tracking-[0.28em] mb-4 px-3 py-1 rounded-full"
                  style={{ background: 'rgba(212,32,32,0.15)', border: '1px solid rgba(212,32,32,0.38)', color: '#ff6060' }}>
                  Never Miss a Message
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-wide">
                  Subscribe on <em>YouTube</em>
                </h2>
                <p className="text-white/50 text-[13.5px] leading-relaxed">
                  Get notified every time we upload a new sermon, live service, or special message.
                  Join thousands who watch BIWC online from across the world.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-3 shrink-0">
                <a href={CHANNEL_URL} target="_blank" rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-bold uppercase tracking-widest text-[12.5px] text-white transition-all duration-200 hover:-translate-y-[2px]"
                  style={{ background: 'linear-gradient(135deg, #d42020, #ff3030)', boxShadow: '0 4px 20px rgba(212,32,32,0.5)' }}>
                  <Youtube size={16} /> Subscribe Now
                </a>
                <a href={`${CHANNEL_URL}/live`} target="_blank" rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold uppercase tracking-widest text-[12.5px] text-white/60 hover:text-white transition-all duration-200"
                  style={{ border: '1px solid rgba(255,255,255,0.18)', background: 'rgba(255,255,255,0.06)' }}>
                  <Tv2 size={15} /> Watch Live
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Player modal (outside main div) ── */}
      {activeSermon && (
        <YouTubePlayer sermon={activeSermon} onClose={() => setActiveSermon(null)} />
      )}
    </>
  );
}
