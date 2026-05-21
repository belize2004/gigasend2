"use client";

import axios, { AxiosError } from "axios";
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
      await axios.post<ApiResponse>("/api/suggestions", {
        message: trimmedMessage,
        pageUrl: typeof window !== "undefined" ? window.location.href : undefined,
      });
      setMessage("");
      setStatus("success");
      setFeedback("Thanks. Your suggestion was sent.");
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      setStatus("error");
      setFeedback(axiosError.response?.data?.message ?? "Could not send suggestion.");
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
        <div className="w-[min(calc(100vw-32px),360px)] rounded-xl border border-slate-200 bg-white shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                <FiMessageSquare />
              </span>
              <div>
                <p className="text-sm font-bold text-slate-900">Suggestion Box</p>
                <p className="text-xs text-slate-500">Help make GigaSend better</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
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
              className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs text-slate-500">{message.length}/{MAX_SUGGESTION_LENGTH}</span>
              <button
                type="button"
                onClick={submitSuggestion}
                disabled={sending || !message.trim()}
                className="inline-flex min-h-10 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 text-sm font-bold text-white shadow-lg shadow-blue-500/20 hover:from-blue-700 hover:to-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <FiSend className="mr-2" />
                {sending ? "Sending..." : "Send"}
              </button>
            </div>

            {feedback && (
              <div
                className={`flex items-center rounded-lg px-3 py-2 text-sm ${
                  status === "success"
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-700"
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
        className="inline-flex min-h-12 items-center justify-center rounded-full bg-slate-950 px-5 text-sm font-bold text-white shadow-2xl shadow-slate-900/25 hover:bg-blue-700"
      >
        <FiMessageSquare className="mr-2" />
        Suggestion Box
      </button>
    </div>
  );
}
