interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

export const SlidersHorizontalIcon = ({
  size = 20,
  color = "currentColor",
  className,
}: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={
      className ||
      `${"lucide lucide-sliders-horizontal-icon lucide-sliders-horizontal"}`
    }
  >
    <path d="M10 5H3" />
    <path d="M12 19H3" />
    <path d="M14 3v4" />
    <path d="M16 17v4" />
    <path d="M21 12h-9" />
    <path d="M21 19h-5" />
    <path d="M21 5h-7" />
    <path d="M8 10v4" />
    <path d="M8 12H3" />
  </svg>
);

export const InfoIcon = ({
  size = 20,
  color = "currentColor",
  className,
}: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className || `${"lucide lucide-info-icon lucide-info"}`}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" />
    <path d="M12 8h.01" />
  </svg>
);

export const ListChevronsIcon = ({
  size = 20,
  color = "currentColor",
  className,
}: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={
      className ||
      `${"lucide lucide lucide-list-chevrons-down-up-icon lucide-list-chevrons-down-up"}`
    }
  >
    <path d="M3 5h8" />
    <path d="M3 12h8" />
    <path d="M3 19h8" />
    <path d="m15 5 3 3 3-3" />
    <path d="m15 19 3-3 3 3" />
  </svg>
);
