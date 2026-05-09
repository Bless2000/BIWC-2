/**
 * BIWC – Events Data
 *
 * Temporary local data. When your headless CMS is ready, replace this entire
 * export with a fetch/query function that returns the same object shape.
 *
 * CMS Schema Reference:
 *  - id          : number (unique)
 *  - header      : string  — event title
 *  - description : string  — full event description
 *  - deadline    : string? — optional registration deadline copy
 *  - location    : string
 *  - date        : string  — display string e.g. "20 - 02 - 2026"
 *  - time        : string  — display string e.g. "6:00pm - 8:00pm"
 *  - image       : string  — import path (swap for CMS asset URL)
 *  - category    : 'Fellowship' | 'Discipleship' | 'Youth' | 'Women' | 'Leadership' | 'Outreach'
 */

import mensRetreat from '../images/mens-retreat.jpeg';
import baptism     from '../images/baptism-img.jpg';
import movie       from '../images/movie-night.jpeg';
import women       from '../images/womens-ministry.jpeg';
import deacon      from '../images/deacon-meeting.jpeg';
import auxiliary   from '../images/auxiliary-day-celebration.jpg';
import biblestudy  from '../images/bible-study.jpg';
import cookout     from '../images/cook-out.jpeg';
import outreach    from '../images/outreach-event.jpg';

export const events = [
  {
    id: 1,
    header: "Men's Retreat",
    description:
      "We're getting away from the noise and busyness of life for a men's retreat to recharge our spiritual batteries, have fun, and cultivate friendships!",
    deadline:
      "We will leave from the church on Friday, February 20th at 4:00pm and arrive at Achimota at 5:30pm, eat dinner, and get settled. We will depart for home at 11:00AM on Sunday, February 21st.",
    location: "Achimota Senior High School – Accra, Ghana",
    date: "20 – 02 – 2026",
    time: "6:00pm – 8:00pm",
    image: mensRetreat,
    category: "Fellowship",
  },
  {
    id: 2,
    header: "Baptism Class",
    description:
      "Wanting to know more about what BIWC believes about Baptism? Join us for this class in the BIWC church at Abelemkpe.",
    deadline: "Deadline for registration is March 1st",
    location: "BIWC Church – Abelemkpe, Accra",
    date: "24 – 02 – 2026 to 1 – 04 – 2026",
    time: "12pm – 1pm each day",
    image: baptism,
    category: "Discipleship",
  },
  {
    id: 3,
    header: "Youth Movie Night",
    description:
      "Join us and enjoy good movies, food and interact with each other in a fun and relaxed atmosphere.",
    deadline: "Deadline for registration is March 1st",
    location: "BIWC Church – Abelemkpe, Accra",
    date: "1 – 04 – 2026",
    time: "8pm – 10pm",
    image: movie,
    category: "Youth",
  },
  {
    id: 4,
    header: "BIWC Women – Friendsgiving",
    description:
      "Join us for Friendsgiving where we will fellowship and get to know each other while enjoying our favourite thanksgiving food items! We will have a time of thanksgiving during this event. Bring your favourite side-dish or dessert to share!",
    deadline: "Deadline for registration is March 1st",
    location: "BIWC Church – Abelemkpe, Accra",
    date: "1 – 04 – 2026",
    time: "12pm – 1pm",
    image: women,
    category: "Women",
  },
  {
    id: 5,
    header: "Deacon Meeting",
    description:
      "This meeting is being held after the previous meeting was postponed. Mandatory meeting for all BIWC deacons/deaconesses. Don't forget to bring your deacon's folder!",
    location: "BIWC Church – Abelemkpe, Accra",
    date: "24 – 02 – 2026",
    time: "12pm – 1pm",
    image: deacon,
    category: "Leadership",
  },
  {
    id: 6,
    header: "Auxiliary Celebration Day",
    description:
      "Come help us celebrate our auxiliary groups in BIWC — it'll be fun, entertaining and filled with food and drinks for everyone.",
    location: "BIWC Church – Abelemkpe, Accra",
    date: "24 – 02 – 2026",
    time: "12pm – 4pm",
    image: auxiliary,
    category: "Fellowship",
  },
  {
    id: 7,
    header: "Bible Study",
    description:
      "Come get closer to God with us and meet and interact with people. Open to all — new and old members alike.",
    location: "BIWC Church – Abelemkpe, Accra",
    date: "Every Sunday After Church",
    time: "12pm – 1pm",
    image: biblestudy,
    category: "Discipleship",
  },
  {
    id: 8,
    header: "Cook Out",
    description:
      "Join us for our first cook out event of the year! We're inviting everyone to bring out their favourite recipes. Register before the deadline to book a slot and get the opportunity to post your recipes to our email.",
    deadline: "23 – 02 – 2026",
    location: "BIWC Church – Abelemkpe, Accra",
    date: "24 – 02 – 2026",
    time: "12pm – 4pm",
    image: cookout,
    category: "Fellowship",
  },
  {
    id: 9,
    header: "Outreach",
    description:
      "Join our outreach program and help people get closer to God. Register before the deadline to join our outreach program and make a real difference in your community.",
    deadline: "23 – 02 – 2026",
    location: "BIWC Church – Abelemkpe, Accra",
    date: "24 – 02 – 2026",
    time: "12pm – 4pm",
    image: outreach,
    category: "Outreach",
  },
];
