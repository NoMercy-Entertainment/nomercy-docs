interface Layer {
  /** Layer number, shown in the badge. */
  n: number;
  /** Layer name, e.g. "Consumer plugin". */
  name: string;
  /** Package / where this layer lives, shown in mono. */
  pkg?: string;
  /** What this layer is allowed to know about. */
  knows: string;
}

// A stacked architecture diagram — a styled replacement for an ASCII box / table.
// Layers are listed top-to-bottom as passed (highest layer first). The left spine
// and number badges convey the ordering; each band carries the name, the package
// it lives in, and what it may know about. Static (no hooks) — renders to HTML.
export function LayerStack({ layers }: { layers: Layer[] }) {
  return (
    <div className="not-prose my-8">
      <div className="relative flex flex-col gap-px overflow-hidden rounded-2xl ring-1 ring-zinc-200 dark:ring-white/10">
        {layers.map((layer, index) => (
          <div
            key={layer.n}
            className="group/layer flex items-start gap-4 bg-zinc-50 p-4 transition-colors hover:bg-white sm:p-5 dark:bg-zinc-800/40 dark:hover:bg-zinc-800/70"
          >
            <div className="flex flex-col items-center self-stretch">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 font-mono text-sm font-semibold text-emerald-700 ring-1 ring-emerald-500/20 dark:text-emerald-400">
                {layer.n}
              </span>
              {index < layers.length - 1 && (
                <span className="mt-1 w-px flex-auto bg-zinc-200 dark:bg-white/10" aria-hidden="true" />
              )}
            </div>
            <div className="min-w-0 flex-auto">
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                <span className="font-semibold text-zinc-900 dark:text-white">{layer.name}</span>
                {layer.pkg && (
                  <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">{layer.pkg}</span>
                )}
              </div>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{layer.knows}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
