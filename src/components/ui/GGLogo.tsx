interface GGLogoProps {
  className?: string;
}

/**
 * Logo do Game Guardian: escudo estilizado com interferência.
 */
export function GGLogo({ className }: GGLogoProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Game Guardian"
    >
      {/* Fundo */}
      <rect width="40" height="40" rx="8" fill="#a855f7" />
      {/* Escudo */}
      <path
        d="M8 12L20 8L32 12V20C32 26 26 32 20 34C14 32 8 26 8 20V12Z"
        fill="#1a1a2e"
        stroke="white"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Linhas de glitch */}
      <line x1="10" y1="22" x2="30" y2="22" stroke="#a855f7" strokeWidth="1.5" />
      <line x1="10" y1="26" x2="24" y2="26" stroke="#a855f7" strokeWidth="1.5" />
      <line x1="16" y1="30" x2="26" y2="30" stroke="#a855f7" strokeWidth="1.5" />
    </svg>
  );
}

export default GGLogo;
