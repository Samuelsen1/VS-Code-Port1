'use client';

import { useEffect, useRef, useState } from 'react';
import { Send, X } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

function sanitizeHtml(html) {
  if (typeof html !== 'string') return '';
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<iframe\b[^>]*>[\s\S]*?<\/iframe>/gi, '')
    .replace(/\s+on\w+\s*=\s*["'][^"']*["']/gi, '')
    .replace(/\s+on\w+\s*=\s*[^\s>]+/gi, '');
}

function formatMessage(text) {
  if (!text) return '';
  let formatted = String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  formatted = formatted.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  formatted = formatted.replace(/\n/g, '<br />');
  return sanitizeHtml(formatted);
}

export default function ChatWidget() {
  const { language, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const endRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ role: 'assistant', content: t.chat.greeting }]);
    }
  }, [open, language, messages.length, t.chat.greeting]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 120);
  }, [open]);

  const send = async (e) => {
    e?.preventDefault?.();
    const text = input.trim();
    if (!text || loading) return;
    setInput('');
    const next = [...messages, { role: 'user', content: text }];
    setMessages(next);
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, language, history: next.slice(0, -1) }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.response || data.error || 'Sorry, something went wrong.' },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            language === 'de'
              ? 'Entschuldigung, ein Fehler ist aufgetreten.'
              : 'Sorry, something went wrong.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        className={`chat-fab ${open ? 'chat-fab-open' : ''}`}
        onClick={() => setOpen((v) => !v)}
        aria-label={t.chat.open}
      >
        {open ? (
          <X className="w-5 h-5" />
        ) : (
          <img
            src="/images/general.png?v=6"
            alt=""
            width="56"
            height="56"
            className="chat-fab-logo"
            decoding="async"
          />
        )}
      </button>

      {open && (
        <div className="chat-panel" role="dialog" aria-label={t.chat.title}>
          <div className="chat-panel-head">
            <div className="chat-panel-title">
              <img
                src="/images/general.png?v=6"
                alt=""
                width="36"
                height="36"
                className="chat-panel-logo"
                decoding="async"
              />
              <div>
                <p className="chat-panel-kicker">General</p>
                <h3>{t.chat.title}</h3>
              </div>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="chat-panel-body">
            {messages.map((m, i) => (
              <div key={i} className={`chat-bubble ${m.role}`}>
                <div dangerouslySetInnerHTML={{ __html: formatMessage(m.content) }} />
              </div>
            ))}
            {loading && <div className="chat-bubble assistant chat-typing">…</div>}
            <div ref={endRef} />
          </div>
          <form className="chat-panel-form" onSubmit={send}>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.chat.placeholder}
              aria-label={t.chat.placeholder}
            />
            <button type="submit" disabled={loading || !input.trim()} aria-label={t.chat.send}>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
