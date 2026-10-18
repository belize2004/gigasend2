"use client"
import React, { useState } from 'react';
import {
  FiSend,
  FiCheck,
  FiAlertCircle
} from 'react-icons/fi';
import { brand } from '@/lib/brand';

type FormData = {
  name: string;
  email: string;
  company: string;
  phone: string;
  subject: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

function validateContactForm(data: FormData): FormErrors {
  const errors: FormErrors = {};
  const name = data.name.trim();
  if (!name) errors.name = 'Please enter your name.';
  else if (name.length < 2) errors.name = 'Enter a name with at least 2 characters.';
  else if (name.length > 50) errors.name = 'Keep your name under 50 characters.';

  const email = data.email.trim();
  if (!email) errors.email = 'Please enter your email address.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter a valid email address, like name@example.com.';

  const message = data.message.trim();
  if (!message) errors.message = 'Please enter your message.';
  else if (message.length < 10) errors.message = 'Enter a message with at least 10 characters.';
  else if (message.length > 1000) errors.message = 'Keep your message under 1,000 characters.';

  return errors;
}

const ContactForm = () => {
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: 'Support & Inquiry',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const messageValue = formData.message;

  const register = (field: keyof FormData) => ({
    name: field,
    value: formData[field],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const val = e.target.value;
      setFormData((prev) => ({ ...prev, [field]: val }));
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    },
  });

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitStatus(null);
    const validationErrors = validateContactForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          company: '',
          phone: '',
          subject: formData.subject || 'Support & Inquiry',
        }),
      });
      if (!res.ok) throw new Error('Request failed');
      setSubmitStatus("success");
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        subject: 'Support & Inquiry',
        message: '',
      });
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-ocean-950 text-slate-100 font-body">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight mb-4">
            Get in Touch
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed">
            Have a question or need a custom plan? Send a message below or email{" "}
            <a
              href={`mailto:${brand.contactEmail}`}
              className="text-gold-400 hover:text-gold-300 underline underline-offset-2 font-medium transition-colors"
            >
              {brand.contactEmail}
            </a>
            . We typically reply within one business day.
          </p>
        </div>

        <div className="apple-glass bg-ocean-900/90 border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl backdrop-blur-2xl">
          <form onSubmit={handleFormSubmit} className="space-y-6">
            {/* Name and Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-xs font-semibold text-slate-200 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  {...register('name')}
                  className={`w-full px-4 py-3.5 bg-ocean-950 border rounded-xl focus:border-gold-500 outline-none transition-all duration-200 text-white placeholder-slate-500 text-sm ${
                    errors.name ? 'border-rose-500/60' : 'border-white/15'
                  }`}
                  placeholder="Jane Doe"
                />
                {errors.name && (
                  <p className="mt-2 text-xs text-rose-400 flex items-center">
                    <FiAlertCircle className="mr-1.5 shrink-0" aria-hidden="true" />
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-slate-200 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register('email')}
                  className={`w-full px-4 py-3.5 bg-ocean-950 border rounded-xl focus:border-gold-500 outline-none transition-all duration-200 text-white placeholder-slate-500 text-sm ${
                    errors.email ? 'border-rose-500/60' : 'border-white/15'
                  }`}
                  placeholder="you@company.com"
                />
                {errors.email && (
                  <p className="mt-2 text-xs text-rose-400 flex items-center">
                    <FiAlertCircle className="mr-1.5 shrink-0" aria-hidden="true" />
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Message */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="message" className="block text-xs font-semibold text-slate-200">
                  Message
                </label>
                <span className="text-xs text-slate-400 font-mono">
                  {messageValue.length}/1,000
                </span>
              </div>
              <textarea
                id="message"
                {...register('message')}
                rows={5}
                className={`w-full px-4 py-3.5 bg-ocean-950 border rounded-xl focus:border-gold-500 outline-none transition-all duration-200 text-white placeholder-slate-500 text-sm resize-none ${
                  errors.message ? 'border-rose-500/60' : 'border-white/15'
                }`}
                placeholder="How can we help?"
              />
              {errors.message && (
                <p className="mt-2 text-xs text-rose-400 flex items-center">
                  <FiAlertCircle className="mr-1.5 shrink-0" aria-hidden="true" />
                  {errors.message}
                </p>
              )}
            </div>

            {/* Submit Status Messages */}
            {submitStatus === 'success' && (
              <div role="status" className="flex items-center bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 text-emerald-300 text-sm">
                <FiCheck className="mr-3 text-emerald-400 shrink-0" aria-hidden="true" />
                <span>Thanks for reaching out. We&rsquo;ve received your message and will reply soon.</span>
              </div>
            )}

            {submitStatus === 'error' && (
              <div role="alert" className="flex items-center bg-rose-500/10 border border-rose-500/30 rounded-2xl p-4 text-rose-300 text-sm">
                <FiAlertCircle className="mr-3 text-rose-400 shrink-0" aria-hidden="true" />
                <span>Couldn&rsquo;t send your message. Please try again or email us directly at {brand.contactEmail}.</span>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-center pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`btn-gold px-8 py-4 rounded-xl font-bold font-display text-xs shadow-lg shadow-gold-500/15 transition-all duration-200 flex items-center justify-center min-w-[200px] tap-tactile ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-ocean-950 mr-2" aria-hidden="true"></div>
                    Sending…
                  </>
                ) : (
                  <>
                    <FiSend className="mr-2" aria-hidden="true" />
                    Send Message
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
