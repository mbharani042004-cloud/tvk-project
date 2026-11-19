/* Demonstration submissions (complaints and enquiries) used to seed
   localStorage on first run so the tracking page and dashboard have sample
   data to show. Every record here is fabricated sample content.

   Demo tracking credentials:
     Complaint ID: TVK-2026-0001  |  Mobile: 9876543210 */

export const COMPLAINT_CATEGORIES = [
  { id: 'roads', labelKey: 'categories.roads' },
  { id: 'water', labelKey: 'categories.water' },
  { id: 'garbage', labelKey: 'categories.garbage' },
  { id: 'drainage', labelKey: 'categories.drainage' },
  { id: 'streetlights', labelKey: 'categories.streetlights' },
  { id: 'publicSpaces', labelKey: 'categories.publicSpaces' },
  { id: 'other', labelKey: 'categories.other' },
];

export const PRIORITY_LEVELS = [
  { id: 'low', labelKey: 'priority.low' },
  { id: 'medium', labelKey: 'priority.medium' },
  { id: 'high', labelKey: 'priority.high' },
];

export const COMPLAINT_STATUSES = [
  { id: 'submitted', labelKey: 'status.submitted' },
  { id: 'underReview', labelKey: 'status.underReview' },
  { id: 'inProgress', labelKey: 'status.inProgress' },
  { id: 'resolved', labelKey: 'status.resolved' },
  { id: 'rejected', labelKey: 'status.rejected' },
  { id: 'moreInfo', labelKey: 'status.moreInfo' },
];

export const ENQUIRY_CATEGORIES = [
  { id: 'general', labelKey: 'enquiries.typeGeneral' },
  { id: 'assistance', labelKey: 'enquiries.typeAssistance' },
  { id: 'service', labelKey: 'enquiries.typeService' },
  { id: 'roads', labelKey: 'categories.roads' },
  { id: 'water', labelKey: 'categories.water' },
  { id: 'garbage', labelKey: 'categories.garbage' },
  { id: 'drainage', labelKey: 'categories.drainage' },
  { id: 'streetlights', labelKey: 'categories.streetlights' },
  { id: 'publicSpaces', labelKey: 'categories.publicSpaces' },
  { id: 'other', labelKey: 'categories.other' },
];

export const DEMO_RESIDENT = {
  name: 'Demo Resident',
  mobile: '9876543210',
  email: 'demo@tvkward.in',
  street: 'Bharathi Street',
  password: 'demo1234',
};

export const MOCK_COMPLAINTS = [
  {
    id: 'TVK-2026-0001',
    residentName: 'Demo Resident',
    mobile: '9876543210',
    email: 'demo@tvkward.in',
    ownerEmail: 'demo@tvkward.in',
    category: 'roads',
    street: 'Bharathi Street',
    landmark: 'Near the bus stop',
    priority: 'high',
    image: null,
    status: 'inProgress',
    createdAt: '2026-11-05T09:15:00.000Z',
    updatedAt: '2026-11-12T11:00:00.000Z',
    description: {
      en: 'A large pothole has formed in the middle of the road in front of the bus stop. Two-wheelers slow down abruptly and it becomes difficult to see after dark.',
      ta: 'பேருந்து நிலையம் முன்பு சாலையின் நடுவில் ஒரு பெரிய பள்ளம் உருவாகியுள்ளது. இருசக்கர வாகனங்கள் திடீரென வேகத்தைக் குறைக்க வேண்டியுள்ளது; இருட்டிய பிறகு அதைப் பார்ப்பது கடினம்.',
    },
    statusHistory: [
      { status: 'submitted', at: '2026-11-05T09:15:00.000Z', note: { en: 'Complaint received.', ta: 'புகார் பெறப்பட்டது.' } },
      { status: 'underReview', at: '2026-11-07T10:20:00.000Z', note: { en: 'Forwarded to the ward team for verification.', ta: 'சரிபார்ப்புக்காக வார்டு குழுவுக்கு அனுப்பப்பட்டது.' } },
      { status: 'inProgress', at: '2026-11-12T11:00:00.000Z', note: { en: 'Site inspection completed; repair work noted for scheduling.', ta: 'இட ஆய்வு முடிந்தது; பழுதுபார்ப்பு பணி திட்டமிடப்பட்டுள்ளது.' } },
    ],
  },
  {
    id: 'TVK-2026-0002',
    residentName: 'Demo Resident',
    mobile: '9876543210',
    email: 'demo@tvkward.in',
    ownerEmail: 'demo@tvkward.in',
    category: 'water',
    street: 'Kamraj Nagar, 3rd Cross',
    landmark: 'Opposite the water tank',
    priority: 'medium',
    image: null,
    status: 'submitted',
    createdAt: '2026-11-13T07:40:00.000Z',
    updatedAt: '2026-11-13T07:40:00.000Z',
    description: {
      en: 'Water supply in the third cross street has been irregular for the past week, and pressure is very low in the mornings.',
      ta: 'கடந்த ஒரு வாரமாக மூன்றாம் குறுக்குத் தெருவில் குடிநீர் விநியோகம் ஒழுங்கற்றதாக உள்ளது; காலையில் அழுத்தம் மிகக் குறைவாக உள்ளது.',
    },
    statusHistory: [
      { status: 'submitted', at: '2026-11-13T07:40:00.000Z', note: { en: 'Complaint received.', ta: 'புகார் பெறப்பட்டது.' } },
    ],
  },
  {
    id: 'TVK-2026-0003',
    residentName: 'Demo Resident',
    mobile: '9876543210',
    email: 'demo@tvkward.in',
    ownerEmail: 'demo@tvkward.in',
    category: 'garbage',
    street: 'Anna Salai, Lane 2',
    landmark: 'Beside the school wall',
    priority: 'low',
    image: null,
    status: 'resolved',
    createdAt: '2026-10-22T08:05:00.000Z',
    updatedAt: '2026-10-28T16:30:00.000Z',
    description: {
      en: 'Waste had been accumulating at the corner collection point. The bin has since been cleared and the spot cleaned.',
      ta: 'மூலை சேகரிப்பு இடத்தில் கழிவுகள் குவிந்திருந்தன. பின்னர் தொட்டி காலி செய்யப்பட்டு அந்த இடம் சுத்தம் செய்யப்பட்டது.',
    },
    statusHistory: [
      { status: 'submitted', at: '2026-10-22T08:05:00.000Z', note: { en: 'Complaint received.', ta: 'புகார் பெறப்பட்டது.' } },
      { status: 'inProgress', at: '2026-10-24T09:00:00.000Z', note: { en: 'Collection team informed.', ta: 'சேகரிப்புக் குழுவுக்கு தகவல் தெரிவிக்கப்பட்டது.' } },
      { status: 'resolved', at: '2026-10-28T16:30:00.000Z', note: { en: 'Bin cleared and spot cleaned.', ta: 'தொட்டி காலி செய்யப்பட்டு இடம் சுத்தம் செய்யப்பட்டது.' } },
    ],
  },
  {
    id: 'TVK-2026-0004',
    residentName: 'Demo Resident',
    mobile: '9876543210',
    email: 'demo@tvkward.in',
    ownerEmail: 'demo@tvkward.in',
    category: 'streetlights',
    street: 'Vasanthapuram Main Road',
    landmark: 'Near the community hall',
    priority: 'medium',
    image: null,
    status: 'underReview',
    createdAt: '2026-11-10T18:25:00.000Z',
    updatedAt: '2026-11-11T09:10:00.000Z',
    description: {
      en: 'Two streetlight poles near the community hall are not switching on at night, leaving the stretch dark.',
      ta: 'சமூக மண்டபம் அருகே இரண்டு தெரு விளக்கு கம்பங்கள் இரவில் எரியவில்லை; அந்தப் பகுதி இருளாக உள்ளது.',
    },
    statusHistory: [
      { status: 'submitted', at: '2026-11-10T18:25:00.000Z', note: { en: 'Complaint received.', ta: 'புகார் பெறப்பட்டது.' } },
      { status: 'underReview', at: '2026-11-11T09:10:00.000Z', note: { en: 'Field verification pending.', ta: 'கள சரிபார்ப்பு நிலுவையில் உள்ளது.' } },
    ],
  },
];

export const MOCK_ENQUIRIES = [
  {
    id: 'ENQ-2026-0001',
    name: 'Demo Resident',
    mobile: '9876543210',
    email: 'demo@tvkward.in',
    ownerEmail: 'demo@tvkward.in',
    category: 'general',
    subject: 'Process for reporting a blocked drain',
    message: {
      en: 'Could you let me know the process for reporting a blocked storm drain on our street? I would like to share the details through the portal.',
      ta: 'எங்கள் தெருவில் அடைபட்ட மழைநீர் வடிகாலை புகாரளிக்கும் முறையை தெரிவிக்க முடியுமா? விவரங்களை இந்த தளம் வழியாகப் பகிர விரும்புகிறேன்.',
    },
    createdAt: '2026-11-09T14:50:00.000Z',
  },
];
