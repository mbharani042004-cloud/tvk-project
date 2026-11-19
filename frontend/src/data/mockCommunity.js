/* Demonstration community board posts.
   Resident posts are never auto-published: each carries a moderation status of
   pending | approved | rejected. Only approved posts appear in the public list;
   a signed-in resident can see the status of their own pending posts. */

export const MODERATION_STATUSES = ['pending', 'approved', 'rejected'];

export const MOCK_COMMUNITY_POSTS = [
  {
    id: 'CMT-2026-0006',
    name: 'Kavitha R.',
    ownerEmail: null,
    category: 'publicSpaces',
    title: {
      en: 'Weekend clean-up at the playground — volunteers welcome',
      ta: 'விளையாட்டு மைதானத்தில் வார இறுதி தூய்மைப்பணி — தன்னார்வலர்கள் வரவேற்கப்படுகிறார்கள்',
    },
    description: {
      en: 'A few of us are planning a clean-up at the neighbourhood playground this Saturday morning. Please bring gloves if you can join. Sample demonstration post.',
      ta: 'இந்த சனிக்கிழமை காலையில் சுற்றுப்புற விளையாட்டு மைதானத்தில் சிலர் தூய்மைப்பணி நடத்த திட்டமிட்டுள்ளோம். இணைய விரும்புவோர் கையுறைகளைக் கொண்டு வரவும். மாதிரி விளக்கக்காட்சி பதிவு.',
    },
    image: null,
    status: 'approved',
    likes: 18,
    likedBy: [],
    reported: false,
    reportedBy: [],
    createdAt: '2026-11-15T06:30:00.000Z',
  },
  {
    id: 'CMT-2026-0005',
    name: 'Suresh K.',
    ownerEmail: null,
    category: 'streetlights',
    title: {
      en: 'Two streetlights repaired near the school',
      ta: 'பள்ளி அருகே இரண்டு தெரு விளக்குகள் சரிசெய்யப்பட்டன',
    },
    description: {
      en: 'The lights near the school gate have been working again since yesterday. Thanks to the team that followed up. Sample demonstration post.',
      ta: 'நேற்று முதல் பள்ளி வாயில் அருகே விளக்குகள் மீண்டும் எரிகின்றன. பின்தொடர்ந்த குழுவுக்கு நன்றி. மாதிரி விளக்கக்காட்சி பதிவு.',
    },
    image: null,
    status: 'approved',
    likes: 9,
    likedBy: [],
    reported: false,
    reportedBy: [],
    createdAt: '2026-11-13T17:10:00.000Z',
  },
  {
    id: 'CMT-2026-0004',
    name: 'Meena S.',
    ownerEmail: null,
    category: 'roads',
    title: {
      en: 'Request: slow down near the school zone',
      ta: 'கோரிக்கை: பள்ளி மண்டலத்தில் வேகத்தைக் குறைக்கவும்',
    },
    description: {
      en: 'Cars speed through the school zone in the mornings. Could a speed hump or signage be considered? This is sample demonstration content.',
      ta: 'காலையில் பள்ளி மண்டலத்தில் கார்கள் வேகமாக செல்கின்றன. வேகத்தடை அல்லது அறிவிப்பு பலகை அமைக்கப் பரிசீலிக்க முடியுமா? இது மாதிரி விளக்கக்காட்சி உள்ளடக்கம்.',
    },
    image: null,
    status: 'approved',
    likes: 24,
    likedBy: [],
    reported: false,
    reportedBy: [],
    createdAt: '2026-11-11T08:45:00.000Z',
  },
  {
    id: 'CMT-2026-0003',
    name: 'Arun P.',
    ownerEmail: null,
    category: 'water',
    title: {
      en: 'Water tanker timing on Sunday',
      ta: 'ஞாயிற்றுக்கிழமை தண்ணீர் டேங்கர் நேரம்',
    },
    description: {
      en: 'Sharing that a water tanker is expected on Sunday morning in our lane. Please confirm locally before relying on it. Sample demonstration post.',
      ta: 'எங்கள் தெருவில் ஞாயிற்றுக்கிழமை காலையில் தண்ணீர் டேங்கர் வரும் எனப் பகிர்கிறேன். நம்புவதற்கு முன் உள்ளூர் அளவில் உறுதிப்படுத்தவும். மாதிரி விளக்கக்காட்சி பதிவு.',
    },
    image: null,
    status: 'approved',
    likes: 6,
    likedBy: [],
    reported: false,
    reportedBy: [],
    createdAt: '2026-11-09T19:20:00.000Z',
  },
  {
    id: 'CMT-2026-0002',
    name: 'Demo Resident',
    ownerEmail: 'demo@tvkward.in',
    category: 'drainage',
    title: {
      en: 'Drain clearing needed before the rains',
      ta: 'மழைக்கு முன் வடிகால் சுத்தம் தேவை',
    },
    description: {
      en: 'The storm drain on our street is partly blocked with silt. Requesting the ward team to arrange clearing before the next spell of rain.',
      ta: 'எங்கள் தெருவின் மழைநீர் வடிகால் பகுதியளவு வண்டலால் அடைக்கப்பட்டுள்ளது. அடுத்த மழைக்கு முன் சுத்தம் செய்ய வார்டு குழுவைக் கேட்டுக்கொள்கிறேன்.',
    },
    image: null,
    status: 'pending',
    likes: 0,
    likedBy: [],
    reported: false,
    reportedBy: [],
    createdAt: '2026-11-17T10:05:00.000Z',
  },
];
