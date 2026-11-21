/* Small, dependency-free icon set. Every icon inherits `currentColor` and sizes
   from the surrounding font-size, so it can be styled from component CSS. */

function Svg({ children, ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

/* Community identity mark — a neutral location pin with a home. */
export function PinIcon(props) {
  return (
    <Svg {...props}>
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <path d="M12 7.5 8.5 10.4v4.1h7v-4.1L12 7.5Z" />
    </Svg>
  );
}

export function HomeIcon(props) {
  return (
    <Svg {...props}>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5.5 9.5V20h13V9.5" />
      <path d="M10 20v-5.5h4V20" />
    </Svg>
  );
}

export function InfoIcon(props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9" />
      <line x1="12" y1="11" x2="12" y2="16.5" />
      <circle cx="12" cy="7.8" r="0.9" fill="currentColor" stroke="none" />
    </Svg>
  );
}

export function MegaphoneIcon(props) {
  return (
    <Svg {...props}>
      <path d="M3 11v2a1 1 0 0 0 1 1h2l4 3.5V6.5L6 10H4a1 1 0 0 0-1 1Z" />
      <path d="M14 7.5a5.5 5.5 0 0 1 0 9" />
      <path d="M17 5a9 9 0 0 1 0 14" />
    </Svg>
  );
}

export function NewsIcon(props) {
  return (
    <Svg {...props}>
      <path d="M4 5h12v14H5.5A1.5 1.5 0 0 1 4 17.5V5Z" />
      <path d="M16 8h3.5a.5.5 0 0 1 .5.5v8.5a2 2 0 0 1-2 2h-2" />
      <line x1="7" y1="8.5" x2="13" y2="8.5" />
      <line x1="7" y1="12" x2="13" y2="12" />
      <line x1="7" y1="15.5" x2="11" y2="15.5" />
    </Svg>
  );
}

export function UsersIcon(props) {
  return (
    <Svg {...props}>
      <circle cx="9" cy="8.5" r="3.2" />
      <path d="M3.5 19.5a5.5 5.5 0 0 1 11 0" />
      <path d="M16 6.2a3 3 0 0 1 0 5.6" />
      <path d="M17.5 14.3a5 5 0 0 1 3 4.4" />
    </Svg>
  );
}

export function SearchIcon(props) {
  return (
    <Svg {...props}>
      <circle cx="11" cy="11" r="6.5" />
      <line x1="16" y1="16" x2="20.5" y2="20.5" />
    </Svg>
  );
}

export function ClipboardIcon(props) {
  return (
    <Svg {...props}>
      <rect x="5" y="4.5" width="14" height="16" rx="2" />
      <path d="M9 4.5V3.2h6v1.3" />
      <path d="M8.5 10.5h7" />
      <path d="M8.5 14h7" />
      <path d="M8.5 17.5h4" />
    </Svg>
  );
}

export function LifeBuoyIcon(props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3.6" />
      <line x1="5.6" y1="5.6" x2="9.4" y2="9.4" />
      <line x1="18.4" y1="5.6" x2="14.6" y2="9.4" />
      <line x1="5.6" y1="18.4" x2="9.4" y2="14.6" />
      <line x1="18.4" y1="18.4" x2="14.6" y2="14.6" />
    </Svg>
  );
}

export function MessageIcon(props) {
  return (
    <Svg {...props}>
      <path d="M4 5.5h16v10.5H9l-5 3.5V5.5Z" />
      <line x1="8" y1="9" x2="16" y2="9" />
      <line x1="8" y1="12.5" x2="13" y2="12.5" />
    </Svg>
  );
}

export function LoginIcon(props) {
  return (
    <Svg {...props}>
      <path d="M14 4.5h4.5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H14" />
      <path d="M10 8 14 12l-4 4" />
      <line x1="14" y1="12" x2="4" y2="12" />
    </Svg>
  );
}

export function UserPlusIcon(props) {
  return (
    <Svg {...props}>
      <circle cx="10" cy="8.5" r="3.4" />
      <path d="M4 19.5a6 6 0 0 1 12 0" />
      <line x1="18.5" y1="6.5" x2="18.5" y2="12" />
      <line x1="15.8" y1="9.2" x2="21.2" y2="9.2" />
    </Svg>
  );
}

export function MenuIcon(props) {
  return (
    <Svg {...props}>
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17" x2="20" y2="17" />
    </Svg>
  );
}

export function CloseIcon(props) {
  return (
    <Svg {...props}>
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="18" y1="6" x2="6" y2="18" />
    </Svg>
  );
}

export function PhoneIcon(props) {
  return (
    <Svg {...props}>
      <path d="M6.5 3.5h3l1.5 4-2 1.5a11 11 0 0 0 6 6l1.5-2 4 1.5v3a1.5 1.5 0 0 1-1.7 1.5A16.5 16.5 0 0 1 5 5.2 1.5 1.5 0 0 1 6.5 3.5Z" />
    </Svg>
  );
}

export function MailIcon(props) {
  return (
    <Svg {...props}>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </Svg>
  );
}

export function ChatIcon(props) {
  return (
    <Svg {...props}>
      <path d="M20.5 12a8.5 8.5 0 0 1-12.4 7.6L3.5 20.5l1-4.4A8.5 8.5 0 1 1 20.5 12Z" />
      <path d="M9 11.5h6" />
      <path d="M9 14.5h3.5" />
    </Svg>
  );
}

export function CheckCircleIcon(props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12.2 2.6 2.6L16 9.4" />
    </Svg>
  );
}

export function ClockIcon(props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5V12l3 2" />
    </Svg>
  );
}

export function AlertIcon(props) {
  return (
    <Svg {...props}>
      <path d="M12 4.5 21 19.5H3L12 4.5Z" />
      <line x1="12" y1="10" x2="12" y2="14" />
      <circle cx="12" cy="16.6" r="0.9" fill="currentColor" stroke="none" />
    </Svg>
  );
}

export function ChevronRightIcon(props) {
  return (
    <Svg {...props}>
      <path d="m9 6 6 6-6 6" />
    </Svg>
  );
}

export function BellIcon(props) {
  return (
    <Svg {...props}>
      <path d="M6.5 10a5.5 5.5 0 0 1 11 0c0 3.5 1.5 5 1.5 5H5s1.5-1.5 1.5-5Z" />
      <path d="M10 18.5a2 2 0 0 0 4 0" />
    </Svg>
  );
}

export function LogoutIcon(props) {
  return (
    <Svg {...props}>
      <path d="M10 4.5H5.5a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1H10" />
      <path d="M14 8 18 12l-4 4" />
      <line x1="18" y1="12" x2="8" y2="12" />
    </Svg>
  );
}

export function CameraIcon(props) {
  return (
    <Svg {...props}>
      <path d="M4 8.5h3l1.4-2h7.2L17 8.5h3v10H4Z" />
      <circle cx="12" cy="13.5" r="3.2" />
    </Svg>
  );
}

export function ThumbsUpIcon(props) {
  return (
    <Svg {...props}>
      <path d="M7 10.5V20H4.5v-9.5H7Z" />
      <path d="M7 10.5 10.5 4a2 2 0 0 1 1.9 2.5l-.8 3h6.2a1.5 1.5 0 0 1 1.4 1.9l-1.6 7A1.5 1.5 0 0 1 16.2 20H7" />
    </Svg>
  );
}

export function FlagIcon(props) {
  return (
    <Svg {...props}>
      <path d="M6 3.5v17" />
      <path d="M6 4.5h11l-2 4 2 4H6" />
    </Svg>
  );
}

export function RoadIcon(props) {
  return (
    <Svg {...props}>
      <path d="M9 4 5.5 20" />
      <path d="M15 4 18.5 20" />
      <line x1="12" y1="5" x2="12" y2="8" />
      <line x1="12" y1="11" x2="12" y2="14" />
      <line x1="12" y1="17" x2="12" y2="19.5" />
    </Svg>
  );
}

export function WaterIcon(props) {
  return (
    <Svg {...props}>
      <path d="M12 3.5s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11Z" />
    </Svg>
  );
}

export function GarbageIcon(props) {
  return (
    <Svg {...props}>
      <path d="M5 7h14" />
      <path d="M9 7V4.8h6V7" />
      <path d="M6.5 7 7.6 20h8.8L17.5 7" />
      <line x1="10.5" y1="10.5" x2="10.5" y2="16.5" />
      <line x1="13.5" y1="10.5" x2="13.5" y2="16.5" />
    </Svg>
  );
}

export function DrainageIcon(props) {
  return (
    <Svg {...props}>
      <path d="M4 9c2-1.5 4-1.5 6 0s4 1.5 6 0" />
      <path d="M4 14c2-1.5 4-1.5 6 0s4 1.5 6 0" />
      <path d="M4 19c2-1.5 4-1.5 6 0s4 1.5 6 0" />
    </Svg>
  );
}

export function StreetlightIcon(props) {
  return (
    <Svg {...props}>
      <path d="M9 20V8a4 4 0 0 1 4-4h3" />
      <path d="M13 4h5l1.5 3h-8L13 4Z" />
      <path d="M7 20h5" />
      <path d="M9.5 15.5h3" />
    </Svg>
  );
}

export function ParkIcon(props) {
  return (
    <Svg {...props}>
      <path d="M12 3.5 6.5 11h11L12 3.5Z" />
      <path d="M12 8 7.5 14.5h9L12 8Z" />
      <path d="M12 14.5V20" />
    </Svg>
  );
}

export function OtherIcon(props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.6 9.3A2.5 2.5 0 0 1 14.5 10c0 1.7-2.5 2-2.5 3.8" />
      <circle cx="12" cy="16.8" r="0.9" fill="currentColor" stroke="none" />
    </Svg>
  );
}

export function EyeIcon(props) {
  return (
    <Svg {...props}>
      <path d="M2.5 12S6 6.5 12 6.5 21.5 12 21.5 12 18 17.5 12 17.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="2.8" />
    </Svg>
  );
}

export function EyeOffIcon(props) {
  return (
    <Svg {...props}>
      <path d="M4 4.5 20 19.5" />
      <path d="M9.5 6.9A9.6 9.6 0 0 1 12 6.5c6 0 9.5 5.5 9.5 5.5a17 17 0 0 1-3 3.6" />
      <path d="M6.4 8.4A16.7 16.7 0 0 0 2.5 12S6 17.5 12 17.5a9.4 9.4 0 0 0 3.6-.7" />
      <path d="M10.2 10.4a2.8 2.8 0 0 0 3.5 3.5" />
    </Svg>
  );
}

export function UploadIcon(props) {
  return (
    <Svg {...props}>
      <path d="M4 15.5v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" />
      <path d="M12 16V4.5" />
      <path d="m8 8 4-3.5L16 8" />
    </Svg>
  );
}

export function CalendarIcon(props) {
  return (
    <Svg {...props}>
      <rect x="4" y="6" width="16" height="14" rx="2" />
      <path d="M4 10h16" />
      <path d="M8 4.5V7" />
      <path d="M16 4.5V7" />
    </Svg>
  );
}

export function ShieldIcon(props) {
  return (
    <Svg {...props}>
      <path d="M12 3.5 19 6v6c0 4.4-3 7.4-7 8.5-4-1.1-7-4.1-7-8.5V6l7-2.5Z" />
      <path d="m9 12 2.2 2.2L15.5 10" />
    </Svg>
  );
}

export function GridIcon(props) {
  return (
    <Svg {...props}>
      <rect x="4" y="4" width="7" height="7" rx="1.5" />
      <rect x="13" y="4" width="7" height="7" rx="1.5" />
      <rect x="4" y="13" width="7" height="7" rx="1.5" />
      <rect x="13" y="13" width="7" height="7" rx="1.5" />
    </Svg>
  );
}

export function FileTextIcon(props) {
  return (
    <Svg {...props}>
      <path d="M6 3.5h7l5 5v12H6Z" />
      <path d="M13 3.5V8.5h5" />
      <path d="M9 13h6" />
      <path d="M9 16.5h4" />
    </Svg>
  );
}

/* Category icon lookup so category grids stay declarative. */
export const CATEGORY_ICONS = {
  roads: RoadIcon,
  water: WaterIcon,
  garbage: GarbageIcon,
  drainage: DrainageIcon,
  streetlights: StreetlightIcon,
  publicSpaces: ParkIcon,
  other: OtherIcon,
};

export function CategoryIcon({ category, ...props }) {
  const Icon = CATEGORY_ICONS[category] || OtherIcon;
  return <Icon {...props} />;
}
