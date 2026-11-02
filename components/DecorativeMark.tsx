/** Vector artwork avoids platform-specific emoji and font fallback. */
export default function DecorativeMark({ kind = "asterisk" }: { kind?: "asterisk" | "sparkle" | "smile" }) {
  return (
    <svg className="decorative-mark" viewBox="0 0 32 32" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false">
      {kind === "asterisk" ? (
        <g>
          {[0, 45, 90, 135].map((angle) => <rect key={angle} x="13.5" y="2" width="5" height="28" rx="1" transform={`rotate(${angle} 16 16)`} />)}
        </g>
      ) : kind === "sparkle" ? (
        <path d="M16 2C14 12 12 14 2 16c10 2 12 4 14 14 2-10 4-12 14-14C20 14 18 12 16 2Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
      ) : (
        <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <circle cx="16" cy="16" r="13" />
          <path d="M10 19c2 6 10 6 12 0" />
          <path d="M11 11v2m10-2v2" />
        </g>
      )}
    </svg>
  );
}
