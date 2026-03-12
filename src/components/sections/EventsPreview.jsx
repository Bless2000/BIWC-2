import React from 'react';
import { events } from "../../assets/data/events";
import "../../styles/Events.css";

function EventsPreview() {
  // Taking only the first few events for the preview
  const upcomingEvents = events.slice(0, 3);

  return (
    <section className="events-preview">
      <div className="flex items-baseline gap-3 mb-12 border-b border-white/10 pb-4 max-w-[1200px] mx-auto px-6">
        <h2 className="text-2xl font-bold text-white uppercase tracking-wide">
          Upcoming <em>Events</em>
        </h2>
        <span className="font-italic italic text-white/30 text-lg">Mark your calendars</span>
      </div>
      
      <div className="events-grid">
        {upcomingEvents.map((event) => (
          <div key={event.id} className="event-card">
            <img src={event.image} alt={event.header} />
            <h3>{event.header}</h3>
            <p>{event.date}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default EventsPreview;
