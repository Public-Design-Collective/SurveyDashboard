const PROPS_BASE = {
  viewBox: '0 0 24 24',
  fill: 'none',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

export function IconoProyecto({ color = 'currentColor', size = 28 }) {
  return (
    <svg {...PROPS_BASE} width={size} height={size} stroke={color} aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="9" y1="13" x2="15" y2="13" />
      <line x1="9" y1="17" x2="15" y2="17" />
    </svg>
  );
}

export function IconoInstitucion({ color = 'currentColor', size = 28 }) {
  return (
    <svg {...PROPS_BASE} width={size} height={size} stroke={color} aria-hidden="true">
      <path d="M3 21h18" />
      <path d="M5 21V8l7-4 7 4v13" />
      <line x1="9" y1="10" x2="9" y2="10.01" />
      <line x1="9" y1="14" x2="9" y2="14.01" />
      <line x1="9" y1="18" x2="9" y2="18.01" />
      <line x1="15" y1="10" x2="15" y2="10.01" />
      <line x1="15" y1="14" x2="15" y2="14.01" />
      <line x1="15" y1="18" x2="15" y2="18.01" />
    </svg>
  );
}

export function IconoPais({ color = 'currentColor', size = 28 }) {
  return (
    <svg {...PROPS_BASE} width={size} height={size} stroke={color} aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

export function IconoParticipante({ color = 'currentColor', size = 28 }) {
  return (
    <svg {...PROPS_BASE} width={size} height={size} stroke={color} aria-hidden="true">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

export function IconoConversacion({ color = 'currentColor', size = 14 }) {
  return (
    <svg {...PROPS_BASE} width={size} height={size} stroke={color} aria-hidden="true">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}
