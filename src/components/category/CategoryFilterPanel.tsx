'use client';

export type CategoryFilters = {
  sort: 'default' | 'az' | 'za';
  tags: string[];
};

export const DEFAULT_FILTERS: CategoryFilters = { sort: 'default', tags: [] };

const SORT_OPTIONS: Array<{ value: CategoryFilters['sort']; label: string }> = [
  { value: 'default', label: 'Önerilen' },
  { value: 'az', label: 'İsim (A → Z)' },
  { value: 'za', label: 'İsim (Z → A)' },
];

export default function CategoryFilterPanel({
  value,
  onChange,
  availableTags = [],
}: {
  value: CategoryFilters;
  onChange: (next: CategoryFilters) => void;
  availableTags?: string[];
}) {
  return (
    <div className="space-y-6">
      {/* SIRALA */}
      <section>
        <div className="text-[11px] uppercase tracking-[0.16em] text-black/50">Sırala</div>

        <div className="mt-3 grid gap-2">
          {SORT_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              className="flex items-center gap-3 rounded-xl border border-black/10 px-4 py-3 hover:border-black/25 transition cursor-pointer"
            >
              <input
                className="accent-[color:var(--gold)]"
                type="radio"
                name="sort"
                value={opt.value}
                checked={value.sort === opt.value}
                onChange={() => onChange({ ...value, sort: opt.value })}
              />
              <span className="text-sm text-black/80">{opt.label}</span>
            </label>
          ))}
        </div>

        <p className="mt-2 text-xs text-black/50">
          “Uygula”ya basınca liste seçtiğin sıralama/etiketlere göre güncellenir.
        </p>
      </section>

      {/* ETİKETLER */}
      <section>
        <div className="text-[11px] uppercase tracking-[0.16em] text-black/50">Etiketler</div>

        <div className="mt-3 grid gap-2">
          {availableTags.length === 0 ? (
            <div className="text-sm text-black/50">Bu kategoride etiket yok.</div>
          ) : (
            availableTags.map((t) => {
              const checked = value.tags.includes(t);

              return (
                <label
                  key={t}
                  className="flex items-center gap-3 rounded-xl border border-black/10 px-4 py-3 hover:border-black/25 transition cursor-pointer"
                >
                  <input
                    className="accent-[color:var(--gold)]"
                    type="checkbox"
                    checked={checked}
                    onChange={() => {
                      const nextTags = checked
                        ? value.tags.filter((x) => x !== t)
                        : [...value.tags, t];
                      onChange({ ...value, tags: nextTags });
                    }}
                  />
                  <span className="text-sm text-black/80">{t}</span>
                </label>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
}
