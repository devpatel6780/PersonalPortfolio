/** Four small corner brackets overlaid on a panel — the one recurring
 * "HUD" signature detail, used sparingly on key panels only. */
export function HudCorners() {
  const base = "pointer-events-none absolute h-3 w-3 border-accent";
  return (
    <>
      <span className={`${base} left-0 top-0 border-l-2 border-t-2`} />
      <span className={`${base} right-0 top-0 border-r-2 border-t-2`} />
      <span className={`${base} bottom-0 left-0 border-b-2 border-l-2`} />
      <span className={`${base} bottom-0 right-0 border-b-2 border-r-2`} />
    </>
  );
}
