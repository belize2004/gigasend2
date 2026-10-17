"use client"
import React, { useState } from 'react';
import {
  FiMail,
  FiUser,
  FiMessageSquare,
  FiSend,
  FiPhone,
  FiCheck,
  FiAlertCircle
} from 'react-icons/fi';
import { BsBuildings } from 'react-icons/bs';
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
  if (!name) errors.name = 'Full name is required';
  else if (name.length < 2) errors.name = 'Name must be at least 2 characters';
  else if (name.length > 50) errors.name = 'Name must not exceed 50 characters';

  const email = data.email.trim();
  if (!email) errors.email = 'Email address is required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Please enter a valid email address';

  if (data.company && data.company.length > 100) {
    errors.company = 'Company name must not exceed 100 characters';
  }

  const phone = data.phone.trim();
  if (!/^[\+]?[0-9\(\)\-\s]*$/.test(phone)) errors.phone = 'Please enter a valid phone number';
  else if (phone.length < 10) errors.phone = 'Phone number must be at least 10 digits';
  else if (phone.length > 20) errors.phone = 'Phone number must not exceed 20 characters';

  const subject = data.subject.trim();
  if (!subject) errors.subject = 'Subject is required';
  else if (subject.length < 5) errors.subject = 'Subject must be at least 5 characters';
  else if (subject.length > 100) errors.subject = 'Subject must not exceed 100 characters';

  const message = data.message.trim();
  if (!message) errors.message = 'Message is required';
  else if (message.length < 10) errors.message = 'Message must be at least 10 characters';
  else if (message.length > 1000) errors.message = 'Message must not exceed 1000 characters';

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
    subject: '',
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
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Request failed');
      setSubmitStatus("success");
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-ocean-950 text-slate-100 font-body">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="label-caps text-gold-400 text-xs block mb-2">Support & Inquiries</span>
          <h2 className="text-4xl font-extrabold text-white font-display tracking-tight mb-4">
            Get in Touch
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Have questions? We&lsquo;d love to hear from you. Send us a message and we&lsquo;ll respond as soon as possible.
          </p>
        </div>

        <div className="apple-glass bg-ocean-900/90 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-2xl">
          <form onSubmit={handleFormSubmit} className="space-y-6">
            {/* Name and Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <label htmlFor="name" className="block label-caps text-slate-200 text-[10px] mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <FiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    id="name"
                    {...register('name')}
                    className={`w-full pl-12 pr-4 py-3.5 bg-ocean-950 border rounded-xl focus:border-gold-500 outline-none transition-all duration-200 text-white placeholder-slate-500 text-sm ${
                      errors.name ? 'border-rose-500/60' : 'border-white/15'
                    }`}
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.name && (
                  <p className="mt-2 text-xs text-rose-400 flex items-center">
                    <FiAlertCircle className="mr-1.5" />
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="relative">
                <label htmlFor="email" className="block label-caps text-slate-200 text-[10px] mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    id="email"
                    {...register('email')}
                    className={`w-full pl-12 pr-4 py-3.5 bg-ocean-950 border rounded-xl focus:border-gold-500 outline-none transition-all duration-200 text-white placeholder-slate-500 text-sm ${
                      errors.email ? 'border-rose-500/60' : 'border-white/15'
                    }`}
                    placeholder="Enter your email address"
                  />
                </div>
                {errors.email && (
                  <p className="mt-2 text-xs text-rose-400 flex items-center">
                    <FiAlertCircle className="mr-1.5" />
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Company and Phone Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <label htmlFor="company" className="block label-caps text-slate-200 text-[10px] mb-2">
                  Company
                </label>
                <div className="relative">
                  <BsBuildings className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    id="company"
                    {...register('company')}
                    className={`w-full pl-12 pr-4 py-3.5 bg-ocean-950 border rounded-xl focus:border-gold-500 outline-none transition-all duration-200 text-white placeholder-slate-500 text-sm ${
                      errors.company ? 'border-rose-500/60' : 'border-white/15'
                    }`}
                    placeholder="Enter your company name"
                  />
                </div>
                {errors.company && (
                  <p className="mt-2 text-xs text-rose-400 flex items-center">
                    <FiAlertCircle className="mr-1.5" />
                    {errors.company}
                  </p>
                )}
              </div>

              <div className="relative">
                <label htmlFor="phone" className="block label-caps text-slate-200 text-[10px] mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <FiPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <input
                    type="tel"
                    id="phone"
                    {...register('phone')}
                    className={`w-full pl-12 pr-4 py-3.5 bg-ocean-950 border rounded-xl focus:border-gold-500 outline-none transition-all duration-200 text-white placeholder-slate-500 text-sm ${
                      errors.phone ? 'border-rose-500/60' : 'border-white/15'
                    }`}
                    placeholder="Enter your phone number"
                  />
                </div>
                {errors.phone && (
                  <p className="mt-2 text-xs text-rose-400 flex items-center">
                    <FiAlertCircle className="mr-1.5" />
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>

            {/* Subject */}
            <div className="relative">
              <label htmlFor="subject" className="block label-caps text-slate-200 text-[10px] mb-2">
                Subject *
              </label>
              <div className="relative">
                <FiMessageSquare className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  id="subject"
                  {...register('subject')}
                  className={`w-full pl-12 pr-4 py-3.5 bg-ocean-950 border rounded-xl focus:border-gold-500 outline-none transition-all duration-200 text-white placeholder-slate-500 text-sm ${
                    errors.subject ? 'border-rose-500/60' : 'border-white/15'
                  }`}
                  placeholder="What's this about?"
                />
              </div>
              {errors.subject && (
                <p className="mt-2 text-xs text-rose-400 flex items-center">
                  <FiAlertCircle className="mr-1.5" />
                  {errors.subject}
                </p>
              )}
            </div>

            {/* Message */}
            <div className="relative">
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="message" className="block label-caps text-slate-200 text-[10px]">
                  Message *
                </label>
                <span className="text-xs text-slate-400 font-mono">
                  {messageValue.length}/1000
                </span>
              </div>
              <textarea
                id="message"
                {...register('message')}
                rows={6}
                className={`w-full px-4 py-3.5 bg-ocean-950 border rounded-xl focus:border-gold-500 outline-none transition-all duration-200 text-white placeholder-slate-500 text-sm resize-none ${
                  errors.message ? 'border-rose-500/60' : 'border-white/15'
                }`}
                placeholder="Tell us more about your inquiry..."
              />
              {errors.message && (
                <p className="mt-2 text-xs text-rose-400 flex items-center">
                  <FiAlertCircle className="mr-1.5" />
                  {errors.message}
                </p>
              )}
            </div>

            {/* Submit Status Messages */}
            {submitStatus === 'success' && (
              <div className="flex items-center bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 text-emerald-300 text-sm">
                <FiCheck className="mr-3 text-emerald-400 shrink-0" />
                <span>Thank you! Your message has been sent successfully. We&lsquo;ll get back to you soon.</span>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="flex items-center bg-rose-500/10 border border-rose-500/30 rounded-2xl p-4 text-rose-300 text-sm">
                <FiAlertCircle className="mr-3 text-rose-400 shrink-0" />
                <span>Oops! Something went wrong. Please try again later.</span>
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
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-ocean-950 mr-2"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <FiSend className="mr-2" />
                    Send Message
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Contact Info */}
        <div className="mt-12 grid grid-cols-1 gap-8 text-center">
          <div className="apple-glass bg-ocean-900/90 border border-white/10 p-6 sm:p-8 rounded-3xl shadow-xl">
            <div className="bg-gold-500/15 text-gold-400 border border-gold-500/20 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FiMail className="text-xl" />
            </div>
            <h3 className="font-bold text-white font-display text-base mb-1">Email Us</h3>
            <p className="text-sm text-slate-300 font-mono">{brand.contactEmail}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
