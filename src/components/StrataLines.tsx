// Faint layered lines, like the bedding planes of cut stone. Deterministic so server and client agree.

function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function strata(seed: number, count: number) {
  const rand = seeded(seed);
  const paths: string[] = [];
  for (let i = 0; i < count; i++) {
    const baseY = 40 + (i * 720) / count + rand() * 30;
    const amp = 18 + rand() * 46;
    const phase = rand() * Math.PI * 2;
    const freq = 0.9 + rand() * 1.4;
    let d = "";
    for (let x = -20; x <= 1220; x += 40) {
      const t = (x / 1200) * Math.PI * freq + phase;
      const y = baseY + Math.sin(t) * amp + Math.sin(t * 2.7 + i) * amp * 0.25;
      d += `${x === -20 ? "M" : "L"} ${x} ${y.toFixed(1)} `;
    }
    paths.push(d);
  }
  return paths;
}

export default function StrataLines({
  seed = 7,
  count = 16,
  className = "",
  tone = "ink",
}: {
  seed?: number;
  count?: number;
  className?: string;
  tone?: "ink" | "bronze";
}) {
  const stroke = tone === "ink" ? "var(--color-ink)" : "var(--color-bronze)";
  const opacity = tone === "ink" ? 0.07 : 0.13;
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
    >
      <g fill="none" stroke={stroke} strokeOpacity={opacity} strokeWidth={1} vectorEffect="non-scaling-stroke">
        {strata(seed, count).map((d, i) => (
          <path key={i} d={d} vectorEffect="non-scaling-stroke" />
        ))}
      </g>
    </svg>
  );
}
