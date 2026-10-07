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
        <div className="w-full max-w-2xl mx-auto shadow-xl rounded-2xl overflow-hidden bg-white border border-slate-200">
          <FileForm />
        </div>
      </FileProvider>
    </Provider>
  );
}
