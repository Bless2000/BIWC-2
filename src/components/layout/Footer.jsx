import React from 'react';
import { Link } from 'react-router-dom';
import { CHURCH_INFO, NAV_LINKS, SOCIAL_LINKS, SERVICE_TIMES } from '../../utils/constants';
import { Youtube, Facebook, Instagram, Music2, Mail, Phone, MapPin } from 'lucide-react';
import logo from '../../assets/logos/Dark-Logo.jpg';

const Footer = () => {
  return (
    <footer className="relative z-10 mt-20 border-t border-white/10 bg-bg/80 backdrop-blur-md pt-20 pb-10">
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* Brand & Mission */}
        <div className="space-y-6">
          <Link to="/" className="inline-block">
             <img 
               src={logo} 
               alt={CHURCH_INFO.name} 
               className="h-12 w-auto object-contain rounded-md" 
             />
          </Link>
          <p className="text-white/50 text-sm leading-relaxed max-w-xs">
            A Spirit-filled community dedicated to transforming lives through the Good News of Jesus Christ.
          </p>
          <div className="flex gap-4">
            <a href={SOCIAL_LINKS.youtube} className="w-9 h-9 rounded-full glass-sm flex items-center justify-center text-white/50 hover:text-red-bright transition-all duration-300">
              <Youtube size={18} />
            </a>
            <a href={SOCIAL_LINKS.facebook} className="w-9 h-9 rounded-full glass-sm flex items-center justify-center text-white/50 hover:text-blue-light transition-all duration-300">
              <Facebook size={18} />
            </a>
            <a href={SOCIAL_LINKS.instagram} className="w-9 h-9 rounded-full glass-sm flex items-center justify-center text-white/50 hover:text-gold-bright transition-all duration-300">
              <Instagram size={18} />
            </a>
            <a href={SOCIAL_LINKS.tiktok} className="w-9 h-9 rounded-full glass-sm flex items-center justify-center text-white/50 hover:text-white transition-all duration-300">
              <Music2 size={18} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-title text-sm font-bold text-white uppercase tracking-widest mb-6">Quick Links</h4>
          <ul className="space-y-4">
            {NAV_LINKS.map(link => (
              <li key={link.path}>
                <Link to={link.path} className="text-white/50 hover:text-gold-bright text-sm transition-colors duration-200 flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-gold-bright rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Service Times */}
        <div>
          <h4 className="font-title text-sm font-bold text-white uppercase tracking-widest mb-6">Service Times</h4>
          <ul className="space-y-6">
            {SERVICE_TIMES.map((svc, i) => (
              <li key={i} className="flex gap-3">
                <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${i === 2 ? 'bg-blue-light shadow-[0_0_8px_rgba(74,128,240,0.5)]' : 'bg-gold-bright shadow-[0_0_8px_rgba(245,200,66,0.5)]'}`} />
                <div>
                  <h5 className="text-white text-[13px] font-bold mb-1">{svc.name}</h5>
                  <p className="text-white/40 text-[11px] uppercase tracking-wide">{svc.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-title text-sm font-bold text-white uppercase tracking-widest mb-6">Contact Us</h4>
          <ul className="space-y-5">
            <li className="flex items-start gap-3">
              <Mail size={16} className="text-gold-bright shrink-0 mt-0.5" />
              <a href={`mailto:${CHURCH_INFO.email}`} className="text-white/50 hover:text-white text-sm transition-colors duration-200">
                {CHURCH_INFO.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Phone size={16} className="text-gold-bright shrink-0 mt-0.5" />
              <span className="text-white/50 text-sm">{CHURCH_INFO.phone}</span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={16} className="text-gold-bright shrink-0 mt-0.5" />
              <span className="text-white/50 text-sm leading-relaxed">
                {CHURCH_INFO.address}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 mt-20 pt-8 border-t border-white/5 text-center">
        <p className="text-white/20 text-[10px] font-bold uppercase tracking-[0.3em]">
          © 2026 {CHURCH_INFO.name} · All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
