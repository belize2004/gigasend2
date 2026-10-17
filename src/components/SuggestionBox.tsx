"use client";

import { useState } from "react";
import { FiCheckCircle, FiMessageSquare, FiSend, FiX } from "react-icons/fi";

const MAX_SUGGESTION_LENGTH = 1500;

export default function SuggestionBox() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");
  const [sending, setSending] = useState(false);

  const submitSuggestion = async () => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage || sending) return;

    setSending(true);
    setStatus("idle");
    setFeedback("");

    try {
      const res = await fetch("/api/suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmedMessage,
          pageUrl: typeof window !== "undefined" ? window.location.href : undefined,
        }),
      });
      const data = (await res.json().catch(() => null)) as ApiResponse | null;
      if (!res.ok) {
        throw new Error(data?.message ?? "Could not send suggestion.");
      }
      setMessage("");
      setStatus("success");
      setFeedback("Thanks. Your suggestion was sent.");
    } catch (error) {
      setStatus("error");
      setFeedback(error instanceof Error ? error.message : "Could not send suggestion.");
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
      event.preventDefault();
      submitSuggestion();
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-[80] flex flex-col items-end gap-3">
      {open && (
        <div className="apple-glass w-[min(calc(100vw-32px),360px)] rounded-2xl border border-white/10 bg-ocean-900/90 shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold-500/15 text-gold-400 border border-gold-500/30">
                <FiMessageSquare />
              </span>
              <div>
                <p className="text-sm font-bold text-white font-display">Suggestion Box</p>
                <p className="text-xs text-slate-300">Help make GigaSend better</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white transition-colors tap-tactile"
              aria-label="Close suggestion box"
            >
              <FiX />
            </button>
          </div>

          <div className="space-y-3 p-4">
            <textarea
              value={message}
              onChange={(event) => {
                setMessage(event.target.value.slice(0, MAX_SUGGESTION_LENGTH));
                setStatus("idle");
                setFeedback("");
              }}
              onKeyDown={handleKeyDown}
              placeholder="Type your suggestion..."
              rows={5}
              className="w-full resize-none rounded-xl border border-white/15 bg-ocean-950/80 px-3 py-2 text-sm text-white placeholder:text-slate-400 outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20"
            />
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs text-slate-400">{message.length}/{MAX_SUGGESTION_LENGTH}</span>
              <button
                type="button"
                onClick={submitSuggestion}
                disabled={sending || !message.trim()}
                className="btn-gold text-ocean-950 min-h-10 rounded-xl px-4 text-xs shadow-lg shadow-gold-500/15 tap-tactile disabled:cursor-not-allowed disabled:opacity-50"
              >
                <FiSend className="mr-2" />
                {sending ? "Sending..." : "Send"}
              </button>
            </div>

            {feedback && (
              <div
                className={`flex items-center rounded-xl px-3 py-2 text-sm border ${
                  status === "success"
                    ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-300"
                    : "bg-rose-500/15 border-rose-500/30 text-rose-300"
                }`}
              >
                {status === "success" && <FiCheckCircle className="mr-2 flex-shrink-0" />}
                {feedback}
              </div>
            )}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="apple-glass inline-flex min-h-12 items-center justify-center rounded-full border border-gold-500/40 bg-ocean-900/90 px-5 text-sm font-bold text-gold-400 shadow-2xl hover:border-gold-400 hover:text-gold-400 tap-tactile"
      >
        <FiMessageSquare className="mr-2" />
        Suggestion Box
      </button>
    </div>
  );
}
