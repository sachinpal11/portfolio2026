/**
 * Static film-grain texture over the whole site. Fractal noise is turned into
 * black speckles (alpha only) so white areas stay white. It doesn't animate:
 * a moving full-screen layer made the fixed blur bands at the edges flicker.
 */
const NOISE = `<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n' x='0' y='0' width='100%' height='100%'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/><feColorMatrix type='matrix' values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 2.6 -1.2'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`;

const NOISE_URL = `url("data:image/svg+xml,${encodeURIComponent(NOISE)}")`;

export function NoiseOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60] opacity-[0.1]"
      style={{ backgroundImage: NOISE_URL, backgroundSize: "220px 220px" }}
    />
  );
}
