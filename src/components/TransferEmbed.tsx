"use client";

import React from "react";
import { Provider } from "react-redux";
import store from "@/lib/store";
import { FileProvider } from "@/context/FileContext";
import { FileForm } from "@/components/FileForm/FileForm";

export default function TransferEmbed() {
  return (
    <Provider store={store}>
      <FileProvider>
        <div className="w-full max-w-3xl mx-auto shadow-2xl rounded-3xl overflow-hidden apple-glass bg-ocean-900/90 border border-white/10 text-slate-100">
          <FileForm />
        </div>
      </FileProvider>
    </Provider>
  );
}

