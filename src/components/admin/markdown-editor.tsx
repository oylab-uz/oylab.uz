"use client";

import { markdown } from "@codemirror/lang-markdown";
import { EditorState } from "@codemirror/state";
import { EditorView, basicSetup } from "codemirror";
import { useEffect, useRef } from "react";

const theme = EditorView.theme({
  "&": { backgroundColor: "var(--bg)", color: "var(--ink)", fontSize: "14px", borderRadius: "0.5rem" },
  "&.cm-focused": { outline: "none" },
  ".cm-content": { fontFamily: "var(--font-geist-mono), ui-monospace, monospace", padding: "12px 0", minHeight: "24rem" },
  ".cm-gutters": { backgroundColor: "var(--surface)", color: "var(--muted)", border: "none" },
  ".cm-activeLine, .cm-activeLineGutter": { backgroundColor: "color-mix(in oklch, var(--surface) 70%, transparent)" },
  ".cm-selectionBackground, &.cm-focused .cm-selectionBackground": { backgroundColor: "var(--surface-strong)" },
  ".cm-cursor": { borderLeftColor: "var(--ink)" },
});

type Props = {
  name: string;
  id: string;
  defaultValue: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
};

/**
 * CodeMirror 6 Markdown editor that mirrors its document into a hidden
 * textarea, so the surrounding form submits it like any other field.
 */
export function MarkdownEditor({ name, id, defaultValue, disabled, onChange }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const mirror = useRef<HTMLTextAreaElement>(null);
  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    if (!host.current) return;
    const view = new EditorView({
      parent: host.current,
      state: EditorState.create({
        doc: defaultValue,
        extensions: [
          basicSetup,
          markdown(),
          EditorView.lineWrapping,
          theme,
          EditorView.updateListener.of((update) => {
            if (!update.docChanged) return;
            const value = update.state.doc.toString();
            if (mirror.current) mirror.current.value = value;
            onChangeRef.current?.(value);
          }),
        ],
      }),
    });
    return () => view.destroy();
    // The editor owns the document after mount; defaultValue is read once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="overflow-hidden rounded-lg border border-line focus-within:border-line-strong">
      <div ref={host} aria-labelledby={`${id}-label`} />
      <textarea ref={mirror} id={id} name={name} defaultValue={defaultValue} hidden readOnly disabled={disabled} />
    </div>
  );
}
