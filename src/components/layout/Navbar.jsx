import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { NAV_LINKS, CHURCH_INFO } from '../../utils/constants';
import { Menu, X, ChevronRight } from 'lucide-react';
import Button from '../ui/Button';
import logo from '../../assets/logos/Dark-Logo.jpg';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const [prevPath, setPrevPath] = useState(location.pathname);

  // Close drawer on route change (Render-phase update)
  if (location.pathname !== prevPath) {
    setPrevPath(location.pathname);
    setMenuOpen(false);
  }

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      {/* ── Navbar bar ── */}
      <nav className="fixed top-10 sm:top-14 left-1/2 -translate-x-1/2 w-[calc(100%-24px)] sm:w-[calc(100%-48px)] max-w-[1200px] h-14 sm:h-16 glass rounded-2xl z-[1000] flex items-center justify-between px-4 sm:px-6 gap-3 shadow-2xl">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 shrink-0 group" onClick={() => setMenuOpen(false)}>
          <img
            src={logo}
            alt={CHURCH_INFO.name}
            className="h-8 sm:h-10 w-auto object-contain rounded-md"
          />
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `text-[11.5px] font-bold uppercase tracking-wider px-3.5 py-2 rounded-lg transition-all duration-200 relative ${
                    isActive
                      ? 'text-white bg-white/10'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-gold-bright rounded-full shadow-[0_0_8px_rgba(245,200,66,0.8)]" />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Desktop CTA buttons */}
          <div className="hidden sm:flex items-center gap-2">
            <Link to="/new-here">
              <Button variant="ghost" size="sm" className="!px-4">I'm New</Button>
            </Link>
            <Link to="/give">
              <Button variant="danger" size="sm" className="!px-4">Give</Button>
            </Link>
          </div>

          {/* Hamburger toggle — visible below lg */}
          <button
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl transition-all duration-200 hover:bg-white/10"
            style={{ color: 'rgba(255,255,255,0.75)' }}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* ── Mobile drawer backdrop ── */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[998] lg:hidden"
          style={{ background: 'rgba(4,8,28,0.7)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* ── Mobile drawer panel ── */}
      <div
        className={`fixed top-0 right-0 h-full w-[280px] sm:w-[320px] z-[999] lg:hidden flex flex-col transition-transform duration-300 ease-in-out ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          background: 'rgba(6,12,38,0.97)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderLeft: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '-24px 0 80px rgba(0,0,0,0.5)',
        }}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-5 border-b border-white/10 shrink-0">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            <img src={logo} alt={CHURCH_INFO.name} className="h-9 w-auto object-contain rounded-md" />
          </Link>
          <button
            onClick={() => setMenuOpen(false)}
            className="w-9 h-9 flex items-center justify-center rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition-all duration-200"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable nav links */}
        <nav className="flex-1 overflow-y-auto px-4 py-4">
          <ul className="space-y-1">
            {NAV_LINKS.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-4 py-3.5 rounded-xl text-[13px] font-bold uppercase tracking-wider transition-all duration-200 group ${
                      isActive
                        ? 'text-white bg-white/12'
                        : 'text-white/55 hover:text-white hover:bg-white/8'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span className="flex items-center gap-3">
                        {/* Active gold dot */}
                        <span
                          className={`w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-200 ${
                            isActive ? 'bg-gold-bright shadow-[0_0_8px_rgba(245,200,66,0.8)]' : 'bg-white/20'
                          }`}
                        />
                        {link.name}
                      </span>
                      <ChevronRight
                        size={14}
                        className={`transition-all duration-200 ${
                          isActive ? 'text-gold-bright' : 'text-white/20 group-hover:text-white/50 group-hover:translate-x-0.5'
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Drawer footer CTAs */}
        <div className="px-4 pb-8 pt-4 border-t border-white/10 space-y-3 shrink-0">
          <Link to="/new-here" onClick={() => setMenuOpen(false)} className="block">
            <button
              className="w-full py-3 rounded-full text-[12.5px] font-bold uppercase tracking-wider text-white/60 transition-all duration-200 hover:text-white hover:bg-white/8"
              style={{ border: '1px solid rgba(255,255,255,0.15)' }}
            >
              I'm New Here
            </button>
          </Link>
          <Link to="/give" onClick={() => setMenuOpen(false)} className="block">
            <button
              className="w-full py-3 rounded-full text-[12.5px] font-bold uppercase tracking-wider text-white transition-all duration-200 hover:-translate-y-[1px]"
              style={{
                background: 'linear-gradient(135deg, var(--red), var(--red-bright))',
                boxShadow: '0 4px 18px rgba(212,32,32,0.4)',
              }}
            >
              Give
            </button>
          </Link>

          {/* Social links */}
          <div className="flex items-center justify-center gap-4 pt-3">
            {[
              { href: 'https://youtube.com/@biwcghana',   label: 'YouTube'   },
              { href: 'https://facebook.com/@biwcghana',  label: 'Facebook'  },
              { href: 'https://instagram.com/@biwcghana', label: 'Instagram' },
            ].map(({ href, label }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="text-[9.5px] font-bold uppercase tracking-widest text-white/25 hover:text-gold-bright transition-colors duration-200"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
