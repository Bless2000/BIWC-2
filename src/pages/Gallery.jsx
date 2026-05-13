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

// ─── Single pure media tile — image/video fills 100%, zero text ──────────────
const Tile = ({ item, albumBgColor, photoIndex, onOpenPhoto, onPlayVideo, allItems, large = false }) => {
  const isVideo = item.type === 'video';
  const thumb   = item.thumb || (item.youtubeId
    ? `https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`
    : null);

  const handleClick = () => {
    if (isVideo) onPlayVideo(item.youtubeId, item.caption);
    else         onOpenPhoto(allItems, photoIndex);
  };

  return (
    <button
      onClick={handleClick}
      className="relative w-full h-full overflow-hidden group"
      style={{
        borderRadius: '14px',
        border: '1px solid rgba(255,255,255,0.08)',
        display: 'block',
      }}
    >
      {/* ── Full-bleed media ── */}
      {(item.src || thumb) ? (
        <img
          src={item.src || thumb}
          alt=""
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
          loading="lazy"
        />
      ) : (
        /* Placeholder when no image yet — gradient only, no text */
        <div
          className="absolute inset-0"
          style={{ background: albumBgColor }}
        >
          {/* Subtle dot pattern — decorative only */}
          <div
            className="absolute inset-0 opacity-[0.09]"
            style={{
              backgroundImage: 'radial-gradient(circle,#fff 1px,transparent 1px)',
              backgroundSize: '16px 16px',
            }}
          />
        </div>
      )}

      {/* ── Very subtle bottom vignette — keeps play icon readable ── */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 55%)' }}
      />

      {/* ── Hover shimmer ── */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.09) 0%, transparent 55%)' }}
      />

      {/* ── Video: centred play button ── */}
      {isVideo && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${large ? 'w-20 h-20' : 'w-12 h-12'}`}
            style={{
              background: 'rgba(212,32,32,0.88)',
              backdropFilter: 'blur(4px)',
              boxShadow: `0 0 ${large ? 48 : 28}px rgba(212,32,32,0.65)`,
            }}
          >
            <Play size={large ? 28 : 17} fill="white" className="ml-1 text-white" />
          </div>
        </div>
      )}

      {/* ── Photo: zoom icon appears on hover, centre ── */}
      {!isVideo && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-250">
          <div
            className={`rounded-full flex items-center justify-center ${large ? 'w-14 h-14' : 'w-10 h-10'}`}
            style={{
              background: 'rgba(0,0,0,0.45)',
              backdropFilter: 'blur(8px)',
              border: '1.5px solid rgba(255,255,255,0.3)',
            }}
          >
            <ZoomIn size={large ? 22 : 16} className="text-white" />
          </div>
        </div>
      )}

      {/* ── Video: tiny red dot badge top-right only ── */}
      {isVideo && (
        <div
          className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full"
          style={{ background: '#ff3030', boxShadow: '0 0 6px rgba(255,48,48,0.9)' }}
        />
      )}
    </button>
  );
};

// ─── Bento layout engine ──────────────────────────────────────────────────────
// Renders items in hand-crafted row patterns.
// Each row pattern describes how many items it consumes and what CSS it uses.
// All tiles are pure image/video — no text, no labels inside the grid itself.

const BentoGrid = ({ items, albumBgColor, onOpenPhoto, onPlayVideo, allItems }) => {
  // Assign photoIndex only to photos (for lightbox navigation)
  const photoIndices = {};
  let pc = 0;
  items.forEach((item, i) => {
    if (item.type === 'photo') { photoIndices[i] = pc++; }
  });

  // ── Row renderers ──────────────────────────────────────────────────────────

  // Pattern A: 1 tall hero (left) + 2 stacked squares (right)  — consumes 3
  const RowA = ({ slice, startIdx }) => (
    <div className="grid gap-2 sm:gap-3" style={{ gridTemplateColumns: '2fr 1fr', gridTemplateRows: '200px 200px' }}>
      {/* Hero left — spans both rows */}
      <div style={{ gridRow: '1 / 3' }}>
        <Tile item={slice[0]} albumBgColor={albumBgColor}
          photoIndex={photoIndices[startIdx]} onOpenPhoto={onOpenPhoto}
          onPlayVideo={onPlayVideo} allItems={allItems} large />
      </div>
      {slice[1] && (
        <Tile item={slice[1]} albumBgColor={albumBgColor}
          photoIndex={photoIndices[startIdx + 1]} onOpenPhoto={onOpenPhoto}
          onPlayVideo={onPlayVideo} allItems={allItems} />
      )}
      {slice[2] && (
        <Tile item={slice[2]} albumBgColor={albumBgColor}
          photoIndex={photoIndices[startIdx + 2]} onOpenPhoto={onOpenPhoto}
          onPlayVideo={onPlayVideo} allItems={allItems} />
      )}
    </div>
  );

  // Pattern B: 3 equal squares side by side — consumes 3
  const RowB = ({ slice, startIdx }) => (
    <div className="grid gap-2 sm:gap-3" style={{ gridTemplateColumns: '1fr 1fr 1fr', height: '220px' }}>
      {slice.map((item, i) => item && (
        <Tile key={item.id} item={item} albumBgColor={albumBgColor}
          photoIndex={photoIndices[startIdx + i]} onOpenPhoto={onOpenPhoto}
          onPlayVideo={onPlayVideo} allItems={allItems} />
      ))}
    </div>
  );

  // Pattern C: 1 wide panoramic — consumes 1
  const RowC = ({ slice, startIdx }) => (
    <div style={{ height: '280px' }}>
      <Tile item={slice[0]} albumBgColor={albumBgColor}
        photoIndex={photoIndices[startIdx]} onOpenPhoto={onOpenPhoto}
        onPlayVideo={onPlayVideo} allItems={allItems} large />
    </div>
  );

  // Pattern D: 2 equal landscape side by side — consumes 2
  const RowD = ({ slice, startIdx }) => (
    <div className="grid gap-2 sm:gap-3" style={{ gridTemplateColumns: '1fr 1fr', height: '240px' }}>
      {slice.map((item, i) => item && (
        <Tile key={item.id} item={item} albumBgColor={albumBgColor}
          photoIndex={photoIndices[startIdx + i]} onOpenPhoto={onOpenPhoto}
          onPlayVideo={onPlayVideo} allItems={allItems} />
      ))}
    </div>
  );

  // Pattern E: 1 small (left) + 1 large hero (right) — consumes 2 (mirror of A)
  const RowE = ({ slice, startIdx }) => (
    <div className="grid gap-2 sm:gap-3" style={{ gridTemplateColumns: '1fr 2fr', gridTemplateRows: '200px 200px' }}>
      {slice[0] && (
        <Tile item={slice[0]} albumBgColor={albumBgColor}
          photoIndex={photoIndices[startIdx]} onOpenPhoto={onOpenPhoto}
          onPlayVideo={onPlayVideo} allItems={allItems} />
      )}
      {/* Hero right — spans both rows */}
      {slice[1] && (
        <div style={{ gridRow: '1 / 3' }}>
          <Tile item={slice[1]} albumBgColor={albumBgColor}
            photoIndex={photoIndices[startIdx + 1]} onOpenPhoto={onOpenPhoto}
            onPlayVideo={onPlayVideo} allItems={allItems} large />
        </div>
      )}
      {slice[2] && (
        <Tile item={slice[2]} albumBgColor={albumBgColor}
          photoIndex={photoIndices[startIdx + 2]} onOpenPhoto={onOpenPhoto}
          onPlayVideo={onPlayVideo} allItems={allItems} />
      )}
    </div>
  );

  // Pattern F: 4-quad equal grid — consumes 4
  const RowF = ({ slice, startIdx }) => (
    <div className="grid gap-2 sm:gap-3" style={{ gridTemplateColumns: '1fr 1fr', gridTemplateRows: '200px 200px' }}>
      {slice.map((item, i) => item && (
        <Tile key={item.id} item={item} albumBgColor={albumBgColor}
          photoIndex={photoIndices[startIdx + i]} onOpenPhoto={onOpenPhoto}
          onPlayVideo={onPlayVideo} allItems={allItems} />
      ))}
    </div>
  );

  // ── Assign rows ────────────────────────────────────────────────────────────
  // Cycle through patterns so each album feels unique
  const ROW_PATTERNS = [
    { pattern: 'A', consume: 3 },
    { pattern: 'B', consume: 3 },
    { pattern: 'C', consume: 1 },
    { pattern: 'E', consume: 3 },
    { pattern: 'D', consume: 2 },
    { pattern: 'F', consume: 4 },
    { pattern: 'B', consume: 3 },
    { pattern: 'A', consume: 3 },
  ];

  const rows = [];
  let cursor = 0;
  let patternIdx = 0;

  while (cursor < items.length) {
    const remaining = items.length - cursor;
    const { pattern, consume } = ROW_PATTERNS[patternIdx % ROW_PATTERNS.length];
    const take = Math.min(consume, remaining);
    const slice = items.slice(cursor, cursor + take);
    const startIdx = cursor;

    rows.push({ pattern, slice, startIdx });
    cursor += take;
    patternIdx++;
  }

  return (
    <div className="space-y-2 sm:space-y-3">
      {rows.map((row, rowIdx) => {
        const props = { slice: row.slice, startIdx: row.startIdx, key: rowIdx };
        switch (row.pattern) {
          case 'A': return <RowA {...props} />;
          case 'B': return <RowB {...props} />;
          case 'C': return <RowC {...props} />;
          case 'D': return <RowD {...props} />;
          case 'E': return <RowE {...props} />;
          case 'F': return <RowF {...props} />;
          default:  return <RowB {...props} />;
        }
      })}
    </div>
  );
};

// ─── Album detail view ────────────────────────────────────────────────────────
const AlbumDetail = ({ album, onClose, onOpenPhoto, onPlayVideo }) => {
  const photos   = album.items.filter(i => i.type === 'photo');
  const videos   = album.items.filter(i => i.type === 'video');
  const allMedia = album.items;
  const ts       = tagStyle(album.tag);

  return (
    <div
      className="fixed inset-0 z-[2000] overflow-y-auto"
      style={{ background: '#040918' }}
    >
      <div className="max-w-[1200px] mx-auto px-3 sm:px-6 pt-28 pb-16">

        {/* ── Minimal header — back button + meta pills only ── */}
        <div className="flex items-center justify-between mb-6 md:mb-10">

          {/* Back */}
          <button
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-white/35 hover:text-white text-[11px] font-bold uppercase tracking-widest transition-all duration-200 group"
          >
            <ChevronLeft size={14}
              className="group-hover:-translate-x-1 transition-transform duration-200" />
            Gallery
          </button>

          {/* Meta pills — right */}
          <div className="flex items-center gap-2">
            <div className="px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest"
              style={{ background: ts.bg, border: `1px solid ${ts.border}`, color: ts.color }}>
              {album.tag}
            </div>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-bold text-white/30"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <Calendar size={9} style={{ color: 'var(--gold-bright)' }} />
              {album.date}
            </div>
            {photos.length > 0 && (
              <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-bold text-white/30"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <Camera size={9} style={{ color: 'var(--gold-bright)' }} />
                {photos.length}
              </div>
            )}
            {videos.length > 0 && (
              <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-bold"
                style={{ background: 'rgba(212,32,32,0.12)', border: '1px solid rgba(212,32,32,0.28)', color: '#ff6060' }}>
                <Video size={9} />
                {videos.length}
              </div>
            )}
          </div>
        </div>

        {/* ── Album title — minimal, above the grid ── */}
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-wide mb-6 md:mb-8">
          {album.title}
        </h1>

        {/* ── Pure bento grid — all images and videos, zero text inside ── */}
        <BentoGrid
          items={allMedia}
          albumBgColor={album.bgColor}
          onOpenPhoto={onOpenPhoto}
          onPlayVideo={onPlayVideo}
          allItems={allMedia}
        />
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
