"use client";

import { useEffect, useState } from "react";
import { FiCheckCircle, FiMessageSquare, FiSend, FiX } from "react-icons/fi";
import { brand } from "@/lib/brand";

const MAX_SUGGESTION_LENGTH = 1500;

export type SuggestionLocale = "en" | "es" | "pt";

interface SuggestionBoxProps {
  lang?: SuggestionLocale;
}

const COPY: Record<
  SuggestionLocale,
  {
    triggerLabel: string;
    heading: string;
    subheading: string;
    closeAria: string;
    textareaAria: string;
    placeholder: string;
    sendButton: string;
    sendingButton: string;
    successMessage: string;
    errorMessage: string;
  }
> = {
  en: {
    triggerLabel: "Share Feedback",
    heading: "Share Feedback",
    subheading: `Help improve ${brand.productName}`,
    closeAria: "Close feedback box",
    textareaAria: "Your feedback or suggestion",
    placeholder: "Tell us how we can improve…",
    sendButton: "Send Feedback",
    sendingButton: "Sending…",
    successMessage: "Thank you for your feedback.",
    errorMessage: "Couldn’t send your feedback. Please check your connection and try again.",
  },
  es: {
    triggerLabel: "Buzón de sugerencias",
    heading: "Buzón de sugerencias",
    subheading: `Ayúdanos a mejorar ${brand.productName}`,
    closeAria: "Cerrar buzón de sugerencias",
    textareaAria: "Tu comentario o sugerencia",
    placeholder: "Cuéntanos cómo podemos mejorar…",
    sendButton: "Enviar sugerencia",
    sendingButton: "Enviando…",
    successMessage: "Gracias por tus comentarios.",
    errorMessage: "No se pudo enviar tu sugerencia. Revisa tu conexión e inténtalo de nuevo.",
  },
  pt: {
    triggerLabel: "Caixa de sugestões",
    heading: "Caixa de sugestões",
    subheading: `Ajude a melhorar o ${brand.productName}`,
    closeAria: "Fechar caixa de sugestões",
    textareaAria: "Sua sugestão ou comentário",
    placeholder: "Conte como podemos melhorar…",
    sendButton: "Enviar sugestão",
    sendingButton: "Enviando…",
    successMessage: "Obrigado pelo seu comentário.",
    errorMessage: "Não foi possível enviar sua sugestão. Verifique sua conexão e tente novamente.",
  },
};

export default function SuggestionBox({ lang }: SuggestionBoxProps = {}) {
  const [detectedLang, setDetectedLang] = useState<SuggestionLocale>(lang ?? "en");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (lang) {
      setDetectedLang(lang);
      return;
    }
    if (typeof window !== "undefined") {
      const p = window.location.pathname;
      if (p === "/es" || p.startsWith("/es/")) {
        setDetectedLang("es");
      } else if (p === "/pt" || p.startsWith("/pt/")) {
        setDetectedLang("pt");
      } else {
        setDetectedLang("en");
      }
    }
  }, [lang]);

  const copy = COPY[detectedLang] ?? COPY.en;

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
        throw new Error(data?.message || copy.errorMessage);
      }
      setMessage("");
      setStatus("success");
      setFeedback(copy.successMessage);
    } catch {
      setStatus("error");
      setFeedback(copy.errorMessage);
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
              <span
                aria-hidden="true"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold-500/15 text-gold-400 border border-gold-500/30"
              >
                <FiMessageSquare />
              </span>
              <div>
                <p className="text-sm font-bold text-white font-display">{copy.heading}</p>
                <p className="text-xs text-slate-300">{copy.subheading}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white transition-colors tap-tactile"
              aria-label={copy.closeAria}
            >
              <FiX aria-hidden="true" />
            </button>
          </div>

          <div className="space-y-3 p-4">
            <textarea
              aria-label={copy.textareaAria}
              value={message}
              onChange={(event) => {
                setMessage(event.target.value.slice(0, MAX_SUGGESTION_LENGTH));
                setStatus("idle");
                setFeedback("");
              }}
              onKeyDown={handleKeyDown}
              placeholder={copy.placeholder}
              rows={5}
              className="w-full resize-none rounded-xl border border-white/15 bg-ocean-950/80 px-3 py-2 text-sm text-white placeholder:text-slate-400 outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20"
            />
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs text-slate-400">{message.length}/1,500</span>
              <button
                type="button"
                onClick={submitSuggestion}
                disabled={sending || !message.trim()}
                className="btn-gold text-ocean-950 min-h-10 rounded-xl px-4 text-xs shadow-lg shadow-gold-500/15 tap-tactile disabled:cursor-not-allowed disabled:opacity-50"
              >
                <FiSend className="mr-2" aria-hidden="true" />
                {sending ? copy.sendingButton : copy.sendButton}
              </button>
            </div>

            {feedback && (
              <div
                role={status === "error" ? "alert" : "status"}
                className={`flex items-center rounded-xl px-3 py-2 text-sm border ${
                  status === "success"
                    ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-300"
                    : "bg-rose-500/15 border-rose-500/30 text-rose-300"
                }`}
              >
                {status === "success" && <FiCheckCircle className="mr-2 flex-shrink-0" aria-hidden="true" />}
                {feedback}
              </div>
            )}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        className="apple-glass inline-flex min-h-12 items-center justify-center rounded-full border border-gold-500/40 bg-ocean-900/90 px-5 text-sm font-bold text-gold-400 shadow-2xl hover:border-gold-400 hover:text-gold-400 tap-tactile"
      >
        <FiMessageSquare className="mr-2" aria-hidden="true" />
        {copy.triggerLabel}
      </button>
    </div>
  );
}
