'use client'

import { useEffect, useRef } from 'react'

interface Props {
  value: string
  onChange: (html: string) => void
  placeholder?: string
  minHeight?: string
}

export default function RichTextEditor({ value, onChange, placeholder = 'Write here...', minHeight = '240px' }: Props) {
  const editorRef = useRef<HTMLDivElement>(null)
  const isComposing = useRef(false)

  // Seed initial content on mount only
  useEffect(() => {
    if (editorRef.current) editorRef.current.innerHTML = value || ''
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Clear when parent resets value to ''
  useEffect(() => {
    if (value === '' && editorRef.current && editorRef.current.innerHTML !== '') {
      editorRef.current.innerHTML = ''
    }
  }, [value])

  const exec = (cmd: string, val?: string) => {
    editorRef.current?.focus()
    document.execCommand(cmd, false, val ?? undefined)
    onChange(editorRef.current?.innerHTML || '')
  }

  const handleInput = () => {
    if (!isComposing.current) onChange(editorRef.current?.innerHTML || '')
  }

  const S = {
    toolbar: {
      display: 'flex', flexWrap: 'wrap' as const, gap: '3px',
      padding: '8px 10px',
      background: 'rgba(0,0,0,0.35)',
      borderBottom: '1px solid rgba(201,168,76,0.12)',
    },
    btn: {
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(201,168,76,0.14)',
      color: 'rgba(250,247,242,0.8)',
      borderRadius: '3px',
      padding: '3px 8px',
      cursor: 'pointer',
      fontFamily: "'DM Sans',sans-serif",
      fontSize: '11px',
      fontWeight: 500,
      lineHeight: '20px',
      height: '26px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background 0.15s, border-color 0.15s',
      whiteSpace: 'nowrap' as const,
    } as React.CSSProperties,
    sep: { width: '1px', background: 'rgba(201,168,76,0.14)', margin: '0 3px', alignSelf: 'stretch' as const },
  }

  const hover = (e: React.MouseEvent<HTMLButtonElement>) => {
    (e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.14)'
    ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.35)'
  }
  const unhover = (e: React.MouseEvent<HTMLButtonElement>) => {
    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'
    ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.14)'
  }

  const Btn = ({ label, cmd, val, title }: { label: React.ReactNode; cmd: string; val?: string; title: string }) => (
    <button type="button" title={title} style={S.btn} onMouseEnter={hover} onMouseLeave={unhover}
      onMouseDown={e => { e.preventDefault(); exec(cmd, val) }}>
      {label}
    </button>
  )

  return (
    <div style={{ border: '1px solid rgba(201,168,76,0.18)', borderRadius: '4px', overflow: 'hidden' }}>
      <style>{`
        .rte-editor:empty:before { content: attr(data-ph); color: rgba(250,247,242,0.22); pointer-events: none; }
        .rte-editor h2 { font-family: 'Cormorant Garamond', serif; font-size: 1.5em; font-weight: 600; margin: 1em 0 0.4em; color: #FAF7F2; }
        .rte-editor h3 { font-family: 'Cormorant Garamond', serif; font-size: 1.2em; font-weight: 600; margin: 0.9em 0 0.3em; color: #FAF7F2; }
        .rte-editor p { margin: 0 0 10px; }
        .rte-editor strong { font-weight: 700; }
        .rte-editor em { font-style: italic; }
        .rte-editor u { text-decoration: underline; }
        .rte-editor blockquote { border-left: 3px solid #C9A84C; padding-left: 16px; margin: 14px 0; color: rgba(250,247,242,0.6); font-style: italic; }
        .rte-editor ul { padding-left: 1.6em; margin: 8px 0; list-style: disc; }
        .rte-editor ol { padding-left: 1.6em; margin: 8px 0; list-style: decimal; }
        .rte-editor li { margin: 4px 0; }
        .rte-editor a { color: #C9A84C; text-decoration: underline; }
        .rte-editor font[size="4"] { font-size: 1.25em; }
        .rte-editor font[size="2"] { font-size: 0.85em; }
      `}</style>

      {/* Toolbar */}
      <div style={S.toolbar}>
        <Btn cmd="bold" label={<strong style={{ fontWeight: 700 }}>B</strong>} title="Bold" />
        <Btn cmd="italic" label={<em>I</em>} title="Italic" />
        <Btn cmd="underline" label={<span style={{ textDecoration: 'underline' }}>U</span>} title="Underline" />
        <Btn cmd="strikeThrough" label={<span style={{ textDecoration: 'line-through' }}>S</span>} title="Strikethrough" />

        <div style={S.sep} />

        <Btn cmd="formatBlock" val="h2" label="H2" title="Heading 2" />
        <Btn cmd="formatBlock" val="h3" label="H3" title="Heading 3" />
        <Btn cmd="formatBlock" val="p" label="P" title="Paragraph" />

        <div style={S.sep} />

        <Btn cmd="insertUnorderedList" label="• List" title="Bullet list" />
        <Btn cmd="insertOrderedList" label="1. List" title="Numbered list" />

        <div style={S.sep} />

        <Btn cmd="formatBlock" val="blockquote" label={<span style={{ fontStyle: 'italic' }}>" Quote</span>} title="Blockquote" />

        <div style={S.sep} />

        <Btn cmd="fontSize" val="4" label={<span style={{ fontSize: '14px', fontWeight: 700 }}>A+</span>} title="Larger text" />
        <Btn cmd="fontSize" val="3" label={<span style={{ fontSize: '12px' }}>A</span>} title="Normal text" />
        <Btn cmd="fontSize" val="2" label={<span style={{ fontSize: '10px' }}>A-</span>} title="Smaller text" />

        <div style={S.sep} />

        <Btn cmd="removeFormat" label="✕ Format" title="Clear formatting" />
      </div>

      {/* Editable area */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        className="rte-editor"
        data-ph={placeholder}
        onInput={handleInput}
        onCompositionStart={() => { isComposing.current = true }}
        onCompositionEnd={() => { isComposing.current = false; handleInput() }}
        style={{
          minHeight,
          maxHeight: '600px',
          overflowY: 'auto',
          padding: '14px 16px',
          color: '#FAF7F2',
          fontFamily: "'DM Sans',sans-serif",
          fontSize: '14px',
          lineHeight: 1.85,
          outline: 'none',
          background: 'rgba(255,255,255,0.04)',
        }}
      />
    </div>
  )
}
