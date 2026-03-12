import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { NAV_LINKS, CHURCH_INFO } from '../../utils/constants';
import { Cross, Menu } from 'lucide-react';
import Button from '../ui/Button';

const Navbar = () => {
  return (
    <nav className="fixed top-14 left-1/2 -translate-x-1/2 w-[calc(100%-48px)] max-w-[1200px] h-16 glass rounded-2xl z-[1000] flex items-center justify-between px-6 gap-4 shadow-2xl">
      {/* Brand Logo */}
      <Link to="/" className="flex items-center gap-3 group">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-mid to-blue-deep border border-white/20 flex items-center justify-center shadow-[0_2px_10px_rgba(26,58,143,0.5)] transition-transform duration-300 group-hover:scale-110">
          <Cross className="text-white" size={18} strokeWidth={2.5} />
        </div>
        <span className="font-title text-base text-white tracking-widest uppercase font-black">
          {CHURCH_INFO.shortName}
        </span>
      </Link>

      {/* Navigation Links (Desktop) */}
      <ul className="hidden lg:flex items-center gap-1">
        {NAV_LINKS.map((link) => (
          <li key={link.path}>
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                `text-[11.5px] font-bold uppercase tracking-wider px-3.5 py-2 rounded-lg transition-all duration-200 relative group ${
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

      {/* Actions */}
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2">
          <Button variant="ghost" size="sm" className="!px-4">I'm New</Button>
          <Button variant="danger" size="sm" className="!px-4">Donate</Button>
        </div>
        
        {/* Mobile Menu Toggle (Simplified for now) */}
        <button className="lg:hidden w-10 h-10 flex items-center justify-center text-white/70 hover:text-white transition-colors">
          <Menu size={24} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
