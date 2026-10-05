type SourceNote = {
  sourceType?: string;
  sourceReference?: string;
  sourceDisplayText?: string;
  lessonNote?: string;
  reviewStatus?: string;
  madhhabSensitivity?: string;
};

export function SourcesLessonNotes({ note }: { note?: SourceNote }) {
  if (!note) return null;

  const fields: Array<{ label: string; value?: string }> = [
    note.sourceType && note.sourceReference
      ? { label: "SOURCE", value: note.sourceDisplayText || note.sourceReference }
      : null,
    note.lessonNote ? { label: "LESSON NOTE", value: note.lessonNote } : null,
    note.reviewStatus ? { label: "REVIEW STATUS", value: note.reviewStatus } : null,
    note.madhhabSensitivity ? { label: "MADHHAB SENSITIVITY", value: note.madhhabSensitivity } : null,
  ].filter(Boolean) as Array<{ label: string; value?: string }>;

  if (fields.length === 0) return null;

  return (
    <details className="group rounded-2xl border border-[#D8D0C1] bg-[#F7F1E7] p-3 text-left text-[#173E39]">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-bold uppercase tracking-[0.14em] text-[#173E39]">
        <span>Sources &amp; lesson notes</span>
        <span className="text-lg transition group-open:rotate-180">▾</span>
      </summary>

      <div className="mt-4 space-y-4 text-sm leading-6 text-[#38514d]">
        {fields.map((field) => (
          <div key={field.label} className="space-y-1 border-t border-[#E0D5C0] pt-3 first:border-t-0 first:pt-0">
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#5D6E6A]">{field.label}</p>
            <p>{field.value}</p>
          </div>
        ))}
      </div>
    </details>
  );
}
