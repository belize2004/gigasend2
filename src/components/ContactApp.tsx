"use client";

import React from "react";
import AppLayout from "@/components/AppLayout";
import ContactForm from "@/components/ContactUs";

export default function ContactApp() {
  return (
    <AppLayout>
      <div className="pt-8">
        <ContactForm />
      </div>
    </AppLayout>
  );
}
