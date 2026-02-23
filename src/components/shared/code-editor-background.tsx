// components/shared/code-editor-background.tsx
// Drop this into your layout replacing the current background divs

export function CodeEditorBackground() {
  // Fake line numbers — enough to cover any viewport height
  const lineCount = 120

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Gutter */}
      <div
        className="absolute bottom-0 left-0 top-0 w-16 opacity-60 dark:opacity-40 hidden xl:flex"
        style={{ background: "var(--muted)" }}
      />
      {/* Gutter Right Border */}
      <div
        className="absolute bottom-0 left-16 top-0 w-px hidden xl:flex"
        style={{ background: "var(--border)" }}
      />
      {/* Line numbers */}
      <div className="absolute bottom-0 left-0 top-0 w-16  flex-col items-end pr-3 pt-4 gap-0 overflow-hidden hidden xl:flex">
        {Array.from({ length: lineCount }, (_, i) => (
          <span
            key={i}
            className="font-mono leading-[1.6rem] text-[0.65rem] select-none"
            style={{
              color: "var(--muted-foreground)",
              opacity: i % 5 === 0 ? 0.8 : 0.5,
            }}
          >
            {i + 1}
          </span>
        ))}
      </div>
      {/* Minimap Column */}
      <div
        className="absolute bottom-0 right-0 top-0 w-16 hidden xl:block opacity-30 dark:opacity-20"
        style={{ background: "var(--muted)" }}
      />
      <div
        className="absolute bottom-0 right-16 top-0 w-px hidden xl:block"
        style={{ background: "var(--border)" }}
      />
      {/* Minimap fake code lines */}
      <div className="absolute top-4 right-1 bottom-4 w-14 hidden xl:flex flex-col gap-1 overflow-hidden">
        {Array.from({ length: 60 }, (_, i) => {
          const colors = [
            "--code-keyword",
            "--code-function",
            "--code-string",
            "--code-tag",
            "--code-attr",
            "--code-comment",
          ]
          const color = colors[i % colors.length]
          const width = [40, 70, 55, 80, 30, 65, 50, 75][i % 8]
          return (
            <div
              key={i}
              className="h-1 rounded-full"
              style={{
                width: `${width}%`,
                background: `var(${color})`,
                opacity: 0.4,
                marginLeft: `${(i % 3) * 4}px`,
              }}
            />
          )
        })}
      </div>
      {/*  Ambient syntax color glows  */}
      {/* Keyword glow — top left */}
      <div
        className="absolute -top-32 left-1/4 size-125 rounded-full blur-[120px] opacity-[0.08] dark:opacity-[0.12]"
        style={{ background: "var(--code-keyword)" }}
      />
      {/* Function glow — bottom right */}
      <div
        className="absolute -bottom-32 right-1/4 size-150 rounded-full blur-[140px] opacity-[0.06] dark:opacity-[0.10]"
        style={{ background: "var(--code-function)" }}
      />
      {/* String glow — center */}
      <div
        className="absolute top-1/2 left-1/2 h-100 w-200 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[160px] opacity-[0.04] dark:opacity-[0.07]"
        style={{ background: "var(--code-string)" }}
      />
      {/* Tag glow — top right */}
      <div
        className="absolute -top-20 -right-20 size-100 rounded-full blur-[100px] opacity-[0.05] dark:opacity-[0.08]"
        style={{ background: "var(--code-tag)" }}
      />
      {/* Vignette  */}
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background: `radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, var(--background) 100%)`,
        }}
      />
    </div>
  )
}
