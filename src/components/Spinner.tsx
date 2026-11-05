/** 24px orange spinning wheel for button / section loading states. */
export default function Spinner({ label = "Loading" }: { label?: string }) {
  return (
    <span className="spinner" role="status" aria-label={label}>
      <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
        <circle cx="12" cy="12" r="8" fill="none" stroke="var(--orange)" strokeWidth="3" strokeDasharray="38 12" strokeLinecap="round" />
        <circle cx="12" cy="12" r="1.5" fill="var(--orange)" />
      </svg>
    </span>
  );
}
