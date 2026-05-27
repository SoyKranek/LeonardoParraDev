type FlagIconProps = {
  className?: string;
  title?: string;
};

/** Bandera de España — se ve igual en Windows, iOS y web (los emojis 🇪🇸 suelen mostrarse como "ES"). */
export function FlagSpain({ className = 'w-6 h-4 rounded-sm', title }: FlagIconProps) {
  return (
    <svg
      viewBox="0 0 24 16"
      className={className}
      role="img"
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <rect width="24" height="16" fill="#AA151B" />
      <rect y="4" width="24" height="8" fill="#F1BF00" />
    </svg>
  );
}

/** Bandera del Reino Unido — inglés. */
export function FlagUnitedKingdom({ className = 'w-6 h-4 rounded-sm', title }: FlagIconProps) {
  return (
    <svg
      viewBox="0 0 60 30"
      className={className}
      role="img"
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <clipPath id="uk-clip">
        <path d="M0,0 v30 h60 v-30 z" />
      </clipPath>
      <clipPath id="uk-s">
        <path d="M30,15 h30 v15 z v-30 h-30 z h-30 v15 z v-15 h30 z" />
      </clipPath>
      <g clipPath="url(#uk-clip)">
        <rect width="60" height="30" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
        <path
          d="M0,0 L60,30 M60,0 L0,30"
          stroke="#C8102E"
          strokeWidth="4"
          clipPath="url(#uk-s)"
        />
        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  );
}
