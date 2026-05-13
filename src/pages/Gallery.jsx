import React, { useState, useEffect } from 'react';
import {
  Play, X, ChevronLeft, ChevronRight,
  Camera, Video, Calendar, ZoomIn, Image,
} from 'lucide-react';

/**
 * BIWC Gallery Page
 *
 * Structure:
 *  ① Latest Service / Program  — full-width hero feature (most recent album)
 *  ② Archive Grid             — all other albums as poster cards
 *  ③ Lightbox                 — image zoom with prev/next nav
 *  ④ Video modal              — inline YouTube embed
 *
 * CMS MIGRATION NOTE:
 *  Replace GALLERY_DATA below with a fetch from your headless CMS.
 *  Each album has: id, title, date, tag, type ('service'|'event'|'program'),
 *  coverImage, items[]: { id, type: 'photo'|'video', src, thumb, youtubeId?, caption? }
 *
 * IMAGE IMPORTS:
 *  Swap the placeholder gradient divs for <img> tags once you add images.
 *  Example: import mensRetreat from '../assets/img/mens-retreat.jpeg';
 */

// ─── Placeholder colour map for gradient bg ───────────────────────────────────
const ALBUM_COLORS = [
  'linear-gradient(135deg,#0d2a7a,#2555c0)',
  'linear-gradient(135deg,#7a0a0a,#d42020)',
  'linear-gradient(135deg,#7a4a00,#c8900a)',
  'linear-gradient(135deg,#0a4a1a,#1a8040)',
  'linear-gradient(135deg,#2a0a7a,#5535b0)',
  'linear-gradient(135deg,#0a4a4a,#0a8080)',
  'linear-gradient(135deg,#4a0a0a,#801818)',
  'linear-gradient(135deg,#060f3a,#143070)',
];

// ─── Gallery data (replace with CMS fetch) ────────────────────────────────────
const GALLERY_DATA = [
  {
    id: 1,
    title: "Sunday Service",
    date: "May 11, 2025",
    tag: "Latest",
    type: "service",
    // coverImage: import path — leave null until images are added
    coverImage: null,
    bgColor: ALBUM_COLORS[0],
    items: [
      { id: 1, type: 'photo',  src: null, thumb: null, caption: "Worship moment"       },
      { id: 2, type: 'photo',  src: null, thumb: null, caption: "Congregation in prayer"},
      { id: 3, type: 'photo',  src: null, thumb: null, caption: "Pastor preaching"      },
      { id: 4, type: 'video',  src: null, thumb: null, youtubeId: 'dQw4w9WgXcQ', caption: "Sunday Service Recording" },
      { id: 5, type: 'photo',  src: null, thumb: null, caption: "Altar call"            },
      { id: 6, type: 'photo',  src: null, thumb: null, caption: "Fellowship time"       },
    ],
  },
  {
    id: 2,
    title: "Men's Retreat",
    date: "Feb 20, 2025",
    tag: "Event",
    type: "event",
    coverImage: null,
    bgColor: ALBUM_COLORS[1],
    items: [
      { id: 1, type: 'photo', src: null, thumb: null, caption: "Opening session"   },
      { id: 2, type: 'photo', src: null, thumb: null, caption: "Group fellowship"  },
      { id: 3, type: 'video', src: null, thumb: null, youtubeId: 'dQw4w9WgXcQ', caption: "Retreat Highlights" },
      { id: 4, type: 'photo', src: null, thumb: null, caption: "Closing prayer"    },
    ],
  },
  {
    id: 3,
    title: "Auxiliary Celebration Day",
    date: "Feb 24, 2025",
    tag: "Event",
    type: "event",
    coverImage: null,
    bgColor: ALBUM_COLORS[2],
    items: [
      { id: 1, type: 'photo', src: null, thumb: null, caption: "Opening ceremony" },
      { id: 2, type: 'photo', src: null, thumb: null, caption: "Performances"     },
      { id: 3, type: 'photo', src: null, thumb: null, caption: "Food & fellowship" },
    ],
  },
  {
    id: 4,
    title: "Sunday Service",
    date: "Mar 2, 2025",
    tag: "Service",
    type: "service",
    coverImage: null,
    bgColor: ALBUM_COLORS[3],
    items: [
      { id: 1, type: 'photo', src: null, thumb: null, caption: "Worship"      },
      { id: 2, type: 'photo', src: null, thumb: null, caption: "Sermon"       },
      { id: 3, type: 'video', src: null, thumb: null, youtubeId: 'dQw4w9WgXcQ', caption: "Full Service" },
    ],
  },
  {
    id: 5,
    title: "Youth Movie Night",
    date: "Apr 1, 2025",
    tag: "Youth",
    type: "event",
    coverImage: null,
    bgColor: ALBUM_COLORS[4],
    items: [
      { id: 1, type: 'photo', src: null, thumb: null, caption: "Movie setup"   },
      { id: 2, type: 'photo', src: null, thumb: null, caption: "Youth enjoying" },
    ],
  },
  {
    id: 6,
    title: "Baptism Class",
    date: "Mar 24, 2025",
    tag: "Program",
    type: "program",
    coverImage: null,
    bgColor: ALBUM_COLORS[5],
    items: [
      { id: 1, type: 'photo', src: null, thumb: null, caption: "Class session"  },
      { id: 2, type: 'photo', src: null, thumb: null, caption: "Baptism moment" },
    ],
  },
  {
    id: 7,
    title: "Sunday Service",
    date: "Mar 9, 2025",
    tag: "Service",
    type: "service",
    coverImage: null,
    bgColor: ALBUM_COLORS[6],
    items: [
      { id: 1, type: 'photo', src: null, thumb: null, caption: "Praise & Worship" },
      { id: 2, type: 'photo', src: null, thumb: null, caption: "Word of God"      },
    ],
  },
  {
    id: 8,
    title: "Community Outreach",
    date: "Feb 24, 2025",
    tag: "Outreach",
    type: "event",
    coverImage: null,
    bgColor: ALBUM_COLORS[7],
    items: [
      { id: 1, type: 'photo', src: null, thumb: null, caption: "Team prayer" },
      { id: 2, type: 'photo', src: null, thumb: null, caption: "In the field" },
    ],
  },
];

const TAG_COLORS = {
  Latest:   { color: '#f5c842', bg: 'rgba(245,200,66,0.18)',  border: 'rgba(245,200,66,0.4)'  },
  Service:  { color: '#4a80f0', bg: 'rgba(74,128,240,0.14)',  border: 'rgba(74,128,240,0.3)'  },
  Event:    { color: '#ff4a4a', bg: 'rgba(255,74,74,0.14)',   border: 'rgba(255,74,74,0.3)'   },
  Youth:    { color: '#a070f0', bg: 'rgba(160,112,240,0.14)', border: 'rgba(160,112,240,0.3)' },
  Program:  { color: '#20c0c0', bg: 'rgba(32,192,192,0.14)',  border: 'rgba(32,192,192,0.3)'  },
  Outreach: { color: '#40c070', bg: 'rgba(64,192,112,0.14)',  border: 'rgba(64,192,112,0.3)'  },
};
const tagStyle = (tag) => TAG_COLORS[tag] || TAG_COLORS.Service;

// ─── Geo pattern ──────────────────────────────────────────────────────────────
const GeoDots = () => (
  <div className="absolute inset-0 opacity-[0.07] pointer-events-none"
    style={{ backgroundImage: 'radial-gradient(circle,#fff 1px,transparent 1px)', backgroundSize: '22px 22px' }} />
);

// ─── Image placeholder ────────────────────────────────────────────────────────
const ImgPlaceholder = ({ gradient, className = '', children }) => (
  <div className={`absolute inset-0 flex items-center justify-center ${className}`}
    style={{ background: gradient }}>
    <GeoDots />
    {children}
  </div>
);

// ─── Video modal (YouTube embed) ──────────────────────────────────────────────
const VideoModal = ({ youtubeId, title, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const fn = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', fn);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', fn); };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[2100] flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}>
      <div className="absolute inset-0"
        style={{ background: 'rgba(2,5,20,0.94)', backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)' }} />
      <div className="relative w-full max-w-4xl" onClick={e => e.stopPropagation()}>
        {/* Close */}
        <button onClick={onClose}
          className="absolute -top-10 right-0 w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-colors z-10"
          style={{ border: '1px solid rgba(255,255,255,0.2)' }}>
          <X size={15} />
        </button>
        {/* 16:9 embed */}
        <div className="relative w-full rounded-2xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.8)]"
          style={{ paddingBottom: '56.25%' }}>
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        {title && (
          <p className="text-white/50 text-[12px] font-medium text-center mt-3 tracking-wide">{title}</p>
        )}
      </div>
    </div>
  );
};

// ─── Image lightbox ───────────────────────────────────────────────────────────
const Lightbox = ({ items, startIndex, onClose }) => {
  const [index, setIndex] = useState(startIndex);
  const photoItems = items.filter(i => i.type === 'photo');
  const current = photoItems[index];

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const fn = (e) => {
      if (e.key === 'Escape')     onClose();
      if (e.key === 'ArrowRight') setIndex(i => Math.min(i + 1, photoItems.length - 1));
      if (e.key === 'ArrowLeft')  setIndex(i => Math.max(i - 1, 0));
    };
    window.addEventListener('keydown', fn);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', fn); };
  }, [onClose, photoItems.length]);

  if (!current) return null;

  return (
    <div className="fixed inset-0 z-[2100] flex items-center justify-center"
      onClick={onClose}>
      <div className="absolute inset-0"
        style={{ background: 'rgba(2,5,20,0.96)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }} />

      {/* Close */}
      <button onClick={onClose}
        className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-all"
        style={{ border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.07)' }}>
        <X size={16} />
      </button>

      {/* Counter */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 text-[11px] font-bold text-white/40 tracking-widest uppercase">
        {index + 1} / {photoItems.length}
      </div>

      {/* Prev */}
      {index > 0 && (
        <button onClick={e => { e.stopPropagation(); setIndex(i => i - 1); }}
          className="absolute left-3 sm:left-6 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
          style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
          <ChevronLeft size={20} />
        </button>
      )}
      {/* Next */}
      {index < photoItems.length - 1 && (
        <button onClick={e => { e.stopPropagation(); setIndex(i => i + 1); }}
          className="absolute right-3 sm:right-6 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
          style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
          <ChevronRight size={20} />
        </button>
      )}

      {/* Image area */}
      <div className="relative z-10 max-w-5xl w-full mx-4 sm:mx-16 flex flex-col items-center gap-3"
        onClick={e => e.stopPropagation()}>
        <div className="w-full rounded-2xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.8)]"
          style={{ maxHeight: '75vh' }}>
          {current.src
            ? <img src={current.src} alt={current.caption || ''} className="w-full h-full object-contain" style={{ maxHeight: '75vh' }} />
            : (
              <div className="w-full flex items-center justify-center rounded-2xl"
                style={{ height: '60vw', maxHeight: '65vh', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <Image size={48} className="text-white/15" />
              </div>
            )
          }
        </div>
        {current.caption && (
          <p className="text-white/50 text-[12.5px] text-center tracking-wide">{current.caption}</p>
        )}

        {/* Thumbnail strip */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none max-w-full px-2">
          {photoItems.map((item, i) => (
            <button key={item.id} onClick={() => setIndex(i)}
              className={`shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                i === index ? 'border-gold-bright scale-110' : 'border-transparent opacity-50 hover:opacity-80'
              }`}>
              {item.thumb
                ? <img src={item.thumb} alt="" className="w-full h-full object-cover" />
                : <div className="w-full h-full bg-white/10 flex items-center justify-center"><Image size={14} className="text-white/30" /></div>
              }
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── Album grid item card ─────────────────────────────────────────────────────
const AlbumCard = ({ album, onOpen }) => {
  const ts = tagStyle(album.tag);
  const photoCount = album.items.filter(i => i.type === 'photo').length;
  const videoCount = album.items.filter(i => i.type === 'video').length;

  return (
    <button onClick={() => onOpen(album)}
      className="text-left glass rounded-2xl overflow-hidden group transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_56px_rgba(0,0,0,0.45)] w-full"
      style={{ border: '1px solid rgba(255,255,255,0.09)' }}>

      {/* Cover */}
      <div className="relative h-44 sm:h-48 overflow-hidden">
        {album.coverImage
          ? <img src={album.coverImage} alt={album.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.07]" />
          : <ImgPlaceholder gradient={album.bgColor}>
              <Camera size={32} className="text-white/20" />
            </ImgPlaceholder>
        }
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(6,15,46,0.88) 0%, rgba(6,15,46,0.05) 55%)' }} />

        {/* Tag pill */}
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest"
          style={{ background: ts.bg, border: `1px solid ${ts.border}`, color: ts.color, backdropFilter: 'blur(6px)' }}>
          {album.tag}
        </div>

        {/* Media count badges */}
        <div className="absolute top-3 right-3 flex gap-1.5">
          {photoCount > 0 && (
            <div className="flex items-center gap-1 px-2 py-1 rounded-full text-[9px] font-bold text-white/70"
              style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)' }}>
              <Camera size={9} /> {photoCount}
            </div>
          )}
          {videoCount > 0 && (
            <div className="flex items-center gap-1 px-2 py-1 rounded-full text-[9px] font-bold text-white/70"
              style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)' }}>
              <Video size={9} /> {videoCount}
            </div>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="text-white font-bold text-[13.5px] tracking-wide mb-1 group-hover:text-gold-bright transition-colors duration-200"
          style={{ fontFamily: 'var(--font-display)' }}>
          {album.title}
        </h3>
        <div className="flex items-center gap-1.5 text-[11px] text-white/35">
          <Calendar size={10} style={{ color: 'var(--gold-bright)' }} />
          {album.date}
        </div>
      </div>
    </button>
  );
};

// ─── Bento tile — shared by photos and videos ─────────────────────────────────
const BentoTile = ({ item, albumBgColor, photoIndex, onOpenPhoto, onPlayVideo, allItems, size }) => {
  // size: 'hero' | 'wide' | 'tall' | 'square' | 'sm'
  const sizeClasses = {
    hero:   'col-span-2 row-span-2',
    wide:   'col-span-2 row-span-1',
    tall:   'col-span-1 row-span-2',
    square: 'col-span-1 row-span-1',
    sm:     'col-span-1 row-span-1',
  };

  const isVideo = item.type === 'video';
  const thumb   = item.thumb || (item.youtubeId ? `https://img.youtube.com/vi/${item.youtubeId}/mqdefault.jpg` : null);

  const handleClick = () => {
    if (isVideo) onPlayVideo(item.youtubeId, item.caption);
    else         onOpenPhoto(allItems, photoIndex);
  };

  return (
    <button
      onClick={handleClick}
      className={`relative overflow-hidden group transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_48px_rgba(0,0,0,0.55)] ${sizeClasses[size] || sizeClasses.square}`}
      style={{ borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', minHeight: size === 'hero' ? '280px' : '140px' }}
    >
      {/* Background — image or gradient */}
      {(item.src || thumb)
        ? <img
            src={item.src || thumb}
            alt={item.caption || ''}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
            loading="lazy"
          />
        : <div className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-80"
            style={{ background: albumBgColor, opacity: 0.65 }}>
            <div className="absolute inset-0 opacity-[0.07]"
              style={{ backgroundImage: 'radial-gradient(circle,#fff 1px,transparent 1px)', backgroundSize: '18px 18px' }} />
          </div>
      }

      {/* Gradient overlay */}
      <div className="absolute inset-0 transition-opacity duration-300"
        style={{ background: 'linear-gradient(to top, rgba(6,15,46,0.85) 0%, rgba(6,15,46,0.05) 55%)', opacity: 0.8 }} />

      {/* Hover shimmer */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 60%)' }} />

      {/* Video play button */}
      {isVideo && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
              size === 'hero' ? 'w-16 h-16' : 'w-11 h-11'
            }`}
            style={{
              background: 'rgba(212,32,32,0.9)',
              boxShadow: '0 4px 24px rgba(212,32,32,0.55)',
            }}
          >
            <Play size={size === 'hero' ? 24 : 16} fill="white" className="text-white ml-0.5" />
          </div>
        </div>
      )}

      {/* Photo zoom icon — appears on hover */}
      {!isVideo && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.2)' }}>
            <ZoomIn size={15} className="text-white" />
          </div>
        </div>
      )}

      {/* Type badge — top left */}
      <div className="absolute top-3 left-3">
        {isVideo
          ? <div className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider"
              style={{ background: 'rgba(212,32,32,0.25)', border: '1px solid rgba(212,32,32,0.5)', color: '#ff6060', backdropFilter: 'blur(6px)' }}>
              <Video size={8} /> Video
            </div>
          : null
        }
      </div>

      {/* Caption — bottom */}
      {item.caption && (
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-white/80 text-[10.5px] sm:text-[11px] font-medium leading-snug truncate">
            {item.caption}
          </p>
        </div>
      )}
    </button>
  );
};

// ─── Bento grid layout engine ─────────────────────────────────────────────────
// Assigns a size pattern to each item so the grid feels editorial and dynamic.
// Pattern repeats every 6 items: hero, square, square, wide, tall, square
const BENTO_SIZES = ['hero', 'square', 'square', 'wide', 'tall', 'square'];

const BentoGrid = ({ items, albumBgColor, onOpenPhoto, onPlayVideo, allItems }) => {
  let photoCounter = -1; // track photo index separately for lightbox

  return (
    <div
      className="grid gap-2 sm:gap-3"
      style={{
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridAutoRows: 'minmax(120px, auto)',
      }}
    >
      {items.map((item, globalIdx) => {
        const sizeKey = BENTO_SIZES[globalIdx % BENTO_SIZES.length];
        if (item.type === 'photo') photoCounter++;
        const pIdx = item.type === 'photo' ? photoCounter : 0;

        return (
          <BentoTile
            key={item.id}
            item={item}
            albumBgColor={albumBgColor}
            photoIndex={pIdx}
            onOpenPhoto={onOpenPhoto}
            onPlayVideo={onPlayVideo}
            allItems={allItems}
            size={sizeKey}
          />
        );
      })}
    </div>
  );
};

// ─── Album detail view ────────────────────────────────────────────────────────
const AlbumDetail = ({ album, onClose, onOpenPhoto, onPlayVideo }) => {
  const photos    = album.items.filter(i => i.type === 'photo');
  const videos    = album.items.filter(i => i.type === 'video');
  const allMedia  = album.items; // mixed order for bento
  const ts        = tagStyle(album.tag);

  return (
    <div
      className="fixed inset-0 z-[2000] overflow-y-auto"
      style={{ background: 'rgba(4,9,28,0.99)' }}
    >
      {/* ── Page content — padded below navbar (pt-28 ~ navbar height + gap) ── */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-28 pb-16">

        {/* ── Album header ── */}
        <div className="mb-8 md:mb-12">

          {/* Back button */}
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 text-white/40 hover:text-white text-[11.5px] font-bold uppercase tracking-widest mb-8 transition-all duration-200 group"
          >
            <ChevronLeft size={15}
              className="group-hover:-translate-x-1 transition-transform duration-200" />
            Back to Gallery
          </button>

          {/* Title row */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              {/* Eyebrow */}
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <div
                  className="px-3 py-1 rounded-full text-[9.5px] font-bold uppercase tracking-widest"
                  style={{ background: ts.bg, border: `1px solid ${ts.border}`, color: ts.color }}
                >
                  {album.tag}
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-white/30">
                  <Calendar size={10} style={{ color: 'var(--gold-bright)' }} />
                  <span>{album.date}</span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-wide leading-tight">
                {album.title}
              </h1>
              <div className="w-12 h-[2px] mt-3"
                style={{ background: 'linear-gradient(90deg, var(--gold-bright), transparent)' }} />
            </div>

            {/* Media count pills */}
            <div className="flex items-center gap-2 flex-wrap">
              {photos.length > 0 && (
                <div
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.6)' }}
                >
                  <Camera size={12} style={{ color: 'var(--gold-bright)' }} />
                  {photos.length} Photo{photos.length !== 1 ? 's' : ''}
                </div>
              )}
              {videos.length > 0 && (
                <div
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold"
                  style={{ background: 'rgba(212,32,32,0.12)', border: '1px solid rgba(212,32,32,0.3)', color: '#ff6060' }}
                >
                  <Video size={12} />
                  {videos.length} Video{videos.length !== 1 ? 's' : ''}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Bento grid — photos + videos mixed ── */}
        <BentoGrid
          items={allMedia}
          albumBgColor={album.bgColor}
          onOpenPhoto={onOpenPhoto}
          onPlayVideo={onPlayVideo}
          allItems={allMedia}
        />

        {/* ── If only 1–2 items, show simple centered layout ── */}
        {allMedia.length <= 2 && (
          <p className="text-center text-white/20 text-xs mt-8 tracking-widest uppercase">
            More photos & videos coming soon
          </p>
        )}
      </div>
    </div>
  );
};

// ─── Featured album (latest service) ─────────────────────────────────────────
const FeaturedAlbum = ({ album, onOpen }) => {
  const ts = tagStyle(album.tag);
  const photoCount = album.items.filter(i => i.type === 'photo').length;
  const videoCount = album.items.filter(i => i.type === 'video').length;

  return (
    <button onClick={() => onOpen(album)}
      className="w-full text-left relative rounded-2xl sm:rounded-3xl overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_32px_80px_rgba(0,0,0,0.55)]"
      style={{ minHeight: '340px', border: '1px solid rgba(255,255,255,0.13)' }}>

      {/* Background */}
      {album.coverImage
        ? <img src={album.coverImage} alt={album.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
        : <ImgPlaceholder gradient={album.bgColor} />
      }

      {/* Overlays */}
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(6,15,46,0.97) 0%, rgba(6,15,46,0.3) 55%, transparent 100%)' }} />
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(100deg, rgba(6,15,46,0.7) 0%, transparent 60%)' }} />

      {/* Top badges */}
      <div className="absolute top-5 sm:top-6 left-5 sm:left-8 flex flex-wrap gap-2">
        <div className="px-3 py-1 rounded-full text-[9.5px] font-bold uppercase tracking-widest"
          style={{ background: ts.bg, border: `1px solid ${ts.border}`, color: ts.color, backdropFilter: 'blur(8px)' }}>
          {album.tag}
        </div>
        <div className="px-3 py-1 rounded-full text-[9.5px] font-bold uppercase tracking-widest"
          style={{ background: 'rgba(245,200,66,0.18)', border: '1px solid rgba(245,200,66,0.38)', color: 'var(--gold-bright)', backdropFilter: 'blur(8px)' }}>
          ✦ Most Recent
        </div>
      </div>

      {/* Media count — top right */}
      <div className="absolute top-5 sm:top-6 right-5 sm:right-8 flex gap-2">
        {photoCount > 0 && (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold text-white/70"
            style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <Camera size={11} /> {photoCount} Photos
          </div>
        )}
        {videoCount > 0 && (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold text-white/70"
            style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <Video size={11} /> {videoCount} Video{videoCount !== 1 ? 's' : ''}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-10">
        <div className="flex items-center gap-1.5 mb-2 text-[11px] text-white/40">
          <Calendar size={11} style={{ color: 'var(--gold-bright)' }} />
          {album.date}
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-wide leading-tight mb-4">
          {album.title}
        </h2>
        <div
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[12px] font-bold uppercase tracking-wider transition-all duration-300 group-hover:gap-3"
          style={{ background: 'rgba(245,200,66,0.15)', border: '1px solid rgba(245,200,66,0.38)', color: 'var(--gold-bright)' }}>
          View Album <ChevronRight size={14} />
        </div>
      </div>
    </button>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Gallery() {
  const [openAlbum,    setOpenAlbum]    = useState(null);
  const [lightboxData, setLightboxData] = useState(null); // { items, index }
  const [videoData,    setVideoData]    = useState(null); // { youtubeId, title }
  const [filter,       setFilter]       = useState('All');

  const featured  = GALLERY_DATA[0];
  const archive   = GALLERY_DATA.slice(1);

  const allTags   = ['All', ...Array.from(new Set(archive.map(a => a.tag)))];
  const filtered  = filter === 'All' ? archive : archive.filter(a => a.tag === filter);

  return (
    <>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10 pb-16 md:pb-24">

        {/* ── Page Header ── */}
        <div className="max-w-[1200px] mx-auto mb-10 md:mb-14">
          <span className="inline-block text-[10px] font-bold uppercase tracking-[0.3em] mb-4 px-3 py-1 rounded-full"
            style={{ background: 'rgba(245,200,66,0.1)', border: '1px solid rgba(245,200,66,0.25)', color: 'var(--gold-bright)' }}>
            Media
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 tracking-wide">
            Photo & Video <em>Gallery</em>
          </h1>
          <div className="w-14 h-[2px] mb-5"
            style={{ background: 'linear-gradient(90deg, var(--gold-bright), transparent)' }} />
          <p className="text-white/50 text-[14px] md:text-[15px] leading-relaxed max-w-2xl">
            Moments captured from our services, events, and programs. Click any album to view photos and watch videos.
          </p>
        </div>

        <div className="max-w-[1200px] mx-auto space-y-10 md:space-y-14">

          {/* ── ① Latest Service / Program (Featured) ── */}
          <div>
            <div className="flex items-baseline gap-3 mb-5 pb-3 border-b border-white/10">
              <h2 className="text-lg sm:text-xl font-bold text-white uppercase tracking-wide">
                Latest <em>Service</em>
              </h2>
              <span className="text-white/25 text-sm" style={{ fontStyle: 'italic' }}>Most recent album</span>
            </div>
            <FeaturedAlbum album={featured} onOpen={setOpenAlbum} />
          </div>

          {/* ── ② Archive — filter + grid ── */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-3 border-b border-white/10">
              <h2 className="text-lg sm:text-xl font-bold text-white uppercase tracking-wide">
                All <em>Albums</em>
              </h2>
              {/* Filter pills — scrollable on mobile */}
              <div className="flex items-center gap-2 overflow-x-auto pb-0.5 scrollbar-none">
                {allTags.map(tag => {
                  const ts = tag === 'All'
                    ? { color: '#f5c842', bg: 'rgba(245,200,66,0.14)', border: 'rgba(245,200,66,0.3)' }
                    : tagStyle(tag);
                  const active = filter === tag;
                  return (
                    <button key={tag} onClick={() => setFilter(tag)}
                      className="px-3 py-1.5 rounded-full text-[10.5px] font-bold uppercase tracking-wider transition-all duration-200 whitespace-nowrap"
                      style={{
                        background: active ? ts.color : ts.bg,
                        border:     `1px solid ${ts.border}`,
                        color:       active ? '#000' : ts.color,
                        boxShadow:   active ? `0 4px 14px ${ts.color}40` : 'none',
                      }}>
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Album grid: 1-col → 2-col → 3-col → 4-col */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
              {filtered.map(album => (
                <AlbumCard key={album.id} album={album} onOpen={setOpenAlbum} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Album Detail overlay ── */}
      {openAlbum && (
        <AlbumDetail
          album={openAlbum}
          onClose={() => setOpenAlbum(null)}
          onOpenPhoto={(items, index) => setLightboxData({ items, index })}
          onPlayVideo={(youtubeId, title) => setVideoData({ youtubeId, title })}
        />
      )}

      {/* ── Lightbox ── */}
      {lightboxData && (
        <Lightbox
          items={lightboxData.items}
          startIndex={lightboxData.index}
          onClose={() => setLightboxData(null)}
        />
      )}

      {/* ── Video Modal ── */}
      {videoData && (
        <VideoModal
          youtubeId={videoData.youtubeId}
          title={videoData.title}
          onClose={() => setVideoData(null)}
        />
      )}
    </>
  );
}
