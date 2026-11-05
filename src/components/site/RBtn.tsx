import type { MouseEvent, ReactNode } from "react";
import { ArrowRight } from "lucide-react";

export function Arrow({ down = false }: { down?: boolean }) {
  return <ArrowRight size={18} strokeWidth={1.6} aria-hidden style={down ? { transform: "rotate(90deg)" } : undefined} />;
}

/** Solid pill button with an orange arrow chip. `light` = white pill for dark/imagery backgrounds. */
export default function RBtn({ children, href, onClick, light = false, type }: {
  children: ReactNode; href?: string; onClick?: (e: MouseEvent) => void; light?: boolean; type?: "submit" | "button";
}) {
  const cls = `rbtn ${light ? "rbtn-light" : ""}`.trim();
  const inner = (<><span>{children}</span><i><Arrow /></i></>);
  return href ? (
    <a href={href} className={cls} onClick={onClick}>{inner}</a>
  ) : (
    <button type={type ?? "button"} className={cls} onClick={onClick}>{inner}</button>
  );
}
