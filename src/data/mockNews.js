/* Demonstration content for the Local Updates feed and the homepage
   "What's Happening" section. All entries are sample data, clearly marked as
   demonstration content in the UI. No real photographs of the ward are used;
   cards fall back to a themed placeholder when no image is present. */

export const UPDATE_CATEGORY_IDS = [
  'roads',
  'water',
  'garbage',
  'drainage',
  'streetlights',
  'publicSpaces',
  'other',
];

export const MOCK_NEWS = [
  {
    id: 'upd-2026-0007',
    category: 'roads',
    source: 'ward',
    publishedAt: '2026-11-16',
    image: null,
    title: {
      en: 'Road repair work scheduled on Bharathi Street',
      ta: 'பாரதி தெருவில் சாலை பழுதுபார்ப்பு பணி திட்டமிடப்பட்டுள்ளது',
    },
    description: {
      en: 'Sample notice: patch work on the stretch between the bus stop and the temple junction is planned. Residents are advised to use alternate routes while the work is in progress.',
      ta: 'மாதிரி அறிவிப்பு: பேருந்து நிலையம் முதல் கோயில் சந்திப்பு வரையிலான பகுதியில் சாலை சரிசெய்யும் பணி திட்டமிடப்பட்டுள்ளது. பணி நடைபெறும் காலத்தில் மாற்று வழிகளைப் பயன்படுத்துமாறு குடியிருப்பாளர்கள் கேட்டுக்கொள்ளப்படுகிறார்கள்.',
    },
  },
  {
    id: 'upd-2026-0006',
    category: 'water',
    source: 'ward',
    publishedAt: '2026-11-14',
    image: null,
    title: {
      en: 'Water supply timing notice for Vasanthapuram',
      ta: 'வசந்தபுரத்திற்கான குடிநீர் விநியோக நேர அறிவிப்பு',
    },
    description: {
      en: 'Sample notice: piped water supply in a few blocks is expected to be delayed while a valve is replaced. Residents are requested to store water in advance.',
      ta: 'மாதிரி அறிவிப்பு: ஒரு வால்வு மாற்றப்படுவதால் சில தொகுதிகளில் குழாய் குடிநீர் விநியோகம் தாமதமாகும் என எதிர்பார்க்கப்படுகிறது. குடியிருப்பாளர்கள் முன்கூட்டியே தண்ணீரைச் சேமிக்குமாறு கேட்டுக்கொள்ளப்படுகிறார்கள்.',
    },
  },
  {
    id: 'upd-2026-0005',
    category: 'garbage',
    source: 'ward',
    publishedAt: '2026-11-11',
    image: null,
    title: {
      en: 'Updated garbage collection route timings',
      ta: 'புதுப்பிக்கப்பட்ட குப்பை சேகரிப்பு வழி நேரங்கள்',
    },
    description: {
      en: 'Sample notice: the morning collection round now covers the eastern lanes first. Residents are encouraged to hand over segregated waste only during the collection round.',
      ta: 'மாதிரி அறிவிப்பு: காலை சேகரிப்பு சுற்று இப்போது கிழக்குப் பகுதி தெருக்களை முதலில் உள்ளடக்குகிறது. பிரித்தெடுக்கப்பட்ட கழிவுகளை சேகரிப்பு நேரத்தில் மட்டும் வழங்குமாறு குடியிருப்பாளர்கள் ஊக்குவிக்கப்படுகிறார்கள்.',
    },
  },
  {
    id: 'upd-2026-0004',
    category: 'drainage',
    source: 'resident',
    publishedAt: '2026-11-08',
    image: null,
    title: {
      en: 'Resident note: stagnant water near the community park',
      ta: 'குடியிருப்பாளர் குறிப்பு: சமூக பூங்கா அருகே தேங்கிய நீர்',
    },
    description: {
      en: 'A resident has shared that water collects near the park entrance after rain. This is a demonstration post and would normally be routed to the ward team for verification.',
      ta: 'மழைக்குப் பிறகு பூங்கா நுழைவாயில் அருகே தண்ணீர் தேங்குவதாக ஒரு குடியிருப்பாளர் பகிர்ந்துள்ளார். இது ஒரு மாதிரி பதிவு; பொதுவாக இது சரிபார்ப்புக்காக வார்டு குழுவுக்கு அனுப்பப்படும்.',
    },
  },
  {
    id: 'upd-2026-0003',
    category: 'streetlights',
    source: 'ward',
    publishedAt: '2026-11-04',
    image: null,
    title: {
      en: 'Streetlight maintenance drive in progress',
      ta: 'தெரு விளக்கு பராமரிப்பு பணி நடைபெறுகிறது',
    },
    description: {
      en: 'Sample notice: non-working streetlights reported in the ward are being checked block by block. Residents may report fittings that still do not work.',
      ta: 'மாதிரி அறிவிப்பு: வார்டில் செயல்படாத தெரு விளக்குகள் தொகுதி வாரியாக சரிபார்க்கப்படுகின்றன. இன்னும் செயல்படாத விளக்குகளை குடியிருப்பாளர்கள் புகாரளிக்கலாம்.',
    },
  },
  {
    id: 'upd-2026-0002',
    category: 'publicSpaces',
    source: 'resident',
    publishedAt: '2026-10-30',
    image: null,
    title: {
      en: 'Weekend clean-up at the neighbourhood playground',
      ta: 'சுற்றுப்புற விளையாட்டு மைதானத்தில் வார இறுதி தூய்மைப்பணி',
    },
    description: {
      en: 'Residents are planning a volunteer clean-up at the playground this weekend. This is demonstration content shared through the community board.',
      ta: 'இந்த வார இறுதியில் விளையாட்டு மைதானத்தில் தன்னார்வ தூய்மைப்பணியை குடியிருப்பாளர்கள் திட்டமிட்டுள்ளனர். இது சமூக பலகை வழியாகப் பகிரப்பட்ட மாதிரி உள்ளடக்கம்.',
    },
  },
  {
    id: 'upd-2026-0001',
    category: 'other',
    source: 'ward',
    publishedAt: '2026-10-26',
    image: null,
    title: {
      en: 'Community portal demonstration launch',
      ta: 'சமூக தள மாதிரி தொடக்கம்',
    },
    description: {
      en: 'Welcome to the 7th Ward Community Connect demonstration. Explore sample updates, submit a practice complaint and track it using your complaint ID.',
      ta: '7-வது வார்டு சமூக இணைப்பு மாதிரிக்கு வருக. மாதிரி புதுப்பிப்புகளைப் பார்க்கவும், ஒரு பயிற்சி புகாரை அளிக்கவும், புகார் எண்ணைப் பயன்படுத்தி அதைக் கண்காணிக்கவும்.',
    },
  },
];
