// Import images
import choirImg from '../images/choir-img.jpg';
import childrenImg from '../images/children.jpg';
import mediaImg from '../images/media-team.jpg';
import counsellingImg from '../images/counselling.jpg';
import prayerImg from '../images/prayer.jpg';
import mensImg from '../images/mens.jpg';
import womenImg from '../images/womens-ministry.jpg';
import youthImg from '../images/youth.jpg';

export const MINISTRIES_DATA = [
  // ── 1. Music Ministry ────────────────────────────────────────────────────────
  {
    id: 'music-ministry',
    title: 'Music Ministry',
    shortTitle: 'Music',
    tagline: 'Praise · Presence · Power',
    description:
      'The heartbeat of our worship experience — a consecrated team of musicians, vocalists, and choir members who lead the congregation into the very presence of God. We believe music is ministry, and every song is an offering.',
    mission:
      'To lead the church into authentic, Spirit-filled worship that transforms hearts and glorifies God.',
    icon: 'Music',
    gradient: 'linear-gradient(135deg, #2a0a7a, #5535b0)',
    accentColor: '#a070f0',
    geoPattern: 'dots',
    activities: [
      'Choir Rehearsals',
      'Worship Nights',
      'Songwriting Sessions',
      'Instrumental Training',
    ],
    meetingTime: 'Fridays · 5:00pm',
    image: choirImg,
    members: [
      { id: 1, name: 'Kofi',    role: 'Leader',        image: undefined },
      { id: 2, name: 'Ama',     role: 'Deputy Leader', image: undefined },
      { id: 3, name: 'Joyce',   role: 'Vocalist',      image: undefined },
      { id: 4, name: 'Rebecca', role: 'Member',        image: undefined },
    ],
  },
 
  // ── 2. Children's Ministry ───────────────────────────────────────────────────
  {
    id: 'childrens-ministry',
    title: "Children's Ministry",
    shortTitle: 'Children',
    tagline: 'Seeds · Growth · Future',
    description:
      "A safe, joyful, and faith-filled environment where boys and girls discover Jesus in ways they understand and love. We partner with parents to lay Gospel foundations that last a lifetime.",
    mission:
      "To raise children who know God, love His Word, and shine His light in their generation.",
    icon: 'Baby',
    gradient: 'linear-gradient(135deg, #0a4a1a, #1a8040)',
    accentColor: '#40c070',
    geoPattern: 'rings',
    activities: [
      'Sunday School',
      'Vacation Bible School',
      "Kids' Choir",
      'Scripture Memory Program',
    ],
    meetingTime: 'Sundays · 7:30am',
    image: childrenImg,
    members: [
      { id: 1, name: 'Ama James',      role: 'Leader / Teacher',        image: undefined },
      { id: 2, name: 'Abigail Tetteh', role: 'Deputy Leader / Teacher', image: undefined },
    ],
  },
 
  // ── 3. Media Ministry ────────────────────────────────────────────────────────
  {
    id: 'media-ministry',
    title: 'Media Ministry',
    shortTitle: 'Media',
    tagline: 'Record · Broadcast · Reach',
    description:
      "The team behind the screens, cameras, and livestreams that carry BIWC's message beyond our walls to the world. We believe technology is a powerful tool in God's hands to fulfil the Great Commission.",
    mission:
      'To amplify the Gospel of Jesus Christ through excellent media production and digital outreach.',
    icon: 'Video',
    gradient: 'linear-gradient(135deg, #060f3a, #143070)',
    accentColor: '#4a80f0',
    geoPattern: 'cross',
    activities: [
      'Live Streaming',
      'Video Production',
      'Social Media Content',
      'Audio & Sound Engineering',
    ],
    meetingTime: 'Every Sunday Service',
    image: mediaImg,
    members: [],
  },
 
  // ── 4. Counselling Ministry ──────────────────────────────────────────────────
  {
    id: 'counselling-ministry',
    title: 'Counselling Ministry',
    shortTitle: 'Counselling',
    tagline: 'Heal · Restore · Flourish',
    description:
      "A confidential, compassionate space where members receive Christ-centred guidance through life's challenges. Our trained counsellors walk alongside individuals and families on their journey to wholeness.",
    mission:
      "To bring healing, restoration, and hope to every person through the truth of God's Word.",
    icon: 'HeartHandshake',
    gradient: 'linear-gradient(135deg, #4a2a00, #a06020)',
    accentColor: '#f5a842',
    geoPattern: 'rings',
    activities: [
      'One-on-One Counselling',
      'Marriage & Family Sessions',
      'Grief Support',
      'Pre-Marriage Counselling',
    ],
    meetingTime: 'By Appointment',
    image: counsellingImg,
    members: [],
  },
 
  // ── 5. Prayer & Evangelism Ministry ─────────────────────────────────────────
  {
    id: 'prayer-evangelism',
    title: 'Prayer & Evangelism',
    shortTitle: 'Prayer',
    tagline: 'Intercede · Go · Transform',
    description:
      "The engine room and the frontline of BIWC — a company of intercessors and soul-winners who saturate our community in prayer and take the love of Christ into the streets, hospitals, and prisons.",
    mission:
      'To sustain a culture of fervent prayer and bold evangelism that sees lives transformed for Christ.',
    icon: 'Star',
    gradient: 'linear-gradient(135deg, #0a4a4a, #0a8080)',
    accentColor: '#20c0c0',
    geoPattern: 'cross',
    activities: [
      'Weekly Prayer Meetings',
      'All-Night Prayer',
      'Street Evangelism',
      'Hospital & Prison Outreaches',
    ],
    meetingTime: 'Tuesdays & Thursdays · 6:00am',
    image: prayerImg,
    members: [],
  },
 
  // ── 6. Men's Fellowship ──────────────────────────────────────────────────────
  {
    id: 'mens-fellowship',
    title: "Men's Fellowship",
    shortTitle: 'Men',
    tagline: 'Faith · Purpose · Leadership',
    description:
      "A brotherhood of men committed to walking uprightly before God and their families. We gather to sharpen one another through the Word, prayer, and accountability — building men who lead with integrity.",
    mission:
      'To raise Godly men who are pillars in their homes, church, and community.',
    icon: 'Shield',
    gradient: 'linear-gradient(135deg, #0d2a7a, #2555c0)',
    accentColor: '#4a80f0',
    geoPattern: 'cross',
    activities: [
      "Monthly Men's Breakfast",
      'Prayer & Accountability',
      'Leadership Workshops',
      'Family Seminars',
    ],
    meetingTime: 'TBC',
    image: mensImg,
    members: [],
  },
 
  // ── 7. Women's Ministry ──────────────────────────────────────────────────────
  {
    id: 'womens-ministry',
    title: "Women's Ministry",
    shortTitle: 'Women',
    tagline: 'Grace · Strength · Community',
    description:
      "A sisterhood that celebrates the strength and grace of every woman in Christ. We support, mentor, and uplift one another through Bible study, fellowship, and outreach — creating a community where women flourish.",
    mission:
      "To empower women to walk in their God-given identity, purpose, and grace.",
    icon: 'Heart',
    gradient: 'linear-gradient(135deg, #7a0a0a, #d42020)',
    accentColor: '#ff4a4a',
    geoPattern: 'rings',
    activities: [
      "Women's Bible Study",
      'Sisterhood Brunch',
      'Community Outreach',
      'Mentorship Program',
    ],
    meetingTime: 'TBC',
    image: womenImg,
    members: [],
  },
 
  // ── 8. Youth Fellowship ──────────────────────────────────────────────────────
  {
    id: 'youth-fellowship',
    title: 'Youth Fellowship',
    shortTitle: 'Youth',
    tagline: 'Bold · Fearless · Called',
    description:
      "A generation rising without apology for the Gospel. Our youth ministry is a vibrant, Spirit-filled community where young people discover their identity in Christ and deploy their gifts for God's kingdom.",
    mission:
      'To raise a bold generation of young believers who transform their world for Christ.',
    icon: 'Zap',
    gradient: 'linear-gradient(135deg, #7a4a00, #c8900a)',
    accentColor: '#f5c842',
    geoPattern: 'lines',
    activities: [
      'Weekly Youth Service',
      'Youth Camp',
      'Skill Development',
      'Evangelism Outreaches',
    ],
    meetingTime: 'TBC',
    image: youthImg,
    members: [],
  },
];
