import React from 'react';
import { Send } from 'lucide-react';

const PrayerForm = () => {
  return (
    <section className="max-w-[1200px] mx-auto px-6 mb-32">
      <div className="flex flex-col lg:flex-row gap-16 items-start">
        
        {/* Left: Content */}
        <div className="lg:w-1/2">
          <div className="inline-flex items-center gap-2 bg-red-bright/10 border border-red-bright/20 text-red-bright px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6">
            Contact Support
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Prayer & Message <em>Request</em>
          </h2>
          <p className="text-white/50 text-lg leading-relaxed mb-8">
            We believe in the power of prayer. Whether you're going through a difficult time or want to share a testimony, our prayer team is here to stand with you.
          </p>
          <div className="glass-sm p-6 rounded-2xl border-white/5">
            <h4 className="text-white font-bold mb-2">Private & Confidential</h4>
            <p className="text-white/40 text-sm">Your requests are handled with the utmost care and privacy by our dedicated ministry team.</p>
          </div>
        </div>

        {/* Right: Form */}
        <div className="lg:w-1/2 w-full">
          <div className="glass-form">
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" placeholder="Your full name" />
                </div>
                <div className="form-group">
                  <label>Mobile Number</label>
                  <input type="tel" placeholder="+233 XXX XXX XXX" />
                </div>
              </div>
              
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" placeholder="your@email.com" />
              </div>

              <div className="form-group">
                <label>Your Message / Prayer Request</label>
                <textarea placeholder="Share your request with us..."></textarea>
              </div>

              <div className="flex justify-end pt-2">
                <button type="submit" className="btn-submit">
                  Submit Request
                  <Send size={16} />
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
};

export default PrayerForm;
